import '../elements/tatva-image-compare.js';

export default {
  title: 'Examples/Image Compare',
  // The component being documented and tested
  component: 'tatva-image-compare',
  // Automatically generate documentation for this component
  tags: ['autodocs'],
  // Component documentation and metadata
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive before/after image comparison slider with keyboard and pointer support.',
      },
    },
  },
  argTypes: {
    // Handle appearance control - allows users to choose different slider handle styles
    handle: {
      control: 'select', options: ['line', 'bar', 'arrow', 'circle', 'rectangle'],
      description: 'Handle appearance for the slider (line or bar).',
      table: { type: { summary: 'enum' }, defaultValue: { summary: 'line' } },
    },
    hover: {
      control: 'boolean',
      description: 'Enable moving the slider by hovering (no drag required).',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: false } },
    },
    'hide-arrows': {
      control: 'boolean',
      description: 'Hide the default left/right arrows inside the handle.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: false } },
    },
  },
  // Default values for the component attributes
  args: {
    handle: 'line',
    hover: false,
    'hide-arrows': false,
  },
};

const Template = (args) => {
  // Create the custom element instance
  const el = document.createElement('tatva-image-compare');
  
  // Apply all provided arguments as attributes to the element
  // This handles boolean attributes (set empty string for true) and other values
  Object.entries(args).forEach(([key, value]) => {
    if (value === undefined || value === null || value === false) return;
    if (value === true) {
      el.setAttribute(key, '');
    } else {
      el.setAttribute(key, String(value));
    }
  });

  // Create the "before" image element that will be slotted into the component
  const before = document.createElement('img');
  before.slot = 'before-image';
  before.src = 'assets/before.png';
  before.alt = 'Before';

  // Create the "after" image element that will be slotted into the component
  const after = document.createElement('img');
  after.slot = 'after-image';
  after.src = 'assets/after.png';
  after.alt = 'After';

  el.appendChild(before);
  el.appendChild(after);
  
  // Set a max width for the component in the story (for display purposes only)
  el.style.maxWidth = '350px';

  return el;
};

// Default story variant - shows the component with default settings
export const Default = Template.bind({});

export const HoverToReveal = Template.bind({});
HoverToReveal.args = { hover: true };

export const HideArrows = Template.bind({});
HideArrows.args = { 'hide-arrows': true }; 