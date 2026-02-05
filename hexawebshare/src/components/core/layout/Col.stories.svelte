<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Col from './Col.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/Col',
		component: Col,
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
<Story name="Default" args={{ span: '6' }}>
	{#snippet children()}
		<div class="bg-primary text-primary-content rounded-lg p-4 text-center">
			Column span-6 (50% width)
		</div>
	{/snippet}
</Story>

<!-- Full Width (span-12) -->
<Story name="Full Width" args={{ span: '12' }}>
	{#snippet children()}
		<div class="bg-secondary text-secondary-content rounded-lg p-4 text-center">
			Column span-12 (100% width)
		</div>
	{/snippet}
</Story>

<!-- Quarter Width (span-3) -->
<Story name="Quarter Width" args={{ span: '3' }}>
	{#snippet children()}
		<div class="bg-accent text-accent-content rounded-lg p-4 text-center">
			Column span-3 (25% width)
		</div>
	{/snippet}
</Story>

<!-- One Third (span-4) -->
<Story name="One Third" args={{ span: '4' }}>
	{#snippet children()}
		<div class="bg-info text-info-content rounded-lg p-4 text-center">
			Column span-4 (33% width)
		</div>
	{/snippet}
</Story>

<!-- With Offset (start-5) -->
<Story name="With Offset" args={{ span: '4', start: '5' }}>
	{#snippet children()}
		<div class="bg-warning text-warning-content rounded-lg p-4 text-center">
			Column span-4 starting at position 5
		</div>
	{/snippet}
</Story>

<!-- Responsive -->
<Story name="Responsive" args={{ span: '12', sm: '6', md: '4', lg: '3' }}>
	{#snippet children()}
		<div class="bg-success text-success-content rounded-lg p-4 text-center">
			Responsive: Full → Half → Third → Quarter
		</div>
	{/snippet}
</Story>

<!-- Centered (start-4, span-6) -->
<Story name="Centered" args={{ span: '6', start: '4' }}>
	{#snippet children()}
		<div class="bg-error text-error-content rounded-lg p-4 text-center">
			Centered column (span-6, start-4)
		</div>
	{/snippet}
</Story>

<!-- Playground -->
<Story name="Playground" args={{ span: 'auto' }}>
	{#snippet children()}
		<div class="bg-neutral text-neutral-content rounded-lg p-4 text-center">
			Playground Column Content
		</div>
	{/snippet}
</Story>
