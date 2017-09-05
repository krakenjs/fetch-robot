import { fetch as _fetch } from './fetch';
import { getFrame } from './frame';

export function connect(_ref) {
    var url = _ref.url;


    var win = getFrame(url).contentWindow;

    return {
        // eslint-disable-next-line compat/compat
        fetch: function fetch(fetchUrl, fetchOptions) {
            return _fetch(win, fetchUrl, fetchOptions);
        }
    };
}