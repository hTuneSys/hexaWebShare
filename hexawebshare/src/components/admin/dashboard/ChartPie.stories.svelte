<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ChartPie from './ChartPie.svelte';

	const sampleData = [
		{ label: 'Category A', value: 35 },
		{ label: 'Category B', value: 25 },
		{ label: 'Category C', value: 20 },
		{ label: 'Category D', value: 12 },
		{ label: 'Category E', value: 8 }
	];

	const { Story } = defineMeta({
		title: 'Admin/Dashboard/ChartPie',
		component: ChartPie,
		tags: ['autodocs'],
		argTypes: {
			data: {
				control: 'object',
				description: 'Data array - each item represents a slice in the pie chart'
			},
			colorScheme: {
				control: 'object',
				description: 'Color variants for slices (cyclic)'
			},
			donut: {
				control: 'boolean',
				description: 'Render as donut (hole in center)'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Chart size'
			},
			showLabels: {
				control: 'boolean',
				description: 'Show slice labels'
			},
			showValues: {
				control: 'boolean',
				description: 'Show values on slices or in legend'
			},
			showLegend: {
				control: 'boolean',
				description: 'Show legend below chart'
			},
			labelMinPercentage: {
				control: { type: 'number', min: 0, max: 50, step: 1 },
				description: 'Minimum slice % to show label on chart (avoids overlap)'
			},
			loading: {
				control: 'boolean',
				description: 'Loading state'
			},
			disabled: {
				control: 'boolean',
				description: 'Disabled state'
			},
			error: {
				control: 'boolean',
				description: 'Error state'
			},
			emptyTitle: {
				control: 'text',
				description: 'Title for empty state'
			},
			emptyDescription: {
				control: 'text',
				description: 'Description for empty state'
			},
			loadingAriaLabel: {
				control: 'text',
				description: 'Accessible label for loading spinner'
			},
			errorTitle: {
				control: 'text',
				description: 'Title for error state'
			},
			errorDescription: {
				control: 'text',
				description: 'Description for error state'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			}
		},
		args: {
			data: sampleData,
			donut: false,
			size: 'md',
			showLabels: true,
			showValues: true,
			showLegend: true,
			labelMinPercentage: 15,
			loading: false,
			disabled: false,
			error: false
		}
	});
</script>

<Story
	name="Default"
	args={{
		data: sampleData,
		size: 'md',
		showLabels: true,
		showValues: true,
		showLegend: true
	}}
/>

<Story
	name="Donut"
	args={{
		data: sampleData,
		donut: true,
		size: 'md',
		showLabels: true,
		showValues: true,
		showLegend: true
	}}
/>

<Story
	name="Small Size"
	args={{
		data: sampleData,
		size: 'sm',
		showLabels: true,
		showValues: true,
		showLegend: true
	}}
/>

<Story
	name="Large Size"
	args={{
		data: sampleData,
		size: 'lg',
		showLabels: true,
		showValues: true,
		showLegend: true
	}}
/>

<Story
	name="Without Legend"
	args={{
		data: sampleData,
		size: 'md',
		showLabels: true,
		showValues: true,
		showLegend: false
	}}
/>

<Story
	name="Loading State"
	args={{
		data: sampleData,
		size: 'md',
		loading: true
	}}
/>

<Story
	name="Disabled State"
	args={{
		data: sampleData,
		size: 'md',
		disabled: true,
		showLabels: true,
		showValues: true,
		showLegend: true
	}}
/>

<Story
	name="Empty Data"
	args={{
		data: [],
		size: 'md',
		showLabels: true,
		showValues: true,
		showLegend: true
	}}
/>

<Story
	name="Error State"
	args={{
		data: sampleData,
		size: 'md',
		error: true,
		errorTitle: 'Unable to load chart',
		errorDescription: 'Something went wrong while loading the chart data.'
	}}
/>

<Story
	name="Playground"
	args={{
		data: sampleData,
		donut: false,
		size: 'md',
		showLabels: true,
		showValues: true,
		showLegend: true,
		labelMinPercentage: 15,
		loading: false,
		disabled: false,
		error: false,
		ariaLabel: 'Interactive pie chart'
	}}
/>
