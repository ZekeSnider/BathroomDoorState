# Bathroom State Server Application

This is the NodeJS/Express server application which manages the state of the bathroom door lock. It provides a REST API, WebSocket API, and web frontend. Refer to RESTAPIDocumentation.md and WebSocketDocumentation for API details.

To start the server, follow these steps:

0. Install node/npm
1. `npm install`
2. Create the config file. `cp keyconfig-TEMPLATE.json keyconfig.json`
3. Fill in the config file with unique key. `vim keyconfig.json`
4. Change the port in `server.js` to whatever port you wish to use.
4. `node server`