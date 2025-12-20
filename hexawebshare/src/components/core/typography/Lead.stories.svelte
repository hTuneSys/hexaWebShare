<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Lead from './Lead.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Typography/Lead',
		component: Lead,
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: 'text',
				description: 'Lead text content'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
				description: 'Size variant of the lead text'
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
				description: 'Color variant of the lead text'
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
				description: 'Truncate with ellipsis'
			},
			lineClamp: {
				control: { type: 'select' },
				options: [1, 2, 3, 4, 5, 6],
				description: 'Number of lines before truncating'
			},
			loading: {
				control: 'boolean',
				description: 'Loading state (skeleton)'
			},
			disabled: {
				control: 'boolean',
				description: 'Disabled state'
			},
			italic: {
				control: 'boolean',
				description: 'Italic style'
			},
			underline: {
				control: 'boolean',
				description: 'Underline style'
			},
			strikethrough: {
				control: 'boolean',
				description: 'Strikethrough style'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide from screen readers'
			}
		},
		args: {
			text: 'This is a lead paragraph that stands out from regular text. It is typically used for important introductory content or call-to-action descriptions.',
			size: 'lg',
			align: 'left',
			variant: 'default',
			weight: 'normal',
			leading: 'relaxed'
		}
	});
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		text: 'This is a default lead paragraph that stands out from regular text. It is typically used for important introductory content or call-to-action descriptions.'
	}}
/>

<!-- Variant Examples -->
<Story
	name="Primary"
	args={{
		text: 'This is a primary lead paragraph with primary theme color.',
		variant: 'primary'
	}}
/>
<Story
	name="Muted"
	args={{
		text: 'This is a muted lead paragraph with reduced opacity for secondary content.',
		variant: 'muted'
	}}
/>

<!-- States -->
<Story
	name="Loading"
	args={{
		text: 'This is a loading lead paragraph.',
		loading: true
	}}
/>
<Story
	name="Disabled"
	args={{
		text: 'This is a disabled lead paragraph.',
		disabled: true
	}}
/>

<!-- Truncation Examples -->
<Story
	name="Truncated"
	args={{
		text: 'This is a very long lead paragraph that should be truncated with an ellipsis at the end when it exceeds the container width.',
		truncate: true
	}}
/>
<Story
	name="Line Clamp"
	args={{
		text: 'This is a multi-line lead paragraph that should be clamped to three lines maximum with an ellipsis shown at the end of the third line when the text is too long to fit within the specified line count. This allows for more content to be displayed while still maintaining a clean appearance.',
		lineClamp: 3
	}}
/>

<!-- Real-world Example -->
<Story
	name="Hero Section"
	args={{
		text: 'Transform your business with our cutting-edge solutions. Join thousands of companies already experiencing unprecedented growth and success.',
		size: 'xl',
		variant: 'primary',
		weight: 'medium',
		align: 'center',
		leading: 'relaxed'
	}}
/>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		text: 'This is an interactive lead paragraph. Use the controls panel to customize all properties.',
		size: 'lg',
		variant: 'default',
		weight: 'normal',
		align: 'left',
		leading: 'relaxed'
	}}
/>
