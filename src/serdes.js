/* @flow */

export const REQUEST_OPTIONS = [
    'method', 'body', 'mode', 'credentials', 'cache',
    'redirect', 'referrer', 'integrity'
];

export function serializeHeaders(headers : ?Headers) : { [string] : string } {
    let result = {};

    if (!headers) {
        return result;
    }

    for (let key of Array.from(headers.keys())) {
        result[key] = headers.get(key);
    }

    return result;
}

export function deserializeHeaders(headers : ?{ [string] : string }) : Headers {
    return new Headers(headers || {});
}
