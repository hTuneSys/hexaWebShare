<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Row from './Row.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/Row',
		component: Row,
		tags: ['autodocs'],
		argTypes: {
			gap: {
				control: { type: 'select' },
				options: ['0', '1', '2', '4', '6', '8', '12']
			},
			align: {
				control: { type: 'select' },
				options: ['start', 'center', 'end', 'baseline', 'stretch']
			},
			justify: {
				control: { type: 'select' },
				options: ['start', 'center', 'end', 'between', 'around', 'evenly']
			},
			wrap: { control: 'boolean' }
		}
	});

	// Helper snippet for demo items
	// @ts-ignore
	const Box = (color = 'bg-primary') =>
		`<div class="${color} w-16 h-16 rounded flex items-center justify-center text-primary-content font-bold">Box</div>`;
</script>

<!-- Snippet for reusable box content -->
{#snippet boxes()}
	<div
		class="bg-primary text-primary-content flex h-16 w-16 items-center justify-center rounded font-bold"
	>
		1
	</div>
	<div
		class="bg-secondary text-secondary-content flex h-16 w-16 items-center justify-center rounded font-bold"
	>
		2
	</div>
	<div
		class="bg-accent text-accent-content flex h-16 w-16 items-center justify-center rounded font-bold"
	>
		3
	</div>
{/snippet}

<Story name="Default">
	<Row>
		{@render boxes()}
	</Row>
</Story>

<Story name="Gap Variants">
	<div class="flex flex-col gap-4">
		<div>
			<p class="mb-2 text-sm font-bold">Gap 0</p>
			<Row gap="0" class="bg-base-200 p-2">
				{@render boxes()}
			</Row>
		</div>
		<div>
			<p class="mb-2 text-sm font-bold">Gap 4 (Default)</p>
			<Row gap="4" class="bg-base-200 p-2">
				{@render boxes()}
			</Row>
		</div>
		<div>
			<p class="mb-2 text-sm font-bold">Gap 8</p>
			<Row gap="8" class="bg-base-200 p-2">
				{@render boxes()}
			</Row>
		</div>
	</div>
</Story>

<Story name="Align Items (Vertical)">
	<div class="flex flex-col gap-4">
		<div>
			<p class="mb-2 text-sm font-bold">Align Start</p>
			<Row align="start" class="bg-base-200 h-32 p-2">
				<div class="bg-primary flex h-12 w-16 items-center justify-center rounded">1</div>
				<div class="bg-secondary flex h-16 w-16 items-center justify-center rounded">2</div>
				<div class="bg-accent flex h-20 w-16 items-center justify-center rounded">3</div>
			</Row>
		</div>
		<div>
			<p class="mb-2 text-sm font-bold">Align Center</p>
			<Row align="center" class="bg-base-200 h-32 p-2">
				<div class="bg-primary flex h-12 w-16 items-center justify-center rounded">1</div>
				<div class="bg-secondary flex h-16 w-16 items-center justify-center rounded">2</div>
				<div class="bg-accent flex h-20 w-16 items-center justify-center rounded">3</div>
			</Row>
		</div>
		<div>
			<p class="mb-2 text-sm font-bold">Align End</p>
			<Row align="end" class="bg-base-200 h-32 p-2">
				<div class="bg-primary flex h-12 w-16 items-center justify-center rounded">1</div>
				<div class="bg-secondary flex h-16 w-16 items-center justify-center rounded">2</div>
				<div class="bg-accent flex h-20 w-16 items-center justify-center rounded">3</div>
			</Row>
		</div>
	</div>
</Story>

<Story name="Justify Content (Horizontal)">
	<div class="flex flex-col gap-4">
		<div>
			<p class="mb-2 text-sm font-bold">Justify Start</p>
			<Row justify="start" class="bg-base-200 w-full p-2">
				{@render boxes()}
			</Row>
		</div>
		<div>
			<p class="mb-2 text-sm font-bold">Justify Center</p>
			<Row justify="center" class="bg-base-200 w-full p-2">
				{@render boxes()}
			</Row>
		</div>
		<div>
			<p class="mb-2 text-sm font-bold">Justify Between</p>
			<Row justify="between" class="bg-base-200 w-full p-2">
				{@render boxes()}
			</Row>
		</div>
		<div>
			<p class="mb-2 text-sm font-bold">Justify Around</p>
			<Row justify="around" class="bg-base-200 w-full p-2">
				{@render boxes()}
			</Row>
		</div>
	</div>
</Story>

<Story name="Wrapping">
	<div class="bg-base-200 w-64 p-2">
		<Row wrap={true} gap="2">
			<div class="bg-primary flex h-16 w-16 items-center justify-center rounded">1</div>
			<div class="bg-secondary flex h-16 w-16 items-center justify-center rounded">2</div>
			<div class="bg-accent flex h-16 w-16 items-center justify-center rounded">3</div>
			<div class="bg-info flex h-16 w-16 items-center justify-center rounded">4</div>
			<div class="bg-success flex h-16 w-16 items-center justify-center rounded">5</div>
		</Row>
	</div>
</Story>
