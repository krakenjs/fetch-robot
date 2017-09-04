import 'zalgo-promise/src';
import { send } from 'post-robot/src';

import { FETCH_PROXY } from '../constants';

import { deserializeResponse } from './deserialize';

export function fetch(win, url, options) {
    return send(win, FETCH_PROXY, { url: url, options: options }).then(function (_ref) {
        var data = _ref.data;
        return deserializeResponse(data);
    });
}