<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import EmptyState from '../../core/data-display/EmptyState.svelte';
	import Loader from '../../core/feedback/Loader.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Badge from '../../core/media/Badge.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Heading from '../../core/typography/Heading.svelte';
	import StatusDot from '../../core/data-display/StatusDot.svelte';
	import Row from '../../core/layout/Row.svelte';

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
		| 'info'
		| 'neutral';

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
		 * Sort data before rendering.
		 * @default 'none'
		 */
		sortBy?: 'value-desc' | 'value-asc' | 'label' | 'none';
		/**
		 * When set, slices with percentage below this value are merged into one slice.
		 * Pass otherLabel for the merged slice label (e.g. for i18n).
		 */
		groupSmallSlicesBelowPercentage?: number;
		/**
		 * Label for the merged "other" slice when groupSmallSlicesBelowPercentage is used.
		 * Pass from i18n; no default to avoid hardcoded strings.
		 */
		otherLabel?: string;
		/**
		 * Color variant for the merged "Other" slice.
		 * Use a visible variant (e.g. 'info') since 'neutral' can blend with light backgrounds.
		 * @default 'info'
		 */
		otherSliceVariant?: ChartPieVariant;
		/**
		 * Format numeric values for display (legend, labels, center). Pass from app (e.g. Intl).
		 */
		formatValue?: (value: number) => string;
		/**
		 * When donut is true, optional title shown in center (e.g. "Total"). Value is formatted with formatValue.
		 */
		centerTitle?: string;
		/**
		 * Ratio of inner radius to outer radius when donut is true (0.5–0.8). Affects hole size.
		 * @default 0.55
		 */
		innerRadiusRatio?: number;
		/**
		 * Starting angle in degrees (0 = 12 o'clock, 90 = 3 o'clock). Chart draws clockwise from there.
		 * @default 0
		 */
		startAngle?: number;
		/**
		 * Format percentage for display (slice labels, tooltip, aria). Pass from app (e.g. Intl).
		 */
		formatPercentage?: (percentage: number) => string;
		/**
		 * Legend position relative to chart.
		 * @default 'bottom'
		 */
		legendPosition?: 'top' | 'right' | 'bottom' | 'left';
		/**
		 * Scale factor for slice on hover (1 = no effect). Creates "explode" feel.
		 * @default 1.05
		 */
		hoverScale?: number;
		/**
		 * Called when a slice is clicked.
		 */
		onSliceClick?: (dataPoint: ChartPieDataPoint, index: number) => void;
		/**
		 * Called when pointer enters a slice.
		 */
		onSliceHover?: (dataPoint: ChartPieDataPoint, index: number) => void;
		/**
		 * Index of the selected slice (controlled). Use with onSelectedChange for two-way binding.
		 */
		selectedIndex?: number;
		/**
		 * Called when selection changes (slice or legend click).
		 */
		onSelectedChange?: (index: number) => void;
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
		 * Fallback for aria-label when ariaLabel is not set. Use {count} for data point count.
		 */
		ariaLabelFallback?: string;
		/**
		 * Accessible description template when chart has data. Placeholders: {count}, {sliceOrSlices}, {items}, {total}.
		 */
		accessibleDescriptionTemplate?: string;
		/**
		 * Word for one slice (used in accessible description when count is 1). Pass from i18n.
		 */
		sliceSingular?: string;
		/**
		 * Word for multiple slices (used in accessible description when count > 1). Pass from i18n.
		 */
		slicePlural?: string;
		/**
		 * Accessible label for the legend list (e.g. for i18n).
		 */
		legendAriaLabel?: string;
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
		sortBy = 'none',
		groupSmallSlicesBelowPercentage,
		otherLabel = '',
		otherSliceVariant = 'info',
		formatValue = (v: number) => String(v),
		centerTitle,
		innerRadiusRatio = 0.55,
		startAngle = 0,
		formatPercentage = (p: number) => p.toFixed(0) + '%',
		legendPosition = 'bottom',
		hoverScale = 1.05,
		onSliceClick,
		onSliceHover,
		selectedIndex,
		onSelectedChange,
		loading = false,
		disabled = false,
		error = false,
		emptyTitle = 'No data available',
		emptyDescription = 'There is no data to display in this chart.',
		loadingAriaLabel = 'Loading chart data',
		errorTitle = 'Unable to load chart',
		errorDescription = 'Something went wrong while loading the chart data.',
		ariaLabel,
		ariaLabelFallback = 'Pie chart showing {count} data points',
		accessibleDescriptionTemplate = 'Pie chart with {count} {sliceOrSlices}. {items}. Total: {total}.',
		sliceSingular = 'slice',
		slicePlural = 'slices',
		legendAriaLabel = 'Chart legend',
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
	let innerR = $derived(donut ? OUTER_R * Math.min(0.8, Math.max(0.3, innerRadiusRatio)) : 0);

	let containerClasses = $derived(
		[
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
		const withVariant = data.map((d, i) => ({
			label: d.label,
			value: Math.max(0, d.value),
			variant: (colorScheme[i % colorScheme.length] ?? 'primary') as ChartPieVariant
		}));
		let sorted = withVariant;
		if (sortBy === 'value-desc') {
			sorted = [...withVariant].sort((a, b) => b.value - a.value);
		} else if (sortBy === 'value-asc') {
			sorted = [...withVariant].sort((a, b) => a.value - b.value);
		} else if (sortBy === 'label') {
			sorted = [...withVariant].sort((a, b) => a.label.localeCompare(b.label));
		}
		const sortedTotal = sorted.reduce((s, d) => s + d.value, 0);
		if (sortedTotal <= 0) return [];
		const threshold = groupSmallSlicesBelowPercentage ?? 0;
		const raw: ProcessedSlice[] = [];
		let acc = 0;
		const small: ProcessedSlice[] = [];
		for (const d of sorted) {
			const pct = (d.value / sortedTotal) * 100;
			const start = acc / 100;
			acc += pct;
			const end = acc / 100;
			const slice: ProcessedSlice = { ...d, percentage: pct, start, end };
			if (threshold > 0 && pct < threshold) {
				small.push(slice);
			} else {
				raw.push(slice);
			}
		}
		if (small.length > 0) {
			const otherValue = small.reduce((s, x) => s + x.value, 0);
			const otherPct = small.reduce((s, x) => s + x.percentage, 0);
			const otherStart = raw.length > 0 ? raw[raw.length - 1].end : 0;
			raw.push({
				label: otherLabel,
				value: otherValue,
				percentage: otherPct,
				start: otherStart,
				end: 1,
				variant: otherSliceVariant
			});
		}
		return raw;
	});

	// t: 0-1 fraction of circle. startAngle in degrees (0 = 12 o'clock). Clockwise.
	const angleOffsetRad = $derived((startAngle * Math.PI) / 180 - Math.PI / 2);
	function angleToCoord(t: number): [number, number] {
		const rad = t * 2 * Math.PI + angleOffsetRad;
		return [CX + OUTER_R * Math.cos(rad), CY + OUTER_R * Math.sin(rad)];
	}

	function innerCoord(t: number): [number, number] {
		if (innerR <= 0) return [CX, CY];
		const rad = t * 2 * Math.PI + angleOffsetRad;
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
		const rad = t * 2 * Math.PI + angleOffsetRad;
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
		info: 'fill-info',
		neutral: 'fill-neutral'
	};

	let legendItemsWithColors = $derived.by(() =>
		processedData
			.map((s, sliceIndex) => ({ s, sliceIndex }))
			.filter(({ s }) => {
				if (hideLabeledFromLegend && showLabels) {
					return s.percentage < labelMinPercentage;
				}
				return true;
			})
			.map(({ s, sliceIndex }) => ({
				label: hideLegendLabels ? '' : s.label,
				variant: s.variant,
				value: showValues ? formatValue(s.value) : undefined,
				ariaLabel: `${s.label}: ${formatValue(s.value)} (${formatPercentage(s.percentage)})`,
				sliceIndex
			}))
	);

	// Legend size classes
	let legendSize = $derived(size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md');
	let legendTextSize = $derived(
		legendSize === 'sm' ? 'sm' : legendSize === 'md' ? 'base' : 'lg'
	) as 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
	let legendDotSize = $derived(legendSize === 'sm' ? 'sm' : legendSize === 'md' ? 'md' : 'lg') as
		| 'xs'
		| 'sm'
		| 'md'
		| 'lg'
		| 'xl';
	let legendGap = $derived(
		legendSize === 'sm' ? 'gap-1.5' : legendSize === 'md' ? 'gap-2' : 'gap-2.5'
	);

	let accessibleDescription = $derived(
		data?.length && total > 0
			? accessibleDescriptionTemplate
					.replace('{count}', String(data.length))
					.replace('{sliceOrSlices}', data.length === 1 ? sliceSingular : slicePlural)
					.replace(
						'{items}',
						processedData
							.map((s) => `${s.label}: ${formatValue(s.value)} (${formatPercentage(s.percentage)})`)
							.join('. ')
					)
					.replace('{total}', formatValue(total))
			: emptyTitle
	);

	let defaultAriaLabel = $derived(
		ariaLabel ?? ariaLabelFallback.replace('{count}', String(data?.length ?? 0))
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
	<!--
	  NOTE: Raw HTML div is intentional here.
	  Reason: sr-only container for accessible description; no library component for live region.
	-->
	<div id="chart-pie-description" class="sr-only">
		{accessibleDescription}
	</div>

	{#if loading}
		<Row
			align="center"
			justify="center"
			gap="0"
			class="w-full overflow-x-hidden"
			style="width: {chartSizePx}px; min-height: {chartSizePx}px;"
			ariaLabel={loadingAriaLabel}
		>
			<Loader
				size="lg"
				variant="primary"
				label={loadingAriaLabel}
				ariaLabel={loadingAriaLabel}
				fullWidth
			/>
		</Row>
	{:else if error}
		<Row
			align="center"
			justify="center"
			gap="0"
			class="w-full overflow-x-hidden"
			style="width: {chartSizePx}px; min-height: {chartSizePx}px;"
			ariaLabel={errorTitle}
		>
			<EmptyState
				title={errorTitle}
				description={errorDescription}
				variant="error"
				size="sm"
				ariaLabel={errorTitle}
			/>
		</Row>
	{:else if !hasData}
		<Row
			align="center"
			justify="center"
			gap="0"
			class="w-full overflow-x-hidden"
			style="width: {chartSizePx}px; min-height: {chartSizePx}px;"
			ariaLabel={emptyTitle}
		>
			<EmptyState
				title={emptyTitle}
				description={emptyDescription}
				size="sm"
				ariaLabel={emptyTitle}
			/>
		</Row>
	{:else}
		<!--
		  NOTE: Raw HTML div is intentional here.
		  Reason: Structural wrapper for chart; no layout component for fixed-size chart container.
		-->
		<div
			class="relative flex {legendPosition === 'top' || legendPosition === 'bottom'
				? 'flex-col'
				: 'flex-row'} items-center justify-center gap-3"
			style={legendPosition === 'left' || legendPosition === 'right'
				? `min-width: ${chartSizePx}px`
				: `width: ${chartSizePx}px`}
		>
			<!--
			  NOTE: Raw HTML div is intentional here.
			  Reason: Structural wrapper for SVG and labels; required for absolute positioning.
			-->
			<div
				class="relative {legendPosition === 'top'
					? 'order-2'
					: legendPosition === 'left'
						? 'order-2'
						: 'order-1'}"
				style="width: {chartSizePx}px; height: {chartSizePx}px;"
			>
				<svg
					viewBox="0 0 {SVG_SIZE} {SVG_SIZE}"
					class="absolute inset-0 h-full w-full"
					role={onSliceClick || onSelectedChange ? undefined : 'img'}
					aria-hidden={onSliceClick || onSelectedChange ? undefined : true}
					focusable="false"
				>
					{#each processedData as slice, i}
						{@const [sx, sy] = labelPos(slice)}
						<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
						<g
							style="transform-origin: {sx}px {sy}px; --hover-scale: {hoverScale}"
							class="transition-transform duration-200 {hoverScale > 1
								? 'hover:scale-[var(--hover-scale)]'
								: ''}"
						>
							<path
								d={slicePath(slice)}
								class="{variantFill[slice.variant]} transition-opacity {selectedIndex === i
									? 'opacity-100'
									: 'opacity-80 hover:opacity-100'} {onSliceClick || onSelectedChange
									? 'cursor-pointer'
									: ''}"
								role={onSliceClick || onSelectedChange ? 'button' : 'group'}
								tabindex={onSliceClick || onSelectedChange ? 0 : undefined}
								aria-label="{slice.label}: {formatValue(slice.value)} ({formatPercentage(
									slice.percentage
								)})"
								aria-pressed={selectedIndex === i ? 'true' : undefined}
								onclick={(e) => {
									if (disabled) return;
									onSliceClick?.({ label: slice.label, value: slice.value }, i);
									onSelectedChange?.(i);
								}}
								onkeydown={(e) => {
									if (disabled) return;
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										onSliceClick?.({ label: slice.label, value: slice.value }, i);
										onSelectedChange?.(i);
									}
								}}
								onmouseenter={() => {
									if (!disabled) onSliceHover?.({ label: slice.label, value: slice.value }, i);
								}}
							>
								<!--
								  NOTE: Raw SVG title is intentional here.
								  Reason: Native SVG tooltip for slice hover. Tooltip component wraps HTML;
								  SVG requires <title> as first child of graphics element. Standard, accessible.
								-->
								<title
									>{slice.label}: {formatValue(slice.value)} ({formatPercentage(
										slice.percentage
									)})</title
								>
							</path>
						</g>
					{/each}
				</svg>
				{#if donut && centerTitle}
					<!--
					  NOTE: Raw HTML div is intentional here.
					  Reason: Structural centering container for donut center text. Heading and Text are library components.
					-->
					<div
						class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
						aria-hidden="true"
					>
						<Heading text={centerTitle} level="h4" size="xs" align="center" weight="medium" />
						<Text text={formatValue(total)} size="sm" variant="muted" align="center" />
					</div>
				{/if}
				{#if showLabels}
					<!--
					  NOTE: Raw HTML div is intentional here.
					  Reason: Overlay container for slice labels; pointer-events-none so clicks reach SVG.
					-->
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
											text={formatPercentage(slice.percentage)}
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
				  We use Button for each legend item so selection is keyboard-accessible.
				-->
				<!--
				  NOTE: Raw HTML div is intentional here.
				  Reason: List container for legend; role="list". Button/Badge/Text are library components inside.
				-->
				<div
					class="flex {legendPosition === 'top' || legendPosition === 'bottom'
						? 'flex-row flex-wrap'
						: 'flex-col'} {legendPosition === 'top' || legendPosition === 'left'
						? 'order-1'
						: 'order-2'} gap-3"
					aria-label={legendAriaLabel}
					role="list"
				>
					{#each legendItemsWithColors as item}
						{#if onSelectedChange}
							<Button
								variant="ghost"
								size="sm"
								ariaLabel={item.ariaLabel}
								aria-pressed={selectedIndex === item.sliceIndex ? 'true' : undefined}
								class="flex min-h-0 items-center {legendGap} px-2 py-1"
								onclick={() => onSelectedChange(item.sliceIndex)}
							>
								<StatusDot
									variant={item.variant}
									size={legendDotSize}
									ariaHidden={true}
									class="shrink-0"
								/>
								{#if !hideLegendLabels && item.label}
									<Text text={item.label} size={legendTextSize} weight="medium" />
								{/if}
								{#if showValues && item.value !== undefined}
									<Badge
										label={item.value}
										size={legendSize === 'sm' ? 'sm' : legendSize === 'md' ? 'md' : 'lg'}
										variant={useColoredBadges ? item.variant : 'neutral'}
										class={hideLegendLabels ? '' : 'ml-1'}
									/>
								{/if}
							</Button>
						{:else}
							<!--
							  NOTE: Raw HTML div is intentional here.
							  Reason: Legend listitem container when not interactive. StatusDot, Text, Badge are library components.
							-->
							<div class="flex items-center {legendGap} select-none" role="listitem">
								<StatusDot
									variant={item.variant}
									size={legendDotSize}
									ariaHidden={true}
									class="shrink-0"
								/>
								{#if !hideLegendLabels && item.label}
									<Text text={item.label} size={legendTextSize} weight="medium" />
								{/if}
								{#if showValues && item.value !== undefined}
									<Badge
										label={item.value}
										size={legendSize === 'sm' ? 'sm' : legendSize === 'md' ? 'md' : 'lg'}
										variant={useColoredBadges ? item.variant : 'neutral'}
										class={hideLegendLabels ? '' : 'ml-1'}
									/>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
