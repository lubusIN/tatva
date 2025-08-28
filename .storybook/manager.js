// This file customizes the Storybook UI and sidebar behavior
import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';
import { STORY_RENDERED, DOCS_RENDERED, STORY_CHANGED } from 'storybook/internal/core-events';

// Use an existing logo from your components folder (exported asset path)
// For simplicity, we'll reuse the public favicon.svg as a placeholder logo.
// If you have a specific logo asset, place it in public/ and update the URL below.
const theme = create({
  base: 'light', // Light theme base
  brandTitle: 'Tatva Components', // Brand title shown in the UI
  brandUrl: 'https://github.com/lubusIN/tatva', // Brand URL for links
  brandImage: '/tatva-logo.svg', // Brand logo image
  brandTarget: '_self', // Open brand links in same tab

  //
  colorPrimary: '#3A10E5',
  colorSecondary: '#585C6D',
 
  // UI
  appBg: '#F5F4EC',
  appContentBg: '#F5F4EC',
  appPreviewBg: '#F5F4EC',
  appBorderRadius: 4,
 
  // Text colors
  textColor: '#10162F',
  textInverseColor: '#F5F4EC',
 
  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barHoverColor: '#585C6D',
  barBg: '#F5F4EC',
 
  // Form colors
  inputBg: '#F5F4EC',
  inputTextColor: '#10162F',
  inputBorderRadius: 2,
});

// Apply the custom theme to Storybook
addons.setConfig({ theme });

// Navigation sidebar visibility logic
// Hide the sidebar (navigation) when viewing docs-only pages for a clean reading experience
try {
  // Function to update navigation visibility based on current URL
  const updateNavFromLocation = () => {
    try {
      const url = new URL(window.location.href);
      const viewMode = url.searchParams.get('viewMode');
      const isDocsView = viewMode === 'docs';
      addons.setConfig({ showNav: !isDocsView }); // Hide nav for docs view
    } catch {
      /* noop - handle cases where URL parsing fails */
    }
  };

  // Get the Storybook addon channel for event communication
  const channel = addons.getChannel();

  // Function to set navigation visibility based on story ID
  const setNavVisibilityById = (id) => {
    const storyId = typeof id === 'string' ? id : '';
    const isDocsId = storyId.endsWith('--docs'); // Check if it's a docs page
    addons.setConfig({ showNav: !isDocsId }); // Hide nav for docs pages
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
