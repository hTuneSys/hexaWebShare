<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import StatusDot from './StatusDot.svelte';

	const { Story } = defineMeta({
		title: 'Core/Data Display/StatusDot',
		component: StatusDot,
		tags: ['autodocs'],
		argTypes: {
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
				description: 'Color variant of the status dot'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Size of the status dot'
			},
			pulse: {
				control: 'boolean',
				description: 'Enable pulsing animation for active/live status'
			},
			ring: {
				control: 'boolean',
				description: 'Add ring/outline effect around the dot'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the status dot (reduced opacity)'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide dot from screen readers (decorative dots)'
			}
		},
		args: {
			variant: 'neutral',
			size: 'md',
			pulse: false,
			ring: false,
			disabled: false
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ variant: 'neutral', size: 'md' }} />

<!-- Size Stories -->
<Story name="Small Size" args={{ variant: 'success', size: 'sm' }} />

<Story name="Extra Large Size" args={{ variant: 'success', size: 'xl' }} />

<!-- Variant Stories -->
<Story name="Success Variant" args={{ variant: 'success', size: 'md' }} />

<Story name="Warning Variant" args={{ variant: 'warning', size: 'md' }} />

<Story name="Error Variant" args={{ variant: 'error', size: 'md' }} />

<!-- Animation Stories -->
<Story name="Pulsing Animation" args={{ variant: 'success', size: 'md', pulse: true }} />

<!-- Ring Style -->
<Story name="With Ring" args={{ variant: 'success', size: 'md', ring: true }} />

<!-- State Stories -->
<Story name="Disabled State" args={{ variant: 'success', size: 'md', disabled: true }} />

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		variant: 'success',
		size: 'md',
		pulse: false,
		ring: false,
		disabled: false,
		ariaLabel: 'Interactive status dot'
	}}
/>
