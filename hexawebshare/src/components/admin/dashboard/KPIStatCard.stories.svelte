<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import KPIStatCard from './KPIStatCard.svelte';

	const { Story } = defineMeta({
		title: 'Admin/Dashboard/KPIStatCard',
		component: KPIStatCard,
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'text' },
				description: 'Main value to display (e.g., "125,000", "$50K")'
			},
			label: {
				control: { type: 'text' },
				description: 'Label/title for the KPI card'
			},
			trend: {
				control: { type: 'number' },
				description: 'Optional trend percentage (e.g., 12.5 for +12.5%)'
			},
			trendDirection: {
				control: { type: 'select' },
				options: ['up', 'down'],
				description: 'Trend direction: up for increase, down for decrease'
			},
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
				description: 'Color variant of the card'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size of the card'
			},
			icon: {
				control: { type: 'text' },
				description: 'Optional SVG path for icon (e.g., "M12 2L2 7l10 5 10-5-10-5z")'
			},
			description: {
				control: { type: 'text' },
				description: 'Optional description text below the value'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the card is in loading state'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the card is disabled'
			},
			ariaLabel: {
				control: { type: 'text' },
				description: 'Accessible label for screen readers'
			}
		},
		args: {
			value: '125,000',
			label: 'Total Revenue',
			variant: 'primary',
			size: 'md',
			trend: 12.5,
			trendDirection: 'up'
		}
	});
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		value: '125,000',
		label: 'Total Revenue',
		variant: 'primary',
		size: 'md'
	}}
/>

<!-- Success Variant -->
<Story
	name="Success Variant"
	args={{
		value: '1,234',
		label: 'Active Users',
		variant: 'success',
		size: 'md'
	}}
/>

<!-- Error Variant -->
<Story
	name="Error Variant"
	args={{
		value: '23',
		label: 'Failed Orders',
		variant: 'error',
		size: 'md'
	}}
/>

<!-- With Trend Up -->
<Story
	name="With Trend Up"
	args={{
		value: '89.2%',
		label: 'Conversion Rate',
		variant: 'success',
		size: 'md',
		trend: 12.5,
		trendDirection: 'up'
	}}
/>

<!-- With Trend Down -->
<Story
	name="With Trend Down"
	args={{
		value: '45',
		label: 'Pending Tasks',
		variant: 'warning',
		size: 'md',
		trend: 8.3,
		trendDirection: 'down'
	}}
/>

<!-- With Icon -->
<Story
	name="With Icon"
	args={{
		value: '2,456',
		label: 'Total Orders',
		variant: 'info',
		size: 'md',
		icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
	}}
/>

<!-- Small Size -->
<Story
	name="Small Size"
	args={{
		value: '99.9%',
		label: 'Uptime',
		variant: 'success',
		size: 'sm',
		trend: 0.1,
		trendDirection: 'up'
	}}
/>

<!-- Large Size -->
<Story
	name="Large Size"
	args={{
		value: '$1.2M',
		label: 'Annual Revenue',
		variant: 'primary',
		size: 'lg',
		trend: 25.8,
		trendDirection: 'up',
		description: 'Compared to last year'
	}}
/>

<!-- Loading State -->
<Story
	name="Loading State"
	args={{
		value: '0',
		label: 'Processing...',
		variant: 'primary',
		size: 'md',
		loading: true
	}}
/>

<!-- Disabled State -->
<Story
	name="Disabled State"
	args={{
		value: 'N/A',
		label: 'Unavailable',
		variant: 'primary',
		size: 'md',
		disabled: true
	}}
/>

<!-- Playground (Required - Must be last) -->
<Story
	name="Playground"
	args={{
		value: '125,000',
		label: 'Total Revenue',
		variant: 'primary',
		size: 'md',
		trend: 12.5,
		trendDirection: 'up',
		icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		description: 'Compared to last month',
		loading: false,
		disabled: false
	}}
/>

<!-- Note: trendDirection control only works when trend prop has a value -->

