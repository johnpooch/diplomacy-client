# diplomacy-client

A client for [@johnpooch](https://github.com/johnpooch)'s Diplomacy service: https://github.com/johnpooch/diplomacy

## Setting up a development environment

- Make sure you have [Yarn](https://classic.yarnpkg.com/en/docs/install) installed
- Clone repo and enter directory
- `yarn install`
- `yarn start` - the dev server should open at http://localhost:8000
- Before you start developing, install [VSCode](https://code.visualstudio.com)
- Open this directory in VSCode, and install the recommended extensions to lint on save

### Accessing the dev copy on a mobile device

It can be useful to test a dev copy from a mobile device to check how touch gestures behave with the canvas.

The easiest way to access a dev copy on mobile is to use [ngrok](https://ngrok.com/download).
Once you have set up ngrok as per the documentation, you can expose your dev copy using:
`./ngrok http 8000`.
In order to get the Mock Service Worker to behave when working over ngrok, you need to use https for the SERVICE_URI. On windows, start the dev server like this:

```
($env:USE_MOCK_SERVICE_WORKER = 'true') -and ($env:SERVICE_URI = 'https://127.0.0.1:8082/api/v1/') -and (yarn start)
```

Now you should be able to access the dev server on your device using the url given to you by ngrok.

**Note** if you are using an iPhone, you can use [Safari to debug issues](https://www.browserstack.com/guide/how-to-debug-on-iphone).

# Running the tests

- `yarn test`
