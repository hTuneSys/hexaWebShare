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

<!-- Default Story - Basic usage -->
<Story name="Default" args={{ placeholder: 'Search...' }} />

<!-- With Label -->
<Story
	name="With Label"
	args={{ label: 'Search Products', placeholder: 'Enter product name...' }}
/>

<!-- With Value -->
<Story
	name="With Value"
	args={{
		label: 'Search',
		value: 'svelte components',
		placeholder: 'Search...'
	}}
/>

<!-- Loading State -->
<Story
	name="Loading"
	args={{
		label: 'Search',
		placeholder: 'Searching...',
		loading: true,
		value: 'searching'
	}}
/>

<!-- Disabled State -->
<Story
	name="Disabled"
	args={{
		label: 'Search',
		placeholder: 'Search is disabled',
		disabled: true
	}}
/>

<!-- With Error -->
<Story
	name="With Error"
	args={{
		label: 'Search',
		placeholder: 'Search...',
		error: 'Search query is too short. Please enter at least 3 characters.'
	}}
/>

<!-- With Help Text -->
<Story
	name="With Help Text"
	args={{
		label: 'Search',
		placeholder: 'Search...',
		helpText: 'Press Enter to search or Escape to clear'
	}}
/>

<!-- Search On Type (with debounce) -->
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

<!-- Without Clear Button -->
<Story
	name="Without Clear Button"
	args={{
		label: 'Search',
		placeholder: 'Search...',
		value: 'some text',
		showClearButton: false
	}}
/>

<!-- Sizes Showcase -->
<Story name="Sizes">
	<div class="flex w-full max-w-md flex-col gap-4">
		<SearchInput size="xs" label="Extra Small" placeholder="XS size search..." />
		<SearchInput size="sm" label="Small" placeholder="SM size search..." />
		<SearchInput size="md" label="Medium (Default)" placeholder="MD size search..." />
		<SearchInput size="lg" label="Large" placeholder="LG size search..." />
	</div>
</Story>

<!-- Variants Showcase -->
<Story name="Variants">
	<div class="flex w-full max-w-md flex-col gap-4">
		<SearchInput label="Default" placeholder="Default variant..." />
		<SearchInput variant="primary" label="Primary" placeholder="Primary variant..." />
		<SearchInput variant="secondary" label="Secondary" placeholder="Secondary variant..." />
		<SearchInput variant="accent" label="Accent" placeholder="Accent variant..." />
		<SearchInput variant="info" label="Info" placeholder="Info variant..." />
		<SearchInput variant="success" label="Success" placeholder="Success variant..." />
		<SearchInput variant="warning" label="Warning" placeholder="Warning variant..." />
		<SearchInput variant="error" label="Error" placeholder="Error variant..." />
	</div>
</Story>

<!-- States Showcase -->
<Story name="States">
	<div class="flex w-full max-w-md flex-col gap-4">
		<SearchInput label="Default" placeholder="Default state..." />
		<SearchInput label="With Value" value="example search" placeholder="Has value..." />
		<SearchInput label="Loading" placeholder="Loading..." loading={true} value="searching" />
		<SearchInput label="Disabled" placeholder="Disabled..." disabled={true} />
		<SearchInput label="Error" placeholder="Error state..." error="Something went wrong" />
		<SearchInput
			label="With Help Text"
			placeholder="With help..."
			helpText="This is helpful information"
		/>
	</div>
</Story>

<!-- Real-world Examples -->
<Story name="Product Search Example">
	<div class="w-full max-w-lg">
		<SearchInput
			label="Search Products"
			placeholder="Search by name, SKU, or category..."
			helpText="Try searching for 'laptop', 'phone', or 'accessories'"
			searchOnType={true}
			debounceMs={500}
		/>
	</div>
</Story>

<Story name="User Search Example">
	<div class="w-full max-w-md">
		<SearchInput
			variant="primary"
			label="Find Users"
			placeholder="Enter username or email..."
			helpText="Search across all registered users"
		/>
	</div>
</Story>

<Story name="Document Search Example">
	<div class="w-full max-w-xl">
		<SearchInput
			size="lg"
			placeholder="Search documents, files, and folders..."
			ariaLabel="Search documents"
		/>
	</div>
</Story>

<Story name="Compact Header Search">
	<div class="bg-base-200 rounded-lg p-4">
		<div class="flex items-center gap-4">
			<span class="text-lg font-bold">Logo</span>
			<div class="max-w-xs flex-1">
				<SearchInput size="sm" placeholder="Quick search..." showClearButton={true} />
			</div>
			<button class="btn btn-ghost btn-sm">Menu</button>
		</div>
	</div>
</Story>

<Story name="Search with Filters">
	<div class="w-full max-w-lg space-y-4">
		<SearchInput
			label="Search with Filters"
			placeholder="Search..."
			helpText="Use filters below to narrow your search"
		/>
		<div class="flex flex-wrap gap-2">
			<span class="badge badge-outline">Category: All</span>
			<span class="badge badge-outline">Date: Any time</span>
			<span class="badge badge-outline">Status: Active</span>
		</div>
	</div>
</Story>

<!-- Accessibility Demo -->
<Story name="Accessibility">
	<div class="flex w-full max-w-md flex-col gap-4">
		<SearchInput
			ariaLabel="Search products without visible label"
			placeholder="Search (ARIA label only)..."
			helpText="This input has only an ARIA label, no visible label"
		/>
		<SearchInput
			label="Accessible Search"
			placeholder="Type and press Enter..."
			helpText="Press Enter to search, Escape to clear"
		/>
	</div>
</Story>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		placeholder: 'Try different props in the controls panel...',
		helpText: 'Customize this component using the controls below'
	}}
/>
