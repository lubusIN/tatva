export default {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],

  // Addons configuration - plugins that extend Storybook functionality
  addons: [// Enhanced documentation features
  '@storybook/addon-docs'],

  // Framework configuration - specifies the build system
  framework: {
    name: '@storybook/web-components-vite', // Uses Vite for building web components
    options: {},
  },

  // Static directories - files that should be served as-is
  // public directory for assets
  staticDirs: ['../public'],

  core: {
    disableWhatsNewNotifications: true
  },

  async viteFinal(config) {
    // Fix for Storybook 10 + Vite MDX build issue with React components
    // The mdx-react-shim import needs to be properly handled
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    
    // Suppress the warning about mdx-react-shim file:// imports
    const originalOnwarn = config.build.rollupOptions.onwarn;
    config.build.rollupOptions.onwarn = (warning, warn) => {
      // Suppress warnings about mdx-react-shim unresolved imports
      if (
        warning.code === 'UNRESOLVED_IMPORT' &&
        warning.exporter?.includes('mdx-react-shim')
      ) {
        return;
      }
      if (originalOnwarn) {
        originalOnwarn(warning, warn);
      } else {
        warn(warning);
      }
    };
    
    return config;
  }
}; 