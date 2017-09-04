import 'zalgo-promise/src';

export function deserializeResponse(response) {
    return response.text().then(function (text) {
        return new window.Response(text);
    });
}