<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/Select',
		component: Select,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			disabled: { control: 'boolean' },
			required: { control: 'boolean' },
			loading: { control: 'boolean' },
			label: { control: 'text' },
			placeholder: { control: 'text' },
			error: { control: 'text' },
			helpText: { control: 'text' },
			value: { control: 'text' }
		},
		args: {
			options: ['Option 1', 'Option 2', 'Option 3'],
			onchange: fn(),
			onblur: fn(),
			onfocus: fn()
		}
	});
</script>

<!-- Default Stories -->
<Story name="Default" args={{ options: ['Apple', 'Banana', 'Cherry', 'Date'] }} />

<Story
	name="With Label"
	args={{ label: 'Favorite Fruit', options: ['Apple', 'Banana', 'Cherry', 'Date'] }}
/>

<Story
	name="With Placeholder"
	args={{
		label: 'Select an option',
		placeholder: 'Choose...',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="With Value"
	args={{
		label: 'Selected Option',
		value: 'banana',
		options: [
			{ value: 'apple', label: 'Apple' },
			{ value: 'banana', label: 'Banana' },
			{ value: 'cherry', label: 'Cherry' }
		]
	}}
/>

<Story
	name="With Help Text"
	args={{
		label: 'Country',
		options: ['United States', 'Canada', 'Mexico', 'United Kingdom'],
		helpText: 'Select your country of residence'
	}}
/>

<Story
	name="With Error"
	args={{
		label: 'Country',
		options: ['United States', 'Canada', 'Mexico', 'United Kingdom'],
		error: 'Please select a valid country'
	}}
/>

<Story
	name="Required"
	args={{
		label: 'Required Field',
		required: true,
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Disabled"
	args={{
		label: 'Disabled Select',
		disabled: true,
		value: 'option2',
		options: [
			{ value: 'option1', label: 'Option 1' },
			{ value: 'option2', label: 'Option 2' },
			{ value: 'option3', label: 'Option 3' }
		]
	}}
/>

<Story
	name="Loading"
	args={{
		label: 'Loading Select',
		placeholder: 'Loading options...',
		loading: true,
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<!-- Options Format Stories -->
<Story
	name="String Options"
	args={{
		label: 'Simple Options',
		options: ['Red', 'Green', 'Blue', 'Yellow', 'Purple']
	}}
/>

<Story
	name="Object Options"
	args={{
		label: 'Complex Options',
		options: [
			{ value: 'us', label: 'United States' },
			{ value: 'ca', label: 'Canada' },
			{ value: 'mx', label: 'Mexico' },
			{ value: 'uk', label: 'United Kingdom' }
		]
	}}
/>

<Story
	name="With Disabled Options"
	args={{
		label: 'Select with Disabled Options',
		options: [
			{ value: 'opt1', label: 'Available Option 1' },
			{ value: 'opt2', label: 'Disabled Option', disabled: true },
			{ value: 'opt3', label: 'Available Option 2' },
			{ value: 'opt4', label: 'Another Disabled', disabled: true },
			{ value: 'opt5', label: 'Available Option 3' }
		]
	}}
/>

<!-- Variant Stories -->
<Story
	name="Primary Variant"
	args={{
		variant: 'primary',
		label: 'Primary Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Secondary Variant"
	args={{
		variant: 'secondary',
		label: 'Secondary Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Accent Variant"
	args={{
		variant: 'accent',
		label: 'Accent Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Info Variant"
	args={{
		variant: 'info',
		label: 'Info Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Success Variant"
	args={{
		variant: 'success',
		label: 'Success Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Warning Variant"
	args={{
		variant: 'warning',
		label: 'Warning Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Error Variant"
	args={{
		variant: 'error',
		label: 'Error Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<!-- Size Stories -->
<Story
	name="Extra Small"
	args={{
		size: 'xs',
		label: 'XS Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Small"
	args={{
		size: 'sm',
		label: 'Small Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Medium"
	args={{
		size: 'md',
		label: 'Medium Select (Default)',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Large"
	args={{
		size: 'lg',
		label: 'Large Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<!-- State Combinations -->
<Story
	name="Disabled with Error"
	args={{
		label: 'Disabled Error',
		disabled: true,
		value: 'option1',
		error: 'This field is disabled',
		options: [
			{ value: 'option1', label: 'Option 1' },
			{ value: 'option2', label: 'Option 2' }
		]
	}}
/>

<Story
	name="Loading with Variant"
	args={{
		label: 'Loading Primary',
		variant: 'primary',
		placeholder: 'Loading...',
		loading: true,
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Required with Help Text"
	args={{
		label: 'Required Field',
		required: true,
		placeholder: 'Select an option',
		helpText: 'This field is required',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Error with Variant"
	args={{
		label: 'Error State',
		variant: 'error',
		error: 'Please select a valid option',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<!-- Accessibility Stories -->
<Story
	name="ARIA Label Only"
	args={{
		ariaLabel: 'Select without visible label',
		placeholder: 'Choose an option',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="ARIA Describedby"
	args={{
		label: 'Select with Description',
		placeholder: 'Select option',
		ariaDescribedby: 'select-help',
		helpText: 'This is helpful information'
	}}
/>

<!-- Real-world Examples -->
<Story name="Country Selector">
	<div class="w-full max-w-xs space-y-4">
		<Select
			label="Country"
			placeholder="Select your country"
			required={true}
			options={[
				{ value: 'us', label: 'United States' },
				{ value: 'ca', label: 'Canada' },
				{ value: 'mx', label: 'Mexico' },
				{ value: 'uk', label: 'United Kingdom' },
				{ value: 'de', label: 'Germany' },
				{ value: 'fr', label: 'France' }
			]}
		/>
	</div>
</Story>

<Story name="Product Category Selector">
	<div class="w-full max-w-xs space-y-4">
		<Select
			label="Product Category"
			placeholder="Choose a category"
			options={[
				'Electronics',
				'Clothing',
				'Food & Beverages',
				'Home & Garden',
				'Sports & Outdoors',
				'Books'
			]}
			helpText="Select the category that best describes your product"
		/>
	</div>
</Story>

<Story name="Form Example">
	<div class="w-full max-w-xs space-y-4">
		<Select label="Title" required={true} options={['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.']} />
		<Select
			label="Country"
			required={true}
			placeholder="Select country"
			options={[
				{ value: 'us', label: 'United States' },
				{ value: 'ca', label: 'Canada' },
				{ value: 'mx', label: 'Mexico' }
			]}
		/>
		<Select
			label="Language"
			options={['English', 'Spanish', 'French', 'German']}
			helpText="Select your preferred language"
		/>
	</div>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="w-full max-w-2xl space-y-4">
		<div>
			<h3 class="mb-2 text-lg font-bold">Color Variants</h3>
			<div class="space-y-2">
				<Select variant="primary" label="Primary" options={['Option 1', 'Option 2']} />
				<Select variant="secondary" label="Secondary" options={['Option 1', 'Option 2']} />
				<Select variant="accent" label="Accent" options={['Option 1', 'Option 2']} />
				<Select variant="info" label="Info" options={['Option 1', 'Option 2']} />
				<Select variant="success" label="Success" options={['Option 1', 'Option 2']} />
				<Select variant="warning" label="Warning" options={['Option 1', 'Option 2']} />
				<Select variant="error" label="Error" options={['Option 1', 'Option 2']} />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">Sizes</h3>
			<div class="space-y-2">
				<Select size="xs" label="Extra Small" options={['Option 1', 'Option 2']} />
				<Select size="sm" label="Small" options={['Option 1', 'Option 2']} />
				<Select size="md" label="Medium (Default)" options={['Option 1', 'Option 2']} />
				<Select size="lg" label="Large" options={['Option 1', 'Option 2']} />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">States</h3>
			<div class="space-y-2">
				<Select label="Default" options={['Option 1', 'Option 2']} />
				<Select
					label="Disabled"
					disabled={true}
					value="option1"
					options={[
						{ value: 'option1', label: 'Option 1' },
						{ value: 'option2', label: 'Option 2' }
					]}
				/>
				<Select
					label="Loading"
					placeholder="Loading..."
					loading={true}
					options={['Option 1', 'Option 2']}
				/>
				<Select label="Error" error="This field has an error" options={['Option 1', 'Option 2']} />
				<Select label="Required" required={true} options={['Option 1', 'Option 2']} />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">Option Formats</h3>
			<div class="space-y-2">
				<Select label="String Options" options={['Red', 'Green', 'Blue']} />
				<Select
					label="Object Options"
					options={[
						{ value: 'us', label: 'United States' },
						{ value: 'ca', label: 'Canada' },
						{ value: 'mx', label: 'Mexico' }
					]}
				/>
				<Select
					label="With Disabled Options"
					options={[
						{ value: 'opt1', label: 'Available' },
						{ value: 'opt2', label: 'Disabled', disabled: true },
						{ value: 'opt3', label: 'Available' }
					]}
				/>
			</div>
		</div>
	</div>
</Story>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{ label: 'Playground', options: ['Option 1', 'Option 2', 'Option 3'] }}
/>
