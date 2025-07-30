/**
 * External dependencies.
 */
import React from 'react'
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

function Marker() {
    return (
        <VStack
            align="center"
            style={{
                height: '100%',
                justifyContent: 'center',
            }}>
            <Heading size={'45px'} align="center">
                <tatva-marker type="circle">
                    tatva
                </tatva-marker>
            </Heading>
        </VStack>
    );
};

Marker.meta = {
    title: 'Marker',
    path: '/marker',
    patterns: patterns.Marker,
};

export default Marker;
