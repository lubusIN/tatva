/**
 * Storybook configuration for tatva-marker component
 */
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

export const Default = Template.bind({});
Default.args = {
  slot: 'Welcome',
};

export const type = Template.bind({});
type.args = {
  type: 'underline',
  content: 'Hurry! Offer valid {{slot}}',
  slot: 'today only',
};

export const Color = Template.bind({});
Color.args = {
  type: 'underline-zigzag',
  content: '{{slot}} Action required before deadline!',
  slot: 'Urgent:',
  color: '#f44336',
};

export const Animation = Template.bind({});
Animation.args = {
  type: 'double',
  content: 'Upgrade to {{slot}} now for premium benefits.',
  slot: 'Pro Plan',
  'animation-duration': '3s',
  'animation-function': 'steps(5, end)',
};

export const AnimationDisable = Template.bind({});
AnimationDisable.args = {
  type: 'strikethrough',
  content: 'Original price: {{slot}} Now only $50!',
  slot: '$100',
  animation: false,
};