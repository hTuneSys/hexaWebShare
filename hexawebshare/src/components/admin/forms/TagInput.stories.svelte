<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TagInput from './TagInput.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Admin/Forms/TagInput',
		component: TagInput,
		tags: ['autodocs'],
		argTypes: {
			tags: {
				control: { type: 'object' },
				description: 'Array of tags'
			},
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			tagVariant: {
				control: { type: 'select' },
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error',
					'ghost'
				]
			},
			outline: { control: 'boolean' },
			disabled: { control: 'boolean' },
			required: { control: 'boolean' },
			loading: { control: 'boolean' },
			allowDuplicates: { control: 'boolean' },
			maxTags: { control: 'number' },
			minTags: { control: 'number' },
			maxTagLength: { control: 'number' },
			label: { control: 'text' },
			placeholder: { control: 'text' },
			helpText: { control: 'text' },
			error: { control: 'text' },
			maxTagsErrorText: { control: 'text' },
			minTagsErrorText: { control: 'text' },
			duplicateTagErrorText: { control: 'text' },
			removeTagAriaLabel: { control: 'text' },
			width: {
				control: { type: 'select' },
				options: ['full', 'auto', 'xs', 'sm', 'md', 'lg', 'xl']
			},
			align: {
				control: { type: 'select' },
				options: ['left', 'center', 'right']
			}
		},
		args: {
			ontagadd: fn(),
			ontagremove: fn(),
			onchange: fn(),
			oninput: fn(),
			onblur: fn(),
			onfocus: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ label: 'Tags', placeholder: 'Type and press Enter to add...' }} />

<Story
	name="With Initial Tags"
	args={{
		tags: ['JavaScript', 'TypeScript', 'Svelte'],
		label: 'Technologies',
		placeholder: 'Add more...'
	}}
/>

<Story
	name="Primary Variant"
	args={{
		tags: ['Tag 1', 'Tag 2'],
		variant: 'primary',
		label: 'Primary Input',
		placeholder: 'Add a tag...'
	}}
/>

<Story
	name="Primary Tags"
	args={{
		tags: ['React', 'Vue', 'Angular'],
		tagVariant: 'primary',
		label: 'Primary Tags',
		placeholder: 'Add framework...'
	}}
/>

<Story
	name="Small Size"
	args={{
		tags: ['Small', 'Tags'],
		size: 'sm',
		label: 'Small Size',
		placeholder: 'Add...'
	}}
/>

<Story
	name="Large Size"
	args={{
		tags: ['Large', 'Tags'],
		size: 'lg',
		label: 'Large Size',
		placeholder: 'Add tag...'
	}}
/>

<Story
	name="Disabled State"
	args={{
		tags: ['Cannot', 'Edit'],
		disabled: true,
		label: 'Disabled Tags',
		placeholder: 'Disabled...'
	}}
/>

<Story
	name="Loading State"
	args={{
		tags: ['Loading'],
		loading: true,
		label: 'Loading Tags',
		placeholder: 'Loading...'
	}}
/>

<Story
	name="With Error"
	args={{
		tags: ['Error', 'State'],
		label: 'Tags with Error',
		error: 'Please add at least 3 tags',
		placeholder: 'Add more tags...'
	}}
/>

<Story
	name="Max Tags Limit"
	args={{
		tags: ['One', 'Two', 'Three'],
		maxTags: 3,
		label: 'Max 3 Tags',
		helpText: 'Maximum 3 tags allowed',
		placeholder: 'Limit reached...'
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		tags: ['Playground', 'Test'],
		value: '',
		variant: 'primary',
		size: 'md',
		tagVariant: 'neutral',
		outline: false,
		disabled: false,
		required: false,
		loading: false,
		allowDuplicates: false,
		label: 'Playground',
		placeholder: 'Try adding tags...',
		helpText: 'Press Enter or comma to add tags',
		ontagadd: fn(),
		ontagremove: fn(),
		onchange: fn(),
		oninput: fn(),
		onblur: fn(),
		onfocus: fn()
	}}
/>
