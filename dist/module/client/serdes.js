import 'zalgo-promise/src';

import { STANDARD_REQUEST_OPTIONS } from '../constants';
import { serializeHeaders, deserializeHeaders } from '../serdes';
import { extractKeys } from '../util';

export function serializeRequest(options) {

    var result = extractKeys(options, STANDARD_REQUEST_OPTIONS);

    if (result.method) {
        result.method = result.method.toLowerCase();
    }

    if (options && options.headers) {
        result.headers = serializeHeaders(options.headers);
    }

    return result;
}

export function deserializeResponse(response) {
    return response.text().then(function (text) {
        return new window.Response(text, {
            status: response.status,
            statusText: response.statusText,
            headers: deserializeHeaders(response.headers)
        });
    });
}