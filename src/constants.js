/* @flow */

export const FETCH_PROXY = 'fetch-robot-proxy';

export const WILDCARD = '*';

export const STANDARD_REQUEST_METHODS = [
    'get',
    'head',
    'post',
    'put',
    'delete',
    'connect',
    'options',
    'trace',
    'patch'
];

export const STANDARD_REQUEST_HEADERS = [
    'accept',
    'accept-language',
    'content-language',
    'content-type'
];

export const STANDARD_RESPONSE_HEADERS = [
    'cache-control',
    'content-language',
    'content-type',
    'expires',
    'last-modified',
    'pragma'
];

export const STANDARD_REQUEST_OPTIONS = [
    'method',
    'body',
    'mode',
    'credentials',
    'cache',
    'redirect',
    'referrer',
    'integrity',
    'headers'
];
