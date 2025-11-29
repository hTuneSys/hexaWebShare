// SPDX-FileCopyrightText: 2025 hexaTune LLC
// SPDX-License-Identifier: MIT

import { sveltePreprocess } from 'svelte-preprocess';
import type { Config } from '@sveltejs/vite-plugin-svelte';

const config: Config = {
  extensions: ['.svelte'],
  preprocess: sveltePreprocess({
    typescript: true,
    postcss: true
  })
};

export default config;
