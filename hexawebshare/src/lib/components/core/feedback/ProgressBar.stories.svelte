<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ProgressBar from './ProgressBar.svelte';

	const { Story } = defineMeta({
		title: 'Core/Feedback/ProgressBar',
		component: ProgressBar,
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'range', min: 0, max: 100, step: 1 },
				description: 'Current progress value (0 to max)'
			},
			max: {
				control: { type: 'number', min: 1 },
				description: 'Maximum value for the progress bar'
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
				description: 'Color variant of the progress bar'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size of the progress bar'
			},
			showLabel: {
				control: 'boolean',
				description: 'Show percentage label'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the progress bar'
			}
		},
		args: {
			value: 50,
			max: 100,
			variant: 'primary',
			size: 'md',
			showLabel: false,
			ariaLabel: 'Progress',
			disabled: false
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ value: 50, variant: 'primary', size: 'md' }} />

<!-- Value Stories -->
<Story name="Empty" args={{ value: 0 }} />
<Story name="Half Complete" args={{ value: 50 }} />
<Story name="Complete" args={{ value: 100 }} />

<!-- Variant Stories -->
<Story name="Success" args={{ value: 75, variant: 'success' }} />
<Story name="Warning" args={{ value: 30, variant: 'warning' }} />
<Story name="Error" args={{ value: 85, variant: 'error' }} />

<!-- Size Stories -->
<Story name="Small" args={{ value: 50, size: 'sm' }} />
<Story name="Large" args={{ value: 50, size: 'lg' }} />

<!-- With Label Story -->
<Story name="With Label" args={{ value: 65, showLabel: true, variant: 'success' }} />

<!-- Playground -->
<Story
	name="Playground"
	args={{
		value: 50,
		max: 100,
		variant: 'primary',
		size: 'md',
		showLabel: false,
		ariaLabel: 'Progress',
		disabled: false
	}}
/>
