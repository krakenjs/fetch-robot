Fetch Robot
-----------

Run `fetch()` through an iframe proxy to avoid dealing with CORS.

Example
-------

Let's say:

- I'm on `https://www.rorschach.com`
- I want to make a request to `https://www.niteowl.com`

In the parent window `rorschach.com`:

```javascript
// Create a proxy instance and open the iframe

let proxy = fetchRobot.connect({ url: 'https://www.niteowl.com/fetch-robot-proxy' });

// Use `proxy.fetch` as if it were

proxy.fetch('https://www.niteowl.com/api/foo', { method: 'POST' })
    .then(response => response.text())
    .then(console.log);
 ```

In the child window `niteowl.com/fetch-robot-proxy`:

```javascript
// Enable requests to be passed through the current frame

fetchRobot.serve({

    allow: [
        {
            origin: '*',

            paths: [
                '/api/foo',
                '/api/bar'
            ],

            headers: [
                'x-csrf'
            ]
        }
    ]
});
```

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
