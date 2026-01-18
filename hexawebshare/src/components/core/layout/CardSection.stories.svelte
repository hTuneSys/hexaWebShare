<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CardSection from './CardSection.svelte';
	import Button from '../buttons/Button.svelte';
	import Text from '../typography/Text.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/CardSection',
		component: CardSection,
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
				options: ['default', 'bordered', 'filled', 'ghost'],
				description: 'Visual variant of the section'
			},
			padding: {
				control: { type: 'select' },
				options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Padding size for the section'
			},
			collapsible: {
				control: 'boolean',
				description: 'Whether the section is collapsible'
			},
			collapsed: {
				control: 'boolean',
				description: 'Whether the section is initially collapsed'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the section is disabled'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the section is in loading state'
			},
			divider: {
				control: 'boolean',
				description: 'Whether to show a divider at the bottom'
			}
		},
		args: {
			title: 'Section Title',
			variant: 'default',
			padding: 'md'
		}
	});
</script>

<!-- Default Story -->
<Story name="Default">
	{#snippet children()}
		<div class="bg-base-300 min-h-[200px] p-6">
			<div class="card bg-base-100 mx-auto max-w-2xl shadow-xl">
				<div class="card-body p-0">
					<CardSection title="Section Title" padding="md" variant="default">
						<Text
							text="This is the default card section with some content inside. It can contain any type of content including text, forms, or other components."
							variant="muted"
						/>
					</CardSection>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- With Description -->
<Story name="With Description">
	{#snippet children()}
		<div class="bg-base-300 min-h-[200px] p-6">
			<div class="card bg-base-100 mx-auto max-w-2xl shadow-xl">
				<div class="card-body p-0">
					<CardSection
						title="Account Settings"
						description="Manage your account preferences and security settings"
					>
						<Text text="Your account details and preferences are shown here." variant="muted" />
					</CardSection>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Variant Stories -->
<Story name="Variants">
	{#snippet children()}
		<div class="bg-base-300 min-h-[200px] p-6">
			<div class="card bg-base-100 mx-auto max-w-2xl shadow-xl">
				<div class="card-body p-0">
					<CardSection title="Visual Variants" variant="bordered">
						<Text text="This showcases the bordered variant style." variant="muted" />
					</CardSection>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Padding Variants -->
<Story name="Padding Sizes">
	{#snippet children()}
		<div class="bg-base-300 min-h-[200px] p-6">
			<div class="card bg-base-100 mx-auto max-w-2xl shadow-xl">
				<div class="card-body p-0">
					<CardSection title="Padding Comparison" padding="lg" variant="bordered">
						<Text text="This section demonstrates the large padding option." variant="muted" />
					</CardSection>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Collapsible Stories -->
<Story name="Collapsible">
	{#snippet children()}
		<div class="bg-base-300 min-h-[200px] p-6">
			<div class="card bg-base-100 mx-auto max-w-2xl shadow-xl">
				<div class="card-body p-0">
					<CardSection
						title="Collapsible Section"
						description="Click to expand or collapse"
						collapsible={true}
					>
						<Text
							text="This content can be hidden by clicking on the header. Great for organizing complex forms or long content."
							variant="muted"
						/>
					</CardSection>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Collapsible Initially Collapsed -->
<Story name="Initially Collapsed">
	{#snippet children()}
		<div class="bg-base-300 min-h-[200px] p-6">
			<div class="card bg-base-100 mx-auto max-w-2xl shadow-xl">
				<div class="card-body p-0">
					<CardSection
						title="Initially Collapsed"
						description="This section starts collapsed"
						collapsible={true}
						collapsed={true}
					>
						<Text text="This content was hidden initially but is now visible." variant="muted" />
					</CardSection>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- State Stories -->
<Story name="States">
	{#snippet children()}
		<div class="bg-base-300 min-h-[200px] p-6">
			<div class="card bg-base-100 mx-auto max-w-2xl shadow-xl">
				<div class="card-body p-0">
					<CardSection title="Section States" disabled={false} loading={false} divider={true}>
						<Text text="This section showcases the divider state." variant="muted" />
					</CardSection>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- With Icon -->
<Story name="With Icon">
	{#snippet children()}
		<div class="bg-base-300 min-h-[200px] p-6">
			<div class="card bg-base-100 mx-auto max-w-2xl shadow-xl">
				<div class="card-body p-0">
					<CardSection title="Section with Icon" description="This section displays an icon">
						{#snippet icon()}
							<svg
								class="text-primary h-6 w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						{/snippet}
						<Text
							text="The icon is displayed before the title for visual emphasis."
							variant="muted"
						/>
					</CardSection>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- With Header Actions -->
<Story name="With Header Actions">
	{#snippet children()}
		<div class="bg-base-300 min-h-[200px] p-6">
			<div class="card bg-base-100 mx-auto max-w-2xl shadow-xl">
				<div class="card-body p-0">
					<CardSection title="Section with Actions" description="This section has action buttons">
						{#snippet headerActions()}
							<Button variant="primary" size="sm" label="Action" />
						{/snippet}
						<Text text="Header actions appear on the right side of the header." variant="muted" />
					</CardSection>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		title: 'Interactive Section',
		description: 'Try changing the controls to see different states',
		variant: 'bordered',
		padding: 'md',
		collapsible: false,
		collapsed: false,
		disabled: false,
		loading: false,
		divider: false
	}}
/>
