<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Icon from './Icon.svelte';

	const { Story } = defineMeta({
		title: 'Core/Media/Icon',
		component: Icon,
		tags: ['autodocs'],
		argTypes: {
			name: { control: 'text' },
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl']
			},
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'ghost']
			},
			spin: { control: 'boolean' }
		},
		args: {
			name: 'Home',
			size: 'md',
			variant: 'ghost'
		}
	});
</script>

<Story name="Default" />

<Story name="Common Icons">
	<div class="flex gap-4">
		<Icon name="Home" />
		<Icon name="User" />
		<Icon name="Settings" />
		<Icon name="Bell" />
		<Icon name="Search" />
	</div>
</Story>

<Story name="Sizes">
	<div class="flex items-center gap-4">
		<Icon name="Heart" size="xs" />
		<Icon name="Heart" size="sm" />
		<Icon name="Heart" size="md" />
		<Icon name="Heart" size="lg" />
		<Icon name="Heart" size="xl" />
	</div>
</Story>

<Story name="Variants">
	<div class="flex items-center gap-4 bg-base-200 p-4 rounded">
		<Icon name="Ghost" variant="primary" />
		<Icon name="Ghost" variant="secondary" />
		<Icon name="Ghost" variant="accent" />
		<Icon name="Ghost" variant="info" />
		<Icon name="Ghost" variant="success" />
		<Icon name="Ghost" variant="warning" />
		<Icon name="Ghost" variant="error" />
	</div>
</Story>

<Story name="Spin Animation">
	<div class="flex items-center gap-4">
		<Icon name="Loader2" spin />
		<Icon name="RefreshCcw" spin />
		<Icon name="Settings" spin />
	</div>
</Story>

<Story name="Invalid Icon">
	<Icon name="ThisIconDoesNotExist" />
</Story>
