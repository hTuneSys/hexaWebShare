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
<Story name="Quarter" args={{ value: 25 }} />
<Story name="Half" args={{ value: 50 }} />
<Story name="Three Quarters" args={{ value: 75 }} />
<Story name="Complete" args={{ value: 100 }} />

<!-- Variant Stories -->
<Story name="Primary" args={{ value: 50, variant: 'primary' }} />
<Story name="Secondary" args={{ value: 50, variant: 'secondary' }} />
<Story name="Accent" args={{ value: 50, variant: 'accent' }} />
<Story name="Neutral" args={{ value: 50, variant: 'neutral' }} />
<Story name="Info" args={{ value: 50, variant: 'info' }} />
<Story name="Success" args={{ value: 50, variant: 'success' }} />
<Story name="Warning" args={{ value: 50, variant: 'warning' }} />
<Story name="Error" args={{ value: 50, variant: 'error' }} />

<!-- Size Stories -->
<Story name="Small" args={{ value: 50, size: 'sm' }} />
<Story name="Medium" args={{ value: 50, size: 'md' }} />
<Story name="Large" args={{ value: 50, size: 'lg' }} />

<!-- With Label Stories -->
<Story name="With Label" args={{ value: 50, showLabel: true }} />
<Story name="With Label - Complete" args={{ value: 100, showLabel: true }} />
<Story name="With Label - Success" args={{ value: 75, variant: 'success', showLabel: true }} />

<!-- State Stories -->
<Story name="Disabled" args={{ value: 50, disabled: true }} />
<Story name="Disabled With Label" args={{ value: 50, disabled: true, showLabel: true }} />

<!-- Combined Examples -->
<Story name="Large Success With Label" args={{ value: 80, variant: 'success', size: 'lg', showLabel: true }} />
<Story name="Small Warning" args={{ value: 30, variant: 'warning', size: 'sm' }} />
<Story name="Large Error Complete" args={{ value: 100, variant: 'error', size: 'lg' }} />
<Story name="Medium Info With Label" args={{ value: 60, variant: 'info', size: 'md', showLabel: true }} />

<!-- Interactive Example -->
<Story name="Interactive" args={{ value: 50, showLabel: true }} />
