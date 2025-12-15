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
	name="Extra Small"
	args={{
		maxWidth: 'xs',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: xs (20rem / 320px)'
	}}
/>

<Story
	name="Small"
	args={{
		maxWidth: 'sm',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: sm (24rem / 384px)'
	}}
/>

<Story
	name="Medium"
	args={{
		maxWidth: 'md',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: md (28rem / 448px)'
	}}
/>

<Story
	name="Large"
	args={{
		maxWidth: 'lg',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: lg (32rem / 512px)'
	}}
/>

<Story
	name="Extra Large"
	args={{
		maxWidth: 'xl',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: xl (36rem / 576px)'
	}}
/>

<Story
	name="TwoXL"
	args={{
		maxWidth: '2xl',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: 2xl (42rem / 672px)'
	}}
/>

<Story
	name="ThreeXL"
	args={{
		maxWidth: '3xl',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: 3xl (48rem / 768px)'
	}}
/>

<Story
	name="FourXL"
	args={{
		maxWidth: '4xl',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: 4xl (56rem / 896px)'
	}}
/>

<Story
	name="FiveXL"
	args={{
		maxWidth: '5xl',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: 5xl (64rem / 1024px)'
	}}
/>

<Story
	name="SixXL"
	args={{
		maxWidth: '6xl',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: 6xl (72rem / 1152px)'
	}}
/>

<Story
	name="SevenXL"
	args={{
		maxWidth: '7xl',
		padding: 'md',
		centered: true,
		content: 'Container with max-width: 7xl (80rem / 1280px)'
	}}
/>

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
	name="No Padding"
	args={{
		maxWidth: 'lg',
		padding: 'none',
		centered: true,
		content: 'Container with no padding'
	}}
/>

<Story
	name="Extra Small Padding"
	args={{
		maxWidth: 'lg',
		padding: 'xs',
		centered: true,
		content: 'Container with extra small padding (px-2 py-1)'
	}}
/>

<Story
	name="Small Padding"
	args={{
		maxWidth: 'lg',
		padding: 'sm',
		centered: true,
		content: 'Container with small padding (px-4 py-2)'
	}}
/>

<Story
	name="Medium Padding"
	args={{
		maxWidth: 'lg',
		padding: 'md',
		centered: true,
		content: 'Container with medium padding (px-6 py-4)'
	}}
/>

<Story
	name="Large Padding"
	args={{
		maxWidth: 'lg',
		padding: 'lg',
		centered: true,
		content: 'Container with large padding (px-8 py-6)'
	}}
/>

<Story
	name="Extra Large Padding"
	args={{
		maxWidth: 'lg',
		padding: 'xl',
		centered: true,
		content: 'Container with extra large padding (px-10 py-8)'
	}}
/>

<Story
	name="TwoXL Padding"
	args={{
		maxWidth: 'lg',
		padding: '2xl',
		centered: true,
		content: 'Container with 2xl padding (px-12 py-10)'
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

<Story
	name="Non-Responsive"
	args={{
		maxWidth: 'lg',
		padding: 'md',
		centered: true,
		responsive: false,
		content: 'Container with responsive padding disabled'
	}}
/>

<!-- Complex Examples -->
<Story
	name="Nested Containers"
	args={{
		maxWidth: 'xl',
		padding: 'lg',
		centered: true,
		content: 'Outer Container',
		nested: true
	}}
/>

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

<Story
	name="With Border"
	args={{
		maxWidth: 'md',
		padding: 'md',
		centered: true,
		className: 'border-2 border-primary rounded-md',
		content: 'Container with border and rounded corners'
	}}
/>

<Story
	name="Card-like Container"
	args={{
		maxWidth: 'lg',
		padding: 'lg',
		centered: true,
		className: 'bg-base-100 shadow-xl rounded-box',
		content: 'Container styled as a card with shadow and rounded corners'
	}}
/>

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
