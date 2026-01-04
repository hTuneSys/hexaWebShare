<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FilterPanel from './FilterPanel.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Utility/FilterPanel',
		component: FilterPanel,
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: 'text',
				description: 'Panel title text'
			},
			variant: {
				control: { type: 'select' },
				options: [
					undefined,
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the panel'
			},
			bordered: {
				control: 'boolean',
				description: 'Add border to the panel'
			},
			compact: {
				control: 'boolean',
				description: 'Compact panel with reduced padding'
			},
			shadow: {
				control: 'boolean',
				description: 'Add shadow to the panel'
			},
			shadowSize: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg', 'xl', '2xl'],
				description: 'Shadow size'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the panel is in loading state'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the panel is disabled'
			},
			showApplyButton: {
				control: 'boolean',
				description: 'Show apply button'
			},
			showResetButton: {
				control: 'boolean',
				description: 'Show reset button'
			},
			showClearButton: {
				control: 'boolean',
				description: 'Show clear button'
			},
			applyLabel: {
				control: 'text',
				description: 'Apply button label'
			},
			resetLabel: {
				control: 'text',
				description: 'Reset button label'
			},
			clearLabel: {
				control: 'text',
				description: 'Clear button label'
			},
			error: {
				control: 'text',
				description: 'Error message to display'
			},
			helpText: {
				control: 'text',
				description: 'Helper text or description'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			}
		},
		args: {
			onapply: fn(),
			onreset: fn(),
			onclear: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story
	name="Default"
	args={{
		title: 'Filter Products',
		showApplyButton: true,
		showResetButton: true
	}}
>
	{#snippet children()}
		<div>
			<h3 class="mb-3 font-semibold">Category</h3>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" checked />
					<span class="label-text">Electronics</span>
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" />
					<span class="label-text">Clothing</span>
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" />
					<span class="label-text">Books</span>
				</label>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Primary Variant"
	args={{
		title: 'Filter Options',
		variant: 'primary',
		showApplyButton: true,
		showResetButton: true
	}}
>
	{#snippet children()}
		<div>
			<h3 class="mb-3 font-semibold">Price Range</h3>
			<input type="range" min="0" max="1000" value="500" class="range range-primary" />
			<div class="flex w-full justify-between px-2 text-xs">
				<span>$0</span>
				<span>$500</span>
				<span>$1000</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="With Multiple Filters"
	args={{
		title: 'Advanced Filters',
		showApplyButton: true,
		showResetButton: true,
		showClearButton: true
	}}
>
	{#snippet children()}
		<div>
			<h3 class="mb-3 font-semibold">Category</h3>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" checked />
					<span class="label-text">Electronics</span>
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" />
					<span class="label-text">Clothing</span>
				</label>
			</div>
		</div>
		<div>
			<h3 class="mb-3 font-semibold">Price Range</h3>
			<input type="range" min="0" max="1000" value="500" class="range range-primary" />
			<div class="flex w-full justify-between px-2 text-xs">
				<span>$0</span>
				<span>$500</span>
				<span>$1000</span>
			</div>
		</div>
		<div>
			<h3 class="mb-3 font-semibold">Rating</h3>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="radio" name="rating" class="radio radio-primary" checked />
					<span class="label-text">4+ Stars</span>
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="radio" name="rating" class="radio radio-primary" />
					<span class="label-text">3+ Stars</span>
				</label>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Compact Size"
	args={{
		title: 'Quick Filters',
		compact: true,
		showApplyButton: true,
		showResetButton: true
	}}
>
	{#snippet children()}
		<div>
			<h3 class="mb-2 text-sm font-semibold">Status</h3>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2 py-1">
					<input type="checkbox" class="checkbox checkbox-sm checkbox-primary" checked />
					<span class="label-text text-sm">Active</span>
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2 py-1">
					<input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
					<span class="label-text text-sm">Inactive</span>
				</label>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Loading State"
	args={{
		title: 'Filter Products',
		loading: true
	}}
/>

<Story
	name="Disabled State"
	args={{
		title: 'Filter Products',
		disabled: true,
		showApplyButton: true,
		showResetButton: true
	}}
>
	{#snippet children()}
		<div>
			<h3 class="mb-3 font-semibold">Category</h3>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" checked disabled />
					<span class="label-text">Electronics</span>
				</label>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="With Error"
	args={{
		title: 'Filter Products',
		error: 'Unable to load filter options. Please try again later.',
		showApplyButton: true,
		showResetButton: true
	}}
>
	{#snippet children()}
		<div>
			<h3 class="mb-3 font-semibold">Category</h3>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" />
					<span class="label-text">Electronics</span>
				</label>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="With Help Text"
	args={{
		title: 'Filter Products',
		helpText: 'Select one or more filters to narrow down your search results.',
		showApplyButton: true,
		showResetButton: true
	}}
>
	{#snippet children()}
		<div>
			<h3 class="mb-3 font-semibold">Category</h3>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" checked />
					<span class="label-text">Electronics</span>
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" />
					<span class="label-text">Clothing</span>
				</label>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="No Action Buttons"
	args={{
		title: 'Filter Options',
		showApplyButton: false,
		showResetButton: false,
		showClearButton: false
	}}
>
	{#snippet children()}
		<div>
			<h3 class="mb-3 font-semibold">Category</h3>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" checked />
					<span class="label-text">Electronics</span>
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" />
					<span class="label-text">Clothing</span>
				</label>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Header Actions">
	<FilterPanel
		title="Filter Products"
		showApplyButton={true}
		showResetButton={true}
		onapply={fn()}
		onreset={fn()}
		onclear={fn()}
	>
		{#snippet headerActions()}
			<button type="button" class="btn btn-ghost btn-sm" aria-label="Collapse filters">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		{/snippet}
		{#snippet children()}
			<div>
				<h3 class="mb-3 font-semibold">Category</h3>
				<div class="form-control">
					<label class="label cursor-pointer justify-start gap-2">
						<input type="checkbox" class="checkbox checkbox-primary" checked />
						<span class="label-text">Electronics</span>
					</label>
				</div>
				<div class="form-control">
					<label class="label cursor-pointer justify-start gap-2">
						<input type="checkbox" class="checkbox checkbox-primary" />
						<span class="label-text">Clothing</span>
					</label>
				</div>
			</div>
		{/snippet}
	</FilterPanel>
</Story>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		title: 'Filter Products',
		variant: undefined,
		bordered: true,
		compact: false,
		shadow: true,
		shadowSize: 'md',
		loading: false,
		disabled: false,
		showApplyButton: true,
		showResetButton: true,
		showClearButton: false,
		applyLabel: 'Apply Filters',
		resetLabel: 'Reset',
		clearLabel: 'Clear All',
		error: undefined,
		helpText: undefined,
		ariaLabel: undefined,
		onapply: fn(),
		onreset: fn(),
		onclear: fn()
	}}
>
	{#snippet children()}
		<div>
			<h3 class="mb-3 font-semibold">Category</h3>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" checked />
					<span class="label-text">Electronics</span>
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" />
					<span class="label-text">Clothing</span>
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" />
					<span class="label-text">Books</span>
				</label>
			</div>
		</div>
		<div>
			<h3 class="mb-3 font-semibold">Price Range</h3>
			<input type="range" min="0" max="1000" value="500" class="range range-primary" />
			<div class="flex w-full justify-between px-2 text-xs">
				<span>$0</span>
				<span>$500</span>
				<span>$1000</span>
			</div>
		</div>
	{/snippet}
</Story>
