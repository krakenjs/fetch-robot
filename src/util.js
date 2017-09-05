/* @flow */

export function extractKeys(obj : ?Object, predicate : (string) => boolean) : Object {
    let result = {};

    if (!obj) {
        return result;
    }

    for (let key of Object.keys(obj)) {
        if (predicate(key)) {
            result[key] = obj[key];
        }
    }

    return result;
}

export function extractKeysByArray(obj : ?Object, keys : Array<string>) : Object {
    return extractKeys(obj, key => keys.indexOf(key) !== -1);
}

export function extractKeysByRegex(obj : ?Object, regex : RegExp) : Object {
    return extractKeys(obj, key => regex.test(key));
}

export function extractKeysByString(obj : ?Object, str : string) : Object {
    return extractKeys(obj, key => key === str);
}

export function isRegex(item : mixed) : boolean {
    return Object.prototype.toString.call(item) === '[object RegExp]';
}
