<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DetailDrawer from './DetailDrawer.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Admin/CRUD Data/DetailDrawer',
		component: DetailDrawer,
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: 'boolean',
				description: 'Whether the drawer is open',
				type: { name: 'boolean' }
			},
			title: {
				control: 'text',
				description: 'Title displayed in the drawer header'
			},
			side: {
				control: { type: 'select' },
				options: ['left', 'right'],
				description: 'Position of the drawer'
			},
			overlay: {
				control: 'boolean',
				description: 'Whether to show overlay backdrop'
			},
			closeOnBackdrop: {
				control: 'boolean',
				description: 'Whether clicking the backdrop closes the drawer'
			},
			showCloseButton: {
				control: 'boolean',
				description: 'Whether to show close button'
			},
			closeOnEscape: {
				control: 'boolean',
				description: 'Whether to allow closing with Escape key'
			},
			ariaLabel: {
				control: 'text',
				description: 'ARIA label for accessibility'
			}
		},
		args: {
			onclose: fn(),
			onopen: fn(),
			open: false,
			title: 'Detail Drawer',
			side: 'right',
			overlay: true,
			closeOnBackdrop: true,
			showCloseButton: true,
			closeOnEscape: true
		},
		parameters: {
			docs: {
				description: {
					component:
						'A detail drawer component for displaying key-value data in admin interfaces. Supports action buttons, badges, and various display options. Built with Svelte 5 and DaisyUI.'
				}
			}
		}
	});
</script>

<script lang="ts">
	import type { DetailItem, DetailAction } from './DetailDrawer.svelte';

	let defaultOpen = $state(false);
	let withDataOpen = $state(false);
	let withActionsOpen = $state(false);
	let leftSideOpen = $state(false);
	let emptyStateOpen = $state(false);
	let withBadgesOpen = $state(false);
	let withoutTitleOpen = $state(false);
	let withoutCloseButtonOpen = $state(false);
	let fullFeaturedOpen = $state(false);
	let loadingActionsOpen = $state(false);
	let playgroundOpen = $state(false);

	const sampleData = {
		name: 'John Doe',
		email: 'john.doe@example.com',
		role: 'Administrator',
		status: 'Active',
		createdAt: '2025-01-15',
		lastLogin: '2025-01-20 14:30:00'
	};

	const sampleDataArray: DetailItem[] = [
		{ key: 'id', label: 'User ID', value: '12345' },
		{ key: 'name', label: 'Full Name', value: 'John Doe' },
		{ key: 'email', label: 'Email Address', value: 'john.doe@example.com' },
		{ key: 'role', label: 'Role', value: 'Administrator', valueVariant: 'primary' as const },
		{ key: 'status', label: 'Status', value: 'Active', valueVariant: 'success' as const },
		{ key: 'createdAt', label: 'Created At', value: '2025-01-15' },
		{ key: 'lastLogin', label: 'Last Login', value: '2025-01-20 14:30:00' }
	];

	const badgeData: DetailItem[] = [
		{ key: 'id', label: 'Product ID', value: 'PROD-001' },
		{ key: 'name', label: 'Product Name', value: 'Premium Widget' },
		{ key: 'category', label: 'Category', value: 'Electronics', valueVariant: 'info' as const },
		{ key: 'status', label: 'Status', value: 'In Stock', valueVariant: 'success' as const },
		{ key: 'price', label: 'Price', value: '$99.99' },
		{ key: 'discount', label: 'Discount', value: '20%', valueVariant: 'warning' as const },
		{ key: 'rating', label: 'Rating', value: '4.5', valueVariant: 'primary' as const }
	];

	const sampleActions: DetailAction[] = [
		{ label: 'Edit', variant: 'primary' as const, onclick: () => console.log('Edit clicked') },
		{ label: 'Delete', variant: 'error' as const, onclick: () => console.log('Delete clicked') }
	];

	const loadingActions: DetailAction[] = [
		{
			label: 'Save',
			variant: 'primary' as const,
			loading: true,
			onclick: () => console.log('Save clicked')
		},
		{ label: 'Cancel', variant: 'neutral' as const, onclick: () => console.log('Cancel clicked') }
	];
</script>

<!-- Default Story -->
<Story name="Default">
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="flex min-h-[400px] flex-col items-center justify-center">
				<p class="mb-4 text-lg">Main content area</p>
				<button class="btn btn-primary" onclick={() => (defaultOpen = true)}>
					Open Detail Drawer
				</button>
			</div>
			<DetailDrawer bind:open={defaultOpen} title="Default Detail Drawer" />
		</div>
	{/snippet}
</Story>

<!-- With Data Story -->
<Story name="With Data">
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="flex min-h-[400px] flex-col items-center justify-center">
				<p class="mb-4 text-lg">Main content area</p>
				<button class="btn btn-primary" onclick={() => (withDataOpen = true)}>
					Open Detail Drawer
				</button>
			</div>
			<DetailDrawer bind:open={withDataOpen} title="User Details" data={sampleData} />
		</div>
	{/snippet}
</Story>

<!-- With Actions Story -->
<Story name="With Actions">
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="flex min-h-[400px] flex-col items-center justify-center">
				<p class="mb-4 text-lg">Main content area</p>
				<button class="btn btn-primary" onclick={() => (withActionsOpen = true)}>
					Open Detail Drawer
				</button>
			</div>
			<DetailDrawer
				bind:open={withActionsOpen}
				title="Edit Item"
				data={sampleDataArray}
				actions={sampleActions}
			/>
		</div>
	{/snippet}
</Story>

<!-- Left Side Story -->
<Story name="Left Side">
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="flex min-h-[400px] flex-col items-center justify-center">
				<p class="mb-4 text-lg">Main content area</p>
				<button class="btn btn-primary" onclick={() => (leftSideOpen = true)}>
					Open Detail Drawer
				</button>
			</div>
			<DetailDrawer bind:open={leftSideOpen} title="Settings" side="left" data={sampleData} />
		</div>
	{/snippet}
</Story>

<!-- Empty State Story -->
<Story name="Empty State">
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="flex min-h-[400px] flex-col items-center justify-center">
				<p class="mb-4 text-lg">Main content area</p>
				<button class="btn btn-primary" onclick={() => (emptyStateOpen = true)}>
					Open Detail Drawer
				</button>
			</div>
			<DetailDrawer bind:open={emptyStateOpen} title="Empty Details" data={{}} />
		</div>
	{/snippet}
</Story>

<!-- With Badges Story -->
<Story name="With Badges">
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="flex min-h-[400px] flex-col items-center justify-center">
				<p class="mb-4 text-lg">Main content area</p>
				<button class="btn btn-primary" onclick={() => (withBadgesOpen = true)}>
					Open Detail Drawer
				</button>
			</div>
			<DetailDrawer bind:open={withBadgesOpen} title="Product Details" data={badgeData} />
		</div>
	{/snippet}
</Story>

<!-- Without Title Story -->
<Story name="Without Title">
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="flex min-h-[400px] flex-col items-center justify-center">
				<p class="mb-4 text-lg">Main content area</p>
				<button class="btn btn-primary" onclick={() => (withoutTitleOpen = true)}>
					Open Detail Drawer
				</button>
			</div>
			<DetailDrawer bind:open={withoutTitleOpen} data={sampleData} showCloseButton={true} />
		</div>
	{/snippet}
</Story>

<!-- Without Close Button Story -->
<Story name="Without Close Button">
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="flex min-h-[400px] flex-col items-center justify-center">
				<p class="mb-4 text-lg">Main content area</p>
				<button class="btn btn-primary" onclick={() => (withoutCloseButtonOpen = true)}>
					Open Detail Drawer
				</button>
				<button class="btn btn-secondary mt-2" onclick={() => (withoutCloseButtonOpen = false)}>
					Close Drawer
				</button>
			</div>
			<DetailDrawer
				bind:open={withoutCloseButtonOpen}
				title="Read Only Details"
				data={sampleData}
				showCloseButton={false}
			/>
		</div>
	{/snippet}
</Story>

<!-- Full Featured Story -->
<Story name="Full Featured">
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="flex min-h-[400px] flex-col items-center justify-center">
				<p class="mb-4 text-lg">Main content area</p>
				<button class="btn btn-primary" onclick={() => (fullFeaturedOpen = true)}>
					Open Detail Drawer
				</button>
			</div>
			<DetailDrawer
				bind:open={fullFeaturedOpen}
				title="Complete Details"
				data={sampleDataArray}
				actions={sampleActions}
				side="right"
			/>
		</div>
	{/snippet}
</Story>

<!-- Loading Actions Story -->
<Story name="Loading Actions">
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="flex min-h-[400px] flex-col items-center justify-center">
				<p class="mb-4 text-lg">Main content area</p>
				<button class="btn btn-primary" onclick={() => (loadingActionsOpen = true)}>
					Open Detail Drawer
				</button>
			</div>
			<DetailDrawer
				bind:open={loadingActionsOpen}
				title="Saving Changes"
				data={sampleData}
				actions={loadingActions}
			/>
		</div>
	{/snippet}
</Story>

<!-- Playground Story (Required - Must be last) -->
<Story
	name="Playground"
	args={{
		open: playgroundOpen,
		title: 'Interactive Detail Drawer',
		data: sampleDataArray,
		actions: sampleActions,
		side: 'right',
		overlay: true,
		closeOnBackdrop: true,
		showCloseButton: true,
		closeOnEscape: true
	}}
>
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="flex min-h-[400px] flex-col items-center justify-center">
				<p class="mb-4 text-lg">Main content area</p>
				<p class="text-base-content/70 mb-4 text-sm">
					Use Storybook controls to customize the drawer
				</p>
				<button class="btn btn-primary" onclick={() => (playgroundOpen = true)}>
					Open Detail Drawer
				</button>
			</div>
			<DetailDrawer
				bind:open={playgroundOpen}
				title="Interactive Detail Drawer"
				data={sampleDataArray}
				actions={sampleActions}
				side="right"
				overlay={true}
				closeOnBackdrop={true}
				showCloseButton={true}
				closeOnEscape={true}
			/>
		</div>
	{/snippet}
</Story>
