<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PageWrapper from './PageWrapper.svelte';
	import PageWrapperWrapper from './PageWrapperWrapper.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/PageWrapper',
		component: PageWrapperWrapper,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'filled', 'ghost']
			},
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
			loading: { control: 'boolean' },
			disabled: { control: 'boolean' },
			background: { control: 'boolean' },
			minHeight: {
				control: { type: 'select' },
				options: ['none', 'screen', 'auto']
			},
			showHeader: { control: 'boolean' },
			showFooter: { control: 'boolean' }
		},
		args: {
			variant: 'default',
			maxWidth: 'full',
			padding: 'md',
			centered: false,
			loading: false,
			disabled: false,
			background: true,
			minHeight: 'screen',
			showHeader: true,
			showFooter: true
		}
	});
</script>

<!-- Default Story with Controls -->
<Story
	name="Default"
	args={{
		variant: 'default',
		maxWidth: 'full',
		padding: 'md',
		centered: false,
		loading: false,
		disabled: false,
		background: true,
		minHeight: 'screen',
		showHeader: true,
		showFooter: true
	}}
/>

<!-- Basic PageWrapper -->
<Story name="Basic">
	<PageWrapper>
		{#snippet children()}
			<div class="space-y-4">
				<h1 class="text-3xl font-bold">Page Title</h1>
				<p>This is a basic page wrapper with just content.</p>
			</div>
		{/snippet}
	</PageWrapper>
</Story>

<!-- With Header -->
<Story name="With Header">
	<PageWrapper>
		{#snippet header()}
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold">Page Title</h1>
					<p class="text-base-content/70 mt-2">This page has a header section.</p>
				</div>
				<button class="btn btn-primary btn-sm">Action</button>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4">
				<p>This is the main content area.</p>
			</div>
		{/snippet}
	</PageWrapper>
</Story>

<!-- Complete Page -->
<Story name="Complete Page">
	<PageWrapper>
		{#snippet header()}
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold">Complete Page</h1>
					<p class="text-base-content/70 mt-2">This page includes header, content, and footer.</p>
				</div>
				<div class="flex gap-2">
					<button class="btn btn-primary btn-sm">Save</button>
					<button class="btn btn-ghost btn-sm">Cancel</button>
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-6">
				<div class="card bg-base-200 shadow-sm">
					<div class="card-body">
						<h2 class="card-title">Content Section</h2>
						<p>This is the main content area with multiple sections.</p>
					</div>
				</div>
			</div>
		{/snippet}

		{#snippet footer()}
			<div class="text-base-content/60 flex items-center justify-between text-sm">
				<p>© 2025 hexaTune LLC</p>
				<div class="flex gap-4">
					<a href="#" class="link-hover link">Privacy</a>
					<a href="#" class="link-hover link">Terms</a>
				</div>
			</div>
		{/snippet}
	</PageWrapper>
</Story>

<!-- Variants -->
<Story name="Variants">
	<PageWrapper variant="bordered">
		{#snippet children()}
			<div class="space-y-4">
				<h1 class="text-3xl font-bold">Bordered Variant</h1>
				<p>This page wrapper has a border around it.</p>
			</div>
		{/snippet}
	</PageWrapper>
</Story>

<!-- Max Width Constrained -->
<Story name="Constrained Width">
	<PageWrapper maxWidth="lg" centered={true}>
		{#snippet children()}
			<div class="space-y-4">
				<h1 class="text-3xl font-bold">Constrained Width</h1>
				<p>This page content is constrained to a maximum width and centered.</p>
			</div>
		{/snippet}
	</PageWrapper>
</Story>

<!-- Padding Variants -->
<Story name="No Padding">
	<PageWrapper padding="none">
		{#snippet children()}
			<div class="p-6">
				<h1 class="text-3xl font-bold">No Padding</h1>
				<p>This page wrapper has no padding. Content padding is handled manually.</p>
			</div>
		{/snippet}
	</PageWrapper>
</Story>

<!-- Large Padding -->
<Story name="Large Padding">
	<PageWrapper padding="xl">
		{#snippet children()}
			<div class="space-y-4">
				<h1 class="text-3xl font-bold">Large Padding</h1>
				<p>This page wrapper has extra large padding.</p>
			</div>
		{/snippet}
	</PageWrapper>
</Story>

<!-- States -->
<Story name="Loading State">
	<PageWrapper loading={true}>
		{#snippet children()}
			<div class="space-y-4">
				<h1 class="text-3xl font-bold">Loading</h1>
				<p>This page is in loading state.</p>
			</div>
		{/snippet}
	</PageWrapper>
</Story>

<!-- No Background -->
<Story name="No Background">
	<div class="bg-base-300 p-4">
		<PageWrapper background={false}>
			{#snippet children()}
				<div class="space-y-4">
					<h1 class="text-3xl font-bold">No Background</h1>
					<p>This page wrapper has no background color (transparent).</p>
				</div>
			{/snippet}
		</PageWrapper>
	</div>
</Story>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		variant: 'default',
		maxWidth: 'full',
		padding: 'md',
		centered: false,
		loading: false,
		disabled: false,
		background: true,
		minHeight: 'screen',
		showHeader: true,
		showFooter: true
	}}
/>
