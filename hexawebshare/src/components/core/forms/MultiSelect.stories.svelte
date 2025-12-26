<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MultiSelect from './MultiSelect.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/MultiSelect',
		component: MultiSelect,
		tags: ['autodocs'],
		argTypes: {
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
				]
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			width: {
				control: { type: 'select' },
				options: ['full', 'auto', 'xs', 'sm', 'md', 'lg', 'xl']
			},
			align: {
				control: { type: 'select' },
				options: [undefined, 'left', 'center', 'right']
			},
			disabled: { control: 'boolean' },
			required: { control: 'boolean' },
			loading: { control: 'boolean' },
			searchable: { control: 'boolean' },
			clearable: { control: 'boolean' },
			label: { control: 'text' },
			placeholder: { control: 'text' },
			error: { control: 'text' },
			helpText: { control: 'text' },
			maxSelected: { control: 'number' }
		},
		args: {
			options: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
			onchange: fn(),
			onblur: fn(),
			onfocus: fn()
		}
	});
</script>

<!-- Main Stories (shown in sidebar) -->
<Story name="Default" args={{ label: 'Select Fruits' }} />

<Story
	name="With Selected Values"
	args={{
		label: 'Selected Fruits',
		defaultValue: ['Apple', 'Cherry']
	}}
/>

<Story
	name="Searchable"
	args={{
		label: 'Searchable MultiSelect',
		searchable: true,
		placeholder: 'Type to search...',
		options: [
			'Apple',
			'Banana',
			'Cherry',
			'Date',
			'Elderberry',
			'Fig',
			'Grape',
			'Honeydew',
			'Kiwi',
			'Lemon'
		]
	}}
/>

<Story
	name="Max Selection"
	args={{
		label: 'Select up to 3',
		maxSelected: 3,
		helpText: 'You can select a maximum of 3 options'
	}}
/>

<Story
	name="With Error"
	args={{
		label: 'Required Selection',
		error: 'Please select at least one option'
	}}
/>

<Story
	name="Disabled"
	args={{
		label: 'Disabled MultiSelect',
		disabled: true,
		defaultValue: ['Apple', 'Banana']
	}}
/>

<Story
	name="Loading"
	args={{
		label: 'Loading MultiSelect',
		loading: true
	}}
/>

<!-- All Variants Showcase (reduces sidebar clutter) -->
<Story name="All Variants">
	<div class="w-full max-w-2xl space-y-6">
		<div>
			<h3 class="mb-2 text-lg font-bold">Color Variants</h3>
			<div class="space-y-2">
				<MultiSelect
					label="Default"
					defaultValue={['Option 1']}
					options={['Option 1', 'Option 2', 'Option 3']}
				/>
				<MultiSelect
					variant="primary"
					label="Primary"
					defaultValue={['Option 1']}
					options={['Option 1', 'Option 2', 'Option 3']}
				/>
				<MultiSelect
					variant="secondary"
					label="Secondary"
					defaultValue={['Option 1']}
					options={['Option 1', 'Option 2', 'Option 3']}
				/>
				<MultiSelect
					variant="accent"
					label="Accent"
					defaultValue={['Option 1']}
					options={['Option 1', 'Option 2', 'Option 3']}
				/>
				<MultiSelect
					variant="success"
					label="Success"
					defaultValue={['Option 1']}
					options={['Option 1', 'Option 2', 'Option 3']}
				/>
				<MultiSelect
					variant="warning"
					label="Warning"
					defaultValue={['Option 1']}
					options={['Option 1', 'Option 2', 'Option 3']}
				/>
				<MultiSelect
					variant="error"
					label="Error"
					defaultValue={['Option 1']}
					options={['Option 1', 'Option 2', 'Option 3']}
				/>
			</div>
		</div>
	</div>
</Story>

<Story name="All Sizes">
	<div class="w-full max-w-2xl space-y-4">
		<MultiSelect
			size="xs"
			label="Extra Small (xs)"
			defaultValue={['Option 1']}
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
		<MultiSelect
			size="sm"
			label="Small (sm)"
			defaultValue={['Option 1']}
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
		<MultiSelect
			size="md"
			label="Medium (md) - Default"
			defaultValue={['Option 1']}
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
		<MultiSelect
			size="lg"
			label="Large (lg)"
			defaultValue={['Option 1']}
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
	</div>
</Story>

<Story name="Width Options">
	<div class="space-y-4">
		<MultiSelect
			width="xs"
			label="Extra Small Width (xs)"
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
		<MultiSelect
			width="sm"
			label="Small Width (sm)"
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
		<MultiSelect
			width="md"
			label="Medium Width (md)"
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
		<MultiSelect
			width="lg"
			label="Large Width (lg)"
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
		<MultiSelect
			width="xl"
			label="Extra Large Width (xl)"
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
		<MultiSelect
			width="full"
			label="Full Width (full) - Default"
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
		<MultiSelect
			width="auto"
			label="Auto Width (auto)"
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
	</div>
</Story>

<Story name="All States">
	<div class="w-full max-w-md space-y-4">
		<MultiSelect label="Default" options={['Option 1', 'Option 2', 'Option 3']} />
		<MultiSelect
			label="With Help Text"
			options={['Option 1', 'Option 2', 'Option 3']}
			helpText="Select all that apply"
		/>
		<MultiSelect label="Required" required={true} options={['Option 1', 'Option 2', 'Option 3']} />
		<MultiSelect
			label="With Error"
			error="This field has an error"
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
		<MultiSelect
			label="Disabled"
			disabled={true}
			defaultValue={['Option 1']}
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
		<MultiSelect label="Loading" loading={true} options={['Option 1', 'Option 2', 'Option 3']} />
		<MultiSelect
			label="Searchable"
			searchable={true}
			placeholder="Type to search..."
			options={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']}
		/>
		<MultiSelect
			label="Not Clearable"
			clearable={false}
			defaultValue={['Option 1']}
			options={['Option 1', 'Option 2', 'Option 3']}
		/>
	</div>
</Story>

<Story name="Object Options">
	<div class="w-full max-w-md space-y-4">
		<MultiSelect
			label="Countries"
			placeholder="Select countries..."
			options={[
				{ value: 'us', label: 'United States' },
				{ value: 'uk', label: 'United Kingdom' },
				{ value: 'ca', label: 'Canada' },
				{ value: 'au', label: 'Australia' },
				{ value: 'de', label: 'Germany' },
				{ value: 'fr', label: 'France' }
			]}
		/>
		<MultiSelect
			label="With Disabled Options"
			options={[
				{ value: 'opt1', label: 'Available Option 1' },
				{ value: 'opt2', label: 'Disabled Option', disabled: true },
				{ value: 'opt3', label: 'Available Option 2' },
				{ value: 'opt4', label: 'Another Disabled', disabled: true },
				{ value: 'opt5', label: 'Available Option 3' }
			]}
		/>
	</div>
</Story>

<!-- Real-world Examples -->
<Story name="Tags Selector">
	<div class="w-full max-w-md">
		<MultiSelect
			label="Tags"
			placeholder="Add tags..."
			searchable={true}
			options={[
				'JavaScript',
				'TypeScript',
				'React',
				'Svelte',
				'Vue',
				'Angular',
				'Node.js',
				'Python',
				'Go',
				'Rust'
			]}
			helpText="Add relevant tags to your post"
		/>
	</div>
</Story>

<Story name="Team Members">
	<div class="w-full max-w-md">
		<MultiSelect
			label="Assign Team Members"
			required={true}
			maxSelected={5}
			placeholder="Select team members..."
			options={[
				{ value: 'john', label: 'John Smith' },
				{ value: 'jane', label: 'Jane Doe' },
				{ value: 'bob', label: 'Bob Johnson' },
				{ value: 'alice', label: 'Alice Williams' },
				{ value: 'charlie', label: 'Charlie Brown' },
				{ value: 'diana', label: 'Diana Prince' }
			]}
			helpText="Select up to 5 team members for this project"
		/>
	</div>
</Story>

<Story name="Form Example">
	<div class="w-full max-w-md space-y-4">
		<MultiSelect
			label="Interests"
			required={true}
			options={['Technology', 'Science', 'Art', 'Music', 'Sports', 'Travel', 'Food', 'Gaming']}
		/>
		<MultiSelect
			label="Languages Spoken"
			searchable={true}
			options={[
				'English',
				'Spanish',
				'French',
				'German',
				'Chinese',
				'Japanese',
				'Korean',
				'Portuguese'
			]}
			helpText="Select all languages you speak"
		/>
		<MultiSelect
			label="Notification Preferences"
			options={['Email', 'SMS', 'Push Notifications', 'In-App']}
			defaultValue={['Email']}
		/>
	</div>
</Story>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		searchable: true,
		placeholder: 'Select options...',
		options: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4',
			'Option 5',
			'Option 6',
			'Option 7',
			'Option 8'
		]
	}}
/>
