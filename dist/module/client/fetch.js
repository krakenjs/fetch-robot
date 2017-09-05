import 'zalgo-promise/src';
import { send } from 'post-robot/src';

import { FETCH_PROXY } from '../constants';

import { serializeRequest, deserializeResponse } from './serdes';

export function fetch(win, url) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return send(win, FETCH_PROXY, {
        url: url,
        options: serializeRequest(options)
    }).then(function (_ref) {
        var data = _ref.data;
        return deserializeResponse(data);
    });
}