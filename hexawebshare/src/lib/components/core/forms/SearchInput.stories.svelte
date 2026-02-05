<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SearchInput from './SearchInput.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/SearchInput',
		component: SearchInput,
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: 'text',
				description: 'Current search value'
			},
			placeholder: {
				control: 'text',
				description: 'Placeholder text'
			},
			variant: {
				control: { type: 'select' },
				options: [
					undefined,
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the input'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the input'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the input is disabled'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the input is in loading state'
			},
			showClearButton: {
				control: 'boolean',
				description: 'Whether to show the clear button'
			},
			searchOnType: {
				control: 'boolean',
				description: 'Whether to trigger search on every input change'
			},
			debounceMs: {
				control: { type: 'number', min: 0, max: 2000, step: 50 },
				description: 'Debounce delay in milliseconds'
			},
			label: {
				control: 'text',
				description: 'Label text for the input'
			},
			error: {
				control: 'text',
				description: 'Error message to display'
			},
			helpText: {
				control: 'text',
				description: 'Helper text or description'
			},
			maxlength: {
				control: { type: 'number', min: 1 },
				description: 'Maximum length of input value'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			}
		},
		args: {
			onsearch: fn(),
			onclear: fn(),
			oninput: fn(),
			onchange: fn(),
			onblur: fn(),
			onfocus: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ label: 'Search Products', placeholder: 'Search...' }} />

<Story
	name="With Value"
	args={{
		label: 'Search',
		value: 'svelte components',
		placeholder: 'Search...'
	}}
/>

<Story
	name="Primary Variant"
	args={{ variant: 'primary', label: 'Primary Search', placeholder: 'Search...' }}
/>

<Story name="Small Size" args={{ size: 'sm', label: 'Small Search', placeholder: 'Search...' }} />

<Story name="Large Size" args={{ size: 'lg', label: 'Large Search', placeholder: 'Search...' }} />

<Story
	name="Loading State"
	args={{
		label: 'Search',
		placeholder: 'Searching...',
		loading: true,
		value: 'searching'
	}}
/>

<Story
	name="Disabled State"
	args={{
		label: 'Search',
		placeholder: 'Search is disabled',
		disabled: true
	}}
/>

<Story
	name="With Error"
	args={{
		label: 'Search',
		placeholder: 'Search...',
		error: 'Search query is too short. Please enter at least 3 characters.'
	}}
/>

<Story
	name="Search On Type"
	args={{
		label: 'Live Search',
		placeholder: 'Start typing to search...',
		searchOnType: true,
		debounceMs: 300,
		helpText: 'Results update as you type (300ms debounce)'
	}}
/>

<Story
	name="Without Clear Button"
	args={{
		label: 'Search',
		placeholder: 'Search...',
		value: 'some text',
		showClearButton: false
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		placeholder: 'Try different props...',
		helpText: 'Customize this component using the controls below',
		variant: 'primary',
		size: 'md',
		disabled: false,
		loading: false,
		searchOnType: false,
		showClearButton: true,
		debounceMs: 300,
		onsearch: fn(),
		onclear: fn(),
		oninput: fn(),
		onchange: fn(),
		onblur: fn(),
		onfocus: fn()
	}}
/>
