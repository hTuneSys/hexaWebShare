<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CardSectionWrapper from './CardSectionWrapper.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/CardSection',
		component: CardSectionWrapper,
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
			},
			showIcon: {
				control: 'boolean',
				description: 'Show an icon before the title'
			},
			showHeaderActions: {
				control: 'boolean',
				description: 'Show header action buttons'
			},
			content: {
				control: 'text',
				description: 'Content text for the section'
			}
		},
		args: {
			title: 'Section Title',
			variant: 'default',
			padding: 'md',
			content: 'This is the card section content. It can contain any type of content.'
		}
	});
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		title: 'Section Title',
		padding: 'md',
		variant: 'default',
		content:
			'This is the default card section with some content inside. It can contain any type of content including text, forms, or other components.'
	}}
/>

<!-- With Title and Description -->
<Story
	name="With Description"
	args={{
		title: 'Account Settings',
		description: 'Manage your account preferences and security settings',
		content: 'Your account details and preferences are shown here.'
	}}
/>

<!-- Variant Stories -->
<Story
	name="Bordered"
	args={{
		title: 'Bordered Section',
		variant: 'bordered',
		content: 'This section has a visible border around it.'
	}}
/>

<Story
	name="Filled"
	args={{
		title: 'Filled Section',
		variant: 'filled',
		content: 'This section has a filled background.'
	}}
/>

<Story
	name="Ghost"
	args={{
		title: 'Ghost Section',
		variant: 'ghost',
		content: 'This section has a transparent background.'
	}}
/>

<!-- Padding Variants -->
<Story
	name="No Padding"
	args={{
		title: 'No Padding',
		padding: 'none',
		variant: 'bordered',
		content: 'This section has no padding.'
	}}
/>

<Story
	name="Extra Small Padding"
	args={{
		title: 'XS Padding',
		padding: 'xs',
		variant: 'bordered',
		content: 'This section has extra small padding.'
	}}
/>

<Story
	name="Small Padding"
	args={{
		title: 'SM Padding',
		padding: 'sm',
		variant: 'bordered',
		content: 'This section has small padding.'
	}}
/>

<Story
	name="Medium Padding"
	args={{
		title: 'MD Padding',
		padding: 'md',
		variant: 'bordered',
		content: 'This section has medium padding (default).'
	}}
/>

<Story
	name="Large Padding"
	args={{
		title: 'LG Padding',
		padding: 'lg',
		variant: 'bordered',
		content: 'This section has large padding.'
	}}
/>

<Story
	name="Extra Large Padding"
	args={{
		title: 'XL Padding',
		padding: 'xl',
		variant: 'bordered',
		content: 'This section has extra large padding.'
	}}
/>

<!-- Collapsible Stories -->
<Story
	name="Collapsible"
	args={{
		title: 'Collapsible Section',
		description: 'Click to expand or collapse',
		collapsible: true,
		content:
			'This content can be hidden by clicking on the header. Great for organizing complex forms or long content.'
	}}
/>

<Story
	name="Collapsible Initially Collapsed"
	args={{
		title: 'Initially Collapsed',
		description: 'This section starts collapsed',
		collapsible: true,
		collapsed: true,
		content: 'This content was hidden initially but is now visible.'
	}}
/>

<!-- State Stories -->
<Story
	name="Disabled"
	args={{
		title: 'Disabled Section',
		disabled: true,
		content: 'This section is disabled and cannot be interacted with.'
	}}
/>

<Story
	name="Loading"
	args={{
		title: 'Loading Section',
		loading: true,
		content: 'This content is loading...'
	}}
/>

<Story
	name="With Divider"
	args={{
		title: 'Section with Divider',
		divider: true,
		content: 'This section has a divider at the bottom.'
	}}
/>

<!-- With Icon -->
<Story
	name="With Icon"
	args={{
		title: 'Section with Icon',
		description: 'This section displays an icon',
		showIcon: true,
		content: 'The icon is displayed before the title for visual emphasis.'
	}}
/>

<!-- With Header Actions -->
<Story
	name="With Header Actions"
	args={{
		title: 'Section with Actions',
		description: 'This section has action buttons',
		showHeaderActions: true,
		content: 'Header actions appear on the right side of the header.'
	}}
/>

<!-- With Icon and Description -->
<Story
	name="With Icon and Description"
	args={{
		title: 'Complete Section',
		description: 'A section with all header elements',
		showIcon: true,
		variant: 'bordered',
		content: 'This section showcases all header elements together.'
	}}
/>

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
		divider: false,
		showIcon: false,
		showHeaderActions: false,
		content:
			'Use the Storybook controls to experiment with different props and see how the component responds.'
	}}
/>
