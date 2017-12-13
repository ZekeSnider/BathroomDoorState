# Bathroom Door State Client
This is the Raspberry Pi client code to be used RFID-RC522 module. Wiring diagram coming soon.

Note: This project uses the [MFRC522](https://github.com/mxgxw/MFRC522-python) open source library.

## Hardware Installation
Coming soon..

## Software Installation
0. Install raspbian, SSH in
1. `sudo apt-get update`
2. `Sudo apt-get install python-dev`
3. `pip install -r requirements.txt`
4. Edit /boot/config.txt (`sudo vim /boot.config.txt`) and add the following lines:
device_tree_param=spi=on
dtoverlay=spi-bcm2708
5. `sudo reboot`
6. `python index.py`