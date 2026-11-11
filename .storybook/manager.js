// This file customizes the Storybook UI and sidebar behavior
import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';
import { STORY_RENDERED, DOCS_RENDERED, STORY_CHANGED } from 'storybook/internal/core-events';

import './manager.css';

// Use an existing logo from your components folder (exported asset path)
// For simplicity, we'll reuse the public favicon.svg as a placeholder logo.
// If you have a specific logo asset, place it in public/ and update the URL below.
const theme = create({
  base: 'light', // Light theme base
  fontBase: '"Nunito Sans", -apple-system, sans-serif',
  fontCode: 'monospace',
  brandTitle: 'Tatva Components', // Brand title shown in the UI
  brandUrl: 'https://github.com/lubusIN/tatva', // Brand URL for links
  brandImage: '/logo.svg', // Brand logo image
  brandTarget: '_self', // Open brand links in same tab

  //
  colorPrimary: '#0052FF',
  colorSecondary: '#0052FF',

  // UI
  appBg: '#F0F5FF',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appHoverBg: '#E0ECFF',
  appBorderColor: 'rgba(0, 82, 255, 0.12)',
  appBorderRadius: 4,

  // Text colors
  textColor: '#071A4A',
  textInverseColor: '#FFFFFF',

  // Toolbar default and active colors
  barTextColor: '#071A4A',
  barSelectedColor: '#0052FF',
  barHoverColor: '#0052FF',
  barBg: '#F0F5FF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: 'rgba(0, 82, 255, 0.2)',
  inputTextColor: '#071A4A',
  inputBorderRadius: 4,
});

// Apply the custom theme and layout customizations to Storybook
addons.setConfig({
  theme,
  layoutCustomisations: {
    showToolbar(state, defaultValue) {
      return state.viewMode === 'docs' ? false : defaultValue;
    },
  },
});

// Navigation sidebar visibility logic
// Hide the sidebar (navigation) only when viewing the Welcome landing page for a clean hero experience
try {
  // Function to update navigation visibility based on current URL
  const updateNavFromLocation = () => {
    try {
      const url = new URL(window.location.href);
      const path = url.searchParams.get('path') || '';
      const id = url.searchParams.get('id') || '';
      const isWelcome = path.includes('welcome') || id.includes('welcome');
      addons.setConfig({ layout: { showNav: !isWelcome } }); // Hide nav only for the Welcome landing page
    } catch {
      /* noop - handle cases where URL parsing fails */
    }
  };

  // Get the Storybook addon channel for event communication
  const channel = addons.getChannel();

  // Function to set navigation visibility based on story ID
  const setNavVisibilityById = (id) => {
    const storyId = typeof id === 'string' ? id : '';
    const isWelcome = storyId.includes('welcome'); // Only hide on the Welcome landing page
    addons.setConfig({ layout: { showNav: !isWelcome } });
  };

  // Initial setup and event listeners for reactive navigation updates
  updateNavFromLocation(); // Initial pass
  window.addEventListener('popstate', updateNavFromLocation); // Handle browser back/forward
  window.addEventListener('hashchange', updateNavFromLocation); // Handle hash changes
  channel.on(STORY_RENDERED, setNavVisibilityById); // When a story is rendered
  channel.on(DOCS_RENDERED, setNavVisibilityById); // When docs are rendered
  channel.on(STORY_CHANGED, updateNavFromLocation); // When story changes
} catch {
  /* channel may not be available during static build bootstrap - handle gracefully */
}
