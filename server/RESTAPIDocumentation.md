FORMAT: 1A
# Bathroom State REST API
This is the API documentation for the server REST API in charge of updating/setting the bathroom lock's state.

## State [/state]

### Set State [POST]
Valid states are "occupied" and "available". The key is the secret key defined in the server's keyconfig file.

+ Request (application/json)
    + Body

            {
                "key": "samplekey",
                "state": "occupied"
            }

+ Response 200 (application/json)
    + Body

            { 
                "state":"occupied"
            }

+ Response 400 (application/json)
    + Body

            {
                "status": "failure",
                "message": "Invalid authentication key provided."
            }

+ Response 400 (application/json)
    + Body

            {
                "status": "failure",
                "message": "Invalid state provided."
            }

### Retrieve State [GET]

+ Response 200
    + Body

            {
                "state":"occupied"
            }


## HomePage [/]

### Retrieve HomePage [GET]

+ Response 200 (text/html)