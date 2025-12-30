<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Dropdown item interface for programmatic rendering
	 */
	export interface DropdownItem {
		/**
		 * Unique identifier for the item
		 */
		id: string | number;
		/**
		 * Label text displayed in the item
		 */
		label: string;
		/**
		 * Optional description or subtitle
		 */
		description?: string;
		/**
		 * Optional icon (emoji or icon identifier)
		 */
		icon?: string;
		/**
		 * Whether the item is disabled
		 * @default false
		 */
		disabled?: boolean;
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
	 * Props interface for Dropdown component
	 */
	export interface Props {
		/**
		 * Array of dropdown items to render programmatically
		 */
		items?: DropdownItem[];
		/**
		 * Custom trigger content
		 */
		trigger?: Snippet;
		/**
		 * Custom dropdown content (replaces items)
		 */
		children?: Snippet;
		/**
		 * Label for default trigger button
		 * @default 'Dropdown'
		 */
		label?: string;
		/**
		 * Position of dropdown content relative to trigger
		 * @default 'bottom'
		 */
		position?: 'bottom' | 'top' | 'left' | 'right';
		/**
		 * Alignment of dropdown content
		 * @default 'start'
		 */
		align?: 'start' | 'end';
		/**
		 * Controlled open state
		 */
		open?: boolean;
		/**
		 * Default open state for uncontrolled mode
		 * @default false
		 */
		defaultOpen?: boolean;
		/**
		 * Whether to close dropdown when an item is selected
		 * @default true
		 */
		closeOnSelect?: boolean;
		/**
		 * Whether to close dropdown when clicking outside
		 * @default true
		 */
		closeOnOutsideClick?: boolean;
		/**
		 * Whether to close dropdown when pressing Escape
		 * @default true
		 */
		closeOnEscape?: boolean;
		/**
		 * Whether to open dropdown on hover
		 * @default false
		 */
		hover?: boolean;
		/**
		 * Visual variant of the dropdown
		 * @default 'default'
		 */
		variant?: 'default' | 'bordered' | 'ghost';
		/**
		 * Size preset for the dropdown
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Disable the dropdown
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the dropdown is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Accessible label for the dropdown
		 */
		ariaLabel?: string;
		/**
		 * Callback when open state changes
		 */
		onOpenChange?: (open: boolean) => void;
		/**
		 * Callback when an item is clicked
		 */
		onItemClick?: (item: DropdownItem, index: number) => void;
		/**
		 * Additional CSS classes for the container
		 * @default ''
		 */
		class?: string;
		/**
		 * Additional CSS classes for the content
		 * @default ''
		 */
		contentClass?: string;
		/**
		 * Additional CSS classes for the trigger
		 * @default ''
		 */
		triggerClass?: string;
	}

	const {
		items = [],
		trigger,
		children,
		label = 'Dropdown',
		position = 'bottom',
		align = 'start',
		open,
		defaultOpen = false,
		closeOnSelect = true,
		closeOnOutsideClick = true,
		closeOnEscape = true,
		hover = false,
		variant = 'default',
		size = 'md',
		disabled = false,
		loading = false,
		ariaLabel,
		onOpenChange,
		onItemClick,
		class: className = '',
		contentClass = '',
		triggerClass = '',
		...props
	}: Props = $props();

	// Controlled vs uncontrolled mode
	const isControlled = open !== undefined;
	let internalOpen = $state(defaultOpen);

	// Compute actual open state
	let isOpen = $derived(isControlled ? (open ?? false) : internalOpen);

	// Generate unique ID for accessibility
	const dropdownId = crypto.randomUUID?.() ?? `dropdown-${Math.random().toString(36).slice(2, 9)}`;
	const contentId = `${dropdownId}-content`;

	// Element refs
	let dropdownElement = $state<HTMLDetailsElement | null>(null);

	// Track focused item index for keyboard navigation
	let focusedIndex = $state(-1);

	// Set open state
	function setOpen(next: boolean) {
		if (disabled || loading) return;
		if (!isControlled) {
			internalOpen = next;
		}
		onOpenChange?.(next);
		if (!next) {
			focusedIndex = -1;
		}
	}

	// Toggle open state
	function toggleOpen() {
		setOpen(!isOpen);
	}

	// Handle toggle event from details element
	function handleToggle(event: Event) {
		const details = event.target as HTMLDetailsElement;
		if (!isControlled) {
			internalOpen = details.open;
		}
		onOpenChange?.(details.open);
	}

	// Handle item click
	function handleItemClick(item: DropdownItem, index: number) {
		if (item.disabled || disabled || loading) return;
		onItemClick?.(item, index);
		item.onClick?.();
		if (closeOnSelect && dropdownElement) {
			dropdownElement.open = false;
			setOpen(false);
		}
	}

	// Handle item keydown
	function handleItemKeydown(event: KeyboardEvent, item: DropdownItem, index: number) {
		if (disabled || item.disabled || loading) return;

		const enabledItems = items.filter((i) => !i.disabled);
		const currentEnabledIndex = enabledItems.findIndex((i) => i.id === item.id);

		switch (event.key) {
			case 'ArrowDown': {
				event.preventDefault();
				const nextIndex = (currentEnabledIndex + 1) % enabledItems.length;
				const nextItem = enabledItems[nextIndex];
				const nextRealIndex = items.findIndex((i) => i.id === nextItem.id);
				focusedIndex = nextRealIndex;
				focusItem(nextRealIndex);
				break;
			}
			case 'ArrowUp': {
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
			case 'Escape': {
				event.preventDefault();
				if (closeOnEscape && dropdownElement) {
					dropdownElement.open = false;
					setOpen(false);
				}
				break;
			}
			case 'Tab': {
				if (dropdownElement) {
					dropdownElement.open = false;
					setOpen(false);
				}
				break;
			}
		}
	}

	// Focus a specific item by index
	function focusItem(index: number) {
		const element = document.getElementById(`${dropdownId}-item-${index}`);
		element?.focus();
	}

	// Handle focus events
	function handleItemFocus(index: number) {
		focusedIndex = index;
	}

	function handleItemBlur() {
		focusedIndex = -1;
	}

	// Close with Escape key on summary
	function handleSummaryKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && closeOnEscape && dropdownElement?.open) {
			event.preventDefault();
			dropdownElement.open = false;
			setOpen(false);
		}
	}

	// Handle click outside
	$effect(() => {
		if (!closeOnOutsideClick) return;

		function handleClickOutside(event: MouseEvent) {
			if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
				if (dropdownElement.open) {
					dropdownElement.open = false;
					setOpen(false);
				}
			}
		}

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	// Sync controlled open state
	$effect(() => {
		if (isControlled && dropdownElement) {
			dropdownElement.open = open ?? false;
		}
	});

	// Sync defaultOpen on mount
	$effect(() => {
		if (defaultOpen && dropdownElement && !isControlled) {
			dropdownElement.open = true;
		}
	});

	// Computed classes
	let dropdownClasses = $derived(
		[
			'dropdown',
			position === 'top' && 'dropdown-top',
			position === 'left' && 'dropdown-left',
			position === 'right' && 'dropdown-right',
			align === 'end' && 'dropdown-end',
			hover && 'dropdown-hover',
			disabled && 'opacity-60 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	let triggerClasses = $derived(
		[
			'btn',
			variant === 'bordered' && 'btn-outline',
			variant === 'ghost' && 'btn-ghost',
			size === 'sm' && 'btn-sm',
			size === 'md' && 'btn-md',
			size === 'lg' && 'btn-lg',
			disabled && 'btn-disabled',
			triggerClass
		]
			.filter(Boolean)
			.join(' ')
	);

	let contentClasses = $derived(
		[
			'dropdown-content',
			'menu',
			'bg-base-100',
			'rounded-box',
			'z-50',
			'shadow-lg',
			'border',
			'border-base-300',
			size === 'sm' && 'p-1 min-w-40',
			size === 'md' && 'p-2 min-w-48',
			size === 'lg' && 'p-3 min-w-56',
			contentClass
		]
			.filter(Boolean)
			.join(' ')
	);

	// Item classes helper
	function getItemClasses(item: DropdownItem, index: number) {
		return [
			item.disabled && 'disabled opacity-50 pointer-events-none',
			focusedIndex === index && 'focus'
		]
			.filter(Boolean)
			.join(' ');
	}
</script>

<details bind:this={dropdownElement} class={dropdownClasses} ontoggle={handleToggle} {...props}>
	<!-- Trigger -->
	<summary
		class={trigger ? triggerClass : triggerClasses}
		aria-haspopup="menu"
		aria-controls={contentId}
		aria-label={ariaLabel || label}
		aria-disabled={disabled}
		onkeydown={handleSummaryKeydown}
	>
		{#if loading}
			<span class="loading loading-spinner loading-sm" aria-hidden="true"></span>
		{/if}
		{#if trigger}
			{@render trigger()}
		{:else}
			{label}
			<svg
				class="h-4 w-4 transition-transform"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		{/if}
	</summary>

	<!-- Content -->
	<div
		id={contentId}
		class={contentClasses}
		role="menu"
		aria-orientation="vertical"
		aria-labelledby={dropdownId}
	>
		{#if children}
			{@render children()}
		{:else if loading}
			<div class="flex items-center justify-center p-4">
				<span class="loading loading-spinner loading-md text-primary" aria-label="Loading"></span>
			</div>
		{:else}
			<ul>
				{#each items as item, index (item.id)}
					<li class={getItemClasses(item, index)}>
						{#if item.href && !item.disabled}
							<a
								id="{dropdownId}-item-{index}"
								href={item.href}
								class="flex items-center gap-2"
								tabindex={item.disabled ? -1 : 0}
								role="menuitem"
								aria-disabled={item.disabled}
								onclick={() => handleItemClick(item, index)}
								onkeydown={(e) => handleItemKeydown(e, item, index)}
								onfocus={() => handleItemFocus(index)}
								onblur={handleItemBlur}
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
								id="{dropdownId}-item-{index}"
								class="flex w-full items-center gap-2 text-left"
								tabindex={item.disabled ? -1 : 0}
								disabled={item.disabled || disabled}
								role="menuitem"
								aria-disabled={item.disabled || disabled}
								onclick={() => handleItemClick(item, index)}
								onkeydown={(e) => handleItemKeydown(e, item, index)}
								onfocus={() => handleItemFocus(index)}
								onblur={handleItemBlur}
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
			</ul>
		{/if}
	</div>
</details>
