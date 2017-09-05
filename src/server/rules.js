/* @flow */

import { getDomain } from 'cross-domain-utils/src';
import URL from 'url-parse';

import { WILDCARD, STANDARD_REQUEST_METHODS, STANDARD_REQUEST_HEADERS,
    STANDARD_RESPONSE_HEADERS, STANDARD_REQUEST_OPTIONS } from '../constants';
import { isRegex } from '../util';

export const DEFAULT_RULES : AllowRuleType = {
    origin:          WILDCARD,
    domain:          getDomain(),
    path:            [],
    query:           WILDCARD,
    method:          STANDARD_REQUEST_METHODS,
    headers:         STANDARD_REQUEST_HEADERS,
    options:         STANDARD_REQUEST_OPTIONS,
    responseHeaders: STANDARD_RESPONSE_HEADERS
};

function validateMatcher(name : string, matcher : mixed) {

    if (typeof matcher === 'string') {
        return;
    } else if (isRegex(matcher)) {
        return;
    } else if (Array.isArray(matcher)) {
        if (matcher.every(option => typeof option === 'string')) {
            return;
        }
    }

    throw new Error(`Invalid matcher for ${ name }: ${ Object.prototype.toString.call(matcher) }`);
}

export function validateRules(rules : Array<AllowRuleType>) : ?boolean {
    for (let rule of rules) {
        for (let key of Object.keys(rule)) {
            if (!DEFAULT_RULES.hasOwnProperty(key)) {
                throw new Error(`Unexpected rule: ${ key }`);
            }
            validateMatcher(key, rule[key]);
        }
    }
}

function stringifyMatcher(matcher : StringMatcherType) : string {
    if (Array.isArray(matcher)) {
        if (matcher.length === 0) {
            return '[]';
        }
        return `[ ${ matcher.join(', ') } ]`;
    }

    return matcher.toString();
}

function match(value : string, matcher : StringMatcherType) : boolean {
    if (typeof matcher === 'string') {
        return (matcher === WILDCARD || value === matcher);
    } else if (isRegex(matcher)) {
        // $FlowFixMe
        return matcher.test(value);
    } else if (Array.isArray(matcher)) {
        return matcher.some(option => option === value);
    }
    return false;
}

function validateMatch(name : string, value : string | Array<string>, matcher : StringMatcherType) {

    if (Array.isArray(value)) {
        for (let item of value) {
            validateMatch(name, item, matcher);
        }
    } else {
        if (!match(value, matcher)) {
            throw new Error(`Invalid ${ name }: ${ value } - allowed: ${ stringifyMatcher(matcher) }`);
        }
    }
}

function parseUrl(url : string) : { domain : string, path : string, query : { [string] : string } } {

    let parsedUrl = new URL(url, window.mockDomain || window.location, true);

    let domain = `${ parsedUrl.protocol }//${ parsedUrl.host }`;
    let path   = parsedUrl.pathname;
    let query  = parsedUrl.query;

    return { domain, path, query };
}

export function checkRequestRules(origin : string, url : string, options : SerializedRequestType, allow : Array<AllowRuleType>) {
    let  { domain, path, query } = parseUrl(url);

    for (let rule of allow) {

        let items : Array<{ name : string, value : string | Array<string> }> = [
            {
                name:  'origin',
                value: origin
            },
            {
                name:  'domain',
                value: domain
            },
            {
                name:  'method',
                value: options.method || 'get'
            },
            {
                name:  'path',
                value: path
            },
            {
                name:  'query',
                value: Object.keys(query)
            },
            {
                name:  'headers',
                value: Object.keys(options.headers || {})
            },
            {
                name:  'options',
                value: Object.keys(options)
            }
        ];

        for (let { name, value } of items) {
            validateMatch(name, value, rule.hasOwnProperty(name) ? rule[name] : DEFAULT_RULES[name]);
        }
    }
}

export function checkResponseRules(response : SerializedResponseType, allow : Array<AllowRuleType>) {
    for (let rule of allow) {

        let items : Array<{ name : string, value : string | Array<string> }> = [
            {
                name:  'responseHeaders',
                value: Object.keys(response.headers)
            }
        ];

        for (let { name, value } of items) {
            validateMatch(name, value, rule.hasOwnProperty(name) ? rule[name] : DEFAULT_RULES[name]);
        }
    }
}
