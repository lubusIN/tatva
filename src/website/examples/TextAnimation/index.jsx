/**
 * External dependencies
 */
import React from 'react';

/**
 * Text Animation Component Examples Configurations Array
 */
const textAnimationVariantConfigs = [
    {
        title: 'Typing',
        isDefault: true,
        path: '/text-animation',
        component: () => (
            <tatva-text-animation
                type="typing"
                words='[
            "Hello tatva", 
            "from lubus"
          ]'
            />
        )
    },
    {
        title: 'Flyin',
        component: () => (
            <tatva-text-animation
                type="flyin"
                words="Hello lubus !"
            />
        )
    },
    {
        title: 'Fade',
        component: () => (
            <tatva-text-animation
                type="fade"
                words="Hello Tatva !"
            />
        )
    },
];

// Generate components dynamically
const createComponent = (variant) => {
    const Component = () => {
        return variant.component();
    };

    Component.meta = {
        title: variant.title,
        name: variant.name,
        category: 'Text Animation',
        path: variant.path,
        isDefault: variant.isDefault,
        component: Component, // Add the component to meta
        rawComponent: variant.component // Add the raw component for code extraction,
    };

    return Component;
};

// Export all components
const textAnimationVariants = textAnimationVariantConfigs.map(createComponent).map(comp => comp.meta);

// Export variants (which now contains the proper Component objects)
export {
    textAnimationVariants
};