import { getDomainFromUrl } from 'cross-domain-utils/src';

var frames = {};

export function getFrame(url) {
    var domain = getDomainFromUrl(url);

    if (!frames[domain]) {

        var frame = document.createElement('iframe');
        frame.style.display = 'none';
        frame.setAttribute('src', url);

        var container = document.body || document.head;

        if (!container) {
            throw new Error('Could not find suitable container for proxy iframe');
        }

        container.appendChild(frame);

        frames[domain] = frame;
    }

    return frames[domain];
}

export function destroyAll() {
    for (var _iterator = Object.keys(frames), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var domain = _ref;

        var frame = frames[domain];
        frame.parentNode.removeChild(frame);
        delete frames[domain];
    }
}