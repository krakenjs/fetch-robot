/* @flow */

export function serializeHeaders(headers : Headers) : { [string] : string } {
    let result = {};

    Array.from(headers.keys()).forEach(key => {
        result[key] = headers.get(key);
    });

    return result;
}

export function serializeResponse(response : Response) : SerializedResponseType {
    return {
        ok:          response.ok,
        redirected:  response.redirected,
        status:      response.status,
        statusText:  response.statusText,
        type:        response.type,
        url:         response.url,
        bodyUsed:    response.bodyUsed,

        headers: serializeHeaders(response.headers),
        text:    response.text.bind(response),
        json:    response.json.bind(response),

        clone: () => serializeResponse(response.clone())
    };
}
