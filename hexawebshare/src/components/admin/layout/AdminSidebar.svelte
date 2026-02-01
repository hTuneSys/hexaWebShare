<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { DropdownItem } from '../../core/overlay-navigation/Dropdown.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';
	import Link from '../../core/typography/Link.svelte';
	import Badge from '../../core/media/Badge.svelte';
	import Heading from '../../core/typography/Heading.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';
	import Icon from '../../core/media/Icon.svelte';
	import ChevronsLeft from 'lucide-svelte/icons/chevrons-left';

	/**
	 * Badge variant type for sidebar items
	 */
	type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';

	/**
	 * AdminSidebarItem interface for menu items
	 */
	export interface AdminSidebarItem {
		/** Unique identifier for the item */
		id: string;
		/** Display label for the item */
		label: string;
		/** Icon identifier or character */
		icon?: string;
		/** Navigation URL (renders as Link) */
		href?: string;
		/** Click handler callback */
		onClick?: () => void;
		/** Whether item is currently active */
		active?: boolean;
		/** Whether item is disabled */
		disabled?: boolean;
		/** Badge content (text or number) */
		badge?: string | number;
		/** Badge color variant */
		badgeVariant?: BadgeVariant;
		/** Nested dropdown items */
		children?: DropdownItem[];
	}

	/**
	 * Props interface for AdminSidebar component
	 * All props are required - no default values allowed per project standards
	 */
	interface Props {
		/** Menu items array */
		items: AdminSidebarItem[];
		/** Sidebar title text */
		title: string;
		/** Sidebar subtitle text */
		subtitle: string;
		/** Visual variant style */
		variant: 'default' | 'compact' | 'bordered';
		/** Size variant */
		size: 'sm' | 'md' | 'lg';
		/** Width variant */
		width: 'narrow' | 'default' | 'wide';
		/** Collapsed state (bindable) */
		collapsed: boolean;
		/** Whether sidebar can be collapsed */
		collapsible: boolean;
		/** Whether sidebar is sticky positioned */
		sticky: boolean;
		/** Whether entire sidebar is disabled */
		disabled: boolean;
		/** Whether sidebar is in loading state */
		loading: boolean;
		/** Accessible label for the sidebar navigation */
		ariaLabel: string;
		/** Accessible label for expand button */
		expandAriaLabel: string;
		/** Accessible label for collapse button */
		collapseAriaLabel: string;
		/** Unique identifier for the sidebar element */
		sidebarId: string;
		/** Default badge variant when item does not specify one */
		defaultBadgeVariant: BadgeVariant;
		/** CSS class for header minimum height */
		headerMinHeightClass: string;
		/** Callback when menu item is clicked */
		onItemClick: (item: AdminSidebarItem, index: number) => void;
		/** Callback when collapse state changes */
		onCollapse: (collapsed: boolean) => void;
		/** Custom header content snippet */
		header?: Snippet;
		/** Custom footer content snippet */
		footer?: Snippet;
		/** Custom body content snippet (replaces menu) */
		children?: Snippet;
		/** Collapse icon snippet for custom icon rendering */
		collapseIcon?: Snippet<[{ collapsed: boolean }]>;
		/** Additional CSS classes */
		class: string;
	}

	let {
		items,
		title,
		subtitle,
		variant,
		size,
		width,
		collapsed = $bindable(),
		collapsible,
		sticky,
		disabled,
		loading,
		ariaLabel,
		expandAriaLabel,
		collapseAriaLabel,
		sidebarId,
		defaultBadgeVariant,
		headerMinHeightClass,
		onItemClick,
		onCollapse,
		header,
		footer,
		children,
		collapseIcon,
		class: className,
		...props
	}: Props = $props();

	let widthClasses = $derived(
		collapsed ? 'w-20' : width === 'narrow' ? 'w-52' : width === 'wide' ? 'w-80' : 'w-64'
	);

	let sidebarClasses = $derived(
		[
			'admin-sidebar',
			'flex',
			'flex-col',
			'shrink-0',
			'bg-base-200',
			'text-base-content',
			'min-h-full',
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

	let menuClasses = $derived(
		[
			'menu',
			'flex-1',
			'overflow-visible',
			'p-2',
			'gap-1',
			variant === 'compact' && 'menu-compact',
			size === 'sm' && 'menu-sm',
			size === 'lg' && 'menu-lg'
		]
			.filter(Boolean)
			.join(' ')
	);

	/**
	 * Get padding classes based on size
	 */
	let paddingClasses = $derived(
		size === 'sm' ? 'px-2 py-1.5' : size === 'lg' ? 'px-4 py-3' : 'px-3 py-2'
	);

	/**
	 * Get gap classes based on size
	 */
	let gapClasses = $derived(size === 'sm' ? 'gap-2' : size === 'lg' ? 'gap-4' : 'gap-3');

	/**
	 * Get icon size classes based on size
	 */
	let iconSizeClasses = $derived(
		size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
	);

	/**
	 * Generate CSS classes for menu item based on state and size
	 * Uses static DaisyUI/Tailwind classes only - no dynamic interpolation
	 */
	const getItemClasses = (item: AdminSidebarItem) => {
		return [
			'flex',
			'w-full',
			'items-center',
			paddingClasses,
			gapClasses,
			'rounded-lg',
			'transition-all',
			'duration-200',
			'cursor-pointer',
			'hover:bg-base-300',
			item.active && 'bg-primary text-primary-content hover:opacity-90',
			item.disabled && 'opacity-50 cursor-not-allowed'
		]
			.filter(Boolean)
			.join(' ');
	};

	let collapseButtonAriaLabel = $derived(collapsed ? expandAriaLabel : collapseAriaLabel);

	const handleItemClick = (item: AdminSidebarItem, index: number) => {
		if (item.disabled || disabled || loading) return;
		onItemClick(item, index);
		if (item.onClick) item.onClick();
	};

	const toggleCollapse = () => {
		if (!collapsible) return;
		collapsed = !collapsed;
		onCollapse(collapsed);
	};
</script>

<!--
	NOTE: Raw HTML aside is intentional here.
	TECHNICAL REASON: aside is a semantic HTML5 landmark element for sidebar content.
	No library component exists for semantic landmark wrappers.
	This provides proper document structure and accessibility.
-->
<aside id={sidebarId} class={sidebarClasses} role="navigation" aria-label={ariaLabel} {...props}>
	{#if header}
		<!--
			NOTE: Raw HTML div is intentional here.
			TECHNICAL REASON: This is a structural container for custom header content.
			No suitable library component exists for generic layout wrappers.
		-->
		<div class="border-base-300 border-b p-4">
			{@render header()}
		</div>
	{:else if title || subtitle || collapsible}
		<!--
			NOTE: Raw HTML div is intentional here.
			TECHNICAL REASON: This is a structural container for header layout.
			No suitable library component exists for flex layout wrappers.
		-->
		<div class="border-base-300 flex {headerMinHeightClass} items-center gap-2 border-b px-4 py-3">
			{#if !collapsed && (title || subtitle)}
				<!--
					NOTE: Raw HTML div is intentional here.
					TECHNICAL REASON: This is a structural container for title/subtitle grouping.
					No suitable library component exists for generic content wrappers.
				-->
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
					class="shrink-0"
					ariaLabel={collapseButtonAriaLabel}
					onclick={toggleCollapse}
				>
					{#snippet children()}
						{#if collapseIcon}
							{@render collapseIcon({ collapsed })}
						{:else}
							<Icon size="md" ariaHidden={true} class="transition-transform {collapsed ? 'rotate-180' : ''}">
								<ChevronsLeft />
							</Icon>
						{/if}
					{/snippet}
				</IconButton>
			{/if}
		</div>
	{/if}

	<!--
		NOTE: Raw HTML div is intentional here.
		TECHNICAL REASON: This is a structural flex container for body content.
		No suitable library component exists for flex layout wrappers.
	-->
	<div class="flex flex-1 flex-col overflow-hidden">
		{#if loading}
			<!--
				NOTE: Raw HTML div is intentional here.
				TECHNICAL REASON: This is a centering container for the spinner.
				No suitable library component exists for flexbox centering wrappers.
			-->
			<div class="flex flex-1 items-center justify-center p-4">
				<Spinner size="lg" variant="primary" {ariaLabel} />
			</div>
		{:else if children}
			<!--
				NOTE: Raw HTML div is intentional here.
				TECHNICAL REASON: This is a structural container for custom children content.
				No suitable library component exists for generic content wrappers.
			-->
			<div class={menuClasses}>
				{@render children()}
			</div>
		{:else}
			<!--
				NOTE: Raw HTML ul/li is intentional here.
				TECHNICAL REASON: DaisyUI's menu component requires ul/li structure.
				The .menu class applies specific CSS selectors targeting ul > li children.
				Using a library Menu component would create nested menu structures.
				VALIDATION: DaisyUI v4.x documentation specifies ul.menu > li pattern.
			-->
			<ul class={menuClasses} role="menu">
				{#each items as item, index (item.id)}
					<li>
						{#if item.children && item.children.length > 0}
							<!--
								NOTE: Raw HTML details/summary is intentional here.
								TECHNICAL REASON: DaisyUI menu component uses native details/summary
								for collapsible submenus. This is the standard pattern for nested menus.
								Using Dropdown component creates positioning/overflow issues in sidebars.
								VALIDATION: DaisyUI v4.x Menu documentation - Collapsible submenu pattern.
							-->
							<details class="group" open={item.active}>
								<summary
									class="{getItemClasses(item)} cursor-pointer list-none justify-between"
									class:opacity-50={item.disabled || disabled}
									class:pointer-events-none={item.disabled || disabled}
								>
									<!--
										NOTE: Raw HTML span is intentional here.
										TECHNICAL REASON: This is a structural wrapper for icon and label grouping.
										No suitable library component exists for inline flex wrappers.
									-->
									<span class="flex items-center {gapClasses}">
										{#if item.icon}
											<span class={iconSizeClasses} aria-hidden="true">{item.icon}</span>
										{/if}
										{#if !collapsed}
											<Text text={item.label} truncate={true} class="flex-1" />
										{/if}
									</span>
									{#if !collapsed && item.badge !== undefined}
										<Badge
											label={String(item.badge)}
											variant={item.badgeVariant ?? defaultBadgeVariant}
											{size}
										/>
									{/if}
								</summary>
								{#if !collapsed}
									<ul class="mt-1 ml-4 space-y-1">
										{#each item.children as child (child.id)}
											<li>
												{#if child.href}
													<Link
														href={child.href}
														class="{paddingClasses} flex items-center {gapClasses} hover:bg-base-300 rounded-lg"
														onclick={() => child.onClick?.()}
													>
														{#snippet children()}
															{#if child.icon}
																<span class={iconSizeClasses} aria-hidden="true">{child.icon}</span>
															{/if}
															<Text text={child.label} truncate={true} class="flex-1" />
														{/snippet}
													</Link>
												{:else}
													<Button
														class="{paddingClasses} flex w-full items-center {gapClasses} hover:bg-base-300 justify-start rounded-lg"
														disabled={child.disabled}
														onclick={() => child.onClick?.()}
													>
														{#snippet children()}
															{#if child.icon}
																<span class={iconSizeClasses} aria-hidden="true">{child.icon}</span>
															{/if}
															<Text text={child.label} truncate={true} class="flex-1" />
														{/snippet}
													</Button>
												{/if}
											</li>
										{/each}
									</ul>
								{/if}
							</details>
						{:else if item.href}
							<Link
								href={item.href}
								class={getItemClasses(item)}
								onclick={() => handleItemClick(item, index)}
							>
								{#snippet children()}
									{#if item.icon}
										<!--
											NOTE: Raw HTML span is intentional here.
											TECHNICAL REASON: This is an inline wrapper for icon display.
											Icon component uses w/h sizing but item.icon contains emoji/characters
											which require font-size (text-lg, text-xl) for proper scaling.
										-->
										<span class={iconSizeClasses} aria-hidden="true">{item.icon}</span>
									{/if}
									{#if !collapsed}
										<Text text={item.label} truncate={true} class="flex-1" />
										{#if item.badge !== undefined}
											<Badge
												label={String(item.badge)}
												variant={item.badgeVariant ?? defaultBadgeVariant}
												{size}
											/>
										{/if}
									{/if}
								{/snippet}
							</Link>
						{:else}
							<Button
								class={getItemClasses(item)}
								disabled={item.disabled || disabled}
								onclick={() => handleItemClick(item, index)}
							>
								{#snippet children()}
									{#if item.icon}
										<!--
											NOTE: Raw HTML span is intentional here.
											TECHNICAL REASON: This is an inline wrapper for icon display.
											Icon component uses w/h sizing but item.icon contains emoji/characters
											which require font-size (text-lg, text-xl) for proper scaling.
										-->
										<span class={iconSizeClasses} aria-hidden="true">{item.icon}</span>
									{/if}
									{#if !collapsed}
										<Text text={item.label} truncate={true} class="flex-1 text-left" />
										{#if item.badge !== undefined}
											<Badge
												label={String(item.badge)}
												variant={item.badgeVariant ?? defaultBadgeVariant}
												{size}
											/>
										{/if}
									{/if}
								{/snippet}
							</Button>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	{#if footer}
		<!--
			NOTE: Raw HTML div is intentional here.
			TECHNICAL REASON: This is a structural container for custom footer content.
			No suitable library component exists for generic layout wrappers.
		-->
		<div class="border-base-300 mt-auto border-t p-4">
			{@render footer()}
		</div>
	{/if}
</aside>
