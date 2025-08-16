/**
 * External dependencies.
 */
import React from 'react';
import {
    __experimentalHeading as Heading,
    __experimentalVStack as VStack,
} from "@wordpress/components";
/**
 * Internal dependencies.
 */
import * as examples from '../examples';

/**
 * Render Pulse
 */

function Pulse() {
    return (
        <VStack
            align="center"
            style={{
                height: '100%',
                justifyContent: 'center',
            }}>
            <Heading size={'45px'} align="center">
                <tatva-pulse
                    class="flex"
                    color="crimson"
                    size="1.4rem">
                    tatva
                </tatva-pulse>
            </Heading>
        </VStack>
    );
};

Pulse.meta = {
    title: 'Pulse',
    path: '/pulse',
    examples: examples.Pulse,
};

export default Pulse;
