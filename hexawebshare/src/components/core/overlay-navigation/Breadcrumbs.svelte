<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	/**
	 * Breadcrumb item data structure
	 */
	export interface BreadcrumbItem {
		/**
		 * Unique identifier for the breadcrumb item
		 */
		id?: string | number;
		/**
		 * Display label for the breadcrumb item
		 */
		label: string;
		/**
		 * URL or path for the breadcrumb link
		 */
		href?: string;
		/**
		 * Icon to display before the label
		 */
		icon?: string;
		/**
		 * Whether this item is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether this item is the current page
		 * @default false
		 */
		current?: boolean;
		/**
		 * Callback when item is clicked
		 */
		onclick?: (item: BreadcrumbItem, index: number) => void;
	}
</script>

<script lang="ts">
	import Link from '../typography/Link.svelte';
	import Button from '../buttons/Button.svelte';
	import Text from '../typography/Text.svelte';

	/**
	 * Props interface for the Breadcrumbs component
	 */
	interface Props {
		/**
		 * Array of breadcrumb items to display
		 */
		items: BreadcrumbItem[];
		/**
		 * Custom separator between breadcrumb items
		 * @default '/'
		 */
		separator?: string;
		/**
		 * Size variant of the breadcrumbs
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Color variant of the breadcrumbs
		 * @default 'neutral'
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
		 * Whether the breadcrumbs are disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the breadcrumbs are in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Accessible label for the breadcrumbs navigation
		 * @default 'Breadcrumb navigation'
		 */
		ariaLabel?: string;
		/**
		 * ID of the element that labels this breadcrumbs
		 */
		ariaLabelledby?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		items,
		separator = '/',
		size = 'md',
		variant = 'neutral',
		disabled = false,
		loading = false,
		ariaLabel = 'Breadcrumb navigation',
		ariaLabelledby,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID for accessibility
	const breadcrumbsId =
		crypto.randomUUID?.() ?? `breadcrumbs-${Math.random().toString(36).slice(2, 9)}`;

	// Computed container classes
	let containerClasses = $derived(
		[
			'hb-breadcrumbs',
			size === 'xs' && 'text-xs',
			size === 'sm' && 'text-sm',
			size === 'md' && 'text-base',
			size === 'lg' && 'text-lg',
			disabled && 'opacity-50 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Get item classes based on variant and state
	const getItemClasses = (item: BreadcrumbItem, index: number, isLast: boolean): string => {
		const isDisabled = item.disabled || disabled;
		const isCurrent = item.current !== undefined ? item.current : isLast;

		return [
			'inline-flex items-center gap-1',
			isCurrent && 'font-semibold',
			isDisabled && 'cursor-not-allowed pointer-events-none opacity-50'
		]
			.filter(Boolean)
			.join(' ');
	};

	// Handle item click
	const handleItemClick = (item: BreadcrumbItem, index: number) => {
		if (item.disabled || disabled || loading) return;
		item.onclick?.(item, index);
	};

	// Handle keyboard navigation
	const handleKeyDown = (event: KeyboardEvent, item: BreadcrumbItem, index: number) => {
		if (item.disabled || disabled || loading) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleItemClick(item, index);
		}
	};

	// Get ARIA attributes for item
	const getItemAriaAttributes = (item: BreadcrumbItem, index: number, isLast: boolean) => {
		const isDisabled = item.disabled || disabled;
		const isCurrent = item.current !== undefined ? item.current : isLast;

		return {
			'aria-current': (isCurrent ? 'page' : undefined) as 'page' | undefined,
			'aria-disabled': isDisabled || false,
			'aria-label': item.label,
			role: 'listitem'
		};
	};

	// Determine if item is last (current page)
	const isLastItem = (index: number): boolean => {
		return index === items.length - 1;
	};

	// Map Breadcrumbs size to Text component size
	const textSize = $derived(size === 'md' ? 'base' : size);
</script>

<nav
	id={breadcrumbsId}
	class={containerClasses}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	{...props}
>
	<ul class="flex flex-wrap items-center gap-2 list-none p-0 m-0 sm:gap-1" role="list">
		{#each items as item, index (item.id ?? index)}
			{@const isLast = isLastItem(index)}
			{@const itemClasses = getItemClasses(item, index, isLast)}
			{@const ariaAttrs = getItemAriaAttributes(item, index, isLast)}
			<li class={itemClasses} {...ariaAttrs}>
				{#if item.href && !item.disabled && !disabled && !loading && !isLast}
					<Link
						href={item.href}
						class="inline-flex items-center gap-1 no-underline transition-opacity hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:rounded"
						{size}
						ariaLabel={item.label}
						aria-disabled={item.disabled || disabled || false}
						tabindex={item.disabled || disabled || loading ? -1 : 0}
						disabled={item.disabled || disabled || loading}
						onclick={(e) => {
							if (item.onclick) {
								e.preventDefault();
								handleItemClick(item, index);
							}
						}}
						onkeydown={(e: KeyboardEvent) => handleKeyDown(e, item, index)}
					>
						{#if item.icon}
							<Text
								ariaHidden={true}
								class="inline-flex items-center justify-center"
								text={item.icon}
								size={textSize}
								{loading}
							/>
						{/if}
						<Text text={item.label} class="inline-block" size={textSize} {loading} />
					</Link>
				{:else if item.onclick && !item.disabled && !disabled && !loading && !isLast}
					<Button
						variant="ghost"
						{size}
						class="inline-flex items-center gap-1 transition-opacity hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:rounded"
						ariaLabel={item.label}
						aria-disabled={item.disabled || disabled || false}
						tabindex={item.disabled || disabled || loading ? -1 : 0}
						disabled={item.disabled || disabled || loading}
						onclick={() => handleItemClick(item, index)}
						onkeydown={(e: KeyboardEvent) => handleKeyDown(e, item, index)}
					>
						{#if item.icon}
							<Text
								ariaHidden={true}
								class="inline-flex items-center justify-center"
								text={item.icon}
								size={textSize}
								{loading}
							/>
						{/if}
						<Text text={item.label} class="inline-block" size={textSize} {loading} />
					</Button>
				{:else}
					<Text
						class="inline-flex items-center gap-1"
						size={textSize}
						{loading}
						{...isLast ? { 'aria-current': 'page', weight: 'semibold' } : {}}
					>
						{#if item.icon}
							<Text
								ariaHidden={true}
								class="inline-flex items-center justify-center"
								text={item.icon}
								size={textSize}
								{loading}
							/>
						{/if}
						<Text text={item.label} class="inline-block" size={textSize} {loading} />
					</Text>
				{/if}
			</li>
			{#if !isLast}
				<li class="inline-flex items-center text-base-content/50 mx-0.5 sm:mx-0" aria-hidden="true">
					<Text text={separator} class="select-none" size={textSize} {loading} />
				</li>
			{/if}
		{/each}
	</ul>
</nav>
