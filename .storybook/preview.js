import '../src/elements/index.js';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  docs: {
    toc: false,
  },
  options: {
    storySort: {
      order: ['Docs', ['Introduction'], 'Examples', ['Marker', 'Pulse', 'Text Animation', 'Image Compare']],
    },
  },
}; 