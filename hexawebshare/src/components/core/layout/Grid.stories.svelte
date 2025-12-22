<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Grid from './Grid.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/Grid',
		component: Grid,
		tags: ['autodocs'],
		argTypes: {
			columns: {
				control: { type: 'select' },
				options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				description: 'Number of columns in the grid'
			},
			gap: {
				control: { type: 'select' },
				options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
				description: 'Gap between grid items'
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'filled', 'ghost'],
				description: 'Visual variant of the grid'
			},
			loading: { control: 'boolean', description: 'Loading state' },
			disabled: { control: 'boolean', description: 'Disabled state' },
			background: { control: 'boolean', description: 'Show background' },
			ariaLabel: { control: 'text', description: 'Accessible label' }
		}
	});
</script>

<!-- Default Story -->
<Story name="Default">
	<Grid columns={3} gap="md">
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<!-- Column Count Stories -->
<Story name="SingleColumn">
	<Grid columns={1} gap="md">
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="TwoColumns">
	<Grid columns={2} gap="md">
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="FourColumns">
	<Grid columns={4} gap="md">
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 7
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 8
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="SixColumns">
	<Grid columns={6} gap="md">
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="TwelveColumns">
	<Grid columns={12} gap="md">
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">1</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">2</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">3</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">4</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">5</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">6</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">7</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">8</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">9</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">10</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">11</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">12</div>
		{/snippet}
	</Grid>
</Story>

<!-- Gap Variants -->
<Story name="NoGap">
	<Grid columns={3} gap="none">
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="ExtraSmallGap">
	<Grid columns={3} gap="xs">
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="SmallGap">
	<Grid columns={3} gap="sm">
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="LargeGap">
	<Grid columns={3} gap="lg">
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="ExtraLargeGap">
	<Grid columns={3} gap="xl">
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="TwoXLGap">
	<Grid columns={3} gap="2xl">
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<!-- Variant Stories -->
<Story name="BorderedVariant">
	<Grid columns={3} gap="md" variant="bordered" background={true}>
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="FilledVariant">
	<Grid columns={3} gap="md" variant="filled" background={true}>
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="GhostVariant">
	<Grid columns={3} gap="md" variant="ghost" background={true}>
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<!-- State Stories -->
<Story name="LoadingState">
	<Grid columns={3} gap="md" loading={true}>
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="DisabledState">
	<Grid columns={3} gap="md" disabled={true}>
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<!-- Responsive Columns -->
<Story name="ResponsiveColumns">
	<Grid columns={1} gap="md" responsiveColumns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 7
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 8
			</div>
		{/snippet}
	</Grid>
</Story>

<!-- Background Examples -->
<Story name="WithBackground">
	<Grid columns={3} gap="md" variant="default" background={true}>
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>

<Story name="WithoutBackground">
	<Grid columns={3} gap="md" variant="default" background={false}>
		{#snippet children()}
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 1
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 2
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 3
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 4
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 5
			</div>
			<div class="bg-base-200 flex items-center justify-center rounded-lg p-4 text-center">
				Item 6
			</div>
		{/snippet}
	</Grid>
</Story>
