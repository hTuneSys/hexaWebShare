<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ChartBar from './ChartBar.svelte';

	const sampleData = [
		{ label: 'Jan', value: 45 },
		{ label: 'Feb', value: 78 },
		{ label: 'Mar', value: 32 },
		{ label: 'Apr', value: 90 },
		{ label: 'May', value: 56 },
		{ label: 'Jun', value: 67 }
	];

	const { Story } = defineMeta({
		title: 'Admin/Dashboard/ChartBar',
		component: ChartBar,
		tags: ['autodocs'],
		argTypes: {
			data: {
				control: 'object',
				description: 'Data array - each item represents a bar in the chart'
			},
			orientation: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical'],
				description: 'Chart orientation'
			},
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info'],
				description: 'Color variant of the bars'
			},
			height: {
				control: 'text',
				description: 'Chart height (for vertical) or width (for horizontal)'
			},
			barSpacing: {
				control: { type: 'number', min: 0, max: 20, step: 1 },
				description: 'Spacing between bars in pixels'
			},
			maxValue: {
				control: { type: 'number', min: 0 },
				description: 'Maximum value for scaling (auto-calculated if not provided)'
			},
			showLabels: {
				control: 'boolean',
				description: 'Show labels on bars'
			},
			showValues: {
				control: 'boolean',
				description: 'Show values on bars'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the chart is in loading state'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the chart is disabled'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaLabelledBy: {
				control: 'text',
				description: 'ID of element that labels this chart'
			}
		},
		args: {
			data: sampleData,
			orientation: 'vertical',
			variant: 'primary',
			height: '300px',
			barSpacing: 4,
			showLabels: true,
			showValues: true,
			loading: false
		}
	});
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		data: sampleData,
		orientation: 'vertical',
		variant: 'primary',
		height: '300px',
		showLabels: true,
		showValues: true
	}}
/>

<!-- Orientation Stories -->
<Story
	name="Horizontal Orientation"
	args={{
		data: sampleData,
		orientation: 'horizontal',
		variant: 'primary',
		height: '400px',
		showLabels: true,
		showValues: true
	}}
/>

<!-- Variant Stories -->
<Story
	name="Success Variant"
	args={{
		data: sampleData,
		orientation: 'vertical',
		variant: 'success',
		height: '300px',
		showLabels: true,
		showValues: true
	}}
/>

<Story
	name="Warning Variant"
	args={{
		data: sampleData,
		orientation: 'vertical',
		variant: 'warning',
		height: '300px',
		showLabels: true,
		showValues: true
	}}
/>

<Story
	name="Error Variant"
	args={{
		data: sampleData,
		orientation: 'vertical',
		variant: 'error',
		height: '300px',
		showLabels: true,
		showValues: true
	}}
/>

<Story
	name="Info Variant"
	args={{
		data: sampleData,
		orientation: 'vertical',
		variant: 'info',
		height: '300px',
		showLabels: true,
		showValues: true
	}}
/>

<!-- Display Options -->
<Story
	name="Without Labels"
	args={{
		data: sampleData,
		orientation: 'vertical',
		variant: 'primary',
		height: '300px',
		showLabels: false,
		showValues: true
	}}
/>

<Story
	name="Without Values"
	args={{
		data: sampleData,
		orientation: 'vertical',
		variant: 'primary',
		height: '300px',
		showLabels: true,
		showValues: false
	}}
/>

<!-- State Stories -->
<Story
	name="Loading State"
	args={{
		data: sampleData,
		orientation: 'vertical',
		variant: 'primary',
		height: '300px',
		loading: true
	}}
/>

<Story
	name="Disabled State"
	args={{
		data: sampleData,
		orientation: 'vertical',
		variant: 'primary',
		height: '300px',
		disabled: true,
		showLabels: true,
		showValues: true
	}}
/>

<!-- ✅ REQUIRED: Interactive Playground Story (must be last) -->
<Story
	name="Playground"
	args={{
		data: sampleData,
		orientation: 'vertical',
		variant: 'primary',
		height: '300px',
		barSpacing: 4,
		showLabels: true,
		showValues: true,
		loading: false,
		disabled: false,
		ariaLabel: 'Interactive bar chart'
	}}
/>
