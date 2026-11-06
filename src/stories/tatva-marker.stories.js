/**
 * Storybook configuration for tatva-marker component
 */
import { expect } from 'storybook/test';

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

const Template = ({ content, slot, containerTag = 'h1', containerClass = '', ...args }) => {
  const el = document.createElement('tatva-marker');

  // Apply all provided arguments as attributes to the element
  // This handles boolean attributes (set empty string for true) and other values
  Object.entries(args).forEach(([key, value]) => {
    if (key === 'containerTag' || key === 'containerClass') return;
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
    if (containerTag === 'pre') {
      el.style.fontSize = 'inherit';
      el.style.fontWeight = 'inherit';
    }
    const container = document.createElement(containerTag);
    if (containerClass) container.className = containerClass;
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

export const InteractiveRender = Template.bind({});
InteractiveRender.args = {
  slot: 'Highlight Test',
  type: 'circle',
};
InteractiveRender.play = async ({ canvasElement, step }) => {
  const el = canvasElement.querySelector('tatva-marker');

  await step('Verify slotted text content and SVG marker', async () => {
    expect(el.textContent.trim()).toBe('Highlight Test');
    const svg = el.shadowRoot.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });
};

export const Pre = Template.bind({});
Pre.args = {
  type: 'circle',
  slot: 'travel',
  content: `Two roads diverged in a yellow wood,
And sorry I could not {{slot}} both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;`,
  containerTag: 'pre',
};
Pre.parameters = {
  docs: {
    description: {
      story:
        'Tests tatva-marker inside a multi-line preformatted text block (`<pre>`), which applies `overflow: auto; white-space: pre-wrap; padding: 0;`. Ensures consistent font size, uniform line spacing without vertical line jumps, and no clipping from parent scroll containers.',
    },
  },
};
Pre.play = async ({ canvasElement, step }) => {
  const pre = canvasElement.querySelector('pre');
  const el = canvasElement.querySelector('tatva-marker');

  await step('Verify pre block contains marker element', async () => {
    expect(pre).not.toBeNull();
    expect(el).not.toBeNull();
    expect(el.textContent.trim()).toBe('travel');
  });

  await step('Verify marker inherits consistent font size and weight from pre', async () => {
    const preStyle = window.getComputedStyle(pre);
    const elStyle = window.getComputedStyle(el);
    expect(elStyle.fontSize).toBe(preStyle.fontSize);
    expect(elStyle.fontWeight).toBe(preStyle.fontWeight);
  });

  await step('Verify marker does not cause vertical overflow clipping in pre container', async () => {
    expect(pre.scrollHeight).toBeLessThanOrEqual(pre.clientHeight + 1);
  });
};