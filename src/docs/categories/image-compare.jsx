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
            before="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-4.jpg"
            after="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-3.jpg"
        />
    );
};

ImageCompare.meta = {
    title: 'Image Compare',
    path: '/image-compare',
    patterns: patterns.ImageCompare,
};

export default ImageCompare;
