<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Paragraph from './Paragraph.svelte';

	const { Story } = defineMeta({
		title: 'Core/Typography/Paragraph',
		component: Paragraph,
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: 'text',
				description: 'Text content of the paragraph'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
				description: 'Size variant of the paragraph'
			},
			align: {
				control: { type: 'select' },
				options: ['left', 'center', 'right', 'justify'],
				description: 'Text alignment'
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
				description: 'Color variant of the paragraph text'
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
				description: 'Hide paragraph from screen readers'
			}
		},
		args: {
			text: 'This is a sample paragraph with default styling. It demonstrates the basic usage of the Paragraph component.',
			size: 'base',
			align: 'left',
			variant: 'default',
			weight: 'normal',
			leading: 'normal'
		}
	});

	const sampleText =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

	const longText =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
</script>

<!-- Default -->
<Story name="Default" args={{ text: sampleText }} />

<!-- Small Size -->
<Story name="Small" args={{ text: sampleText, size: 'sm' }} />

<!-- Large Size -->
<Story name="Large" args={{ text: sampleText, size: 'lg' }} />

<!-- Primary Variant -->
<Story name="Primary" args={{ text: 'Primary colored paragraph text.', variant: 'primary' }} />

<!-- Muted Variant -->
<Story
	name="Muted"
	args={{ text: 'Muted paragraph text for secondary content.', variant: 'muted' }}
/>

<!-- Center Aligned -->
<Story name="Center Aligned" args={{ text: sampleText, align: 'center' }} />

<!-- Medium Weight -->
<Story name="Medium Weight" args={{ text: 'Medium weight paragraph text.', weight: 'medium' }} />

<!-- Relaxed Leading -->
<Story name="Relaxed Leading" args={{ text: sampleText, leading: 'relaxed' }} />

<!-- Line Clamp -->
<Story name="Line Clamp" args={{ text: longText, lineClamp: 3 }} />

<!-- Loading State -->
<Story name="Loading" args={{ text: sampleText, loading: true }} />

<!-- Playground -->
<Story
	name="Playground"
	args={{
		text: sampleText,
		size: 'base',
		align: 'left',
		variant: 'default',
		weight: 'normal',
		leading: 'normal',
		truncate: false,
		lineClamp: undefined,
		loading: false,
		italic: false,
		underline: false,
		strikethrough: false
	}}
/>
