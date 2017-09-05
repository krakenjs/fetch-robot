/* @flow */

import { on } from 'post-robot/src';

import { FETCH_PROXY } from '../constants';

import { validateRules, getMatchingRequestRule, filterResponseHeaders, DEFAULT_RULES } from './rules';
import { deserializeRequest, serializeResponse } from './serdes';

type ServeOptions = {|
    allow : Array<AllowRuleType>
|};

let listeners = [];

export function serve({ allow = [] } : ServeOptions = {}) : CancelableType {

    if (allow.length === 0) {
        allow = [ DEFAULT_RULES ];
    }

    validateRules(allow);

    let listener = on(FETCH_PROXY, {}, ({ origin, data: { url, options } }) => {

        const rule = getMatchingRequestRule(origin, url, options, allow);

        return window.fetch(url, deserializeRequest(options))
            .then(response => {
                let serializedResponse = serializeResponse(response);
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
    for (let listener of listeners) {
        listener.cancel();
    }
}
