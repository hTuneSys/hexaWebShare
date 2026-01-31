<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PublicPageLayout from './PublicPageLayout.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';
	import Heading from '../../core/typography/Heading.svelte';
	import Paragraph from '../../core/typography/Paragraph.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Card from '../../core/layout/Card.svelte';
	import Grid from '../../core/layout/Grid.svelte';

	const { Story } = defineMeta({
		title: 'Utility/Utility/PublicPageLayout',
		component: PublicPageLayout,
		tags: ['autodocs'],
		argTypes: {
			// Navigation Props
			navVariant: {
				control: 'select',
				options: [
					'base',
					'neutral',
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error',
					'ghost'
				],
				description: 'Visual variant for the navbar background'
			},
			navPosition: {
				control: 'select',
				options: ['static', 'sticky', 'fixed'],
				description: 'Positioning behavior of the navbar'
			},
			navItemVariant: {
				control: 'select',
				options: ['pill', 'underline', 'bordered', 'ghost'],
				description: 'Visual style for navigation items'
			},
			navSize: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size variant for the navbar'
			},
			navShadow: {
				control: 'boolean',
				description: 'Whether navigation bar has shadow'
			},
			navBordered: {
				control: 'boolean',
				description: 'Whether navigation bar has border'
			},
			navGlass: {
				control: 'boolean',
				description: 'Whether navigation bar has glass effect'
			},
			navContainer: {
				control: 'boolean',
				description: 'Whether to wrap navigation bar content in container'
			},
			navAriaLabel: {
				control: 'text',
				description: 'Accessible label for navigation bar'
			},

			// Footer Props
			footerLayout: {
				control: 'select',
				options: ['multi-column', 'single-column', 'centered', 'minimal'],
				description: 'Footer layout variant'
			},
			footerVariant: {
				control: 'select',
				options: ['primary', 'secondary', 'accent', 'neutral', 'base-200', 'base-300'],
				description: 'Footer color variant'
			},
			footerBordered: {
				control: 'boolean',
				description: 'Whether footer has border'
			},
			footerCompact: {
				control: 'boolean',
				description: 'Whether footer uses compact spacing'
			},
			footerMinimal: {
				control: 'boolean',
				description: 'Whether footer is minimal'
			},
			footerBrandText: {
				control: 'text',
				description: 'Footer brand text'
			},
			footerBrandDescription: {
				control: 'text',
				description: 'Footer brand description'
			},
			footerCompanyName: {
				control: 'text',
				description: 'Footer company name for copyright'
			},
			footerAriaLabel: {
				control: 'text',
				description: 'Accessible label for footer'
			},

			// Container Props
			containerMaxWidth: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
				description: 'Main content container max width'
			},
			containerPadding: {
				control: 'select',
				options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Main content container padding'
			},
			containerCentered: {
				control: 'boolean',
				description: 'Whether to center main content container'
			},

			// Layout Props
			backgroundColor: {
				control: 'select',
				options: ['base-100', 'base-200', 'base-300'],
				description: 'Background color for main content area'
			},
			minHeight: {
				control: 'select',
				options: ['screen', 'auto', 'full'],
				description: 'Minimum height for main content area'
			},

			// Visibility Props
			showFooter: {
				control: 'boolean',
				description: 'Whether to show footer'
			},
			showNav: {
				control: 'boolean',
				description: 'Whether to show navigation bar'
			},

			// Loading Props
			loading: {
				control: 'boolean',
				description: 'Whether to show loading state'
			},
			loadingMessage: {
				control: 'text',
				description: 'Loading message text'
			},

			// Accessibility Props
			mainAriaLabel: {
				control: 'text',
				description: 'Accessible label for main content'
			}
		}
	});
</script>

<!-- ====== SAMPLE DATA ====== -->
<script>
	// Sample navigation items
	const sampleNavItems = [
		{ label: 'Home', href: '#', active: true },
		{ label: 'Features', href: '#features' },
		{ label: 'Pricing', href: '#pricing' },
		{ label: 'About', href: '#about' },
		{ label: 'Contact', href: '#contact' }
	];

	// Sample navigation brand
	const sampleNavBrand = {
		label: 'hexaWebShare',
		href: '#',
		logo: '/favicon.svg'
	};

	// Sample footer sections
	const sampleFooterSections = [
		{
			title: 'Product',
			links: [
				{ label: 'Features', href: '#features' },
				{ label: 'Pricing', href: '#pricing' },
				{ label: 'Documentation', href: '#docs' },
				{ label: 'API', href: '#api' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'About', href: '#about' },
				{ label: 'Blog', href: '#blog' },
				{ label: 'Careers', href: '#careers' },
				{ label: 'Press', href: '#press' }
			]
		},
		{
			title: 'Resources',
			links: [
				{ label: 'Community', href: '#community' },
				{ label: 'Support', href: '#support' },
				{ label: 'Tutorials', href: '#tutorials' },
				{ label: 'FAQ', href: '#faq' }
			]
		},
		{
			title: 'Legal',
			links: [
				{ label: 'Privacy', href: '#privacy' },
				{ label: 'Terms', href: '#terms' },
				{ label: 'Security', href: '#security' },
				{ label: 'Cookies', href: '#cookies' }
			]
		}
	];

	// Sample social links
	const sampleSocialLinks = [
		{
			platform: 'GitHub',
			href: 'https://github.com',
			ariaLabel: 'Visit our GitHub'
		},
		{
			platform: 'Twitter',
			href: 'https://twitter.com',
			ariaLabel: 'Visit our Twitter'
		},
		{
			platform: 'LinkedIn',
			href: 'https://linkedin.com',
			ariaLabel: 'Visit our LinkedIn'
		}
	];
</script>

<!-- ====== CONTENT SNIPPETS ====== -->

{#snippet heroContent()}
	<div class="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
		<Heading level="h1" text="Welcome to hexaWebShare" />
		<Paragraph
			size="lg"
			variant="muted"
			text="Build beautiful, accessible web applications with our comprehensive component library."
		/>
		<div class="flex gap-4">
			<Button label="Get Started" variant="primary" size="lg" />
			<Button label="View Docs" variant="secondary" size="lg" />
		</div>
	</div>
{/snippet}

{#snippet featuresContent()}
	<div class="flex flex-col gap-8 py-12">
		<Heading level="h2" align="center" text="Features" />
		<Grid responsiveColumns={{ xs: 1, md: 2, lg: 3 }} gap="lg">
			{#snippet children()}
				<Card>
					{#snippet children()}
						<div class="flex flex-col gap-3">
							<Heading level="h3" text="Fast" class="whitespace-nowrap" />
							<Paragraph text="Built with performance in mind. Lightning-fast components." />
						</div>
					{/snippet}
				</Card>
				<Card>
					{#snippet children()}
						<div class="flex flex-col gap-3">
							<Heading level="h3" text="Accessible" class="whitespace-nowrap" />
							<Paragraph text="WCAG 2.1 compliant components with full keyboard support." />
						</div>
					{/snippet}
				</Card>
				<Card>
					{#snippet children()}
						<div class="flex flex-col gap-3">
							<Heading level="h3" text="Customizable" class="whitespace-nowrap" />
							<Paragraph text="Fully themeable with DaisyUI and Tailwind CSS." />
						</div>
					{/snippet}
				</Card>
			{/snippet}
		</Grid>
	</div>
{/snippet}

{#snippet pricingContent()}
	<div class="flex flex-col gap-8 py-12">
		<Heading level="h2" align="center" text="Simple Pricing" />
		<Grid responsiveColumns={{ xs: 1, md: 2, lg: 3 }} gap="lg">
			{#snippet children()}
				<Card>
					{#snippet children()}
						<div class="flex flex-col gap-2">
							<Heading level="h3" text="Free" />
							<Text text="$0/month" size="2xl" weight="bold" />
							<Paragraph text="Perfect for personal projects" class="mt-2" />
							<Button label="Get Started" variant="secondary" block class="mt-2" />
						</div>
					{/snippet}
				</Card>
				<Card>
					{#snippet children()}
						<div class="flex flex-col gap-2">
							<Heading level="h3" text="Pro" />
							<Text text="$29/month" size="2xl" weight="bold" />
							<Paragraph text="For professional developers" class="mt-2" />
							<Button label="Start Trial" variant="primary" block class="mt-2" />
						</div>
					{/snippet}
				</Card>
				<Card>
					{#snippet children()}
						<div class="flex flex-col gap-2">
							<Heading level="h3" text="Enterprise" />
							<Text text="Custom" size="2xl" weight="bold" />
							<Paragraph text="For large organizations" class="mt-2" />
							<Button label="Contact Sales" variant="accent" block class="mt-2" />
						</div>
					{/snippet}
				</Card>
			{/snippet}
		</Grid>
	</div>
{/snippet}

{#snippet simpleContent()}
	<div class="flex flex-col gap-6 py-12">
		<Heading level="h2" text="Simple Page Layout" />
		<Paragraph text="This is a basic page with navigation and footer." />
		<Card>
			{#snippet children()}
				<Paragraph
					text="Add your content here. The layout handles the navigation bar, main content area, and footer automatically."
				/>
			{/snippet}
		</Card>
	</div>
{/snippet}

{#snippet navRightSnippet()}
	<div class="flex gap-2">
		<Button label="Sign In" variant="ghost" size="sm" />
		<Button label="Sign Up" variant="primary" size="sm" />
	</div>
{/snippet}

<!-- ====== STORIES (10 Total) ====== -->

<!-- 1. Default - Basic Layout -->
<Story
	name="Default"
	args={{
		navBrand: sampleNavBrand,
		navItems: sampleNavItems,
		footerSections: sampleFooterSections,
		footerCompanyName: 'hexaTune LLC',
		footerSocialLinks: sampleSocialLinks,
		children: simpleContent
	}}
/>

<!-- 2. Hero Landing Page -->
<Story
	name="Hero Landing Page"
	args={{
		navBrand: sampleNavBrand,
		navItems: sampleNavItems,
		navRight: navRightSnippet,
		footerSections: sampleFooterSections,
		footerCompanyName: 'hexaTune LLC',
		footerSocialLinks: sampleSocialLinks,
		children: heroContent,
		backgroundColor: 'base-200'
	}}
/>

<!-- 3. Features Page -->
<Story
	name="Features Page"
	args={{
		navBrand: sampleNavBrand,
		navItems: sampleNavItems,
		navBordered: true,
		footerSections: sampleFooterSections,
		footerCompanyName: 'hexaTune LLC',
		footerSocialLinks: sampleSocialLinks,
		children: featuresContent
	}}
/>

<!-- 4. Pricing Page -->
<Story
	name="Pricing Page"
	args={{
		navBrand: sampleNavBrand,
		navItems: sampleNavItems,
		navShadow: true,
		footerSections: sampleFooterSections,
		footerCompanyName: 'hexaTune LLC',
		footerSocialLinks: sampleSocialLinks,
		children: pricingContent,
		backgroundColor: 'base-100'
	}}
/>

<!-- 5. Sticky Navigation -->
<Story
	name="Sticky Navigation"
	args={{
		navBrand: sampleNavBrand,
		navItems: sampleNavItems,
		navPosition: 'sticky',
		navShadow: true,
		footerSections: sampleFooterSections,
		footerCompanyName: 'hexaTune LLC',
		footerSocialLinks: sampleSocialLinks,
		children: featuresContent
	}}
/>

<!-- 6. Minimal Footer -->
<Story
	name="Minimal Footer"
	args={{
		navBrand: sampleNavBrand,
		navItems: sampleNavItems,
		footerLayout: 'minimal',
		footerMinimal: true,
		footerCompanyName: 'hexaTune LLC',
		children: simpleContent
	}}
/>

<!-- 7. No Footer -->
<Story
	name="No Footer"
	args={{
		navBrand: sampleNavBrand,
		navItems: sampleNavItems,
		showFooter: false,
		children: simpleContent
	}}
/>

<!-- 8. No Navigation -->
<Story
	name="No Navigation"
	args={{
		showNav: false,
		footerSections: sampleFooterSections,
		footerCompanyName: 'hexaTune LLC',
		footerSocialLinks: sampleSocialLinks,
		children: simpleContent
	}}
/>

<!-- 9. Loading State -->
<Story
	name="Loading State"
	args={{
		navBrand: sampleNavBrand,
		navItems: sampleNavItems,
		footerSections: sampleFooterSections,
		footerCompanyName: 'hexaTune LLC',
		loading: true,
		loadingMessage: 'Loading page content...'
	}}
/>

<!-- 10. Playground - Interactive with all controllable props -->
<Story
	name="Playground"
	args={{
		// Navigation Configuration
		navBrand: sampleNavBrand,
		navItems: sampleNavItems,
		navVariant: 'base',
		navPosition: 'static',
		navShadow: false,
		navBordered: false,
		navGlass: false,
		navContainer: false,
		navItemVariant: 'pill',
		navSize: 'md',
		navRight: navRightSnippet,
		navAriaLabel: 'Main navigation',

		// Footer Configuration
		footerSections: sampleFooterSections,
		footerBrandText: 'hexaWebShare',
		footerBrandLogo: '/favicon.svg',
		footerBrandDescription: 'Building the future of web components',
		footerSocialLinks: sampleSocialLinks,
		footerCompanyName: 'hexaTune LLC',
		footerLayout: 'multi-column',
		footerVariant: undefined,
		footerBordered: true,
		footerCompact: false,
		footerMinimal: false,
		footerAriaLabel: 'Site footer',

		// Container Configuration
		containerMaxWidth: 'xl',
		containerPadding: 'md',
		containerCentered: true,

		// Layout Configuration
		backgroundColor: 'base-100',
		minHeight: 'screen',

		// Visibility Configuration
		showFooter: true,
		showNav: true,

		// Loading Configuration
		loading: false,
		loadingMessage: 'Loading page content...',

		// Accessibility
		mainAriaLabel: 'Main content',

		// Content
		children: heroContent
	}}
/>
