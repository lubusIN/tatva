import { fileURLToPath } from 'node:url';

export default {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],

  // Addons configuration - plugins that extend Storybook functionality
  addons: ['@storybook/addon-docs'],

  // Framework configuration - specifies the build system
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  // Static directories - files that should be served as-is
  staticDirs: ['../public'],

  core: {
    disableWhatsNewNotifications: true,
  },

  features: {
    sidebarOnboardingChecklist: false,
  },

  viteFinal: async (config) => {
    config.plugins = [
      ...(config.plugins || []),
      {
        name: 'resolve-file-urls',
        resolveId(source) {
          if (source.startsWith('file://')) {
            return fileURLToPath(source);
          }
        },
      },
    ];
    return config;
  },
};