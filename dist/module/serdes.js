export function serializeHeaders(headers) {
    var result = {};

    if (!headers) {
        return result;
    }

    for (var _iterator = Array.from(headers.keys()), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

        result[key.toLowerCase()] = headers.get(key);
    }

    return result;
}

export function deserializeHeaders(headers) {
    return new Headers(headers || {});
}