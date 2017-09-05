/* @flow */

import { serializeHeaders, deserializeHeaders } from '../serdes';

export function deserializeRequest(options : SerializedRequestType) : FetchOptionsType {
    return {
        method:      options.method,
        body:        options.body,
        mode:        options.mode,
        credentials: options.credentials,
        cache:       options.cache,
        redirect:    options.redirect,
        referrer:    options.referrer,
        integrity:   options.integrity,
        headers:     deserializeHeaders(options.headers)
    };
}

export function serializeResponse(response : Response) : SerializedResponseType {
    return {
        status:      response.status,
        statusText:  response.statusText,
        text:        response.text.bind(response),
        headers:     serializeHeaders(response.headers)
    };
}
