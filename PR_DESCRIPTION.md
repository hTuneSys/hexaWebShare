## Description

This PR implements a fully functional Checkbox component for the hexaWebShare component library. The component follows Svelte 5 patterns with runes and uses DaisyUI for styling.

## Changes

- ✅ Implemented Checkbox component with Svelte 5 runes (`$props`, `$derived`, `$state`, `$effect`)
- ✅ Added TypeScript Props interface with comprehensive type safety
- ✅ Included DaisyUI static classes for styling (no dynamic string interpolation)
- ✅ Created comprehensive Storybook stories demonstrating all variants and states
- ✅ Exported component in `src/lib/index.ts`
- ✅ Added accessibility features (ARIA labels, keyboard navigation, proper label association)
- ✅ Support for error states and form integration

## Component Features

- **Variants**: primary, secondary, accent, success, warning, error, info
- **Sizes**: xs, sm, md, lg
- **States**: checked, unchecked, indeterminate, disabled, required
- **Error handling**: error state with optional error message
- **Form integration**: name, value, id attributes support
- **Event handlers**: onchange and onchecked callbacks

## Checklist

- [x] Clear and descriptive title using a valid PR type
- [x] Description explains the context and purpose
- [x] No unrelated changes or mixed concerns
- [x] All checks pass (CI, lint, test)
- [ ] Reviewers assigned
- [ ] Labels applied

## Labels

Please apply the following labels:
- `type:feature` - New feature
- `module:core` - Core component
- `priority:medium` - Normal importance

## Testing

- [x] Component renders correctly in Storybook
- [x] All variants and sizes work as expected
- [x] Accessibility features tested
- [x] Type checking passes (`pnpm check`)
- [x] No linting errors

## Related

This component is part of the core/forms component library completion effort.

