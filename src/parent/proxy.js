/* @flow */

import { fetch } from './fetch';
import { getFrame } from './frame';

type ConnectOptions = {|
    url : string
|};

type ConnectResponse = {|
    fetch : (url : string, options : ?FetchOptionsType) => ZalgoPromise<Response>
|};

export function connect({ url } : ConnectOptions) : ConnectResponse {

    let win = getFrame(url).contentWindow;

    return {
        // eslint-disable-next-line compat/compat
        fetch: (fetchUrl, fetchOptions) => fetch(win, fetchUrl, fetchOptions)
    };
}
