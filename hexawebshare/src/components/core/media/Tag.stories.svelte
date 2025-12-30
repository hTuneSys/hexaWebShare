<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tag from './Tag.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Media/Tag',
		component: Tag,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Tag label text'
			},
			variant: {
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
				],
				description: 'Color variant of the tag'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Size of the tag'
			},
			outline: {
				control: 'boolean',
				description: 'Outline style tag'
			},
			soft: {
				control: 'boolean',
				description: 'Soft/muted background style'
			},
			dash: {
				control: 'boolean',
				description: 'Dashed border style'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the tag'
			},
			loading: {
				control: 'boolean',
				description: 'Show loading spinner in the tag'
			},
			removable: {
				control: 'boolean',
				description: 'Show remove button on the tag'
			},
			clickable: {
				control: 'boolean',
				description: 'Make the tag clickable'
			}
		},
		args: {
			label: 'Tag',
			size: 'md',
			variant: 'neutral',
			outline: false,
			soft: false,
			dash: false,
			disabled: false,
			loading: false,
			removable: false,
			clickable: false,
			onclick: fn()
		}
	});
</script>

<!-- Default -->
<Story name="Default" args={{ label: 'Tag', variant: 'neutral', size: 'md' }} />

<!-- Size Stories -->
<Story name="Small Size" args={{ label: 'Small Tag', size: 'sm', variant: 'primary' }} />
<Story name="Large Size" args={{ label: 'Large Tag', size: 'lg', variant: 'primary' }} />

<!-- Variant Stories -->
<Story name="Primary Variant" args={{ label: 'Primary', variant: 'primary' }} />
<Story name="Success Variant" args={{ label: 'Success', variant: 'success' }} />
<Story name="Warning Variant" args={{ label: 'Warning', variant: 'warning' }} />
<Story name="Error Variant" args={{ label: 'Error', variant: 'error' }} />

<!-- Style Stories -->
<Story name="Outline Style" args={{ label: 'Outline', variant: 'primary', outline: true }} />
<Story name="Soft Style" args={{ label: 'Soft', variant: 'primary', soft: true }} />

<!-- Interactive Stories -->
<Story name="Removable" args={{ label: 'Removable', variant: 'info', removable: true }} />

<!-- Playground -->
<Story
	name="Playground"
	args={{
		label: 'Interactive Tag',
		size: 'md',
		variant: 'primary',
		outline: false,
		soft: false,
		dash: false,
		disabled: false,
		loading: false,
		removable: false,
		clickable: false
	}}
/>
