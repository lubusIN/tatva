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
        slotContent: {
            control: 'text',
            description: 'Text content to be highlighted by the marker.',
            table: { disable: true },
        },
    },
    args: {
        'icon-enabled' : true,
    }
};

// Default values for comparison to avoid redundant attributes in the template
const DefaultValues ={
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
const Template = ({slotContent, ...args}) => {
    const el = document.createElement('tatva-infotip');

    Object.entries(args).forEach(([key, value]) => {
        if (value == null) return;
        if (DefaultValues[key] === value) return;
        el.setAttribute(key, String(value));
    });
    
        el.textContent = slotContent;

    return el;
};

export const Default = {
    render: Template,
    args: {
        content: 'This is helpful information that appears in the tooltip',
        slotContent: 'Hover or focus for info',
    },
}

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
        content: 'Additional information without any visual icon indicator.',
        'icon-enabled': false,
        underline: true,
        'overlay-placement': 'bottom',
        slotContent: 'Underlined text with tooltip',
    },
};