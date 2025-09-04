import '../elements/tatva-pulse.js';

// Main story configuration for the Pulse component
export default {
  title: 'Examples/Pulse',
  component: 'tatva-pulse',
  // Automatically generate documentation for this component
  tags: ['autodocs'],
  // Component documentation and metadata
  parameters: {
    layout: 'centered',
    // Expand all controls by default for better visibility
    controls: { expanded: true },
    docs: {
      // Show source code in documentation
      canvas: { sourceState: 'shown' },
      description: {
        component:
          'Animated pulse dot with optional slotted content, supporting Left/Right/Background/Superscript positions.',
      },
    },
  },
  // Controls configuration for the Storybook controls panel
  argTypes: {
    size: {
      control: 'text',
      description: 'Diameter of the pulse dot (e.g., 0.75rem).',
      table: { type: { summary: 'string' }, defaultValue: { summary: '0.75rem' } },
    },
    color: {
      control: { type: 'color' },
      description: 'Color of the pulse dot and ripple.',
      table: { type: { summary: 'Color' }, defaultValue: { summary: '#ff0000' } },
    },
    gap: {
      control: 'text',
      description: 'Space between the pulse and the content.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '10px' } },
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'superscript', 'background'],
      description: 'Placement of the pulse relative to the content.',
      table: { type: { summary: 'enum' }, defaultValue: { summary: 'left' } },
    },
    slot: {
      control: 'text',
      description: 'Content alongside which the pulse is displayed.',
      table: { type: { summary: 'string' } },
    },
  },
  // Default values for the component attributes
  args: {
    size: '0.75rem',
    color: '#ff0000',
    gap: '10px',
    position: 'left',
    slot: 'New',
  },
};

const Template = ({ slot, ...args }) => {
  const el = document.createElement('tatva-pulse');
  Object.entries(args).forEach(([key, value]) => {
    if (value === undefined || value === null || value === false) return;
    if (value === true) {
      el.setAttribute(key, '');
    } else {
      el.setAttribute(key, String(value));
    }
  });
  el.textContent = slot;
  return el;
};

// Default story variant - shows the component with default settings
export const Default = Template.bind({});

export const Right = Template.bind({});
Right.args = { color: '#34c759', position: 'right', slot: 'Sale' };

export const Superscript = Template.bind({});
Superscript.args = { position: 'superscript', slot: 'Pro', color: '#ff9f0a', 'superscript-offset': '-0.5em' };
Superscript.argTypes = {
  'superscript-offset': {
    control: 'text',
    description: 'Vertical offset used in superscript mode.',
    table: { type: { summary: 'string' }, defaultValue: { summary: '-0.5em' } },
  },
};

export const Background = Template.bind({});
Background.args = { position: 'background', slot: 'Badge', color: '#007aff' };