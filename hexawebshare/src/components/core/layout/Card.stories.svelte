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
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the card (leave empty for default)'
			},
			shadowSize: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg', 'xl', '2xl'],
				description: 'Shadow size (only applies when shadow is true)'
			},
			bordered: {
				control: 'boolean',
				description: 'Add border to the card'
			},
			compact: {
				control: 'boolean',
				description: 'Compact card with reduced padding'
			},
			shadow: {
				control: 'boolean',
				description: 'Add shadow to the card'
			},
			side: {
				control: 'boolean',
				description: 'Side layout (figure on side instead of top)'
			},
			glass: {
				control: 'boolean',
				description: 'Make card glass/transparent effect'
			},
			hoverable: {
				control: 'boolean',
				description: 'Hoverable card with hover effects'
			},
			centered: {
				control: 'boolean',
				description: 'Center card body content'
			},
			imageOverlay: {
				control: 'boolean',
				description: 'Full image background'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the card is in loading state'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the card is disabled'
			},
			title: {
				control: 'text',
				description: 'Card title text'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			role: {
				control: 'text',
				description: 'ARIA role for the card'
			},
			class: {
				control: 'text',
				description: 'Additional CSS classes'
			}
		},
		args: {
			onclick: fn()
		}
	});
</script>

<!-- Default -->
<Story name="Default">
	<Card title="Card Title">
		<p>This is the default card with title and content. It includes shadow by default.</p>
	</Card>
</Story>

<!-- With Actions and Figure -->
<Story name="With Figure and Actions">
	<Card title="Card with Image" class="w-96">
		{#snippet figure()}
			<img
				src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
				alt="Shoes"
				class="w-full"
			/>
		{/snippet}
		{#snippet children()}
			<p>This card includes an image figure at the top and action buttons.</p>
		{/snippet}
		{#snippet actions()}
			<button class="btn btn-primary btn-sm">Buy Now</button>
			<button class="btn btn-ghost btn-sm">Details</button>
		{/snippet}
	</Card>
</Story>

<!-- Variants -->
<Story name="Color Variants">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		<Card title="Primary" variant="primary" compact={true}>
			<p>Primary variant card</p>
		</Card>
		<Card title="Secondary" variant="secondary" compact={true}>
			<p>Secondary variant</p>
		</Card>
		<Card title="Info" variant="info" compact={true}>
			<p>Info variant card</p>
		</Card>
		<Card title="Success" variant="success" compact={true}>
			<p>Success variant</p>
		</Card>
	</div>
</Story>

<!-- Style Options -->
<Story name="Style Options">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<Card title="Bordered" bordered={true}>
			<p>Card with visible border</p>
		</Card>
		<Card title="Compact" compact={true}>
			<p>Reduced padding</p>
		</Card>
		<Card title="Hoverable" hoverable={true}>
			<p>Hover for shadow effect</p>
		</Card>
	</div>
</Story>

<!-- Shadow Sizes -->
<Story name="Shadow Sizes">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<Card title="Small" shadowSize="sm">
			<p>Small shadow</p>
		</Card>
		<Card title="Medium" shadowSize="md">
			<p>Medium shadow (default)</p>
		</Card>
		<Card title="Large" shadowSize="lg">
			<p>Large shadow</p>
		</Card>
	</div>
</Story>

<!-- Layout Variations -->
<Story name="Side Layout">
	<Card title="Side Layout Card" side={true} class="w-full max-w-2xl">
		{#snippet figure()}
			<img
				src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
				alt="Movie"
				class="h-full w-64 object-cover"
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

<!-- Image Overlay -->
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

<!-- Centered Content -->
<Story name="Centered Content">
	<Card centered={true} class="w-96" shadow={true} shadowSize="lg">
		{#snippet children()}
			<div class="avatar mb-4">
				<div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
					<img
						src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
						alt="User"
					/>
				</div>
			</div>
			<h2 class="card-title">Jane Doe</h2>
			<p class="text-sm opacity-70">Senior Software Engineer</p>
			<p class="mt-2">Centered card with avatar and content</p>
		{/snippet}
		{#snippet actions()}
			<button class="btn btn-primary btn-sm">Follow</button>
			<button class="btn btn-ghost btn-sm">Message</button>
		{/snippet}
	</Card>
</Story>

<!-- States -->
<Story name="States">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<Card title="Loading State" loading={true} class="h-48">
			<p>This content won't be visible during loading.</p>
		</Card>
		<Card title="Disabled State" disabled={true}>
			<p>This card is disabled with reduced opacity.</p>
			{#snippet actions()}
				<button class="btn btn-primary btn-sm">Action</button>
			{/snippet}
		</Card>
	</div>
</Story>

<!-- Glass Effect -->
<Story name="Glass Effect">
	<Card title="Glass Card" glass={true} class="w-96">
		<p>This card has a glass/transparent effect. Best viewed on a colorful background.</p>
		{#snippet actions()}
			<button class="btn btn-primary btn-sm">Action</button>
		{/snippet}
	</Card>
</Story>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		title: 'Interactive Card',
		shadowSize: 'md',
		bordered: false,
		compact: false,
		shadow: true,
		side: false,
		glass: false,
		hoverable: false,
		centered: false,
		imageOverlay: false,
		loading: false,
		disabled: false,
		role: 'article',
		onclick: fn()
	}}
/>
