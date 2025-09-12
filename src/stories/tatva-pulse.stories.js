import '../elements/tatva-pulse.js';

// Main story configuration for the Pulse component
export default {
  title: 'Examples/Pulse',
  component: 'tatva-pulse',
  // Automatically generate documentation for this component
  tags: ['autodocs'],
  // Component documentation and metadata
  parameters: {
    layout: 'centered',
    // Expand all controls by default for better visibility
    controls: { expanded: true },
    docs: {
      // Show source code in documentation
      canvas: { sourceState: 'shown' },
      description: {
        component:
          'Animated pulse dot with optional slotted content, supporting Left/Right/Background/Superscript positions.',
      },
    },
  },
  // Controls configuration for the Storybook controls panel
  argTypes: {
    size: {
      control: 'text',
      description: 'Diameter of the pulse dot (e.g., 0.75rem).',
      table: { type: { summary: 'string' }, defaultValue: { summary: '0.75rem' } },
    },
    color: {
      control: { type: 'color' },
      description: 'Color of the pulse dot and ripple.',
      table: { type: { summary: 'Color' }, defaultValue: { summary: '#000000' } },
    },
    gap: {
      control: 'text',
      description: 'Space between the pulse and the content.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '10px' } },
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'superscript', 'background'],
      description: 'Placement of the pulse relative to the content.',
      table: { type: { summary: 'enum' }, defaultValue: { summary: 'left' } },
    },
    'superscript-offset': {
      control: 'text',
      description: 'Vertical offset used in superscript mode.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '-0.5em' } },
      if: { arg: 'position', eq: 'superscript' },
  },
    slot: {
      control: 'text',
      description: 'Content alongside which the pulse is displayed.',
      table: { disable: true },
    },
    content: {
      control: 'text',
      table: { disable: true },
    }
  },
};

// Default values for comparison to avoid redundant attributes in the template
const DefaultValues = {
  size: '0.75rem',
  color: '#000000',
  gap: '10px',
  position: 'left',
  'superscript-offset': '-0.5em',
}

const Template = ({content, slot, ...args }) => {
  const el = document.createElement('tatva-pulse');
  Object.entries(args).forEach(([key, value]) => {
    if (value === undefined || value === null || value === false) return;
    if (DefaultValues[key] === value) return;
    if (value === true) {
      el.setAttribute(key, '');
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

export const Size = Template.bind({});
Size.args = {
  slot: 'Live Now',
  content: '{{slot}} on YouTube',
  position: 'right',
  color: '#34c759',
  size: '1rem'
};

export const Color = Template.bind({});
Color.args = {
  slot: 'Sale',
  content: 'Big {{slot}} this weekend only!',
  size: '1.2rem',
  color: '#ff2d55',
};

export const Gap = Template.bind({});
Gap.args = {
  slot: 'Update',
  content: 'System {{slot}} available.',
  gap: '30px',
  color: '#007aff',
  size: '1.2rem',
};

export const Superscript = Template.bind({});
Superscript.args = {
  slot: '50% OFF',
  content: 'Get {{slot}} on all summer collection items.',
  position: 'superscript',
  'superscript-offset': '-0.4em',
  color: '#e74c3c',
};

export const Background = Template.bind({});
Background.args = { position: 'background', slot: 'Badge', color: '#007aff', size: '1.5rem' };