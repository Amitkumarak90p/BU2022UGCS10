# BU2022UGCS10
Logging was implemented using the provided evaluation endpoint.

However, logging fails due to:
CORS misconfiguration on the server: returns multiple Access-Control-Allow-Origin headers.

Undocumented request body format, causing 400 Bad Request.
The logger() function is correctly integrated and will work when the server is fixed.
Logs are sent using Bearer token authentication.