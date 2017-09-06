Fetch Robot
-----------

Run `fetch()` through an iframe proxy to avoid dealing with CORS.

Uses [post-robot](https://github.com/krakenjs/post-robot) for frame-to-frame communication.

### Why?

- CORS requires server-side changes on each endpoint
- For non-GET requests, preflight requests must be sent to verify the origin, which affects site-speed
- Support is limited in older browsers
- CORS headers only allow a certain degree of granularity

Example
-------

Let's say:

- I'm on `https://www.rorschach.com`
- I want to make a request to `https://www.niteowl.com`

In the parent window `rorschach.com`:

```javascript
<script src="https://rawgit.com/krakenjs/fetch-robot/master/dist/fetch-robot.min.js"></script>

<script>
    // Create a proxy instance and open the iframe

    let proxy = fetchRobot.connect({ url: 'https://www.niteowl.com/fetch-robot-proxy' });

    // Use `proxy.fetch` in the same way as `fetch`

    proxy.fetch('https://www.niteowl.com/api/foo', { method: 'POST' })
        .then(response => response.text())
        .then(console.log);
</script>
```

In the child window `niteowl.com/fetch-robot-proxy`:

```javascript
<!-- Add a fetch polyfill for older browsers -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.min.js"></script>
<script src="https://rawgit.com/krakenjs/fetch-robot/master/dist/fetch-robot.min.js"></script>

<script>
    // Enable requests to be passed through the current frame using fetchRobot

    fetchRobot.serve({

        allow: [
            {
                path: [
                    '/api/foo',
                    '/api/bar'
                ],

                headers: [
                    'x-csrf'
                ]
            },

            {
                origin: 'https://some-domain.com',

                path: [
                    '/api/baz',
                ],

                headers: [
                    'x-custom-header'
                ],

                credentials: 'include'
            }
        ]
    });
</script>
```

Rules
-----

Pass one or more rules in `allow`.

- If any of the rules pass for a given request, the request will be allowed through.
- If no rules pass, the request will error out

Each option in a rule can be one of:

- string (e.g. `origin: 'https://foo.com'`)
- array (e.g. `origin: [ 'https://foo.com', 'https://bar.com' ]`)
- regex (e.g. `origin: new RegExp('https://(foo|bar)\.com')`)
- wildcard (e.g. `origin: '*'`)

### Available options

- `origin` - The domain(s) from which the request can be sent
  - default: `'*'`
- `domain` - The domain(s) to which the request can be sent
  - default: domain where `fetchRobot.serve()` was called
- `path` - The path(s) to which requests can be sent
  - default: `[]`
- `query` - The query param(s) which can be sent with the request
  - default: `'*'`
- `credentials` - The credential level which can be sent with requests
  - default: `[ 'omit' ]`
- `method` - The method(s) with which requests can be sent
  - default: `[ 'get', 'head', 'post', 'put', 'delete', 'connect', 'options', 'trace', 'patch' ]`
- `headers` - The headers(s) which can be sent with the request
  - default: `[ 'accept', 'accept-language', 'content-language', 'content-type' ]`
- `responseHeaders` - The header(s) which can be sent with the response
  - default: `[ 'cache-control', 'content-language', 'content-type', 'expires', 'last-modified', 'pragma' ]`

Quick Start
-----------

#### Getting Started

- Run setup: `./setup.sh`
- Start editing code in `./src` and writing tests in `./tests`
- `gulp build`

#### Building

```bash
npm run build
```

#### Tests

- Edit tests in `./test/tests`
- Run the tests:

  ```bash
  gulp test
  ```

#### Testing with different/multiple browsers

```bash
npm run karma -- --browser=PhantomJS
npm run karma -- --browser=Chrome
npm run karma -- --browser=Safari
npm run karma -- --browser=Firefox
npm run karma -- --browser=PhantomJS,Chrome,Safari,Firefox
```

#### Keeping the browser open after tests

```bash
npm run karma -- --browser=Chrome --keep-browser-open
```

#### Publishing

- Publish your code: `./publish.sh`
