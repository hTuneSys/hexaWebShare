<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the FilterPanel component
	 */
	interface Props {
		/**
		 * Panel title text
		 */
		title?: string;
		/**
		 * Panel content (filter controls)
		 */
		children?: Snippet;
		/**
		 * Optional header actions snippet (buttons, links, etc.)
		 */
		headerActions?: Snippet;
		/**
		 * Color variant of the panel
		 * @default undefined (default panel style)
		 */
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		/**
		 * Add border to the panel
		 * @default true
		 */
		bordered?: boolean;
		/**
		 * Compact panel with reduced padding
		 * @default false
		 */
		compact?: boolean;
		/**
		 * Add shadow to the panel
		 * @default true
		 */
		shadow?: boolean;
		/**
		 * Shadow size
		 * @default 'md'
		 */
		shadowSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
		/**
		 * Whether the panel is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the panel is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Show apply button
		 * @default true
		 */
		showApplyButton?: boolean;
		/**
		 * Show reset button
		 * @default true
		 */
		showResetButton?: boolean;
		/**
		 * Show clear button
		 * @default false
		 */
		showClearButton?: boolean;
		/**
		 * Apply button label
		 * @default 'Apply Filters'
		 */
		applyLabel?: string;
		/**
		 * Reset button label
		 * @default 'Reset'
		 */
		resetLabel?: string;
		/**
		 * Clear button label
		 * @default 'Clear All'
		 */
		clearLabel?: string;
		/**
		 * Error message to display
		 */
		error?: string;
		/**
		 * Helper text or description
		 */
		helpText?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * ARIA role for the panel
		 * @default 'region'
		 */
		role?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Apply event handler
		 */
		onapply?: () => void;
		/**
		 * Reset event handler
		 */
		onreset?: () => void;
		/**
		 * Clear event handler
		 */
		onclear?: () => void;
	}

	const {
		title,
		children,
		headerActions,
		variant,
		bordered = true,
		compact = false,
		shadow = true,
		shadowSize = 'md',
		loading = false,
		disabled = false,
		showApplyButton = true,
		showResetButton = true,
		showClearButton = false,
		applyLabel = 'Apply Filters',
		resetLabel = 'Reset',
		clearLabel = 'Clear All',
		error,
		helpText,
		ariaLabel,
		role = 'region',
		class: className = '',
		onapply,
		onreset,
		onclear,
		...props
	}: Props = $props();

	// Panel classes using static DaisyUI classes
	let panelClasses = $derived(
		[
			'card',
			variant === 'primary' && 'bg-primary text-primary-content',
			variant === 'secondary' && 'bg-secondary text-secondary-content',
			variant === 'accent' && 'bg-accent text-accent-content',
			variant === 'neutral' && 'bg-neutral text-neutral-content',
			variant === 'info' && 'bg-info text-info-content',
			variant === 'success' && 'bg-success text-success-content',
			variant === 'warning' && 'bg-warning text-warning-content',
			variant === 'error' && 'bg-error text-error-content',
			!variant && 'bg-base-100',
			bordered && 'card-bordered',
			compact && 'card-compact',
			shadow && shadowSize === 'sm' && 'shadow-sm',
			shadow && shadowSize === 'md' && 'shadow-md',
			shadow && shadowSize === 'lg' && 'shadow-lg',
			shadow && shadowSize === 'xl' && 'shadow-xl',
			shadow && shadowSize === '2xl' && 'shadow-2xl',
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Card body classes
	let bodyClasses = $derived(['card-body', compact && 'p-4'].filter(Boolean).join(' '));

	// Button classes
	let applyButtonClasses = $derived(
		[
			'btn',
			variant === 'primary' && 'btn-primary',
			variant === 'secondary' && 'btn-secondary',
			variant === 'accent' && 'btn-accent',
			variant === 'info' && 'btn-info',
			variant === 'success' && 'btn-success',
			variant === 'warning' && 'btn-warning',
			variant === 'error' && 'btn-error',
			!variant && 'btn-primary'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Handle apply action
	function handleApply() {
		if (!disabled && !loading && onapply) {
			onapply();
		}
	}

	// Handle reset action
	function handleReset() {
		if (!disabled && !loading && onreset) {
			onreset();
		}
	}

	// Handle clear action
	function handleClear() {
		if (!disabled && !loading && onclear) {
			onclear();
		}
	}
</script>

<div
	class={panelClasses}
	{role}
	aria-label={ariaLabel || title || 'Filter Panel'}
	aria-disabled={disabled}
	aria-busy={loading}
	{...props}
>
	{#if loading}
		<div class="card-body min-h-64 items-center justify-center">
			<span class="loading loading-spinner loading-lg"></span>
			<p class="mt-4 text-sm opacity-70">Loading filters...</p>
		</div>
	{:else}
		<div class={bodyClasses}>
			<!-- Header -->
			{#if title || headerActions}
				<div class="mb-4 flex items-center justify-between">
					{#if title}
						<h2 class="text-xl font-bold">{title}</h2>
					{/if}
					{#if headerActions}
						<div class="flex items-center gap-2">
							{@render headerActions()}
						</div>
					{/if}
				</div>
			{/if}

			<!-- Filter Content -->
			{#if children}
				<div class="space-y-4">
					{@render children()}
				</div>
			{/if}

			<!-- Error Message -->
			{#if error && error !== ''}
				<div class="alert alert-error mt-4" role="alert" aria-live="polite">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{error}</span>
				</div>
			{/if}

			<!-- Helper Text -->
			{#if helpText && (!error || error === '')}
				<div class="text-base-content/70 mt-4 text-sm">
					{helpText}
				</div>
			{/if}

			<!-- Action Buttons -->
			{#if showApplyButton || showResetButton || showClearButton}
				<div class="border-base-300 mt-6 flex items-center gap-2 border-t pt-4">
					{#if showApplyButton}
						<button
							type="button"
							class={applyButtonClasses}
							{disabled}
							onclick={handleApply}
							aria-label="Apply filters"
						>
							{applyLabel}
						</button>
					{/if}
					{#if showResetButton}
						<button
							type="button"
							class="btn btn-outline"
							{disabled}
							onclick={handleReset}
							aria-label="Reset filters"
						>
							{resetLabel}
						</button>
					{/if}
					{#if showClearButton}
						<button
							type="button"
							class="btn btn-ghost"
							{disabled}
							onclick={handleClear}
							aria-label="Clear all filters"
						>
							{clearLabel}
						</button>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>
