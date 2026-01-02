<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PublicPageLayout from './PublicPageLayout.svelte';
	import PublicPageLayoutWrapper from './PublicPageLayoutWrapper.svelte';
	import Button from '../../core/buttons/Button.svelte';

	const { Story } = defineMeta({
		title: 'Utility/Utility/PublicPageLayout',
		component: PublicPageLayoutWrapper,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'filled', 'ghost', 'gradient']
			},
			maxWidth: {
				control: { type: 'select' },
				options: [
					'xs',
					'sm',
					'md',
					'lg',
					'xl',
					'2xl',
					'3xl',
					'4xl',
					'5xl',
					'6xl',
					'7xl',
					'full',
					'none'
				]
			},
			padding: {
				control: { type: 'select' },
				options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
			},
			centered: { control: 'boolean' },
			loading: { control: 'boolean' },
			disabled: { control: 'boolean' },
			background: { control: 'boolean' },
			stickyNavbar: { control: 'boolean' },
			showFooter: { control: 'boolean' },
			showNavbar: { control: 'boolean' },
			showHeader: { control: 'boolean' }
		},
		args: {
			variant: 'default',
			maxWidth: '7xl',
			padding: 'lg',
			centered: true,
			loading: false,
			disabled: false,
			background: true,
			stickyNavbar: true,
			showFooter: true,
			showNavbar: true,
			showHeader: true
		}
	});
</script>

<!-- Default Variant Story -->
<Story name="Default Variant">
	<PublicPageLayout variant="default">
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
							<span class="text-primary-content font-bold text-sm">H</span>
						</div>
						<span class="text-xl font-bold">hexaWebShare</span>
					</div>
					<nav class="hidden md:flex gap-6">
						<button class="link-hover link btn-ghost btn-sm">Features</button>
						<button class="link-hover link btn-ghost btn-sm">Pricing</button>
						<button class="link-hover link btn-ghost btn-sm">Docs</button>
					</nav>
					<div class="flex gap-2">
						<Button variant="ghost" size="sm" label="Sign In" />
						<Button variant="primary" size="sm" label="Get Started" />
					</div>
				</div>
			</div>
		{/snippet}

		{#snippet header()}
			<div class="bg-base-100 border-b border-base-300 py-16">
				<div class="container mx-auto px-6 text-center">
					<h1 class="text-5xl font-bold mb-4">Default Variant</h1>
					<p class="text-xl mb-8 text-base-content/70">
						Clean, standard layout with base-100 background. Perfect for professional websites and applications.
					</p>
					<div class="flex gap-4 justify-center">
						<Button size="lg" variant="primary" label="Get Started" />
						<Button size="lg" outline={true} label="Learn More" />
					</div>
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-12 py-12">
				<section class="text-center">
					<h2 class="text-4xl font-bold mb-4">Why Choose Default?</h2>
					<p class="text-base-content/70 text-lg mb-8">
						The default variant provides a clean, professional appearance with standard base colors.
					</p>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
						<div class="card bg-base-200 shadow-lg">
							<div class="card-body">
								<h3 class="card-title">Clean Design</h3>
								<p>Standard base-100 background provides a clean, professional look.</p>
							</div>
						</div>
						<div class="card bg-base-200 shadow-lg">
							<div class="card-body">
								<h3 class="card-title">Versatile</h3>
								<p>Works well for any type of website or application.</p>
							</div>
						</div>
						<div class="card bg-base-200 shadow-lg">
							<div class="card-body">
								<h3 class="card-title">Professional</h3>
								<p>Perfect for corporate sites, dashboards, and business applications.</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		{/snippet}

		{#snippet footer()}
			<div class="container mx-auto px-6 py-8">
				<div class="text-center text-sm text-base-content/60">
					<p>© 2025 hexaTune LLC. All rights reserved.</p>
				</div>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Basic Layout -->
<Story name="Basic Layout">
	<PublicPageLayout>
		{#snippet children()}
			<div class="space-y-4 py-12">
				<h1 class="text-4xl font-bold text-center">Welcome to Our Site</h1>
				<p class="text-center text-base-content/70">
					This is a basic public page layout with just content - no navbar, header, or footer.
				</p>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- With Navbar -->
<Story name="With Navbar">
	<PublicPageLayout>
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="text-xl font-bold">Logo</div>
					<nav class="flex gap-6">
						<a href="javascript:void(0)" class="link-hover link">Home</a>
						<a href="javascript:void(0)" class="link-hover link">About</a>
						<a href="javascript:void(0)" class="link-hover link">Contact</a>
					</nav>
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4 py-12">
				<h1 class="text-4xl font-bold text-center">Page with Navigation</h1>
				<p class="text-center text-base-content/70">
					This page includes a navigation bar at the top.
				</p>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- With Header Hero -->
<Story name="With Hero Header">
	<PublicPageLayout>
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="text-xl font-bold">Logo</div>
					<Button variant="primary" size="sm" label="Get Started" />
				</div>
			</div>
		{/snippet}

		{#snippet header()}
			<div class="bg-primary text-primary-content py-20">
				<div class="container mx-auto px-6 text-center">
					<h1 class="text-5xl font-bold mb-4">Hero Section</h1>
					<p class="text-xl mb-8">This is a prominent hero section for landing pages.</p>
					<Button size="lg" variant="accent" label="Call to Action" />
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4 py-12">
				<h2 class="text-3xl font-bold text-center">Main Content</h2>
				<p class="text-center text-base-content/70">
					Content continues below the hero section.
				</p>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Complete Layout -->
<Story name="Complete Layout">
	<PublicPageLayout>
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="text-xl font-bold">hexaWebShare</div>
					<nav class="hidden md:flex gap-6">
						<button class="link-hover link btn-ghost btn-sm">Features</button>
						<button class="link-hover link btn-ghost btn-sm">Pricing</button>
						<button class="link-hover link btn-ghost btn-sm">Docs</button>
					</nav>
					<Button variant="primary" size="sm" label="Sign Up" />
				</div>
			</div>
		{/snippet}

		{#snippet header()}
			<div class="bg-gradient-to-r from-primary to-secondary text-primary-content py-20">
				<div class="container mx-auto px-6 text-center">
					<h1 class="text-5xl font-bold mb-4">Complete Public Page</h1>
					<p class="text-xl mb-8">This layout includes navbar, header, content, and footer.</p>
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-8 py-12">
				<section class="text-center">
					<h2 class="text-3xl font-bold mb-4">Features</h2>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
						<div class="card bg-base-200">
							<div class="card-body">
								<h3 class="card-title">Feature 1</h3>
								<p>Description of feature one.</p>
							</div>
						</div>
						<div class="card bg-base-200">
							<div class="card-body">
								<h3 class="card-title">Feature 2</h3>
								<p>Description of feature two.</p>
							</div>
						</div>
						<div class="card bg-base-200">
							<div class="card-body">
								<h3 class="card-title">Feature 3</h3>
								<p>Description of feature three.</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		{/snippet}

		{#snippet footer()}
			<div class="container mx-auto px-6 py-8">
				<div class="text-center text-sm text-base-content/60">
					<p>© 2025 hexaTune LLC. All rights reserved.</p>
					<div class="flex gap-4 justify-center mt-4">
						<a href="javascript:void(0)" class="link-hover link">Privacy</a>
						<a href="javascript:void(0)" class="link-hover link">Terms</a>
						<a href="javascript:void(0)" class="link-hover link">Contact</a>
					</div>
				</div>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Bordered Variant Story -->
<Story name="Bordered Variant">
	<PublicPageLayout variant="bordered">
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center border-2 border-primary">
							<span class="text-primary-content font-bold text-sm">B</span>
						</div>
						<span class="text-xl font-bold">Bordered Layout</span>
					</div>
					<nav class="hidden md:flex gap-6">
						<button class="link-hover link btn-ghost btn-sm">Home</button>
						<button class="link-hover link btn-ghost btn-sm">About</button>
						<button class="link-hover link btn-ghost btn-sm">Contact</button>
					</nav>
					<Button size="sm" outline={true} label="Menu" />
				</div>
			</div>
		{/snippet}

		{#snippet header()}
			<div class="bg-base-100 border-b-2 border-primary/20 py-16">
				<div class="container mx-auto px-6 text-center">
					<div class="inline-block p-4 border-4 border-primary/30 rounded-lg mb-6">
						<h1 class="text-5xl font-bold mb-4">Bordered Variant</h1>
					</div>
					<p class="text-xl mb-8 text-base-content/70">
						Notice the prominent border around the entire layout. Perfect for modal-like pages, embedded content, or when you need clear visual boundaries.
					</p>
					<div class="flex gap-4 justify-center">
						<Button size="lg" outline={true} variant="primary" label="Explore" />
						<Button size="lg" variant="primary" label="Get Started" />
					</div>
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-8 py-12">
				<section class="text-center">
					<h2 class="text-3xl font-bold mb-4">Clear Boundaries</h2>
					<p class="text-base-content/70 mb-8">
						The bordered variant uses a thick border (border-4) with primary color tint, margin, and rounded corners to create distinct page boundaries.
					</p>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
						<div class="card bg-base-200 border-2 border-base-300 shadow-lg">
							<div class="card-body">
								<h3 class="card-title">Modal Pages</h3>
								<p>Perfect for modal-like pages that need to stand out from the background.</p>
							</div>
						</div>
						<div class="card bg-base-200 border-2 border-base-300 shadow-lg">
							<div class="card-body">
								<h3 class="card-title">Embedded Content</h3>
								<p>Great for embedded widgets or content that needs clear separation.</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		{/snippet}

		{#snippet footer()}
			<div class="container mx-auto px-6 py-8 border-t-2 border-primary/20">
				<div class="text-center text-sm text-base-content/60">
					<p>© 2025 hexaTune LLC. All rights reserved.</p>
				</div>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Gradient Variant Story -->
<Story name="Gradient Variant">
	<PublicPageLayout variant="gradient">
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div class="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
							<span class="text-primary-content font-bold text-sm">G</span>
						</div>
						<span class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Gradient Layout</span>
					</div>
					<nav class="hidden md:flex gap-6">
						<button class="link-hover link btn-ghost btn-sm">Features</button>
						<button class="link-hover link btn-ghost btn-sm">Pricing</button>
						<button class="link-hover link btn-ghost btn-sm">About</button>
					</nav>
					<Button variant="primary" size="sm" label="Get Started" />
				</div>
			</div>
		{/snippet}

		{#snippet header()}
			<div class="bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 py-20">
				<div class="container mx-auto px-6 text-center">
					<h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						Gradient Variant
					</h1>
					<p class="text-xl mb-8 text-base-content/70">
						Beautiful gradient backgrounds create depth and visual interest. Perfect for modern, eye-catching designs.
					</p>
					<div class="flex gap-4 justify-center">
						<Button size="lg" variant="primary" label="Explore" />
						<Button size="lg" variant="secondary" label="Learn More" />
					</div>
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-12 py-12">
				<section class="text-center">
					<h2 class="text-4xl font-bold mb-4">Gradient Magic</h2>
					<p class="text-base-content/70 text-lg mb-8">
						The gradient variant uses a diagonal gradient from primary to secondary colors, creating a modern, dynamic appearance.
					</p>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
						<div class="card bg-base-100 shadow-xl border border-primary/10">
							<div class="card-body">
								<div class="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg mb-4"></div>
								<h3 class="card-title">Modern Design</h3>
								<p>Gradients add depth and modern aesthetics to your layout.</p>
							</div>
						</div>
						<div class="card bg-base-100 shadow-xl border border-secondary/10">
							<div class="card-body">
								<div class="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg mb-4"></div>
								<h3 class="card-title">Visual Interest</h3>
								<p>Creates engaging, eye-catching designs that stand out.</p>
							</div>
						</div>
						<div class="card bg-base-100 shadow-xl border border-accent/10">
							<div class="card-body">
								<div class="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg mb-4"></div>
								<h3 class="card-title">Brand Identity</h3>
								<p>Use your brand colors to create cohesive gradient designs.</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		{/snippet}

		{#snippet footer()}
			<div class="container mx-auto px-6 py-8">
				<div class="text-center text-sm text-base-content/60">
					<p>© 2025 hexaTune LLC. All rights reserved.</p>
				</div>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Filled Variant Story -->
<Story name="Filled Variant">
	<PublicPageLayout variant="filled">
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
							<span class="text-primary-content font-bold text-sm">F</span>
						</div>
						<span class="text-xl font-bold">Filled Layout</span>
					</div>
					<nav class="hidden md:flex gap-6">
						<button class="link-hover link btn-ghost btn-sm">Products</button>
						<button class="link-hover link btn-ghost btn-sm">Services</button>
						<button class="link-hover link btn-ghost btn-sm">Support</button>
					</nav>
					<Button variant="primary" size="sm" label="Contact Us" />
				</div>
			</div>
		{/snippet}

		{#snippet header()}
			<div class="bg-base-300 border-b border-base-400 py-16">
				<div class="container mx-auto px-6 text-center">
					<h1 class="text-5xl font-bold mb-4">Filled Variant</h1>
					<p class="text-xl mb-8 text-base-content/80">
						Darker background (base-300) provides better contrast and makes content pop. Ideal for content-heavy pages and dashboards.
					</p>
					<div class="flex gap-4 justify-center">
						<Button size="lg" variant="primary" label="Get Started" />
						<Button size="lg" outline={true} label="View Demo" />
					</div>
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-12 py-12">
				<section class="text-center">
					<h2 class="text-4xl font-bold mb-4">Enhanced Contrast</h2>
					<p class="text-base-content/70 text-lg mb-8">
						The filled variant uses base-300 for layout, navbar, and footer, creating a darker, more prominent appearance.
					</p>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
						<div class="card bg-base-100 shadow-2xl">
							<div class="card-body">
								<h3 class="card-title text-2xl">Better Readability</h3>
								<p class="text-base-content/80">
									The darker background creates better contrast with white cards and content, improving readability.
								</p>
							</div>
						</div>
						<div class="card bg-base-100 shadow-2xl">
							<div class="card-body">
								<h3 class="card-title text-2xl">Content Focus</h3>
								<p class="text-base-content/80">
									Perfect for dashboards, admin panels, and content-heavy pages where you want content to stand out.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section class="text-center">
					<div class="stats stats-vertical lg:stats-horizontal shadow bg-base-100">
						<div class="stat">
							<div class="stat-title">Users</div>
							<div class="stat-value text-primary">12K</div>
							<div class="stat-desc">Active users this month</div>
						</div>
						<div class="stat">
							<div class="stat-title">Revenue</div>
							<div class="stat-value text-secondary">$89K</div>
							<div class="stat-desc">Total revenue</div>
						</div>
						<div class="stat">
							<div class="stat-title">Growth</div>
							<div class="stat-value text-accent">+23%</div>
							<div class="stat-desc">Month over month</div>
						</div>
					</div>
				</section>
			</div>
		{/snippet}

		{#snippet footer()}
			<div class="container mx-auto px-6 py-8 border-t border-base-400">
				<div class="text-center text-sm text-base-content/60">
					<p>© 2025 hexaTune LLC. All rights reserved.</p>
				</div>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Ghost Variant Story -->
<Story name="Ghost Variant">
	<div class="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-4">
		<PublicPageLayout variant="ghost">
			{#snippet navbar()}
				<div class="container mx-auto px-6 py-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							<div class="w-8 h-8 bg-primary/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-primary/30">
								<span class="text-primary-content font-bold text-sm">G</span>
							</div>
							<span class="text-xl font-bold">Ghost Layout</span>
						</div>
						<nav class="hidden md:flex gap-6">
							<button class="link-hover link btn-ghost btn-sm">Home</button>
							<button class="link-hover link btn-ghost btn-sm">Portfolio</button>
							<button class="link-hover link btn-ghost btn-sm">Contact</button>
						</nav>
						<Button size="sm" outline={true} label="Menu" />
					</div>
				</div>
			{/snippet}

			{#snippet header()}
				<div class="bg-base-200/30 backdrop-blur-sm border-b border-base-300/50 py-16">
					<div class="container mx-auto px-6 text-center">
						<h1 class="text-5xl font-bold mb-4">Ghost Variant</h1>
						<p class="text-xl mb-8 text-base-content/80">
							Semi-transparent background with backdrop blur creates a modern, glass-morphism effect. Perfect for overlays and modern UI designs.
						</p>
						<div class="flex gap-4 justify-center">
							<Button size="lg" variant="primary" label="Explore" />
							<Button size="lg" outline={true} label="Learn More" />
						</div>
					</div>
				</div>
			{/snippet}

			{#snippet children()}
				<div class="space-y-12 py-12">
					<section class="text-center">
						<h2 class="text-4xl font-bold mb-4">Glass Morphism</h2>
						<p class="text-base-content/70 text-lg mb-8">
							The ghost variant uses semi-transparent backgrounds (base-200/30) with backdrop blur for a modern, translucent effect.
						</p>
						<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
							<div class="card bg-base-100/80 backdrop-blur-md shadow-xl border border-base-300/50">
								<div class="card-body">
									<h3 class="card-title">Modern Design</h3>
									<p>Glass-morphism effect creates a modern, premium appearance.</p>
								</div>
							</div>
							<div class="card bg-base-100/80 backdrop-blur-md shadow-xl border border-base-300/50">
								<div class="card-body">
									<h3 class="card-title">Overlay Friendly</h3>
									<p>Perfect for overlays, modals, and content that needs to blend with backgrounds.</p>
								</div>
							</div>
							<div class="card bg-base-100/80 backdrop-blur-md shadow-xl border border-base-300/50">
								<div class="card-body">
									<h3 class="card-title">Visual Depth</h3>
									<p>Creates visual depth and layering in your design.</p>
								</div>
							</div>
						</div>
					</section>
					<section class="text-center">
						<div class="card bg-base-100/60 backdrop-blur-lg shadow-2xl border border-primary/20 max-w-2xl mx-auto">
							<div class="card-body">
								<h3 class="card-title text-2xl">See Through Effect</h3>
								<p class="text-base-content/80">
									Notice how the background gradient shows through the semi-transparent layout. This creates a beautiful, layered effect.
								</p>
							</div>
						</div>
					</section>
				</div>
			{/snippet}

			{#snippet footer()}
				<div class="container mx-auto px-6 py-8 border-t border-base-300/50">
					<div class="text-center text-sm text-base-content/60">
						<p>© 2025 hexaTune LLC. All rights reserved.</p>
					</div>
				</div>
			{/snippet}
		</PublicPageLayout>
	</div>
</Story>

<!-- Constrained Width -->
<Story name="Constrained Width">
	<PublicPageLayout maxWidth="lg" centered={true}>
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="text-xl font-bold">Narrow Layout</div>
					<Button variant="ghost" size="sm" label="Menu" />
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4 py-12">
				<h1 class="text-4xl font-bold text-center">Constrained Width</h1>
				<p class="text-center text-base-content/70">
					This content is constrained to a maximum width (lg) and centered. Perfect for blog posts, articles, or focused content.
				</p>
				<div class="prose max-w-none mt-8">
					<p class="text-base-content/80">
						The constrained width makes long-form content more readable by limiting line length.
						This improves reading comprehension and reduces eye strain.
					</p>
				</div>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Padding Variants -->
<Story name="No Padding">
	<PublicPageLayout padding="none">
		{#snippet navbar()}
			<div class="w-full px-6 py-4 bg-base-100 border-b">
				<div class="text-xl font-bold">No Padding Layout</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="p-6 bg-base-200">
				<h1 class="text-4xl font-bold mb-4">No Padding</h1>
				<p class="mb-4">This layout has no automatic padding. All spacing is controlled manually, giving you full control over the layout.</p>
				<div class="card bg-base-100 shadow">
					<div class="card-body">
						<p>This is useful when you want edge-to-edge content or custom spacing.</p>
					</div>
				</div>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<Story name="Large Padding">
	<PublicPageLayout padding="xl">
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="text-xl font-bold">Spacious Layout</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4">
				<h1 class="text-4xl font-bold text-center">Large Padding</h1>
				<p class="text-center text-base-content/70">
					This layout has extra large padding (xl) for spacious, breathable layouts.
				</p>
				<div class="card bg-base-200 shadow-lg mt-8">
					<div class="card-body">
						<h3 class="card-title">Spacious Design</h3>
						<p>Large padding creates more white space, making the layout feel more premium and less cramped.</p>
					</div>
				</div>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- States -->
<Story name="Loading State">
	<PublicPageLayout loading={true}>
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="text-xl font-bold">Loading Page</div>
			</div>
		{/snippet}

		{#snippet header()}
			<div class="bg-primary text-primary-content py-20">
				<div class="container mx-auto px-6 text-center">
					<h1 class="text-5xl font-bold">Loading...</h1>
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4 py-12">
				<p class="text-center text-base-content/70">
					When loading is true, a spinner is displayed instead of the content.
				</p>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<Story name="Disabled State">
	<PublicPageLayout disabled={true}>
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="text-xl font-bold">Disabled Layout</div>
					<Button variant="primary" size="sm" label="Action" disabled={true} />
				</div>
			</div>
		{/snippet}

		{#snippet header()}
			<div class="bg-base-200 py-16">
				<div class="container mx-auto px-6 text-center">
					<h1 class="text-5xl font-bold mb-4">Disabled State</h1>
					<p class="text-xl mb-8 text-base-content/70">
						When disabled is true, the layout becomes non-interactive with reduced opacity.
					</p>
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4 py-12">
				<div class="card bg-base-200 shadow-lg">
					<div class="card-body">
						<h3 class="card-title">Disabled Layout</h3>
						<p>
							The layout is disabled and all pointer events are blocked. This is useful when you want to prevent user interaction temporarily.
						</p>
					</div>
				</div>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<Story name="Error State">
	<PublicPageLayout>
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="text-xl font-bold">Error Page</div>
					<Button variant="ghost" size="sm" label="Home" />
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-6 py-12">
				<div class="text-center">
					<div class="text-6xl mb-4">⚠️</div>
					<h1 class="text-5xl font-bold mb-4 text-error">Error 404</h1>
					<p class="text-xl mb-8 text-base-content/70">
						Page not found. The requested resource could not be located.
					</p>
					<div class="flex gap-4 justify-center">
						<Button variant="primary" size="lg" label="Go Home" />
						<Button variant="primary" size="lg" outline={true} label="Go Back" />
					</div>
				</div>
				<div class="alert alert-error max-w-2xl mx-auto">
					<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>An error occurred while loading this page. Please try again later.</span>
				</div>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<Story name="No Background">
	<div class="bg-base-300 p-4 min-h-screen">
		<PublicPageLayout background={false}>
			{#snippet navbar()}
				<div class="container mx-auto px-6 py-4 bg-base-100 rounded-lg mb-4">
					<div class="text-xl font-bold">Transparent Layout</div>
				</div>
			{/snippet}

			{#snippet children()}
				<div class="space-y-4 py-12 bg-base-100 rounded-lg p-6">
					<h1 class="text-4xl font-bold text-center">No Background</h1>
					<p class="text-center text-base-content/70">
						This layout has no background color (transparent). The gray background you see is from the parent container.
					</p>
					<div class="card bg-base-200 shadow mt-8">
						<div class="card-body">
							<p>This is useful when you want the layout to blend with its parent container.</p>
						</div>
					</div>
				</div>
			{/snippet}
		</PublicPageLayout>
	</div>
</Story>

<Story name="Non-Sticky Navbar">
	<PublicPageLayout stickyNavbar={false}>
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="text-xl font-bold">Logo</div>
					<nav class="flex gap-6">
						<a href="javascript:void(0)" class="link-hover link">Home</a>
						<a href="javascript:void(0)" class="link-hover link">About</a>
					</nav>
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4 py-12">
				<h1 class="text-4xl font-bold text-center">Non-Sticky Navbar</h1>
				<p class="text-center text-base-content/70">
					The navbar scrolls with the page content.
				</p>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Accessibility Test Story -->
<Story name="Accessibility Test">
	<PublicPageLayout ariaLabel="Accessible public page layout example">
		{#snippet navbar()}
			<div class="container mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="text-xl font-bold" role="banner">Accessible Layout</div>
					<nav aria-label="Main navigation">
						<div class="flex gap-4">
							<Button variant="ghost" size="sm" label="Home" ariaLabel="Navigate to home page" />
							<Button variant="ghost" size="sm" label="About" ariaLabel="Navigate to about page" />
						</div>
					</nav>
				</div>
			</div>
		{/snippet}

		{#snippet header()}
			<div class="bg-base-200 py-16">
				<div class="container mx-auto px-6 text-center">
					<h1 class="text-5xl font-bold mb-4">Accessibility Features</h1>
					<p class="text-xl mb-8 text-base-content/70">
						This layout includes proper ARIA labels, semantic HTML, and keyboard navigation support.
					</p>
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-8 py-12">
				<section aria-labelledby="accessibility-features">
					<h2 id="accessibility-features" class="text-3xl font-bold mb-4 text-center">
						Accessibility Checklist
					</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
						<div class="card bg-base-200 shadow-lg">
							<div class="card-body">
								<h3 class="card-title">✅ ARIA Labels</h3>
								<p>All interactive elements have proper ARIA labels for screen readers.</p>
							</div>
						</div>
						<div class="card bg-base-200 shadow-lg">
							<div class="card-body">
								<h3 class="card-title">✅ Semantic HTML</h3>
								<p>Uses proper semantic elements (nav, header, main, footer).</p>
							</div>
						</div>
						<div class="card bg-base-200 shadow-lg">
							<div class="card-body">
								<h3 class="card-title">✅ Keyboard Navigation</h3>
								<p>All interactive elements are keyboard accessible.</p>
							</div>
						</div>
						<div class="card bg-base-200 shadow-lg">
							<div class="card-body">
								<h3 class="card-title">✅ Responsive Design</h3>
								<p>Layout adapts to different screen sizes and devices.</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		{/snippet}

		{#snippet footer()}
			<div class="container mx-auto px-6 py-8">
				<div class="text-center text-sm text-base-content/60">
					<p>© 2025 hexaTune LLC. All rights reserved.</p>
				</div>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Responsive Design Story -->
<Story name="Responsive Design">
	<PublicPageLayout>
		{#snippet navbar()}
			<div class="container mx-auto px-4 sm:px-6 py-4">
				<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<div class="text-xl font-bold">Responsive Layout</div>
					<nav class="flex flex-wrap gap-2 sm:gap-4">
						<Button variant="ghost" size="sm" label="Home" />
						<Button variant="ghost" size="sm" label="About" />
						<Button variant="ghost" size="sm" label="Contact" />
					</nav>
				</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-8 py-8 sm:py-12">
				<section class="text-center px-4 sm:px-6">
					<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Responsive Design</h1>
					<p class="text-base sm:text-lg lg:text-xl mb-8 text-base-content/70">
						This layout adapts to different screen sizes using Tailwind's responsive breakpoints.
					</p>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
						<div class="card bg-base-200 shadow-lg">
							<div class="card-body">
								<h3 class="card-title text-lg">Mobile</h3>
								<p class="text-sm">Single column layout on mobile devices.</p>
							</div>
						</div>
						<div class="card bg-base-200 shadow-lg">
							<div class="card-body">
								<h3 class="card-title text-lg">Tablet</h3>
								<p class="text-sm">Two column layout on tablet devices.</p>
							</div>
						</div>
						<div class="card bg-base-200 shadow-lg">
							<div class="card-body">
								<h3 class="card-title text-lg">Desktop</h3>
								<p class="text-sm">Three column layout on desktop screens.</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		variant: 'default',
		maxWidth: '7xl',
		padding: 'lg',
		centered: true,
		loading: false,
		disabled: false,
		background: true,
		stickyNavbar: true,
		showFooter: true,
		showNavbar: true,
		showHeader: true
	}}
/>

