/**
 * External dependencies
 */
import React from 'react';

/**
 * Pulse Component Examples Configurations Array
 */
const pulseVariantConfigs = [
    {
        title: 'Default',
        component: () => <tatva-pulse />
    },
    {
        title: 'Color',
        component: () => <tatva-pulse color="#e14d43" />
    },
    {
        title: 'Size',
        component: () => <tatva-pulse color="#3858e9" size="1.2rem" />
    },
    {
        title: 'Content',
        isDefault: true,
        path: '/pulse',
        component: () => (
            <tatva-pulse color="#008710" size="1.4rem">
                Tatva
            </tatva-pulse>
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
        category: 'Pulse',
        path: variant.path,
        isDefault: variant.isDefault,
        component: Component, // Add the component to meta
        rawComponent: variant.component // Add the raw component for code extraction,
    };

    return Component;
};

// Export all components
const pulseVariants = pulseVariantConfigs.map(createComponent).map(comp => comp.meta);

// Export variants (which now contains the proper Component objects)
export {
    pulseVariants
};