/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { once } from 'post-robot/src';
import { getDomain } from 'cross-domain-utils/src';

import { connect } from '../../src';

const FRAME_URL = `${ window.location.protocol }//${ window.location.host }/base/test/windows/frame/index.htm`;

function expectError(promise : ZalgoPromise<mixed>) : ZalgoPromise<mixed> {
    let error;

    return promise.catch(err => {
        error = err;
    }).then(() => {
        if (!error) {
            throw new Error(`Expected error to be thrown`);
        }
    });
}

describe('rule cases', () => {

    it('should make a request with an allowed string path', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);
        });
    });

    it('should make a request with an allowed array path', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path: [ path ]
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);
        });
    });

    it('should make a request with an allowed regex constructor path', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path: new RegExp('^/api/foo$')
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);
        });
    });

    it('should make a request with an allowed literal regex path', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path: /^\/api\/foo$/
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);
        });
    });

    it('should make a request with a disallowed path and error out', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path: [ '/api/bar' ]
                    }
                ]
            });

        }).then(() => {
            return expectError(proxy.fetch(path));
        });
    });

    it('should make a request with a default allowed domain', () => {

        let domain = 'mock://www.third-party-site.com';
        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path: [ path ]
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(`${ domain }${ path }`);
        });
    });

    it('should make a request with a default allowed domain and disallowed path', () => {

        let domain = 'mock://www.third-party-site.com';
        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path: [ path ]
                    }
                ]
            });

        }).then(() => {
            return expectError(proxy.fetch(`${ domain }/api/bar`));
        });
    });

    it('should make a request with an explicitly allowed domain', () => {

        let domain = 'mock://another-site.com';
        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        domain,
                        path: [ path ]
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(`${ domain }${ path }`);
        });
    });

    it('should make a request with an allowed method', () => {

        let path = '/api/foo';
        let method = 'delete';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = (fetchUrl, fetchOptions) => {

                if (fetchOptions.method !== method) {
                    throw new Error(`Expected ${ fetchOptions.method } to be ${ method }`);
                }

                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path:   [ path ],
                        method: [ 'get', 'post', 'delete' ]
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path, { method });
        });
    });

    it('should make a request with a disallowed method and error out', () => {

        let path = '/api/foo';
        let method = 'delete';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path:   [ path ],
                        method: [ 'get', 'post' ]
                    }
                ]
            });

        }).then(() => {
            return expectError(proxy.fetch(path, { method }));
        });
    });

    it('should make a request with a explicitly allowed origin', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        origin: getDomain(),
                        path:   [ path ]
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);
        });
    });

    it('should make a request with a disallowed default origin and error out', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        origin: [],
                        path:   [ path ]
                    }
                ]
            });

        }).then(() => {
            return expectError(proxy.fetch(path));
        });
    });

    it('should make a request with allowed query params', () => {

        let path = '/api/foo';
        let query = 'x=1&abc=123';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path,
                        query: [ 'x', 'abc' ]
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(`${ path }?${ query }`);
        });
    });

    it('should make a request with disallowed query params and error out', () => {

        let path = '/api/foo';
        let query = 'y=5&zyx=helloworld';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path,
                        query: [ 'x', 'abc' ]
                    }
                ]
            });

        }).then(() => {
            return expectError(proxy.fetch(`${ path }?${ query }`));
        });
    });

    it('should make a request with an allowed default header', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path,
                        headers: [ 'content-type' ]
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path, {
                headers: new Headers({
                    'content-type': 'text/plain'
                })
            });
        });
    });

    it('should make a request with a disallowed default header and error out', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path,
                        headers: []
                    }
                ]
            });

        }).then(() => {
            return expectError(proxy.fetch(path, {
                headers: new Headers({
                    'content-type': 'text/plain'
                })
            }));
        });
    });

    it('should make a request with an allowed custom header', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path,
                        headers: [ 'x-csrf' ]
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path, {
                headers: new Headers({
                    'x-csrf': 'abc123'
                })
            });
        });
    });

    it('should make a request with a disallowed custom header and error out', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path,
                        headers: []
                    }
                ]
            });

        }).then(() => {
            return expectError(proxy.fetch(path, {
                headers: new Headers({
                    'x-csrf': 'abc123'
                })
            }));
        });
    });

    it('should make a request with a disallowed default header and error out', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path,
                        headers: []
                    }
                ]
            });

        }).then(() => {
            return expectError(proxy.fetch(path, {
                headers: new Headers({
                    'content-type': 'text/plain'
                })
            }));
        });
    });

    it('should make a request with an allowed default request option', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path, {
                mode: 'cors'
            });
        });
    });

    it('should make a request with a disallowed default request option and error out', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path,
                        options: []
                    }
                ]
            });

        }).then(() => {
            return expectError(proxy.fetch(path, {
                mode: 'cors'
            }));
        });
    });

    it('should make a request with an allowed default header in the response', () => {

        let path = '/api/foo';
        let header = 'pragma';
        let value = 'nocache';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response('foo', {
                    headers: new Headers({
                        [ header ]: value
                    })
                }));
            };

            return serve({
                allow: [
                    {
                        path
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);

        }).then(response => {

            if (response.headers.get(header) !== value) {
                throw new Error(`Expected ${ header } header to be ${ value }`);
            }
        });
    });

    it('should make a request with a disallowed default header in the response and not return it to the client', () => {

        let path = '/api/foo';
        let header = 'pragma';
        let value = 'nocache';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response('foo', {
                    headers: new Headers({
                        [ header ]: value
                    })
                }));
            };

            return serve({
                allow: [
                    {
                        path,
                        responseHeaders: []
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);

        }).then(response => {

            if (response.headers.get(header)) {
                throw new Error(`Expected ${ header } header to be blank`);
            }
        });
    });

    it('should make a request with an allowed custom header string in the response', () => {

        let path = '/api/foo';
        let header = 'x-csrf';
        let value = 'abc123';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response('foo', {
                    headers: new Headers({
                        [ header ]: value
                    })
                }));
            };

            return serve({
                allow: [
                    {
                        path,
                        responseHeaders: 'x-csrf'
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);

        }).then(response => {

            if (response.headers.get(header) !== value) {
                throw new Error(`Expected ${ header } header to be ${ value }`);
            }
        });
    });

    it('should make a request with an allowed custom header array in the response', () => {

        let path = '/api/foo';
        let header = 'x-csrf';
        let value = 'abc123';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response('foo', {
                    headers: new Headers({
                        [ header ]: value
                    })
                }));
            };

            return serve({
                allow: [
                    {
                        path,
                        responseHeaders: [ 'x-csrf' ]
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);

        }).then(response => {

            if (response.headers.get(header) !== value) {
                throw new Error(`Expected ${ header } header to be ${ value }`);
            }
        });
    });

    it('should make a request with an allowed custom header regex in the response', () => {

        let path = '/api/foo';
        let header = 'x-csrf';
        let value = 'abc123';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response('foo', {
                    headers: new Headers({
                        [ header ]: value
                    })
                }));
            };

            return serve({
                allow: [
                    {
                        path,
                        responseHeaders: /^x-csrf$/
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);

        }).then(response => {

            if (response.headers.get(header) !== value) {
                throw new Error(`Expected ${ header } header to be ${ value }`);
            }
        });
    });

    it('should make a request with an allowed custom header wildcard in the response', () => {

        let path = '/api/foo';
        let header = 'x-csrf';
        let value = 'abc123';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response('foo', {
                    headers: new Headers({
                        [ header ]: value
                    })
                }));
            };

            return serve({
                allow: [
                    {
                        path,
                        responseHeaders: '*'
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);

        }).then(response => {

            if (response.headers.get(header) !== value) {
                throw new Error(`Expected ${ header } header to be ${ value }`);
            }
        });
    });

    it('should make a request with a disallowed custom header in the response and not return it to the client', () => {

        let path = '/api/foo';
        let header = 'x-csrf';
        let value = 'abc123';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response('foo', {
                    headers: new Headers({
                        [ header ]: value
                    })
                }));
            };

            return serve({
                allow: [
                    {
                        path,
                        responseHeaders: []
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);

        }).then(response => {

            if (response.headers.get(header)) {
                throw new Error(`Expected ${ header } header to be blank`);
            }
        });
    });

    it('should make a request with a non-matching and a matching rule', () => {

        let path = '/api/foo';

        let proxy = connect({ url: FRAME_URL });

        return once('proxyFrameLoad').then(({ source, data: { serve } }) => {

            // $FlowFixMe
            source.fetch = () => {
                return ZalgoPromise.resolve(new Response());
            };

            return serve({
                allow: [
                    {
                        path: '/api/bar'
                    },
                    {
                        path
                    }
                ]
            });

        }).then(() => {
            return proxy.fetch(path);
        });
    });
});
