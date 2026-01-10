<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Table, { type TableColumn } from '../../core/data-display/Table.svelte';
	import Loader from '../../core/feedback/Loader.svelte';

	/**
	 * Key-value pair data structure
	 */
	export interface KeyValuePair {
		/**
		 * Unique identifier for the key-value pair
		 */
		id?: string | number;
		/**
		 * Key/label text
		 */
		key: string;
		/**
		 * Value text
		 */
		value: string | number | boolean | null | undefined;
		/**
		 * Optional description or help text
		 */
		description?: string;
		/**
		 * Whether this pair is disabled
		 */
		disabled?: boolean;
		/**
		 * Custom value renderer snippet
		 */
		valueSlot?: Snippet;
	}

	interface Props {
		/**
		 * Array of key-value pairs to display
		 */
		items?: KeyValuePair[];
		/**
		 * Layout variant
		 * @default 'vertical'
		 */
		variant?: 'vertical' | 'horizontal' | 'table' | 'compact';
		/**
		 * Size preset
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Show borders between items
		 * @default false
		 */
		bordered?: boolean;
		/**
		 * Show dividers between items
		 * @default true
		 */
		dividers?: boolean;
		/**
		 * Key column width (for horizontal/table layouts)
		 * @default 'auto'
		 */
		keyWidth?: string | 'auto' | 'narrow' | 'wide';
		/**
		 * Whether the list is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the list is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Show empty state when no items
		 * @default true
		 */
		showEmptyState?: boolean;
		/**
		 * Custom empty state message
		 */
		emptyMessage?: string;
		/**
		 * Key label prefix (e.g., "Field:")
		 */
		keyPrefix?: string;
		/**
		 * Key label suffix (e.g., ":")
		 */
		keySuffix?: string;
		/**
		 * Accessible label for the list
		 */
		ariaLabel?: string;
		/**
		 * ID of the element that labels this list
		 */
		ariaLabelledby?: string;
		/**
		 * Custom slot content for rendering items manually
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		items = [],
		variant = 'vertical',
		size = 'md',
		bordered = false,
		dividers = true,
		keyWidth = 'auto',
		disabled = false,
		loading = false,
		showEmptyState = true,
		emptyMessage = 'No data available',
		keyPrefix = '',
		keySuffix = ':',
		ariaLabel,
		ariaLabelledby,
		children,
		class: className = '',
		...props
	}: Props = $props();

	// Map admin size to core table size
	let tableSize: 'sm' | 'md' | 'lg' = $derived(size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md');

	let keyColumnWidth = $derived(
		keyWidth === 'narrow'
			? '8rem'
			: keyWidth === 'wide'
				? '12rem'
				: typeof keyWidth === 'string' && keyWidth !== 'auto'
					? keyWidth
					: undefined
	);

	// Table columns for the table variant using core Table component
	let tableColumns = $derived<TableColumn[]>([
		{
			key: 'key',
			label: 'Key',
			width: keyColumnWidth,
			render: (row) => {
				const typedRow = row as unknown as KeyValuePair;
				return `${keyPrefix}${typedRow.key}${keySuffix}`;
			}
		},
		{
			key: 'value',
			label: 'Value',
			render: (row) => {
				const typedRow = row as unknown as KeyValuePair;
				const base = formatValue(typedRow.value);
				return typedRow.description ? `${base} — ${typedRow.description}` : base;
			}
		}
	]);

	// Generate unique ID for accessibility
	const listId =
		crypto.randomUUID?.() ?? `key-value-list-${Math.random().toString(36).slice(2, 9)}`;

	// Format value for display
	function formatValue(value: string | number | boolean | null | undefined): string {
		if (value === null || value === undefined) {
			return '—';
		}
		if (typeof value === 'boolean') {
			return value ? 'Yes' : 'No';
		}
		return String(value);
	}

	// Container classes for non-table variants
	let containerClasses = $derived(
		[
			'key-value-list',
			variant === 'vertical' && 'flex flex-col',
			variant === 'horizontal' && 'flex flex-col',
			variant === 'compact' && 'flex flex-col gap-1',
			disabled && 'opacity-60 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Item wrapper classes (non-table variants only)
	let itemWrapperClasses = $derived(
		[
			variant === 'vertical' && 'flex flex-col',
			variant === 'horizontal' && 'flex flex-row items-start gap-4',
			variant === 'table' && 'table-row',
			variant === 'compact' && 'flex flex-row items-center gap-2',
			dividers &&
				variant !== 'table' &&
				variant !== 'compact' &&
				'border-b border-base-300 last:border-b-0',
			bordered && variant !== 'table' && 'border border-base-300 rounded-lg p-4',
			size === 'sm' && variant !== 'table' && 'py-2',
			size === 'md' && variant !== 'table' && 'py-3',
			size === 'lg' && variant !== 'table' && 'py-4'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Key cell classes
	let keyCellClasses = $derived(
		[
			'key-value-list-key',
			'font-medium',
			'text-base-content/70',
			variant === 'horizontal' && 'flex-shrink-0',
			variant === 'table' && 'table-cell',
			variant === 'table' && 'font-semibold',
			variant === 'compact' && 'text-sm',
			size === 'sm' && 'text-xs',
			size === 'md' && 'text-sm',
			size === 'lg' && 'text-base',
			keyWidth === 'narrow' && variant === 'horizontal' && 'w-32',
			keyWidth === 'wide' && variant === 'horizontal' && 'w-48',
			keyWidth !== 'auto' &&
				keyWidth !== 'narrow' &&
				keyWidth !== 'wide' &&
				variant === 'horizontal' &&
				`w-[${keyWidth}]`
		]
			.filter(Boolean)
			.join(' ')
	);

	// Value cell classes
	let valueCellClasses = $derived(
		[
			'key-value-list-value',
			'text-base-content',
			variant === 'horizontal' && 'flex-1',
			variant === 'table' && 'table-cell',
			variant === 'compact' && 'text-sm',
			size === 'sm' && 'text-xs',
			size === 'md' && 'text-sm',
			size === 'lg' && 'text-base'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Description classes
	let descriptionClasses = $derived(
		['text-xs', 'text-base-content/60', 'mt-1', variant === 'horizontal' && 'col-span-2']
			.filter(Boolean)
			.join(' ')
	);
</script>

{#if variant === 'table'}
	{#if items.length === 0 && !showEmptyState}
		<!-- Render nothing when empty state is disabled -->
	{:else}
		<!-- Table variant using core Table component -->
		<Table
			columns={tableColumns}
			data={items as unknown as Record<string, unknown>[]}
			size={tableSize}
			{bordered}
			{loading}
			{disabled}
			{emptyMessage}
			{ariaLabel}
			class={className}
			{...props}
		/>
	{/if}
{:else}
	<!-- Non-table variants -->
	<div
		id={listId}
		class={containerClasses}
		role="list"
		aria-label={ariaLabel}
		aria-labelledby={ariaLabelledby}
		{...props}
	>
		{#if children}
			{@render children()}
		{:else if loading}
			<!-- Loading state -->
			<div class="flex w-full justify-center py-6">
				<Loader
					size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'}
					label="Loading data"
					description="Fetching key-value pairs"
					fullWidth
				/>
			</div>
		{:else if items.length === 0 && showEmptyState}
			<!-- Empty state -->
			<div class="text-base-content/50 flex items-center justify-center py-8">
				<span class="text-sm">{emptyMessage}</span>
			</div>
		{:else}
			<!-- Vertical, Horizontal, or Compact variants -->
			{#each items as item, index (item.id ?? index)}
				<div class={itemWrapperClasses} class:opacity-60={item.disabled || disabled}>
					<div class={keyCellClasses}>
						{keyPrefix}{item.key}{keySuffix}
					</div>
					<div class={valueCellClasses}>
						{#if item.valueSlot}
							{@render item.valueSlot()}
						{:else}
							{formatValue(item.value)}
						{/if}
						{#if item.description}
							<div class={descriptionClasses}>{item.description}</div>
						{/if}
					</div>
				</div>
			{/each}
		{/if}
	</div>
{/if}
