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
    method? : ?string,
    headers? : ?Headers,
    body? : ?(string | Blob | BufferSource | FormData | URLSearchParams | USVString),
    mode? : ?string,
    credentials? : ?string,
    cache? : ?string,
    redirect? : ?string,
    referrer? : ?string,
    integrity? : ?string
|};

export type SerializedRequestType = {|
    method? : ?string,
    headers? : ?{ [string] : string },
    body? : ?string,
    mode? : ?string,
    credentials? : ?string,
    cache? : ?string,
    redirect? : ?string,
    referrer? : ?string,
    integrity? : ?string
|};

export type SerializedResponseType = {|
    status : number,
    statusText : string,
    headers : { [string] : string },
    text : () => ZalgoPromise<text>
|};

export type CancelableType = {
    cancel : () => void
};
