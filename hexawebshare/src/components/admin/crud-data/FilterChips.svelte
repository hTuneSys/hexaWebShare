<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Text from '../../core/typography/Text.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import SkeletonLoader from '../../core/feedback/SkeletonLoader.svelte';
	import Icon from '../../core/media/Icon.svelte';
	import X from 'lucide-svelte/icons/x';

	/**
	 * Interface for a single filter item
	 */
	export interface Filter {
		/** Unique identifier for the filter */
		id: string;
		/** Label for the filter type (e.g., 'Status') */
		label: string;
		/** Value of the filter (e.g., 'Active') */
		value: string | number | boolean;
		/** Optional variant for the badge color */
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost';
	}

	/**
	 * Props interface for the FilterChips component
	 */
	interface Props {
		/**
		 * Array of active filters to display
		 */
		filters: Filter[];
		/**
		 * Callback function when a filter is removed
		 * @param id The ID of the filter to remove
		 */
		onRemove?: (id: string) => void;
		/**
		 * Callback function to clear all filters
		 */
		onClearAll?: () => void;
		/**
		 * Size of the chips
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the component is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the component is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Label for the "Clear all" button
		 * @default 'Clear all'
		 */
		clearAllLabel?: string;
		/**
		 * Additional CSS classes for the container
		 */
		class?: string;
		/**
		 * HTML id attribute
		 */
		id?: string;
		/**
		 * Accessible label for the filters container
		 * @default 'Active filters'
		 */
		ariaLabel?: string;
		/**
		 * Format string for the remove button's aria-label.
		 * Use '{label}' as a placeholder for the filter label.
		 * @default 'Remove {label} filter'
		 */
		removeFilterAriaLabelFormat?: string;
	}

	const {
		filters = [],
		onRemove,
		onClearAll,
		size = 'md',
		loading = false,
		disabled = false,
		clearAllLabel = 'Clear all',
		class: className = '',
		id,
		ariaLabel = 'Active filters',
		removeFilterAriaLabelFormat = 'Remove {label} filter',
		...props
	}: Props = $props();

	// Container classes using static classes
	const containerClasses = $derived(
		['flex flex-wrap items-center gap-2', className].filter(Boolean).join(' ')
	);

	// Badge and text size mappings
	const badgeSizeClass = $derived(
		size === 'xs'
			? 'badge-xs'
			: size === 'sm'
				? 'badge-sm'
				: size === 'md'
					? 'badge-md'
					: 'badge-lg'
	);

	const textSize = $derived(
		size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'md' ? 'sm' : 'base'
	);

	const iconButtonSize = $derived(
		size === 'xs' ? 'xs' : size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'sm'
	);
</script>

<div
	{id}
	class={containerClasses}
	role="list"
	aria-label={ariaLabel}
	aria-busy={loading}
	{...props}
>
	{#if loading && filters.length === 0}
		<div class="flex gap-2" aria-hidden="true">
			<SkeletonLoader shape="pill" {size} width="short" variant="neutral" />
			<SkeletonLoader shape="pill" {size} width="medium" variant="neutral" />
			<SkeletonLoader shape="pill" {size} width="short" variant="neutral" />
		</div>
	{:else}
		{#each filters as filter (filter.id)}
			<div
				class={[
					'badge flex h-auto items-center gap-1',
					badgeSizeClass,
					filter.variant === 'primary' && 'badge-primary',
					filter.variant === 'secondary' && 'badge-secondary',
					filter.variant === 'accent' && 'badge-accent',
					filter.variant === 'neutral' && 'badge-neutral',
					filter.variant === 'info' && 'badge-info',
					filter.variant === 'success' && 'badge-success',
					filter.variant === 'warning' && 'badge-warning',
					filter.variant === 'error' && 'badge-error',
					filter.variant === 'ghost' && 'badge-ghost',
					!filter.variant && 'badge-neutral',
					(disabled || loading) && 'pointer-events-none cursor-not-allowed opacity-60',
					size === 'xs' ? 'px-1.5 py-0.5' : size === 'sm' ? 'px-2 py-1' : 'px-3 py-1.5'
				]
					.filter(Boolean)
					.join(' ')}
				role="listitem"
			>
				<Text size={textSize} class="whitespace-nowrap">
					<Text weight="semibold" size={textSize}>{filter.label}:</Text>
					{filter.value}
				</Text>
				{#if onRemove && !disabled && !loading}
					<IconButton
						variant="ghost"
						size={iconButtonSize}
						circle
						onclick={() => onRemove?.(filter.id)}
						ariaLabel={removeFilterAriaLabelFormat.replace('{label}', filter.label)}
						class="hover:bg-base-content/20 flex h-auto min-h-0 items-center justify-center p-0.5"
					>
						<Icon size="xs" ariaHidden={true}>
							<X />
						</Icon>
					</IconButton>
				{/if}
			</div>
		{/each}

		{#if filters.length > 0 && onClearAll && !disabled && !loading}
			<Button
				variant="ghost"
				size={size === 'xs' || size === 'sm' ? 'xs' : 'sm'}
				onclick={onClearAll}
				ariaLabel={clearAllLabel}
				class="h-auto min-h-0 px-2 underline-offset-4 hover:underline"
			>
				<Text size={textSize} variant="primary" weight="medium">
					{clearAllLabel}
				</Text>
			</Button>
		{/if}
	{/if}
</div>
