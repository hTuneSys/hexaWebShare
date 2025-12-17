<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Avatar from './Avatar.svelte';

	const { Story } = defineMeta({
		title: 'Core/Media/Avatar',
		component: Avatar,
		tags: ['autodocs'],
		argTypes: {
			src: { control: 'text' },
			alt: { control: 'text' },
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl']
			},
			shape: {
				control: { type: 'select' },
				options: ['circle', 'squircle', 'hexagon', 'triangle']
			},
			status: {
				control: { type: 'radio' },
				options: ['online', 'offline', null]
			},
			placeholder: { control: 'text' },
			loading: { control: 'boolean' }
		}
	});
</script>

<Story
	name="Default"
	args={{
		src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
		alt: 'Avatar',
		size: 'md',
		shape: 'circle',
		status: null
	}}
/>

<Story
	name="Sizes"
	args={{
		src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
		alt: 'Large Avatar',
		size: 'xl',
		shape: 'circle',
		status: null
	}}
/>

<Story
	name="Shapes"
	args={{
		src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
		alt: 'Squircle Avatar',
		size: 'md',
		shape: 'squircle',
		status: null
	}}
/>

<Story
	name="Status Indicators"
	args={{
		src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
		alt: 'Online Avatar',
		size: 'md',
		shape: 'circle',
		status: 'online'
	}}
/>

<Story
	name="Placeholder"
	args={{
		alt: 'Placeholder Avatar',
		size: 'md',
		shape: 'circle',
		placeholder: 'AB'
	}}
/>

<Story
	name="Loading"
	args={{
		size: 'md',
		shape: 'circle',
		loading: true
	}}
/>

<Story
	name="Hexagon Shape"
	args={{
		src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
		alt: 'Hexagon Avatar',
		size: 'md',
		shape: 'hexagon',
		status: null
	}}
/>

<Story
	name="Triangle Shape"
	args={{
		src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
		alt: 'Triangle Avatar',
		size: 'md',
		shape: 'triangle'
	}}
/>

<Story
	name="Offline Status"
	args={{
		src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
		alt: 'Offline Avatar',
		size: 'md',
		shape: 'circle',
		status: 'offline'
	}}
/>

<Story
	name="Small Size"
	args={{
		src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
		alt: 'Small Avatar',
		size: 'xs',
		shape: 'circle',
		status: null
	}}
/>

<Story
	name="Custom Placeholder"
	args={{
		alt: 'Custom Placeholder',
		size: 'lg',
		shape: 'circle',
		placeholder: 'JD'
	}}
/>

<Story
	name="Large with Status"
	args={{
		src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
		alt: 'Large Online Avatar',
		size: 'lg',
		shape: 'circle',
		status: 'online'
	}}
/>

<Story
	name="Squircle Online"
	args={{
		src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
		alt: 'Squircle Online Avatar',
		size: 'md',
		shape: 'squircle',
		status: 'online'
	}}
/>
