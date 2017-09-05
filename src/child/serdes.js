/* @flow */

import { serializeHeaders, deserializeHeaders, REQUEST_OPTIONS } from '../serdes';
import { extractKeys } from '../util';

export function deserializeRequest(options : SerializedRequestType) : FetchOptionsType {

    let result = extractKeys(options, REQUEST_OPTIONS);

    if (options && options.headers) {
        result.headers = deserializeHeaders(options.headers);
    }

    return result;
}

export function serializeResponse(response : Response) : SerializedResponseType {
    return {
        status:      response.status,
        statusText:  response.statusText,
        text:        response.text.bind(response),
        headers:     serializeHeaders(response.headers)
    };
}
