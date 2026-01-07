<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FooterBar from './FooterBar.svelte';
	import type { FooterSection, SocialLink } from './FooterBar.svelte';

	const { Story } = defineMeta({
		title: 'Utility/Utility/FooterBar',
		component: FooterBar,
		tags: ['autodocs'],
		argTypes: {
			sections: {
				control: 'object',
				description: 'Footer sections/columns with links'
			},
			brandText: {
				control: 'text',
				description: 'Brand text displayed in footer'
			},
			brandLogo: {
				control: 'text',
				description: 'Brand logo image URL'
			},
			brandLogoAlt: {
				control: 'text',
				description: 'Brand logo alt text'
			},
			brandDescription: {
				control: 'text',
				description: 'Brand description text'
			},
			socialLinks: {
				control: 'object',
				description: 'Social media links'
			},
			copyright: {
				control: 'text',
				description: 'Copyright text (year will be automatically added)'
			},
			copyrightYear: {
				control: { type: 'number', min: 2000, max: 2100 },
				description: 'Copyright year (defaults to current year)'
			},
			companyName: {
				control: 'text',
				description: 'Company name for copyright'
			},
			layout: {
				control: { type: 'select' },
				options: ['multi-column', 'single-column', 'centered', 'minimal'],
				description: 'Layout variant'
			},
			variant: {
				control: { type: 'select' },
				options: [
					undefined,
					'primary',
					'secondary',
					'accent',
					'neutral',
					'base-200',
					'base-300'
				],
				description: 'Color variant'
			},
			bordered: {
				control: 'boolean',
				description: 'Whether to show border at top'
			},
			compact: {
				control: 'boolean',
				description: 'Whether to use compact spacing'
			},
			minimal: {
				control: 'boolean',
				description: 'Whether footer is in minimal state'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the footer'
			}
		}
	});

	// Sample footer sections
	const sampleSections: FooterSection[] = [
		{
			title: 'Product',
			links: [
				{ label: 'Features', href: '#features' },
				{ label: 'Pricing', href: '#pricing' },
				{ label: 'Documentation', href: '#docs' },
				{ label: 'Changelog', href: '#changelog' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'About', href: '#about' },
				{ label: 'Blog', href: '#blog' },
				{ label: 'Careers', href: '#careers' },
				{ label: 'Contact', href: '#contact' }
			]
		},
		{
			title: 'Legal',
			links: [
				{ label: 'Privacy Policy', href: '#privacy' },
				{ label: 'Terms of Service', href: '#terms' },
				{ label: 'Cookie Policy', href: '#cookies' }
			]
		}
	];

	// Sample social links (icons can be provided via brand snippet in actual usage)
	const sampleSocialLinks: SocialLink[] = [
		{
			platform: 'GitHub',
			href: 'https://github.com',
			ariaLabel: 'Visit our GitHub page'
		},
		{
			platform: 'Twitter',
			href: 'https://twitter.com',
			ariaLabel: 'Visit our Twitter page'
		},
		{
			platform: 'LinkedIn',
			href: 'https://linkedin.com',
			ariaLabel: 'Visit our LinkedIn page'
		}
	];

	// Minimal sections for minimal layout
	const minimalSections: FooterSection[] = [
		{
			title: 'Links',
			links: [
				{ label: 'Privacy', href: '#privacy' },
				{ label: 'Terms', href: '#terms' },
				{ label: 'Contact', href: '#contact' }
			]
		}
	];
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story
	name="Default Multi-Column"
	args={{
		sections: sampleSections,
		brandText: 'hexaWebShare',
		brandDescription: 'A comprehensive Svelte 5 component library',
		socialLinks: sampleSocialLinks,
		companyName: 'hexaTune LLC',
		layout: 'multi-column'
	}}
/>

<Story
	name="Single Column"
	args={{
		sections: sampleSections,
		brandText: 'hexaWebShare',
		brandDescription: 'A comprehensive Svelte 5 component library',
		socialLinks: sampleSocialLinks,
		companyName: 'hexaTune LLC',
		layout: 'single-column'
	}}
/>

<Story
	name="Centered Layout"
	args={{
		sections: sampleSections,
		brandText: 'hexaWebShare',
		brandDescription: 'A comprehensive Svelte 5 component library',
		socialLinks: sampleSocialLinks,
		companyName: 'hexaTune LLC',
		layout: 'centered'
	}}
/>

<Story
	name="Minimal Layout"
	args={{
		sections: minimalSections,
		brandText: 'hexaWebShare',
		companyName: 'hexaTune LLC',
		layout: 'minimal',
		minimal: true
	}}
/>

<Story
	name="Primary Variant"
	args={{
		sections: sampleSections,
		brandText: 'hexaWebShare',
		brandDescription: 'A comprehensive Svelte 5 component library',
		socialLinks: sampleSocialLinks,
		companyName: 'hexaTune LLC',
		variant: 'primary',
		layout: 'multi-column'
	}}
/>

<Story
	name="Secondary Variant"
	args={{
		sections: sampleSections,
		brandText: 'hexaWebShare',
		brandDescription: 'A comprehensive Svelte 5 component library',
		socialLinks: sampleSocialLinks,
		companyName: 'hexaTune LLC',
		variant: 'secondary',
		layout: 'multi-column'
	}}
/>

<Story
	name="Compact Spacing"
	args={{
		sections: sampleSections,
		brandText: 'hexaWebShare',
		brandDescription: 'A comprehensive Svelte 5 component library',
		socialLinks: sampleSocialLinks,
		companyName: 'hexaTune LLC',
		compact: true,
		layout: 'multi-column'
	}}
/>

<Story
	name="No Border"
	args={{
		sections: sampleSections,
		brandText: 'hexaWebShare',
		brandDescription: 'A comprehensive Svelte 5 component library',
		socialLinks: sampleSocialLinks,
		companyName: 'hexaTune LLC',
		bordered: false,
		layout: 'multi-column'
	}}
/>

<Story
	name="With Custom Copyright"
	args={{
		sections: sampleSections,
		brandText: 'hexaWebShare',
		brandDescription: 'A comprehensive Svelte 5 component library',
		socialLinks: sampleSocialLinks,
		copyright: 'All rights reserved. Licensed under MIT.',
		layout: 'multi-column'
	}}
/>

<Story
	name="Without Social Links"
	args={{
		sections: sampleSections,
		brandText: 'hexaWebShare',
		brandDescription: 'A comprehensive Svelte 5 component library',
		companyName: 'hexaTune LLC',
		layout: 'multi-column'
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		sections: sampleSections,
		brandText: 'hexaWebShare',
		brandDescription: 'A comprehensive Svelte 5 component library',
		socialLinks: sampleSocialLinks,
		companyName: 'hexaTune LLC',
		layout: 'multi-column',
		variant: undefined,
		bordered: true,
		compact: false,
		minimal: false,
		copyrightYear: new Date().getFullYear()
	}}
/>

