import React from 'react';

/**
 * Image Compare Component Examples Configurations Array
 */
const imageCompareVariantConfigs = [
    {
        title: 'Default',
        isDefault: true,
        path: '/image-compare',
        component: () => <tatva-image-compare />
    },
    {
        title: 'Arrow Handle',
        component: () => <tatva-image-compare handle="arrow" />
    },
    {
        title: 'Circle Handle',
        component: () => <tatva-image-compare handle="circle" />
    },
    {
        title: 'Rectangle Handle',
        component: () => <tatva-image-compare handle="rectangle" />
    },
    {
        title: 'Hover Handle',
        component: () => <tatva-image-compare handle="arrow" hover="true" />
    },
    {
        title: 'Custom Handle',
        component: () => (
            <tatva-image-compare handle="arrow" hover="true">
                <svg slot="arrow-left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                </svg>
                <svg slot="arrow-right" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </tatva-image-compare>
        )
    }
];

// Generate components dynamically
const createComponent = (variant) => {
    const Component = () => {
        return variant.component();
    };

    Component.meta = {
        title: variant.title,
        name: variant.name,
        category: 'Image Compare',
        path: variant.path,
        isDefault: variant.isDefault,
        component: Component, // Add the component to meta
        rawComponent: variant.component // Add the raw component for code extraction,
    };

    return Component;
};

// Export all components
const imageCompareVariants = imageCompareVariantConfigs.map(createComponent).map(comp => comp.meta);

// Export variants (which now contains the proper Component objects)
export {
    imageCompareVariants
};