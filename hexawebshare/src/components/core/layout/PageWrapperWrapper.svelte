<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import PageWrapper from './PageWrapper.svelte';

	interface Props {
		variant?: 'default' | 'bordered' | 'filled' | 'ghost';
		maxWidth?:
			| 'xs'
			| 'sm'
			| 'md'
			| 'lg'
			| 'xl'
			| '2xl'
			| '3xl'
			| '4xl'
			| '5xl'
			| '6xl'
			| '7xl'
			| 'full'
			| 'none';
		padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
		centered?: boolean;
		loading?: boolean;
		disabled?: boolean;
		background?: boolean;
		minHeight?: 'none' | 'screen' | 'auto';
		showHeader?: boolean;
		showFooter?: boolean;
	}

	const {
		variant = 'default',
		maxWidth = 'full',
		padding = 'md',
		centered = false,
		loading = false,
		disabled = false,
		background = true,
		minHeight = 'screen',
		showHeader = true,
		showFooter = true
	}: Props = $props();
</script>

<PageWrapper
	{variant}
	{maxWidth}
	{padding}
	{centered}
	{loading}
	{disabled}
	{background}
	{minHeight}
>
	{#snippet header()}
		{#if showHeader}
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold">Page Title</h1>
					<p class="mt-2 text-base-content/70">This is a page header with title and description.</p>
				</div>
				<div class="flex gap-2">
					<button class="btn btn-primary btn-sm">Action</button>
					<button class="btn btn-ghost btn-sm">Secondary</button>
				</div>
			</div>
		{/if}
	{/snippet}

	{#snippet children()}
		<div class="space-y-6">
			<div class="card bg-base-200 shadow-sm">
				<div class="card-body">
					<h2 class="card-title">Content Section 1</h2>
					<p>
						This is the main content area of the page. You can add any content here including cards,
						forms, tables, and other components.
					</p>
				</div>
			</div>

			<div class="card bg-base-200 shadow-sm">
				<div class="card-body">
					<h2 class="card-title">Content Section 2</h2>
					<p>
						The PageWrapper component provides consistent layout structure with header, content, and
						footer sections.
					</p>
				</div>
			</div>
		</div>
	{/snippet}

	{#snippet footer()}
		{#if showFooter}
			<div class="flex items-center justify-between text-sm text-base-content/60">
				<p>© 2025 hexaTune LLC. All rights reserved.</p>
				<div class="flex gap-4">
					<a href="#" class="link-hover link">Privacy</a>
					<a href="#" class="link-hover link">Terms</a>
					<a href="#" class="link-hover link">Contact</a>
				</div>
			</div>
		{/if}
	{/snippet}
</PageWrapper>
