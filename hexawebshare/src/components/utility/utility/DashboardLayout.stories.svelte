<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DashboardLayout from './DashboardLayout.svelte';

	const { Story } = defineMeta({
		title: 'Utility/Utility/DashboardLayout',
		component: DashboardLayout,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'filled'],
				description: 'Visual variant of the layout'
			},
			sidebarPosition: {
				control: { type: 'select' },
				options: ['left', 'right'],
				description: 'Sidebar position'
			},
			loading: { control: 'boolean', description: 'Show loading state' },
			disabled: { control: 'boolean', description: 'Disable layout interaction' },
			error: { control: 'boolean', description: 'Show error state' },
			errorMessage: { control: 'text', description: 'Error message when error is true' },
			ariaLabel: { control: 'text', description: 'Accessible label for layout' },
			loadingLabel: { control: 'text', description: 'Accessible label for loading spinner' },
			mainAriaLabel: { control: 'text', description: 'Accessible label for main content' },
			sidebarAriaLabel: { control: 'text', description: 'Accessible label for sidebar' },
			sidebarTitle: { control: 'text', description: 'Sidebar title when using sidebarItems' },
			sidebarSubtitle: { control: 'text', description: 'Sidebar subtitle when using sidebarItems' },
			sidebarWidth: {
				control: { type: 'select' },
				options: ['narrow', 'default', 'wide'],
				description: 'Sidebar width when using sidebarItems'
			},
			sidebarSize: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Sidebar item size when using sidebarItems'
			},
			sidebarVariant: {
				control: { type: 'select' },
				options: ['default', 'compact', 'bordered'],
				description: 'Sidebar variant when using sidebarItems'
			}
		}
	});
</script>

<script lang="ts">
	import type { SidebarItem } from '../../core/overlay-navigation/Sidebar.svelte';
	import Heading from '../../core/typography/Heading.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Paragraph from '../../core/typography/Paragraph.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Card from '../../core/layout/Card.svelte';
	import Grid from '../../core/layout/Grid.svelte';
	import Container from '../../core/layout/Container.svelte';

	const defaultSidebarItems: SidebarItem[] = [
		{ id: 'overview', label: 'Overview', icon: '📊', active: true },
		{ id: 'analytics', label: 'Analytics', icon: '📈' },
		{ id: 'reports', label: 'Reports', icon: '📋', badge: 3, badgeVariant: 'primary' },
		{ id: 'settings', label: 'Settings', icon: '⚙️' }
	];
</script>

{#snippet headerSnippet()}
	<div
		class="flex min-w-0 flex-wrap items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-4 sm:py-3 lg:px-6"
	>
		<Heading level="h1" size="lg" text="Dashboard" class="min-w-0 shrink" />
		<Button label="Refresh" variant="primary" size="sm" class="shrink-0" />
	</div>
{/snippet}

{#snippet mainSnippet()}
	<Container maxWidth="6xl" padding="lg" centered className="min-w-0 py-6">
		{#snippet children()}
			<Heading level="h2" size="md" text="Overview" />
			<Paragraph
				variant="muted"
				text="Use this layout for dashboard pages with optional header, sidebar, and footer."
			/>
			<Grid columns={1} gap="md" responsiveColumns={{ sm: 2, lg: 3 }} class="mt-6 min-w-0">
				{#snippet children()}
					<Card>
						{#snippet children()}
							<Text text="Card 1" variant="primary" />
							<Paragraph variant="muted" size="sm" text="Sample widget content." />
						{/snippet}
					</Card>
					<Card>
						{#snippet children()}
							<Text text="Card 2" variant="primary" />
							<Paragraph variant="muted" size="sm" text="Sample widget content." />
						{/snippet}
					</Card>
					<Card>
						{#snippet children()}
							<Text text="Card 3" variant="primary" />
							<Paragraph variant="muted" size="sm" text="Sample widget content." />
						{/snippet}
					</Card>
				{/snippet}
			</Grid>
		{/snippet}
	</Container>
{/snippet}

{#snippet sidebarSnippet()}
	<nav class="flex flex-col gap-1 p-4 lg:p-6" aria-label="Dashboard filters">
		<Text text="Filters" variant="primary" />
		<a href="#date-range" class="link link-primary link-hover text-sm">Date range</a>
		<a href="#category" class="link link-primary link-hover text-sm">Category</a>
		<a href="#status" class="link link-primary link-hover text-sm">Status</a>
	</nav>
{/snippet}

{#snippet footerSnippet()}
	<div class="flex items-center justify-center gap-2 px-4 py-3 text-sm opacity-70">
		<Text text="© 2025 hexaWebShare" />
	</div>
{/snippet}

<Story name="Default" args={{ children: mainSnippet }} />

<Story
	name="With Header"
	args={{
		header: headerSnippet,
		children: mainSnippet
	}}
/>

<Story
	name="With Sidebar Left"
	args={{
		header: headerSnippet,
		sidebar: sidebarSnippet,
		sidebarPosition: 'left',
		children: mainSnippet
	}}
/>

<Story
	name="With Core Sidebar"
	args={{
		header: headerSnippet,
		sidebarItems: defaultSidebarItems,
		sidebarTitle: 'Dashboard',
		sidebarSubtitle: 'Navigation',
		sidebarWidth: 'default',
		sidebarSize: 'md',
		sidebarVariant: 'default',
		sidebarPosition: 'left',
		sidebarAriaLabel: 'Dashboard navigation',
		children: mainSnippet
	}}
/>

<Story
	name="With Footer"
	args={{
		header: headerSnippet,
		children: mainSnippet,
		footer: footerSnippet
	}}
/>

<Story
	name="Bordered Variant"
	args={{
		variant: 'bordered',
		header: headerSnippet,
		children: mainSnippet,
		footer: footerSnippet
	}}
/>

<Story
	name="Filled Variant"
	args={{
		variant: 'filled',
		header: headerSnippet,
		sidebar: sidebarSnippet,
		sidebarPosition: 'left',
		children: mainSnippet,
		footer: footerSnippet
	}}
/>

<Story
	name="Loading State"
	args={{
		loading: true,
		header: headerSnippet,
		children: mainSnippet,
		loadingLabel: 'Loading dashboard…'
	}}
/>

<Story
	name="Disabled State"
	args={{
		disabled: true,
		header: headerSnippet,
		children: mainSnippet
	}}
/>

<Story
	name="Error State"
	args={{
		error: true,
		errorMessage: 'Failed to load dashboard data. Please try again.',
		header: headerSnippet,
		children: mainSnippet
	}}
/>

<Story
	name="Playground"
	args={{
		variant: 'default',
		sidebarPosition: 'left',
		sidebarWidth: 'default',
		sidebarSize: 'md',
		sidebarVariant: 'default',
		loading: false,
		disabled: false,
		error: false,
		errorMessage: 'An error occurred. Please try again.',
		ariaLabel: 'Dashboard layout',
		loadingLabel: 'Loading content',
		mainAriaLabel: 'Main content',
		sidebarAriaLabel: 'Sidebar',
		sidebarTitle: 'Dashboard',
		sidebarSubtitle: 'Navigation',
		header: headerSnippet,
		sidebarItems: defaultSidebarItems,
		children: mainSnippet,
		footer: footerSnippet
	}}
/>
