/* @flow */

import { getDomainFromUrl } from 'cross-domain-utils/src';

let frames = {};

export function getFrame(url : string) : HTMLIFrameElement {
    let domain = getDomainFromUrl(url);

    if (!frames[domain]) {

        let frame = document.createElement('iframe');
        frame.style.display = 'none';
        frame.setAttribute('src', url);

        let container = document.body || document.head;

        if (!container) {
            throw new Error(`Could not find suitable container for proxy iframe`);
        }

        container.appendChild(frame);

        frames[domain] = frame;
    }

    return frames[domain];
}

export function destroyFrames() {
    for (let domain of Object.keys(frames)) {
        let frame = frames[domain];
        frame.parentNode.removeChild(frame);
        delete frames[domain];
    }
}
