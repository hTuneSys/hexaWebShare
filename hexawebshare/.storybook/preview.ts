// SPDX-FileCopyrightText: 2025 hexaTune LLC
// SPDX-License-Identifier: MIT
  
import type { Preview } from '@storybook/sveltekit'
import '../src/routes/layout.css';
import ThemeWrapper from './ThemeWrapper.svelte';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  
  globalTypes: {
    theme: {
      description: 'DaisyUI Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' }
        ],
        dynamicTitle: true,
      },
    },
  },
  
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      
      return {
        Component: ThemeWrapper,
        props: {
          theme: theme,
        },
        slot: story,
      };
    }
  ],
};
export default preview;
