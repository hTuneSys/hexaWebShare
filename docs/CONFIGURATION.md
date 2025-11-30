<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# CONFIGURATION.md

This document explains how configuration is managed across the hexaWebShare project, including development environment setup, build configuration, and runtime parameters.

---

## 📦 Package Configuration

### package.json

The library is configured in `hexawebshare/package.json`:

```json
{
  "name": "hexawebshare",
  "version": "0.0.1",
  "type": "module",
  "svelte": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

**Key Fields:**
- `svelte`: Entry point for Svelte components
- `types`: TypeScript type definitions
- `files`: Specifies which files are included in the npm package
- `sideEffects`: Marks CSS files as having side effects for bundlers

---

## 🎨 Tailwind CSS Configuration

### tailwind.config.js

Located in `hexawebshare/tailwind.config.js`:

```javascript
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
}
```

**Configuration Options:**
- `content`: Files to scan for Tailwind classes
- `plugins`: Tailwind plugins including DaisyUI
- `daisyui.themes`: Available theme presets
- `daisyui.darkTheme`: Default dark theme name
- `daisyui.base`: Include base styles
- `daisyui.styled`: Apply component styles
- `daisyui.utils`: Include utility classes

### PostCSS Configuration

Located in `hexawebshare/postcss.config.js`:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

---

## ⚙️ TypeScript Configuration

### tsconfig.json

Located in `hexawebshare/tsconfig.json`:

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "rewriteRelativeImportExtensions": true,
    "allowJs": true,
    "checkJs": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}
```

**Key Options:**
- `strict`: Enable all strict type-checking options
- `module`: NodeNext for modern ES modules
- `sourceMap`: Generate source maps for debugging
- `allowJs`: Allow JavaScript files
- `checkJs`: Type-check JavaScript files

---

## 🏗️ SvelteKit Configuration

### svelte.config.js

Located in `hexawebshare/svelte.config.js`:

```javascript
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter()
  }
};

export default config;
```

**Configuration:**
- `preprocess`: Uses Vite preprocessor for TypeScript, SCSS, etc.
- `adapter`: Auto-detect deployment adapter

---

## ⚡ Vite Configuration

### vite.config.ts

Located in `hexawebshare/vite.config.ts`:

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()]
});
```

**Simple configuration leveraging SvelteKit's Vite plugin.**

---

## 📖 Storybook Configuration

### .storybook/main.ts

```typescript
import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)"
  ],
  addons: [
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  framework: "@storybook/sveltekit"
};

export default config;
```

**Features:**
- **Stories**: Auto-discover story files
- **Addons**: 
  - `addon-svelte-csf`: Svelte Component Story Format
  - `addon-a11y`: Accessibility testing
  - `addon-docs`: Auto-generated documentation
  - `addon-vitest`: Testing integration
  - `@chromatic-com/storybook`: Visual testing

### .storybook/preview.ts

```typescript
import type { Preview } from '@storybook/sveltekit'
import '../src/routes/layout.css';
import ThemeWrapper from './ThemeWrapper.svelte';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'DaisyUI Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ],
      },
    },
  },
  
  decorators: [
    (story, context) => {
      return {
        Component: ThemeWrapper,
        props: { theme: context.globals.theme || 'light' },
        slot: story,
      };
    }
  ],
};

export default preview;
```

**Features:**
- Theme switcher in Storybook toolbar
- ThemeWrapper decorator applies theme to all stories
- Imports global CSS styles

---

## 🎯 Environment Setup

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start Storybook
pnpm storybook
```

### Build

```bash
# Build library package
pnpm build

# Build Storybook
pnpm build-storybook
```

### Quality Checks

```bash
# Type checking
pnpm check

# Formatting
pnpm format

# Linting
pnpm lint
```

---

## 📋 Scripts Reference

From `package.json`:

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite dev` | Start development server |
| `build` | `vite build && npm run prepack` | Build library and package |
| `preview` | `vite preview` | Preview production build |
| `prepare` | `svelte-kit sync` | Sync SvelteKit types |
| `prepack` | `svelte-kit sync && svelte-package && publint` | Package library |
| `check` | `svelte-kit sync && svelte-check` | Type check |
| `check:watch` | `svelte-kit sync && svelte-check --watch` | Type check in watch mode |
| `format` | `prettier --write .` | Format code |
| `lint` | `prettier --check .` | Check formatting |
| `storybook` | `storybook dev -p 6006` | Start Storybook |
| `build-storybook` | `storybook build` | Build Storybook |

---

## 🔧 Tool Configurations

### Prettier

`.prettierrc` for code formatting:
```json
{
  "useTabs": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": [
    "prettier-plugin-svelte",
    "prettier-plugin-tailwindcss"
  ]
}
```

### VS Code Settings

`.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[svelte]": {
    "editor.defaultFormatter": "svelte.svelte-vscode"
  }
}
```

---

## 🌐 Runtime Configuration

### CSS Import

Components use DaisyUI classes which require the base CSS to be imported in your app:

```javascript
// In your app's root layout
import 'hexawebshare/dist/styles.css'; // If packaged with styles
```

### Theme Configuration

Themes can be configured at runtime using the `data-theme` attribute:

```html
<html data-theme="light">
  <!-- light theme -->
</html>

<html data-theme="dark">
  <!-- dark theme -->
</html>
```

---

## 📦 Publishing Configuration

### NPM Package

The library is configured for npm publishing:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "svelte": "./dist/index.js"
    }
  },
  "files": [
    "dist",
    "!dist/**/*.test.*",
    "!dist/**/*.spec.*"
  ]
}
```

**Publishing:**
```bash
npm publish
```

---

## 🔒 Git Configuration

`.gitignore` excludes:
- `node_modules/`
- `.svelte-kit/`
- `dist/`
- `package/`
- `.env` files

---

## 📝 Notes

- All configuration files use modern ES modules (`type: "module"`)
- TypeScript strict mode is enabled for type safety
- Prettier is configured for consistent code formatting
- Storybook is pre-configured with essential addons
- DaisyUI themes can be customized in `tailwind.config.js`

---

This guide helps contributors safely configure and run the project in various environments.
