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
  }
}; 