/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { send } from 'post-robot/src';

import { FETCH_PROXY } from '../constants';

import { deserializeResponse } from './deserialize';

export function fetch(win : CrossDomainWindowType, url : string, options : FetchOptionsType) : ZalgoPromise<Response> {
    return send(win, FETCH_PROXY, { url, options })
        .then(({ data }) => deserializeResponse(data));
}
