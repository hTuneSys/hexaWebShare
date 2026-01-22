<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import EmptyState from '../../core/data-display/EmptyState.svelte';
	import Loader from '../../core/feedback/Loader.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Badge from '../../core/media/Badge.svelte';

	/**
	 * Data point interface for pie chart slices
	 */
	export interface ChartPieDataPoint {
		label: string;
		value: number;
	}

	/**
	 * DaisyUI color variant for slices
	 */
	export type ChartPieVariant =
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'success'
		| 'warning'
		| 'error'
		| 'info';

	/**
	 * Props interface for the ChartPie component
	 */
	interface Props {
		/**
		 * Data array - each item represents a slice in the pie chart
		 */
		data: ChartPieDataPoint[];
		/**
		 * Color variants for slices (cyclic: slice i uses colorScheme[i % length])
		 * @default ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info']
		 */
		colorScheme?: ChartPieVariant[];
		/**
		 * Render as donut (hole in center) when true
		 * @default false
		 */
		donut?: boolean;
		/**
		 * Chart size
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Show slice labels
		 * @default true
		 */
		showLabels?: boolean;
		/**
		 * Show only percentage on slices, hide category labels
		 * When true, only percentage is shown on slices, not the category name
		 * @default true
		 */
		showOnlyPercentage?: boolean;
		/**
		 * Show values on slices or in legend
		 * @default true
		 */
		showValues?: boolean;
		/**
		 * Show legend below chart
		 * @default true
		 */
		showLegend?: boolean;
		/**
		 * Hide category labels in legend, show only color and value
		 * @default false
		 */
		hideLegendLabels?: boolean;
		/**
		 * Use colored badges in legend that match slice colors.
		 * When false, all badges use neutral (black) color.
		 * @default true
		 */
		useColoredBadges?: boolean;
		/**
		 * Hide legend items for slices that have labels displayed on the chart.
		 * When true, slices with visible labels (percentage >= labelMinPercentage) are excluded from legend.
		 * Only small slices without labels will be shown in legend.
		 * When false, all slices are shown in legend regardless of label visibility.
		 * @default false
		 */
		hideLabeledFromLegend?: boolean;
		/**
		 * Minimum slice percentage to show label on chart (avoids overlap on small adjacent slices).
		 * Smaller slices are still in legend and tooltip.
		 * @default 15
		 */
		labelMinPercentage?: number;
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
		 * Whether the chart is in error state (e.g. failed to load data)
		 * @default false
		 */
		error?: boolean;
		/**
		 * Title for empty state when no data
		 * @default 'No data available'
		 */
		emptyTitle?: string;
		/**
		 * Description for empty state when no data
		 * @default 'There is no data to display in this chart.'
		 */
		emptyDescription?: string;
		/**
		 * Accessible label for loading spinner
		 * @default 'Loading chart data'
		 */
		loadingAriaLabel?: string;
		/**
		 * Title for error state
		 * @default 'Unable to load chart'
		 */
		errorTitle?: string;
		/**
		 * Description for error state
		 * @default 'Something went wrong while loading the chart data.'
		 */
		errorDescription?: string;
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

	const DEFAULT_COLOR_SCHEME: ChartPieVariant[] = [
		'primary',
		'secondary',
		'accent',
		'success',
		'warning',
		'error',
		'info'
	];

	const {
		data,
		colorScheme = DEFAULT_COLOR_SCHEME,
		donut = false,
		size = 'md',
		showLabels = true,
		showValues = true,
		showOnlyPercentage = true,
		showLegend = true,
		hideLegendLabels = false,
		useColoredBadges = true,
		hideLabeledFromLegend = false,
		labelMinPercentage = 15,
		loading = false,
		disabled = false,
		error = false,
		emptyTitle = 'No data available',
		emptyDescription = 'There is no data to display in this chart.',
		loadingAriaLabel = 'Loading chart data',
		errorTitle = 'Unable to load chart',
		errorDescription = 'Something went wrong while loading the chart data.',
		ariaLabel,
		ariaLabelledBy,
		class: className = '',
		...props
	}: Props = $props();

	// Size-based chart dimensions
	let chartSizePx = $derived(size === 'sm' ? 160 : size === 'md' ? 200 : 280);

	// SVG dimensions (dynamic based on size prop)
	let SVG_SIZE = $derived(chartSizePx);
	let CX = $derived(SVG_SIZE / 2);
	let CY = $derived(SVG_SIZE / 2);
	let OUTER_R = $derived((SVG_SIZE / 2) * 0.9);
	let innerR = $derived(donut ? OUTER_R * 0.55 : 0);

	let containerClasses = $derived(
		[
			'chart-pie-container',
			'w-full',
			'flex flex-col items-center',
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Total value for percentage calculation
	let total = $derived(data?.length ? data.reduce((sum, d) => sum + Math.max(0, d.value), 0) : 0);

	// Processed slices: label, value, percentage, start angle (0–1), end angle (0–1), variant
	interface ProcessedSlice {
		label: string;
		value: number;
		percentage: number;
		start: number;
		end: number;
		variant: ChartPieVariant;
	}

	let processedData = $derived.by((): ProcessedSlice[] => {
		if (!data?.length || total <= 0) return [];
		let acc = 0;
		return data.map((d, i) => {
			const v = Math.max(0, d.value);
			const pct = total > 0 ? (v / total) * 100 : 0;
			const start = acc / 100;
			acc += pct;
			const end = acc / 100;
			const variant = colorScheme[i % colorScheme.length] ?? 'primary';
			return {
				label: d.label,
				value: v,
				percentage: pct,
				start,
				end,
				variant
			};
		});
	});

	// Start at 12 o'clock (-90°), clockwise. angle 0 = top.
	function angleToCoord(t: number): [number, number] {
		const rad = t * 2 * Math.PI - Math.PI / 2;
		return [CX + OUTER_R * Math.cos(rad), CY + OUTER_R * Math.sin(rad)];
	}

	function innerCoord(t: number): [number, number] {
		if (innerR <= 0) return [CX, CY];
		const rad = t * 2 * Math.PI - Math.PI / 2;
		return [CX + innerR * Math.cos(rad), CY + innerR * Math.sin(rad)];
	}

	function slicePath(s: ProcessedSlice): string {
		const [x1, y1] = angleToCoord(s.start);
		const [x2, y2] = angleToCoord(s.end);
		const [ix1, iy1] = innerCoord(s.start);
		const [ix2, iy2] = innerCoord(s.end);
		const large = s.end - s.start > 0.5 ? 1 : 0;
		if (donut && innerR > 0) {
			return `M ${ix1} ${iy1} L ${x1} ${y1} A ${OUTER_R} ${OUTER_R} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1} Z`;
		}
		return `M ${CX} ${CY} L ${x1} ${y1} A ${OUTER_R} ${OUTER_R} 0 ${large} 1 ${x2} ${y2} Z`;
	}

	// Label position (middle of slice, offset from center)
	function labelPos(s: ProcessedSlice): [number, number] {
		const t = (s.start + s.end) / 2;
		const r = donut ? (innerR + OUTER_R) / 2 : (OUTER_R * 2) / 3;
		const rad = t * 2 * Math.PI - Math.PI / 2;
		return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
	}

	// DaisyUI fill classes (static)
	const variantFill: Record<ChartPieVariant, string> = {
		primary: 'fill-primary',
		secondary: 'fill-secondary',
		accent: 'fill-accent',
		success: 'fill-success',
		warning: 'fill-warning',
		error: 'fill-error',
		info: 'fill-info'
	};

	// ChartLegend expects `color` as hex/css. We use DaisyUI variants.
	// ChartLegend uses `style="background-color: {item.color}"`. We need actual colors.
	// Use a small map of variant -> DaisyUI semantic color. Legend color swatch.
	const VARIANT_COLORS: Record<ChartPieVariant, string> = {
		primary: 'oklch(var(--p))',
		secondary: 'oklch(var(--s))',
		accent: 'oklch(var(--a))',
		success: 'oklch(var(--su))',
		warning: 'oklch(var(--wa))',
		error: 'oklch(var(--er))',
		info: 'oklch(var(--in))'
	};

	let legendItemsWithColors = $derived.by(() =>
		processedData
			.filter((s) => {
				// If hideLabeledFromLegend is true and labels are shown,
				// exclude slices that have labels displayed on the chart
				if (hideLabeledFromLegend && showLabels) {
					return s.percentage < labelMinPercentage;
				}
				return true;
			})
			.map((s) => ({
				label: hideLegendLabels ? '' : s.label,
				color: VARIANT_COLORS[s.variant],
				variant: s.variant,
				value: showValues ? String(s.value) : undefined,
				ariaLabel: `${s.label}: ${s.value} (${s.percentage.toFixed(1)}%)`
			}))
	);

	// Legend size classes
	let legendSize = $derived(size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md');
	let legendTextSize = $derived(
		legendSize === 'sm' ? 'sm' : legendSize === 'md' ? 'base' : 'lg'
	) as 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
	let legendColorSize = $derived(
		legendSize === 'sm' ? 'w-3 h-3' : legendSize === 'md' ? 'w-3.5 h-3.5' : 'w-4 h-4'
	);
	let legendGap = $derived(
		legendSize === 'sm' ? 'gap-1.5' : legendSize === 'md' ? 'gap-2' : 'gap-2.5'
	);

	let accessibleDescription = $derived(
		data?.length
			? `Pie chart with ${data.length} ${data.length === 1 ? 'slice' : 'slices'}. ` +
					processedData
						.map((s) => `${s.label}: ${s.value} (${s.percentage.toFixed(1)}%)`)
						.join('. ') +
					`. Total: ${total}.`
			: 'No data available in chart.'
	);

	let defaultAriaLabel = $derived(
		ariaLabel ?? `Pie chart showing ${data?.length ?? 0} data points`
	);

	let hasData = $derived(Boolean(data?.length && total > 0));
</script>

<div
	class={containerClasses}
	role="group"
	aria-label={defaultAriaLabel}
	aria-labelledby={ariaLabelledBy}
	aria-busy={loading}
	aria-disabled={disabled}
	aria-describedby="chart-pie-description"
	{...props}
>
	<div id="chart-pie-description" class="sr-only">
		{accessibleDescription}
	</div>

	{#if loading}
		<!--
		  NOTE: Raw HTML div is intentional here.
		  Reason: Structural centering container for Loader. No suitable layout component exists
		  for a fixed-size centered box. Loader is a library component (ChartLine uses same pattern).
		-->
		<div
			class="flex w-full items-center justify-center"
			style="width: {chartSizePx}px; height: {chartSizePx}px;"
		>
			<Loader
				size="lg"
				variant="primary"
				label={loadingAriaLabel}
				ariaLabel={loadingAriaLabel}
				fullWidth
			/>
		</div>
	{:else if error}
		<!--
		  NOTE: Raw HTML div is intentional here.
		  Reason: Structural centering container for EmptyState. Same as loading block.
		  EmptyState is a library component.
		-->
		<div
			class="flex items-center justify-center"
			style="width: {chartSizePx}px; height: {chartSizePx}px;"
		>
			<EmptyState
				title={errorTitle}
				description={errorDescription}
				variant="error"
				size="sm"
				ariaLabel={errorTitle}
			/>
		</div>
	{:else if !hasData}
		<!--
		  NOTE: Raw HTML div is intentional here.
		  Reason: Structural centering container for EmptyState. Same as loading/error blocks.
		  EmptyState is a library component.
		-->
		<div
			class="flex items-center justify-center"
			style="width: {chartSizePx}px; height: {chartSizePx}px;"
		>
			<EmptyState
				title={emptyTitle}
				description={emptyDescription}
				size="sm"
				ariaLabel={emptyTitle}
			/>
		</div>
	{:else}
		<div
			class="chart-pie-wrapper relative flex flex-col items-center"
			style="width: {chartSizePx}px;"
		>
			<div class="relative" style="width: {chartSizePx}px; height: {chartSizePx}px;">
				<svg
					viewBox="0 0 {SVG_SIZE} {SVG_SIZE}"
					class="absolute inset-0 h-full w-full"
					role="img"
					aria-hidden="true"
					focusable="false"
				>
					{#each processedData as slice, i}
						<path
							d={slicePath(slice)}
							class="{variantFill[slice.variant]} opacity-90 transition-opacity hover:opacity-100"
							role="group"
							aria-label="{slice.label}: {slice.value} ({slice.percentage.toFixed(1)}%)"
						>
							<!--
							  NOTE: Raw SVG title is intentional here.
							  Reason: Native SVG tooltip for slice hover. Tooltip component wraps HTML;
							  SVG requires <title> as first child of graphics element. Standard, accessible.
							-->
							<title>{slice.label}: {slice.value} ({slice.percentage.toFixed(1)}%)</title>
						</path>
					{/each}
				</svg>
				{#if showLabels}
					<div class="pointer-events-none absolute inset-0" aria-hidden="true">
						{#each processedData as slice}
							{#if slice.percentage >= labelMinPercentage}
								{@const [lx, ly] = labelPos(slice)}
								<div
									class="absolute flex flex-col items-center justify-center"
									style="left: {(lx / SVG_SIZE) * 100}%; top: {(ly / SVG_SIZE) *
										100}%; transform: translate(-50%, -50%);"
								>
									{#if !showOnlyPercentage}
										<Text
											text={slice.label}
											size="xs"
											display="block"
											align="center"
											weight="medium"
											ariaHidden={true}
											class="text-base-content"
										/>
									{/if}
									{#if showValues}
										<Text
											text={slice.percentage.toFixed(0) + '%'}
											size="xs"
											display="block"
											align="center"
											variant="muted"
											ariaHidden={true}
											class={showOnlyPercentage ? '' : 'text-base-content/70 -mt-0.5'}
										/>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
			{#if showLegend && legendItemsWithColors.length > 0}
				<!--
				  NOTE: Custom legend implementation is intentional here.
				  Reason: ChartLegend component doesn't support colored Badge variants.
				  We need Badge colors to match slice colors, so we implement custom legend.
				-->
				<div class="mt-4 flex flex-row flex-wrap gap-3" aria-label="Chart legend" role="list">
					{#each legendItemsWithColors as item}
						<div class="flex items-center {legendGap} select-none" role="listitem">
							<!--
							  NOTE: Raw HTML span is intentional here.
							  Reason: This is a visual color indicator (swatch) for legend items, not a semantic status indicator.
							  No suitable library component exists for simple color swatches. StatusDot is for status indicators,
							  not color swatches. This span serves as a decorative visual element matching the pie slice color.
							-->
							<span
								class="inline-block rounded-sm {legendColorSize}"
								style="background-color: {item.color}"
								aria-hidden="true"
							></span>
							{#if !hideLegendLabels && item.label}
								<Text text={item.label} size={legendTextSize} weight="medium" />
							{/if}
							{#if showValues && item.value !== undefined}
								<Badge
									label={String(item.value)}
									size={legendSize === 'sm' ? 'sm' : legendSize === 'md' ? 'md' : 'lg'}
									variant={useColoredBadges ? item.variant : 'neutral'}
									class={hideLegendLabels ? '' : 'ml-1'}
								/>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
