<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ChartLine from './ChartLine.svelte';

	// Sample data for stories
	const sampleData = [20, 35, 45, 30, 50, 60, 55, 70, 65, 80];
	const sampleLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

	const largeDataset = [
		10, 15, 22, 18, 25, 30, 28, 35, 40, 38, 45, 50, 48, 55, 60, 58, 65, 70, 68, 75
	];

	const { Story } = defineMeta({
		title: 'Admin/Dashboard/ChartLine',
		component: ChartLine,
		tags: ['autodocs'],
		argTypes: {
			data: {
				control: 'object',
				description: 'Chart data points (array of numbers or ChartLineDataPoint objects)'
			},
			labels: {
				control: 'object',
				description: 'X-axis labels (used when data is array of numbers)'
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
				description: 'Color variant of the line'
			},
			title: {
				control: 'text',
				description: 'Chart title'
			},
			width: {
				control: 'text',
				description: 'Chart width'
			},
			height: {
				control: 'text',
				description: 'Chart height'
			},
			showGrid: {
				control: 'boolean',
				description: 'Show grid lines'
			},
			showPoints: {
				control: 'boolean',
				description: 'Show data points on the line'
			},
			showArea: {
				control: 'boolean',
				description: 'Show area under the line (filled area)'
			},
			strokeWidth: {
				control: { type: 'number', min: 1, max: 10, step: 1 },
				description: 'Line stroke width'
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
			}
		},
		args: {
			data: sampleData,
			labels: sampleLabels,
			variant: 'primary',
			title: 'Line Chart',
			width: '100%',
			height: '300px',
			showGrid: true,
			showPoints: true,
			showArea: false,
			strokeWidth: 2,
			loading: false,
			disabled: false,
			ariaLabel: 'Line chart'
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ data: sampleData, labels: sampleLabels, title: 'Sales Trend' }} />

<Story
	name="Primary Variant"
	args={{ data: sampleData, labels: sampleLabels, variant: 'primary', title: 'Primary Chart' }}
/>

<Story
	name="Success Variant"
	args={{ data: sampleData, labels: sampleLabels, variant: 'success', title: 'Revenue Growth' }}
/>

<Story
	name="With Area Fill"
	args={{ data: sampleData, labels: sampleLabels, showArea: true, title: 'Area Chart' }}
/>

<Story
	name="Without Grid"
	args={{ data: sampleData, labels: sampleLabels, showGrid: false, title: 'Clean Chart' }}
/>

<Story
	name="Without Points"
	args={{ data: sampleData, labels: sampleLabels, showPoints: false, title: 'Smooth Line' }}
/>

<Story
	name="Disabled State"
	args={{ data: sampleData, labels: sampleLabels, disabled: true, title: 'Disabled Chart' }}
/>

<Story
	name="Loading State"
	args={{ data: sampleData, labels: sampleLabels, loading: true, title: 'Loading Chart' }}
/>

<Story
	name="Small Height"
	args={{ data: sampleData, labels: sampleLabels, height: '200px', title: 'Compact Chart' }}
/>

<Story name="Large Dataset" args={{ data: largeDataset, title: 'Monthly Sales Data' }} />

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		data: sampleData,
		labels: sampleLabels,
		variant: 'primary',
		title: 'Line Chart',
		width: '100%',
		height: '300px',
		showGrid: true,
		showPoints: true,
		showArea: false,
		strokeWidth: 2,
		loading: false,
		disabled: false,
		ariaLabel: 'Line chart'
	}}
/>
