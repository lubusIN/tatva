import { useEffect } from 'react';
import '../elements/tatva-infotip.js';

/**
 * Storybook configuration for tatva-infotip component
 */
export default {
  title: 'Examples/Infotip',
  component: 'tatva-infotip',
  tags: ['autodocs'],
  decorators: [
    (storyFn) => {
      const urls = [
        'https://cdn.jsdelivr.net/npm/@floating-ui/core@1.7.3',
        'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.7.3',
      ];

      urls.forEach((src) => {
        if (!document.querySelector(`script[src="${src}"]`)) {
          const s = document.createElement('script');
          s.type = 'module';
          s.src = src;
          document.head.appendChild(s);
        }
      });

      return storyFn();
    },
  ],
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
      if: { arg: 'icon-enabled', eq: true },
    },
    'icon-type': {
      control: 'select',
      options: ['info', 'help', 'caution', 'error', 'notAllowed', 'starEmpty'],
      description: 'Type of icon to display',
      table: { type: { summary: 'enum' }, defaultValue: { summary: 'info' } },
      if: { arg: 'icon-enabled', eq: true },
    },
    'icon-color': {
      control: 'color',
      description: 'Color of the icon',
      table: { type: { summary: 'Color' }, defaultValue: { summary: '#000' } },
      if: { arg: 'icon-enabled', eq: true },
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
    slot: 'Hover for info',
    content: 'This is the default infotip.',
  },
};

export const IconColor = {
  render: Template,
  args: {
    'icon-enabled': true,
    slot: 'Billing alert',
    content: 'Please update your payment details.',
    'icon-type': 'error',
    'icon-color': '#e74c3c',
  },
};

export const IconOnly = {
  render: Template,
  args: {
    'icon-enabled': true,
    content: 'This is an icon-only tooltip for minimal UI elements.',
    'icon-type': 'caution',
  },
};

export const IconPosition = {
  render: Template,
  args: {
    'icon-enabled': true,
    slot: 'Password',
    content: 'Must be at least 8 characters long and include one number and one special character.',
    'icon-type': 'help',
    'icon-position': 'right',
  },
};

export const IconType = {
  render: Template,
  args: {
    'icon-enabled': true,
    slot: 'Shipping details apply at checkout',
    content: 'Orders above $50 qualify for free shipping within 5–7 business days.',
  },
};

export const Offset = {
  render: Template,
  args: {
    'icon-enabled': true,
    slot: 'Hover me',
    content: 'This tooltip is offset by 20px.',
    offset: 20,
    'icon-type': 'notAllowed',
  },
};

export const OverlayColors = {
  render: Template,
  args: {
    'icon-enabled': true,
    slot: 'Styled tooltip',
    content: 'Custom background and text colors.',
    'overlay-background-color': '#333',
    'overlay-text-color': '#ffcc00',
    'icon-type': 'starEmpty',
  },
};

export const OverlayPlacement = {
  render: Template,
  args: {
    'icon-enabled': true,
    slot: 'Details',
    content: 'Tooltip is placed at the bottom-end.',
    'overlay-placement': 'bottom-end',
  },
};

export const Underline = {
  render: Template,
  args: {
    'icon-enabled': true,
    slot: 'Unsaved changes',
    content: 'Make sure to save before leaving this page.',
    underline: true,
  },
};