import '../elements/tatva-marker.js';

// Main story configuration for the Marker component
export default {
  title: 'Examples/Marker',
  component: 'tatva-marker',
  // Automatically generate documentation for this component
  tags: ['autodocs'],
  // Component documentation and metadata
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A custom web component that renders animated marker styles around slotted text (underline, curly, strike, etc.).',
      },
    },
  },
  // Controls configuration for the Storybook controls panel
  argTypes: {
    // Marker style type control - allows users to choose different visual styles
    type: {
      control: 'select',
      options: [
        'circle', 'curly', 'underline', 'double', 'double-underline', 'underline-zigzag', 'strikethrough', 'cross', 'strike'
      ],
      description: 'Marker path style to render around the slotted text.',
      table: { type: { summary: 'enum' }, defaultValue: { summary: 'circle' } },
    },
    color: {
      control: 'color',
      description: 'Stroke color of the marker path.',
      table: { type: { summary: 'string (CSS color)' }, defaultValue: { summary: '#ff0000' } },
    },
    animation: {
      control: 'boolean',
      description: 'Enable drawing animation for the marker path.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    slot: {
      control: 'text',
      description: 'Text content to be highlighted by the marker.',
      table: { disable: true },
    },
    'animation-duration': {
      control: 'text',
      description: 'Duration of the marker animation (e.g., 5s).',
      table: { type: { summary: 'string' }, defaultValue: { summary: '5s' } },
      if: { arg: 'animation', truthy: true },
    },
    'animation-function': {
      control: 'select',
      options: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out',
        'steps(3, start)',
        'steps(5, end)',
      ],
      description: 'Timing function used by the animation.',
      table: { type: { summary: 'enum' }, defaultValue: { summary: 'ease-in' } },
      if: { arg: 'animation', truthy: true },
    },
  },
  // Default values for the component attributes
  args: {
    animation: true,
  },
};

// Default values for comparison to avoid redundant attributes in the template
const DefaultValues = {
  type: 'circle',
  color: '#ff0000',
  animation: true,
  'animation-duration': '5s',
  'animation-function': 'ease-in'
};

const Template = ({ slot, ...args }) => {
  const el = document.createElement('tatva-marker');

  // Apply all provided arguments as attributes to the element
  // This handles boolean attributes (set empty string for true) and other values
  Object.entries(args).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (DefaultValues[key] === value) return;
    if (value === true) {
      el.setAttribute(key, value);
    } else {
      el.setAttribute(key, String(value));
    }
  });
  el.textContent = slot;
  return el;
};

// Default story variant - shows the component with default settings
export const Default = Template.bind({});
Default.args = { slot: 'Marker' };

export const Curly = Template.bind({});
Curly.args = { type: 'curly', slot: 'Curly Underline' };

export const Underline = Template.bind({});
Underline.args = { type: 'underline', slot: 'Plain Underline' };

export const DoubleUnderline = Template.bind({});
DoubleUnderline.args = { type: 'double-underline', slot: 'Double Underline' };

export const Strikethrough = Template.bind({});
Strikethrough.args = { type: 'strikethrough', slot: 'Strikethrough Text' };

export const CustomAnimation = Template.bind({});
CustomAnimation.args = {
  slot: 'Custom Animation',
  'animation-duration': '3s',
  'animation-function': 'ease-out',
};