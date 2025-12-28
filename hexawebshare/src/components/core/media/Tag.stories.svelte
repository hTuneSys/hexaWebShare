<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tag from './Tag.svelte';

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
			clickable: false
		}
	});
</script>

<!-- Default -->
<Story name="Default" args={{ label: 'Tag', variant: 'neutral', size: 'md' }} />

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

<!-- Variants -->
<Story name="Primary" args={{ label: 'Primary', variant: 'primary' }} />
<Story name="Success" args={{ label: 'Success', variant: 'success' }} />
<Story name="Warning" args={{ label: 'Warning', variant: 'warning' }} />
<Story name="Error" args={{ label: 'Error', variant: 'error' }} />
<Story name="Info" args={{ label: 'Info', variant: 'info' }} />

<!-- Sizes -->
<Story name="Extra Small" args={{ label: 'XS Tag', size: 'xs', variant: 'primary' }} />
<Story name="Large" args={{ label: 'Large Tag', size: 'lg', variant: 'primary' }} />
<Story name="Extra Large" args={{ label: 'XL Tag', size: 'xl', variant: 'primary' }} />

<!-- Styles -->
<Story name="Outline" args={{ label: 'Outline Tag', variant: 'primary', outline: true }} />
<Story name="Soft" args={{ label: 'Soft Tag', variant: 'primary', soft: true }} />
<Story name="Dash" args={{ label: 'Dash Tag', variant: 'primary', dash: true }} />

<!-- States -->
<Story name="Disabled" args={{ label: 'Disabled', variant: 'primary', disabled: true }} />
<Story name="Loading" args={{ label: 'Loading', variant: 'info', loading: true }} />

<!-- Interactive -->
<Story name="Removable" args={{ label: 'Click × to remove', variant: 'info', removable: true }} />
<Story name="Clickable" args={{ label: 'Clickable', variant: 'success', clickable: true }} />
