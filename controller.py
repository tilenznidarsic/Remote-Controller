import sys, json, subprocess, os


class ComputerController:
    # class was designed to work with setVol
    def __init__(self, pwd):
        # win32
        self.os = sys.platform
        self.audio_level = 0
        self.mute = False
        # set by a client:
        self.vol_change_amount = 10
        self.should_beep = True
        self.pwd = pwd
        # set parameters
        if self.os == "win32":
            self.update()

    def toJSON(self):
        obj = {
            "os": self.os,
            "audio_level": self.audio_level,
            "mute": self.mute,
            "vol_change_amount": self.vol_change_amount,
            "should_beep": self.should_beep
        }
        return json.dumps(obj, sort_keys=True, indent=4)

    def volume(self, plus_minus):
        value = f"+{self.vol_change_amount}" if plus_minus == True else f"-{self.vol_change_amount}"
        if self.should_beep:
            subprocess.Popen(["setvol", value, "beep"])
        else:
            subprocess.Popen(["setvol", value])
            
        if plus_minus == True:
            self.audio_level += self.vol_change_amount
        else:
            self.audio_level -= self.vol_change_amount

    def set_volume(self, vol):
        if isinstance(vol, int):
            if self.should_beep:
                subprocess.Popen(["setvol", str(vol), "beep"])
            else:
                subprocess.Popen(["setvol", str(vol)])
            self.audio_level = vol
        else:
            raise TypeError(f"Set Volume: {self.should_beep}, {vol}")

    def toggle_mute(self):
        sound = "beep" if self.should_beep else ""
        value = "unmute" if self.mute else "mute"
        
        if self.should_beep:
            subprocess.Popen(["setvol", value, "beep"])
        else:
            subprocess.Popen(["setvol", value])

        self.mute = not self.mute

    def lock_computer(self, password):
        if password == self.pwd:
            if self.os == "win32":
                os.system("rundll32.exe user32.dll LockWorkStation")
            elif self.os == "linux":
                os.system("gnome-screensaver-command -l")
                
    def shutdown(self, password):
        if password == self.pwd:
            if self.os == "win32":
                os.system("shutdown /s")

    def update(self):
        report = subprocess.Popen(["setvol", "report"], stdout=subprocess.PIPE).stdout.readline().decode("utf-8")
        split_string = report.split()
        if "Master volume level" in report:
            self.mute = False
            self.audio_level = int(split_string[-1])
        elif split_string[-1] == "(Muted)":
            self.mute = True
            self.audio_level = int(split_string[-2]) 
