import os
import sys
import socketio
import subprocess
from aiohttp import web


os.chdir("SetVol")

################ Volume controls with setvol #############
def set_volume(vol):
    subprocess.call(["setvol", "{}".format(vol), "beep"])
    print("Settig volume to {}".format(vol))

def plus_volume(amount):
    subprocess.call(["setvol", "+{}".format(amount), "beep"])
    print("Setting volume +{}".format(amount))

def minus_volume(amount):
    subprocess.call(["setvol", "-{}".format(amount), "beep"])
    print("Settig volume -{}".format(amount))

def mute_volume():
    subprocess.call(["setvol", "mute"])
    print("Volume MUTE!")


def unmute_volume():
    subprocess.call(["setvol", "unmute"])
    print("Volume UNMUTE!")



###################### OS functions ######################
def lock_computer():
    os.system("rundll32.exe user32.dll LockWorkStation")


def shutdown_computer(time):
    os.system("shutdown -s -t {}".format(time))




#################### server #############################
sio = socketio.AsyncServer(cors_allowed_origins="*")
app = web.Application()
sio.attach(app)

@sio.event
def connect(o, t):
    print('connection established: ', o)

@sio.event
def disconnect(o):
    print('disconnected from server: ', o)

@sio.event
def execute(sid, data):
    eval(data)
    sys.stdout.flush()


if __name__ == "__main__":
    web.run_app(app)