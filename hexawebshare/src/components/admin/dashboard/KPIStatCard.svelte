<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the KPIStatCard component
	 */
	interface Props {
		/**
		 * Main value to display (e.g., "125,000", "$50K")
		 */
		value: string | number;
		/**
		 * Label/title for the KPI card
		 */
		label: string;
		/**
		 * Optional trend percentage (e.g., 12.5 for +12.5%)
		 */
		trend?: number;
		/**
		 * Trend direction: 'up' for increase, 'down' for decrease
		 * @default 'up'
		 */
		trendDirection?: 'up' | 'down';
		/**
		 * Color variant of the card
		 * @default 'primary'
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the card
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Optional icon name or SVG content
		 */
		icon?: string;
		/**
		 * Optional description text below the value
		 */
		description?: string;
		/**
		 * Whether the card is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the card is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		value,
		label,
		trend,
		trendDirection = 'up',
		variant = 'primary',
		size = 'md',
		icon,
		description,
		loading = false,
		disabled = false,
		ariaLabel,
		class: className = '',
		...props
	}: Props = $props();

	// Card classes with variant colors (static DaisyUI classes)
	let cardClasses = $derived(
		[
			'card',
			'shadow-md',
			variant === 'primary' && 'bg-primary text-primary-content',
			variant === 'secondary' && 'bg-secondary text-secondary-content',
			variant === 'accent' && 'bg-accent text-accent-content',
			variant === 'info' && 'bg-info text-info-content',
			variant === 'success' && 'bg-success text-success-content',
			variant === 'warning' && 'bg-warning text-warning-content',
			variant === 'error' && 'bg-error text-error-content',
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Card body classes with size variants
	let bodyClasses = $derived(
		[
			'card-body',
			size === 'sm' && 'p-4',
			size === 'md' && 'p-6',
			size === 'lg' && 'p-8'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Label size classes
	let labelClasses = $derived(
		[
			'font-medium opacity-70',
			size === 'sm' && 'text-xs',
			size === 'md' && 'text-sm',
			size === 'lg' && 'text-base'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Value size classes
	let valueClasses = $derived(
		[
			'font-bold',
			size === 'sm' && 'text-2xl',
			size === 'md' && 'text-3xl',
			size === 'lg' && 'text-4xl'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Description size classes
	let descriptionClasses = $derived(
		[
			'opacity-70',
			size === 'sm' && 'text-xs',
			size === 'md' && 'text-sm',
			size === 'lg' && 'text-base'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Icon size classes
	let iconSizeClasses = $derived(
		[
			size === 'sm' && 'h-5 w-5',
			size === 'md' && 'h-6 w-6',
			size === 'lg' && 'h-8 w-8'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Icon wrapper classes (size + opacity)
	let iconWrapperClasses = $derived(
		[iconSizeClasses, 'opacity-80'].filter(Boolean).join(' ')
	);

	// Loading container min-height based on size
	let loadingMinHeight = $derived(
		size === 'sm' ? 'min-h-[100px]' : size === 'md' ? 'min-h-[120px]' : 'min-h-[140px]'
	);

	// Loading spinner size based on component size
	let loadingSpinnerSize = $derived(
		size === 'sm' ? 'loading-sm' : size === 'md' ? 'loading-md' : 'loading-lg'
	);

	// Trend text color classes - always show green for up, red for down
	// But use white on matching color backgrounds for visibility
	// Up: green on green variants (success, accent) → white, otherwise green
	// Down: red on red variant (error) → white, otherwise red
	let trendTextClasses = $derived(
		trendDirection === 'up'
			? (variant === 'success' || variant === 'accent')
				? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-bold'
				: 'text-green-700 dark:text-green-400 font-bold'
			: variant === 'error'
				? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-bold'
				: 'text-red-700 dark:text-red-400 font-bold'
	);

	// Trend icon color classes - same logic as text
	let trendIconClasses = $derived(
		trendDirection === 'up'
			? (variant === 'success' || variant === 'accent')
				? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]'
				: 'text-green-700 dark:text-green-400'
			: variant === 'error'
				? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]'
				: 'text-red-700 dark:text-red-400'
	);
</script>

<div
	class={cardClasses}
	role="article"
	aria-label={ariaLabel || label}
	aria-disabled={disabled}
	aria-busy={loading}
	{...props}
>
	<div class={bodyClasses}>
		{#if loading}
			<div class="flex flex-col items-center justify-center {loadingMinHeight} gap-2">
				<span class="loading loading-spinner {loadingSpinnerSize}"></span>
				<p class="text-sm opacity-70">Loading...</p>
			</div>
		{:else}
			<!-- Label with Icon -->
			<div class="flex items-center justify-between mb-2">
				<div class="flex items-center gap-2">
					{#if icon}
						<div class={iconWrapperClasses}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class={iconSizeClasses}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d={icon}
								/>
							</svg>
						</div>
					{/if}
					<h3 class={labelClasses}>{label}</h3>
				</div>
				{#if trend !== undefined}
					<div class="flex items-center gap-1">
						{#if trendDirection === 'up'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 {trendIconClasses}"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 {trendIconClasses}"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 17l5-5m0 0l-5-5m5 5H6"
								/>
							</svg>
						{/if}
						<span class="text-xs font-semibold {trendTextClasses}">
							{trendDirection === 'up' ? '+' : '-'}{trend}%
						</span>
					</div>
				{/if}
			</div>

			<!-- Value -->
			<div class="mb-1">
				<p class={valueClasses}>{value}</p>
			</div>

			<!-- Description -->
			{#if description}
				<div class="mt-1">
					<p class={descriptionClasses}>{description}</p>
				</div>
			{/if}
		{/if}
	</div>
</div>
