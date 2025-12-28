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

<Story name="Ghost" args={{ title: 'Ghost Section', variant: 'ghost' }} />

<!-- Padding Variants -->
<Story name="No Padding" args={{ title: 'No Padding', padding: 'none', variant: 'bordered' }} />

<Story
	name="Extra Small Padding"
	args={{ title: 'XS Padding', padding: 'xs', variant: 'bordered' }}
/>

<Story name="Small Padding" args={{ title: 'SM Padding', padding: 'sm', variant: 'bordered' }} />

<Story name="Medium Padding" args={{ title: 'MD Padding', padding: 'md', variant: 'bordered' }} />

<Story name="Large Padding" args={{ title: 'LG Padding', padding: 'lg', variant: 'bordered' }} />

<Story
	name="Extra Large Padding"
	args={{ title: 'XL Padding', padding: 'xl', variant: 'bordered' }}
/>

<Story name="TwoXL Padding" args={{ title: '2XL Padding', padding: '2xl', variant: 'bordered' }} />

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
	name="Collapsible Initially Collapsed"
	args={{
		title: 'Initially Collapsed',
		description: 'This section starts collapsed',
		collapsible: true,
		collapsed: true
	}}
/>

<!-- State Stories -->
<Story name="Disabled" args={{ title: 'Disabled Section', disabled: true }} />

<Story name="Loading" args={{ title: 'Loading Section', loading: true }} />

<Story name="With Divider" args={{ title: 'Section with Divider', divider: true }} />

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

<!-- With Icon and Actions -->
<Story name="With Icon and Actions">
	<Section
		title="Complete Section"
		description="A section with all header elements"
		variant="bordered"
	>
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
		{#snippet headerActions()}
			<button class="btn btn-sm btn-ghost">Edit</button>
			<button class="btn btn-sm btn-primary">Save</button>
		{/snippet}
		{#snippet children()}
			<p class="text-base-content/80">This section showcases all header elements together.</p>
		{/snippet}
	</Section>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="space-y-6">
		<div>
			<h3 class="mb-3 text-lg font-bold">Visual Variants</h3>
			<div class="space-y-4">
				<Section title="Default Variant" variant="default">
					{#snippet children()}
						<p class="text-base-content/80">This is the default section variant.</p>
					{/snippet}
				</Section>
				<Section title="Bordered Variant" variant="bordered">
					{#snippet children()}
						<p class="text-base-content/80">This section has a visible border.</p>
					{/snippet}
				</Section>
				<Section title="Filled Variant" variant="filled">
					{#snippet children()}
						<p class="text-base-content/80">This section has a filled background.</p>
					{/snippet}
				</Section>
				<Section title="Ghost Variant" variant="ghost">
					{#snippet children()}
						<p class="text-base-content/80">This section has a transparent background.</p>
					{/snippet}
				</Section>
			</div>
		</div>
		<div>
			<h3 class="mb-3 text-lg font-bold">Padding Sizes</h3>
			<div class="space-y-4">
				<Section title="No Padding" padding="none" variant="bordered">
					{#snippet children()}
						<p class="text-base-content/80">No padding applied.</p>
					{/snippet}
				</Section>
				<Section title="Extra Small Padding" padding="xs" variant="bordered">
					{#snippet children()}
						<p class="text-base-content/80">Extra small padding (px-2 py-1).</p>
					{/snippet}
				</Section>
				<Section title="Small Padding" padding="sm" variant="bordered">
					{#snippet children()}
						<p class="text-base-content/80">Small padding (px-4 py-2).</p>
					{/snippet}
				</Section>
				<Section title="Medium Padding" padding="md" variant="bordered">
					{#snippet children()}
						<p class="text-base-content/80">Medium padding (px-6 py-4) - default.</p>
					{/snippet}
				</Section>
				<Section title="Large Padding" padding="lg" variant="bordered">
					{#snippet children()}
						<p class="text-base-content/80">Large padding (px-8 py-6).</p>
					{/snippet}
				</Section>
				<Section title="Extra Large Padding" padding="xl" variant="bordered">
					{#snippet children()}
						<p class="text-base-content/80">Extra large padding (px-10 py-8).</p>
					{/snippet}
				</Section>
				<Section title="TwoXL Padding" padding="2xl" variant="bordered">
					{#snippet children()}
						<p class="text-base-content/80">2XL padding (px-12 py-10).</p>
					{/snippet}
				</Section>
			</div>
		</div>
		<div>
			<h3 class="mb-3 text-lg font-bold">States</h3>
			<div class="space-y-4">
				<Section title="Normal Section">
					{#snippet children()}
						<p class="text-base-content/80">This is a normal section.</p>
					{/snippet}
				</Section>
				<Section title="Disabled Section" disabled={true}>
					{#snippet children()}
						<p class="text-base-content/80">This section is disabled.</p>
					{/snippet}
				</Section>
				<Section title="Loading Section" loading={true}>
					{#snippet children()}
						<p class="text-base-content/80">This content is loading...</p>
					{/snippet}
				</Section>
				<Section title="Section with Divider" divider={true}>
					{#snippet children()}
						<p class="text-base-content/80">This section has a divider at the bottom.</p>
					{/snippet}
				</Section>
			</div>
		</div>
	</div>
</Story>
