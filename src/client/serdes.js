/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { STANDARD_REQUEST_OPTIONS } from '../constants';
import { serializeHeaders, deserializeHeaders } from '../serdes';
import { extractKeys } from '../util';

export function serializeRequest(options : ?FetchOptionsType) : SerializedRequestType {

    let result = extractKeys(options, STANDARD_REQUEST_OPTIONS);

    if (result.method) {
        result.method = result.method.toLowerCase();
    }

    if (options && options.headers) {
        result.headers = serializeHeaders(options.headers);
    }

    return result;
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
