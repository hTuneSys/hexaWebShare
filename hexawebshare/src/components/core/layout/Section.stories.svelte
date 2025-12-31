<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Section from './Section.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/Section',
		component: Section,
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: 'text',
				description: 'Section title/heading'
			},
			description: {
				control: 'text',
				description: 'Section description text'
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'filled', 'ghost']
			},
			padding: {
				control: { type: 'select' },
				options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
			},
			collapsible: { control: 'boolean' },
			collapsed: { control: 'boolean' },
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' },
			divider: { control: 'boolean' }
		}
	});
</script>

<!-- Default Stories -->
<Story name="Default" args={{ title: 'Section Title' }} />

<Story
	name="With Description"
	args={{
		title: 'Account Settings',
		description: 'Manage your account preferences and security settings'
	}}
/>

<!-- Variant Stories -->
<Story name="Bordered" args={{ title: 'Bordered Section', variant: 'bordered' }} />

<Story name="Filled" args={{ title: 'Filled Section', variant: 'filled' }} />

<!-- Padding Variants -->
<Story name="Padding Sizes" args={{ title: 'LG Padding', padding: 'lg', variant: 'bordered' }} />

<!-- Collapsible Stories -->
<Story
	name="Collapsible"
	args={{
		title: 'Collapsible Section',
		description: 'Click to expand or collapse',
		collapsible: true
	}}
/>

<Story
	name="Initially Collapsed"
	args={{
		title: 'Initially Collapsed',
		description: 'This section starts collapsed',
		collapsible: true,
		collapsed: true
	}}
/>

<!-- State Stories -->
<Story name="States" args={{ title: 'Disabled Section', disabled: true }} />

<!-- With Icon -->
<Story name="With Icon">
	<Section title="Section with Icon" description="This section displays an icon">
		{#snippet icon()}
			<svg
				class="text-primary h-6 w-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		{/snippet}
		{#snippet children()}
			<p class="text-base-content/80">
				The icon is displayed before the title for visual emphasis.
			</p>
		{/snippet}
	</Section>
</Story>

<!-- With Header Actions -->
<Story name="With Header Actions">
	<Section title="Section with Actions" description="This section has action buttons">
		{#snippet headerActions()}
			<button class="btn btn-sm btn-ghost">Edit</button>
			<button class="btn btn-sm btn-primary">Save</button>
		{/snippet}
		{#snippet children()}
			<p class="text-base-content/80">Header actions appear on the right side of the header.</p>
		{/snippet}
	</Section>
</Story>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		title: 'Interactive Section',
		description: 'Try changing the controls',
		variant: 'default',
		padding: 'md',
		collapsible: false,
		collapsed: false,
		disabled: false,
		loading: false,
		divider: false
	}}
/>
