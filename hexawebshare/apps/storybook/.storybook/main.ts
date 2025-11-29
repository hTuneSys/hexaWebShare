// SPDX-FileCopyrightText: 2025 hexaTune LLC
// SPDX-License-Identifier: MIT

import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
  stories: ['../../../packages/ui/src/**/*.stories.@(ts|js|svelte)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/svelte-vite',
    options: {
      svelteOptions: {
        // UI paketindeki svelte config'i kullan
        configFile: '../../../packages/ui/svelte.config.mts'
      }
    }
  },
  docs: {
    autodocs: 'tag'
  }
};

export default config;
