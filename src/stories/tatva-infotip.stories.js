import '../elements/tatva-infotip.js';

/**
 * Storybook configuration for tatva-infotip component
 */
export default {
    title: 'Examples/Infotip',
    component: 'tatva-infotip',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        controls: { expanded: true },
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
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        'icon-enabled': {
            control: 'boolean',
            description: 'Enable/disable icon display',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        'icon-position': {
            control: 'inline-radio',
            options: ['left', 'right'],
            description: 'Position of icon relative to text',
            table: { type: { summary: 'left | right' }, defaultValue: { summary: 'left' } },
        },
        'icon-type': {
            control: 'select',
            options: ['info', 'help', 'caution', 'error', 'notAllowed', 'starEmpty'],
            description: 'Type of icon to display',
            table: { type: { summary: 'enum' }, defaultValue: { summary: 'info' } },
        },
        'icon-color': {
            control: 'color',
            description: 'Color of the icon',
            table: { type: { summary: 'Color' }, defaultValue: { summary: '#000' } },
        },
        offset: {
            control: { type: 'number' },
            description: 'Distance between trigger and tooltip (px)',
            table: { type: { summary: 'number' }, defaultValue: { summary: '6' } },
        },
        'overlay-placement': {
            control: 'select',
            options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
            description: 'Preferred placement of tooltip',
            table: { type: { summary: 'enum' }, defaultValue: { summary: 'top' } },
        },
        'overlay-text-color': {
            control: 'color',
            description: 'Text color in tooltip',
            table: { type: { summary: 'Color' }, defaultValue: { summary: '#fff' } },
        },
        'overlay-background-color': {
            control: 'color',
            description: 'Background color of tooltip',
            table: { type: { summary: 'Color' }, defaultValue: { summary: '#000' } },
        },
        slot: {
            control: 'text',
            description: 'Text content to be highlighted by the marker.',
            table: { disable: true },
        },
        slotContent: {
            control: 'text',
            description: 'Text content to be highlighted by the marker.',
            table: { disable: true },
        },
    },
    args: {
        'icon-enabled': true,
    }
};

// Default values for comparison to avoid redundant attributes in the template
const DefaultValues = {
    content: 'Hello world',
    underline: false,
    'icon-enabled': false,
    'icon-position': 'left',
    'icon-type': 'info',
    offset: '6',
    'overlay-placement': 'top',
    'icon-color': "#000",
    'overlay-text-color': "#fff",
    'overlay-background-color': "#000"
}

/**
 * Template function to create tatva-infotip component instances
 * @param {Object} args - Component arguments from Storybook controls
 * @returns {HTMLElement} Configured tatva-infotip element
 */
const Template = ({ slot, slotContent, ...args }) => {

    const el = document.createElement('tatva-infotip');

    Object.entries(args).forEach(([key, value]) => {
        if (value == null) return;
        if (DefaultValues[key] === value) return;
        el.setAttribute(key, String(value));
    });

    el.textContent = slot;
    if (slotContent) {
        const container = document.createElement('div');
        container.innerHTML = slotContent.replace('{{slot}}', el.outerHTML);
        return container;
    }

    return el;
};

export const Default = {
    render: Template,
    args: {
        slot: 'Shipping details apply at checkout',
        content: 'Orders above $50 qualify for free shipping within 5–7 business days.',
    },
}

export const Caution = {
    render: Template,
    args: {
        slot: 'Unsaved changes',
        content: 'Make sure to save before leaving this page.',
        underline: true,
        'icon-enabled': true,
        'icon-type': 'caution',
        'icon-position': 'left',
        'icon-color': '#f39c12',
        'overlay-placement': 'top-start',
    },
};

export const ErrorTip = {
    render: Template,
    args: {
        slot: 'Upload failed',
        slotContent: '{{slot}}: file too big.',
        content: 'Maximum upload size is 5MB.',
        'icon-enabled': true,
        'icon-type': 'error',
        'icon-position': 'left',
        'icon-color': '#e74c3c',
        'overlay-placement': 'top-start',
    },
};

export const HelpIcon = {
    render: Template,
    args: {
        slot: 'Password',
        content: 'Must be at least 8 characters long and include one number and one special character.',
        'icon-type': 'help',
        'icon-position': 'right',
        'icon-color': '#28a745',
        'overlay-placement': 'bottom-start',
        underline: true
    },
};

export const InfoIcon = {
    render: Template,
    args: {
        slotContent: 'Our {{slot}} guarantees your satisfaction.',
        slot: '30-day refund',
        content: 'Guaranteed, no questions asked!',
        'icon-enabled': true,
        'icon-type': 'info',
        underline: true,
        'overlay-placement': 'top',
    },
};

export const IconOnly = {
    render: Template,
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
        slot: 'Promo codes',
        slotContent: '{{slot}} are applied at the final step of checkout.',
        content: 'Only one promo code can be used per order.',
        'icon-enabled': false,
        underline: true,
        'overlay-placement': 'bottom',
    },
};