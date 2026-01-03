<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import PublicPageLayout from './PublicPageLayout.svelte';

	interface Props {
		variant?: 'default' | 'bordered' | 'filled' | 'ghost' | 'gradient';
		maxWidth?:
			| 'xs'
			| 'sm'
			| 'md'
			| 'lg'
			| 'xl'
			| '2xl'
			| '3xl'
			| '4xl'
			| '5xl'
			| '6xl'
			| '7xl'
			| 'full'
			| 'none';
		padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
		centered?: boolean;
		loading?: boolean;
		disabled?: boolean;
		background?: boolean;
		stickyNavbar?: boolean;
		showFooter?: boolean;
		showNavbar?: boolean;
		showHeader?: boolean;
	}

	const {
		variant = 'default',
		maxWidth = '7xl',
		padding = 'lg',
		centered = true,
		loading = false,
		disabled = false,
		background = true,
		stickyNavbar = true,
		showFooter = true,
		showNavbar = true,
		showHeader = true
	}: Props = $props();
</script>

<PublicPageLayout
	{variant}
	{maxWidth}
	{padding}
	{centered}
	{loading}
	{disabled}
	{background}
	{stickyNavbar}
	{showFooter}
>
	{#snippet navbar()}
		{#if showNavbar}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div class="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
							<span class="text-primary-content text-sm font-bold">H</span>
						</div>
						<span class="text-xl font-bold">hexaWebShare</span>
					</div>
					<nav class="hidden gap-6 md:flex">
						<a href="#" class="link-hover link">Features</a>
						<a href="#" class="link-hover link">Pricing</a>
						<a href="#" class="link-hover link">Docs</a>
						<a href="#" class="link-hover link">About</a>
					</nav>
					<div class="flex gap-2">
						<button class="btn btn-ghost btn-sm">Sign In</button>
						<button class="btn btn-primary btn-sm">Get Started</button>
					</div>
				</div>
			</div>
		{/if}
	{/snippet}

	{#snippet header()}
		{#if showHeader}
			<div class="from-primary to-secondary text-primary-content bg-gradient-to-r py-20">
				<div class="container mx-auto px-6 text-center">
					<h1 class="mb-4 text-5xl font-bold">Welcome to hexaWebShare</h1>
					<p class="mb-8 text-xl opacity-90">
						Build beautiful web applications with our comprehensive component library
					</p>
					<div class="flex justify-center gap-4">
						<button class="btn btn-lg btn-accent">Get Started</button>
						<button class="btn btn-lg btn-outline btn-primary-content">Learn More</button>
					</div>
				</div>
			</div>
		{/if}
	{/snippet}

	{#snippet children()}
		<div class="space-y-12 py-12">
			<section class="text-center">
				<h2 class="mb-4 text-4xl font-bold">Features</h2>
				<p class="text-base-content/70 mb-8 text-lg">
					Everything you need to build modern web applications
				</p>
				<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
					<div class="card bg-base-200 shadow-lg">
						<div class="card-body">
							<h3 class="card-title">Fast & Reliable</h3>
							<p>Built with performance in mind, ensuring your applications run smoothly.</p>
						</div>
					</div>
					<div class="card bg-base-200 shadow-lg">
						<div class="card-body">
							<h3 class="card-title">Fully Customizable</h3>
							<p>Tailor every component to match your brand and design requirements.</p>
						</div>
					</div>
					<div class="card bg-base-200 shadow-lg">
						<div class="card-body">
							<h3 class="card-title">Accessible</h3>
							<p>Built with accessibility in mind, following WCAG guidelines.</p>
						</div>
					</div>
				</div>
			</section>

			<section class="text-center">
				<h2 class="mb-4 text-4xl font-bold">Why Choose Us?</h2>
				<p class="text-base-content/70 text-lg">
					Join thousands of developers building amazing applications with our component library.
				</p>
			</section>
		</div>
	{/snippet}

	{#snippet footer()}
		{#if showFooter}
			<div class="container mx-auto px-6 py-8">
				<div class="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
					<div>
						<h3 class="mb-4 text-lg font-bold">Product</h3>
						<ul class="space-y-2 text-sm">
							<li><a href="#" class="link-hover link">Features</a></li>
							<li><a href="#" class="link-hover link">Pricing</a></li>
							<li><a href="#" class="link-hover link">Documentation</a></li>
						</ul>
					</div>
					<div>
						<h3 class="mb-4 text-lg font-bold">Company</h3>
						<ul class="space-y-2 text-sm">
							<li><a href="#" class="link-hover link">About</a></li>
							<li><a href="#" class="link-hover link">Blog</a></li>
							<li><a href="#" class="link-hover link">Careers</a></li>
						</ul>
					</div>
					<div>
						<h3 class="mb-4 text-lg font-bold">Legal</h3>
						<ul class="space-y-2 text-sm">
							<li><a href="#" class="link-hover link">Privacy</a></li>
							<li><a href="#" class="link-hover link">Terms</a></li>
							<li><a href="#" class="link-hover link">Security</a></li>
						</ul>
					</div>
					<div>
						<h3 class="mb-4 text-lg font-bold">Connect</h3>
						<ul class="space-y-2 text-sm">
							<li><a href="#" class="link-hover link">Twitter</a></li>
							<li><a href="#" class="link-hover link">GitHub</a></li>
							<li><a href="#" class="link-hover link">Discord</a></li>
						</ul>
					</div>
				</div>
				<div class="border-base-300 text-base-content/60 border-t pt-8 text-center text-sm">
					<p>© 2025 hexaTune LLC. All rights reserved.</p>
				</div>
			</div>
		{/if}
	{/snippet}
</PublicPageLayout>
