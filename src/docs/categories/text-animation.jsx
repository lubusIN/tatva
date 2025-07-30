/**
 * External dependencies.
 */
import React from 'react'
import {
    __experimentalHeading as Heading,
    __experimentalVStack as VStack
} from "@wordpress/components";

/**
 * Internal dependencies.
 */
import * as patterns from '../patterns';

/**
 * Render ActionPanels
 */

function TextAnimation() {
    return (
        <VStack
            align="center"
            style={{
                height: '100%',
                justifyContent: 'center',
            }}>
            <Heading size={25}>
                <tatva-text-animation
                    animation-type="typing"
                    words='[
                   "Hello tatva", 
                   "from lubus"
                 ]'
                />
            </Heading>
        </VStack>
    );
};

TextAnimation.meta = {
    title: 'Text Animation',
    path: '/text-animation',
    patterns: patterns.TextAnimation,
};

export default TextAnimation;
