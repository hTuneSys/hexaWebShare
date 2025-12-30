<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Icon from './Icon.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Media/Icon',
		component: Icon,
		tags: ['autodocs'],
		argTypes: {
			name: {
				control: 'text',
				description: 'Icon name/identifier for semantic purposes'
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
					'error'
				],
				description: 'Color variant of the icon'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Size of the icon (xs=12px, sm=16px, md=20px, lg=24px, xl=32px)'
			},
			spin: {
				control: 'boolean',
				description: 'Enable spinning animation'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the icon is disabled (reduced opacity)'
			},
			clickable: {
				control: 'boolean',
				description: 'Make the icon clickable with hover effects'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide icon from screen readers'
			}
		},
		args: {
			name: 'star',
			size: 'lg',
			variant: 'primary',
			spin: false,
			disabled: false,
			clickable: false,
			ariaHidden: true,
			onclick: fn()
		}
	});
</script>

<!-- Default Story with star icon -->
<Story name="Default" args={{ name: 'star', size: 'lg', variant: 'primary' }} />

<!-- Size Stories -->
<Story name="Small Size" args={{ name: 'star', size: 'sm', variant: 'primary' }} />
<Story name="Large Size" args={{ name: 'star', size: 'xl', variant: 'primary' }} />

<!-- Variant/Color Stories -->
<Story name="Primary Variant" args={{ name: 'star', size: 'xl', variant: 'primary' }} />
<Story name="Success Variant" args={{ name: 'star', size: 'xl', variant: 'success' }} />
<Story name="Warning Variant" args={{ name: 'star', size: 'xl', variant: 'warning' }} />
<Story name="Error Variant" args={{ name: 'star', size: 'xl', variant: 'error' }} />

<!-- State Stories -->
<Story
	name="Spinning State"
	args={{ name: 'loading', size: 'xl', variant: 'primary', spin: true }}
/>
<Story
	name="Disabled State"
	args={{ name: 'star', size: 'xl', variant: 'primary', disabled: true }}
/>
<Story
	name="Clickable State"
	args={{ name: 'star', size: 'xl', variant: 'primary', clickable: true }}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		name: 'star',
		size: 'xl',
		variant: 'primary',
		spin: false,
		disabled: false,
		clickable: false,
		ariaLabel: 'Interactive icon',
		ariaHidden: false
	}}
/>
