/**
 * External dependencies
 */
import React from 'react';

/**
 * Marker Component Examples Configurations Array
 */
const markerVariantConfigs = [
    {
        title: 'Circle',
        type: 'circle'
    },
    {
        title: 'Cross',
        type: 'cross'
    },
    {
        title: 'Curly',
        type: 'curly'
    },
    {
        title: 'Double',
        type: 'double',
        isDefault: true,
        path: '/marker',
    },
    {
        title: 'Double Underline',
        type: 'double-underline'
    },
    {
        title: 'Strike',
        type: 'strike'
    },
    {
        title: 'Strikethrough',
        type: 'strikethrough'
    },
    {
        title: 'Underline',
        type: 'underline'
    },
    {
        title: 'Underline Zigzag',
        type: 'underline-zigzag'
    }
];

// Generate components dynamically
const createComponent = (variant) => {
    const Component = () => {
        return (
            <tatva-marker type={variant.type}>
                Tatva
            </tatva-marker>
        );
    };

    Component.meta = {
        title: variant.title,
        name: variant.name,
        category: 'Marker',
        path: variant.path,
        isDefault: variant.isDefault,
        component: Component, // Add the component to meta
        rawComponent: () => (
            <tatva-marker type={variant.type}>
                tatva
            </tatva-marker>
        ) // Add the raw component for code extraction
    };

    return Component;
};

// Export all components
const markerVariants = markerVariantConfigs.map(createComponent).map(comp => comp.meta);

// Export variants (which now contains the proper Component objects)
export {
    markerVariants
};