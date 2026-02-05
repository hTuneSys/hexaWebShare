<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Text from '../../core/typography/Text.svelte';
	import Link from '../../core/typography/Link.svelte';
	import Icon from '../../core/media/Icon.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';
	import Dropdown from '../../core/overlay-navigation/Dropdown.svelte';
	import Drawer from '../../core/overlay-navigation/Drawer.svelte';
	import Menu from '../../core/overlay-navigation/Menu.svelte';
	import Container from '../../core/layout/Container.svelte';
	import Col from '../../core/layout/Col.svelte';
	import Row from '../../core/layout/Row.svelte';
	import MenuIcon from 'lucide-svelte/icons/menu';

	let isMobileMenuOpen = $state(false);

	/**
	 * Handles the mobile menu toggle
	 */
	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	/**
	 * Interface for a simple navigation item
	 */
	export interface NavBarItem {
		/** Display label for the navigation item */
		label: string;
		/** Target URL for the navigation item */
		href: string;
		/** Whether the item is currently active */
		active?: boolean;
		/** Optional icon name for the item */
		icon?: string;
		/** Visual color variant for this specific item */
		color?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
	}

	/**
	 * Interface for brand/logo configuration
	 */
	export interface NavBarBrand {
		/** Display name of the brand */
		label?: string;
		/** Brand link target URL */
		href?: string;
		/** URL to the brand logo image */
		logo?: string;
		/** Visual color variant for the brand label */
		color?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
	}

	interface Props {
		/** Brand configuration (logo, label, href) */
		brand?: NavBarBrand;
		/** List of navigation items for the center/left section */
		items?: NavBarItem[];
		/** Visual variant for the navbar background */
		variant?:
			| 'base'
			| 'neutral'
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost';
		/** Positioning behavior */
		position?: 'static' | 'sticky' | 'fixed';
		/** Whether the navbar has a box shadow */
		shadow?: boolean;
		/** Whether the navbar has a bottom border */
		bordered?: boolean;
		/** Whether to apply a glassmorphism effect */
		glass?: boolean;
		/** Whether to wrap the navbar content in a container for width limiting */
		container?: boolean;
		/** Visual style for navigation items */
		itemVariant?: 'pill' | 'underline' | 'bordered' | 'ghost';
		/** Size variant for the navbar */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/** Mobile menu snippet (optional, replaces default sidebar) */
		mobileMenu?: Snippet;
		/** Default visual color for navigation items (hover/active state) */
		itemColor?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';

		/** Snippet to render in the left section (replaces brand if provided) */
		left?: Snippet;
		/** Snippet to render in the center section (replaces items if provided) */
		center?: Snippet;
		/** Snippet to render in the right section (e.g., search, profile) */
		right?: Snippet;
		/** Snippet to override the default mobile menu trigger/content */
		// mobileMenu?: Snippet; // This was removed as per the diff, but the instruction implies it might still be used for drawer content. Re-adding it as per the diff's implied intent.
		/** Optional children snippet for content that should follow the navbar (useful for layouts) */
		children?: Snippet;

		/** Accessible label for the navigation menu toggle (mobile view) */
		menuAriaLabel?: string;
		/** Alt text for the brand logo */
		logoAltText?: string;
		/** Additional CSS classes */
		class?: string;
		/** HTML id */
		id?: string;
	}

	const {
		brand,
		items = [],
		variant = 'base',
		position = 'static',
		shadow = false,
		bordered = false,
		glass = false,
		container = false,
		itemVariant = 'pill',
		size = 'md',
		itemColor,
		left,
		center,
		right,
		mobileMenu,
		children,
		menuAriaLabel = 'Toggle navigation menu',
		logoAltText = 'Company Logo',
		class: className = '',
		id
	}: Props = $props();

	// Computed classes for the main navbar element
	let navClasses = $derived(
		[
			'navbar',
			variant === 'base' && 'bg-base-100 text-base-content',
			variant === 'neutral' && 'bg-neutral text-neutral-content',
			variant === 'primary' && 'bg-primary text-primary-content',
			variant === 'secondary' && 'bg-secondary text-secondary-content',
			variant === 'accent' && 'bg-accent text-accent-content',
			variant === 'info' && 'bg-info text-info-content',
			variant === 'success' && 'bg-success text-success-content',
			variant === 'warning' && 'bg-warning text-warning-content',
			variant === 'error' && 'bg-error text-error-content',
			variant === 'ghost' && 'bg-transparent',
			shadow && 'shadow-md',
			bordered && 'border-b border-base-300',
			glass && 'glass',
			position === 'sticky' && 'sticky top-0 z-50',
			position === 'fixed' && 'fixed top-0 left-0 right-0 z-50',
			size === 'xs' && 'min-h-[2rem] py-0',
			size === 'sm' && 'min-h-[3rem] py-0',
			size === 'md' && 'min-h-[4rem]',
			size === 'lg' && 'min-h-[5rem]',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Classes for the navigation items based on variant
	let itemClasses = $derived(
		[
			itemVariant === 'pill' && '', // Default DaisyUI behavior
			itemVariant === 'underline' &&
				'[&_li_>_*:not(ul)]:rounded-none [&_li_>_*:not(ul)]:border-b-2 [&_li_>_*:not(ul)]:border-transparent [&_li_>_*:not(ul)]:hover:border-primary [&_li_>_*:not(ul).active]:border-primary [&_li_>_*:not(ul)]:bg-transparent',
			itemVariant === 'bordered' &&
				'[&_li_>_*:not(ul)]:border [&_li_>_*:not(ul)]:border-transparent [&_li_>_*:not(ul)]:hover:border-base-300 [&_li_>_*:not(ul).active]:border-base-300 [&_li_>_*:not(ul)]:bg-transparent',
			itemVariant === 'ghost' &&
				'[&_li_>_*:not(ul)]:bg-transparent [&_li_>_*:not(ul)]:hover:bg-transparent [&_li_>_*:not(ul)]:hover:text-primary [&_li_>_*:not(ul).active]:text-primary'
		]
			.filter(Boolean)
			.join(' ')
	);

	/**
	 * Returns the specific Tailwind classes for a menu item based on itemColor or individual item color
	 */
	const getItemColorClasses = (color?: string) => {
		const targetColor = color || itemColor;
		if (!targetColor) return '';

		return [
			itemVariant === 'pill' &&
				(targetColor === 'primary'
					? '[&_>_*:not(ul).active]:bg-primary [&_>_*:not(ul).active]:text-primary-content [&_>_*:not(ul):hover]:bg-primary/10'
					: `[&_>_*:not(ul).active]:bg-${targetColor} [&_>_*:not(ul).active]:text-${targetColor}-content [&_>_*:not(ul):hover]:bg-${targetColor}/10`),

			itemVariant === 'underline' &&
				(targetColor === 'primary'
					? '[&_>_*:not(ul).active]:border-primary [&_>_*:not(ul):hover]:border-primary [&_>_*:not(ul).active]:text-primary [&_>_*:not(ul):hover]:text-primary'
					: `[&_>_*:not(ul).active]:border-${targetColor} [&_>_*:not(ul):hover]:border-${targetColor} [&_>_*:not(ul).active]:text-${targetColor} [&_>_*:not(ul):hover]:text-${targetColor}`),

			itemVariant === 'bordered' &&
				(targetColor === 'primary'
					? '[&_>_*:not(ul).active]:border-primary [&_>_*:not(ul):hover]:border-primary [&_>_*:not(ul).active]:text-primary [&_>_*:not(ul):hover]:text-primary'
					: `[&_>_*:not(ul).active]:border-${targetColor} [&_>_*:not(ul):hover]:border-${targetColor} [&_>_*:not(ul).active]:text-${targetColor} [&_>_*:not(ul):hover]:text-${targetColor}`),

			itemVariant === 'ghost' &&
				(targetColor === 'primary'
					? '[&_>_*:not(ul).active]:text-primary [&_>_*:not(ul):hover]:text-primary'
					: `[&_>_*:not(ul).active]:text-${targetColor} [&_>_*:not(ul):hover]:text-${targetColor}`)
		]
			.filter(Boolean)
			.join(' ');
	};

	// Brand and logo size mapping
	const brandTextSize = $derived(
		{
			xs: 'text-base',
			sm: 'text-lg',
			md: 'text-xl',
			lg: 'text-2xl'
		}[size]
	);

	const logoHeight = $derived(
		{
			xs: 'h-6',
			sm: 'h-7',
			md: 'h-8',
			lg: 'h-10'
		}[size]
	);

	const menuSize = $derived(
		{
			xs: 'sm',
			sm: 'sm',
			md: 'md',
			lg: 'lg'
		}[size] as 'sm' | 'md' | 'lg'
	);
</script>

<nav {id} class={navClasses}>
	<Container fluid={!container} padding="none" responsive={false} className="w-full">
		<Row gap="0" class="w-full">
			<!-- Navbar Left / Start -->
			<Col flex="1" class="navbar-start flex">
				<!-- Mobile Hamburger Trigger -->
				<Col hideAbove="lg">
					<IconButton
						variant="ghost"
						ariaLabel={menuAriaLabel}
						class="mobile-hamburger"
						onclick={toggleMobileMenu}
					>
						<Icon name="menu">
							<MenuIcon />
						</Icon>
					</IconButton>
				</Col>

				<!-- Brand / logo area -->
				{#if left}
					{@render left()}
				{:else if brand}
					<Link
						href={brand.href || '/'}
						variant={brand.color}
						class="flex items-center gap-2 px-2 {brandTextSize} normal-case no-underline transition-opacity hover:opacity-80 {brand.color
							? ''
							: 'text-current'}"
					>
						{#if brand.logo}
							<img src={brand.logo} alt={logoAltText} class="{logoHeight} mr-2 w-auto" />
						{/if}
						{#if brand.label}
							<Text text={brand.label} weight="bold" variant="inherit" />
						{/if}
					</Link>
				{/if}
			</Col>

			<!-- Navbar Center -->
			<Col hideBelow="lg" class="navbar-center flex">
				{#if center}
					{@render center()}
				{:else if items.length > 0}
					<Menu
						items={items.map((item, idx) => ({
							id: idx,
							label: item.label,
							href: item.href,
							active: item.active,
							class: getItemColorClasses(item.color)
						}))}
						orientation="horizontal"
						size={menuSize}
						class="gap-2 px-1 {itemClasses}"
					/>
				{/if}
			</Col>

			<Col flex="1" class="navbar-end flex gap-2 px-2">
				{#if right}
					{@render right()}
				{/if}
			</Col>
		</Row>
	</Container>
</nav>

<!-- Mobile Sidebar Drawer -->
<Drawer bind:open={isMobileMenuOpen} side="left" title={brand?.label ?? 'Menu'}>
	{#if mobileMenu}
		{@render mobileMenu()}
	{:else}
		<Menu
			items={items.map((item, idx) => ({
				id: idx,
				label: item.label,
				href: item.href,
				active: item.active,
				class: getItemColorClasses(item.color)
			}))}
			size="lg"
			variant="default"
			class="w-full bg-transparent p-0"
			onItemClick={() => (isMobileMenuOpen = false)}
		/>
	{/if}
</Drawer>

{#if children}
	{@render children()}
{/if}

<style>
	/* Kill hover and active effects for mobile hamburger specifically */
	:global(.mobile-hamburger),
	:global(.mobile-hamburger:hover),
	:global(.mobile-hamburger:active),
	:global(.mobile-hamburger:focus),
	:global(.mobile-hamburger:focus-visible) {
		background-color: transparent !important;
		background: transparent !important;
		box-shadow: none !important;
		outline: none !important;
		border-color: transparent !important;
		--tw-shadow: 0 0 #0000 !important;
		--tw-ring-offset-width: 0px !important;
		--tw-ring-width: 0px !important;
	}
</style>
