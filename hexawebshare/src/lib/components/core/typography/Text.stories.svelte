<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Text from './Text.svelte';

	const { Story } = defineMeta({
		title: 'Core/Typography/Text',
		component: Text,
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: 'text',
				description: 'Text content'
			},
			display: {
				control: { type: 'select' },
				options: ['inline', 'inline-block', 'block'],
				description: 'Display type of the text element'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
				description: 'Size variant of the text'
			},
			align: {
				control: { type: 'select' },
				options: ['left', 'center', 'right', 'justify'],
				description: 'Text alignment (only applies when display is block)'
			},
			variant: {
				control: { type: 'select' },
				options: [
					'default',
					'muted',
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the text'
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
				description: 'Hide text from screen readers'
			}
		},
		args: {
			text: 'This is sample text with default styling.',
			display: 'inline',
			size: 'base',
			align: 'left',
			variant: 'default',
			weight: 'normal',
			leading: 'normal'
		}
	});

	const sampleText =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

	const longText =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
</script>

<!-- Inline Display -->
<Story name="Inline">
	<div>
		This is regular text with <Text text="inline text" /> in the middle of a sentence.
	</div>
</Story>

<!-- Block Display -->
<Story name="Block">
	<div class="space-y-2">
		<Text text="Block text element - takes full width" display="block" />
		<Text text="Another block element" display="block" />
	</div>
</Story>

<!-- Small Size -->
<Story name="Small" args={{ text: sampleText, size: 'sm', display: 'block' }} />

<!-- Large Size -->
<Story name="Large" args={{ text: sampleText, size: 'lg', display: 'block' }} />

<!-- Primary Variant -->
<Story
	name="Primary"
	args={{ text: 'Primary colored text.', variant: 'primary', display: 'block' }}
/>

<!-- Muted Variant -->
<Story
	name="Muted"
	args={{ text: 'Muted text for secondary content.', variant: 'muted', display: 'block' }}
/>

<!-- Bold Weight -->
<Story name="Bold Weight" args={{ text: 'Bold weight text.', weight: 'bold', display: 'block' }} />

<!-- Center Aligned -->
<Story name="Center Aligned" args={{ text: sampleText, align: 'center', display: 'block' }} />

<!-- Line Clamp -->
<Story name="Line Clamp" args={{ text: longText, lineClamp: 2, display: 'block' }} />

<!-- Loading State -->
<Story name="Loading" args={{ text: sampleText, loading: true, display: 'block' }} />

<!-- Playground -->
<Story
	name="Playground"
	args={{
		text: sampleText,
		display: 'inline',
		size: 'base',
		align: 'left',
		variant: 'default',
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
