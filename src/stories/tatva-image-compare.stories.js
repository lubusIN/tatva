/**
 * Storybook configuration for tatva-image-compare component
 */
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
      source: {
        excludeDecorators: true, // 👈 Hides the wrapper <div> in code previews
      },
    },
  },
  decorators: [
    (Story) => {
      const container = document.createElement('div');
      container.style.maxWidth = '350px';
      container.appendChild(Story());
      return container;
    },
  ],
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
    'arrow-left': {
      control: 'text',
      description: 'Inline SVG for left arrow (shown only when handle = "arrow").',
      if: { arg: 'handle', eq: 'arrow' },
      table: { type: { summary: 'string' } },
    },
    'arrow-right': {
      control: 'text',
      description: 'Inline SVG for right arrow (shown only when handle = "arrow").',
      if: { arg: 'handle', eq: 'arrow' },
      table: { type: { summary: 'string' } },
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
  // Optional: inject custom SVGs for handle arrows via slots (only when handle is arrow)
  const isArrowHandle = (args.handle || DefaultValues.handle) === 'arrow';

  if (isArrowHandle && args['arrow-left']) {
    const temp = document.createElement('div');
    temp.innerHTML = args['arrow-left'].trim();
    const svg = temp.firstElementChild;
    if (svg) {
      svg.slot = 'arrow-left';
      el.appendChild(svg);
    }
  }

  if (isArrowHandle && args['arrow-right']) {
    const temp = document.createElement('div');
    temp.innerHTML = args['arrow-right'].trim();
    const svg = temp.firstElementChild;
    if (svg) {
      svg.slot = 'arrow-right';
      el.appendChild(svg);
    }
  }

  el.appendChild(before);
  el.appendChild(after);
  return el;
};

export const Default = Template.bind({});

export const Handle = Template.bind({});
Handle.args = {
  beforeImage: 'assets/bad-apple-image.png',
  beforeAlt: 'A rotten apple',
  afterImage: 'assets/apple.png',
  afterAlt: 'A fresh, good apple',
  handle: 'circle',
}

export const Hover = Template.bind({});
Hover.args = { hover: true };

export const CustomArrow = Template.bind({});
CustomArrow.args = {
  beforeImage: 'assets/skelton.png',
  beforeAlt: 'A skeleton',
  afterImage: 'assets/skin.png',
  afterAlt: 'A human body',
  handle: 'arrow',
  'arrow-left': `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
       viewBox="0 0 24 24" fill="currentColor">
    <polygon points="15,6 9,12 15,18"></polygon>
  </svg>
`,
  'arrow-right': `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
       viewBox="0 0 24 24" fill="currentColor">
    <polygon points="9,6 15,12 9,18"></polygon>
  </svg>
`,
};