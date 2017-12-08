# Bathroom State WebSocket API

The Bathroom State server applications contains support for a real-time websocket API. This allows clients to retrieve updates on the state of the bathroom lock in real time, without the need for polling or long polling.

To connect to the server, client should connect to "ws://serverurl/state". The server will immediately respond with the current state of the log in the following format:

            { 
                "state": "occupied"
            }

Valid states are "occupied" and "available". The server will re-send the state whenever it is modified. 

If the client wishes to verify that the server is still listening, it may send "ping". The server will immediately respond with "pong". If the client does not receieve a response it may choose to restart the socket connection to ensure that real time state updates are not interrupted.