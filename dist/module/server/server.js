import { on } from 'post-robot/src';

import { FETCH_PROXY } from '../constants';

import { validateRules, getMatchingRequestRule, filterResponseHeaders, DEFAULT_RULES } from './rules';
import { deserializeRequest, serializeResponse } from './serdes';

var listeners = [];

export function serve() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$allow = _ref.allow,
        allow = _ref$allow === undefined ? [] : _ref$allow;

    if (allow.length === 0) {
        allow = [DEFAULT_RULES];
    }

    validateRules(allow);

    var listener = on(FETCH_PROXY, {}, function (_ref2) {
        var origin = _ref2.origin,
            _ref2$data = _ref2.data,
            url = _ref2$data.url,
            options = _ref2$data.options;


        var rule = getMatchingRequestRule(origin, url, options, allow);

        return window.fetch(url, deserializeRequest(options)).then(function (response) {
            var serializedResponse = serializeResponse(response);
            serializedResponse.headers = filterResponseHeaders(serializedResponse.headers, rule);
            return serializedResponse;
        });
    });

    listeners.push(listener);

    return {
        cancel: listener.cancel
    };
}

export function destroyListeners() {
    for (var _iterator = listeners, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref3 = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref3 = _i.value;
        }

        var listener = _ref3;

        listener.cancel();
    }
}