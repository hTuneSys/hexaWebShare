<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Icon from './Icon.svelte';

	const { Story } = defineMeta({
		title: 'Core/Media/Icon',
		component: Icon,
		tags: ['autodocs'],
		argTypes: {
			name: {
				control: 'text',
				description: 'Icon name/identifier'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the icon'
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
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide icon from screen readers (decorative icons)'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the icon'
			},
			loading: {
				control: 'boolean',
				description: 'Show loading spinner instead of icon'
			}
		},
		args: {
			name: 'Home',
			size: 'md',
			variant: 'neutral'
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ name: 'Home', size: 'md', variant: 'neutral' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ name: 'Home', size: 'xs', variant: 'neutral' }} />
<Story name="Small" args={{ name: 'Home', size: 'sm', variant: 'neutral' }} />
<Story name="Medium" args={{ name: 'Home', size: 'md', variant: 'neutral' }} />
<Story name="Large" args={{ name: 'Home', size: 'lg', variant: 'neutral' }} />

<!-- Variant Stories -->
<Story name="Primary" args={{ name: 'Settings', size: 'md', variant: 'primary' }} />
<Story name="Secondary" args={{ name: 'User', size: 'md', variant: 'secondary' }} />
<Story name="Accent" args={{ name: 'Heart', size: 'md', variant: 'accent' }} />
<Story name="Neutral" args={{ name: 'Info', size: 'md', variant: 'neutral' }} />
<Story name="Info" args={{ name: 'Info', size: 'md', variant: 'info' }} />
<Story name="Success" args={{ name: 'CheckCircle', size: 'md', variant: 'success' }} />
<Story name="Warning" args={{ name: 'AlertTriangle', size: 'md', variant: 'warning' }} />
<Story name="Error" args={{ name: 'XCircle', size: 'md', variant: 'error' }} />

<!-- State Stories -->
<Story
	name="Disabled"
	args={{ name: 'Settings', size: 'md', variant: 'primary', disabled: true }}
/>
<Story name="Loading" args={{ name: 'Settings', size: 'md', variant: 'primary', loading: true }} />

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{ name: 'Settings', size: 'md', variant: 'primary', ariaLabel: 'Settings icon' }}
/>
<Story
	name="Decorative (Aria Hidden)"
	args={{ name: 'Home', size: 'md', variant: 'neutral', ariaHidden: true }}
/>

<!-- Interactive Examples -->
<Story
	name="Playground"
	args={{ name: 'Home', size: 'md', variant: 'primary', ariaLabel: 'Interactive icon' }}
/>
