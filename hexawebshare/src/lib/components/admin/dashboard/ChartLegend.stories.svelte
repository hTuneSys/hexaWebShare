<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ChartLegend from './ChartLegend.svelte';

	const { Story } = defineMeta({
		title: 'Admin/Dashboard/ChartLegend',
		component: ChartLegend,
		tags: ['autodocs'],
		argTypes: {
			items: {
				control: 'object',
				description: 'Array of legend items to display'
			},
			orientation: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical'],
				description: 'Layout orientation of the legend'
			},
			position: {
				control: { type: 'select' },
				options: ['top', 'bottom', 'left', 'right'],
				description: 'Position of the legend relative to chart'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the legend items'
			},
			interactive: {
				control: 'boolean',
				description: 'Enable interactive mode (clickable items)'
			},
			showValues: {
				control: 'boolean',
				description: 'Show values next to labels'
			},
			spacing: {
				control: { type: 'select' },
				options: ['compact', 'normal', 'relaxed'],
				description: 'Spacing between legend items'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the legend'
			},
			ariaLive: {
				control: { type: 'select' },
				options: ['off', 'polite', 'assertive'],
				description: 'Screen reader announcement level'
			}
		},
		args: {
			items: [
				{ label: 'Series 1', color: '#3b82f6' },
				{ label: 'Series 2', color: '#10b981' },
				{ label: 'Series 3', color: '#f59e0b' }
			],
			orientation: 'horizontal',
			position: 'bottom',
			size: 'md',
			interactive: false,
			showValues: false,
			spacing: 'normal',
			ariaLabel: 'Chart legend'
		}
	});
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		items: [
			{ label: 'Series 1', color: '#3b82f6' },
			{ label: 'Series 2', color: '#10b981' },
			{ label: 'Series 3', color: '#f59e0b' }
		]
	}}
/>

<!-- Size Variants -->
<Story
	name="Small Size"
	args={{
		items: [
			{ label: 'Desktop', color: '#3b82f6', value: '45%' },
			{ label: 'Mobile', color: '#10b981', value: '35%' },
			{ label: 'Tablet', color: '#f59e0b', value: '20%' }
		],
		size: 'sm',
		showValues: true
	}}
/>

<Story
	name="Large Size"
	args={{
		items: [
			{ label: 'Desktop', color: '#3b82f6', value: '45%' },
			{ label: 'Mobile', color: '#10b981', value: '35%' },
			{ label: 'Tablet', color: '#f59e0b', value: '20%' }
		],
		size: 'lg',
		showValues: true
	}}
/>

<!-- Orientation & Spacing -->
<Story
	name="Vertical Orientation"
	args={{
		items: [
			{ label: 'Q1 Sales', color: '#3b82f6', value: '$125K' },
			{ label: 'Q2 Sales', color: '#10b981', value: '$142K' },
			{ label: 'Q3 Sales', color: '#f59e0b', value: '$138K' },
			{ label: 'Q4 Sales', color: '#8b5cf6', value: '$165K' }
		],
		orientation: 'vertical',
		showValues: true
	}}
/>

<Story
	name="Compact Spacing"
	args={{
		items: [
			{ label: 'Chrome', color: '#3b82f6' },
			{ label: 'Firefox', color: '#f59e0b' },
			{ label: 'Safari', color: '#10b981' },
			{ label: 'Edge', color: '#06b6d4' },
			{ label: 'Other', color: '#6b7280' }
		],
		spacing: 'compact'
	}}
/>

<!-- Interactive & States -->
<Story
	name="Interactive"
	args={{
		items: [
			{ label: 'Active Users', color: '#3b82f6', value: '1,234' },
			{ label: 'New Users', color: '#10b981', value: '567' },
			{ label: 'Returning Users', color: '#f59e0b', value: '890' }
		],
		interactive: true,
		showValues: true
	}}
/>

<Story
	name="Disabled Items"
	args={{
		items: [
			{ label: 'Active', color: '#10b981', value: '1,234' },
			{ label: 'Inactive', color: '#6b7280', value: '567', disabled: true },
			{ label: 'Pending', color: '#f59e0b', value: '89', disabled: true }
		],
		interactive: true,
		showValues: true
	}}
/>

<Story
	name="Empty State"
	args={{
		items: [],
		ariaLabel: 'No data available'
	}}
/>

<!-- Color Variants -->
<Story
	name="Vibrant Colors"
	args={{
		items: [
			{ label: 'Red', color: '#ef4444', value: '25%' },
			{ label: 'Orange', color: '#f97316', value: '20%' },
			{ label: 'Yellow', color: '#eab308', value: '15%' },
			{ label: 'Green', color: '#22c55e', value: '18%' },
			{ label: 'Blue', color: '#3b82f6', value: '22%' }
		],
		showValues: true
	}}
/>

<!-- Accessibility Testing -->
<Story
	name="Accessibility Test"
	args={{
		items: [
			{ label: 'Keyboard Navigable', color: '#3b82f6', value: 'Tab to focus' },
			{ label: 'Enter/Space to Click', color: '#10b981', value: 'Try it!' },
			{ label: 'Screen Reader Friendly', color: '#f59e0b', value: 'ARIA labels' }
		],
		interactive: true,
		showValues: true,
		ariaLabel: 'Accessibility demonstration legend',
		ariaLive: 'assertive'
	}}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		items: [
			{ label: 'Primary', color: '#3b82f6', value: '45%' },
			{ label: 'Success', color: '#10b981', value: '30%' },
			{ label: 'Warning', color: '#f59e0b', value: '15%', disabled: false },
			{ label: 'Error', color: '#ef4444', value: '10%', disabled: false }
		],
		orientation: 'horizontal',
		position: 'bottom',
		size: 'md',
		interactive: true,
		showValues: true,
		spacing: 'normal',
		ariaLabel: 'Interactive playground legend',
		ariaLive: 'polite'
	}}
/>
