<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Card from '../../core/layout/Card.svelte';
	import Loader from '../../core/feedback/Loader.svelte';
	import EmptyState from '../../core/data-display/EmptyState.svelte';

	/**
	 * Data point interface for line chart
	 */
	export interface ChartLineDataPoint {
		x: number | string;
		y: number;
		label?: string;
	}

	/**
	 * Props interface for the ChartLine component
	 * A line chart component for displaying data trends over time
	 */
	interface Props {
		/**
		 * Chart data points (array of numbers or ChartLineDataPoint objects)
		 * If array of numbers, they will be plotted sequentially
		 * @default []
		 */
		data: number[] | ChartLineDataPoint[];
		/**
		 * X-axis labels (used when data is array of numbers)
		 * @default []
		 */
		labels?: string[];
		/**
		 * Color variant of the line
		 * @default 'primary'
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
		 * Chart title
		 */
		title?: string;
		/**
		 * Chart width
		 * @default '100%'
		 */
		width?: string;
		/**
		 * Chart height
		 * @default '300px'
		 */
		height?: string;
		/**
		 * Show grid lines
		 * @default true
		 */
		showGrid?: boolean;
		/**
		 * Show data points on the line
		 * @default true
		 */
		showPoints?: boolean;
		/**
		 * Show area under the line (filled area)
		 * @default false
		 */
		showArea?: boolean;
		/**
		 * Line stroke width
		 * @default 2
		 */
		strokeWidth?: number;
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
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		data,
		labels = [],
		variant = 'primary',
		title,
		width = '100%',
		height = '300px',
		showGrid = true,
		showPoints = true,
		showArea = false,
		strokeWidth = 2,
		loading = false,
		disabled = false,
		ariaLabel,
		class: className = ''
	}: Props = $props();

	// SVG dimensions
	const SVG_WIDTH = 800;
	const SVG_HEIGHT = 300;
	const PADDING = { top: 20, right: 20, bottom: 40, left: 60 };
	const CHART_WIDTH = SVG_WIDTH - PADDING.left - PADDING.right;
	const CHART_HEIGHT = SVG_HEIGHT - PADDING.top - PADDING.bottom;

	// Normalize data to ChartLineDataPoint array
	let normalizedData = $derived(() => {
		if (data.length === 0) return [];

		if (typeof data[0] === 'number') {
			// Data is number[], convert to ChartLineDataPoint[]
			return (data as number[]).map((y, index) => ({
				x: index,
				y,
				label: labels[index] || String(index)
			}));
		} else {
			// Data is already ChartLineDataPoint[]
			return data as ChartLineDataPoint[];
		}
	});

	// Find min and max values for scaling
	let minY = $derived(() => {
		if (normalizedData().length === 0) return 0;
		return Math.min(...normalizedData().map((d) => d.y));
	});

	let maxY = $derived(() => {
		if (normalizedData().length === 0) return 100;
		return Math.max(...normalizedData().map((d) => d.y));
	});

	// Calculate Y range with some padding
	let yRange = $derived(() => {
		const range = maxY() - minY();
		const padding = range * 0.1; // 10% padding
		return {
			min: minY() - padding,
			max: maxY() + padding,
			range: range + padding * 2
		};
	});

	// Scale function: convert data value to SVG Y coordinate
	function scaleY(value: number): number {
		const { min, range } = yRange();
		return CHART_HEIGHT - ((value - min) / range) * CHART_HEIGHT;
	}

	// Scale function: convert data index to SVG X coordinate
	function scaleX(index: number): number {
		if (normalizedData().length <= 1) return CHART_WIDTH / 2;
		return (index / (normalizedData().length - 1)) * CHART_WIDTH;
	}

	// Generate SVG path for the line
	let pathData = $derived(() => {
		if (normalizedData().length === 0) return '';

		const points = normalizedData().map((d, index) => {
			const x = scaleX(index) + PADDING.left;
			const y = scaleY(d.y) + PADDING.top;
			return `${x},${y}`;
		});

		return `M ${points.join(' L ')}`;
	});

	// Generate area path (for filled area under line)
	let areaPathData = $derived(() => {
		if (normalizedData().length === 0 || !showArea) return '';

		const points = normalizedData().map((d, index) => {
			const x = scaleX(index) + PADDING.left;
			const y = scaleY(d.y) + PADDING.top;
			return `${x},${y}`;
		});

		const firstX = scaleX(0) + PADDING.left;
		const lastX = scaleX(normalizedData().length - 1) + PADDING.left;
		const bottomY = CHART_HEIGHT + PADDING.top;

		return `M ${firstX},${bottomY} L ${points.join(' L ')} L ${lastX},${bottomY} Z`;
	});

	// Grid lines (horizontal)
	let gridLines = $derived(() => {
		if (!showGrid) return [];

		const lines = 5; // Number of grid lines
		const gridLines = [];

		for (let i = 0; i <= lines; i++) {
			const y = (i / lines) * CHART_HEIGHT + PADDING.top;
			const value = yRange().max - (i / lines) * yRange().range;
			gridLines.push({ y, value });
		}

		return gridLines;
	});

	// Tailwind/DaisyUI stroke and fill classes for variants
	let strokeClass = $derived(
		variant === 'primary'
			? 'stroke-primary'
			: variant === 'secondary'
				? 'stroke-secondary'
				: variant === 'accent'
					? 'stroke-accent'
					: variant === 'neutral'
						? 'stroke-neutral'
						: variant === 'info'
							? 'stroke-info'
							: variant === 'success'
								? 'stroke-success'
								: variant === 'warning'
									? 'stroke-warning'
									: variant === 'error'
										? 'stroke-error'
										: 'stroke-primary'
	);

	let fillClass = $derived(
		variant === 'primary'
			? 'fill-primary'
			: variant === 'secondary'
				? 'fill-secondary'
				: variant === 'accent'
					? 'fill-accent'
					: variant === 'neutral'
						? 'fill-neutral'
						: variant === 'info'
							? 'fill-info'
							: variant === 'success'
								? 'fill-success'
								: variant === 'warning'
									? 'fill-warning'
									: variant === 'error'
										? 'fill-error'
										: 'fill-primary'
	);

	// Check if data is empty
	let hasData = $derived(normalizedData().length > 0);
</script>

<Card {title} {disabled} {ariaLabel} class={className}>
	{#if loading}
		<div class="flex w-full items-center justify-center" style="height: {height};">
			<Loader size="lg" {variant} label="Loading chart data..." />
		</div>
	{:else}
		<div class="w-full" style="width: {width}; height: {height};">
			{#if !hasData}
				<EmptyState
					title="No data available"
					description="There is no data to display in this chart."
					variant="neutral"
					size="sm"
				/>
			{:else}
				<svg
					class="h-full w-full"
					viewBox="0 0 {SVG_WIDTH} {SVG_HEIGHT}"
					preserveAspectRatio="xMidYMid meet"
					role="img"
					aria-label={ariaLabel || title || 'Line chart'}
					aria-describedby={title
						? `chart-title-${Math.random().toString(36).substr(2, 9)}`
						: undefined}
					style={disabled ? 'opacity: 0.5; pointer-events: none;' : ''}
				>
					<!-- Grid lines -->
					{#if showGrid}
						{#each gridLines() as gridLine}
							<line
								x1={PADDING.left}
								y1={gridLine.y}
								x2={SVG_WIDTH - PADDING.right}
								y2={gridLine.y}
								stroke="currentColor"
								stroke-width="1"
								stroke-opacity="0.1"
								class="text-base-content"
							/>
						{/each}
					{/if}

					<!-- Area fill (under the line) -->
					{#if showArea && areaPathData()}
						<path
							d={areaPathData()}
							class="{fillClass} opacity-30"
							stroke="none"
							aria-hidden="true"
						/>
					{/if}

					<!-- Line path -->
					{#if pathData()}
						<path
							d={pathData()}
							fill="none"
							class={strokeClass}
							stroke-width={strokeWidth}
							stroke-linecap="round"
							stroke-linejoin="round"
							vector-effect="non-scaling-stroke"
							aria-hidden="false"
						/>
					{/if}

					<!-- Data points -->
					{#if showPoints && normalizedData().length > 0}
						{#each normalizedData() as point, index}
							<circle
								cx={scaleX(index) + PADDING.left}
								cy={scaleY(point.y) + PADDING.top}
								r="4"
								class="{fillClass} stroke-base-100"
								stroke-width="2"
								vector-effect="non-scaling-stroke"
								aria-hidden="true"
							/>
						{/each}
					{/if}

					<!-- X-axis labels -->
					{#each normalizedData() as point, index}
						{#if index % Math.ceil(normalizedData().length / 6) === 0 || index === normalizedData().length - 1}
							<text
								x={scaleX(index) + PADDING.left}
								y={SVG_HEIGHT - PADDING.bottom + 15}
								text-anchor="middle"
								class="fill-base-content text-xs opacity-60"
								font-size="12"
								aria-hidden="true"
							>
								{point.label || String(point.x)}
							</text>
						{/if}
					{/each}

					<!-- Y-axis labels -->
					{#if showGrid}
						{#each gridLines() as gridLine}
							<text
								x={PADDING.left - 10}
								y={gridLine.y + 4}
								text-anchor="end"
								class="fill-base-content text-xs opacity-60"
								font-size="12"
								aria-hidden="true"
							>
								{Math.round(gridLine.value).toLocaleString()}
							</text>
						{/each}
					{/if}
				</svg>
			{/if}
		</div>
	{/if}
</Card>
