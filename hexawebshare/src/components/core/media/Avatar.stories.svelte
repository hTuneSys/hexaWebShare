<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Avatar from './Avatar.svelte';

	const { Story } = defineMeta({
		title: 'Core/Media/Avatar',
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

	// prettier-ignore
	const defaultSrc =
		'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';
</script>

<Story name="Default">
	<Avatar src={defaultSrc} />
</Story>

<Story name="Sizes">
	<div class="flex items-center gap-4">
		<Avatar size="xs" src={defaultSrc} />
		<Avatar size="sm" src={defaultSrc} />
		<Avatar size="md" src={defaultSrc} />
		<Avatar size="lg" src={defaultSrc} />
		<Avatar size="xl" src={defaultSrc} />
	</div>
</Story>

<Story name="Shapes">
	<div class="flex items-center gap-4">
		<Avatar shape="circle" src={defaultSrc} />
		<Avatar shape="squircle" src={defaultSrc} />
		<Avatar shape="hexagon" src={defaultSrc} />
		<Avatar shape="triangle" src={defaultSrc} />
	</div>
</Story>

<Story name="Status Indicators">
	<div class="flex items-center gap-4">
		<Avatar status="online" src={defaultSrc} />
		<Avatar status="offline" src={defaultSrc} />
	</div>
</Story>

<Story name="Placeholder">
	<div class="flex items-center gap-4">
		<Avatar src={undefined} placeholder="XS" size="xs" />
		<Avatar src={undefined} placeholder="SM" size="sm" />
		<Avatar src={undefined} placeholder="MD" size="md" />
		<Avatar src={undefined} placeholder="LG" size="lg" />
		<Avatar src={undefined} placeholder="XL" size="xl" />
	</div>
</Story>

<Story name="Loading">
	<div class="flex items-center gap-4">
		<Avatar loading={true} size="xs" />
		<Avatar loading={true} size="sm" />
		<Avatar loading={true} size="md" />
		<Avatar loading={true} size="lg" />
		<Avatar loading={true} size="xl" />
	</div>
</Story>
