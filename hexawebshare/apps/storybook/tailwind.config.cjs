// SPDX-FileCopyrightText: 2025 hexaTune LLC
// SPDX-License-Identifier: MIT

const uiConfig = require('../../packages/ui/tailwind.config.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...uiConfig,
  content: [
    './src/**/*.{svelte,ts,js}',
    '../../packages/ui/src/**/*.{svelte,ts,js}'
  ]
};
