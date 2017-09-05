/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { serializeHeaders, deserializeHeaders } from '../serdes';

export function serializeRequest(options : FetchOptionsType) : SerializedRequestType {
    return {
        method:      options.method,
        body:        options.body,
        mode:        options.mode,
        credentials: options.credentials,
        cache:       options.cache,
        redirect:    options.redirect,
        referrer:    options.referrer,
        integrity:   options.integrity,
        headers:     serializeHeaders(options.headers)
    };
}

export function deserializeResponse(response : SerializedResponseType) : ZalgoPromise<Response> {
    return response.text().then(text => {
        return new window.Response(text, {
            status:     response.status,
            statusText: response.statusText,
            headers:    deserializeHeaders(response.headers)
        });
    });
}
