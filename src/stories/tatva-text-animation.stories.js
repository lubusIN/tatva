import '../elements/tatva-text-animation.js';

export default {
  title: 'Examples/Text Animation',
  component: 'tatva-text-animation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Text animation component supporting typing and fly-in modes via attributes.',
      },
    },
  },
  argTypes: {
    'animation-type': {
      control: 'select',
      options: ['typing', 'flyin'],
      description: 'Animation mode: typing effect or fly-in characters.',
      table: { type: { summary: 'enum' }, defaultValue: { summary: 'typing' } },
    },
    words: {
      control: 'text',
      description: 'Words/phrase(s) to render. JSON string for typing mode or plain text for fly-in.',
      table: { type: { summary: 'string' } },
    },
    speed: {
      control: 'number',
      description: 'Animation interval in milliseconds.',
      table: { type: { summary: 'number' }, defaultValue: { summary: 150 } },
    },
  },
  args: {
    'animation-type': 'typing',
    words: '["Hello Lubus", "Welcome to Tatva"]',
    speed: 150,
  },
};

const Template = (args) => {
  const el = document.createElement('tatva-text-animation');
  Object.entries(args).forEach(([key, value]) => {
    if (value === undefined || value === null || value === false) return;
    if (value === true) {
      el.setAttribute(key, '');
    } else {
      el.setAttribute(key, String(value));
    }
  });
  return el;
};

export const Typing = Template.bind({});

export const FlyIn = Template.bind({});
FlyIn.args = {
  'animation-type': 'flyin',
  words: 'Tatva Components',
  speed: 50,
}; 