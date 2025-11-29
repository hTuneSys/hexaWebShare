<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# hexaWebShare Component Library

This directory contains the main component library for hexaWebShare.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start Storybook for component development
pnpm storybook

# Start SvelteKit dev server
pnpm dev
```

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start SvelteKit dev server |
| `pnpm storybook` | Start Storybook dev server |
| `pnpm build` | Build library package |
| `pnpm build-storybook` | Build static Storybook |
| `pnpm check` | TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm lint` | Check code formatting |

## Documentation

For comprehensive documentation, see the [main README](../README.md) in the root directory.

- [Getting Started](../docs/GETTING_STARTED.md)
- [Contributing Guide](../docs/CONTRIBUTING.md)
- [Architecture](../docs/ARCHITECTURE.md)
- [Development Guide](../docs/DEVELOPMENT_GUIDE.md)

## Component Structure

```
src/components/
├── core/         # Core UI components
├── admin/        # Admin panel components
├── b2b/          # B2B workspace components
├── ecommerce/    # E-commerce components
├── marketing/    # Marketing components
└── utility/      # Utility components
```

## License

MIT License - see [LICENSE](../LICENSE) file for details.
