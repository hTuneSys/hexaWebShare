<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	interface Props {
		title?: string;
		subtitle?: string;
		variant?: 'default' | 'bordered' | 'compact';
		padding?: 'none' | 'sm' | 'md' | 'lg';
		divider?: boolean;
		class?: string;
	}

	const {
		title,
		subtitle,
		variant = 'default',
		padding = 'md',
		divider = false,
		class: className = '',
		...restProps
	}: Props = $props();

	let sectionClasses = $derived(
		[
			'card-body',
			variant === 'bordered' && 'border-t',
			variant === 'compact' && 'p-2',
			padding === 'none' && 'p-0',
			padding === 'sm' && 'p-4',
			padding === 'md' && 'p-6',
			padding === 'lg' && 'p-8',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={sectionClasses} {...restProps}>
	{#if divider && title}
		<div class="divider divider-start my-2">
			{#if title}
				<h3 class="text-lg font-semibold">{title}</h3>
			{/if}
		</div>
	{:else if title || subtitle}
		<div class="mb-4">
			{#if title}
				<h3 class="card-title">{title}</h3>
			{/if}
			{#if subtitle}
				<p class="text-sm opacity-70 mt-1">{subtitle}</p>
			{/if}
		</div>
	{/if}

	{#if divider && !title}
		<div class="divider my-2"></div>
	{/if}

	<slot />
</div>
