<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '../buttons/Button.svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import Link from '../typography/Link.svelte';
	import Badge from '../media/Badge.svelte';
	import Heading from '../typography/Heading.svelte';
	import Text from '../typography/Text.svelte';

	/**
	 * Sidebar item interface for menu items
	 */
	export interface SidebarItem {
		/**
		 * Unique identifier for the item
		 */
		id: string;
		/**
		 * Label text displayed in the item
		 */
		label: string;
		/**
		 * Optional icon (emoji or icon identifier)
		 */
		icon?: string;
		/**
		 * Optional href for navigation links
		 */
		href?: string;
		/**
		 * Click handler function
		 */
		onClick?: () => void;
		/**
		 * Whether the item is currently active/selected
		 * @default false
		 */
		active?: boolean;
		/**
		 * Whether the item is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Optional badge text or count
		 */
		badge?: string | number;
		/**
		 * Badge color variant
		 * @default 'primary'
		 */
		badgeVariant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
	}

	/**
	 * Props interface for Sidebar component
	 */
	export interface Props {
		/**
		 * Array of sidebar items
		 */
		items?: SidebarItem[];
		/**
		 * Title displayed at the top of the sidebar
		 */
		title?: string;
		/**
		 * Subtitle displayed below the title
		 */
		subtitle?: string;
		/**
		 * Visual variant of the sidebar
		 * @default 'default'
		 */
		variant?: 'default' | 'compact' | 'bordered';
		/**
		 * Size preset for the sidebar items
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Width of the sidebar
		 * @default 'default'
		 */
		width?: 'narrow' | 'default' | 'wide';
		/**
		 * Whether the sidebar is collapsed (shows only icons)
		 * @default false
		 */
		collapsed?: boolean;
		/**
		 * Whether the sidebar can be collapsed
		 * @default false
		 */
		collapsible?: boolean;
		/**
		 * Whether the sidebar is sticky
		 * @default false
		 */
		sticky?: boolean;
		/**
		 * Disable all sidebar items
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the sidebar is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Accessible label for the sidebar
		 */
		ariaLabel?: string;
		/**
		 * Callback when an item is clicked
		 */
		onItemClick?: (item: SidebarItem, index: number) => void;
		/**
		 * Callback when collapse state changes
		 */
		onCollapse?: (collapsed: boolean) => void;
		/**
		 * Custom header content
		 */
		header?: Snippet;
		/**
		 * Custom footer content
		 */
		footer?: Snippet;
		/**
		 * Custom children content (replaces items)
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes
		 * @default ''
		 */
		class?: string;
	}

	/**
	 * Helper function to calculate item classes
	 */
	const getItemClasses = (
		item: SidebarItem,
		index: number,
		focusedIndex: number,
		variant: string,
		size: string
	) => {
		const sizeClasses = {
			sm: 'text-sm px-2 py-1 gap-2',
			md: 'text-base px-3 py-2 gap-3',
			lg: 'text-lg px-4 py-3 gap-4'
		};

		const densityClasses = variant === 'compact' ? 'px-2 py-1 gap-1.5' : '';

		return [
			'flex',
			'w-full',
			'items-center',
			sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.md,
			densityClasses,
			'rounded-lg',
			'transition-all',
			'duration-200',
			'cursor-pointer',
			'hover:bg-base-300',
			'min-w-0', // Critical for truncation
			item.active && 'bg-primary text-primary-content hover:bg-primary/90 shadow-sm',
			item.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
			focusedIndex === index && !item.active && 'bg-base-300'
		]
			.filter(Boolean)
			.join(' ');
	};

	let {
		items = [],
		title,
		subtitle,
		variant = 'default',
		size = 'md',
		width = 'default',
		collapsed = $bindable(false),
		collapsible = false,
		sticky = false,
		disabled = false,
		loading = false,
		ariaLabel,
		onItemClick,
		onCollapse,
		header,
		footer,
		children,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID for accessibility
	const sidebarId = crypto.randomUUID?.() ?? `sidebar-${Math.random().toString(36).slice(2, 9)}`;

	// Track focused item index for keyboard navigation
	let focusedIndex = $state(-1);

	// Width classes
	let widthClasses = $derived(
		collapsed ? 'w-20' : width === 'narrow' ? 'w-52' : width === 'wide' ? 'w-80' : 'w-64'
	);

	// Computed sidebar classes
	let sidebarClasses = $derived(
		[
			'flex',
			'flex-col',
			'shrink-0', // Prevent squeezing in flex layouts
			'bg-base-200',
			'text-base-content',
			'min-h-full',
			'overflow-hidden',
			'transition-all',
			'duration-300',
			widthClasses,
			variant === 'bordered' && 'border border-base-300',
			sticky && 'sticky top-0 z-50 h-full max-h-screen',
			disabled && 'pointer-events-none opacity-60',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Menu classes
	let menuClasses = $derived(
		[
			'menu',
			'flex-1',
			'overflow-y-auto',
			'p-2',
			'gap-1',
			variant === 'compact' && 'menu-compact',
			size === 'sm' && 'menu-sm',
			size === 'md' && 'menu-md',
			size === 'lg' && 'menu-lg'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Handle item click
	const handleItemClick = (item: SidebarItem, index: number) => {
		if (item.disabled || disabled || loading) return;
		onItemClick?.(item, index);
		if (item.onClick) {
			item.onClick();
		}
	};

	// Handle keyboard navigation
	const handleKeyDown = (event: KeyboardEvent, item: SidebarItem, index: number) => {
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
		}
	};

	// Focus a specific item by index
	const focusItem = (index: number) => {
		const element = document.getElementById(`${sidebarId}-item-${index}`);
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

	// Toggle collapsed state
	const toggleCollapse = () => {
		if (!collapsible) return;
		collapsed = !collapsed;
		onCollapse?.(collapsed);
	};
</script>

<aside
	id={sidebarId}
	class={sidebarClasses}
	role="navigation"
	aria-label={ariaLabel || title || 'Sidebar navigation'}
	{...props}
>
	<!-- Header Section -->
	{#if header}
		<div class="border-base-300 border-b p-4">
			{@render header()}
		</div>
	{:else if title || subtitle || collapsible}
		<div
			class="border-base-300 flex min-h-[4rem] items-center gap-2 border-b px-4 py-3 {collapsed
				? 'justify-center'
				: ''}"
		>
			{#if !collapsed && (title || subtitle)}
				<div class="flex min-w-0 flex-1 flex-col overflow-hidden">
					{#if title}
						<Heading level="h2" size="lg" weight="bold" truncate={true} text={title} />
					{/if}
					{#if subtitle}
						<Text size="xs" variant="muted" truncate={true} text={subtitle} />
					{/if}
				</div>
			{/if}
			{#if collapsible}
				<IconButton
					variant="ghost"
					size="sm"
					square={true}
					class="shrink-0 {collapsed ? '' : 'ml-auto'}"
					ariaLabel={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
					aria-expanded={!collapsed}
					onclick={toggleCollapse}
				>
					{#snippet children()}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 transition-transform {collapsed ? 'rotate-180' : ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
							/>
						</svg>
					{/snippet}
				</IconButton>
			{/if}
		</div>
	{/if}

	<!-- Body Section (Menu or Custom Content) -->
	<div class="flex flex-1 flex-col overflow-hidden">
		{#if loading}
			<div class="flex flex-1 items-center justify-center p-4">
				<span class="loading loading-spinner loading-lg text-primary" aria-label="Loading"></span>
			</div>
		{:else if children}
			<!-- Custom Children Content -->
			<div class={menuClasses}>
				{@render children()}
			</div>
		{:else}
			<!-- Menu Items -->
			<ul class={menuClasses} role="menu" aria-orientation="vertical">
				{#each items as item, index (item.id)}
					{#if item.label || item.icon}
						<li>
							{#if item.href && !item.disabled}
								<Link
									id="{sidebarId}-item-{index}"
									href={item.href}
									class={getItemClasses(item, index, focusedIndex, variant, size)}
									tabindex={item.disabled ? -1 : 0}
									role="menuitem"
									aria-disabled={item.disabled}
									aria-current={item.active ? 'page' : undefined}
									onclick={() => handleItemClick(item, index)}
									onkeydown={(e: KeyboardEvent) => handleKeyDown(e, item, index)}
									onfocus={() => handleFocus(index)}
									onblur={handleBlur}
								>
									{#snippet children()}
										{#if item.icon}
											<div
												class="relative flex items-center justify-center {collapsed
													? 'w-full'
													: ''}"
											>
												<span class="text-xl" aria-hidden="true">{item.icon}</span>
												{#if collapsed && item.badge !== undefined}
													<Badge
														label=""
														variant={item.badgeVariant || 'primary'}
														size="xs"
														class="border-base-200 absolute -top-1 -right-1 h-2.5 w-2.5 min-w-0 rounded-full border-2 p-0"
													/>
												{/if}
											</div>
										{/if}
										{#if !collapsed}
											<span class="inline-block min-w-0 flex-1 truncate">{item.label}</span>
											{#if item.badge !== undefined}
												<Badge
													label={String(item.badge)}
													variant={item.badgeVariant || 'primary'}
													{size}
												/>
											{/if}
										{/if}
									{/snippet}
								</Link>
							{:else}
								<Button
									id="{sidebarId}-item-{index}"
									class={getItemClasses(item, index, focusedIndex, variant, size)}
									tabindex={item.disabled ? -1 : 0}
									disabled={item.disabled || disabled}
									role="menuitem"
									aria-disabled={item.disabled || disabled}
									aria-current={item.active ? 'page' : undefined}
									onclick={() => handleItemClick(item, index)}
									onkeydown={(e: KeyboardEvent) => handleKeyDown(e, item, index)}
									onfocus={() => handleFocus(index)}
									onblur={handleBlur}
								>
									{#snippet children()}
										{#if item.icon}
											<div
												class="relative flex items-center justify-center {collapsed
													? 'w-full'
													: ''}"
											>
												<span class="text-xl" aria-hidden="true">{item.icon}</span>
												{#if collapsed && item.badge !== undefined}
													<Badge
														label=""
														variant={item.badgeVariant || 'primary'}
														size="xs"
														class="border-base-200 absolute -top-1 -right-1 h-2.5 w-2.5 min-w-0 rounded-full border-2 p-0"
													/>
												{/if}
											</div>
										{/if}
										{#if !collapsed}
											<span class="inline-block min-w-0 flex-1 truncate text-left"
												>{item.label}</span
											>
											{#if item.badge !== undefined}
												<Badge
													label={String(item.badge)}
													variant={item.badgeVariant || 'primary'}
													{size}
												/>
											{/if}
										{/if}
									{/snippet}
								</Button>
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		{/if}
	</div>

	<!-- Footer Section -->
	{#if footer}
		<div class="border-base-300 mt-auto border-t p-4 {collapsed ? 'flex justify-center' : ''}">
			{@render footer()}
		</div>
	{/if}
</aside>
