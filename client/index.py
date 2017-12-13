#!/usr/bin/env python
# -*- coding: utf8 -*-
#https://github.com/mxgxw/MFRC522-python

import RPi.GPIO as GPIO
import MFRC522
from enum import Enum
import signal
import requests
import json
import time

SLEEP_TIME = 500
continue_reading = True

class DoorState(Enum):
    available = 1
    occupied = 2

lastState = None

with open('config.json') as json_data_file:
    configData = json.load(json_data_file)

# Capture SIGINT for cleanup when the script is aborted
def end_read(signal,frame):
    global continue_reading
    continue_reading = False
    GPIO.cleanup()

def update_server_state(state):
    payload = {'state': state.name, 'key': configData['key']}
    try:
        requests.post(configData['apiEndpoint'], data=json.dumps(payload))
    except: 
        pass

# Hook the SIGINT
signal.signal(signal.SIGINT, end_read)

# Create an object of the class MFRC522
MIFAREReader = MFRC522.MFRC522()

while continue_reading:
    # Scan for cards    
    (status,TagType) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)

    if status == MIFAREReader.MI_OK:
        currentState = DoorState.occupied
    else:
        currentState = DoorState.available

    if (lastState != currentState):
        update_server_state(currentState)

    lastState = currentState
    time.sleep(SLEEP_TIME/1000) 
        