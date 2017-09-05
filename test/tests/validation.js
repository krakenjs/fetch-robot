/* @flow */
/* eslint max-lines: 0 */

import { serve } from '../../src';

describe('validation cases', () => {

    it('should try to serve with an valid string matcher and not error out', () => {

        serve({
            allow: [
                {
                    origin: 'http://foo.com'
                }
            ]
        });
    });

    it('should try to serve with an valid array matcher and not error out', () => {

        serve({
            allow: [
                {
                    origin: [ 'http://foo.com', 'https://www.bar.com' ]
                }
            ]
        });
    });

    it('should try to serve with an valid regex matcher and not error out', () => {

        serve({
            allow: [
                {
                    origin: /http:\/\/.*\.com/
                }
            ]
        });
    });

    it('should try to serve with an invalid matcher and error out', () => {

        let error;

        try {
            serve({
                allow: [
                    {
                        origin: 123
                    }
                ]
            });
        } catch (err) {
            error = err;
        }

        if (!error) {
            throw new Error(`Expected error to be thrown`);
        }
    });

    it('should try to serve with an invalid rule nmae and error out', () => {

        let error;

        try {
            serve({
                allow: [
                    {
                        zoiks: 'helloworld'
                    }
                ]
            });
        } catch (err) {
            error = err;
        }

        if (!error) {
            throw new Error(`Expected error to be thrown`);
        }
    });
});
