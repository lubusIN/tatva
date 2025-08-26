import '../src/elements/index.js';

// Global parameters that apply to all stories
export const parameters = {
  // Actions configuration - automatically creates action handlers for props starting with 'on'
  actions: { argTypesRegex: '^on[A-Z].*' },
  
  // Controls configuration - automatically matches control types based on prop names
  controls: {
    matchers: {
      color: /(background|color)$/i, // Props ending with 'background' or 'color' get color controls
      date: /Date$/i,               // Props ending with 'Date' get date controls
    },
  },
  
  // Documentation configuration
  docs: {
    toc: false, // Disable table of contents in documentation
  },
  
  // Story organization and sorting
  options: {
    storySort: {
      // Define the order of stories in the sidebar
      order: [
        'Docs',           // Documentation section first
        ['Introduction'],  // Introduction page
        'Examples',       // Examples section
        [
          'Marker',       // Marker component stories
          'Pulse',        // Pulse component stories
          'Text Animation', // Text Animation component stories
          'Image Compare'  // Image Compare component stories
        ]
      ],
    },
  },
};
export const tags = ['autodocs']; 