// SPDX-FileCopyrightText: 2025 hexaTune LLC
// SPDX-License-Identifier: MIT

import type { Preview } from '@storybook/svelte';
import '../src/preview.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true }
  }
};

export default preview;
