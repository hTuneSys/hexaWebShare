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
<Story name="Dots" args={{ type: 'dots' }} />
<Story name="Ring" args={{ type: 'ring' }} />
<Story name="Ball" args={{ type: 'ball' }} />
<Story name="Bars" args={{ type: 'bars' }} />
<Story name="Infinity" args={{ type: 'infinity' }} />

<!-- Size Stories -->
<Story name="Small" args={{ size: 'sm' }} />
<Story name="Large" args={{ size: 'lg' }} />

<!-- Variant Stories -->
<Story name="Success" args={{ variant: 'success' }} />
<Story name="Error" args={{ variant: 'error' }} />

<!-- Playground -->
<Story
	name="Playground"
	args={{
		type: 'spinner',
		size: 'md',
		variant: 'primary',
		ariaLabel: 'Loading'
	}}
/>
