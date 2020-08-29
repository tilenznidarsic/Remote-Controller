import os, sys, time, json
import socketio
import subprocess
from aiohttp import web
from controller import ComputerController

#################### setup #############################
OS = sys.platform

if OS == "win32":
    os.chdir("SetVol")

# Default password
password = "pass"

try:
    password = sys.argv[1]
    os.system("cls" if OS=="win32" else "clear")
except:
    print("Default password!")

mypc = ComputerController(password)

#################### server #############################
sio = socketio.AsyncServer(cors_allowed_origins="*")
app = web.Application()
sio.attach(app)

@sio.event
def connect(sid, t):
    #print('connection established: ', sid)
    pass

@sio.event
def disconnect(sid):
    #print('disconnected from server: ', sid)
    pass

@sio.event
async def status(sid):
    print(f"Status Request from {sid}")
    await sio.emit("reply", room=sid, data=mypc.toJSON())

@sio.event
def sync(sid):
    print(f"Sync request from: {sid}")
    mypc.update()

@sio.event
def settings(sid, data):
    parsed = json.loads(data)
    
    if parsed["amount"] == None:
        mypc.should_beep = eval(parsed["beep"])
    else:
        mypc.vol_change_amount = int(parsed["amount"])
        mypc.should_beep = eval(parsed["beep"])

@sio.event
def execute(sid, data):
    # data executes ComputerController function
    print("Execute: " + str(data))
    eval("mypc." + str(data))
    sys.stdout.flush()



if __name__ == "__main__":
    web.run_app(app)