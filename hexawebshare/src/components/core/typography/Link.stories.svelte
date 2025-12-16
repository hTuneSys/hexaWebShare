<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Link from './Link.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Typography/Link',
		component: Link,
		tags: ['autodocs'],
		argTypes: {
			href: {
				control: 'text',
				description: 'The URL or path to link to',
				type: { name: 'string', required: true }
			},
			label: {
				control: 'text',
				description: 'Link text content'
			},
			variant: {
				control: { type: 'select' },
				options: [
					undefined,
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the link'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Size of the link text'
			},
			target: {
				control: { type: 'select' },
				options: [undefined, '_blank', '_self', '_parent', '_top'],
				description: 'Where to open the linked document'
			},
			underline: {
				control: { type: 'select' },
				options: ['hover', 'always', 'never', true, false],
				description: 'Underline behavior'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the link is disabled'
			},
			hoverable: {
				control: 'boolean',
				description: 'Whether to show hover effect'
			},
			fontWeight: {
				control: { type: 'select' },
				options: ['normal', 'medium', 'semibold', 'bold'],
				description: 'Font weight of the link'
			},
			external: {
				control: 'boolean',
				description: 'Whether to show external link icon'
			},
			download: {
				control: { type: 'text' },
				description: 'Download attribute for download links'
			},
			ariaLabel: {
				control: 'text',
				description: 'ARIA label for accessibility'
			},
			title: {
				control: 'text',
				description: 'Title attribute for tooltip'
			}
		},
		args: {
			onclick: fn(),
			href: 'https://example.com',
			label: 'Example Link'
		},
		parameters: {
			docs: {
				description: {
					component:
						'A flexible and accessible link component with multiple variants, sizes, and behaviors. Supports internal/external links, downloads, and custom styling.'
				}
			}
		}
	});
</script>

<!-- Default Link with Preview -->
<Story name="Default">
	{#snippet children()}
		<div class="bg-base-100 p-8">
			<p class="mb-4 text-base-content">
				This is a paragraph with a <Link href="https://example.com" label="default link" /> embedded
				in the text.
			</p>
		</div>
	{/snippet}
</Story>

<!-- Color Variants Showcase -->
<Story name="Color Variants">
	{#snippet children()}
		<div class="space-y-4 bg-base-100 p-8">
			<div class="grid grid-cols-2 gap-4">
				<div class="rounded bg-base-200 p-4">
					<h4 class="mb-2 text-sm font-semibold">Primary</h4>
					<Link href="https://example.com" label="Primary Link" variant="primary" />
				</div>
				<div class="rounded bg-base-200 p-4">
					<h4 class="mb-2 text-sm font-semibold">Secondary</h4>
					<Link href="https://example.com" label="Secondary Link" variant="secondary" />
				</div>
				<div class="rounded bg-base-200 p-4">
					<h4 class="mb-2 text-sm font-semibold">Accent</h4>
					<Link href="https://example.com" label="Accent Link" variant="accent" />
				</div>
				<div class="rounded bg-base-200 p-4">
					<h4 class="mb-2 text-sm font-semibold">Neutral</h4>
					<Link href="https://example.com" label="Neutral Link" variant="neutral" />
				</div>
				<div class="rounded bg-base-200 p-4">
					<h4 class="mb-2 text-sm font-semibold">Info</h4>
					<Link href="https://example.com" label="Info Link" variant="info" />
				</div>
				<div class="rounded bg-base-200 p-4">
					<h4 class="mb-2 text-sm font-semibold">Success</h4>
					<Link href="https://example.com" label="Success Link" variant="success" />
				</div>
				<div class="rounded bg-base-200 p-4">
					<h4 class="mb-2 text-sm font-semibold">Warning</h4>
					<Link href="https://example.com" label="Warning Link" variant="warning" />
				</div>
				<div class="rounded bg-base-200 p-4">
					<h4 class="mb-2 text-sm font-semibold">Error</h4>
					<Link href="https://example.com" label="Error Link" variant="error" />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Size Variants Showcase -->
<Story name="Size Variants">
	{#snippet children()}
		<div class="space-y-4 bg-base-100 p-8">
			<div class="flex flex-wrap items-end gap-6">
				<div class="text-center">
					<div class="mb-1 text-xs text-base-content/60">Extra Small</div>
					<Link href="https://example.com" label="XS Link" size="xs" variant="primary" />
				</div>
				<div class="text-center">
					<div class="mb-1 text-xs text-base-content/60">Small</div>
					<Link href="https://example.com" label="Small Link" size="sm" variant="primary" />
				</div>
				<div class="text-center">
					<div class="mb-1 text-xs text-base-content/60">Medium</div>
					<Link href="https://example.com" label="Medium Link" size="md" variant="primary" />
				</div>
				<div class="text-center">
					<div class="mb-1 text-xs text-base-content/60">Large</div>
					<Link href="https://example.com" label="Large Link" size="lg" variant="primary" />
				</div>
				<div class="text-center">
					<div class="mb-1 text-xs text-base-content/60">Extra Large</div>
					<Link href="https://example.com" label="XL Link" size="xl" variant="primary" />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Underline Behaviors -->
<Story name="Underline Behaviors">
	{#snippet children()}
		<div class="bg-base-100 p-8">
			<div class="grid grid-cols-3 gap-6">
				<div class="rounded bg-base-200 p-4 text-center">
					<h4 class="mb-3 text-sm font-semibold">Hover Underline</h4>
					<Link
						href="https://example.com"
						label="Hover to see underline"
						underline="hover"
						variant="primary"
					/>
					<p class="mt-2 text-xs text-base-content/60">Underlines on hover</p>
				</div>
				<div class="rounded bg-base-200 p-4 text-center">
					<h4 class="mb-3 text-sm font-semibold">Always Underlined</h4>
					<Link
						href="https://example.com"
						label="Always underlined"
						underline="always"
						variant="primary"
					/>
					<p class="mt-2 text-xs text-base-content/60">Always shows underline</p>
				</div>
				<div class="rounded bg-base-200 p-4 text-center">
					<h4 class="mb-3 text-sm font-semibold">Never Underlined</h4>
					<Link
						href="https://example.com"
						label="Never underlined"
						underline="never"
						variant="primary"
					/>
					<p class="mt-2 text-xs text-base-content/60">No underline ever</p>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Font Weight Variations -->
<Story name="Font Weights">
	{#snippet children()}
		<div class="space-y-3 bg-base-100 p-8">
			<div class="flex items-center gap-4">
				<span class="w-20 text-sm text-base-content/60">Normal:</span>
				<Link
					href="https://example.com"
					label="Normal weight text in a link"
					fontWeight="normal"
					size="lg"
				/>
			</div>
			<div class="flex items-center gap-4">
				<span class="w-20 text-sm text-base-content/60">Medium:</span>
				<Link
					href="https://example.com"
					label="Medium weight text in a link"
					fontWeight="medium"
					size="lg"
				/>
			</div>
			<div class="flex items-center gap-4">
				<span class="w-20 text-sm text-base-content/60">Semibold:</span>
				<Link
					href="https://example.com"
					label="Semibold weight text in a link"
					fontWeight="semibold"
					size="lg"
				/>
			</div>
			<div class="flex items-center gap-4">
				<span class="w-20 text-sm text-base-content/60">Bold:</span>
				<Link
					href="https://example.com"
					label="Bold weight text in a link"
					fontWeight="bold"
					size="lg"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Special States -->
<Story name="Special States">
	{#snippet children()}
		<div class="space-y-6 bg-base-100 p-8">
			<div class="card bg-base-200 p-4">
				<h4 class="mb-3 font-semibold">External Link</h4>
				<Link
					href="https://github.com"
					label="Visit GitHub"
					external={true}
					target="_blank"
					variant="primary"
					size="lg"
				/>
				<p class="mt-2 text-sm text-base-content/60">Shows external icon and opens in new tab</p>
			</div>

			<div class="card bg-base-200 p-4">
				<h4 class="mb-3 font-semibold">Disabled Link</h4>
				<Link
					href="https://example.com"
					label="This link is disabled"
					disabled={true}
					variant="primary"
					size="lg"
				/>
				<p class="mt-2 text-sm text-base-content/60">Non-clickable and visually muted</p>
			</div>

			<div class="card bg-base-200 p-4">
				<h4 class="mb-3 font-semibold">Download Link</h4>
				<Link
					href="/document.pdf"
					label="Download PDF Document"
					download="my-document.pdf"
					variant="success"
					size="lg"
				/>
				<p class="mt-2 text-sm text-base-content/60">Triggers file download on click</p>
			</div>

			<div class="card bg-base-200 p-4">
				<h4 class="mb-3 font-semibold">Link with Tooltip</h4>
				<Link
					href="https://example.com"
					label="Hover for more info"
					title="This link will take you to an example website"
					variant="info"
					size="lg"
				/>
				<p class="mt-2 text-sm text-base-content/60">Shows tooltip on hover</p>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Real-world Examples -->
<Story name="Navigation Bar Example">
	{#snippet children()}
		<nav class="navbar rounded-box bg-base-200 p-4">
			<div class="flex-1">
				<Link href="/" label="🏠 Home" fontWeight="bold" size="lg" />
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal gap-2 px-1">
					<li><Link href="/products" label="Products" /></li>
					<li><Link href="/services" label="Services" /></li>
					<li><Link href="/about" label="About" /></li>
					<li><Link href="/contact" label="Contact" variant="primary" fontWeight="semibold" /></li>
				</ul>
			</div>
		</nav>
	{/snippet}
</Story>

<!-- Footer Links Example -->
<Story name="Footer Links">
	{#snippet children()}
		<footer class="rounded-box bg-base-200 p-8">
			<div class="grid grid-cols-4 gap-8">
				<div>
					<h3 class="mb-4 text-lg font-bold">Company</h3>
					<div class="space-y-2">
						<div><Link href="/about" label="About Us" size="sm" /></div>
						<div><Link href="/careers" label="Careers" size="sm" /></div>
						<div><Link href="/press" label="Press Kit" size="sm" /></div>
						<div><Link href="/blog" label="Blog" size="sm" /></div>
					</div>
				</div>
				<div>
					<h3 class="mb-4 text-lg font-bold">Products</h3>
					<div class="space-y-2">
						<div><Link href="/features" label="Features" size="sm" /></div>
						<div><Link href="/pricing" label="Pricing" size="sm" /></div>
						<div><Link href="/security" label="Security" size="sm" /></div>
						<div><Link href="/enterprise" label="Enterprise" size="sm" /></div>
					</div>
				</div>
				<div>
					<h3 class="mb-4 text-lg font-bold">Resources</h3>
					<div class="space-y-2">
						<div><Link href="/docs" label="Documentation" size="sm" /></div>
						<div><Link href="/api" label="API Reference" size="sm" /></div>
						<div><Link href="/guides" label="Guides" size="sm" /></div>
						<div><Link href="/support" label="Support" size="sm" /></div>
					</div>
				</div>
				<div>
					<h3 class="mb-4 text-lg font-bold">Legal</h3>
					<div class="space-y-2">
						<div><Link href="/privacy" label="Privacy Policy" size="sm" /></div>
						<div><Link href="/terms" label="Terms of Service" size="sm" /></div>
						<div><Link href="/cookies" label="Cookie Policy" size="sm" /></div>
						<div><Link href="/licenses" label="Licenses" size="sm" /></div>
					</div>
				</div>
			</div>
		</footer>
	{/snippet}
</Story>

<!-- Social Media Links -->
<Story name="Social Media Links">
	{#snippet children()}
		<div class="bg-base-100 p-8">
			<h3 class="mb-4 font-bold">Follow Us</h3>
			<div class="flex flex-wrap gap-4">
				<Link
					href="https://twitter.com/hexatune"
					label="🐦 Twitter"
					variant="info"
					external={true}
					target="_blank"
				/>
				<Link
					href="https://github.com/hTuneSys"
					label="🐙 GitHub"
					variant="neutral"
					external={true}
					target="_blank"
				/>
				<Link
					href="https://linkedin.com/company/hexatune"
					label="💼 LinkedIn"
					variant="primary"
					external={true}
					target="_blank"
				/>
				<Link
					href="https://youtube.com/@hexatune"
					label="📺 YouTube"
					variant="error"
					external={true}
					target="_blank"
				/>
				<Link
					href="https://instagram.com/hexatune"
					label="📷 Instagram"
					variant="accent"
					external={true}
					target="_blank"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Breadcrumb Navigation -->
<Story name="Breadcrumb">
	{#snippet children()}
		<div class="bg-base-100 p-8">
			<div class="breadcrumbs text-sm">
				<ul>
					<li><Link href="/" label="Home" /></li>
					<li><Link href="/products" label="Products" /></li>
					<li><Link href="/products/electronics" label="Electronics" /></li>
					<li><Link href="/products/electronics/phones" label="Phones" /></li>
					<li class="text-base-content/60">iPhone 15 Pro</li>
				</ul>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Call to Action Links -->
<Story name="Call to Action">
	{#snippet children()}
		<div class="rounded-box bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
			<div class="space-y-6 text-center">
				<h2 class="text-3xl font-bold">Ready to Get Started?</h2>
				<p class="text-lg text-base-content/80">Choose the plan that works best for you</p>

				<div class="flex flex-wrap justify-center gap-4">
					<Link
						href="/signup"
						label="🚀 Start Free Trial"
						variant="primary"
						size="lg"
						fontWeight="bold"
						underline="never"
					/>
					<Link
						href="/pricing"
						label="💰 View Pricing"
						variant="accent"
						size="lg"
						fontWeight="semibold"
					/>
					<Link
						href="/demo"
						label="📅 Schedule Demo"
						variant="success"
						size="lg"
						underline="always"
					/>
				</div>

				<p class="text-sm text-base-content/60">
					No credit card required •
					<Link href="/terms" label="Terms apply" size="sm" variant="neutral" />
				</p>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Article with Inline Links -->
<Story name="Article Content">
	{#snippet children()}
		<article class="prose max-w-none bg-base-100 p-8">
			<h2>Getting Started with hexaWebShare</h2>
			<p>
				Welcome to <Link
					href="https://hexatune.com"
					label="hexaTune's"
					external={true}
					variant="primary"
				/>
				component library. This comprehensive guide will help you integrate our
				<Link href="/components" label="UI components" variant="accent" /> into your Svelte application.
			</p>
			<p>
				First, check out our <Link
					href="/docs/installation"
					label="installation guide"
					fontWeight="semibold"
				/>
				to set up the library. If you encounter any issues, visit our
				<Link href="/support" label="support center" variant="info" /> or
				<Link
					href="https://github.com/hTuneSys/hexaWebShare/issues"
					label="report a bug"
					variant="error"
					external={true}
				/>.
			</p>
			<p>
				For advanced usage, see our <Link href="/docs/api" label="API documentation" /> and
				<Link href="/examples" label="live examples" variant="success" />. You can also
				<Link
					href="/newsletter"
					label="subscribe to our newsletter"
					underline="always"
					variant="primary"
				/>
				for updates.
			</p>
		</article>
	{/snippet}
</Story>

<!-- Email and Phone Links -->
<Story name="Contact Links">
	{#snippet children()}
		<div class="bg-base-100 p-8">
			<div class="card max-w-md bg-base-200 p-6">
				<h3 class="mb-4 text-xl font-bold">Contact Information</h3>
				<div class="space-y-3">
					<div class="flex items-center gap-3">
						<span class="text-2xl">📧</span>
						<Link
							href="mailto:support@hexatune.com"
							label="support@hexatune.com"
							variant="primary"
						/>
					</div>
					<div class="flex items-center gap-3">
						<span class="text-2xl">📱</span>
						<Link href="tel:+1-555-0123" label="+1 (555) 012-3456" variant="accent" />
					</div>
					<div class="flex items-center gap-3">
						<span class="text-2xl">💬</span>
						<Link
							href="https://wa.me/15550123456"
							label="WhatsApp Chat"
							variant="success"
							external={true}
						/>
					</div>
					<div class="flex items-center gap-3">
						<span class="text-2xl">📍</span>
						<Link
							href="https://maps.google.com/?q=hexaTune+HQ"
							label="View on Map"
							variant="info"
							external={true}
						/>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Mixed Styles Showcase -->
<Story name="Style Combinations">
	{#snippet children()}
		<div class="space-y-4 bg-base-100 p-8">
			<div class="alert alert-info">
				<span>💡 Links can combine multiple style properties for unique appearances</span>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="card bg-base-200 p-4">
					<Link
						href="#"
						label="Large Bold Primary with Hover"
						variant="primary"
						size="lg"
						fontWeight="bold"
						underline="hover"
					/>
				</div>
				<div class="card bg-base-200 p-4">
					<Link
						href="#"
						label="Small Secondary Always Underlined"
						variant="secondary"
						size="sm"
						underline="always"
					/>
				</div>
				<div class="card bg-base-200 p-4">
					<Link
						href="#"
						label="Medium Success External"
						variant="success"
						size="md"
						external={true}
					/>
				</div>
				<div class="card bg-base-200 p-4">
					<Link
						href="#"
						label="XL Accent Semibold"
						variant="accent"
						size="xl"
						fontWeight="semibold"
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Accessibility Example -->
<Story name="Accessibility Features">
	{#snippet children()}
		<div class="space-y-6 bg-base-100 p-8">
			<div class="alert alert-success">
				<span>✅ All links include proper accessibility features</span>
			</div>

			<div class="space-y-4">
				<div class="card bg-base-200 p-4">
					<h4 class="mb-2 font-semibold">With ARIA Label</h4>
					<Link
						href="/products"
						label="Products"
						ariaLabel="View all our products and services"
						variant="primary"
					/>
					<p class="mt-2 text-sm text-base-content/60">
						Screen readers will announce the full description
					</p>
				</div>

				<div class="card bg-base-200 p-4">
					<h4 class="mb-2 font-semibold">Keyboard Navigation</h4>
					<Link
						href="/dashboard"
						label="Dashboard (Tab to focus, Enter to activate)"
						variant="accent"
					/>
					<p class="mt-2 text-sm text-base-content/60">Fully keyboard accessible</p>
				</div>

				<div class="card bg-base-200 p-4">
					<h4 class="mb-2 font-semibold">Focus Indicators</h4>
					<Link href="/settings" label="Settings (Tab here to see focus ring)" variant="info" />
					<p class="mt-2 text-sm text-base-content/60">Clear focus indicators for keyboard users</p>
				</div>
			</div>
		</div>
	{/snippet}
</Story>
