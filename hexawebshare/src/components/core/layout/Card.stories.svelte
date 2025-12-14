<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from './Card.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Layout/Card',
		component: Card,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error']
			},
			shadowSize: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg', 'xl', '2xl']
			},
			bordered: { control: 'boolean' },
			compact: { control: 'boolean' },
			shadow: { control: 'boolean' },
			side: { control: 'boolean' },
			glass: { control: 'boolean' },
			hoverable: { control: 'boolean' },
			centered: { control: 'boolean' },
			imageOverlay: { control: 'boolean' },
			loading: { control: 'boolean' },
			disabled: { control: 'boolean' },
			title: { control: 'text' },
			ariaLabel: { control: 'text' },
			role: { control: 'text' }
		},
		args: {
			onclick: fn()
		}
	});
</script>

<!-- Basic Stories -->
<Story name="Default">
	<Card title="Card Title">
		<p>This is the default card with title and content. It includes shadow by default.</p>
	</Card>
</Story>

<Story name="With Actions">
	<Card title="Card with Actions">
		{#snippet children()}
			<p>This card includes action buttons at the bottom.</p>
		{/snippet}
		{#snippet actions()}
			<button class="btn btn-primary btn-sm">Accept</button>
			<button class="btn btn-ghost btn-sm">Decline</button>
		{/snippet}
	</Card>
</Story>

<Story name="With Figure">
	<Card title="Card with Image" class="w-96">
		{#snippet figure()}
			<img
				src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
				alt="Shoes"
				class="w-full"
			/>
		{/snippet}
		{#snippet children()}
			<p>This card includes an image figure at the top.</p>
		{/snippet}
		{#snippet actions()}
			<button class="btn btn-primary btn-sm">Buy Now</button>
		{/snippet}
	</Card>
</Story>

<Story name="Bordered">
	<Card title="Bordered Card" bordered={true}>
		<p>This card has a visible border around it.</p>
	</Card>
</Story>

<Story name="Compact">
	<Card title="Compact Card" compact={true}>
		<p>This card has reduced padding for a more compact appearance.</p>
	</Card>
</Story>

<Story name="No Shadow">
	<Card title="Card Without Shadow" shadow={false} bordered={true}>
		<p>This card has no shadow but includes a border for definition.</p>
	</Card>
</Story>

<Story name="Centered">
	<Card title="Centered Card" centered={true}>
		<p>All content in this card is centered.</p>
		{#snippet actions()}
			<button class="btn btn-primary btn-sm">Action</button>
		{/snippet}
	</Card>
</Story>

<Story name="Hoverable">
	<Card title="Hoverable Card" hoverable={true}>
		<p>Hover over this card to see the shadow effect increase.</p>
	</Card>
</Story>

<!-- Variant Stories -->
<Story name="Primary Variant">
	<Card title="Primary Card" variant="primary">
		<p>This is a primary variant card with primary background and text colors.</p>
		{#snippet actions()}
			<button class="btn btn-sm">Action</button>
		{/snippet}
	</Card>
</Story>

<Story name="Secondary Variant">
	<Card title="Secondary Card" variant="secondary">
		<p>This is a secondary variant card.</p>
	</Card>
</Story>

<Story name="Accent Variant">
	<Card title="Accent Card" variant="accent">
		<p>This is an accent variant card.</p>
	</Card>
</Story>

<Story name="Info Variant">
	<Card title="Info Card" variant="info">
		<p>This is an info variant card, useful for informational content.</p>
	</Card>
</Story>

<Story name="Success Variant">
	<Card title="Success Card" variant="success">
		<p>This is a success variant card, useful for positive messages.</p>
	</Card>
</Story>

<Story name="Warning Variant">
	<Card title="Warning Card" variant="warning">
		<p>This is a warning variant card, useful for cautionary messages.</p>
	</Card>
</Story>

<Story name="Error Variant">
	<Card title="Error Card" variant="error">
		<p>This is an error variant card, useful for error messages.</p>
	</Card>
</Story>

<!-- Shadow Sizes -->
<Story name="Small Shadow">
	<Card title="Small Shadow" shadowSize="sm">
		<p>This card has a small shadow.</p>
	</Card>
</Story>

<Story name="Medium Shadow">
	<Card title="Medium Shadow" shadowSize="md">
		<p>This card has a medium shadow (default).</p>
	</Card>
</Story>

<Story name="Large Shadow">
	<Card title="Large Shadow" shadowSize="lg">
		<p>This card has a large shadow.</p>
	</Card>
</Story>

<Story name="Extra Large Shadow">
	<Card title="Extra Large Shadow" shadowSize="xl">
		<p>This card has an extra large shadow.</p>
	</Card>
</Story>

<Story name="2XL Shadow">
	<Card title="2XL Shadow" shadowSize="2xl">
		<p>This card has a 2XL shadow.</p>
	</Card>
</Story>

<!-- Layout Variations -->
<Story name="Side Layout">
	<Card title="Side Layout Card" side={true} class="w-full max-w-2xl">
		{#snippet figure()}
			<img
				src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
				alt="Movie"
				class="w-64 h-full object-cover"
			/>
		{/snippet}
		{#snippet children()}
			<p>In side layout, the figure appears on the left side instead of the top.</p>
		{/snippet}
		{#snippet actions()}
			<button class="btn btn-primary btn-sm">Watch Now</button>
		{/snippet}
	</Card>
</Story>

<Story name="Glass Effect">
	<Card title="Glass Card" glass={true} class="w-96">
		<p>This card has a glass/transparent effect. Best viewed on a colorful background.</p>
	</Card>
</Story>

<Story name="Image Overlay">
	<Card title="Shoes!" imageOverlay={true} class="w-96">
		{#snippet figure()}
			<img
				src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
				alt="Shoes"
			/>
		{/snippet}
		{#snippet children()}
			<p>This card displays content over the image with overlay effect.</p>
		{/snippet}
		{#snippet actions()}
			<button class="btn btn-primary btn-sm">Buy Now</button>
		{/snippet}
	</Card>
</Story>

<!-- State Stories -->
<Story name="Loading State">
	<Card title="Loading Card" loading={true} class="w-96 h-64">
		<p>This content won't be visible during loading.</p>
	</Card>
</Story>

<Story name="Disabled State">
	<Card title="Disabled Card" disabled={true}>
		<p>This card is disabled with reduced opacity and no interaction.</p>
		{#snippet actions()}
			<button class="btn btn-primary btn-sm">Disabled Action</button>
		{/snippet}
	</Card>
</Story>

<!-- Interactive Stories -->
<Story name="Clickable Card">
	<Card title="Clickable Card" hoverable={true}>
		<p>Click this card to trigger an action. Check the Actions panel for events.</p>
		{#snippet actions()}
			<button class="btn btn-ghost btn-sm">Learn More →</button>
		{/snippet}
	</Card>
</Story>

<!-- Complex Examples -->
<Story name="Product Card Example">
	<Card class="w-96" hoverable={true} bordered={true}>
		{#snippet figure()}
			<img
				src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
				alt="Product"
				class="w-full h-64 object-cover"
			/>
		{/snippet}
		{#snippet children()}
			<h2 class="card-title">
				Premium Sneakers
				<div class="badge badge-secondary">NEW</div>
			</h2>
			<p>High-quality sneakers with comfortable fit and modern design.</p>
			<div class="mt-2">
				<p class="text-2xl font-bold">$129.99</p>
				<p class="text-sm opacity-70">Free shipping on orders over $50</p>
			</div>
		{/snippet}
		{#snippet actions()}
			<button class="btn btn-ghost btn-sm">Add to Wishlist</button>
			<button class="btn btn-primary btn-sm">Add to Cart</button>
		{/snippet}
	</Card>
</Story>

<Story name="User Profile Card">
	<Card centered={true} class="w-96" shadow={true} shadowSize="lg">
		{#snippet children()}
			<div class="avatar mb-4">
				<div class="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
					<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User" />
				</div>
			</div>
			<h2 class="card-title">Jane Doe</h2>
			<p class="text-sm opacity-70">Senior Software Engineer</p>
			<p class="mt-2">Passionate about creating beautiful and functional user interfaces.</p>
			<div class="mt-4 flex gap-2">
				<div class="stat place-items-center p-2">
					<div class="stat-value text-lg">4.2K</div>
					<div class="stat-desc">Followers</div>
				</div>
				<div class="stat place-items-center p-2">
					<div class="stat-value text-lg">1.8K</div>
					<div class="stat-desc">Following</div>
				</div>
			</div>
		{/snippet}
		{#snippet actions()}
			<button class="btn btn-primary btn-sm">Follow</button>
			<button class="btn btn-ghost btn-sm">Message</button>
		{/snippet}
	</Card>
</Story>

<Story name="Notification Card">
	<Card variant="info" bordered={true} class="w-96">
		{#snippet children()}
			<div class="flex items-start gap-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="h-6 w-6 flex-shrink-0 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
				<div>
					<h3 class="font-bold">New Update Available</h3>
					<p class="text-sm">Version 2.0.0 is now available with new features and improvements.</p>
				</div>
			</div>
		{/snippet}
		{#snippet actions()}
			<button class="btn btn-sm">Update Now</button>
			<button class="btn btn-ghost btn-sm">Later</button>
		{/snippet}
	</Card>
</Story>

<Story name="Article Preview Card">
	<Card class="w-full max-w-2xl" bordered={true} hoverable={true}>
		{#snippet figure()}
			<img
				src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
				alt="Article"
				class="w-full h-48 object-cover"
			/>
		{/snippet}
		{#snippet children()}
			<div class="flex gap-2 mb-2">
				<div class="badge badge-primary">Technology</div>
				<div class="badge badge-outline">Featured</div>
			</div>
			<h2 class="card-title">Understanding Modern Web Development</h2>
			<p class="text-sm opacity-70">Published on December 14, 2025</p>
			<p class="mt-2">
				Explore the latest trends and best practices in modern web development,
				including component libraries, TypeScript, and accessibility.
			</p>
			<div class="mt-3 flex items-center gap-2">
				<div class="avatar">
					<div class="w-8 rounded-full">
						<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Author" />
					</div>
				</div>
				<div class="text-sm">
					<p class="font-semibold">Jane Smith</p>
					<p class="opacity-70">5 min read</p>
				</div>
			</div>
		{/snippet}
		{#snippet actions()}
			<button class="btn btn-ghost btn-sm">Bookmark</button>
			<button class="btn btn-primary btn-sm">Read More</button>
		{/snippet}
	</Card>
</Story>

<!-- Grid Layout Example -->
<Story name="Card Grid Layout">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<Card title="Card 1" variant="primary" compact={true}>
			<p>First card in the grid</p>
		</Card>
		<Card title="Card 2" variant="secondary" compact={true}>
			<p>Second card in the grid</p>
		</Card>
		<Card title="Card 3" variant="accent" compact={true}>
			<p>Third card in the grid</p>
		</Card>
		<Card title="Card 4" variant="info" compact={true}>
			<p>Fourth card in the grid</p>
		</Card>
		<Card title="Card 5" variant="success" compact={true}>
			<p>Fifth card in the grid</p>
		</Card>
		<Card title="Card 6" variant="warning" compact={true}>
			<p>Sixth card in the grid</p>
		</Card>
	</div>
</Story>

<!-- Accessibility Example -->
<Story name="Accessibility Features">
	<Card
		title="Accessible Card"
		ariaLabel="Card demonstrating accessibility features"
		role="article"
	>
		<p>
			This card includes proper ARIA labels and roles for screen reader compatibility.
			The card uses semantic HTML and follows WCAG guidelines.
		</p>
		{#snippet actions()}
			<button class="btn btn-primary btn-sm" aria-label="Perform primary action">
				Primary Action
			</button>
		{/snippet}
	</Card>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants Showcase">
	<div class="w-full space-y-8">
		<div>
			<h3 class="mb-4 text-2xl font-bold">Color Variants</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card title="Default" compact={true}>
					<p>Default card style</p>
				</Card>
				<Card title="Primary" variant="primary" compact={true}>
					<p>Primary variant</p>
				</Card>
				<Card title="Secondary" variant="secondary" compact={true}>
					<p>Secondary variant</p>
				</Card>
				<Card title="Accent" variant="accent" compact={true}>
					<p>Accent variant</p>
				</Card>
				<Card title="Info" variant="info" compact={true}>
					<p>Info variant</p>
				</Card>
				<Card title="Success" variant="success" compact={true}>
					<p>Success variant</p>
				</Card>
				<Card title="Warning" variant="warning" compact={true}>
					<p>Warning variant</p>
				</Card>
				<Card title="Error" variant="error" compact={true}>
					<p>Error variant</p>
				</Card>
			</div>
		</div>

		<div>
			<h3 class="mb-4 text-2xl font-bold">Style Options</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<Card title="Normal" compact={true}>
					<p>Default styling</p>
				</Card>
				<Card title="Bordered" bordered={true} compact={true}>
					<p>With border</p>
				</Card>
				<Card title="Glass" glass={true} compact={true}>
					<p>Glass effect</p>
				</Card>
			</div>
		</div>

		<div>
			<h3 class="mb-4 text-2xl font-bold">Shadow Sizes</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-5">
				<Card title="SM" shadowSize="sm" compact={true}>
					<p>Small shadow</p>
				</Card>
				<Card title="MD" shadowSize="md" compact={true}>
					<p>Medium shadow</p>
				</Card>
				<Card title="LG" shadowSize="lg" compact={true}>
					<p>Large shadow</p>
				</Card>
				<Card title="XL" shadowSize="xl" compact={true}>
					<p>XL shadow</p>
				</Card>
				<Card title="2XL" shadowSize="2xl" compact={true}>
					<p>2XL shadow</p>
				</Card>
			</div>
		</div>

		<div>
			<h3 class="mb-4 text-2xl font-bold">States</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<Card title="Normal" compact={true}>
					<p>Normal state</p>
				</Card>
				<Card title="Loading" loading={true} compact={true} class="h-48">
					<p>This won't show</p>
				</Card>
				<Card title="Disabled" disabled={true} compact={true}>
					<p>Disabled state</p>
				</Card>
			</div>
		</div>
	</div>
</Story>

