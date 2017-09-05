import { getDomain } from 'cross-domain-utils/src';
import URL from 'url-parse';

import { WILDCARD, STANDARD_REQUEST_METHODS, STANDARD_REQUEST_HEADERS, STANDARD_RESPONSE_HEADERS, STANDARD_REQUEST_OPTIONS } from '../constants';
import { isRegex, extractKeysByArray, extractKeysByRegex, extractKeysByString } from '../util';

export var DEFAULT_RULES = {
    origin: WILDCARD,
    domain: getDomain(),
    path: [],
    query: WILDCARD,
    method: STANDARD_REQUEST_METHODS,
    headers: STANDARD_REQUEST_HEADERS,
    options: STANDARD_REQUEST_OPTIONS,
    responseHeaders: STANDARD_RESPONSE_HEADERS
};

function validateMatcher(name, matcher) {

    if (typeof matcher === 'string') {
        return;
    } else if (isRegex(matcher)) {
        return;
    } else if (Array.isArray(matcher)) {
        if (matcher.every(function (option) {
            return typeof option === 'string';
        })) {
            return;
        }
    }

    throw new Error('Invalid matcher for ' + name + ': ' + Object.prototype.toString.call(matcher));
}

function extractMatches(obj, matcher) {

    if (matcher === WILDCARD) {
        return obj;
    }

    if (Array.isArray(matcher)) {
        return extractKeysByArray(obj, matcher);
    } else if (isRegex(matcher)) {
        // $FlowFixMe
        return extractKeysByRegex(obj, matcher);
    } else if (typeof matcher === 'string') {
        return extractKeysByString(obj, matcher);
    }

    throw new Error('Invalid matcher');
}

export function validateRules(rules) {
    for (var _iterator = rules, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var rule = _ref;

        for (var _iterator2 = Object.keys(rule), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var key = _ref2;

            if (!DEFAULT_RULES.hasOwnProperty(key)) {
                throw new Error('Unexpected rule: ' + key);
            }
            validateMatcher(key, rule[key]);
        }
    }
}

function stringifyValue(value) {

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return '[]';
        }
        return '[ ' + value.map(function (item) {
            return '\'' + item + '\'';
        }).join(', ') + ' ]';
    }

    return '\'' + value + '\'';
}

function stringifyMatcher(matcher) {

    if (typeof matcher === 'string') {
        return '[ \'' + matcher + '\' ]';
    }

    if (Array.isArray(matcher)) {
        if (matcher.length === 0) {
            return '[]';
        }
        return '[ ' + matcher.map(function (item) {
            return '\'' + item + '\'';
        }).join(', ') + ' ]';
    }

    if (isRegex(matcher)) {
        return '/' + matcher.source + '/';
    }

    return matcher.toString();
}

function match(value, matcher) {

    if (Array.isArray(value)) {
        return value.every(function (item) {
            return match(item, matcher);
        });
    }

    if (typeof matcher === 'string') {
        return matcher === WILDCARD || value === matcher;
    } else if (isRegex(matcher)) {
        // $FlowFixMe
        return matcher.test(value);
    } else if (Array.isArray(matcher)) {
        return matcher.some(function (option) {
            return option === value;
        });
    }
    return false;
}

function parseUrl(url) {

    var parsedUrl = new URL(url, window.mockDomain || window.location, true);

    var domain = parsedUrl.protocol + '//' + parsedUrl.host;
    var path = parsedUrl.pathname;
    var query = parsedUrl.query;

    return { domain: domain, path: path, query: query };
}

export function getMatchingRequestRule(origin, url, options, allow) {
    var _parseUrl = parseUrl(url),
        domain = _parseUrl.domain,
        path = _parseUrl.path,
        query = _parseUrl.query;

    var failedRules = [];

    for (var _iterator3 = allow, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
        } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
        }

        var rule = _ref3;


        var failedMatchers = [];

        var items = [{
            name: 'origin',
            value: origin
        }, {
            name: 'domain',
            value: domain
        }, {
            name: 'method',
            value: options.method || 'get'
        }, {
            name: 'path',
            value: path
        }, {
            name: 'query',
            value: Object.keys(query)
        }, {
            name: 'headers',
            value: Object.keys(options.headers || {})
        }, {
            name: 'options',
            value: Object.keys(options)
        }];

        for (var _iterator4 = items, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref6;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref6 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref6 = _i4.value;
            }

            var _ref7 = _ref6;
            var _name = _ref7.name,
                _value = _ref7.value;

            var matcher = rule.hasOwnProperty(_name) ? rule[_name] : DEFAULT_RULES[_name];

            if (!match(_value, matcher)) {
                failedMatchers.push({ name: _name, value: _value, matcher: matcher });
            }
        }

        if (failedMatchers.length) {
            failedRules.push(failedMatchers);
        } else {
            return rule;
        }
    }

    var errMessage = failedRules.map(function (failedMatchers) {
        return failedMatchers.map(function (_ref4) {
            var name = _ref4.name,
                value = _ref4.value,
                matcher = _ref4.matcher;

            return '- ' + name + ' :: got ' + stringifyValue(value) + ' - expected ' + stringifyMatcher(matcher);
        }).join('\n');
    }).join('\n\n');

    throw new Error('Failed to find matching rule for request:\n\n' + errMessage + '\n');
}

export function filterResponseHeaders(headers, rule) {
    var responseHeaders = rule.responseHeaders || DEFAULT_RULES.responseHeaders || [];
    return extractMatches(headers, responseHeaders);
}