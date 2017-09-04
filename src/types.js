/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

declare var __TEST__ : boolean;
declare var __IE_POPUP_SUPPORT__ : boolean;

export type CrossDomainWindowType = {|
    location : string | Object,
    self : CrossDomainWindowType,
    closed : boolean,
    open : (string, string, string) => CrossDomainWindowType,
    close : () => void
|};

export type FetchOptionsType = {|
    method : string
|};

export type SerializedResponseType = {|
    ok : boolean,
    redirected : boolean,
    status : number,
    statusText : string,
    type : string,
    url : string,
    bodyUsed : boolean,

    headers : { [string] : string },
    text : () => ZalgoPromise<text>,
    json : () => ZalgoPromise<mixed>,

    clone : () => SerializedResponseType
|};

export type CancelableType = {
    cancel : () => void
};
