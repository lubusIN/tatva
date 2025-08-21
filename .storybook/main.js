export default {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  
  // Addons configuration - plugins that extend Storybook functionality
  addons: [
    '@storybook/addon-essentials', // Core addons like controls, actions, etc.
    '@storybook/addon-docs',       // Enhanced documentation features
  ],
  
  // Framework configuration - specifies the build system
  framework: {
    name: '@storybook/web-components-vite', // Uses Vite for building web components
    options: {},
  },
  
  // Static directories - files that should be served as-is
  staticDirs: ['../public'], // public directory for assets
  
  // Documentation configuration
  docs: {
    autodocs: true, // Automatically generate documentation for components
  },
}; 