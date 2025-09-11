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
    content: {
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

const Template = ({ content, slot, ...args }) => {
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

  // If content provided → inject el, else return el alone
  if (content) {
    const container = document.createElement('h1');
    container.innerHTML = content.replace('{{slot}}', el.outerHTML);
    return container;
  }
  return el;
};

// Default story variant - shows the component with default settings
export const Default = Template.bind({});
Default.args = {
  content: 'Hurry! Offer valid {{slot}}',
  slot: 'today only',
  color: '#ff6f00',
};

export const Curly = Template.bind({});
Curly.args = { 
  type: 'curly', 
  content: 'Upgrade to {{slot}} now for premium benefits.',
  slot: 'Pro Plan',
};

export const Cross = Template.bind({});
Cross.args = { 
  type: 'cross', 
  slot: 'Out of Stock',
};

export const Strike = Template.bind({});
Strike.args = { 
  type: 'strike', 
  content: 'This feature {{slot}} is no longer supported.',
  slot: 'Legacy Mode',
  color: '#9e9e9e',
  animation: false,
};

export const Strikethrough = Template.bind({});
Strikethrough.args = { 
  type: 'strikethrough', 
  content: 'Original price: {{slot}} Now only $50!',
  slot: '$100',
  animation: false, 
};

export const Underline = Template.bind({});
Underline.args = { 
  type: 'underline',
  content: 'Ready to start? {{slot}} now!',
  slot: 'Sign up',
  color: '#4CAF50',
  'animation-duration': '1s', 
};

export const DoubleUnderline = Template.bind({});
DoubleUnderline.args = { 
  type: 'double-underline', 
  content: 'Ready to go? {{slot}} today!',
  slot: 'Join us',
  color: '#2196f3',
};

export const UnderlineZigzig = Template.bind({});
UnderlineZigzig.args = {
  type: 'underline-zigzag',
  content: '⚠️ {{slot}} Action required before deadline!',
  slot: 'Urgent:',
  color: '#f44336',
};

export const Animation = Template.bind({});
Animation.args = {
  type: 'double',
  slot: 'Double Marker',
  color: '#3f51b5',
  content: 'Highlight {{slot}} with style.',
  'animation-duration': '10s',
  'animation-function': 'ease-out',
};