<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the Section component
	 * A general-purpose semantic section element for grouping related content
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
		padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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
		 * ARIA role for the section
		 * @default 'region'
		 */
		role?: string;
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
		role = 'region',
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
			'section',
			variant === 'bordered' && 'border border-base-300 rounded-lg',
			variant === 'filled' && 'bg-base-200 rounded-lg',
			variant === 'ghost' && 'bg-transparent',
			variant === 'default' && 'bg-base-100',
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
			padding === 'xs' && 'px-2 py-1',
			padding === 'sm' && 'px-4 py-2',
			padding === 'md' && 'px-6 py-4',
			padding === 'lg' && 'px-8 py-6',
			padding === 'xl' && 'px-10 py-8',
			padding === '2xl' && 'px-12 py-10'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Header classes
	let headerClasses = $derived(
		[
			'section-header',
			'flex items-start justify-between gap-4',
			(title || description || icon || headerActions) && 'mb-4',
			collapsible && !disabled && 'cursor-pointer select-none'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Content wrapper classes
	let contentClasses = $derived(
		['section-content', collapsible && isCollapsed && 'hidden'].filter(Boolean).join(' ')
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

<section
	class="{sectionClasses} {paddingClasses}"
	{role}
	aria-label={ariaLabel || title}
	{...props}
>
	{#if title || description || icon || headerActions || collapsible}
		{#if collapsible}
			<button
				type="button"
				class="{headerClasses} w-full border-0 bg-transparent p-0 text-left"
				onclick={toggleCollapsed}
				onkeydown={handleKeyDown}
				aria-expanded={!isCollapsed}
				{disabled}
			>
				<div class="flex flex-1 items-start gap-3">
					{#if icon}
						<div class="section-icon flex-shrink-0" aria-hidden="true">
							{@render icon()}
						</div>
					{/if}

					<div class="flex-1">
						{#if title}
							<span class="section-title text-base-content block text-lg font-semibold">
								{title}
							</span>
						{/if}
						{#if description}
							<span class="section-description text-base-content/70 mt-1 block text-sm">
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
						<div class="section-icon flex-shrink-0" aria-hidden="true">
							{@render icon()}
						</div>
					{/if}

					<div class="flex-1">
						{#if title}
							<h2 class="section-title text-base-content text-lg font-semibold">
								{title}
							</h2>
						{/if}
						{#if description}
							<p class="section-description text-base-content/70 mt-1 text-sm">
								{description}
							</p>
						{/if}
					</div>
				</div>

				<div class="flex flex-shrink-0 items-center gap-2">
					{#if headerActions}
						<div class="section-actions">
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
