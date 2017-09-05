export function extractKeys(obj, predicate) {
    var result = {};

    if (!obj) {
        return result;
    }

    for (var _iterator = Object.keys(obj), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var key = _ref;

        if (predicate(key)) {
            result[key] = obj[key];
        }
    }

    return result;
}

export function extractKeysByArray(obj, keys) {
    return extractKeys(obj, function (key) {
        return keys.indexOf(key) !== -1;
    });
}

export function extractKeysByRegex(obj, regex) {
    return extractKeys(obj, function (key) {
        return regex.test(key);
    });
}

export function extractKeysByString(obj, str) {
    return extractKeys(obj, function (key) {
        return key === str;
    });
}

export function isRegex(item) {
    return Object.prototype.toString.call(item) === '[object RegExp]';
}