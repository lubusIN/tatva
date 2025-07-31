/**
 * External dependencies.
 */
import React from 'react'

/**
 * Internal dependencies.
 */
import * as examples from '../examples';

/**
 * Render Image Compare
 */

function ImageCompare() {
    return (
        <tatva-image-compare
            before="assets/before.png"
            after="assets/after.png"
            handle="circle"
            hover="true"
        />
    );
};

ImageCompare.meta = {
    title: 'Image Compare',
    path: '/image-compare',
    examples: examples.ImageCompare,
};

export default ImageCompare;
