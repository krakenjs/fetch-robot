/* @flow */

import { getDomain } from 'cross-domain-utils/src';
import URL from 'url-parse';

import { WILDCARD, STANDARD_REQUEST_METHODS, STANDARD_REQUEST_HEADERS,
    STANDARD_RESPONSE_HEADERS, STANDARD_REQUEST_OPTIONS,
    REQUEST_CREDENTIALS } from '../constants';
import { isRegex, extractKeysByArray, extractKeysByRegex, extractKeysByString } from '../util';

export const DEFAULT_RULES : AllowRuleType = {
    origin:          WILDCARD,
    domain:          getDomain(),
    path:            [],
    query:           WILDCARD,
    method:          STANDARD_REQUEST_METHODS,
    headers:         STANDARD_REQUEST_HEADERS,
    credentials:     REQUEST_CREDENTIALS.OMIT,
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

function extractMatches(obj : Object, matcher : StringMatcherType) : Object {

    if (matcher === WILDCARD) {
        return obj;
    }

    if (Array.isArray(matcher)) {
        return extractKeysByArray(obj, matcher);
    } else if (isRegex(matcher)) {
        // $FlowFixMe
        return extractKeysByRegex(obj, matcher);
    } else if (typeof matcher === 'string') {
        return extractKeysByString(obj, matcher);
    }

    throw new Error(`Invalid matcher`);
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

function stringifyValue(value : string | Array<string>) : string {

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return '[]';
        }
        return `[ ${ value.map(item => `'${ item }'`).join(', ') } ]`;
    }

    return `'${ value }'`;
}

function stringifyMatcher(matcher : StringMatcherType) : string {

    if (typeof matcher === 'string') {
        return `[ '${ matcher }' ]`;
    }

    if (Array.isArray(matcher)) {
        if (matcher.length === 0) {
            return '[]';
        }
        return `[ ${ matcher.map(item => `'${ item }'`).join(', ') } ]`;
    }

    if (isRegex(matcher)) {
        return `/${ matcher.source }/`;
    }

    return matcher.toString();
}

function match(value : string | Array<string>, matcher : StringMatcherType) : boolean {

    if (Array.isArray(value)) {
        return value.every(item => match(item, matcher));
    }

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

function parseUrl(url : string) : { domain : string, path : string, query : { [string] : string } } {

    let parsedUrl = new URL(url, window.mockDomain || window.location, true);

    let domain = `${ parsedUrl.protocol }//${ parsedUrl.host }`;
    let path   = parsedUrl.pathname;
    let query  = parsedUrl.query;

    return { domain, path, query };
}

export function getMatchingRequestRule(origin : string, url : string, options : SerializedRequestType, allow : Array<AllowRuleType>) : AllowRuleType {
    let  { domain, path, query } = parseUrl(url);

    let failedRules = [];

    for (let rule of allow) {

        let failedMatchers = [];

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
                name:  'credentials',
                value: options.credentials || REQUEST_CREDENTIALS.OMIT
            },
            {
                name:  'options',
                value: Object.keys(options)
            }
        ];

        for (let { name, value } of items) {
            let matcher = rule.hasOwnProperty(name) ? rule[name] : DEFAULT_RULES[name];

            if (!match(value, matcher)) {
                failedMatchers.push({ name, value, matcher });
            }
        }

        if (failedMatchers.length) {
            failedRules.push(failedMatchers);
        } else {
            return rule;
        }
    }

    let errMessage = failedRules.map(failedMatchers => {
        return failedMatchers.map(({ name, value, matcher }) => {
            return `- ${ name } :: got ${ stringifyValue(value) } - expected ${ stringifyMatcher(matcher) }`;
        }).join('\n');
    }).join('\n\n');

    throw new Error(`Failed to find matching rule for request:\n\n${ errMessage }\n`);
}

export function filterResponseHeaders(headers : { [string] : string }, rule : AllowRuleType) : { [string] : string } {
    let responseHeaders = rule.responseHeaders || DEFAULT_RULES.responseHeaders || [];
    return extractMatches(headers, responseHeaders);
}
