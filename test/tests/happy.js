/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { once } from 'post-robot/src';

import { connect } from '../../src';

const FRAME_URL = `${ window.location.protocol }//${ window.location.host }/base/test/windows/frame/index.htm`;

describe('happy cases', () => {

    it('should make a request with a text response, and return the correct response', () => {

        let url = '/api/foo';
        let text = 'ok';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = (fetchUrl) => {
                if (fetchUrl !== url) {
                    throw new Error(`Expected ${ fetchUrl } to be ${ url }`);
                }

                return ZalgoPromise.resolve(new Response(text));
            };

            return serve({
                allow: []
            });

        }).then(() => {
            return proxy.fetch(url);

        }).then(response => {

            if (!(response instanceof window.Response)) {
                throw new TypeError(`Expected response to be instance of Response`);
            }

            return response.text();

        }).then(responseText => {

            if (responseText !== text) {
                throw new Error(`Expected ${ responseText } to be ${ text }`);
            }
        });
    });

    it('should make a request with a method and text response, and return the correct response', () => {

        let url = '/api/foo';
        let method = 'get';
        let text = 'ok';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = (fetchUrl, fetchOptions) => {
                if (fetchUrl !== url) {
                    throw new Error(`Expected ${ fetchUrl } to be ${ url }`);
                }

                if (fetchOptions.method !== method) {
                    throw new Error(`Expected ${ fetchOptions.method } to be ${ method }`);
                }

                return ZalgoPromise.resolve(new Response(text));
            };

            return serve({
                allow: []
            });

        }).then(() => {
            return proxy.fetch(url, { method });

        }).then(response => {

            if (!(response instanceof window.Response)) {
                throw new TypeError(`Expected response to be instance of Response`);
            }

            return response.text();

        }).then(responseText => {

            if (responseText !== text) {
                throw new Error(`Expected ${ responseText } to be ${ text }`);
            }
        });
    });

    it('should make a request with a json response, and return the correct response', () => {

        let url = '/api/foo';
        let method = 'get';
        let json = { foo: { bar: 'baz', boo: true }, x: null };

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = (fetchUrl, fetchOptions) => {
                if (fetchUrl !== url) {
                    throw new Error(`Expected ${ fetchUrl } to be ${ url }`);
                }

                if (fetchOptions.method !== method) {
                    throw new Error(`Expected ${ fetchOptions.method } to be ${ method }`);
                }

                return ZalgoPromise.resolve(new Response(JSON.stringify(json)));
            };

            return serve({
                allow: []
            });

        }).then(() => {
            return proxy.fetch(url, { method });

        }).then(response => {

            if (!(response instanceof window.Response)) {
                throw new TypeError(`Expected response to be instance of Response`);
            }

            return response.json();

        }).then(responseJson => {

            if (JSON.stringify(responseJson) !== JSON.stringify(json)) {
                throw new Error(`Expected ${ JSON.stringify(responseJson) } to be ${ JSON.stringify(json) }`);
            }
        });
    });

    it('should make a request with method post, and return the correct response', () => {

        let url = '/api/foo';
        let method = 'post';
        let text = 'ok';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = (fetchUrl, fetchOptions) => {
                if (fetchUrl !== url) {
                    throw new Error(`Expected ${ fetchUrl } to be ${ url }`);
                }

                if (fetchOptions.method !== method) {
                    throw new Error(`Expected ${ fetchOptions.method } to be ${ method }`);
                }

                return ZalgoPromise.resolve(new Response(text));
            };

            return serve({
                allow: []
            });

        }).then(() => {
            return proxy.fetch(url, { method });

        }).then(response => {

            if (!(response instanceof window.Response)) {
                throw new TypeError(`Expected response to be instance of Response`);
            }

            return response.text();

        }).then(responseText => {

            if (responseText !== text) {
                throw new Error(`Expected ${ responseText } to be ${ text }`);
            }
        });
    });

    it('should make a request with a 500 response, and return the correct response', () => {

        let url = '/api/foo';
        let method = 'get';
        let text = 'ok';
        let status = 500;
        let statusText = 'error';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = (fetchUrl, fetchOptions) => {
                if (fetchUrl !== url) {
                    throw new Error(`Expected ${ fetchUrl } to be ${ url }`);
                }

                if (fetchOptions.method !== method) {
                    throw new Error(`Expected ${ fetchOptions.method } to be ${ method }`);
                }

                return ZalgoPromise.resolve(new Response(text, { status, statusText }));
            };

            return serve({
                allow: []
            });

        }).then(() => {
            return proxy.fetch(url, { method });

        }).then(response => {

            if (!(response instanceof window.Response)) {
                throw new TypeError(`Expected response to be instance of Response`);
            }

            if (response.status !== status) {
                throw new Error(`Expected status ${ response.status } to be ${ status }`);
            }

            if (response.statusText !== statusText) {
                throw new Error(`Expected statusText ${ response.statusText } to be ${ statusText }`);
            }

            return response.text();

        }).then(responseText => {

            if (responseText !== text) {
                throw new Error(`Expected ${ responseText } to be ${ text }`);
            }
        });
    });

    it('should make a request with request headers, and return the correct response', () => {

        let url = '/api/foo';
        let method = 'get';
        let text = 'ok';
        let requestHeaders = {
            'foo':         'bar',
            'hello-world': 'goodbye-world'
        };

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = (fetchUrl, fetchOptions) => {
                if (fetchUrl !== url) {
                    throw new Error(`Expected ${ fetchUrl } to be ${ url }`);
                }

                if (fetchOptions.method !== method) {
                    throw new Error(`Expected ${ fetchOptions.method } to be ${ method }`);
                }

                for (let key of Object.keys(requestHeaders)) {
                    let expected = requestHeaders[key];
                    let actual = fetchOptions.headers.get(key);

                    if (expected !== actual) {
                        throw new Error(`Expected header ${ key } to be ${ expected }, got ${ actual }`);
                    }
                }

                return ZalgoPromise.resolve(new Response(text));
            };

            return serve({
                allow: []
            });

        }).then(() => {
            return proxy.fetch(url, {
                method,
                headers: new Headers(requestHeaders)
            });

        }).then(response => {

            if (!(response instanceof window.Response)) {
                throw new TypeError(`Expected response to be instance of Response`);
            }

            return response.text();

        }).then(responseText => {

            if (responseText !== text) {
                throw new Error(`Expected ${ responseText } to be ${ text }`);
            }
        });
    });

    it('should make a request with response headers, and return the correct response', () => {

        let url = '/api/foo';
        let method = 'get';
        let text = 'ok';
        let responseHeaders = {
            'foo':         'bar',
            'hello-world': 'goodbye-world'
        };

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = (fetchUrl, fetchOptions) => {
                if (fetchUrl !== url) {
                    throw new Error(`Expected ${ fetchUrl } to be ${ url }`);
                }

                if (fetchOptions.method !== method) {
                    throw new Error(`Expected ${ fetchOptions.method } to be ${ method }`);
                }

                return ZalgoPromise.resolve(new Response(text, {
                    headers: new Headers(responseHeaders)
                }));
            };

            return serve({
                allow: []
            });

        }).then(() => {
            return proxy.fetch(url, {
                method,
                headers: new Headers(responseHeaders)
            });

        }).then(response => {

            if (!(response instanceof window.Response)) {
                throw new TypeError(`Expected response to be instance of Response`);
            }

            for (let key of Object.keys(responseHeaders)) {
                let expected = responseHeaders[key];
                let actual = response.headers.get(key);

                if (expected !== actual) {
                    throw new Error(`Expected header ${ key } to be ${ expected }, got ${ actual }`);
                }
            }

            return response.text();

        }).then(responseText => {

            if (responseText !== text) {
                throw new Error(`Expected ${ responseText } to be ${ text }`);
            }
        });
    });

    it('should make a request with request options, and return the correct response', () => {

        let url = '/api/foo';
        let text = 'ok';
        let requestOptions = {
            method:      'delete',
            body:        'foobarbaz',
            mode:        'cors',
            credentials: 'foo:bar',
            cache:       'none',
            redirect:    'default',
            referrer:    'http://www.zombo.com',
            integrity:   'wegwegjpo23r234op23op'
        };

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = (fetchUrl, fetchOptions) => {
                if (fetchUrl !== url) {
                    throw new Error(`Expected ${ fetchUrl } to be ${ url }`);
                }

                for (let key of Object.keys(requestOptions)) {
                    let expected = requestOptions[key];
                    let actual = fetchOptions[key];

                    if (expected !== actual) {
                        throw new Error(`Expected request option ${ key } to be ${ expected }, got ${ actual }`);
                    }
                }

                return ZalgoPromise.resolve(new Response(text));
            };

            return serve({
                allow: []
            });

        }).then(() => {
            return proxy.fetch(url, requestOptions);

        }).then(response => {

            if (!(response instanceof window.Response)) {
                throw new TypeError(`Expected response to be instance of Response`);
            }

            return response.text();

        }).then(responseText => {

            if (responseText !== text) {
                throw new Error(`Expected ${ responseText } to be ${ text }`);
            }
        });
    });

    it('should not pass options which are not specified', () => {

        let url = '/api/foo';
        let text = 'ok';
        let requestKeys = [ 'method', 'body', 'mode', 'credentials', 'cache', 'redirect', 'referrer', 'integrity' ];

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = (fetchUrl, fetchOptions) => {
                if (fetchUrl !== url) {
                    throw new Error(`Expected ${ fetchUrl } to be ${ url }`);
                }

                for (let key of requestKeys) {
                    if (fetchOptions.hasOwnProperty(key)) {
                        throw new Error(`Expected request to not have option: ${ key }`);
                    }
                }

                return ZalgoPromise.resolve(new Response(text));
            };

            return serve({
                allow: []
            });

        }).then(() => {
            return proxy.fetch(url);

        }).then(response => {

            if (!(response instanceof window.Response)) {
                throw new TypeError(`Expected response to be instance of Response`);
            }

            return response.text();

        }).then(responseText => {

            if (responseText !== text) {
                throw new Error(`Expected ${ responseText } to be ${ text }`);
            }
        });
    });
});
