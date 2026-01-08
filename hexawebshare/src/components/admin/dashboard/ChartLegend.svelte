<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * ChartLegend Component
	 * Displays a legend for chart visualizations with customizable items
	 * Built with DaisyUI and Svelte 5 with full accessibility support
	 */

	export interface LegendItem {
		label: string;
		color: string;
		value?: string | number;
		disabled?: boolean;
		ariaLabel?: string;
	}

	interface Props {
		items: LegendItem[];
		orientation?: 'horizontal' | 'vertical';
		position?: 'top' | 'bottom' | 'left' | 'right';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		interactive?: boolean;
		showValues?: boolean;
		spacing?: 'compact' | 'normal' | 'relaxed';
		ariaLabel?: string;
		ariaLive?: 'off' | 'polite' | 'assertive';
		class?: string;
	}

	const {
		items,
		orientation = 'horizontal',
		position = 'bottom',
		size = 'md',
		interactive = false,
		showValues = false,
		spacing = 'normal',
		ariaLabel = 'Chart legend',
		ariaLive = 'polite',
		class: className = '',
		...props
	}: Props = $props();

	// Derive container classes based on props
	let containerClasses = $derived(
		[
			'flex',
			'flex-wrap',
			orientation === 'horizontal' && 'flex-row',
			orientation === 'vertical' && 'flex-col',
			spacing === 'compact' && 'gap-2',
			spacing === 'normal' && 'gap-3',
			spacing === 'relaxed' && 'gap-4',
			position === 'top' && 'mb-4',
			position === 'bottom' && 'mt-4',
			position === 'left' && 'mr-4',
			position === 'right' && 'ml-4',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Derive item classes based on size and interactive state
	let itemClasses = $derived(
		[
			'flex',
			'items-center',
			size === 'xs' && 'gap-1',
			size === 'sm' && 'gap-1.5',
			size === 'md' && 'gap-2',
			size === 'lg' && 'gap-2.5',
			interactive &&
				'cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm bg-transparent border-0 p-0',
			'select-none'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Derive color indicator size
	let colorSize = $derived(
		size === 'xs' ? 'w-2 h-2' : size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-3.5 h-3.5' : 'w-4 h-4'
	);

	// Derive text size
	let textSize = $derived(
		size === 'xs'
			? 'text-xs'
			: size === 'sm'
				? 'text-sm'
				: size === 'md'
					? 'text-base'
					: 'text-lg'
	);

	// Handle legend item click
	function handleItemClick(item: LegendItem, index: number) {
		if (interactive && !item.disabled) {
			// Dispatch custom event for parent components to handle
			const event = new CustomEvent('legendItemClick', {
				detail: { item, index }
			});
			dispatchEvent(event);
		}
	}

	// Get item-specific classes
	function getItemSpecificClasses(item: LegendItem): string {
		return [itemClasses, item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none']
			.filter(Boolean)
			.join(' ');
	}

	// Generate accessible label for each item
	function getItemAriaLabel(item: LegendItem): string {
		if (item.ariaLabel) return item.ariaLabel;

		let label = item.label;
		if (showValues && item.value !== undefined) {
			label += `, value: ${item.value}`;
		}
		if (item.disabled) {
			label += ', disabled';
		}
		return label;
	}
</script>

<div
	class={containerClasses}
	aria-label={ariaLabel}
	aria-live={ariaLive}
	role="list"
	{...props}
>
	{#each items as item, index}
		{#if interactive && !item.disabled}
			<button
				type="button"
				class={getItemSpecificClasses(item)}
				aria-label={getItemAriaLabel(item)}
				disabled={item.disabled}
				onclick={() => handleItemClick(item, index)}
			>
				<span
					class="inline-block rounded-sm {colorSize}"
					style="background-color: {item.color}"
					aria-hidden="true"
				></span>
				<span class="font-medium {textSize}" aria-hidden="true">{item.label}</span>
				{#if showValues && item.value !== undefined}
					<span class="font-semibold {textSize} ml-1 text-base-content/70" aria-hidden="true"
						>{item.value}</span
					>
				{/if}
			</button>
		{:else}
			<div class={getItemSpecificClasses(item)} role="listitem">
				<span
					class="inline-block rounded-sm {colorSize}"
					style="background-color: {item.color}"
					aria-hidden="true"
				></span>
				<span class="font-medium {textSize}">{item.label}</span>
				{#if showValues && item.value !== undefined}
					<span class="font-semibold {textSize} ml-1 text-base-content/70">{item.value}</span>
				{/if}
			</div>
		{/if}
	{/each}
</div>
