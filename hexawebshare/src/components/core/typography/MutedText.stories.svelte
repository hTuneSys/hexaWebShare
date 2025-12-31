<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MutedText from './MutedText.svelte';

	const { Story } = defineMeta({
		title: 'Core/Typography/MutedText',
		component: MutedText,
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: 'text',
				description: 'Text content of the muted text'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
				description: 'Size variant of the muted text'
			},
			align: {
				control: { type: 'select' },
				options: ['left', 'center', 'right', 'justify'],
				description: 'Text alignment'
			},
			variant: {
				control: { type: 'select' },
				options: ['muted', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
				description: 'Color variant of the muted text'
			},
			weight: {
				control: { type: 'select' },
				options: ['light', 'normal', 'medium', 'semibold', 'bold'],
				description: 'Font weight'
			},
			leading: {
				control: { type: 'select' },
				options: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
				description: 'Line height / leading'
			},
			truncate: {
				control: 'boolean',
				description: 'Truncate text with ellipsis (single line)'
			},
			lineClamp: {
				control: { type: 'select' },
				options: [undefined, 1, 2, 3, 4, 5, 6],
				description: 'Limit text to specified number of lines'
			},
			loading: {
				control: 'boolean',
				description: 'Loading state with skeleton animation'
			},
			disabled: {
				control: 'boolean',
				description: 'Disabled state (reduced opacity)'
			},
			italic: {
				control: 'boolean',
				description: 'Use italic style'
			},
			underline: {
				control: 'boolean',
				description: 'Use underline style'
			},
			strikethrough: {
				control: 'boolean',
				description: 'Use strikethrough style'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide muted text from screen readers'
			}
		},
		args: {
			text: 'This is muted text with reduced opacity, typically used for secondary or less important content.',
			size: 'base',
			align: 'left',
			variant: 'muted',
			weight: 'normal',
			leading: 'normal'
		}
	});

	const sampleText =
		'This is a sample muted text paragraph. Muted text is typically used for secondary information, captions, or less prominent content that should be visually de-emphasized.';

	const longText =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
</script>

<!-- Default -->
<Story name="Default" args={{ text: sampleText }} />

<!-- Muted Variant -->
<Story
	name="Muted"
	args={{
		text: 'This is muted text with the default muted variant (reduced opacity).',
		variant: 'muted'
	}}
/>

<!-- Primary Variant -->
<Story name="Primary" args={{ text: 'Primary colored muted text.', variant: 'primary' }} />

<!-- Small Size -->
<Story
	name="Small Size"
	args={{ text: 'Small muted text for captions and metadata', size: 'sm' }}
/>

<!-- Large Size -->
<Story name="Large Size" args={{ text: 'Larger muted text for emphasis', size: 'lg' }} />

<!-- Medium Weight -->
<Story
	name="Medium Weight"
	args={{ text: 'Medium weight muted text for subtle emphasis.', weight: 'medium' }}
/>

<!-- Italic Style -->
<Story name="Italic" args={{ text: 'This muted text is styled with italic.', italic: true }} />

<!-- Line Clamp -->
<Story name="Line Clamp" args={{ text: longText, lineClamp: 3 }} />

<!-- Loading State -->
<Story name="Loading" args={{ text: sampleText, loading: true }} />

<!-- Disabled State -->
<Story
	name="Disabled"
	args={{
		text: 'This is muted text in disabled state.',
		disabled: true
	}}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		text: sampleText,
		size: 'base',
		align: 'left',
		variant: 'muted',
		weight: 'normal',
		leading: 'normal',
		truncate: false,
		lineClamp: undefined,
		loading: false,
		disabled: false,
		italic: false,
		underline: false,
		strikethrough: false
	}}
/>
