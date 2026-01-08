<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import KeyValueList from './KeyValueList.svelte';
	import type { KeyValuePair } from './KeyValueList.svelte';

	const { Story } = defineMeta({
		title: 'Admin/CRUD Data/KeyValueList',
		component: KeyValueList,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['vertical', 'horizontal', 'table', 'compact'],
				description: 'Layout variant of the key-value list'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size preset for the list items'
			},
			bordered: {
				control: 'boolean',
				description: 'Show borders around items'
			},
			dividers: {
				control: 'boolean',
				description: 'Show dividers between items'
			},
			keyWidth: {
				control: { type: 'select' },
				options: ['auto', 'narrow', 'wide'],
				description: 'Key column width for horizontal/table layouts'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the list is disabled'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the list is in loading state'
			},
			showEmptyState: {
				control: 'boolean',
				description: 'Show empty state when no items'
			},
			emptyMessage: {
				control: 'text',
				description: 'Custom empty state message'
			},
			keyPrefix: {
				control: 'text',
				description: 'Prefix text for keys'
			},
			keySuffix: {
				control: 'text',
				description: 'Suffix text for keys (default: ":")'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			}
		},
		args: {
			variant: 'vertical',
			size: 'md',
			dividers: true,
			showEmptyState: true
		}
	});

	// Sample data for stories
	const sampleItems: KeyValuePair[] = [
		{ id: 1, key: 'Name', value: 'John Doe', description: 'Full name of the user' },
		{ id: 2, key: 'Email', value: 'john.doe@example.com' },
		{ id: 3, key: 'Role', value: 'Administrator' },
		{ id: 4, key: 'Status', value: 'Active' },
		{ id: 5, key: 'Created', value: '2025-01-15', description: 'Account creation date' },
		{ id: 6, key: 'Last Login', value: '2025-01-20 14:30' }
	];

	const mixedTypeItems: KeyValuePair[] = [
		{ id: 1, key: 'String Value', value: 'Sample text' },
		{ id: 2, key: 'Number Value', value: 42 },
		{ id: 3, key: 'Boolean True', value: true },
		{ id: 4, key: 'Boolean False', value: false },
		{ id: 5, key: 'Null Value', value: null },
		{ id: 6, key: 'Undefined Value', value: undefined }
	];

	const longContentItems: KeyValuePair[] = [
		{
			id: 1,
			key: 'Short Key',
			value: 'Short value text'
		},
		{
			id: 2,
			key: 'Very Long Key Name That Might Wrap',
			value: 'This is a very long value that might wrap to multiple lines depending on the container width and layout variant being used'
		},
		{
			id: 3,
			key: 'Description Example',
			value: 'Value with description',
			description: 'This is additional help text that provides more context about the value'
		}
	];
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		items: sampleItems,
		variant: 'vertical',
		size: 'md'
	}}
/>

<!-- Vertical Variant -->
<Story
	name="Vertical Variant"
	args={{
		items: sampleItems,
		variant: 'vertical',
		size: 'md',
		dividers: true
	}}
/>

<!-- Horizontal Variant -->
<Story
	name="Horizontal Variant"
	args={{
		items: sampleItems,
		variant: 'horizontal',
		size: 'md',
		keyWidth: 'narrow'
	}}
/>

<!-- Table Variant -->
<Story
	name="Table Variant"
	args={{
		items: sampleItems,
		variant: 'table',
		size: 'md'
	}}
/>

<!-- Compact Variant -->
<Story
	name="Compact Variant"
	args={{
		items: sampleItems,
		variant: 'compact',
		size: 'sm'
	}}
/>

<!-- Size Variants -->
<Story
	name="Small Size"
	args={{
		items: sampleItems,
		variant: 'vertical',
		size: 'sm'
	}}
/>

<Story
	name="Large Size"
	args={{
		items: sampleItems,
		variant: 'vertical',
		size: 'lg'
	}}
/>

<!-- With Borders -->
<Story
	name="With Borders"
	args={{
		items: sampleItems,
		variant: 'vertical',
		bordered: true,
		dividers: false
	}}
/>

<!-- Mixed Data Types -->
<Story
	name="Mixed Data Types"
	args={{
		items: mixedTypeItems,
		variant: 'vertical',
		size: 'md'
	}}
/>

<!-- Long Content -->
<Story
	name="Long Content"
	args={{
		items: longContentItems,
		variant: 'horizontal',
		keyWidth: 'wide'
	}}
/>

<!-- States -->
<Story
	name="Disabled State"
	args={{
		items: sampleItems,
		variant: 'vertical',
		disabled: true
	}}
/>

<Story
	name="Loading State"
	args={{
		items: [],
		variant: 'vertical',
		loading: true
	}}
/>

<!-- Empty State -->
<Story
	name="Empty State"
	args={{
		items: [],
		variant: 'vertical',
		showEmptyState: true,
		emptyMessage: 'No data available'
	}}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		items: sampleItems,
		variant: 'vertical',
		size: 'md',
		bordered: false,
		dividers: true,
		keyWidth: 'auto',
		disabled: false,
		loading: false,
		showEmptyState: true,
		emptyMessage: 'No data available',
		keyPrefix: '',
		keySuffix: ':',
		ariaLabel: 'User details'
	}}
/>

