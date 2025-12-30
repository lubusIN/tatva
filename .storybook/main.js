export default {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],

  // Addons configuration - plugins that extend Storybook functionality
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            // Override the provider import source to avoid file:// protocol
            providerImportSource: '@storybook/addon-docs/mdx-react-shim'
          }
        }
      }
    }
  ],

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