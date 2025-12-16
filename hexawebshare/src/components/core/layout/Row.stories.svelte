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
		class="flex h-16 w-16 items-center justify-center rounded bg-primary font-bold text-primary-content"
	>
		1
	</div>
	<div
		class="flex h-16 w-16 items-center justify-center rounded bg-secondary font-bold text-secondary-content"
	>
		2
	</div>
	<div
		class="flex h-16 w-16 items-center justify-center rounded bg-accent font-bold text-accent-content"
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
			<Row align="start" class="h-32 bg-base-200 p-2">
				<div class="flex h-12 w-16 items-center justify-center rounded bg-primary">1</div>
				<div class="flex h-16 w-16 items-center justify-center rounded bg-secondary">2</div>
				<div class="flex h-20 w-16 items-center justify-center rounded bg-accent">3</div>
			</Row>
		</div>
		<div>
			<p class="mb-2 text-sm font-bold">Align Center</p>
			<Row align="center" class="h-32 bg-base-200 p-2">
				<div class="flex h-12 w-16 items-center justify-center rounded bg-primary">1</div>
				<div class="flex h-16 w-16 items-center justify-center rounded bg-secondary">2</div>
				<div class="flex h-20 w-16 items-center justify-center rounded bg-accent">3</div>
			</Row>
		</div>
		<div>
			<p class="mb-2 text-sm font-bold">Align End</p>
			<Row align="end" class="h-32 bg-base-200 p-2">
				<div class="flex h-12 w-16 items-center justify-center rounded bg-primary">1</div>
				<div class="flex h-16 w-16 items-center justify-center rounded bg-secondary">2</div>
				<div class="flex h-20 w-16 items-center justify-center rounded bg-accent">3</div>
			</Row>
		</div>
	</div>
</Story>

<Story name="Justify Content (Horizontal)">
	<div class="flex flex-col gap-4">
		<div>
			<p class="mb-2 text-sm font-bold">Justify Start</p>
			<Row justify="start" class="w-full bg-base-200 p-2">
				{@render boxes()}
			</Row>
		</div>
		<div>
			<p class="mb-2 text-sm font-bold">Justify Center</p>
			<Row justify="center" class="w-full bg-base-200 p-2">
				{@render boxes()}
			</Row>
		</div>
		<div>
			<p class="mb-2 text-sm font-bold">Justify Between</p>
			<Row justify="between" class="w-full bg-base-200 p-2">
				{@render boxes()}
			</Row>
		</div>
		<div>
			<p class="mb-2 text-sm font-bold">Justify Around</p>
			<Row justify="around" class="w-full bg-base-200 p-2">
				{@render boxes()}
			</Row>
		</div>
	</div>
</Story>

<Story name="Wrapping">
	<div class="w-64 bg-base-200 p-2">
		<Row wrap={true} gap="2">
			<div class="flex h-16 w-16 items-center justify-center rounded bg-primary">1</div>
			<div class="flex h-16 w-16 items-center justify-center rounded bg-secondary">2</div>
			<div class="flex h-16 w-16 items-center justify-center rounded bg-accent">3</div>
			<div class="flex h-16 w-16 items-center justify-center rounded bg-info">4</div>
			<div class="flex h-16 w-16 items-center justify-center rounded bg-success">5</div>
		</Row>
	</div>
</Story>
