<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spinner from './Spinner.svelte';

	const { Story } = defineMeta({
		title: 'Core/Feedback/Spinner',
		component: Spinner,
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: { type: 'select' },
				options: ['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity'],
				description: 'Visual type of the spinner animation'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the spinner'
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
				description: 'Color variant of the spinner'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			}
		},
		args: {
			type: 'spinner',
			size: 'md',
			variant: 'primary',
			ariaLabel: 'Loading'
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ type: 'spinner', size: 'md', variant: 'primary' }} />

<!-- Type Stories -->
<Story name="Spinner" args={{ type: 'spinner' }} />
<Story name="Dots" args={{ type: 'dots' }} />
<Story name="Ring" args={{ type: 'ring' }} />
<Story name="Ball" args={{ type: 'ball' }} />
<Story name="Bars" args={{ type: 'bars' }} />
<Story name="Infinity" args={{ type: 'infinity' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ size: 'xs' }} />
<Story name="Small" args={{ size: 'sm' }} />
<Story name="Medium" args={{ size: 'md' }} />
<Story name="Large" args={{ size: 'lg' }} />

<!-- Variant Stories -->
<Story name="Primary" args={{ variant: 'primary' }} />
<Story name="Secondary" args={{ variant: 'secondary' }} />
<Story name="Accent" args={{ variant: 'accent' }} />
<Story name="Neutral" args={{ variant: 'neutral' }} />
<Story name="Info" args={{ variant: 'info' }} />
<Story name="Success" args={{ variant: 'success' }} />
<Story name="Warning" args={{ variant: 'warning' }} />
<Story name="Error" args={{ variant: 'error' }} />

<!-- Combined Examples -->
<Story name="Large Primary Ring" args={{ type: 'ring', size: 'lg', variant: 'primary' }} />
<Story name="Small Success Dots" args={{ type: 'dots', size: 'sm', variant: 'success' }} />
<Story name="Medium Error Bars" args={{ type: 'bars', size: 'md', variant: 'error' }} />
<Story name="Large Info Infinity" args={{ type: 'infinity', size: 'lg', variant: 'info' }} />
