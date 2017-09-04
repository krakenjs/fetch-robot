/* @flow */

import { send } from 'post-robot/src';

import { serve } from '../../../src';

send(window.parent, 'proxyFrameLoad', { serve });
