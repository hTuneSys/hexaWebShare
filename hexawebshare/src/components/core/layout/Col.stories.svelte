<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ColWrapper from './ColWrapper.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/Col',
		component: ColWrapper,
		tags: ['autodocs'],
		argTypes: {
			span: {
				control: { type: 'select' },
				options: ['auto', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'full'],
				description: 'Number of columns to span'
			},
			start: {
				control: { type: 'select' },
				options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'auto'],
				description: 'Column start position'
			},
			sm: {
				control: { type: 'select' },
				options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'full'],
				description: 'Column span at sm breakpoint (640px+)'
			},
			md: {
				control: { type: 'select' },
				options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'full'],
				description: 'Column span at md breakpoint (768px+)'
			},
			lg: {
				control: { type: 'select' },
				options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'full'],
				description: 'Column span at lg breakpoint (1024px+)'
			},
			xl: {
				control: { type: 'select' },
				options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'full'],
				description: 'Column span at xl breakpoint (1280px+)'
			},
			order: {
				control: { type: 'select' },
				options: [
					'first',
					'last',
					'none',
					'1',
					'2',
					'3',
					'4',
					'5',
					'6',
					'7',
					'8',
					'9',
					'10',
					'11',
					'12'
				],
				description: 'Order of the column'
			},
			align: {
				control: { type: 'select' },
				options: ['auto', 'start', 'center', 'end', 'stretch'],
				description: 'Self alignment within the grid cell'
			}
		}
	});
</script>

<!-- Default (span-6) -->
<Story
	name="Default"
	args={{
		span: '6'
	}}
/>

<!-- Full Width (span-12) -->
<Story
	name="Full Width"
	args={{
		span: '12'
	}}
/>

<!-- Half Width (span-6) -->
<Story
	name="Half Width"
	args={{
		span: '6'
	}}
/>

<!-- Quarter Width (span-3) -->
<Story
	name="Quarter Width"
	args={{
		span: '3'
	}}
/>

<!-- One Third (span-4) -->
<Story
	name="One Third"
	args={{
		span: '4'
	}}
/>

<!-- With Offset (start-5) -->
<Story
	name="With Offset"
	args={{
		span: '4',
		start: '5'
	}}
/>

<!-- Responsive -->
<Story
	name="Responsive"
	args={{
		span: '12',
		sm: '6',
		md: '4',
		lg: '3'
	}}
/>

<!-- Centered (start-4, span-6) -->
<Story
	name="Centered"
	args={{
		span: '6',
		start: '4'
	}}
/>
