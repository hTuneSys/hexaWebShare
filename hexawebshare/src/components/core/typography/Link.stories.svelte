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
			href: '#',
			label: 'Link Text'
		}
	});
</script>

<!-- Default Link -->
<Story name="Default" args={{ href: '#', label: 'Default Link' }} />

<!-- Color Variants -->
<Story name="Primary" args={{ href: '#', label: 'Primary Link', variant: 'primary' }} />
<Story name="Secondary" args={{ href: '#', label: 'Secondary Link', variant: 'secondary' }} />
<Story name="Accent" args={{ href: '#', label: 'Accent Link', variant: 'accent' }} />
<Story name="Neutral" args={{ href: '#', label: 'Neutral Link', variant: 'neutral' }} />
<Story name="Info" args={{ href: '#', label: 'Info Link', variant: 'info' }} />
<Story name="Success" args={{ href: '#', label: 'Success Link', variant: 'success' }} />
<Story name="Warning" args={{ href: '#', label: 'Warning Link', variant: 'warning' }} />
<Story name="Error" args={{ href: '#', label: 'Error Link', variant: 'error' }} />

<!-- Size Variants -->
<Story name="Extra Small" args={{ href: '#', label: 'Extra Small Link', size: 'xs' }} />
<Story name="Small" args={{ href: '#', label: 'Small Link', size: 'sm' }} />
<Story name="Medium" args={{ href: '#', label: 'Medium Link', size: 'md' }} />
<Story name="Large" args={{ href: '#', label: 'Large Link', size: 'lg' }} />
<Story name="Extra Large" args={{ href: '#', label: 'Extra Large Link', size: 'xl' }} />

<!-- Underline Behavior -->
<Story
	name="Underline Hover"
	args={{ href: '#', label: 'Hover to Underline', underline: 'hover' }}
/>
<Story
	name="Always Underlined"
	args={{ href: '#', label: 'Always Underlined', underline: 'always' }}
/>
<Story
	name="Never Underlined"
	args={{ href: '#', label: 'Never Underlined', underline: 'never' }}
/>

<!-- Font Weight -->
<Story
	name="Normal Weight"
	args={{ href: '#', label: 'Normal Font Weight', fontWeight: 'normal' }}
/>
<Story
	name="Medium Weight"
	args={{ href: '#', label: 'Medium Font Weight', fontWeight: 'medium' }}
/>
<Story
	name="Semibold Weight"
	args={{ href: '#', label: 'Semibold Font Weight', fontWeight: 'semibold' }}
/>
<Story name="Bold Weight" args={{ href: '#', label: 'Bold Font Weight', fontWeight: 'bold' }} />

<!-- Special States -->
<Story
	name="External Link"
	args={{
		href: 'https://example.com',
		label: 'External Website',
		external: true,
		target: '_blank'
	}}
/>
<Story name="Disabled Link" args={{ href: '#', label: 'Disabled Link', disabled: true }} />
<Story
	name="Download Link"
	args={{ href: '/file.pdf', label: 'Download PDF', download: 'document.pdf' }}
/>

<!-- With Title Tooltip -->
<Story
	name="With Tooltip"
	args={{ href: '#', label: 'Hover for Tooltip', title: 'This is a helpful tooltip' }}
/>

<!-- Complex Examples -->
<Story
	name="Email Link"
	args={{
		href: 'mailto:contact@example.com',
		label: 'Send Email',
		variant: 'primary',
		external: true
	}}
/>
<Story name="Phone Link" args={{ href: 'tel:+1234567890', label: 'Call Us', variant: 'accent' }} />

<!-- Accessibility Example -->
<Story
	name="With ARIA Label"
	args={{ href: '#', label: 'Learn More', ariaLabel: 'Learn more about our services' }}
/>

<!-- Combined Features -->
<Story
	name="Featured Link"
	args={{
		href: 'https://hexatune.com',
		label: 'Visit hexaTune',
		variant: 'primary',
		size: 'lg',
		fontWeight: 'bold',
		external: true,
		target: '_blank',
		title: 'Visit hexaTune official website'
	}}
/>

<!-- Inline with Text Example -->
<Story name="Inline Text Example">
	{#snippet children()}
		<div class="prose">
			<p>
				This is a paragraph with an
				<Link href="#" variant="primary" label="inline link" />
				that demonstrates how links work within text content.
			</p>
		</div>
	{/snippet}
</Story>

<!-- Custom Content with Children -->
<Story name="With Custom Children">
	{#snippet children()}
		<Link href="#" variant="accent">
			{#snippet children()}
				<span>🔗</span> Custom Link Content
			{/snippet}
		</Link>
	{/snippet}
</Story>

<!-- Multiple Links Example -->
<Story name="Link Collection">
	{#snippet children()}
		<div class="space-y-2">
			<div><Link href="#" variant="primary" label="Primary Navigation Link" /></div>
			<div><Link href="#" variant="secondary" label="Secondary Navigation Link" /></div>
			<div><Link href="#" variant="accent" label="Accent Navigation Link" /></div>
			<div><Link href="#" variant="info" label="Info Navigation Link" /></div>
		</div>
	{/snippet}
</Story>

<!-- Navigation Bar Example -->
<Story name="Navigation Bar">
	{#snippet children()}
		<nav class="flex gap-4">
			<Link href="#" label="Home" fontWeight="medium" />
			<Link href="#" label="About" fontWeight="medium" />
			<Link href="#" label="Services" fontWeight="medium" />
			<Link href="#" label="Contact" fontWeight="medium" variant="primary" />
		</nav>
	{/snippet}
</Story>

<!-- Footer Links Example -->
<Story name="Footer Links">
	{#snippet children()}
		<div class="grid grid-cols-3 gap-4">
			<div>
				<h3 class="mb-2 font-bold">Company</h3>
				<div class="space-y-1">
					<div><Link href="#" label="About Us" size="sm" /></div>
					<div><Link href="#" label="Careers" size="sm" /></div>
					<div><Link href="#" label="Press" size="sm" /></div>
				</div>
			</div>
			<div>
				<h3 class="mb-2 font-bold">Resources</h3>
				<div class="space-y-1">
					<div><Link href="#" label="Documentation" size="sm" /></div>
					<div><Link href="#" label="API Reference" size="sm" /></div>
					<div><Link href="#" label="Tutorials" size="sm" /></div>
				</div>
			</div>
			<div>
				<h3 class="mb-2 font-bold">Legal</h3>
				<div class="space-y-1">
					<div><Link href="#" label="Privacy Policy" size="sm" /></div>
					<div><Link href="#" label="Terms of Service" size="sm" /></div>
					<div><Link href="#" label="Cookie Policy" size="sm" /></div>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Social Media Links -->
<Story name="Social Media Links">
	{#snippet children()}
		<div class="flex gap-3">
			<Link
				href="https://twitter.com"
				label="Twitter"
				variant="info"
				external={true}
				target="_blank"
			/>
			<Link
				href="https://github.com"
				label="GitHub"
				variant="neutral"
				external={true}
				target="_blank"
			/>
			<Link
				href="https://linkedin.com"
				label="LinkedIn"
				variant="primary"
				external={true}
				target="_blank"
			/>
			<Link
				href="https://facebook.com"
				label="Facebook"
				variant="accent"
				external={true}
				target="_blank"
			/>
		</div>
	{/snippet}
</Story>

<!-- Breadcrumb Example -->
<Story name="Breadcrumb">
	{#snippet children()}
		<div class="breadcrumbs text-sm">
			<ul>
				<li><Link href="#" label="Home" /></li>
				<li><Link href="#" label="Products" /></li>
				<li><Link href="#" label="Category" /></li>
				<li class="text-gray-500">Current Page</li>
			</ul>
		</div>
	{/snippet}
</Story>

<!-- Call to Action Links -->
<Story name="Call to Action">
	{#snippet children()}
		<div class="space-y-3">
			<div>
				<Link href="#" label="Get Started Today →" variant="primary" size="lg" fontWeight="bold" />
			</div>
			<div>
				<Link
					href="#"
					label="View Pricing Plans"
					variant="accent"
					size="lg"
					fontWeight="semibold"
				/>
			</div>
			<div>
				<Link href="#" label="Schedule a Demo" variant="success" size="lg" underline="always" />
			</div>
		</div>
	{/snippet}
</Story>
