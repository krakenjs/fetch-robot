import { getDomain } from 'cross-domain-utils/src';
import URL from 'url-parse';

import { WILDCARD, STANDARD_REQUEST_METHODS, STANDARD_REQUEST_HEADERS, STANDARD_RESPONSE_HEADERS, STANDARD_REQUEST_OPTIONS } from '../constants';
import { isRegex } from '../util';

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

function stringifyMatcher(matcher) {
    if (Array.isArray(matcher)) {
        if (matcher.length === 0) {
            return '[]';
        }
        return '[ ' + matcher.join(', ') + ' ]';
    }

    return matcher.toString();
}

function match(value, matcher) {
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

function validateMatch(name, value, matcher) {

    if (Array.isArray(value)) {
        for (var _iterator3 = value, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var item = _ref3;

            validateMatch(name, item, matcher);
        }
    } else {
        if (!match(value, matcher)) {
            throw new Error('Invalid ' + name + ': ' + value + ' - allowed: ' + stringifyMatcher(matcher));
        }
    }
}

function parseUrl(url) {

    var parsedUrl = new URL(url, window.mockDomain || window.location, true);

    var domain = parsedUrl.protocol + '//' + parsedUrl.host;
    var path = parsedUrl.pathname;
    var query = parsedUrl.query;

    return { domain: domain, path: path, query: query };
}

export function checkRequestRules(origin, url, options, allow) {
    var _parseUrl = parseUrl(url),
        domain = _parseUrl.domain,
        path = _parseUrl.path,
        query = _parseUrl.query;

    for (var _iterator4 = allow, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref4 = _iterator4[_i4++];
        } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref4 = _i4.value;
        }

        var rule = _ref4;


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

        for (var _iterator5 = items, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref6;

            if (_isArray5) {
                if (_i5 >= _iterator5.length) break;
                _ref6 = _iterator5[_i5++];
            } else {
                _i5 = _iterator5.next();
                if (_i5.done) break;
                _ref6 = _i5.value;
            }

            var _ref7 = _ref6;
            var _name = _ref7.name,
                _value = _ref7.value;

            validateMatch(_name, _value, rule.hasOwnProperty(_name) ? rule[_name] : DEFAULT_RULES[_name]);
        }
    }
}

export function checkResponseRules(response, allow) {
    for (var _iterator6 = allow, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
        var _ref8;

        if (_isArray6) {
            if (_i6 >= _iterator6.length) break;
            _ref8 = _iterator6[_i6++];
        } else {
            _i6 = _iterator6.next();
            if (_i6.done) break;
            _ref8 = _i6.value;
        }

        var rule = _ref8;


        var items = [{
            name: 'responseHeaders',
            value: Object.keys(response.headers)
        }];

        for (var _iterator7 = items, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
            var _ref10;

            if (_isArray7) {
                if (_i7 >= _iterator7.length) break;
                _ref10 = _iterator7[_i7++];
            } else {
                _i7 = _iterator7.next();
                if (_i7.done) break;
                _ref10 = _i7.value;
            }

            var _ref11 = _ref10;
            var _name2 = _ref11.name,
                _value2 = _ref11.value;

            validateMatch(_name2, _value2, rule.hasOwnProperty(_name2) ? rule[_name2] : DEFAULT_RULES[_name2]);
        }
    }
}