<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Divider from './Divider.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/Divider',
		component: Divider,
		tags: ['autodocs'],
		argTypes: {
			orientation: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical'],
				description: 'Orientation of the divider'
			},
			variant: {
				control: { type: 'select' },
				options: [
					'default',
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the divider'
			},
			label: {
				control: 'text',
				description: 'Optional text label displayed on the divider'
			},
			labelPosition: {
				control: { type: 'select' },
				options: ['start', 'center', 'end'],
				description: 'Position of the label text'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Whether the divider is decorative (hidden from screen readers)'
			}
		},
		args: {
			orientation: 'horizontal',
			variant: 'default',
			labelPosition: 'center',
			ariaHidden: true
		}
	});
</script>

<!-- Default Story -->
<Story name="Default">
	<div class="w-full">
		<Divider />
	</div>
</Story>

<!-- Horizontal -->
<Story name="Horizontal">
	<div class="w-full">
		<Divider />
	</div>
</Story>

<!-- Vertical -->
<Story name="Vertical">
	<div class="flex h-24 items-center gap-4">
		<span>Left</span>
		<Divider orientation="vertical" />
		<span>Right</span>
	</div>
</Story>

<!-- With Label -->
<Story name="With Label">
	<div class="w-full">
		<Divider label="OR" />
	</div>
</Story>

<!-- Label Positions -->
<Story name="Label Positions">
	<div class="flex w-full flex-col gap-4">
		<Divider label="Start" labelPosition="start" />
		<Divider label="Center" labelPosition="center" />
		<Divider label="End" labelPosition="end" />
	</div>
</Story>

<!-- Variants -->
<Story name="Color Variants">
	<div class="flex w-full flex-col gap-4">
		<Divider label="Primary" variant="primary" />
		<Divider label="Secondary" variant="secondary" />
		<Divider label="Accent" variant="accent" />
		<Divider label="Info" variant="info" />
		<Divider label="Success" variant="success" />
	</div>
</Story>

<!-- Login Separator -->
<Story name="Login Separator">
	<div class="flex w-80 flex-col gap-4">
		<button class="btn btn-primary">Continue with Google</button>
		<Divider label="OR" variant="neutral" />
		<button class="btn btn-outline">Sign in with Email</button>
	</div>
</Story>

<!-- Vertical in Flex -->
<Story name="Vertical Navigation">
	<div class="bg-base-200 flex h-16 items-center gap-4 rounded-lg p-4">
		<span class="font-medium">Home</span>
		<Divider orientation="vertical" />
		<span class="font-medium">Products</span>
		<Divider orientation="vertical" />
		<span class="font-medium">Contact</span>
	</div>
</Story>

<!-- Content Separation -->
<Story name="Content Separation">
	<div class="flex w-full flex-col gap-4">
		<div class="bg-base-200 rounded-lg p-4">
			<p>Section 1: Lorem ipsum dolor sit amet</p>
		</div>
		<Divider />
		<div class="bg-base-200 rounded-lg p-4">
			<p>Section 2: Consectetur adipiscing elit</p>
		</div>
	</div>
</Story>

<!-- Playground -->
<Story name="Playground">
	<div class="w-full">
		<Divider
			variant="primary"
			label="Divider"
			labelPosition="center"
			orientation="horizontal"
			ariaLabel="Interactive divider"
			ariaHidden={false}
		/>
	</div>
</Story>
