import '../elements/tatva-infotip.js';

/**
 * Storybook configuration for tatva-infotip component
 */
export default {
    title: 'Examples/Infotip',
    component: 'tatva-infotip',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Interactive tooltip component with customizable icons, positioning, and styling.',
            },
        },
    },
    argTypes: {
        content: {
            control: 'text',
            description: 'Tooltip content to display',
        },
        underline: {
            control: 'boolean',
            description: 'Show dotted underline on trigger text',
        },
        'icon-enabled': {
            control: 'boolean',
            description: 'Enable/disable icon display',
        },
        'icon-position': {
            control: 'inline-radio',
            options: ['left', 'right'],
            description: 'Position of icon relative to text',
        },
        'icon-type': {
            control: 'select',
            options: ['info', 'help', 'caution', 'error', 'notAllowed', 'starEmpty'],
            description: 'Type of icon to display',
        },
        'icon-color': {
            control: 'color',
            description: 'Color of the icon',
        },
        offset: {
            control: { type: 'number' },
            description: 'Distance between trigger and tooltip (px)',
        },
        'overlay-placement': {
            control: 'select',
            options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
            description: 'Preferred placement of tooltip',
        },
        'overlay-text-color': {
            control: 'color',
            description: 'Text color in tooltip',
        },
        'overlay-background-color': {
            control: 'color',
            description: 'Background color of tooltip',
        },
    },
    args: {
        content: 'This is helpful information that appears in the tooltip',
        underline: false,
        'icon-enabled': true,
        'icon-position': 'left',
        'icon-type': 'info',
        'icon-color': '#000000',
        offset: 6,
        'overlay-placement': 'top',
        'overlay-text-color': '#ffffff',
        'overlay-background-color': '#000000',
    },
};

/**
 * Template function to create tatva-infotip component instances
 * @param {Object} args - Component arguments from Storybook controls
 * @returns {HTMLElement} Configured tatva-infotip element
 */
const Template = (args) => {
    const el = document.createElement('tatva-infotip');

    Object.entries(args).forEach(([key, value]) => {
        if (value == null) return;
        el.setAttribute(key, String(value));
    });

    // Add some default slot content
    el.textContent = args.slotContent || 'Hover or focus for info';

    return el;
};

export const Default = {
    render: Template,
};

export const InfoIcon = {
    render: Template,
    args: {
        content: 'This provides additional context and helpful information about the feature.',
        'icon-type': 'info',
        'icon-color': '#0066cc',
        underline: true,
        slotContent: 'Learn more',
    },
};

export const HelpIcon = {
    render: Template,
    args: {
        content: 'Need assistance? This tooltip provides helpful guidance and tips.',
        'icon-type': 'help',
        'icon-position': 'right',
        'icon-color': '#28a745',
        'overlay-placement': 'bottom',
        slotContent: 'Help',
    },
};

export const IconOnly = {
    render: (args) => {
        const el = Template(args);
        el.textContent = ''; // Remove text content
        return el;
    },
    args: {
        content: 'This is an icon-only tooltip for minimal UI elements.',
        'icon-type': 'info',
        'icon-color': '#17a2b8',
        'overlay-placement': 'top',
    },
};

export const TextOnly = {
    render: Template,
    args: {
        content: 'Additional information without any visual icon indicator.',
        'icon-enabled': false,
        underline: true,
        'overlay-placement': 'bottom',
        slotContent: 'Underlined text with tooltip',
    },
};