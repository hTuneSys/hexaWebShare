<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the CardSection component
	 * A card section groups related content within a card layout
	 */
	interface Props {
		/**
		 * Section title/heading
		 */
		title?: string;
		/**
		 * Section description text
		 */
		description?: string;
		/**
		 * Visual variant of the section
		 * @default 'default'
		 */
		variant?: 'default' | 'bordered' | 'filled' | 'ghost';
		/**
		 * Padding size for the section
		 * @default 'md'
		 */
		padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Whether the section is collapsible
		 * @default false
		 */
		collapsible?: boolean;
		/**
		 * Whether the section is initially collapsed (only applies if collapsible)
		 * @default false
		 */
		collapsed?: boolean;
		/**
		 * Whether the section is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the section is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether to show a divider at the bottom
		 * @default false
		 */
		divider?: boolean;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Icon snippet to display before the title
		 */
		icon?: Snippet;
		/**
		 * Header actions snippet (buttons, links, etc.)
		 */
		headerActions?: Snippet;
		/**
		 * Main content snippet
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		title,
		description,
		variant = 'default',
		padding = 'md',
		collapsible = false,
		collapsed = false,
		disabled = false,
		loading = false,
		divider = false,
		ariaLabel,
		icon,
		headerActions,
		children,
		class: className = '',
		...props
	}: Props = $props();

	// Internal collapsed state for collapsible sections
	let isCollapsed = $state(collapsed);

	// Toggle collapsed state
	function toggleCollapsed() {
		if (collapsible && !disabled) {
			isCollapsed = !isCollapsed;
		}
	}

	// Handle keyboard navigation for collapsible sections
	function handleKeyDown(event: KeyboardEvent) {
		if (collapsible && !disabled && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault();
			toggleCollapsed();
		}
	}

	// Section container classes using static DaisyUI/Tailwind classes
	let sectionClasses = $derived(
		[
			'card-section',
			variant === 'bordered' && 'border border-base-300 rounded-lg',
			variant === 'filled' && 'bg-base-200 rounded-lg',
			variant === 'ghost' && 'bg-transparent',
			divider && 'border-b border-base-300',
			disabled && 'opacity-50 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Padding classes based on padding prop
	let paddingClasses = $derived(
		[
			padding === 'none' && '',
			padding === 'xs' && 'p-2',
			padding === 'sm' && 'p-3',
			padding === 'md' && 'p-4',
			padding === 'lg' && 'p-6',
			padding === 'xl' && 'p-8'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Header classes
	let headerClasses = $derived(
		[
			'card-section-header',
			'flex items-start justify-between gap-4',
			(title || description || icon || headerActions) && 'mb-3',
			collapsible && !disabled && 'cursor-pointer select-none'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Content wrapper classes
	let contentClasses = $derived(
		['card-section-content', collapsible && isCollapsed && 'hidden'].filter(Boolean).join(' ')
	);

	// Chevron rotation for collapsible
	let chevronClasses = $derived(
		[
			'transition-transform duration-200',
			'w-5 h-5 text-base-content/60',
			!isCollapsed && 'rotate-180'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<section class="{sectionClasses} {paddingClasses}" aria-label={ariaLabel || title} {...props}>
	{#if title || description || icon || headerActions || collapsible}
		{#if collapsible}
			<button
				type="button"
				class="{headerClasses} w-full border-0 bg-transparent text-left"
				onclick={toggleCollapsed}
				aria-expanded={!isCollapsed}
				{disabled}
			>
				<div class="flex flex-1 items-start gap-3">
					{#if icon}
						<div class="card-section-icon flex-shrink-0" aria-hidden="true">
							{@render icon()}
						</div>
					{/if}

					<div class="flex-1">
						{#if title}
							<span class="card-section-title block text-base font-semibold text-base-content">
								{title}
							</span>
						{/if}
						{#if description}
							<span class="card-section-description mt-1 block text-sm text-base-content/70">
								{description}
							</span>
						{/if}
					</div>
				</div>

				<div class="flex flex-shrink-0 items-center gap-2">
					<svg
						class={chevronClasses}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</button>
		{:else}
			<div class={headerClasses}>
				<div class="flex flex-1 items-start gap-3">
					{#if icon}
						<div class="card-section-icon flex-shrink-0" aria-hidden="true">
							{@render icon()}
						</div>
					{/if}

					<div class="flex-1">
						{#if title}
							<h3 class="card-section-title text-base font-semibold text-base-content">
								{title}
							</h3>
						{/if}
						{#if description}
							<p class="card-section-description mt-1 text-sm text-base-content/70">
								{description}
							</p>
						{/if}
					</div>
				</div>

				<div class="flex flex-shrink-0 items-center gap-2">
					{#if headerActions}
						<div class="card-section-actions">
							{@render headerActions()}
						</div>
					{/if}
				</div>
			</div>
		{/if}
	{/if}

	<div class={contentClasses}>
		{#if loading}
			<div class="flex items-center justify-center py-8" aria-label="Loading content">
				<span class="loading loading-spinner loading-md"></span>
			</div>
		{:else if children}
			{@render children()}
		{/if}
	</div>
</section>
