/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

export function deserializeResponse(response : SerializedResponseType) : ZalgoPromise<Response> {
    return response.text().then(text => {
        return new window.Response(text);
    });
}
