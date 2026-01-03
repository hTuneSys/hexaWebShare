<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PublicPageLayout from './PublicPageLayout.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Card from '../../core/layout/Card.svelte';
	import Heading from '../../core/typography/Heading.svelte';
	import Paragraph from '../../core/typography/Paragraph.svelte';
	import Container from '../../core/layout/Container.svelte';
	import Alert from '../../core/feedback/Alert.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';
	import Link from '../../core/typography/Link.svelte';

	const { Story } = defineMeta({
		title: 'Utility/Utility/PublicPageLayout',
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
			<Container padding="md" className="py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div class="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
							<span class="text-primary-content text-sm font-bold">H</span>
						</div>
						<Heading level="h2" size="xl" weight="bold" text="hexaWebShare" />
					</div>
					<nav class="hidden gap-6 md:flex">
						<Button variant="ghost" size="sm" label="Features" />
						<Button variant="ghost" size="sm" label="Pricing" />
						<Button variant="ghost" size="sm" label="Docs" />
					</nav>
					<div class="flex gap-2">
						<Button variant="ghost" size="sm" label="Sign In" />
						<Button variant="primary" size="sm" label="Get Started" />
					</div>
				</div>
			</Container>
		{/snippet}

		{#snippet header()}
			<div class="bg-base-100 border-base-300 border-b py-16">
				<Container padding="md" centered={true} className="text-center">
					<div class="mb-4">
						<Heading level="h1" size="4xl" weight="bold" align="center" text="Default Variant" />
					</div>
					<Paragraph
						size="xl"
						variant="muted"
						align="center"
						class="mb-8"
						text="Clean, standard layout with base-100 background. Perfect for professional websites and applications."
					/>
					<div class="flex justify-center gap-4">
						<Button size="lg" variant="primary" label="Get Started" />
						<Button size="lg" outline={true} label="Learn More" />
					</div>
				</Container>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-12 py-12">
				<section class="text-center">
					<Heading
						level="h2"
						size="3xl"
						weight="bold"
						align="center"
						class="mb-4"
						text="Why Choose Default?"
					/>
					<Paragraph
						variant="muted"
						size="lg"
						align="center"
						class="mb-8"
						text="The default variant provides a clean, professional appearance with standard base colors."
					/>
					<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
						<Card title="Clean Design" shadow={true} shadowSize="lg" class="bg-base-200">
							{#snippet children()}
								<Paragraph
									text="Standard base-100 background provides a clean, professional look."
								/>
							{/snippet}
						</Card>
						<Card title="Versatile" shadow={true} shadowSize="lg" class="bg-base-200">
							{#snippet children()}
								<Paragraph text="Works well for any type of website or application." />
							{/snippet}
						</Card>
						<Card title="Professional" shadow={true} shadowSize="lg" class="bg-base-200">
							{#snippet children()}
								<Paragraph
									text="Perfect for corporate sites, dashboards, and business applications."
								/>
							{/snippet}
						</Card>
					</div>
				</section>
			</div>
		{/snippet}

		{#snippet footer()}
			<Container padding="md" className="py-8">
				<div class="text-center">
					<Paragraph
						size="sm"
						variant="muted"
						align="center"
						text="© 2025 hexaTune LLC. All rights reserved."
					/>
				</div>
			</Container>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Basic Layout -->
<Story name="Basic Layout">
	<PublicPageLayout>
		{#snippet children()}
			<div class="space-y-4 py-12">
				<Heading level="h1" size="3xl" weight="bold" align="center" text="Welcome to Our Site" />
				<Paragraph
					variant="muted"
					align="center"
					text="This is a basic public page layout with just content - no navbar, header, or footer."
				/>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- With Navbar -->
<Story name="With Navbar">
	<PublicPageLayout>
		{#snippet navbar()}
			<Container padding="md" className="py-4">
				<div class="flex items-center justify-between">
					<Heading level="h2" size="xl" weight="bold" text="Logo" />
					<nav class="flex gap-6">
						<Link href="javascript:void(0)" label="Home" />
						<Link href="javascript:void(0)" label="About" />
						<Link href="javascript:void(0)" label="Contact" />
					</nav>
				</div>
			</Container>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4 py-12">
				<Heading level="h1" size="3xl" weight="bold" align="center" text="Page with Navigation" />
				<Paragraph
					variant="muted"
					align="center"
					text="This page includes a navigation bar at the top."
				/>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- With Header Hero -->
<Story name="With Hero Header">
	<PublicPageLayout>
		{#snippet navbar()}
			<Container padding="md" className="py-4">
				<div class="flex items-center justify-between">
					<Heading level="h2" size="xl" weight="bold" text="Logo" />
					<Button variant="primary" size="sm" label="Get Started" />
				</div>
			</Container>
		{/snippet}

		{#snippet header()}
			<div class="bg-primary text-primary-content py-20">
				<Container padding="md" centered={true} className="text-center">
					<div class="text-primary-content mb-4">
						<Heading level="h1" size="4xl" weight="bold" align="center" text="Hero Section" />
					</div>
					<Paragraph
						size="xl"
						align="center"
						class="text-primary-content mb-8"
						text="This is a prominent hero section for landing pages."
					/>
					<Button size="lg" variant="accent" label="Call to Action" />
				</Container>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4 py-12">
				<Heading level="h2" size="2xl" weight="bold" align="center" text="Main Content" />
				<Paragraph
					variant="muted"
					align="center"
					text="Content continues below the hero section."
				/>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Complete Layout -->
<Story name="Complete Layout">
	<PublicPageLayout>
		{#snippet navbar()}
			<Container padding="md" className="py-4">
				<div class="flex items-center justify-between">
					<Heading level="h2" size="xl" weight="bold" text="hexaWebShare" />
					<nav class="hidden gap-6 md:flex">
						<Button variant="ghost" size="sm" label="Features" />
						<Button variant="ghost" size="sm" label="Pricing" />
						<Button variant="ghost" size="sm" label="Docs" />
					</nav>
					<Button variant="primary" size="sm" label="Sign Up" />
				</div>
			</Container>
		{/snippet}

		{#snippet header()}
			<div class="from-primary to-secondary text-primary-content bg-gradient-to-r py-20">
				<Container padding="md" centered={true} className="text-center">
					<div class="text-primary-content mb-4">
						<Heading
							level="h1"
							size="4xl"
							weight="bold"
							align="center"
							text="Complete Public Page"
						/>
					</div>
					<Paragraph
						size="xl"
						align="center"
						class="text-primary-content mb-8"
						text="This layout includes navbar, header, content, and footer."
					/>
				</Container>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-8 py-12">
				<section class="text-center">
					<Heading
						level="h2"
						size="2xl"
						weight="bold"
						align="center"
						class="mb-4"
						text="Features"
					/>
					<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
						<Card title="Feature 1" class="bg-base-200">
							{#snippet children()}
								<Paragraph text="Description of feature one." />
							{/snippet}
						</Card>
						<Card title="Feature 2" class="bg-base-200">
							{#snippet children()}
								<Paragraph text="Description of feature two." />
							{/snippet}
						</Card>
						<Card title="Feature 3" class="bg-base-200">
							{#snippet children()}
								<Paragraph text="Description of feature three." />
							{/snippet}
						</Card>
					</div>
				</section>
			</div>
		{/snippet}

		{#snippet footer()}
			<Container padding="md" className="py-8">
				<div class="text-center">
					<Paragraph
						size="sm"
						variant="muted"
						align="center"
						text="© 2025 hexaTune LLC. All rights reserved."
					/>
					<div class="mt-4 flex justify-center gap-4">
						<Link href="javascript:void(0)" label="Privacy" />
						<Link href="javascript:void(0)" label="Terms" />
						<Link href="javascript:void(0)" label="Contact" />
					</div>
				</div>
			</Container>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Bordered Variant Story -->
<Story name="Bordered Variant">
	<PublicPageLayout variant="bordered">
		{#snippet navbar()}
			<Container padding="md" className="py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div
							class="bg-primary border-primary flex h-8 w-8 items-center justify-center rounded-lg border-2"
						>
							<span class="text-primary-content text-sm font-bold">B</span>
						</div>
						<Heading level="h2" size="xl" weight="bold" text="Bordered Layout" />
					</div>
					<nav class="hidden gap-6 md:flex">
						<Button variant="ghost" size="sm" label="Home" />
						<Button variant="ghost" size="sm" label="About" />
						<Button variant="ghost" size="sm" label="Contact" />
					</nav>
					<Button size="sm" outline={true} label="Menu" />
				</div>
			</Container>
		{/snippet}

		{#snippet header()}
			<div class="bg-base-100 border-primary/20 border-b-2 py-16">
				<Container padding="md" centered={true} className="text-center">
					<div class="border-primary/30 mb-6 inline-block rounded-lg border-4 p-4">
						<div class="mb-4">
							<Heading level="h1" size="4xl" weight="bold" align="center" text="Bordered Variant" />
						</div>
					</div>
					<Paragraph
						size="xl"
						variant="muted"
						align="center"
						class="mb-8"
						text="Notice the prominent border around the entire layout. Perfect for modal-like pages, embedded content, or when you need clear visual boundaries."
					/>
					<div class="flex justify-center gap-4">
						<Button size="lg" outline={true} variant="primary" label="Explore" />
						<Button size="lg" variant="primary" label="Get Started" />
					</div>
				</Container>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-8 py-12">
				<section class="text-center">
					<Heading
						level="h2"
						size="2xl"
						weight="bold"
						align="center"
						class="mb-4"
						text="Clear Boundaries"
					/>
					<Paragraph
						variant="muted"
						align="center"
						class="mb-8"
						text="The bordered variant uses a thick border (border-4) with primary color tint, margin, and rounded corners to create distinct page boundaries."
					/>
					<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
						<Card
							title="Modal Pages"
							bordered={true}
							shadow={true}
							shadowSize="lg"
							class="bg-base-200 border-base-300 border-2"
						>
							{#snippet children()}
								<Paragraph
									text="Perfect for modal-like pages that need to stand out from the background."
								/>
							{/snippet}
						</Card>
						<Card
							title="Embedded Content"
							bordered={true}
							shadow={true}
							shadowSize="lg"
							class="bg-base-200 border-base-300 border-2"
						>
							{#snippet children()}
								<Paragraph
									text="Great for embedded widgets or content that needs clear separation."
								/>
							{/snippet}
						</Card>
					</div>
				</section>
			</div>
		{/snippet}

		{#snippet footer()}
			<Container padding="md" className="py-8 border-t-2 border-primary/20">
				<div class="text-center">
					<Paragraph
						size="sm"
						variant="muted"
						align="center"
						text="© 2025 hexaTune LLC. All rights reserved."
					/>
				</div>
			</Container>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Gradient Variant Story -->
<Story name="Gradient Variant">
	<PublicPageLayout variant="gradient">
		{#snippet navbar()}
			<Container padding="md" className="py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div
							class="from-primary to-secondary flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br"
						>
							<span class="text-primary-content text-sm font-bold">G</span>
						</div>
						<Heading
							level="h2"
							size="xl"
							weight="bold"
							gradient={true}
							gradientFrom="primary"
							gradientTo="secondary"
							text="Gradient Layout"
						/>
					</div>
					<nav class="hidden gap-6 md:flex">
						<Button variant="ghost" size="sm" label="Features" />
						<Button variant="ghost" size="sm" label="Pricing" />
						<Button variant="ghost" size="sm" label="About" />
					</nav>
					<Button variant="primary" size="sm" label="Get Started" />
				</div>
			</Container>
		{/snippet}

		{#snippet header()}
			<div class="from-primary/20 via-base-100 to-secondary/20 bg-gradient-to-br py-20">
				<Container padding="md" centered={true} className="text-center">
					<div class="mb-4">
						<Heading
							level="h1"
							size="4xl"
							weight="bold"
							align="center"
							gradient={true}
							gradientFrom="primary"
							gradientTo="secondary"
							text="Gradient Variant"
						/>
					</div>
					<Paragraph
						size="xl"
						variant="muted"
						align="center"
						class="mb-8"
						text="Beautiful gradient backgrounds create depth and visual interest. Perfect for modern, eye-catching designs."
					/>
					<div class="flex justify-center gap-4">
						<Button size="lg" variant="primary" label="Explore" />
						<Button size="lg" variant="secondary" label="Learn More" />
					</div>
				</Container>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-12 py-12">
				<section class="text-center">
					<Heading
						level="h2"
						size="3xl"
						weight="bold"
						align="center"
						class="mb-4"
						text="Gradient Magic"
					/>
					<Paragraph
						variant="muted"
						size="lg"
						align="center"
						class="mb-8"
						text="The gradient variant uses a diagonal gradient from primary to secondary colors, creating a modern, dynamic appearance."
					/>
					<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
						<Card
							title="Modern Design"
							shadow={true}
							shadowSize="xl"
							bordered={true}
							class="bg-base-100 border-primary/10 border"
						>
							{#snippet children()}
								<div
									class="from-primary to-secondary mb-4 h-12 w-12 rounded-lg bg-gradient-to-br"
								></div>
								<Paragraph text="Gradients add depth and modern aesthetics to your layout." />
							{/snippet}
						</Card>
						<Card
							title="Visual Interest"
							shadow={true}
							shadowSize="xl"
							bordered={true}
							class="bg-base-100 border-secondary/10 border"
						>
							{#snippet children()}
								<div
									class="from-secondary to-accent mb-4 h-12 w-12 rounded-lg bg-gradient-to-br"
								></div>
								<Paragraph text="Creates engaging, eye-catching designs that stand out." />
							{/snippet}
						</Card>
						<Card
							title="Brand Identity"
							shadow={true}
							shadowSize="xl"
							bordered={true}
							class="bg-base-100 border-accent/10 border"
						>
							{#snippet children()}
								<div
									class="from-accent to-primary mb-4 h-12 w-12 rounded-lg bg-gradient-to-br"
								></div>
								<Paragraph text="Use your brand colors to create cohesive gradient designs." />
							{/snippet}
						</Card>
					</div>
				</section>
			</div>
		{/snippet}

		{#snippet footer()}
			<Container padding="md" className="py-8">
				<div class="text-center">
					<Paragraph
						size="sm"
						variant="muted"
						align="center"
						text="© 2025 hexaTune LLC. All rights reserved."
					/>
				</div>
			</Container>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Filled Variant Story -->
<Story name="Filled Variant">
	<PublicPageLayout variant="filled">
		{#snippet navbar()}
			<Container padding="md" className="py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div class="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
							<span class="text-primary-content text-sm font-bold">F</span>
						</div>
						<Heading level="h2" size="xl" weight="bold" text="Filled Layout" />
					</div>
					<nav class="hidden gap-6 md:flex">
						<Button variant="ghost" size="sm" label="Products" />
						<Button variant="ghost" size="sm" label="Services" />
						<Button variant="ghost" size="sm" label="Support" />
					</nav>
					<Button variant="primary" size="sm" label="Contact Us" />
				</div>
			</Container>
		{/snippet}

		{#snippet header()}
			<div class="bg-base-300 border-base-400 border-b py-16">
				<Container padding="md" centered={true} className="text-center">
					<div class="mb-4">
						<Heading level="h1" size="4xl" weight="bold" align="center" text="Filled Variant" />
					</div>
					<Paragraph
						size="xl"
						variant="default"
						align="center"
						class="text-base-content/80 mb-8"
						text="Darker background (base-300) provides better contrast and makes content pop. Ideal for content-heavy pages and dashboards."
					/>
					<div class="flex justify-center gap-4">
						<Button size="lg" variant="primary" label="Get Started" />
						<Button size="lg" outline={true} label="View Demo" />
					</div>
				</Container>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-12 py-12">
				<section class="text-center">
					<Heading
						level="h2"
						size="3xl"
						weight="bold"
						align="center"
						class="mb-4"
						text="Enhanced Contrast"
					/>
					<Paragraph
						variant="muted"
						size="lg"
						align="center"
						class="mb-8"
						text="The filled variant uses base-300 for layout, navbar, and footer, creating a darker, more prominent appearance."
					/>
					<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
						<Card title="Better Readability" shadow={true} shadowSize="2xl" class="bg-base-100">
							{#snippet children()}
								<div class="mb-2">
									<Heading level="h3" size="2xl" weight="bold" text="Better Readability" />
								</div>
								<Paragraph
									variant="default"
									class="text-base-content/80"
									text="The darker background creates better contrast with white cards and content, improving readability."
								/>
							{/snippet}
						</Card>
						<Card title="Content Focus" shadow={true} shadowSize="2xl" class="bg-base-100">
							{#snippet children()}
								<div class="mb-2">
									<Heading level="h3" size="2xl" weight="bold" text="Content Focus" />
								</div>
								<Paragraph
									variant="default"
									class="text-base-content/80"
									text="Perfect for dashboards, admin panels, and content-heavy pages where you want content to stand out."
								/>
							{/snippet}
						</Card>
					</div>
				</section>
				<section class="text-center">
					<div class="stats stats-vertical lg:stats-horizontal bg-base-100 shadow">
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
			<Container padding="md" className="py-8 border-t border-base-400">
				<div class="text-center">
					<Paragraph
						size="sm"
						variant="muted"
						align="center"
						text="© 2025 hexaTune LLC. All rights reserved."
					/>
				</div>
			</Container>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Ghost Variant Story -->
<Story name="Ghost Variant">
	<div class="from-primary/20 via-secondary/20 to-accent/20 min-h-screen bg-gradient-to-br p-4">
		<PublicPageLayout variant="ghost">
			{#snippet navbar()}
				<Container padding="md" className="py-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							<div
								class="bg-primary/50 border-primary/30 flex h-8 w-8 items-center justify-center rounded-lg border backdrop-blur-sm"
							>
								<span class="text-primary-content text-sm font-bold">G</span>
							</div>
							<Heading level="h2" size="xl" weight="bold" text="Ghost Layout" />
						</div>
						<nav class="hidden gap-6 md:flex">
							<Button variant="ghost" size="sm" label="Home" />
							<Button variant="ghost" size="sm" label="Portfolio" />
							<Button variant="ghost" size="sm" label="Contact" />
						</nav>
						<Button size="sm" outline={true} label="Menu" />
					</div>
				</Container>
			{/snippet}

			{#snippet header()}
				<div class="bg-base-200/30 border-base-300/50 border-b py-16 backdrop-blur-sm">
					<Container padding="md" centered={true} className="text-center">
						<div class="mb-4">
							<Heading level="h1" size="4xl" weight="bold" align="center" text="Ghost Variant" />
						</div>
						<Paragraph
							size="xl"
							variant="default"
							align="center"
							class="text-base-content/80 mb-8"
							text="Semi-transparent background with backdrop blur creates a modern, glass-morphism effect. Perfect for overlays and modern UI designs."
						/>
						<div class="flex justify-center gap-4">
							<Button size="lg" variant="primary" label="Explore" />
							<Button size="lg" outline={true} label="Learn More" />
						</div>
					</Container>
				</div>
			{/snippet}

			{#snippet children()}
				<div class="space-y-12 py-12">
					<section class="text-center">
						<Heading
							level="h2"
							size="3xl"
							weight="bold"
							align="center"
							class="mb-4"
							text="Glass Morphism"
						/>
						<Paragraph
							variant="muted"
							size="lg"
							align="center"
							class="mb-8"
							text="The ghost variant uses semi-transparent backgrounds (base-200/30) with backdrop blur for a modern, translucent effect."
						/>
						<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
							<Card
								title="Modern Design"
								glass={true}
								shadow={true}
								shadowSize="xl"
								bordered={true}
								class="bg-base-100/80 border-base-300/50 border backdrop-blur-md"
							>
								{#snippet children()}
									<Paragraph text="Glass-morphism effect creates a modern, premium appearance." />
								{/snippet}
							</Card>
							<Card
								title="Overlay Friendly"
								glass={true}
								shadow={true}
								shadowSize="xl"
								bordered={true}
								class="bg-base-100/80 border-base-300/50 border backdrop-blur-md"
							>
								{#snippet children()}
									<Paragraph
										text="Perfect for overlays, modals, and content that needs to blend with backgrounds."
									/>
								{/snippet}
							</Card>
							<Card
								title="Visual Depth"
								glass={true}
								shadow={true}
								shadowSize="xl"
								bordered={true}
								class="bg-base-100/80 border-base-300/50 border backdrop-blur-md"
							>
								{#snippet children()}
									<Paragraph text="Creates visual depth and layering in your design." />
								{/snippet}
							</Card>
						</div>
					</section>
					<section class="text-center">
						<Card
							title="See Through Effect"
							glass={true}
							shadow={true}
							shadowSize="2xl"
							bordered={true}
							class="bg-base-100/60 border-primary/20 mx-auto max-w-2xl border backdrop-blur-lg"
						>
							{#snippet children()}
								<div class="mb-2">
									<Heading level="h3" size="2xl" weight="bold" text="See Through Effect" />
								</div>
								<Paragraph
									variant="default"
									class="text-base-content/80"
									text="Notice how the background gradient shows through the semi-transparent layout. This creates a beautiful, layered effect."
								/>
							{/snippet}
						</Card>
					</section>
				</div>
			{/snippet}

			{#snippet footer()}
				<Container padding="md" className="py-8 border-t border-base-300/50">
					<div class="text-center">
						<Paragraph
							size="sm"
							variant="muted"
							align="center"
							text="© 2025 hexaTune LLC. All rights reserved."
						/>
					</div>
				</Container>
			{/snippet}
		</PublicPageLayout>
	</div>
</Story>

<!-- Constrained Width -->
<Story name="Constrained Width">
	<PublicPageLayout maxWidth="lg" centered={true}>
		{#snippet navbar()}
			<Container padding="md" className="py-4">
				<div class="flex items-center justify-between">
					<Heading level="h2" size="xl" weight="bold" text="Narrow Layout" />
					<Button variant="ghost" size="sm" label="Menu" />
				</div>
			</Container>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4 py-12">
				<Heading level="h1" size="3xl" weight="bold" align="center" text="Constrained Width" />
				<Paragraph
					variant="muted"
					align="center"
					text="This content is constrained to a maximum width (lg) and centered. Perfect for blog posts, articles, or focused content."
				/>
				<div class="prose mt-8 max-w-none">
					<Paragraph
						variant="default"
						class="text-base-content/80"
						text="The constrained width makes long-form content more readable by limiting line length. This improves reading comprehension and reduces eye strain."
					/>
				</div>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Padding Variants -->
<Story name="No Padding">
	<PublicPageLayout padding="none">
		{#snippet navbar()}
			<div class="bg-base-100 w-full border-b px-6 py-4">
				<div class="text-xl font-bold">No Padding Layout</div>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="bg-base-200 p-6">
				<Heading level="h1" size="3xl" weight="bold" class="mb-4" text="No Padding" />
				<Paragraph
					class="mb-4"
					text="This layout has no automatic padding. All spacing is controlled manually, giving you full control over the layout."
				/>
				<Card shadow={true} class="bg-base-100">
					{#snippet children()}
						<Paragraph
							text="This is useful when you want edge-to-edge content or custom spacing."
						/>
					{/snippet}
				</Card>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<Story name="Large Padding">
	<PublicPageLayout padding="xl">
		{#snippet navbar()}
			<Container padding="md" className="py-4">
				<Heading level="h2" size="xl" weight="bold" text="Spacious Layout" />
			</Container>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4">
				<Heading level="h1" size="3xl" weight="bold" align="center" text="Large Padding" />
				<Paragraph
					variant="muted"
					align="center"
					text="This layout has extra large padding (xl) for spacious, breathable layouts."
				/>
				<Card title="Spacious Design" shadow={true} shadowSize="lg" class="bg-base-200 mt-8">
					{#snippet children()}
						<Paragraph
							text="Large padding creates more white space, making the layout feel more premium and less cramped."
						/>
					{/snippet}
				</Card>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- States -->
<Story name="Loading State">
	<PublicPageLayout loading={true}>
		{#snippet navbar()}
			<Container padding="md" className="py-4">
				<Heading level="h2" size="xl" weight="bold" text="Loading Page" />
			</Container>
		{/snippet}

		{#snippet header()}
			<div class="bg-primary text-primary-content py-20">
				<Container padding="md" centered={true} className="text-center">
					<div class="text-primary-content">
						<Heading level="h1" size="4xl" weight="bold" text="Loading..." />
					</div>
				</Container>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4 py-12">
				<Paragraph
					variant="muted"
					align="center"
					text="When loading is true, a spinner is displayed instead of the content."
				/>
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
				<Container padding="md" centered={true} className="text-center">
					<div class="mb-4">
						<Heading level="h1" size="4xl" weight="bold" align="center" text="Disabled State" />
					</div>
					<Paragraph
						size="xl"
						variant="muted"
						align="center"
						class="mb-8"
						text="When disabled is true, the layout becomes non-interactive with reduced opacity."
					/>
				</Container>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4 py-12">
				<Card title="Disabled Layout" shadow={true} shadowSize="lg" class="bg-base-200">
					{#snippet children()}
						<Paragraph
							text="The layout is disabled and all pointer events are blocked. This is useful when you want to prevent user interaction temporarily."
						/>
					{/snippet}
				</Card>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<Story name="Error State">
	<PublicPageLayout>
		{#snippet navbar()}
			<Container padding="md" className="py-4">
				<div class="flex items-center justify-between">
					<Heading level="h2" size="xl" weight="bold" text="Error Page" />
					<Button variant="ghost" size="sm" label="Home" />
				</div>
			</Container>
		{/snippet}

		{#snippet children()}
			<div class="space-y-6 py-12">
				<div class="text-center">
					<div class="mb-4 text-6xl">⚠️</div>
					<div class="mb-4">
						<Heading
							level="h1"
							size="4xl"
							weight="bold"
							variant="error"
							align="center"
							text="Error 404"
						/>
					</div>
					<Paragraph
						size="xl"
						variant="muted"
						align="center"
						class="mb-8"
						text="Page not found. The requested resource could not be located."
					/>
					<div class="flex justify-center gap-4">
						<Button variant="primary" size="lg" label="Go Home" />
						<Button variant="primary" size="lg" outline={true} label="Go Back" />
					</div>
				</div>
				<Alert
					variant="error"
					description="An error occurred while loading this page. Please try again later."
					class="mx-auto max-w-2xl"
				/>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<Story name="No Background">
	<div class="bg-base-300 min-h-screen p-4">
		<PublicPageLayout background={false}>
			{#snippet navbar()}
				<div class="bg-base-100 container mx-auto mb-4 rounded-lg px-6 py-4">
					<div class="text-xl font-bold">Transparent Layout</div>
				</div>
			{/snippet}

			{#snippet children()}
				<div class="bg-base-100 space-y-4 rounded-lg p-6 py-12">
					<Heading level="h1" size="3xl" weight="bold" align="center" text="No Background" />
					<Paragraph
						variant="muted"
						align="center"
						text="This layout has no background color (transparent). The gray background you see is from the parent container."
					/>
					<Card shadow={true} class="bg-base-200 mt-8">
						{#snippet children()}
							<Paragraph
								text="This is useful when you want the layout to blend with its parent container."
							/>
						{/snippet}
					</Card>
				</div>
			{/snippet}
		</PublicPageLayout>
	</div>
</Story>

<Story name="Non-Sticky Navbar">
	<PublicPageLayout stickyNavbar={false}>
		{#snippet navbar()}
			<Container padding="md" className="py-4">
				<div class="flex items-center justify-between">
					<Heading level="h2" size="xl" weight="bold" text="Logo" />
					<nav class="flex gap-6">
						<Link href="javascript:void(0)" label="Home" />
						<Link href="javascript:void(0)" label="About" />
					</nav>
				</div>
			</Container>
		{/snippet}

		{#snippet children()}
			<div class="space-y-4 py-12">
				<Heading level="h1" size="3xl" weight="bold" align="center" text="Non-Sticky Navbar" />
				<Paragraph
					variant="muted"
					align="center"
					text="The navbar scrolls with the page content."
				/>
			</div>
		{/snippet}
	</PublicPageLayout>
</Story>

<!-- Accessibility Test Story -->
<Story name="Accessibility Test">
	<PublicPageLayout ariaLabel="Accessible public page layout example">
		{#snippet navbar()}
			<Container padding="md" className="py-4">
				<div class="flex items-center justify-between">
					<div role="banner">
						<Heading level="h2" size="xl" weight="bold" text="Accessible Layout" />
					</div>
					<nav aria-label="Main navigation">
						<div class="flex gap-4">
							<Button variant="ghost" size="sm" label="Home" ariaLabel="Navigate to home page" />
							<Button variant="ghost" size="sm" label="About" ariaLabel="Navigate to about page" />
						</div>
					</nav>
				</div>
			</Container>
		{/snippet}

		{#snippet header()}
			<div class="bg-base-200 py-16">
				<Container padding="md" centered={true} className="text-center">
					<div class="mb-4">
						<Heading
							level="h1"
							size="4xl"
							weight="bold"
							align="center"
							text="Accessibility Features"
						/>
					</div>
					<Paragraph
						size="xl"
						variant="muted"
						align="center"
						class="mb-8"
						text="This layout includes proper ARIA labels, semantic HTML, and keyboard navigation support."
					/>
				</Container>
			</div>
		{/snippet}

		{#snippet children()}
			<div class="space-y-8 py-12">
				<section aria-labelledby="accessibility-features">
					<div id="accessibility-features" class="mb-4">
						<Heading
							level="h2"
							size="2xl"
							weight="bold"
							align="center"
							text="Accessibility Checklist"
						/>
					</div>
					<div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
						<Card title="✅ ARIA Labels" shadow={true} shadowSize="lg" class="bg-base-200">
							{#snippet children()}
								<Paragraph
									text="All interactive elements have proper ARIA labels for screen readers."
								/>
							{/snippet}
						</Card>
						<Card title="✅ Semantic HTML" shadow={true} shadowSize="lg" class="bg-base-200">
							{#snippet children()}
								<Paragraph text="Uses proper semantic elements (nav, header, main, footer)." />
							{/snippet}
						</Card>
						<Card title="✅ Keyboard Navigation" shadow={true} shadowSize="lg" class="bg-base-200">
							{#snippet children()}
								<Paragraph text="All interactive elements are keyboard accessible." />
							{/snippet}
						</Card>
						<Card title="✅ Responsive Design" shadow={true} shadowSize="lg" class="bg-base-200">
							{#snippet children()}
								<Paragraph text="Layout adapts to different screen sizes and devices." />
							{/snippet}
						</Card>
					</div>
				</section>
			</div>
		{/snippet}

		{#snippet footer()}
			<div class="container mx-auto px-6 py-8">
				<div class="text-base-content/60 text-center text-sm">
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
			<Container padding="sm" className="py-4 px-4 sm:px-6">
				<div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<Heading level="h2" size="xl" weight="bold" text="Responsive Layout" />
					<nav class="flex flex-wrap gap-2 sm:gap-4">
						<Button variant="ghost" size="sm" label="Home" />
						<Button variant="ghost" size="sm" label="About" />
						<Button variant="ghost" size="sm" label="Contact" />
					</nav>
				</div>
			</Container>
		{/snippet}

		{#snippet children()}
			<div class="space-y-8 py-8 sm:py-12">
				<section class="px-4 text-center sm:px-6">
					<div class="mb-4 sm:text-3xl lg:text-4xl">
						<Heading level="h1" size="2xl" weight="bold" align="center" text="Responsive Design" />
					</div>
					<Paragraph
						variant="muted"
						size="base"
						align="center"
						class="mb-8 sm:text-lg lg:text-xl"
						text="This layout adapts to different screen sizes using Tailwind's responsive breakpoints."
					/>
					<div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
						<Card title="Mobile" shadow={true} shadowSize="lg" class="bg-base-200">
							{#snippet children()}
								<div class="mb-2">
									<Heading level="h3" size="lg" weight="bold" text="Mobile" />
								</div>
								<Paragraph size="sm" text="Single column layout on mobile devices." />
							{/snippet}
						</Card>
						<Card title="Tablet" shadow={true} shadowSize="lg" class="bg-base-200">
							{#snippet children()}
								<div class="mb-2">
									<Heading level="h3" size="lg" weight="bold" text="Tablet" />
								</div>
								<Paragraph size="sm" text="Two column layout on tablet devices." />
							{/snippet}
						</Card>
						<Card title="Desktop" shadow={true} shadowSize="lg" class="bg-base-200">
							{#snippet children()}
								<div class="mb-2">
									<Heading level="h3" size="lg" weight="bold" text="Desktop" />
								</div>
								<Paragraph size="sm" text="Three column layout on desktop screens." />
							{/snippet}
						</Card>
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
