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
					'screen'
				],
				description: 'Maximum width of the container'
			},
			padding: {
				control: { type: 'select' },
				options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Padding size around the container content'
			},
			centered: {
				control: 'boolean',
				description: 'Whether to center the container horizontally'
			},
			fluid: {
				control: 'boolean',
				description: 'Whether the container should be fluid (full width, no max-width)'
			}
		},
		args: {
			maxWidth: 'xl',
			padding: 'md',
			centered: true,
			fluid: false
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ maxWidth: 'xl', padding: 'md', centered: true }}>
	<div class="rounded bg-base-200 p-4">
		<h2 class="mb-4 text-2xl font-bold">Container Content</h2>
		<p class="text-base-content">
			This is a default container with max-width xl and medium padding. The content is centered
			horizontally.
		</p>
	</div>
</Story>

<!-- Max Width Stories -->
<Story name="Small" args={{ maxWidth: 'sm' }}>
	<div class="rounded bg-primary p-4 text-primary-content">
		<p>Small container (max-w-sm)</p>
	</div>
</Story>

<Story name="Medium" args={{ maxWidth: 'md' }}>
	<div class="rounded bg-secondary p-4 text-secondary-content">
		<p>Medium container (max-w-md)</p>
	</div>
</Story>

<Story name="Large" args={{ maxWidth: 'lg' }}>
	<div class="rounded bg-accent p-4 text-accent-content">
		<p>Large container (max-w-lg)</p>
	</div>
</Story>

<Story name="Extra Large" args={{ maxWidth: 'xl' }}>
	<div class="rounded bg-info p-4 text-info-content">
		<p>Extra Large container (max-w-xl)</p>
	</div>
</Story>

<Story name="XL2" args={{ maxWidth: '2xl' }}>
	<div class="rounded bg-success p-4 text-success-content">
		<p>2XL container (max-w-2xl)</p>
	</div>
</Story>

<Story name="XL3" args={{ maxWidth: '3xl' }}>
	<div class="rounded bg-warning p-4 text-warning-content">
		<p>3XL container (max-w-3xl)</p>
	</div>
</Story>

<Story name="XL4" args={{ maxWidth: '4xl' }}>
	<div class="rounded bg-error p-4 text-error-content">
		<p>4XL container (max-w-4xl)</p>
	</div>
</Story>

<Story name="XL5" args={{ maxWidth: '5xl' }}>
	<div class="rounded bg-base-200 p-4">
		<p>5XL container (max-w-5xl)</p>
	</div>
</Story>

<Story name="XL6" args={{ maxWidth: '6xl' }}>
	<div class="rounded bg-base-200 p-4">
		<p>6XL container (max-w-6xl)</p>
	</div>
</Story>

<Story name="XL7" args={{ maxWidth: '7xl' }}>
	<div class="rounded bg-base-200 p-4">
		<p>7XL container (max-w-7xl)</p>
	</div>
</Story>

<Story name="Full Width" args={{ maxWidth: 'full' }}>
	<div class="rounded bg-primary p-4 text-primary-content">
		<p>Full width container (max-w-full)</p>
	</div>
</Story>

<Story name="Screen Width" args={{ maxWidth: 'screen' }}>
	<div class="rounded bg-secondary p-4 text-secondary-content">
		<p>Screen width container (max-w-screen-xl)</p>
	</div>
</Story>

<!-- Padding Stories -->
<Story name="No Padding" args={{ padding: 'none' }}>
	<div class="rounded bg-base-200">
		<p class="p-4">Container with no padding</p>
	</div>
</Story>

<Story name="Extra Small Padding" args={{ padding: 'xs' }}>
	<div class="rounded bg-primary text-primary-content">
		<p>Container with extra small padding (p-2)</p>
	</div>
</Story>

<Story name="Small Padding" args={{ padding: 'sm' }}>
	<div class="rounded bg-secondary text-secondary-content">
		<p>Container with small padding (p-4)</p>
	</div>
</Story>

<Story name="Medium Padding" args={{ padding: 'md' }}>
	<div class="rounded bg-accent text-accent-content">
		<p>Container with medium padding (p-6)</p>
	</div>
</Story>

<Story name="Large Padding" args={{ padding: 'lg' }}>
	<div class="rounded bg-info text-info-content">
		<p>Container with large padding (p-8)</p>
	</div>
</Story>

<Story name="Extra Large Padding" args={{ padding: 'xl' }}>
	<div class="rounded bg-success text-success-content">
		<p>Container with extra large padding (p-12)</p>
	</div>
</Story>

<!-- Layout Stories -->
<Story name="Fluid Container" args={{ fluid: true }}>
	<div class="rounded bg-base-200 p-4">
		<p>Fluid container - takes full width without max-width constraint</p>
	</div>
</Story>

<Story name="Not Centered" args={{ centered: false }}>
	<div class="rounded bg-primary p-4 text-primary-content">
		<p>Container aligned to the left (not centered)</p>
	</div>
</Story>

<!-- Combined Examples -->
<Story name="Large Container with XL Padding" args={{ maxWidth: '3xl', padding: 'xl' }}>
	<div class="rounded bg-base-200 p-4">
		<h3 class="mb-2 text-xl font-bold">Large Container</h3>
		<p>This container has max-width 3xl and extra large padding for spacious content.</p>
	</div>
</Story>

<Story name="Small Container with No Padding" args={{ maxWidth: 'sm', padding: 'none' }}>
	<div class="rounded bg-base-200">
		<p class="p-4">Compact container with no padding</p>
	</div>
</Story>

<Story name="Fluid Centered" args={{ fluid: true, centered: true, padding: 'lg' }}>
	<div class="rounded bg-base-200 p-4">
		<p>Fluid container that's centered with large padding</p>
	</div>
</Story>

<!-- Real-world Example -->
<Story name="Content Example">
	<Container maxWidth="xl" padding="lg">
		<div class="rounded-lg bg-base-200 p-6">
			<h2 class="mb-4 text-3xl font-bold">Welcome to Our Site</h2>
			<p class="mb-4 text-base-content">
				This is an example of how the Container component can be used to wrap page content. It
				provides consistent max-width and padding across your application.
			</p>
		</div>
	</Container>
</Story>
