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
			placeholder: { control: 'text' }
		},
		args: {
			src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
			alt: 'Avatar'
		}
	});
</script>

<Story name="Default" />

<Story name="Sizes">
	<div class="flex items-center gap-4">
		<Avatar size="xs" />
		<Avatar size="sm" />
		<Avatar size="md" />
		<Avatar size="lg" />
		<Avatar size="xl" />
	</div>
</Story>

<Story name="Shapes">
	<div class="flex items-center gap-4">
		<Avatar shape="circle" />
		<Avatar shape="squircle" />
		<Avatar shape="hexagon" />
		<Avatar shape="triangle" />
	</div>
</Story>

<Story name="Status Indicators">
	<div class="flex items-center gap-4">
		<Avatar status="online" />
		<Avatar status="offline" />
	</div>
</Story>

<Story name="Placeholder" args={{ src: undefined, placeholder: 'H' }}>
	<div class="flex items-center gap-4">
		<Avatar src={undefined} placeholder="XS" size="xs" />
		<Avatar src={undefined} placeholder="SM" size="sm" />
		<Avatar src={undefined} placeholder="MD" size="md" />
		<Avatar src={undefined} placeholder="LG" size="lg" />
		<Avatar src={undefined} placeholder="XL" size="xl" />
	</div>
</Story>
