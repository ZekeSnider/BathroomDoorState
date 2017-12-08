# BathroomDoorState

This is an application which manages the state of a bathroom door. There is a server application which manages a REST/WebSocket API, and a frontend web interface. The client application runs on a Raspberry Pi and uses NFC to determine whether the bathroom door is locked or unlocked. It uses the REST API to update's the server's state in real time.