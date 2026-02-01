<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import NavBar, { type NavBarItem, type NavBarBrand } from './NavBar.svelte';
	import FooterBar, { type FooterSection, type SocialLink } from './FooterBar.svelte';
	import Container from '../../core/layout/Container.svelte';
	import Loader from '../../core/feedback/Loader.svelte';
	import Text from '../../core/typography/Text.svelte';

	interface Props {
		/** Main content of the page */
		children?: Snippet;
		/** Navigation bar brand configuration */
		navBrand?: NavBarBrand;
		/** Navigation bar items */
		navItems?: NavBarItem[];
		/** Navigation bar variant */
		navVariant?:
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
		/** Navigation bar position */
		navPosition?: 'static' | 'sticky' | 'fixed';
		/** Whether navigation bar has shadow */
		navShadow?: boolean;
		/** Whether navigation bar has border */
		navBordered?: boolean;
		/** Whether navigation bar has glass effect */
		navGlass?: boolean;
		/** Whether to wrap navigation bar content in container */
		navContainer?: boolean;
		/** Navigation bar item variant */
		navItemVariant?: 'pill' | 'underline' | 'bordered' | 'ghost';
		/** Navigation bar size */
		navSize?: 'xs' | 'sm' | 'md' | 'lg';
		/** Custom left section for navigation bar */
		navLeft?: Snippet;
		/** Custom center section for navigation bar */
		navCenter?: Snippet;
		/** Custom right section for navigation bar */
		navRight?: Snippet;
		/** Custom mobile menu for navigation bar */
		navMobileMenu?: Snippet;
		/** Footer sections/columns */
		footerSections?: FooterSection[];
		/** Footer brand snippet */
		footerBrand?: Snippet;
		/** Footer brand text */
		footerBrandText?: string;
		/** Footer brand logo URL */
		footerBrandLogo?: string;
		/** Footer brand logo alt text */
		footerBrandLogoAlt?: string;
		/** Footer brand description */
		footerBrandDescription?: string;
		/** Footer social links */
		footerSocialLinks?: SocialLink[];
		/** Footer copyright text */
		footerCopyright?: string;
		/** Footer copyright year */
		footerCopyrightYear?: number;
		/** Footer company name */
		footerCompanyName?: string;
		/** Footer bottom content */
		footerBottomContent?: Snippet;
		/** Footer layout variant */
		footerLayout?: 'multi-column' | 'single-column' | 'centered' | 'minimal';
		/** Footer color variant */
		footerVariant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'base-200' | 'base-300';
		/** Whether footer has border */
		footerBordered?: boolean;
		/** Whether footer uses compact spacing */
		footerCompact?: boolean;
		/** Whether footer is minimal */
		footerMinimal?: boolean;
		/** Whether to show footer */
		showFooter?: boolean;
		/** Whether to show navigation bar */
		showNav?: boolean;
		/** Main content container max width */
		containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
		/** Main content container padding */
		containerPadding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/** Whether to center main content container */
		containerCentered?: boolean;
		/** Whether to show loading state */
		loading?: boolean;
		/** Loading message */
		loadingMessage?: string;
		/** Background color for main content area */
		backgroundColor?: 'base-100' | 'base-200' | 'base-300';
		/** Minimum height for main content area */
		minHeight?: 'screen' | 'auto' | 'full';
		/** Accessible label for navigation bar */
		navAriaLabel?: string;
		/** Accessible label for footer */
		footerAriaLabel?: string;
		/** Accessible label for main content */
		mainAriaLabel?: string;
		/** Additional CSS classes for main content */
		class?: string;
		/** HTML id for main content */
		id?: string;
	}

	const {
		children,
		navBrand,
		navItems = [],
		navVariant = 'base',
		navPosition = 'static',
		navShadow = false,
		navBordered = false,
		navGlass = false,
		navContainer = false,
		navItemVariant = 'pill',
		navSize = 'md',
		navLeft,
		navCenter,
		navRight,
		navMobileMenu,
		footerSections = [],
		footerBrand,
		footerBrandText,
		footerBrandLogo,
		footerBrandLogoAlt,
		footerBrandDescription,
		footerSocialLinks = [],
		footerCopyright,
		footerCopyrightYear,
		footerCompanyName,
		footerBottomContent,
		footerLayout = 'multi-column',
		footerVariant,
		footerBordered = true,
		footerCompact = false,
		footerMinimal = false,
		showFooter = true,
		showNav = true,
		containerMaxWidth = 'xl',
		containerPadding = 'md',
		containerCentered = true,
		loading = false,
		loadingMessage = 'Loading...',
		backgroundColor = 'base-100',
		minHeight = 'screen',
		navAriaLabel = 'Main navigation',
		footerAriaLabel = 'Site footer',
		mainAriaLabel = 'Main content',
		class: className = '',
		id
	}: Props = $props();

	// Calculate padding-top based on navbar position and size
	let navbarPaddingTop = $derived(() => {
		if (!showNav || navPosition === 'static') return '';

		// Add padding when navbar is fixed or sticky to prevent content overlap
		const sizeMap = {
			xs: 'pt-8', // 2rem = 32px
			sm: 'pt-12', // 3rem = 48px
			md: 'pt-16', // 4rem = 64px
			lg: 'pt-20' // 5rem = 80px
		};

		return sizeMap[navSize];
	});

	// Main content area classes
	let mainClasses = $derived(
		[
			'flex',
			'flex-col',
			'flex-1',
			backgroundColor === 'base-100' && 'bg-base-100',
			backgroundColor === 'base-200' && 'bg-base-200',
			backgroundColor === 'base-300' && 'bg-base-300',
			minHeight === 'screen' && 'min-h-screen',
			minHeight === 'full' && 'min-h-full',
			navbarPaddingTop(),
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Layout wrapper classes
	let layoutClasses = $derived(
		['flex', 'flex-col', minHeight === 'screen' && 'min-h-screen'].filter(Boolean).join(' ')
	);
</script>

<div class={layoutClasses}>
	<!-- Navigation Bar -->
	{#if showNav}
		<NavBar
			brand={navBrand}
			items={navItems}
			variant={navVariant}
			position={navPosition}
			shadow={navShadow}
			bordered={navBordered}
			glass={navGlass}
			container={navContainer}
			itemVariant={navItemVariant}
			size={navSize}
			left={navLeft}
			center={navCenter}
			right={navRight}
			mobileMenu={navMobileMenu}
			menuAriaLabel={navAriaLabel}
		/>
	{/if}

	<!-- Main Content Area -->
	<main {id} class={mainClasses} aria-label={mainAriaLabel}>
		{#if loading}
			<Container
				maxWidth={containerMaxWidth}
				centered={containerCentered}
				padding={containerPadding}
				className="flex min-h-[50vh] flex-col items-center justify-center"
			>
				<Loader size="lg" type="spinner" />
				{#if loadingMessage}
					<Text text={loadingMessage} size="sm" variant="muted" class="mt-4" />
				{/if}
			</Container>
		{:else}
			<Container
				maxWidth={containerMaxWidth}
				centered={containerCentered}
				padding={containerPadding}
			>
				{#if children}
					{@render children()}
				{/if}
			</Container>
		{/if}
	</main>

	<!-- Footer -->
	{#if showFooter}
		<FooterBar
			sections={footerSections}
			brand={footerBrand}
			brandText={footerBrandText}
			brandLogo={footerBrandLogo}
			brandLogoAlt={footerBrandLogoAlt}
			brandDescription={footerBrandDescription}
			socialLinks={footerSocialLinks}
			copyright={footerCopyright}
			copyrightYear={footerCopyrightYear}
			companyName={footerCompanyName}
			bottomContent={footerBottomContent}
			layout={footerLayout}
			variant={footerVariant}
			bordered={footerBordered}
			compact={footerCompact}
			minimal={footerMinimal}
			ariaLabel={footerAriaLabel}
		/>
	{/if}
</div>
