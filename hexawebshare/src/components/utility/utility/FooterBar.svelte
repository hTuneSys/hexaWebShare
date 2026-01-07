<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Footer link item interface
	 */
	export interface FooterLink {
		/**
		 * Link text
		 */
		label: string;
		/**
		 * Link URL
		 */
		href: string;
		/**
		 * Whether the link opens in a new tab
		 * @default false
		 */
		target?: '_blank' | '_self' | '_parent' | '_top';
		/**
		 * Rel attribute for security (e.g., 'noopener noreferrer')
		 */
		rel?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
	}

	/**
	 * Footer section/column interface
	 */
	export interface FooterSection {
		/**
		 * Section title
		 */
		title: string;
		/**
		 * Links in this section
		 */
		links: FooterLink[];
	}

	/**
	 * Social media link interface
	 */
	export interface SocialLink {
		/**
		 * Social platform name (for accessibility)
		 */
		platform: string;
		/**
		 * Link URL
		 */
		href: string;
		/**
		 * Icon SVG content or icon name
		 */
		icon?: Snippet;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
	}

	/**
	 * Props interface for the FooterBar component
	 */
	interface Props {
		/**
		 * Footer sections/columns
		 */
		sections?: FooterSection[];
		/**
		 * Logo/brand area content
		 */
		brand?: Snippet;
		/**
		 * Brand text (alternative to brand snippet)
		 */
		brandText?: string;
		/**
		 * Brand logo image URL
		 */
		brandLogo?: string;
		/**
		 * Brand logo alt text
		 */
		brandLogoAlt?: string;
		/**
		 * Brand description text
		 */
		brandDescription?: string;
		/**
		 * Social media links
		 */
		socialLinks?: SocialLink[];
		/**
		 * Copyright text (year will be automatically added if not included)
		 */
		copyright?: string;
		/**
		 * Copyright year (defaults to current year)
		 */
		copyrightYear?: number;
		/**
		 * Company name for copyright
		 */
		companyName?: string;
		/**
		 * Additional footer content (bottom section)
		 */
		bottomContent?: Snippet;
		/**
		 * Layout variant
		 * @default 'multi-column'
		 */
		layout?: 'multi-column' | 'single-column' | 'centered' | 'minimal';
		/**
		 * Color variant
		 * @default undefined (default footer style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'base-200' | 'base-300';
		/**
		 * Whether to show border at top
		 * @default true
		 */
		bordered?: boolean;
		/**
		 * Whether to use compact spacing
		 * @default false
		 */
		compact?: boolean;
		/**
		 * Whether footer is in minimal state (reduced content)
		 * @default false
		 */
		minimal?: boolean;
		/**
		 * Accessible label for the footer
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		sections = [],
		brand,
		brandText,
		brandLogo,
		brandLogoAlt = 'Logo',
		brandDescription,
		socialLinks = [],
		copyright,
		copyrightYear = new Date().getFullYear(),
		companyName,
		bottomContent,
		layout = 'multi-column',
		variant,
		bordered = true,
		compact = false,
		minimal = false,
		ariaLabel = 'Site footer',
		class: className = ''
	}: Props = $props();

	// Get current year if not provided
	let currentYear = $derived(copyrightYear || new Date().getFullYear());

	// Generate copyright text
	let copyrightText = $derived(() => {
		if (copyright) {
			return copyright.includes(currentYear.toString())
				? copyright
				: `© ${currentYear} ${copyright}`;
		}
		if (companyName) {
			return `© ${currentYear} ${companyName}. All rights reserved.`;
		}
		return `© ${currentYear}. All rights reserved.`;
	});

	// Footer container classes
	let footerClasses = $derived(
		[
			'footer',
			variant === 'primary' && 'bg-primary text-primary-content',
			variant === 'secondary' && 'bg-secondary text-secondary-content',
			variant === 'accent' && 'bg-accent text-accent-content',
			variant === 'neutral' && 'bg-neutral text-neutral-content',
			variant === 'base-200' && 'bg-base-200',
			variant === 'base-300' && 'bg-base-300',
			!variant && 'bg-base-100',
			bordered && 'border-t border-base-300',
			compact && 'p-4',
			!compact && 'p-10',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Footer content container classes
	let contentClasses = $derived(
		[
			'container',
			'mx-auto',
			layout === 'centered' && 'text-center',
			layout === 'minimal' && 'max-w-2xl'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Grid classes for sections
	let gridClasses = $derived(
		[
			layout === 'multi-column' && sections.length > 0 && 'grid',
			layout === 'multi-column' &&
				sections.length > 0 &&
				'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
			layout === 'multi-column' && sections.length > 0 && 'gap-8',
			layout === 'single-column' && 'flex flex-col gap-6',
			layout === 'centered' && 'flex flex-col items-center gap-6',
			layout === 'minimal' && 'flex flex-col gap-4'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Section classes
	let sectionClasses = $derived(
		[
			layout === 'centered' && 'text-center',
			layout === 'minimal' && 'text-center'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Social links container classes
	let socialClasses = $derived(
		[
			'flex',
			'gap-2',
			layout === 'centered' && 'justify-center',
			layout === 'minimal' && 'justify-center',
			layout !== 'centered' && layout !== 'minimal' && 'justify-start'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<footer class={footerClasses} aria-label={ariaLabel}>
	<div class={contentClasses}>
		{#if layout === 'multi-column' && (sections.length > 0 || brand || brandText || brandLogo)}
			<!-- Multi-column layout -->
			<div class={gridClasses}>
				<!-- Brand/Logo Section -->
				{#if brand || brandText || brandLogo}
					<div class={sectionClasses}>
						{#if brand}
							{@render brand()}
						{:else}
							<div class="flex flex-col gap-2">
								{#if brandLogo}
									<img
										src={brandLogo}
										alt={brandLogoAlt}
										class="h-8 w-auto mb-2"
										loading="lazy"
									/>
								{/if}
								{#if brandText}
									<h3 class="footer-title text-lg font-bold">{brandText}</h3>
								{/if}
								{#if brandDescription}
									<p class="text-sm opacity-70">{brandDescription}</p>
								{/if}
							</div>
						{/if}

						<!-- Social Links -->
						{#if socialLinks.length > 0 && !minimal}
							<div class={socialClasses + ' mt-4'}>
								{#each socialLinks as socialLink}
									<a
										href={socialLink.href}
										target="_blank"
										rel="noopener noreferrer"
										class="btn btn-circle btn-ghost btn-sm"
										aria-label={socialLink.ariaLabel || `Visit our ${socialLink.platform} page`}
									>
										{#if socialLink.icon}
											{@render socialLink.icon()}
										{:else}
											<span class="text-xs font-semibold">{socialLink.platform.charAt(0)}</span>
											<span class="sr-only">{socialLink.platform}</span>
										{/if}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/if}

				<!-- Footer Sections -->
				{#each sections as section}
					<nav class={sectionClasses} aria-label={section.title}>
						<h3 class="footer-title text-base font-semibold mb-4">{section.title}</h3>
						<ul class="flex flex-col gap-2">
							{#each section.links as link}
								<li>
									<a
										href={link.href}
										target={link.target || '_self'}
										rel={link.rel || (link.target === '_blank' ? 'noopener noreferrer' : undefined)}
										class="link link-hover text-sm"
										aria-label={link.ariaLabel || link.label}
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				{/each}
			</div>
		{:else if layout === 'single-column'}
			<!-- Single column layout -->
			<div class={gridClasses}>
				{#if brand || brandText || brandLogo}
					<div class={sectionClasses}>
						{#if brand}
							{@render brand()}
						{:else}
							<div class="flex flex-col items-center gap-2">
								{#if brandLogo}
									<img
										src={brandLogo}
										alt={brandLogoAlt}
										class="h-8 w-auto"
										loading="lazy"
									/>
								{/if}
								{#if brandText}
									<h3 class="footer-title text-lg font-bold">{brandText}</h3>
								{/if}
								{#if brandDescription}
									<p class="text-sm opacity-70 text-center">{brandDescription}</p>
								{/if}
							</div>
						{/if}
					</div>
				{/if}

				{#if sections.length > 0}
					{#each sections as section}
						<nav class={sectionClasses} aria-label={section.title}>
							<h3 class="footer-title text-base font-semibold mb-4 text-center">
								{section.title}
							</h3>
							<ul class="flex flex-col items-center gap-2">
								{#each section.links as link}
									<li>
										<a
											href={link.href}
											target={link.target || '_self'}
											rel={link.rel || (link.target === '_blank' ? 'noopener noreferrer' : undefined)}
											class="link link-hover text-sm"
											aria-label={link.ariaLabel || link.label}
										>
											{link.label}
										</a>
									</li>
								{/each}
							</ul>
						</nav>
					{/each}
				{/if}

				{#if socialLinks.length > 0 && !minimal}
					<div class={socialClasses}>
						{#each socialLinks as socialLink}
							<a
								href={socialLink.href}
								target="_blank"
								rel="noopener noreferrer"
								class="btn btn-circle btn-ghost btn-sm"
								aria-label={socialLink.ariaLabel || `Visit our ${socialLink.platform} page`}
							>
								{#if socialLink.icon}
									{@render socialLink.icon()}
								{:else}
									<span class="text-xs font-semibold">{socialLink.platform.charAt(0)}</span>
									<span class="sr-only">{socialLink.platform}</span>
								{/if}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{:else if layout === 'centered'}
			<!-- Centered layout -->
			<div class={gridClasses}>
				{#if brand || brandText || brandLogo}
					<div class={sectionClasses}>
						{#if brand}
							{@render brand()}
						{:else}
							<div class="flex flex-col items-center gap-2">
								{#if brandLogo}
									<img
										src={brandLogo}
										alt={brandLogoAlt}
										class="h-8 w-auto"
										loading="lazy"
									/>
								{/if}
								{#if brandText}
									<h3 class="footer-title text-lg font-bold">{brandText}</h3>
								{/if}
								{#if brandDescription}
									<p class="text-sm opacity-70">{brandDescription}</p>
								{/if}
							</div>
						{/if}
					</div>
				{/if}

				{#if sections.length > 0}
					{#each sections as section}
						<nav class={sectionClasses} aria-label={section.title}>
							<h3 class="footer-title text-base font-semibold mb-4">{section.title}</h3>
							<ul class="flex flex-wrap justify-center gap-4">
								{#each section.links as link}
									<li>
										<a
											href={link.href}
											target={link.target || '_self'}
											rel={link.rel || (link.target === '_blank' ? 'noopener noreferrer' : undefined)}
											class="link link-hover text-sm"
											aria-label={link.ariaLabel || link.label}
										>
											{link.label}
										</a>
									</li>
								{/each}
							</ul>
						</nav>
					{/each}
				{/if}

				{#if socialLinks.length > 0 && !minimal}
					<div class={socialClasses}>
						{#each socialLinks as socialLink}
							<a
								href={socialLink.href}
								target="_blank"
								rel="noopener noreferrer"
								class="btn btn-circle btn-ghost btn-sm"
								aria-label={socialLink.ariaLabel || `Visit our ${socialLink.platform} page`}
							>
								{#if socialLink.icon}
									{@render socialLink.icon()}
								{:else}
									<span class="text-xs font-semibold">{socialLink.platform.charAt(0)}</span>
									<span class="sr-only">{socialLink.platform}</span>
								{/if}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<!-- Minimal layout -->
			<div class={gridClasses}>
				{#if brand || brandText || brandLogo}
					<div class={sectionClasses}>
						{#if brand}
							{@render brand()}
						{:else}
							<div class="flex flex-col items-center gap-2">
								{#if brandLogo}
									<img
										src={brandLogo}
										alt={brandLogoAlt}
										class="h-6 w-auto"
										loading="lazy"
									/>
								{/if}
								{#if brandText}
									<h3 class="footer-title text-base font-bold">{brandText}</h3>
								{/if}
							</div>
						{/if}
					</div>
				{/if}

				{#if sections.length > 0 && !minimal}
					<nav class={sectionClasses} aria-label="Footer links">
						<ul class="flex flex-wrap justify-center gap-4">
							{#each sections as section}
								{#each section.links as link}
									<li>
										<a
											href={link.href}
											target={link.target || '_self'}
											rel={link.rel || (link.target === '_blank' ? 'noopener noreferrer' : undefined)}
											class="link link-hover text-sm"
											aria-label={link.ariaLabel || link.label}
										>
											{link.label}
										</a>
									</li>
								{/each}
							{/each}
						</ul>
					</nav>
				{/if}

				{#if socialLinks.length > 0 && !minimal}
					<div class={socialClasses}>
						{#each socialLinks as socialLink}
							<a
								href={socialLink.href}
								target="_blank"
								rel="noopener noreferrer"
								class="btn btn-circle btn-ghost btn-sm"
								aria-label={socialLink.ariaLabel || `Visit our ${socialLink.platform} page`}
							>
								{#if socialLink.icon}
									{@render socialLink.icon()}
								{:else}
									<span class="text-xs font-semibold">{socialLink.platform.charAt(0)}</span>
									<span class="sr-only">{socialLink.platform}</span>
								{/if}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Bottom Section (Copyright and additional content) -->
		<div class="divider my-4"></div>
		<div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70">
			<div>
				<p>{copyrightText()}</p>
			</div>
			{#if bottomContent}
				<div>{@render bottomContent()}</div>
			{/if}
		</div>
	</div>
</footer>

