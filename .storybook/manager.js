import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import { STORY_RENDERED, DOCS_RENDERED, STORY_CHANGED } from '@storybook/core-events';

// Use an existing logo from your components folder (exported asset path)
// For simplicity, we'll reuse the public favicon.svg as a placeholder logo.
// If you have a specific logo asset, place it in public/ and update the URL below.
const theme = create({
  base: 'light',
  brandTitle: 'Tatva Components',
  brandUrl: 'https://github.com/lubusIN/tatva',
  brandImage: '/tatva-logo.svg',
  brandTarget: '_self',
});

addons.setConfig({ theme });

// Hide the sidebar (navigation) when viewing docs-only pages for a clean reading experience
try {
  const updateNavFromLocation = () => {
    try {
      const url = new URL(window.location.href);
      const viewMode = url.searchParams.get('viewMode');
      const isDocsView = viewMode === 'docs';
      addons.setConfig({ showNav: !isDocsView });
    } catch {
      /* noop */
    }
  };

  const channel = addons.getChannel();
  const setNavVisibilityById = (id) => {
    const storyId = typeof id === 'string' ? id : '';
    const isDocsId = storyId.endsWith('--docs');
    addons.setConfig({ showNav: !isDocsId });
  };

  // Initial pass and reactive updates on navigation
  updateNavFromLocation();
  window.addEventListener('popstate', updateNavFromLocation);
  window.addEventListener('hashchange', updateNavFromLocation);
  channel.on(STORY_RENDERED, setNavVisibilityById);
  channel.on(DOCS_RENDERED, setNavVisibilityById);
  channel.on(STORY_CHANGED, updateNavFromLocation);
} catch {
  /* channel may not be available during static build bootstrap */
}
