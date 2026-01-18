<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Container from './Container.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/Container',
		component: Container,
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
		responsive: true
	}}
>
	{#snippet children()}
		<div class="bg-base-100 rounded-lg p-6 shadow">
			<h3 class="mb-2 text-xl font-bold">Container Content</h3>
			<p class="text-base-content/70 mb-4">
				This is a default container with medium padding and large max-width.
			</p>
			<div class="mt-4 flex gap-2">
				<button class="btn btn-primary btn-sm">Action</button>
				<button class="btn btn-secondary btn-sm">Secondary</button>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Max Width Variants -->
<Story
	name="Max Width MD"
	args={{
		maxWidth: 'md',
		padding: 'md',
		centered: true
	}}
>
	{#snippet children()}
		<div class="bg-base-100 rounded-lg p-6 shadow">
			<h3 class="mb-2 text-xl font-bold">Medium Width Container</h3>
			<p class="text-base-content/70">Container with max-width: md (28rem / 448px)</p>
		</div>
	{/snippet}
</Story>

<!-- Full Width -->
<Story
	name="Full Width"
	args={{
		maxWidth: 'full',
		padding: 'md',
		centered: true
	}}
>
	{#snippet children()}
		<div class="bg-base-100 rounded-lg p-6 shadow">
			<h3 class="mb-2 text-xl font-bold">Full Width Container</h3>
			<p class="text-base-content/70">Container with max-width: full (100% of parent)</p>
		</div>
	{/snippet}
</Story>

<!-- Padding Variants -->
<Story
	name="Large Padding"
	args={{
		maxWidth: 'lg',
		padding: 'lg',
		centered: true
	}}
>
	{#snippet children()}
		<div class="bg-base-100 rounded-lg p-6 shadow">
			<h3 class="mb-2 text-xl font-bold">Large Padding</h3>
			<p class="text-base-content/70">Container with large padding (px-8 py-6)</p>
		</div>
	{/snippet}
</Story>

<!-- No Padding -->
<Story
	name="No Padding"
	args={{
		maxWidth: 'lg',
		padding: 'none',
		centered: true
	}}
>
	{#snippet children()}
		<div class="bg-base-100 rounded-lg p-6 shadow">
			<h3 class="mb-2 text-xl font-bold">No Padding Container</h3>
			<p class="text-base-content/70">Container with no padding</p>
		</div>
	{/snippet}
</Story>

<!-- Not Centered -->
<Story
	name="Not Centered"
	args={{
		maxWidth: 'lg',
		padding: 'md',
		centered: false
	}}
>
	{#snippet children()}
		<div class="bg-base-100 rounded-lg p-6 shadow">
			<h3 class="mb-2 text-xl font-bold">Not Centered</h3>
			<p class="text-base-content/70">Container without centering (no mx-auto)</p>
		</div>
	{/snippet}
</Story>

<!-- Fluid -->
<Story
	name="Fluid"
	args={{
		maxWidth: 'lg',
		padding: 'md',
		centered: false,
		fluid: true
	}}
>
	{#snippet children()}
		<div class="bg-base-100 rounded-lg p-6 shadow">
			<h3 class="mb-2 text-xl font-bold">Fluid Container</h3>
			<p class="text-base-content/70">
				Fluid container (full width without max-width constraint)
			</p>
		</div>
	{/snippet}
</Story>

<!-- With Custom Background -->
<Story
	name="With Custom Background"
	args={{
		maxWidth: 'lg',
		padding: 'lg',
		centered: true,
		className: 'bg-base-200 rounded-lg shadow-lg'
	}}
>
	{#snippet children()}
		<div class="p-6">
			<h3 class="mb-2 text-xl font-bold">Custom Background</h3>
			<p class="text-base-content/70">
				Container with custom background, rounded corners, and shadow
			</p>
		</div>
	{/snippet}
</Story>

<!-- Nested Containers -->
<Story
	name="Nested Containers"
	args={{
		maxWidth: 'lg',
		padding: 'md',
		centered: true
	}}
>
	{#snippet children()}
		<div class="bg-base-100 rounded-lg p-6 shadow">
			<h3 class="mb-2 text-xl font-bold">Outer Container</h3>
			<p class="text-base-content/70 mb-4">This container has a nested container inside.</p>

			<Container maxWidth="md" padding="md" centered={true}>
				{#snippet children()}
					<div class="bg-base-200 rounded p-4">
						<h4 class="mb-2 text-lg font-semibold">Nested Container</h4>
						<p class="text-base-content/60 text-sm">
							This is a nested container inside the outer container.
						</p>
					</div>
				{/snippet}
			</Container>
		</div>
	{/snippet}
</Story>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		maxWidth: 'lg',
		padding: 'md',
		centered: true,
		fluid: false,
		responsive: true
	}}
>
	{#snippet children()}
		<div class="bg-base-100 rounded-lg p-6 shadow">
			<h3 class="mb-2 text-xl font-bold">Interactive Container</h3>
			<p class="text-base-content/70 mb-4">Use controls to customize this container.</p>
			<div class="mt-4 flex gap-2">
				<button class="btn btn-primary btn-sm">Primary Action</button>
				<button class="btn btn-secondary btn-sm">Secondary</button>
			</div>
		</div>
	{/snippet}
</Story>
