import '../elements/tatva-image-compare.js';

export default {
  title: 'Examples/Image Compare',
  component: 'tatva-image-compare',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Interactive before/after image comparison slider with keyboard and pointer support.',
      },
    },
  },
  argTypes: {
    handle: {
      control: 'select', options: ['line', 'bar'],
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
  args: {
    handle: 'line',
    hover: false,
    'hide-arrows': false,
  },
};

const Template = (args) => {
  const el = document.createElement('tatva-image-compare');
  Object.entries(args).forEach(([key, value]) => {
    if (value === undefined || value === null || value === false) return;
    if (value === true) {
      el.setAttribute(key, '');
    } else {
      el.setAttribute(key, String(value));
    }
  });

  const before = document.createElement('img');
  before.slot = 'before-image';
  before.src = 'assets/before.png';
  before.alt = 'Before';

  const after = document.createElement('img');
  after.slot = 'after-image';
  after.src = 'assets/after.png';
  after.alt = 'After';

  el.appendChild(before);
  el.appendChild(after);
  el.style.maxWidth = '350px';

  return el;
};

export const Default = Template.bind({});

export const HoverToReveal = Template.bind({});
HoverToReveal.args = { hover: true };

export const HideArrows = Template.bind({});
HideArrows.args = { 'hide-arrows': true }; 