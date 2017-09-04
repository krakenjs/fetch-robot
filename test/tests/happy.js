/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { once } from 'post-robot/src';

import { connect } from '../../src';

const FRAME_URL = `${ window.location.protocol }//${ window.location.host }/base/test/windows/frame/index.htm`;

describe('happy cases', () => {

    it('should make a simple request and return a text response', () => {

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
});
