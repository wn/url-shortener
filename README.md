# URL shortener url

Chrome extension to shorten a URL by sending a request to the backend and returning the shortened URL.

To configure this extension for your backend service, set server in extension options. Endpoint should receive a query of the form `http://localhost:3000/<path to your endpoint>?make=<long_url>`, and the response endpoint should be of the form 
```
{
    "short_url": <short_url>
}
```

