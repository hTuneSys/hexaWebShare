<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the ChartBar component
	 */
	interface Props {
		/**
		 * Data array - each item represents a bar in the chart
		 */
		data: Array<{ label: string; value: number }>;
		/**
		 * Chart orientation
		 * @default 'vertical'
		 */
		orientation?: 'horizontal' | 'vertical';
		/**
		 * Color variant of the bars
		 * @default 'primary'
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
		/**
		 * Chart height (for vertical) or width (for horizontal)
		 * @default '300px'
		 */
		height?: string;
		/**
		 * Spacing between bars in pixels
		 * @default 4
		 */
		barSpacing?: number;
		/**
		 * Maximum value for scaling (auto-calculated if not provided)
		 */
		maxValue?: number;
		/**
		 * Show labels on bars
		 * @default true
		 */
		showLabels?: boolean;
		/**
		 * Show values on bars
		 * @default true
		 */
		showValues?: boolean;
		/**
		 * Whether the chart is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the chart is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * ID of element that labels this chart
		 */
		ariaLabelledBy?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		data,
		orientation = 'vertical',
		variant = 'primary',
		height = '300px',
		barSpacing = 4,
		maxValue,
		showLabels = true,
		showValues = true,
		loading = false,
		disabled = false,
		ariaLabel,
		ariaLabelledBy,
		class: className = '',
		...props
	}: Props = $props();

	// Container classes using static DaisyUI classes
	let containerClasses = $derived(
		[
			'chart-bar-container',
			'w-full',
			orientation === 'vertical' && 'flex flex-col',
			orientation === 'horizontal' && 'flex flex-row',
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Wrapper classes for chart area
	let wrapperClasses = $derived(
		[
			'chart-bar-wrapper',
			'relative',
			orientation === 'vertical' && 'flex flex-row items-end gap-1',
			orientation === 'horizontal' && 'flex flex-col items-start gap-1',
			'w-full'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Bar color classes using static DaisyUI classes
	let barColorClasses = $derived(
		[
			variant === 'primary' && 'bg-primary',
			variant === 'secondary' && 'bg-secondary',
			variant === 'accent' && 'bg-accent',
			variant === 'success' && 'bg-success',
			variant === 'warning' && 'bg-warning',
			variant === 'error' && 'bg-error',
			variant === 'info' && 'bg-info'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Calculate maximum value for scaling
	let calculatedMaxValue = $derived(
		maxValue !== undefined
			? maxValue
			: data && data.length > 0
				? Math.max(...data.map((item) => item.value), 0)
				: 100
	);

	// Process data with normalized percentages
	// Minimum percentage to ensure bars are visible (at least 2% of chart height)
	let processedData = $derived(
		data && data.length > 0
			? data.map((item) => {
					const rawPercentage = calculatedMaxValue > 0 ? (item.value / calculatedMaxValue) * 100 : 0;
					// Ensure minimum 2% height for visibility, but only if value > 0
					const minPercentage = 2;
					const percentage = item.value > 0 && rawPercentage < minPercentage ? minPercentage : rawPercentage;
					return {
						label: item.label,
						value: item.value,
						percentage
					};
				})
			: []
	);

	// Calculate bar width/height based on data length and spacing
	let barSize = $derived(
		data && data.length > 0
			? orientation === 'vertical'
				? `calc((100% - ${(data.length - 1) * barSpacing}px) / ${data.length})`
				: `calc((100% - ${(data.length - 1) * barSpacing}px) / ${data.length})`
			: '0px'
	);

	// Generate accessible description for screen readers
	let accessibleDescription = $derived(
		data && data.length > 0
			? `Bar chart with ${data.length} ${data.length === 1 ? 'bar' : 'bars'}. ` +
				data
					.map((item, index) => `${item.label}: ${item.value}`)
					.join('. ') +
				`. Maximum value: ${calculatedMaxValue}.`
			: 'No data available in chart.'
	);

	// Generate default aria-label if not provided
	let defaultAriaLabel = $derived(
		ariaLabel || `Bar chart showing ${data?.length || 0} data points`
	);
</script>

<div
	class={containerClasses}
	role="group"
	aria-label={defaultAriaLabel}
	aria-labelledby={ariaLabelledBy}
	aria-busy={loading}
	aria-disabled={disabled}
	aria-describedby="chart-description"
	tabindex={disabled ? '-1' : '0'}
	{...props}
>
	<!-- Hidden description for screen readers -->
	<div id="chart-description" class="sr-only">
		{accessibleDescription}
	</div>
	{#if loading}
		<div class="flex items-center justify-center" style="height: {height};">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else if data && data.length > 0}
		<div class={wrapperClasses} style={orientation === 'vertical' ? `height: ${height};` : `width: ${height};`}>
			{#each processedData as item, index}
				<div
					class="bar-item flex {orientation === 'vertical' ? 'flex-col items-center' : 'flex-row items-center'} focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary rounded"
					style="
						{orientation === 'vertical' 
							? `width: ${barSize}; margin-right: ${index < processedData.length - 1 ? barSpacing : 0}px;` 
							: `height: ${barSize}; margin-bottom: ${index < processedData.length - 1 ? barSpacing : 0}px;`}
					"
					role="group"
					aria-label="{item.label}: {item.value} ({item.percentage.toFixed(1)}% of maximum)"
					tabindex="0"
				>
					{#if orientation === 'vertical'}
						<!-- Vertical bars -->
						<div
							class="bar {barColorClasses} rounded-t transition-all duration-300 hover:opacity-80 relative focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
							style="height: {item.percentage}%; width: 100%; min-height: {item.value > 0 ? '8px' : '0'};"
							role="img"
							aria-hidden="true"
							tabindex="-1"
						>
							{#if showValues && item.value > 0}
								<div
									class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-base-content whitespace-nowrap"
									aria-label="Value: {item.value}"
								>
									{item.value}
								</div>
							{/if}
						</div>
						{#if showLabels}
							<div
								class="mt-2 text-xs text-base-content text-center truncate w-full"
								title={item.label}
								aria-label="Label: {item.label}"
							>
								{item.label}
							</div>
						{/if}
					{:else}
						<!-- Horizontal bars -->
						{#if showLabels}
							<div
								class="mr-2 text-xs text-base-content text-right min-w-[80px] truncate"
								title={item.label}
								aria-label="Label: {item.label}"
							>
								{item.label}
							</div>
						{/if}
						<div
							class="bar {barColorClasses} rounded-l transition-all duration-300 hover:opacity-80 relative flex-1 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
							style="width: {item.percentage}%; height: 100%; min-width: {item.value > 0 ? '8px' : '0'};"
							role="img"
							aria-hidden="true"
							tabindex="-1"
						>
							{#if showValues && item.value > 0}
								<div
									class="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 text-xs text-base-content whitespace-nowrap"
									aria-label="Value: {item.value}"
								>
									{item.value}
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div
			class="flex items-center justify-center text-base-content/50"
			style="height: {height};"
			role="status"
			aria-live="polite"
			aria-label="No data available in chart"
		>
			<p>No data available</p>
		</div>
	{/if}
</div>
