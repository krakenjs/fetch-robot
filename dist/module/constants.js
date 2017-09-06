export var FETCH_PROXY = 'fetch-robot-proxy';

export var WILDCARD = '*';

export var STANDARD_REQUEST_METHODS = ['get', 'head', 'post', 'put', 'delete', 'connect', 'options', 'trace', 'patch'];

export var STANDARD_REQUEST_HEADERS = ['accept', 'accept-language', 'content-language', 'content-type'];

export var STANDARD_RESPONSE_HEADERS = ['cache-control', 'content-language', 'content-type', 'expires', 'last-modified', 'pragma'];

export var STANDARD_REQUEST_OPTIONS = ['method', 'body', 'mode', 'credentials', 'cache', 'redirect', 'referrer', 'integrity', 'headers'];

export var REQUEST_CREDENTIALS = {
    INCLUDE: 'include',
    SAME_ORIGIN: 'same-origin',
    OMIT: 'omit'
};

export var STANDARD_REQUEST_CREDENTIALS = [REQUEST_CREDENTIALS.INCLUDE, REQUEST_CREDENTIALS.SAME_ORIGIN, REQUEST_CREDENTIALS.OMIT];