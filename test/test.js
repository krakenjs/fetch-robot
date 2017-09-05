/* @flow */

import './util';
import './tests';
import { destroyAll } from '../src';

window.mockDomain = 'mock://www.first-party-site.com';

afterEach(() => {
    destroyAll();
});
