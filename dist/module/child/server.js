import { on } from 'post-robot/src';

import { FETCH_PROXY } from '../constants';

import { serializeResponse } from './serialize';

export function serve() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$allow = _ref.allow,
        allow = _ref$allow === undefined ? [] : _ref$allow;

    if (!allow) {
        throw new Error('Request not allowed');
    }

    var listener = on(FETCH_PROXY, {}, function (_ref2) {
        var _ref2$data = _ref2.data,
            url = _ref2$data.url,
            options = _ref2$data.options;

        return window.fetch(url, options).then(function (response) {
            return serializeResponse(response);
        });
    });

    return {
        cancel: listener.cancel
    };
}