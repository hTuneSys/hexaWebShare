<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Heading from '../../core/typography/Heading.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Divider from '../../core/layout/Divider.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';
	import Icon from '../../core/media/Icon.svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	/**
	 * Props interface for the FormSection component
	 * A form section groups related form fields with a title and optional description
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
		 * Whether to show a divider after the section
		 * @default false
		 */
		divider?: boolean;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Accessible label for loading state
		 * @default 'Loading form section'
		 */
		loadingLabel?: string;
		/**
		 * Header actions snippet (buttons, links, etc.)
		 */
		headerActions?: Snippet;
		/**
		 * Main content snippet (form fields)
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
		loadingLabel = 'Loading form section',
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
			'form-section',
			variant === 'bordered' && 'border border-base-300 rounded-lg',
			variant === 'filled' && 'bg-base-200 rounded-lg',
			variant === 'ghost' && 'bg-transparent',
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
			'form-section-header',
			'flex items-start justify-between gap-4',
			(title || description || headerActions) && 'mb-4',
			collapsible && !disabled && 'cursor-pointer select-none'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Content wrapper classes
	let contentClasses = $derived(
		['form-section-content', collapsible && isCollapsed && 'hidden'].filter(Boolean).join(' ')
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
	{#if title || description || headerActions || collapsible}
		{#if collapsible}
			<!-- 
				NOTE: Raw HTML <button> is intentional here instead of Button component.
				TECHNICAL REASON: Collapsible form section pattern requires a full-width, transparent,
				text-left button that acts as a clickable header with aria-expanded state.
				The button must have no visual button styling (no borders, backgrounds, or padding from .btn).
				CONSEQUENCE: Using Button component would add .btn classes that conflict with the header layout.
				VALIDATION: WAI-ARIA accordion pattern and collapsible section best practices.
			-->
			<button
				type="button"
				class="{headerClasses} w-full border-0 bg-transparent text-left"
				onclick={toggleCollapsed}
				onkeydown={handleKeyDown}
				aria-expanded={!isCollapsed}
				{disabled}
			>
				<div class="flex flex-1 items-start gap-3">
					<div class="flex-1">
						{#if title}
							<Heading level="h3" size="sm" weight="semibold" class="mb-1">
								{title}
							</Heading>
						{/if}
						{#if description}
							<Text size="sm" variant="muted" class="mt-1">
								{description}
							</Text>
						{/if}
					</div>
				</div>

				<div class="flex flex-shrink-0 items-center gap-2">
					{#if headerActions}
						<div class="form-section-actions">
							{@render headerActions()}
						</div>
					{/if}
					<Icon size="sm" class={chevronClasses} ariaHidden={true}>
						<ChevronDown />
					</Icon>
				</div>
			</button>
		{:else}
			<div class={headerClasses}>
				<div class="flex flex-1 items-start gap-3">
					<div class="flex-1">
						{#if title}
							<Heading level="h3" size="sm" weight="semibold" class="mb-1">
								{title}
							</Heading>
						{/if}
						{#if description}
							<Text size="sm" variant="muted" class="mt-1">
								{description}
							</Text>
						{/if}
					</div>
				</div>

				<div class="flex flex-shrink-0 items-center gap-2">
					{#if headerActions}
						<div class="form-section-actions">
							{@render headerActions()}
						</div>
					{/if}
				</div>
			</div>
		{/if}
	{/if}

	<div class={contentClasses}>
		{#if loading}
			<div class="flex items-center justify-center py-8" role="status" aria-label={loadingLabel}>
				<Spinner size="md" />
			</div>
		{:else if children}
			{@render children()}
		{/if}
	</div>

	{#if divider}
		<Divider class="mt-4" />
	{/if}
</section>
