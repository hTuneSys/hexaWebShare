// SPDX-FileCopyrightText: 2025 hexaTune LLC
// SPDX-License-Identifier: MIT

const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{svelte,ts,js}'],
  theme: {
    extend: {
      // ileride design tokens
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        hexa: {
          primary: '#4f46e5',
          secondary: '#ec4899',
          accent: '#22c55e',
          neutral: '#111827',
          'base-100': '#ffffff',
          info: '#0ea5e9',
          success: '#22c55e',
          warning: '#f97316',
          error: '#ef4444'
        }
      }
    ]
  }
};
