export function serializeHeaders(headers) {
    var result = {};

    Array.from(headers.keys()).forEach(function (key) {
        result[key] = headers.get(key);
    });

    return result;
}

export function serializeResponse(response) {
    return {
        ok: response.ok,
        redirected: response.redirected,
        status: response.status,
        statusText: response.statusText,
        type: response.type,
        url: response.url,
        bodyUsed: response.bodyUsed,

        headers: serializeHeaders(response.headers),
        text: response.text.bind(response),
        json: response.json.bind(response),

        clone: function clone() {
            return serializeResponse(response.clone());
        }
    };
}