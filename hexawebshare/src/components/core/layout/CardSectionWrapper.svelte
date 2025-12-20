<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import CardSection from './CardSection.svelte';

	interface Props {
		title?: string;
		description?: string;
		variant?: 'default' | 'bordered' | 'filled' | 'ghost';
		padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		collapsible?: boolean;
		collapsed?: boolean;
		disabled?: boolean;
		loading?: boolean;
		divider?: boolean;
		ariaLabel?: string;
		content?: string;
		showIcon?: boolean;
		showHeaderActions?: boolean;
		class?: string;
	}

	const {
		title = 'Section Title',
		description,
		variant = 'default',
		padding = 'md',
		collapsible = false,
		collapsed = false,
		disabled = false,
		loading = false,
		divider = false,
		ariaLabel,
		content = 'This is the card section content. It can contain any type of content including text, forms, or other components.',
		showIcon = false,
		showHeaderActions = false,
		class: className = ''
	}: Props = $props();
</script>

<div class="bg-base-300 min-h-[200px] p-6">
	<div class="card bg-base-100 mx-auto max-w-2xl shadow-xl">
		<div class="card-body p-0">
			{#if showIcon && showHeaderActions}
				<CardSection
					{title}
					{description}
					{variant}
					{padding}
					{collapsible}
					{collapsed}
					{disabled}
					{loading}
					{divider}
					{ariaLabel}
					class={className}
				>
					{#snippet icon()}
						<svg class="text-primary h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					{/snippet}
					{#snippet headerActions()}
						<button class="btn btn-primary btn-sm">Action</button>
					{/snippet}
					<p class="text-base-content/70">{content}</p>
				</CardSection>
			{:else if showIcon}
				<CardSection
					{title}
					{description}
					{variant}
					{padding}
					{collapsible}
					{collapsed}
					{disabled}
					{loading}
					{divider}
					{ariaLabel}
					class={className}
				>
					{#snippet icon()}
						<svg class="text-primary h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					{/snippet}
					<p class="text-base-content/70">{content}</p>
				</CardSection>
			{:else if showHeaderActions}
				<CardSection
					{title}
					{description}
					{variant}
					{padding}
					{collapsible}
					{collapsed}
					{disabled}
					{loading}
					{divider}
					{ariaLabel}
					class={className}
				>
					{#snippet headerActions()}
						<button class="btn btn-primary btn-sm">Action</button>
					{/snippet}
					<p class="text-base-content/70">{content}</p>
				</CardSection>
			{:else}
				<CardSection
					{title}
					{description}
					{variant}
					{padding}
					{collapsible}
					{collapsed}
					{disabled}
					{loading}
					{divider}
					{ariaLabel}
					class={className}
				>
					<p class="text-base-content/70">{content}</p>
				</CardSection>
			{/if}
		</div>
	</div>
</div>
