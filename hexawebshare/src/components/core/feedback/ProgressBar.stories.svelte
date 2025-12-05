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
				description: 'Current progress value'
			},
			max: {
				control: { type: 'number' },
				description: 'Maximum value (default: 100)'
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
				]
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			showLabel: {
				control: 'boolean',
				description: 'Show percentage label'
			},
			label: {
				control: 'text',
				description: 'Custom label text'
			},
			indeterminate: {
				control: 'boolean',
				description: 'Indeterminate progress animation'
			}
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ value: 50 }} />

<!-- Variant Stories -->
<Story name="Primary" args={{ value: 60, variant: 'primary' }} />
<Story name="Secondary" args={{ value: 70, variant: 'secondary' }} />
<Story name="Accent" args={{ value: 80, variant: 'accent' }} />
<Story name="Info" args={{ value: 40, variant: 'info' }} />
<Story name="Success" args={{ value: 90, variant: 'success' }} />
<Story name="Warning" args={{ value: 65, variant: 'warning' }} />
<Story name="Error" args={{ value: 30, variant: 'error' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ value: 50, size: 'xs' }} />
<Story name="Small" args={{ value: 50, size: 'sm' }} />
<Story name="Medium" args={{ value: 50, size: 'md' }} />
<Story name="Large" args={{ value: 50, size: 'lg' }} />

<!-- With Label -->
<Story name="With Percentage Label" args={{ value: 75, showLabel: true }} />
<Story name="With Custom Label" args={{ value: 60, label: 'Uploading...' }} />

<!-- Progress States -->
<Story name="Empty" args={{ value: 0 }} />
<Story name="Half" args={{ value: 50 }} />
<Story name="Full" args={{ value: 100 }} />
<Story name="Indeterminate" args={{ indeterminate: true }} />

<!-- Custom Max Value -->
<Story name="Custom Max (0-200)" args={{ value: 150, max: 200, showLabel: true }} />
