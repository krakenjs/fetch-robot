/* @flow */

import { on } from 'post-robot/src';

import { FETCH_PROXY } from '../constants';

import { serializeResponse } from './serialize';

type ServeOptions = {|
    allow : Array<{|

    |}>
|};

export function serve({ allow = [] } : ServeOptions = {}) : CancelableType {

    if (!allow) {
        throw new Error(`Request not allowed`);
    }

    let listener = on(FETCH_PROXY, {}, ({ data: { url, options } }) => {
        return window.fetch(url, options)
            .then(response => serializeResponse(response));
    });

    return {
        cancel: listener.cancel
    };
}
