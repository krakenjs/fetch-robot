import { STANDARD_REQUEST_OPTIONS } from '../constants';
import { serializeHeaders, deserializeHeaders } from '../serdes';
import { extractKeysByArray } from '../util';

export function deserializeRequest(options) {

    var result = extractKeysByArray(options, STANDARD_REQUEST_OPTIONS);

    if (options && options.headers) {
        result.headers = deserializeHeaders(options.headers);
    }

    return result;
}

export function serializeResponse(response) {
    return {
        status: response.status,
        statusText: response.statusText,
        text: response.text.bind(response),
        headers: serializeHeaders(response.headers)
    };
}