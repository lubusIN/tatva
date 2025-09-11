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
    controls: { expanded: true },
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
    beforeImage: {
      control: 'text',
      description: 'Path to the before image.',
      table: { disable: true },
    },
    beforeAlt: {
      control: 'text',
      description: 'Alt text for the before image.',
      table: { disable: true },
    },
    afterImage: {
      control: 'text',
      description: 'Path to the after image.',
      table: { disable: true },
    },
    afterAlt: {
      control: 'text',
      description: 'Alt text for the after image.',
      table: { disable: true },
    },
  },
};

// Default values for comparison to avoid redundant attributes in the template
const DefaultValues = {
            handle: 'line',
            hover: false,
            'hide-arrows': false,
        }

const Template = (args) => {
  // Create the custom element instance
  const el = document.createElement('tatva-image-compare');
  
  // Apply all provided arguments as attributes to the element
  // This handles boolean attributes (set empty string for true) and other values
    const allowedAttributes = new Set(['handle', 'hover', 'hide-arrows']);
    Object.entries(args).forEach(([key, value]) => {
        if (!allowedAttributes.has(key)) return; // Ignore non-element args like beforeImage/afterImage
        if (value == null) return;
        if (DefaultValues[key] === value) return; // Skip setting default values
        el.setAttribute(key, String(value));
    });
  // Create the "before" image element that will be slotted into the component
  const before = document.createElement('img');
  before.slot = 'before-image';
  before.src = args.beforeImage || 'assets/before.png';
  before.alt = args.beforeAlt || 'Before';

  // Create the "after" image element that will be slotted into the component
  const after = document.createElement('img');
  after.slot = 'after-image';
  after.src = args.afterImage || 'assets/after.png';
  after.alt = args.afterAlt || 'After';

  el.appendChild(before);
  el.appendChild(after);
  
  // Set a max width for the component in the story (for display purposes only)
  el.style.maxWidth = '350px';

  return el;
};

// Default story variant - shows the component with default settings
export const Default = Template.bind({});

export const Hover = Template.bind({});
Hover.args = { hover: true };

export const ArrowHandle = Template.bind({});
ArrowHandle.args = { 
  beforeImage: 'assets/before-img.png',
  beforeAlt: 'A city landscape during the day',
  afterImage: 'assets/after-img.png',
  afterAlt: 'The same city landscape at night',
  handle: 'arrow'
};

export const CircleHandle = Template.bind({});
CircleHandle.args = { 
  beforeImage: 'assets/bad-apple-image.png',
  beforeAlt: 'A rotten apple',
  afterImage: 'assets/apple.png',
  afterAlt: 'A fresh, good apple',
  handle: 'circle',
};

export const RectangleHandle = Template.bind({});
RectangleHandle.args = {
  beforeImage: 'assets/skelton.png',
  beforeAlt: 'A skeleton',
  afterImage: 'assets/skin.png',
  afterAlt: 'A human body',
  handle: 'rectangle'
};