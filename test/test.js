/* @flow */

import './util';
import './tests';
import { destroyAll } from '../src';

afterEach(() => {
    destroyAll();
});
