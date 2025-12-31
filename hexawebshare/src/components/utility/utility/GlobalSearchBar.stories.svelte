<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import GlobalSearchBar from './GlobalSearchBar.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Utility/Utility/GlobalSearchBar',
		component: GlobalSearchBar,
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
			showResults: {
				control: 'boolean',
				description: 'Whether to show search results dropdown'
			},
			open: {
				control: 'boolean',
				description: 'Whether the results dropdown is open (controlled)'
			},
			defaultOpen: {
				control: 'boolean',
				description: 'Default open state for uncontrolled mode'
			},
			enableKeyboardShortcut: {
				control: 'boolean',
				description: 'Whether to enable keyboard shortcut (Cmd/Ctrl+K)'
			},
			shortcutKey: {
				control: 'text',
				description: 'Custom keyboard shortcut key'
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
			onfocus: fn(),
			onOpenChange: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ placeholder: 'Search globally...' }} />

<Story
	name="Loading State"
	args={{
		placeholder: 'Searching...',
		loading: true,
		value: 'searching'
	}}
/>

<Story
	name="Disabled State"
	args={{
		placeholder: 'Search is disabled',
		disabled: true
	}}
/>

<Story
	name="With Error"
	args={{
		placeholder: 'Search globally...',
		error: 'Search query is too short. Please enter at least 3 characters.'
	}}
/>

<Story
	name="With Results Dropdown"
	args={{
		placeholder: 'Search globally...',
		showResults: true,
		value: 'test',
		open: true
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		placeholder: 'Try different props...',
		helpText: 'Customize this component using the controls below',
		variant: 'primary',
		size: 'md',
		disabled: false,
		loading: false,
		searchOnType: false,
		showClearButton: true,
		showResults: false,
		enableKeyboardShortcut: true,
		debounceMs: 300,
		onsearch: fn(),
		onclear: fn(),
		oninput: fn(),
		onchange: fn(),
		onblur: fn(),
		onfocus: fn(),
		onOpenChange: fn()
	}}
/>
