/**
 * Storybook configuration for tatva-counter component
 */
export default {
  title: 'Examples/Counter',
  component: 'tatva-counter',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A custom web component for rendering animated numbers and mechanical rolling odometer reels.',
      },
    },
  },
  argTypes: {
    target: {
      control: 'text',
      description: 'Target number or text to animate to.',
      table: { type: { summary: 'string | number' } },
    },
    slot: {
      control: 'text',
      description: 'Slotted text content (fallback if target attribute is not provided).',
      table: { disable: true },
    },
    animation: {
      control: 'select',
      options: ['odometer', 'linear', 'steps', 'scramble'],
      description: 'Animation mode.',
      table: { type: { summary: 'enum' }, defaultValue: { summary: 'odometer' } },
    },
    duration: {
      control: 'number',
      description: 'Duration of the animation in milliseconds.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '1200' } },
    },
    'on-scroll': {
      control: 'boolean',
      description: 'Whether to trigger animation only when scrolled into view.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
  },
  args: {
    animation: 'odometer',
    duration: 1200,
    'on-scroll': false,
  },
};

const Template = ({ slot, ...args }) => {
  const el = document.createElement('tatva-counter');
  Object.entries(args).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (value === true) {
      el.setAttribute(key, '');
    } else {
      el.setAttribute(key, String(value));
    }
  });
  if (slot) {
    el.textContent = slot;
  }
  return el;
};

export const Default = Template.bind({});
Default.args = {
  slot: '1,500',
  animation: 'odometer',
};

export const Linear = Template.bind({});
Linear.args = {
  slot: '2,400',
  animation: 'linear',
  duration: 1500,
};

export const Steps = Template.bind({});
Steps.args = {
  slot: '850',
  animation: 'steps',
  duration: 1200,
};

export const Scramble = Template.bind({});
Scramble.args = {
  slot: '99.9%',
  animation: 'scramble',
  duration: 1500,
};

export const CurrencyAndDecimals = Template.bind({});
CurrencyAndDecimals.args = {
  slot: '$1,299.95',
  animation: 'odometer',
  duration: 1800,
};

export const LargeNumber = Template.bind({});
LargeNumber.args = {
  slot: '10,000,000',
  animation: 'odometer',
  duration: 2200,
};
