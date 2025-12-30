<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ContainerWrapper from './ContainerWrapper.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/Container',
		component: ContainerWrapper,
		tags: ['autodocs'],
		argTypes: {
			maxWidth: {
				control: { type: 'select' },
				options: [
					'xs',
					'sm',
					'md',
					'lg',
					'xl',
					'2xl',
					'3xl',
					'4xl',
					'5xl',
					'6xl',
					'7xl',
					'full',
					'none'
				]
			},
			padding: {
				control: { type: 'select' },
				options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
			},
			centered: { control: 'boolean' },
			fluid: { control: 'boolean' },
			responsive: { control: 'boolean' }
		}
	});
</script>

<!-- Default Container -->
<Story
	name="Default"
	args={{
		maxWidth: 'lg',
		padding: 'md',
		centered: true,
		fluid: false,
		responsive: true,
		content: 'This is a default container with medium padding and large max-width.'
	}}
/>

<!-- Max Width Variants -->
<Story
	name="Max Width Variants"
	args={{
		maxWidth: 'md',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: md (28rem / 448px)'
	}}
/>

<!-- Full Width -->
<Story
	name="Full Width"
	args={{
		maxWidth: 'full',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: full (100% of parent)'
	}}
/>

<!-- Padding Variants -->
<Story
	name="Padding Variants"
	args={{
		maxWidth: 'lg',
		padding: 'lg',
		centered: true,
		content: 'Container with large padding (px-8 py-6)'
	}}
/>

<!-- No Padding -->
<Story
	name="No Padding"
	args={{
		maxWidth: 'lg',
		padding: 'none',
		centered: true,
		content: 'Container with no padding'
	}}
/>

<!-- Layout Variants -->
<Story
	name="Not Centered"
	args={{
		maxWidth: 'lg',
		padding: 'md',
		centered: false,
		content: 'Container without centering (no mx-auto)'
	}}
/>

<!-- Fluid -->
<Story
	name="Fluid"
	args={{
		maxWidth: 'lg',
		padding: 'md',
		centered: false,
		fluid: true,
		content: 'Fluid container (full width without max-width constraint)'
	}}
/>

<!-- With Custom Background -->
<Story
	name="With Custom Background"
	args={{
		maxWidth: 'lg',
		padding: 'lg',
		centered: true,
		className: 'bg-base-200 rounded-lg shadow-lg',
		content: 'Container with custom background, rounded corners, and shadow'
	}}
/>

<!-- Full Page Layout -->
<Story
	name="Full Page Layout"
	args={{
		maxWidth: '7xl',
		padding: 'xl',
		centered: true,
		responsive: true,
		className: 'min-h-screen bg-base-200',
		content: 'Full page layout container with minimum screen height'
	}}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		maxWidth: 'lg',
		padding: 'md',
		centered: true,
		fluid: false,
		responsive: true,
		content: 'Interactive container - use controls to customize'
	}}
/>
