<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Col from './Col.svelte';

	interface Props {
		/**
		 * Number of columns to span (1-12)
		 * @default 'auto'
		 */
		span?:
			| 'auto'
			| '1'
			| '2'
			| '3'
			| '4'
			| '5'
			| '6'
			| '7'
			| '8'
			| '9'
			| '10'
			| '11'
			| '12'
			| 'full';

		/**
		 * Column start position (1-13)
		 * @default undefined
		 */
		start?:
			| '1'
			| '2'
			| '3'
			| '4'
			| '5'
			| '6'
			| '7'
			| '8'
			| '9'
			| '10'
			| '11'
			| '12'
			| '13'
			| 'auto';

		/**
		 * Column span at sm breakpoint (640px+)
		 * @default undefined
		 */
		sm?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full';

		/**
		 * Column span at md breakpoint (768px+)
		 * @default undefined
		 */
		md?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full';

		/**
		 * Column span at lg breakpoint (1024px+)
		 * @default undefined
		 */
		lg?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full';

		/**
		 * Column span at xl breakpoint (1280px+)
		 * @default undefined
		 */
		xl?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full';

		/**
		 * Order of the column in the grid
		 * @default undefined
		 */
		order?:
			| 'first'
			| 'last'
			| 'none'
			| '1'
			| '2'
			| '3'
			| '4'
			| '5'
			| '6'
			| '7'
			| '8'
			| '9'
			| '10'
			| '11'
			| '12';

		/**
		 * Self alignment within the grid cell
		 * @default undefined
		 */
		align?: 'auto' | 'start' | 'center' | 'end' | 'stretch';
	}

	const { span = 'auto', start, sm, md, lg, xl, order, align }: Props = $props();
</script>

<div class="bg-base-200 rounded p-4">
	<div class="grid grid-cols-12 gap-2">
		<Col {span} {start} {sm} {md} {lg} {xl} {order} {align}>
			<div
				class="bg-primary text-primary-content flex min-h-16 items-center justify-center rounded p-4 font-bold"
			>
				Column Content
			</div>
		</Col>
	</div>
	<div class="mt-4 text-sm">
		<p class="text-base-content/70">
			<strong>Current props:</strong> span={span}{start ? `, start=${start}` : ''}{sm
				? `, sm=${sm}`
				: ''}{md ? `, md=${md}` : ''}{lg ? `, lg=${lg}` : ''}{xl ? `, xl=${xl}` : ''}{order
				? `, order=${order}`
				: ''}{align ? `, align=${align}` : ''}
		</p>
	</div>
</div>
