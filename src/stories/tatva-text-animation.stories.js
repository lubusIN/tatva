import '../elements/tatva-text-animation.js';

/**
 * Storybook configuration for tatva-text-animation component
 * @type {import('@storybook/web-components').Meta}
 */
export default {
  title: 'Examples/Text Animation',
  component: 'tatva-text-animation',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text animation component with typing, fly-in, and fade modes.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['typing', 'flyin', 'fade'],
      description: 'Animation mode',
      table: { type: { summary: 'enum' }, defaultValue: { summary: 'typing' } },
    },
    words: {
      control: 'text',
      description: 'Text content (JSON array for typing mode)',
    },
    speed: {
      control: { type: 'range', min: 50, max: 1000, step: 25 },
      description: 'Animation speed (ms)',
      table: { type: { summary: 'number' }, defaultValue: { summary: 50 } },
    },
  },
  args: {
    type: 'typing',
    words: '["Hello Lubus", "Welcome to Tatva"]',
    speed: 150,
  },
};

/**
 * Template function to create tatva-text-animation component instances
 * @param {Object} args - Component arguments from Storybook controls
 * @param {string} args.type - Animation type ('typing', 'flyin', 'fade')
 * @param {string} args.words - Text content to animate
 * @param {number} args.speed - Animation speed in milliseconds
 * @returns {HTMLElement} Configured tatva-text-animation element
 */
const Template = (args) => {
  const el = document.createElement('tatva-text-animation');

  Object.entries(args).forEach(([key, value]) => {
    if (value == null || value === false) return;
    el.setAttribute(key, value === true ? '' : String(value));
  });

  return el;
};


export const Typing = {
  render: Template,
};

export const FlyIn = {
  render: Template,
  args: {
    type: 'flyin',
    words: 'Tatva Components',
  },
};

export const Fade = {
  render: Template,
  args: {
    type: 'fade',
    words: 'Elegant Animation',
  },
};