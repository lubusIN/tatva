import '../src/elements/index.js';
import './preview.css';
// Global parameters that apply to all stories
export const parameters = {
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
        ['Welcome', 'Getting Started'],  // Documentation pages
        'Examples',       // Examples section
        [
          'Marker',       // Marker component stories
          'Pulse',        // Pulse component stories
          'Text Animation', // Text Animation component stories
          'Image Compare',  // Image Compare component stories
          'Info Tip',     // Info Tip component stories
          'Counter'       // Counter component stories
        ]
      ],
    },
  },
};
export const tags = ['autodocs']; 