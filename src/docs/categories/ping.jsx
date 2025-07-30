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
import * as patterns from '../patterns/';

/**
 * Render ActionPanels
 */

function Ping() {
    return (
        <VStack
            align="center"
            style={{
                height: '100%',
                justifyContent: 'center',
            }}>
            <Heading size={'45px'} align="center">
                <tatva-ping
                    class="flex"
                    color="crimson"
                    size="1.4rem">
                    tatva
                </tatva-ping>
            </Heading>
        </VStack>
    );
};

Ping.meta = {
    title: 'Ping',
    path: '/ping',
    patterns: patterns.Ping,
};

export default Ping;
