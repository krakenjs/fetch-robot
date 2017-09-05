import { destroyFrames } from './client';
import { destroyListeners } from './server';

export function destroyAll() {
    destroyFrames();
    destroyListeners();
}