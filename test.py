import socketio
import sys


sio = socketio.Client()

@sio.event
def connect():
    print('connection established')



sio.connect('http://localhost:8080')


while True:
    dec = input("Plus or minus?")
    
    if dec == "+":
        sio.emit('execute', data="plus")
    elif dec == "-":
        sio.emit("execute", data="minus")