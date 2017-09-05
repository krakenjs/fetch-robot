/* @flow */

import { send } from 'post-robot/src';

import { serve } from '../../../src';
import '../../util';

send(window.parent, 'proxyFrameLoad', { serve });
