<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AdminLayout from './AdminLayout.svelte';
	import type { SidebarItem } from '../../core/overlay-navigation/Sidebar.svelte';
	import { fn } from 'storybook/test';

	// Sample sidebar items for stories
	const defaultSidebarItems: SidebarItem[] = [
		{ id: 'dashboard', label: 'Dashboard', icon: '📊', active: true },
		{ id: 'users', label: 'Users', icon: '👥', badge: 24 },
		{ id: 'products', label: 'Products', icon: '📦' },
		{ id: 'orders', label: 'Orders', icon: '🛒', badge: 8, badgeVariant: 'success' },
		{ id: 'analytics', label: 'Analytics', icon: '📈' },
		{ id: 'settings', label: 'Settings', icon: '⚙️' }
	];

	const { Story } = defineMeta({
		title: 'Admin/Layout/AdminLayout',
		component: AdminLayout,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'filled'],
				description: 'Visual variant of the layout'
			},
			sidebarWidth: {
				control: { type: 'select' },
				options: ['narrow', 'default', 'wide'],
				description: 'Sidebar width variant'
			},
			sidebarCollapsed: {
				control: 'boolean',
				description: 'Whether the sidebar is collapsed'
			},
			sidebarCollapsible: {
				control: 'boolean',
				description: 'Whether the sidebar can be collapsed'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the layout is in loading state'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the layout is disabled'
			},
			mobileSidebarOpen: {
				control: 'boolean',
				description: 'Whether the mobile sidebar drawer is open'
			},
			mobileDrawer: {
				control: 'boolean',
				description: 'Whether to show mobile sidebar as drawer'
			},
			sidebarTitle: {
				control: 'text',
				description: 'Sidebar title (required)'
			},
			sidebarSubtitle: {
				control: 'text',
				description: 'Sidebar subtitle (required)'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the layout (required)'
			},
			loadingLabel: {
				control: 'text',
				description: 'Accessible label for loading spinner (required)'
			},
			sidebarAriaLabel: {
				control: 'text',
				description: 'Accessible label for sidebar (required)'
			}
		},
		args: {
			sidebarItems: defaultSidebarItems,
			sidebarTitle: 'Admin Panel',
			sidebarSubtitle: 'Navigation',
			variant: 'default',
			sidebarWidth: 'default',
			sidebarCollapsed: false,
			sidebarCollapsible: true,
			loading: false,
			disabled: false,
			mobileSidebarOpen: false,
			mobileDrawer: true,
			ariaLabel: 'Admin layout',
			loadingLabel: 'Loading content',
			sidebarAriaLabel: 'Admin navigation sidebar',
			class: '',
			onSidebarCollapse: fn()
		}
	});
</script>

<script lang="ts">
	import Heading from '../../core/typography/Heading.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';

	// Local state for mobile drawer stories
	let mobileDrawerOpen = $state(false);
	let playgroundMobileOpen = $state(false);
</script>

<!-- Story 1: Default Layout -->
<Story name="Default">
	{#snippet children()}
		<AdminLayout
			sidebarItems={defaultSidebarItems}
			sidebarTitle="Admin Panel"
			sidebarSubtitle="Navigation"
			sidebarCollapsed={false}
			sidebarCollapsible={true}
			sidebarWidth="default"
			variant="default"
			loading={false}
			disabled={false}
			mobileSidebarOpen={false}
			mobileDrawer={true}
			ariaLabel="Admin layout"
			loadingLabel="Loading content"
			sidebarAriaLabel="Admin navigation sidebar"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<div class="flex items-center justify-between px-6 py-4">
					<Heading level="h1" size="xl" text="Admin Dashboard" />
					<div class="flex items-center gap-2">
						<IconButton variant="ghost" size="sm" ariaLabel="Notifications">🔔</IconButton>
						<Button variant="primary" size="sm" label="New Item" />
					</div>
				</div>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Heading level="h2" text="Welcome to Admin Panel" />
					<Text text="This is the main content area of the admin layout." class="mt-2" />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>

<!-- Story 2: Without Sidebar -->
<Story name="Without Sidebar">
	{#snippet children()}
		<AdminLayout
			sidebarTitle=""
			sidebarSubtitle=""
			sidebarCollapsed={false}
			sidebarCollapsible={false}
			sidebarWidth="default"
			variant="default"
			loading={false}
			disabled={false}
			mobileSidebarOpen={false}
			mobileDrawer={false}
			ariaLabel="Admin layout without sidebar"
			loadingLabel="Loading content"
			sidebarAriaLabel="Admin navigation"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<div class="flex items-center justify-between px-6 py-4">
					<Heading level="h1" size="xl" text="Admin Dashboard" />
					<Button variant="primary" size="sm" label="New Item" />
				</div>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Heading level="h2" text="Full Width Content" />
					<Text text="Layout without sidebar for full-width content." class="mt-2" />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>

<!-- Story 3: Without Header -->
<Story name="Without Header">
	{#snippet children()}
		<AdminLayout
			sidebarItems={defaultSidebarItems}
			sidebarTitle="Admin Panel"
			sidebarSubtitle="Navigation"
			sidebarCollapsed={false}
			sidebarCollapsible={true}
			sidebarWidth="default"
			variant="default"
			loading={false}
			disabled={false}
			mobileSidebarOpen={false}
			mobileDrawer={true}
			ariaLabel="Admin layout without header"
			loadingLabel="Loading content"
			sidebarAriaLabel="Admin navigation sidebar"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<span></span>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Heading level="h2" text="Content Without Header" />
					<Text text="Layout without header section." class="mt-2" />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>

<!-- Story 4: With Footer -->
<Story name="With Footer">
	{#snippet children()}
		<AdminLayout
			sidebarItems={defaultSidebarItems}
			sidebarTitle="Admin Panel"
			sidebarSubtitle="Navigation"
			sidebarCollapsed={false}
			sidebarCollapsible={true}
			sidebarWidth="default"
			variant="default"
			loading={false}
			disabled={false}
			mobileSidebarOpen={false}
			mobileDrawer={true}
			ariaLabel="Admin layout with footer"
			loadingLabel="Loading content"
			sidebarAriaLabel="Admin navigation sidebar"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<div class="flex items-center justify-between px-6 py-4">
					<Heading level="h1" size="xl" text="Admin Dashboard" />
				</div>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Heading level="h2" text="Main Content" />
					<Text text="Content area with footer below." class="mt-2" />
				</div>
			{/snippet}

			{#snippet footer()}
				<div class="flex items-center justify-between px-6 py-4">
					<Text text="© 2025 Admin Panel" size="sm" variant="muted" />
					<Text text="Version 1.0.0" size="sm" variant="muted" />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>

<!-- Story 5: Collapsed Sidebar -->
<Story name="Collapsed Sidebar">
	{#snippet children()}
		<AdminLayout
			sidebarItems={defaultSidebarItems}
			sidebarTitle="Admin Panel"
			sidebarSubtitle="Navigation"
			sidebarCollapsed={true}
			sidebarCollapsible={true}
			sidebarWidth="default"
			variant="default"
			loading={false}
			disabled={false}
			mobileSidebarOpen={false}
			mobileDrawer={true}
			ariaLabel="Admin layout with collapsed sidebar"
			loadingLabel="Loading content"
			sidebarAriaLabel="Admin navigation sidebar"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<div class="flex items-center justify-between px-6 py-4">
					<Heading level="h1" size="xl" text="Admin Dashboard" />
				</div>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Heading level="h2" text="Collapsed Sidebar" />
					<Text text="Sidebar is collapsed to show more content space." class="mt-2" />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>

<!-- Story 6: Loading State -->
<Story name="Loading State">
	{#snippet children()}
		<AdminLayout
			sidebarItems={defaultSidebarItems}
			sidebarTitle="Admin Panel"
			sidebarSubtitle="Navigation"
			sidebarCollapsed={false}
			sidebarCollapsible={true}
			sidebarWidth="default"
			variant="default"
			loading={true}
			disabled={false}
			mobileSidebarOpen={false}
			mobileDrawer={true}
			ariaLabel="Admin layout in loading state"
			loadingLabel="Loading admin content"
			sidebarAriaLabel="Admin navigation sidebar"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<div class="flex items-center justify-between px-6 py-4">
					<Heading level="h1" size="xl" text="Admin Dashboard" />
				</div>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Text text="This content is hidden during loading." />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>

<!-- Story 7: Bordered Variant -->
<Story name="Bordered Variant">
	{#snippet children()}
		<AdminLayout
			sidebarItems={defaultSidebarItems}
			sidebarTitle="Admin Panel"
			sidebarSubtitle="Navigation"
			sidebarCollapsed={false}
			sidebarCollapsible={true}
			sidebarWidth="default"
			variant="bordered"
			loading={false}
			disabled={false}
			mobileSidebarOpen={false}
			mobileDrawer={true}
			ariaLabel="Bordered admin layout"
			loadingLabel="Loading content"
			sidebarAriaLabel="Admin navigation sidebar"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<div class="flex items-center justify-between px-6 py-4">
					<Heading level="h1" size="xl" text="Bordered Layout" />
				</div>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Heading level="h2" text="Bordered Variant" />
					<Text text="Layout with border styling." class="mt-2" />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>

<!-- Story 8: Filled Variant -->
<Story name="Filled Variant">
	{#snippet children()}
		<AdminLayout
			sidebarItems={defaultSidebarItems}
			sidebarTitle="Admin Panel"
			sidebarSubtitle="Navigation"
			sidebarCollapsed={false}
			sidebarCollapsible={true}
			sidebarWidth="default"
			variant="filled"
			loading={false}
			disabled={false}
			mobileSidebarOpen={false}
			mobileDrawer={true}
			ariaLabel="Filled admin layout"
			loadingLabel="Loading content"
			sidebarAriaLabel="Admin navigation sidebar"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<div class="flex items-center justify-between px-6 py-4">
					<Heading level="h1" size="xl" text="Filled Layout" />
				</div>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Heading level="h2" text="Filled Variant" />
					<Text text="Layout with filled background styling." class="mt-2" />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>

<!-- Story 9: Narrow Sidebar -->
<Story name="Narrow Sidebar">
	{#snippet children()}
		<AdminLayout
			sidebarItems={defaultSidebarItems}
			sidebarTitle="Admin Panel"
			sidebarSubtitle="Navigation"
			sidebarCollapsed={false}
			sidebarCollapsible={true}
			sidebarWidth="narrow"
			variant="default"
			loading={false}
			disabled={false}
			mobileSidebarOpen={false}
			mobileDrawer={true}
			ariaLabel="Admin layout with narrow sidebar"
			loadingLabel="Loading content"
			sidebarAriaLabel="Admin navigation sidebar"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<div class="flex items-center justify-between px-6 py-4">
					<Heading level="h1" size="xl" text="Narrow Sidebar" />
				</div>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Heading level="h2" text="Narrow Sidebar Width" />
					<Text text="Sidebar with narrow width variant." class="mt-2" />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>

<!-- Story 10: Wide Sidebar -->
<Story name="Wide Sidebar">
	{#snippet children()}
		<AdminLayout
			sidebarItems={defaultSidebarItems}
			sidebarTitle="Admin Panel"
			sidebarSubtitle="Navigation"
			sidebarCollapsed={false}
			sidebarCollapsible={true}
			sidebarWidth="wide"
			variant="default"
			loading={false}
			disabled={false}
			mobileSidebarOpen={false}
			mobileDrawer={true}
			ariaLabel="Admin layout with wide sidebar"
			loadingLabel="Loading content"
			sidebarAriaLabel="Admin navigation sidebar"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<div class="flex items-center justify-between px-6 py-4">
					<Heading level="h1" size="xl" text="Wide Sidebar" />
				</div>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Heading level="h2" text="Wide Sidebar Width" />
					<Text text="Sidebar with wide width variant." class="mt-2" />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>

<!-- Story 11: Disabled State -->
<Story name="Disabled State">
	{#snippet children()}
		<AdminLayout
			sidebarItems={defaultSidebarItems}
			sidebarTitle="Admin Panel"
			sidebarSubtitle="Navigation"
			sidebarCollapsed={false}
			sidebarCollapsible={true}
			sidebarWidth="default"
			variant="default"
			loading={false}
			disabled={true}
			mobileSidebarOpen={false}
			mobileDrawer={true}
			ariaLabel="Disabled admin layout"
			loadingLabel="Loading content"
			sidebarAriaLabel="Admin navigation sidebar"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<div class="flex items-center justify-between px-6 py-4">
					<Heading level="h1" size="xl" text="Disabled Layout" />
				</div>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Heading level="h2" text="Disabled State" />
					<Text text="Layout in disabled state." class="mt-2" />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>

<!-- Story 12: Mobile Drawer -->
<Story name="Mobile Drawer">
	{#snippet children()}
		<AdminLayout
			sidebarItems={defaultSidebarItems}
			sidebarTitle="Admin Panel"
			sidebarSubtitle="Navigation"
			sidebarCollapsed={false}
			sidebarCollapsible={true}
			sidebarWidth="default"
			variant="default"
			loading={false}
			disabled={false}
			bind:mobileSidebarOpen={mobileDrawerOpen}
			mobileDrawer={true}
			ariaLabel="Admin layout with mobile drawer"
			loadingLabel="Loading content"
			sidebarAriaLabel="Admin navigation sidebar"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<div class="flex items-center justify-between px-6 py-4">
					<div class="flex items-center gap-2">
						<IconButton
							variant="ghost"
							size="sm"
							ariaLabel="Toggle mobile menu"
							onclick={() => (mobileDrawerOpen = !mobileDrawerOpen)}
							class="lg:hidden"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</IconButton>
						<Heading level="h1" size="xl" text="Admin Dashboard" />
					</div>
					<div class="flex items-center gap-2">
						<IconButton variant="ghost" size="sm" ariaLabel="Notifications">🔔</IconButton>
						<Button variant="primary" size="sm" label="New Item" />
					</div>
				</div>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Heading level="h2" text="Mobile Drawer Example" />
					<Text
						text="Click the hamburger menu icon (visible on mobile/tablet) to toggle the sidebar drawer."
						class="mt-2"
					/>
					<div class="border-base-300 bg-base-200 mt-4 rounded-lg border p-4">
						<Text text="Resize your browser window to test responsive behavior:" display="block" />
						<ul class="mt-2 list-inside list-disc space-y-1">
							<li><Text text="Desktop (1024px+): Sidebar visible on the left" /></li>
							<li><Text text="Mobile/Tablet (<1024px): Sidebar hidden, use hamburger menu" /></li>
						</ul>
					</div>
				</div>
			{/snippet}

			{#snippet footer()}
				<div class="flex items-center justify-between px-6 py-4">
					<Text text="© 2025 Admin Panel" size="sm" variant="muted" />
					<Text text="Version 1.0.0" size="sm" variant="muted" />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>

<!-- Story 13: Playground (Interactive) -->
<Story name="Playground">
	{#snippet children()}
		<AdminLayout
			sidebarItems={defaultSidebarItems}
			sidebarTitle="Admin Panel"
			sidebarSubtitle="Navigation"
			sidebarCollapsed={false}
			sidebarCollapsible={true}
			sidebarWidth="default"
			variant="default"
			loading={false}
			disabled={false}
			bind:mobileSidebarOpen={playgroundMobileOpen}
			mobileDrawer={true}
			ariaLabel="Interactive admin layout playground"
			loadingLabel="Loading playground content"
			sidebarAriaLabel="Admin navigation sidebar"
			onSidebarCollapse={() => {}}
			class=""
		>
			{#snippet header()}
				<div class="flex items-center justify-between px-6 py-4">
					<div class="flex items-center gap-2">
						<IconButton
							variant="ghost"
							size="sm"
							ariaLabel="Toggle mobile menu"
							onclick={() => (playgroundMobileOpen = !playgroundMobileOpen)}
							class="lg:hidden"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</IconButton>
						<Heading level="h1" size="xl" text="Admin Dashboard" />
					</div>
					<div class="flex items-center gap-2">
						<IconButton variant="ghost" size="sm" ariaLabel="Notifications">🔔</IconButton>
						<Button variant="primary" size="sm" label="New Item" />
					</div>
				</div>
			{/snippet}

			{#snippet children()}
				<div class="p-6">
					<Heading level="h2" text="Interactive Playground" />
					<Text text="Use Storybook controls to customize the layout properties." class="mt-2" />
					<Text
						text="On mobile devices, click the hamburger menu to toggle the sidebar drawer."
						class="mt-2"
						variant="muted"
					/>
				</div>
			{/snippet}

			{#snippet footer()}
				<div class="flex items-center justify-between px-6 py-4">
					<Text text="© 2025 Admin Panel" size="sm" variant="muted" />
					<Text text="Version 1.0.0" size="sm" variant="muted" />
				</div>
			{/snippet}
		</AdminLayout>
	{/snippet}
</Story>
