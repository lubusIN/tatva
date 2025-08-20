import '../elements/tatva-marker.js';

export default {
  title: 'Examples/Marker',
  component: 'tatva-marker',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A custom web component that renders animated marker styles around slotted text (underline, curly, strike, etc.).',
      },
    },
  },
  argTypes: {
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
    'animation-duration': {
      control: 'text',
      description: 'Duration of the marker animation (e.g., 5s).',
      table: { type: { summary: 'string' }, defaultValue: { summary: '5s' } },
    },
    'animation-function': {
      control: 'select',
      options: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out',
        'steps(3, start)',
        'steps(5, end)',
      ],
      description: 'Timing function used by the animation.',
      table: { type: { summary: 'enum' }, defaultValue: { summary: 'ease-in' } },
    },
    slot: {
      control: 'text',
      description: 'Text content to be highlighted by the marker.',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    type: 'circle',
    color: '#ff0000',
    animation: true,
    'animation-duration': '5s',
    'animation-function': 'ease-in',
    slot: 'Highlighted text',
  },
};

const Template = ({ slot, ...args }) => {
  const el = document.createElement('tatva-marker');
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

export const Default = Template.bind({});

export const Curly = Template.bind({});
Curly.args = { type: 'curly', slot: 'Curly underline' };

export const Underline = Template.bind({});
Underline.args = { type: 'underline', slot: 'Plain underline' };

export const DoubleUnderline = Template.bind({});
DoubleUnderline.args = { type: 'double-underline', slot: 'Double underline' };

export const Strikethrough = Template.bind({});
Strikethrough.args = { type: 'strikethrough', slot: 'Strikethrough text' }; 