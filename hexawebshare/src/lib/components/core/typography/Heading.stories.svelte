<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Heading from './Heading.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Typography/Heading',
		component: Heading,
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: 'text',
				description: 'Heading text content'
			},
			level: {
				control: { type: 'select' },
				options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
				description: 'HTML heading level (semantic)'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
				description: 'Visual size of the heading'
			},
			variant: {
				control: { type: 'select' },
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the heading'
			},
			weight: {
				control: { type: 'select' },
				options: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
				description: 'Font weight'
			},
			align: {
				control: { type: 'select' },
				options: ['left', 'center', 'right', 'justify'],
				description: 'Text alignment'
			},
			transform: {
				control: { type: 'select' },
				options: ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
				description: 'Text transform'
			},
			tracking: {
				control: { type: 'select' },
				options: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
				description: 'Letter spacing'
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
			gradient: {
				control: 'boolean',
				description: 'Enable gradient text effect'
			},
			gradientFrom: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
				description: 'Gradient start color'
			},
			gradientTo: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
				description: 'Gradient end color'
			},
			withMargin: {
				control: 'boolean',
				description: 'Add bottom margin'
			},
			loading: {
				control: 'boolean',
				description: 'Loading state (skeleton)'
			},
			disabled: {
				control: 'boolean',
				description: 'Disabled state'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaLevel: {
				control: 'number',
				description: 'ARIA level attribute'
			}
		},
		args: {
			text: 'Heading Text',
			level: 'h2',
			align: 'left',
			onclick: fn()
		}
	});
</script>

<!-- H1 Level -->
<Story name="H1 Level" args={{ text: 'Main Heading (H1)', level: 'h1', size: '4xl' }} />

<!-- H2 Level -->
<Story name="H2 Level" args={{ text: 'Section Heading (H2)', level: 'h2', size: '3xl' }} />

<!-- H3 Level -->
<Story name="H3 Level" args={{ text: 'Subsection Heading (H3)', level: 'h3', size: '2xl' }} />

<!-- Primary Variant -->
<Story name="Primary Variant" args={{ text: 'Primary Heading', level: 'h2', variant: 'primary' }} />

<!-- Gradient Text -->
<Story
	name="Gradient Text"
	args={{
		text: 'Gradient Heading Effect',
		level: 'h1',
		size: '3xl',
		gradient: true,
		gradientFrom: 'primary',
		gradientTo: 'secondary'
	}}
/>

<!-- Bold Centered -->
<Story
	name="Bold Centered"
	args={{
		text: 'Centered Bold Heading',
		level: 'h2',
		size: '2xl',
		weight: 'bold',
		align: 'center'
	}}
/>

<!-- Uppercase with Tracking -->
<Story
	name="Uppercase Wide Tracking"
	args={{
		text: 'Uppercase Heading',
		level: 'h3',
		transform: 'uppercase',
		tracking: 'wide'
	}}
/>

<!-- Truncated -->
<Story
	name="Truncated"
	args={{
		text: 'This is a very long heading that should be truncated with an ellipsis at the end',
		level: 'h2',
		truncate: true
	}}
/>

<!-- Loading State -->
<Story name="Loading State" args={{ text: 'Loading Heading', level: 'h2', loading: true }} />

<!-- Disabled State -->
<Story name="Disabled State" args={{ text: 'Disabled Heading', level: 'h2', disabled: true }} />

<!-- Playground -->
<Story
	name="Playground"
	args={{
		text: 'Interactive Heading',
		level: 'h2',
		size: '2xl',
		variant: undefined,
		weight: 'bold',
		align: 'left',
		transform: undefined,
		tracking: 'normal',
		truncate: false,
		lineClamp: undefined,
		gradient: false,
		gradientFrom: 'primary',
		gradientTo: 'secondary',
		withMargin: false,
		loading: false,
		disabled: false
	}}
/>
