<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Container from './Container.svelte';

	interface Props {
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
		fluid?: boolean;
		responsive?: boolean;
		className?: string;
		content?: string;
		nested?: boolean;
	}

	const {
		maxWidth = 'lg',
		padding = 'md',
		centered = true,
		fluid = false,
		responsive = true,
		className = '',
		content = 'This is a container component',
		nested = false
	}: Props = $props();
</script>

<div class="min-h-screen bg-base-300 py-8">
	<Container {maxWidth} {padding} {centered} {fluid} {responsive} {className}>
		<div class="rounded-lg bg-base-100 p-6 shadow">
			<h3 class="mb-2 text-xl font-bold">Container Content</h3>
			<p class="mb-4 text-base-content/70">{content}</p>

			{#if nested}
				<Container maxWidth="md" padding="md" centered={true}>
					<div class="rounded bg-base-200 p-4">
						<h4 class="mb-2 text-lg font-semibold">Nested Container</h4>
						<p class="text-sm text-base-content/60">
							This is a nested container inside the outer container.
						</p>
					</div>
				</Container>
			{/if}

			<div class="mt-4 flex gap-2">
				<button class="btn btn-primary btn-sm">Action</button>
				<button class="btn btn-secondary btn-sm">Secondary</button>
			</div>
		</div>
	</Container>
</div>
