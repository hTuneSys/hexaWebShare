<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Badge from '../media/Badge.svelte';
	import Text from '../typography/Text.svelte';
	import Link from '../typography/Link.svelte';
	import Button from '../buttons/Button.svelte';

	/**
	 * List item data structure for programmatic rendering
	 */
	export interface ListItemData {
		id: string | number;
		label: string;
		description?: string;
		icon?: string;
		disabled?: boolean;
		active?: boolean;
		href?: string;
		badge?: string;
		badgeVariant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
	}

	interface Props {
		/**
		 * Array of list items to render programmatically
		 */
		items?: ListItemData[];
		/**
		 * Visual variant of the list
		 * @default 'default'
		 */
		variant?: 'default' | 'bordered' | 'hoverable' | 'striped';
		/**
		 * Size preset for the list items
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Display as ordered list (numbered)
		 * @default false
		 */
		ordered?: boolean;
		/**
		 * Disable all list items
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Horizontal list layout
		 * @default false
		 */
		horizontal?: boolean;
		/**
		 * Allow compact spacing between items
		 * @default false
		 */
		compact?: boolean;
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
		 * Callback when an item is clicked
		 */
		onItemClick?: (item: ListItemData, index: number) => void;
		/**
		 * Callback when an item is selected via keyboard
		 */
		onItemSelect?: (item: ListItemData, index: number) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		items = [],
		variant = 'default',
		size = 'md',
		ordered = false,
		disabled = false,
		horizontal = false,
		compact = false,
		ariaLabel,
		ariaLabelledby,
		children,
		onItemClick,
		onItemSelect,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID for accessibility
	const listId = crypto.randomUUID?.() ?? `list-${Math.random().toString(36).slice(2, 9)}`;

	// Track focused item index for keyboard navigation
	let focusedIndex = $state(-1);

	// Computed list classes
	let listClasses = $derived(
		[
			'menu',
			horizontal ? 'menu-horizontal' : 'menu-vertical',
			compact && 'menu-compact',
			size === 'sm' && 'menu-sm',
			size === 'md' && 'menu-md',
			size === 'lg' && 'menu-lg',
			variant === 'bordered' && 'rounded-box border border-base-300 bg-base-100',
			variant === 'striped' && 'divide-y divide-base-200',
			disabled && 'pointer-events-none opacity-60',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Compute item classes based on state
	const getItemClasses = (item: ListItemData, index: number) =>
		[
			variant === 'hoverable' && 'hover:bg-base-200',
			item.active && 'active',
			item.disabled && 'disabled',
			focusedIndex === index && 'focus'
		]
			.filter(Boolean)
			.join(' ');

	// Handle item click
	const handleItemClick = (item: ListItemData, index: number) => {
		if (item.disabled || disabled) return;
		onItemClick?.(item, index);
	};

	// Handle keyboard navigation
	const handleKeyDown = (event: KeyboardEvent, item: ListItemData, index: number) => {
		if (disabled || item.disabled) return;

		const enabledItems = items.filter((i) => !i.disabled);
		const currentEnabledIndex = enabledItems.findIndex((i) => i.id === item.id);

		switch (event.key) {
			case 'ArrowDown':
			case 'ArrowRight': {
				event.preventDefault();
				const nextIndex = (currentEnabledIndex + 1) % enabledItems.length;
				const nextItem = enabledItems[nextIndex];
				const nextRealIndex = items.findIndex((i) => i.id === nextItem.id);
				focusedIndex = nextRealIndex;
				focusItem(nextRealIndex);
				break;
			}
			case 'ArrowUp':
			case 'ArrowLeft': {
				event.preventDefault();
				const prevIndex = (currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length;
				const prevItem = enabledItems[prevIndex];
				const prevRealIndex = items.findIndex((i) => i.id === prevItem.id);
				focusedIndex = prevRealIndex;
				focusItem(prevRealIndex);
				break;
			}
			case 'Home': {
				event.preventDefault();
				const firstItem = enabledItems[0];
				const firstRealIndex = items.findIndex((i) => i.id === firstItem.id);
				focusedIndex = firstRealIndex;
				focusItem(firstRealIndex);
				break;
			}
			case 'End': {
				event.preventDefault();
				const lastItem = enabledItems[enabledItems.length - 1];
				const lastRealIndex = items.findIndex((i) => i.id === lastItem.id);
				focusedIndex = lastRealIndex;
				focusItem(lastRealIndex);
				break;
			}
			case 'Enter':
			case ' ': {
				event.preventDefault();
				onItemSelect?.(item, index);
				onItemClick?.(item, index);
				break;
			}
		}
	};

	// Focus a specific item by index
	const focusItem = (index: number) => {
		const element = document.getElementById(`${listId}-item-${index}`);
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

{#if ordered}
	<ol
		id={listId}
		class={listClasses}
		role="list"
		aria-label={ariaLabel}
		aria-labelledby={ariaLabelledby}
		aria-disabled={disabled}
		{...props}
	>
		{#if children}
			{@render children()}
		{:else}
			{#each items as item, index (item.id)}
				<li class={getItemClasses(item, index)}>
					{#if item.href && !item.disabled}
						<Link
							href={item.href}
							class="flex items-center justify-between gap-2"
							disabled={item.disabled}
							ariaLabel={item.label}
							onclick={() => handleItemClick(item, index)}
							{...{
								id: `${listId}-item-${index}`,
								tabindex: item.disabled ? -1 : 0,
								onkeydown: (e: KeyboardEvent) => handleKeyDown(e, item, index),
								onfocus: () => handleFocus(index),
								onblur: handleBlur
							}}
						>
							<span class="flex items-center gap-2">
								{#if item.icon}
									<span class="text-lg" aria-hidden="true">{item.icon}</span>
								{/if}
								<span class="flex flex-col">
									<Text text={item.label} />
									{#if item.description}
										<Text text={item.description} size="xs" variant="muted" />
									{/if}
								</span>
							</span>
							{#if item.badge}
								<Badge label={item.badge} variant={item.badgeVariant ?? 'neutral'} size="sm" />
							{/if}
						</Link>
					{:else}
						<Button
							variant="ghost"
							disabled={item.disabled || disabled}
							ariaLabel={item.label}
							onclick={() => handleItemClick(item, index)}
							onkeydown={(e) => handleKeyDown(e, item, index)}
							class="flex w-full items-center justify-between gap-2 text-left"
							{...{
								id: `${listId}-item-${index}`,
								tabindex: item.disabled ? -1 : 0,
								'aria-disabled': item.disabled || disabled,
								onfocus: () => handleFocus(index),
								onblur: handleBlur
							}}
						>
							<span class="flex items-center gap-2">
								{#if item.icon}
									<span class="text-lg" aria-hidden="true">{item.icon}</span>
								{/if}
								<span class="flex flex-col">
									<Text text={item.label} />
									{#if item.description}
										<Text text={item.description} size="xs" variant="muted" />
									{/if}
								</span>
							</span>
							{#if item.badge}
								<Badge label={item.badge} variant={item.badgeVariant ?? 'neutral'} size="sm" />
							{/if}
						</Button>
					{/if}
				</li>
			{/each}
		{/if}
	</ol>
{:else}
	<ul
		id={listId}
		class={listClasses}
		role="list"
		aria-label={ariaLabel}
		aria-labelledby={ariaLabelledby}
		aria-disabled={disabled}
		{...props}
	>
		{#if children}
			{@render children()}
		{:else}
			{#each items as item, index (item.id)}
				<li class={getItemClasses(item, index)}>
					{#if item.href && !item.disabled}
						<Link
							href={item.href}
							class="flex items-center justify-between gap-2"
							disabled={item.disabled}
							ariaLabel={item.label}
							onclick={() => handleItemClick(item, index)}
							{...{
								id: `${listId}-item-${index}`,
								tabindex: item.disabled ? -1 : 0,
								onkeydown: (e: KeyboardEvent) => handleKeyDown(e, item, index),
								onfocus: () => handleFocus(index),
								onblur: handleBlur
							}}
						>
							<span class="flex items-center gap-2">
								{#if item.icon}
									<span class="text-lg" aria-hidden="true">{item.icon}</span>
								{/if}
								<span class="flex flex-col">
									<Text text={item.label} />
									{#if item.description}
										<Text text={item.description} size="xs" variant="muted" />
									{/if}
								</span>
							</span>
							{#if item.badge}
								<Badge label={item.badge} variant={item.badgeVariant ?? 'neutral'} size="sm" />
							{/if}
						</Link>
					{:else}
						<Button
							variant="ghost"
							disabled={item.disabled || disabled}
							ariaLabel={item.label}
							onclick={() => handleItemClick(item, index)}
							onkeydown={(e) => handleKeyDown(e, item, index)}
							class="flex w-full items-center justify-between gap-2 text-left"
							{...{
								id: `${listId}-item-${index}`,
								tabindex: item.disabled ? -1 : 0,
								'aria-disabled': item.disabled || disabled,
								onfocus: () => handleFocus(index),
								onblur: handleBlur
							}}
						>
							<span class="flex items-center gap-2">
								{#if item.icon}
									<span class="text-lg" aria-hidden="true">{item.icon}</span>
								{/if}
								<span class="flex flex-col">
									<Text text={item.label} />
									{#if item.description}
										<Text text={item.description} size="xs" variant="muted" />
									{/if}
								</span>
							</span>
							{#if item.badge}
								<Badge label={item.badge} variant={item.badgeVariant ?? 'neutral'} size="sm" />
							{/if}
						</Button>
					{/if}
				</li>
			{/each}
		{/if}
	</ul>
{/if}
