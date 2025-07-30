/**
 * External dependencies.
 */
import React from 'react'

/**
 * Internal dependencies.
 */
import * as patterns from '../patterns';

/**
 * Render ActionPanels
 */

function ImageCompare() {
    return (
        <tatva-image-compare
            before="assets/before.png"
            after="assets/after.png"
        />
    );
};

ImageCompare.meta = {
    title: 'Image Compare',
    path: '/image-compare',
    patterns: patterns.ImageCompare,
};

export default ImageCompare;
