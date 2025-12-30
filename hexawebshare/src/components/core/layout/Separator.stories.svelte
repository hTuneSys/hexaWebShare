<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Separator from './Separator.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/Separator',
		component: Separator,
		tags: ['autodocs'],
		argTypes: {
			orientation: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical']
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
				]
			},
			spacing: {
				control: { type: 'select' },
				options: ['none', 'xs', 'sm', 'md', 'lg', 'xl']
			},
			thickness: {
				control: { type: 'select' },
				options: ['1', '2', '4']
			},
			ariaLabel: { control: 'text' },
			ariaHidden: { control: 'boolean' }
		}
	});
</script>

<!-- Default Stories -->
<Story name="Default" />

<Story name="Horizontal" args={{ orientation: 'horizontal' }} />

<Story name="Vertical">
	<div class="flex h-24 items-center gap-4">
		<span>Left</span>
		<Separator orientation="vertical" spacing="sm" />
		<span>Right</span>
	</div>
</Story>

<!-- Variant Stories -->
<Story name="Color Variants" args={{ variant: 'primary' }} />

<!-- Thickness Stories -->
<Story name="Thickness Comparison">
	<div class="flex w-full flex-col gap-6">
		<div>
			<p class="mb-2 text-sm font-semibold">1px (Default)</p>
			<Separator thickness="1" />
		</div>
		<div>
			<p class="mb-2 text-sm font-semibold">2px</p>
			<Separator thickness="2" />
		</div>
		<div>
			<p class="mb-2 text-sm font-semibold">4px</p>
			<Separator thickness="4" />
		</div>
	</div>
</Story>

<!-- Spacing Stories -->
<Story name="Spacing Variants" args={{ spacing: 'sm' }} />

<!-- Usage Examples -->
<Story name="Content Separation">
	<div class="flex w-full flex-col gap-4">
		<div class="bg-base-200 rounded-lg p-4">
			<p>Section 1: Lorem ipsum dolor sit amet</p>
		</div>
		<Separator />
		<div class="bg-base-200 rounded-lg p-4">
			<p>Section 2: Consectetur adipiscing elit</p>
		</div>
		<Separator />
		<div class="bg-base-200 rounded-lg p-4">
			<p>Section 3: Sed do eiusmod tempor incididunt</p>
		</div>
	</div>
</Story>

<Story name="Vertical Navigation">
	<div class="bg-base-200 flex h-16 items-center gap-4 rounded-lg p-4">
		<span class="font-medium">Home</span>
		<Separator orientation="vertical" spacing="sm" />
		<span class="font-medium">Products</span>
		<Separator orientation="vertical" spacing="sm" />
		<span class="font-medium">About</span>
		<Separator orientation="vertical" spacing="sm" />
		<span class="font-medium">Contact</span>
	</div>
</Story>

<!-- All Variants Showcase -->
<Story name="All Color Variants">
	<div class="flex w-full flex-col gap-4">
		<Separator variant="default" />
		<Separator variant="primary" />
		<Separator variant="secondary" />
		<Separator variant="accent" />
		<Separator variant="info" />
		<Separator variant="success" />
	</div>
</Story>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		orientation: 'horizontal',
		variant: 'default',
		spacing: 'md',
		thickness: '1',
		ariaLabel: 'Content separator',
		ariaHidden: true
	}}
/>
