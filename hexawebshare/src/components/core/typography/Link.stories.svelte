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

<!-- Default Link -->
<Story name="Default">
	{#snippet children()}
		<div class="bg-base-100 p-8">
			<p class="text-base-content mb-4">
				This is a paragraph with a <Link href="https://example.com" label="default link" /> embedded
				in the text.
			</p>
		</div>
	{/snippet}
</Story>

<!-- Primary Variant -->
<Story name="Primary Variant">
	{#snippet children()}
		<div class="bg-base-100 p-8">
			<Link href="https://example.com" label="Primary Link" variant="primary" size="lg" />
		</div>
	{/snippet}
</Story>

<!-- Size Variants -->
<Story name="Size Variants">
	{#snippet children()}
		<div class="bg-base-100 space-y-4 p-8">
			<div class="flex flex-wrap items-end gap-6">
				<div class="text-center">
					<div class="text-base-content/60 mb-1 text-xs">Small</div>
					<Link href="https://example.com" label="Small Link" size="sm" variant="primary" />
				</div>
				<div class="text-center">
					<div class="text-base-content/60 mb-1 text-xs">Medium</div>
					<Link href="https://example.com" label="Medium Link" size="md" variant="primary" />
				</div>
				<div class="text-center">
					<div class="text-base-content/60 mb-1 text-xs">Large</div>
					<Link href="https://example.com" label="Large Link" size="lg" variant="primary" />
				</div>
				<div class="text-center">
					<div class="text-base-content/60 mb-1 text-xs">Extra Large</div>
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
				<div class="bg-base-200 rounded p-4 text-center">
					<h4 class="mb-3 text-sm font-semibold">Hover Underline</h4>
					<Link
						href="https://example.com"
						label="Hover to see underline"
						underline="hover"
						variant="primary"
					/>
				</div>
				<div class="bg-base-200 rounded p-4 text-center">
					<h4 class="mb-3 text-sm font-semibold">Always Underlined</h4>
					<Link
						href="https://example.com"
						label="Always underlined"
						underline="always"
						variant="primary"
					/>
				</div>
				<div class="bg-base-200 rounded p-4 text-center">
					<h4 class="mb-3 text-sm font-semibold">Never Underlined</h4>
					<Link
						href="https://example.com"
						label="Never underlined"
						underline="never"
						variant="primary"
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- External Link -->
<Story name="External Link">
	{#snippet children()}
		<div class="bg-base-100 p-8">
			<Link
				href="https://github.com"
				label="Visit GitHub"
				external={true}
				target="_blank"
				variant="primary"
				size="lg"
			/>
			<p class="text-base-content/60 mt-2 text-sm">Shows external icon and opens in new tab</p>
		</div>
	{/snippet}
</Story>

<!-- Disabled Link -->
<Story name="Disabled">
	{#snippet children()}
		<div class="bg-base-100 p-8">
			<Link
				href="https://example.com"
				label="This link is disabled"
				disabled={true}
				variant="primary"
				size="lg"
			/>
			<p class="text-base-content/60 mt-2 text-sm">Non-clickable and visually muted</p>
		</div>
	{/snippet}
</Story>

<!-- Font Weight Variations -->
<Story name="Font Weights">
	{#snippet children()}
		<div class="bg-base-100 space-y-3 p-8">
			<div class="flex items-center gap-4">
				<span class="text-base-content/60 w-20 text-sm">Normal:</span>
				<Link
					href="https://example.com"
					label="Normal weight text in a link"
					fontWeight="normal"
					size="lg"
				/>
			</div>
			<div class="flex items-center gap-4">
				<span class="text-base-content/60 w-20 text-sm">Medium:</span>
				<Link
					href="https://example.com"
					label="Medium weight text in a link"
					fontWeight="medium"
					size="lg"
				/>
			</div>
			<div class="flex items-center gap-4">
				<span class="text-base-content/60 w-20 text-sm">Bold:</span>
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

<!-- Navigation Example -->
<Story name="Navigation Example">
	{#snippet children()}
		<nav class="navbar rounded-box bg-base-200 p-4">
			<div class="flex-1">
				<Link href="/" label="Home" fontWeight="bold" size="lg" />
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

<!-- Inline Usage -->
<Story name="Inline Usage">
	{#snippet children()}
		<article class="prose bg-base-100 max-w-none p-8">
			<h2>Getting Started</h2>
			<p>
				Welcome to <Link
					href="https://hexatune.com"
					label="hexaTune's"
					external={true}
					variant="primary"
				/>
				component library. This guide will help you integrate our
				<Link href="/components" label="UI components" variant="accent" /> into your application.
			</p>
			<p>
				First, check out our <Link
					href="/docs/installation"
					label="installation guide"
					fontWeight="semibold"
				/>
				to set up the library. If you encounter any issues, visit our
				<Link href="/support" label="support center" variant="info" />.
			</p>
		</article>
	{/snippet}
</Story>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		href: 'https://example.com',
		label: 'Interactive Link',
		variant: 'primary',
		size: 'md',
		target: undefined,
		underline: 'hover',
		disabled: false,
		hoverable: true,
		fontWeight: 'normal',
		external: false,
		download: undefined
	}}
/>
