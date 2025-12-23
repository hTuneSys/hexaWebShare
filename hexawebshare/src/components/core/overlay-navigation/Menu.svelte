<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Menu item interface for programmatic rendering
	 */
	export interface MenuItem {
		/**
		 * Unique identifier for the menu item
		 */
		id: string | number;
		/**
		 * Label text displayed in the menu item
		 */
		label: string;
		/**
		 * Optional description or subtitle
		 */
		description?: string;
		/**
		 * Optional icon identifier (emoji or icon class)
		 */
		icon?: string;
		/**
		 * Whether the item is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the item is active/selected
		 * @default false
		 */
		active?: boolean;
		/**
		 * Whether to show a divider after this item
		 * @default false
		 */
		divider?: boolean;
		/**
		 * Optional href for link items
		 */
		href?: string;
		/**
		 * Click handler function
		 */
		onClick?: () => void;
	}

	/**
	 * Props interface for Menu component
	 */
	interface Props {
		/**
		 * Array of menu items to render programmatically
		 */
		items?: MenuItem[];
		/**
		 * Visual variant of the menu
		 * @default 'default'
		 */
		variant?: 'default' | 'bordered' | 'compact';
		/**
		 * Size preset for the menu items
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Menu orientation
		 * @default 'vertical'
		 */
		orientation?: 'horizontal' | 'vertical';
		/**
		 * Disable all menu items
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Accessible label for the menu
		 */
		ariaLabel?: string;
		/**
		 * ID of the element that labels this menu
		 */
		ariaLabelledby?: string;
		/**
		 * Custom slot content for rendering items manually
		 */
		children?: Snippet;
		/**
		 * Callback when an item is clicked
		 */
		onItemClick?: (item: MenuItem, index: number) => void;
		/**
		 * Additional CSS classes
		 * @default ''
		 */
		class?: string;
	}

	const {
		items = [],
		variant = 'default',
		size = 'md',
		orientation = 'vertical',
		disabled = false,
		ariaLabel,
		ariaLabelledby,
		children,
		onItemClick,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID for accessibility
	const menuId = crypto.randomUUID?.() ?? `menu-${Math.random().toString(36).slice(2, 9)}`;

	// Track focused item index for keyboard navigation
	let focusedIndex = $state(-1);

	// Computed menu classes
	let menuClasses = $derived(
		[
			'menu',
			orientation === 'horizontal' ? 'menu-horizontal' : 'menu-vertical',
			variant === 'compact' && 'menu-compact',
			size === 'sm' && 'menu-sm',
			size === 'md' && 'menu-md',
			size === 'lg' && 'menu-lg',
			variant === 'bordered' && 'rounded-box border border-base-300 bg-base-100 p-2',
			disabled && 'pointer-events-none opacity-60',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Compute item classes based on state
	const getItemClasses = (item: MenuItem, index: number) =>
		[item.active && 'active', item.disabled && 'disabled', focusedIndex === index && 'focus']
			.filter(Boolean)
			.join(' ');

	// Handle item click
	const handleItemClick = (item: MenuItem, index: number) => {
		if (item.disabled || disabled) return;
		onItemClick?.(item, index);
		if (item.onClick) {
			item.onClick();
		}
	};

	// Handle keyboard navigation
	const handleKeyDown = (event: KeyboardEvent, item: MenuItem, index: number) => {
		if (disabled || item.disabled) return;

		const enabledItems = items.filter((i) => !i.disabled);
		const currentEnabledIndex = enabledItems.findIndex((i) => i.id === item.id);

		switch (event.key) {
			case 'ArrowDown': {
				if (orientation === 'vertical') {
					event.preventDefault();
					const nextIndex = (currentEnabledIndex + 1) % enabledItems.length;
					const nextItem = enabledItems[nextIndex];
					const nextRealIndex = items.findIndex((i) => i.id === nextItem.id);
					focusedIndex = nextRealIndex;
					focusItem(nextRealIndex);
				}
				break;
			}
			case 'ArrowUp': {
				if (orientation === 'vertical') {
					event.preventDefault();
					const prevIndex = (currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length;
					const prevItem = enabledItems[prevIndex];
					const prevRealIndex = items.findIndex((i) => i.id === prevItem.id);
					focusedIndex = prevRealIndex;
					focusItem(prevRealIndex);
				}
				break;
			}
			case 'ArrowRight': {
				if (orientation === 'horizontal') {
					event.preventDefault();
					const nextIndex = (currentEnabledIndex + 1) % enabledItems.length;
					const nextItem = enabledItems[nextIndex];
					const nextRealIndex = items.findIndex((i) => i.id === nextItem.id);
					focusedIndex = nextRealIndex;
					focusItem(nextRealIndex);
				}
				break;
			}
			case 'ArrowLeft': {
				if (orientation === 'horizontal') {
					event.preventDefault();
					const prevIndex = (currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length;
					const prevItem = enabledItems[prevIndex];
					const prevRealIndex = items.findIndex((i) => i.id === prevItem.id);
					focusedIndex = prevRealIndex;
					focusItem(prevRealIndex);
				}
				break;
			}
			case 'Home': {
				event.preventDefault();
				const firstItem = enabledItems[0];
				if (firstItem) {
					const firstRealIndex = items.findIndex((i) => i.id === firstItem.id);
					focusedIndex = firstRealIndex;
					focusItem(firstRealIndex);
				}
				break;
			}
			case 'End': {
				event.preventDefault();
				const lastItem = enabledItems[enabledItems.length - 1];
				if (lastItem) {
					const lastRealIndex = items.findIndex((i) => i.id === lastItem.id);
					focusedIndex = lastRealIndex;
					focusItem(lastRealIndex);
				}
				break;
			}
			case 'Enter':
			case ' ': {
				event.preventDefault();
				handleItemClick(item, index);
				break;
			}
		}
	};

	// Focus a specific item by index
	const focusItem = (index: number) => {
		const element = document.getElementById(`${menuId}-item-${index}`);
		if (element) {
			element.focus();
		}
	};

	// Handle focus events
	const handleFocus = (index: number) => {
		focusedIndex = index;
	};

	const handleBlur = () => {
		focusedIndex = -1;
	};
</script>

<ul
	id={menuId}
	class={menuClasses}
	role="menu"
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	aria-orientation={orientation}
	aria-disabled={disabled}
	{...props}
>
	{#if children}
		{@render children()}
	{:else}
		{#each items as item, index (item.id)}
			<li class={getItemClasses(item, index)}>
				{#if item.href && !item.disabled}
					<a
						id="{menuId}-item-{index}"
						href={item.href}
						class="flex items-center gap-2"
						tabindex={item.disabled ? -1 : 0}
						aria-disabled={item.disabled}
						onclick={() => handleItemClick(item, index)}
						onkeydown={(e) => handleKeyDown(e, item, index)}
						onfocus={() => handleFocus(index)}
						onblur={handleBlur}
					>
						{#if item.icon}
							<span class="text-lg" aria-hidden="true">{item.icon}</span>
						{/if}
						<span class="flex flex-col">
							<span>{item.label}</span>
							{#if item.description}
								<span class="text-xs opacity-60">{item.description}</span>
							{/if}
						</span>
					</a>
				{:else}
					<button
						type="button"
						id="{menuId}-item-{index}"
						class="flex w-full items-center gap-2 text-left"
						tabindex={item.disabled ? -1 : 0}
						disabled={item.disabled || disabled}
						aria-disabled={item.disabled || disabled}
						onclick={() => handleItemClick(item, index)}
						onkeydown={(e) => handleKeyDown(e, item, index)}
						onfocus={() => handleFocus(index)}
						onblur={handleBlur}
					>
						{#if item.icon}
							<span class="text-lg" aria-hidden="true">{item.icon}</span>
						{/if}
						<span class="flex flex-col">
							<span>{item.label}</span>
							{#if item.description}
								<span class="text-xs opacity-60">{item.description}</span>
							{/if}
						</span>
					</button>
				{/if}
			</li>
			{#if item.divider && index < items.length - 1}
				<div class="divider my-1" role="separator" aria-orientation="horizontal"></div>
			{/if}
		{/each}
	{/if}
</ul>
