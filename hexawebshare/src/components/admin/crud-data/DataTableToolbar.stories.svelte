<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DataTableToolbar from './DataTableToolbar.svelte';
	import { fn } from 'storybook/test';
	import Icon from '../../core/media/Icon.svelte';
	import Check from 'lucide-svelte/icons/check';

	const { Story } = defineMeta({
		title: 'Admin/CRUD Data/DataTableToolbar',
		component: DataTableToolbar,
		tags: ['autodocs'],
		argTypes: {
			searchValue: {
				control: 'text',
				description: 'Search input value (controlled)'
			},
			searchPlaceholder: {
				control: 'text',
				description: 'Search input placeholder text'
			},
			showSearch: {
				control: 'boolean',
				description: 'Whether search input is enabled'
			},
			searchSize: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Search input size'
			},
			searchDebounceMs: {
				control: 'number',
				description: 'Debounce delay for search in milliseconds'
			},
			searchOnType: {
				control: 'boolean',
				description: 'Whether to trigger search on every input change'
			},
			showFilter: {
				control: 'boolean',
				description: 'Whether to show filter button'
			},
			filterLabel: {
				control: 'text',
				description: 'Filter button label text'
			},
			showViewOptions: {
				control: 'boolean',
				description: 'Whether to show view options'
			},
			viewLabel: {
				control: 'text',
				description: 'View options label text'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Toolbar size'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the toolbar is disabled'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the toolbar is in loading state'
			},
			selectedCount: {
				control: 'number',
				description: 'Number of selected items (triggers bulk actions display)'
			},
			selectedLabel: {
				control: 'text',
				description: 'Selected items label text'
			},
			clearSelectionLabel: {
				control: 'text',
				description: 'Clear selection label text'
			},
			searchAriaLabel: {
				control: 'text',
				description: 'Search input ARIA label'
			},
			filterAriaLabel: {
				control: 'text',
				description: 'Filter button ARIA label'
			},
			viewAriaLabel: {
				control: 'text',
				description: 'View options ARIA label'
			},
			ariaLabel: {
				control: 'text',
				description: 'Toolbar ARIA label'
			},
			actions: {
				control: 'object',
				description: 'Action buttons to display'
			},
			bulkActions: {
				control: 'object',
				description: 'Bulk action buttons (shown when items are selected)'
			},
			filterOpen: {
				control: 'boolean',
				description: 'Whether filter dropdown is open (bindable)'
			},
			filterContent: {
				control: false,
				description: 'Custom filter content snippet'
			},
			viewOptions: {
				control: 'object',
				description: 'View options (density, column visibility, etc.)'
			},
			viewValue: {
				control: 'text',
				description: 'Selected view option value (bindable)'
			},
			onsearch: {
				control: false,
				description: 'Search event handler'
			},
			onViewChange: {
				control: false,
				description: 'View option change handler'
			},
			onClearSelection: {
				control: false,
				description: 'Clear selection handler'
			},
			onFilterApply: {
				control: false,
				description: 'Filter apply handler'
			},
			onFilterClear: {
				control: false,
				description: 'Filter clear/reset handler'
			},
			class: {
				control: 'text',
				description: 'Additional CSS classes'
			}
		},
		args: {
			onsearch: fn(),
			onViewChange: fn(),
			onClearSelection: fn(),
			onFilterApply: fn(),
			onFilterClear: fn(),
			searchPlaceholder: 'Search...',
			showSearch: true,
			searchSize: 'md',
			searchDebounceMs: 300,
			searchOnType: false,
			showFilter: false,
			filterLabel: 'Filter',
			showViewOptions: false,
			viewLabel: 'View',
			size: 'md',
			disabled: false,
			loading: false,
			selectedCount: 0,
			selectedLabel: 'selected',
			clearSelectionLabel: 'Clear selection',
			searchAriaLabel: 'Search table',
			filterAriaLabel: 'Filter table',
			viewAriaLabel: 'View options'
		},
		parameters: {
			docs: {
				description: {
					component:
						'A comprehensive toolbar component for data tables with search, actions, filters, and bulk operations. Built with Svelte 5 and DaisyUI.'
				}
			}
		}
	});
</script>

<script lang="ts">
	import type { ToolbarAction, BulkAction, ViewOption } from './DataTableToolbar.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Select from '../../core/forms/Select.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Tag from '../../core/media/Tag.svelte';
	import Input from '../../core/forms/Input.svelte';
	import Toast from '../../core/feedback/Toast.svelte';

	let defaultSearch = $state('');
	let withActionsSearch = $state('');
	let withBulkActionsSearch = $state('');
	let withFiltersSearch = $state('');
	let withViewOptionsSearch = $state('');
	let loadingSearch = $state('');
	let disabledSearch = $state('');
	let responsiveSearch = $state('');
	let customActionsSearch = $state('');
	let playgroundSearch = $state('');
	let playgroundFilterOpen = $state(true);
	let playgroundViewValue = $state('comfortable');

	// Filter and view state for stories
	let withFiltersFilterOpen = $state(true);
	let withViewOptionsViewValue = $state('comfortable');
	let appliedStatus = $state('all');
	let appliedCategory = $state('all');
	let showFiltersApplyToast = $state(false);
	let showFiltersResetToast = $state(false);

	// Tag filter state for story
	let tagFilterSearch = $state('');
	let selectedTags = $state<string[]>([]);
	let appliedTags = $state<string[]>([]);
	let tagFilterOpen = $state(true);
	let showApplyToast = $state(false);
	let showClearToast = $state(false);

	const availableTags = [
		'React',
		'Vue',
		'Svelte',
		'Angular',
		'TypeScript',
		'JavaScript',
		'Python',
		'Java',
		'C++',
		'Go',
		'Rust',
		'PHP',
		'Node.js',
		'Express',
		'Next.js',
		'Nuxt',
		'Django',
		'Flask',
		'Spring',
		'Laravel'
	];

	// Filter button variants (can be changed in stories)
	let applyButtonVariant:
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'neutral'
		| 'info'
		| 'success'
		| 'warning'
		| 'error'
		| 'ghost'
		| 'link' = 'primary';
	let resetButtonVariant:
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'neutral'
		| 'info'
		| 'success'
		| 'warning'
		| 'error'
		| 'ghost'
		| 'link' = 'ghost';

	// Callback functions for Storybook Actions panel
	const filterApplyCallback = fn();
	const filterClearCallback = fn();
	const tagFilterApplyCallback = fn();
	const tagFilterClearCallback = fn();

	// Handler functions for filter buttons (for Storybook Actions panel)
	function handleFilterApply() {
		showFiltersApplyToast = true;
		withFiltersFilterOpen = false;
		// Call DataTableToolbar's onFilterApply callback
		filterApplyCallback({ status: appliedStatus, category: appliedCategory });
		setTimeout(() => {
			showFiltersApplyToast = false;
		}, 3000);
	}

	function handleFilterReset() {
		appliedStatus = 'all';
		appliedCategory = 'all';
		showFiltersResetToast = true;
		withFiltersFilterOpen = false;
		// Call DataTableToolbar's onFilterClear callback
		filterClearCallback();
		setTimeout(() => {
			showFiltersResetToast = false;
		}, 3000);
	}

	function handleTagFilterApply() {
		if (selectedTags.length === 0) {
			alert('Please select at least one tag before applying filters.');
			return;
		}
		appliedTags = [...selectedTags];
		showApplyToast = true;
		tagFilterOpen = false;
		// Call DataTableToolbar's onFilterApply callback
		tagFilterApplyCallback({ tags: appliedTags });
		setTimeout(() => {
			showApplyToast = false;
		}, 3000);
	}

	function handleTagFilterClear() {
		selectedTags = [];
		appliedTags = [];
		tagFilterSearch = '';
		showClearToast = true;
		tagFilterOpen = false;
		// Call DataTableToolbar's onFilterClear callback
		tagFilterClearCallback();
		setTimeout(() => {
			showClearToast = false;
		}, 3000);
	}

	const sampleActions: ToolbarAction[] = [
		{
			label: 'Add',
			variant: 'primary',
			icon: 'add',
			onclick: fn()
		},
		{
			label: 'Export',
			variant: 'secondary',
			icon: 'export',
			onclick: fn()
		}
	];

	const multipleActions: ToolbarAction[] = [
		{
			label: 'Add User',
			variant: 'primary',
			icon: 'add',
			onclick: fn()
		},
		{
			label: 'Export',
			variant: 'secondary',
			icon: 'export',
			onclick: fn()
		},
		{
			label: 'Import',
			variant: 'accent',
			icon: 'import',
			onclick: fn()
		},
		{
			label: 'Refresh',
			variant: 'ghost',
			icon: 'refresh',
			onclick: fn()
		}
	];

	const bulkActions: BulkAction[] = [
		{
			label: 'Delete Selected',
			variant: 'error',
			onclick: fn()
		},
		{
			label: 'Export Selected',
			variant: 'secondary',
			onclick: fn()
		},
		{
			label: 'Archive Selected',
			variant: 'primary',
			onclick: fn()
		},
		{
			label: 'Mark as Read',
			variant: 'primary',
			onclick: fn()
		}
	];

	const viewOptions: ViewOption[] = [
		{ value: 'compact', label: 'Compact' },
		{ value: 'comfortable', label: 'Comfortable' },
		{ value: 'spacious', label: 'Spacious' }
	];

	const customActions: ToolbarAction[] = [
		{
			label: 'Custom Action 1',
			variant: 'primary',
			onclick: fn()
		},
		{
			label: 'Custom Action 2',
			variant: 'secondary',
			outline: true,
			onclick: fn()
		}
	];
</script>

<!-- Filter Content Snippet (defined at file level for reuse) -->
{#snippet filterContentSnippet()}
	<div class="min-w-72 space-y-4 p-4">
		<Text text="Filter Options" weight="bold" size="base" display="block" class="mb-2" />
		<div>
			<Select
				value={appliedStatus}
				options={[
					{ value: 'all', label: 'All Status' },
					{ value: 'active', label: 'Active' },
					{ value: 'inactive', label: 'Inactive' },
					{ value: 'pending', label: 'Pending' }
				]}
				size="sm"
				ariaLabel="Status filter"
				class="w-full min-w-52"
				onchange={(e) => {
					appliedStatus = (e.target as HTMLSelectElement).value;
				}}
			/>
		</div>
		<div>
			<Select
				value={appliedCategory}
				options={[
					{ value: 'all', label: 'All Categories' },
					{ value: 'cat1', label: 'Category 1' },
					{ value: 'cat2', label: 'Category 2' },
					{ value: 'cat3', label: 'Category 3' }
				]}
				size="sm"
				ariaLabel="Category filter"
				class="w-full min-w-52"
				onchange={(e) => {
					appliedCategory = (e.target as HTMLSelectElement).value;
				}}
			/>
		</div>
		<div class="flex gap-2 pt-2">
			<Button label="Apply" variant="primary" size="sm" onclick={handleFilterApply} />
			<Button label="Reset" variant="ghost" size="sm" onclick={handleFilterReset} />
		</div>
	</div>
{/snippet}

<!-- Tag Filter Content Snippet (with search and removable tags) -->
{#snippet tagFilterContentSnippet()}
	<div class="min-w-80 space-y-4 p-4">
		<Text text="Filter by Tags" weight="bold" size="base" display="block" class="mb-2" />

		<!-- Search Input -->
		<div>
			<Input
				placeholder="Search tags..."
				size="sm"
				value={tagFilterSearch}
				oninput={(e) => {
					tagFilterSearch = (e.target as HTMLInputElement).value;
				}}
				ariaLabel="Search tags"
				class="w-full"
			/>
		</div>

		<!-- Selected Tags Display -->
		{#if selectedTags.length > 0}
			<div class="space-y-2">
				<Text text="Selected Tags" weight="semibold" size="sm" display="block" />
				<div class="flex flex-wrap gap-2">
					{#each selectedTags as tag (tag)}
						<!-- 
							NOTE: Raw HTML div is intentional here.
							TECHNICAL REASON: Event propagation must be stopped to prevent Dropdown from closing when Tag is clicked.
							Tag component's onclick prop doesn't receive event parameter, so wrapper div is needed for stopPropagation().
							CONSEQUENCE: Without this wrapper, clicking Tag would trigger Dropdown's closeOnSelect behavior.
							VALIDATION: Dropdown component closes on any click inside when closeOnSelect is true.
						-->
						<div role="none" tabindex="-1" onclick={(e) => e.stopPropagation()}>
							<Tag
								label={tag}
								variant="primary"
								size="sm"
								removable={true}
								onRemove={() => {
									selectedTags = selectedTags.filter((t) => t !== tag);
								}}
								removeLabel="Remove {tag}"
							/>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Available Tags List -->
		<div class="space-y-2">
			<Text text="Available Tags" weight="semibold" size="sm" display="block" />
			<div class="border-base-300 rounded-box max-h-48 overflow-y-auto border p-2">
				<div class="flex flex-wrap gap-2">
					{#each availableTags.filter((tag) => !selectedTags.includes(tag) && (tagFilterSearch === '' || tag
									.toLowerCase()
									.includes(tagFilterSearch.toLowerCase()))) as tag (tag)}
						<!-- 
							NOTE: Raw HTML div is intentional here.
							TECHNICAL REASON: Event propagation must be stopped to prevent Dropdown from closing when Tag is clicked.
							Tag component's onclick prop doesn't receive event parameter, so wrapper div is needed for stopPropagation().
							CONSEQUENCE: Without this wrapper, clicking Tag would trigger Dropdown's closeOnSelect behavior.
							VALIDATION: Dropdown component closes on any click inside when closeOnSelect is true.
						-->
						<div role="none" tabindex="-1" onclick={(e) => e.stopPropagation()}>
							<Tag
								label={tag}
								variant="neutral"
								size="sm"
								clickable={true}
								onclick={() => {
									if (!selectedTags.includes(tag)) {
										selectedTags = [...selectedTags, tag];
									}
								}}
								ariaLabel="Select {tag}"
							/>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="border-base-300 flex gap-2 border-t pt-2">
			<Button label="Apply" variant="primary" size="sm" onclick={handleTagFilterApply} />
			<Button label="Clear All" variant="ghost" size="sm" onclick={handleTagFilterClear} />
		</div>
	</div>
{/snippet}

<!-- Default Story -->
<Story name="Default" args={{}}>
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl">
				<DataTableToolbar
					bind:searchValue={defaultSearch}
					searchPlaceholder="Search..."
					showSearch={true}
					showFilter={true}
					searchSize="md"
					size="md"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<!-- With Actions Story -->
<Story name="With Actions" args={{ actions: sampleActions }}>
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl">
				<DataTableToolbar
					bind:searchValue={withActionsSearch}
					actions={sampleActions}
					searchPlaceholder="Search..."
					showSearch={true}
					showFilter={true}
					searchSize="md"
					size="md"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<!-- With Bulk Actions Story -->
<Story
	name="With Bulk Actions"
	args={{
		actions: sampleActions,
		bulkActions: bulkActions,
		selectedCount: 5
	}}
>
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl">
				<DataTableToolbar
					bind:searchValue={withBulkActionsSearch}
					actions={sampleActions}
					{bulkActions}
					selectedCount={5}
					searchPlaceholder="Search..."
					showSearch={true}
					showFilter={true}
					searchSize="md"
					size="md"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<!-- With Filters Story -->
<Story
	name="With Filters"
	args={{
		showFilter: true,
		filterContent: filterContentSnippet,
		onFilterApply: filterApplyCallback,
		onFilterClear: filterClearCallback
	}}
>
	{#snippet children()}
		{#snippet customFilterContent()}
			<div class="min-w-72 space-y-4 p-4">
				<Text text="Filter Options" weight="bold" size="base" display="block" class="mb-2" />
				<div>
					<Select
						value={appliedStatus}
						options={[
							{ value: 'all', label: 'All Status' },
							{ value: 'active', label: 'Active' },
							{ value: 'inactive', label: 'Inactive' },
							{ value: 'pending', label: 'Pending' }
						]}
						size="sm"
						ariaLabel="Status filter"
						class="w-full min-w-52"
						onchange={(e) => {
							appliedStatus = (e.target as HTMLSelectElement).value;
						}}
					/>
				</div>
				<div>
					<Select
						value={appliedCategory}
						options={[
							{ value: 'all', label: 'All Categories' },
							{ value: 'cat1', label: 'Category 1' },
							{ value: 'cat2', label: 'Category 2' },
							{ value: 'cat3', label: 'Category 3' }
						]}
						size="sm"
						ariaLabel="Category filter"
						class="w-full min-w-52"
						onchange={(e) => {
							appliedCategory = (e.target as HTMLSelectElement).value;
						}}
					/>
				</div>
				<div class="flex gap-2 pt-2">
					<Button
						label="Apply"
						variant={applyButtonVariant}
						size="sm"
						class="flex-1"
						onclick={handleFilterApply}
					/>
					<Button
						label="Reset"
						variant={resetButtonVariant}
						size="sm"
						class="flex-1"
						onclick={handleFilterReset}
					/>
				</div>
			</div>
		{/snippet}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl space-y-4">
				<DataTableToolbar
					bind:searchValue={withFiltersSearch}
					showFilter={true}
					bind:filterOpen={withFiltersFilterOpen}
					filterContent={customFilterContent}
					searchPlaceholder="Search..."
					showSearch={true}
					searchSize="md"
					size="md"
					filterLabel="Filter"
					onFilterApply={filterApplyCallback}
					onFilterClear={filterClearCallback}
				/>

				<!-- Applied Filters Display -->
				{#if appliedStatus !== 'all' || appliedCategory !== 'all'}
					<div
						class="bg-success/10 border-success rounded-box border-2 p-4 transition-all duration-300"
					>
						<div class="mb-2 flex items-center gap-2">
							<Text
								text="✓ Filters Applied Successfully"
								weight="bold"
								size="base"
								display="block"
								class="text-success"
							/>
						</div>
						<Text
							text="Applied Filters:"
							weight="semibold"
							size="sm"
							display="block"
							class="mb-2"
						/>
						<div class="flex flex-wrap gap-2">
							{#if appliedStatus !== 'all'}
								<Tag label={`Status: ${appliedStatus}`} variant="primary" size="sm" />
							{/if}
							{#if appliedCategory !== 'all'}
								<Tag label={`Category: ${appliedCategory}`} variant="primary" size="sm" />
							{/if}
						</div>
					</div>
				{:else}
					<div class="bg-base-200 rounded-box border-base-300 border p-4">
						<Text
							text="No filters applied"
							weight="normal"
							size="sm"
							display="block"
							class="text-base-content/60"
						/>
					</div>
				{/if}
			</div>

			<!-- Toast Notifications -->
			{#if showFiltersApplyToast}
				<Toast
					title="Filters Applied"
					message={appliedStatus !== 'all' || appliedCategory !== 'all'
						? 'Filters have been applied successfully'
						: 'No filters selected'}
					variant="success"
					position="top-right"
					duration={3000}
					showIcon={true}
					closable={true}
					onDismiss={() => {
						showFiltersApplyToast = false;
					}}
				/>
			{/if}

			{#if showFiltersResetToast}
				<Toast
					title="Filters Reset"
					message="All filters have been reset"
					variant="info"
					position="top-right"
					duration={3000}
					showIcon={true}
					closable={true}
					onDismiss={() => {
						showFiltersResetToast = false;
					}}
				/>
			{/if}
		</div>
	{/snippet}
</Story>

<!-- With View Options Story -->
<Story
	name="With View Options"
	args={{
		actions: sampleActions,
		showViewOptions: true,
		viewOptions: viewOptions
	}}
>
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl">
				<DataTableToolbar
					bind:searchValue={withViewOptionsSearch}
					actions={sampleActions}
					showViewOptions={true}
					{viewOptions}
					bind:viewValue={withViewOptionsViewValue}
					searchPlaceholder="Search..."
					showSearch={true}
					showFilter={true}
					searchSize="md"
					size="md"
					viewLabel="View"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<!-- With Tag Filter Story -->
<Story
	name="With Tag Filter"
	args={{
		showFilter: true,
		filterContent: tagFilterContentSnippet,
		onFilterApply: tagFilterApplyCallback,
		onFilterClear: tagFilterClearCallback,
		filterCloseOnSelect: false
	}}
>
	{#snippet children()}
		{#snippet customTagFilterContent()}
			<div class="min-w-80 space-y-4 p-4">
				<Text text="Filter by Tags" weight="bold" size="base" display="block" class="mb-2" />

				<!-- Search Input -->
				<div>
					<Input
						placeholder="Search tags..."
						size="sm"
						value={tagFilterSearch}
						oninput={(e) => {
							tagFilterSearch = (e.target as HTMLInputElement).value;
						}}
						ariaLabel="Search tags"
						class="w-full"
					/>
				</div>

				<!-- Selected Tags Display -->
				{#if selectedTags.length > 0}
					<div class="space-y-2">
						<Text text="Selected Tags" weight="semibold" size="sm" display="block" />
						<div class="flex flex-wrap gap-2">
							{#each selectedTags as tag (tag)}
								<Tag
									label={tag}
									variant="primary"
									size="sm"
									removable={true}
									onRemove={() => {
										selectedTags = selectedTags.filter((t) => t !== tag);
									}}
									removeLabel="Remove {tag}"
								/>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Available Tags List -->
				<div class="space-y-2">
					<Text text="Available Tags" weight="semibold" size="sm" display="block" />
					<div class="border-base-300 rounded-box max-h-48 overflow-y-auto border p-2">
						<div class="flex flex-wrap gap-2">
							{#each availableTags.filter((tag) => !selectedTags.includes(tag) && (tagFilterSearch === '' || tag
											.toLowerCase()
											.includes(tagFilterSearch.toLowerCase()))) as tag (tag)}
								<Tag
									label={tag}
									variant="neutral"
									size="sm"
									clickable={true}
									onclick={() => {
										if (!selectedTags.includes(tag)) {
											selectedTags = [...selectedTags, tag];
										}
									}}
									ariaLabel="Select {tag}"
								/>
							{/each}
						</div>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="border-base-300 flex gap-2 border-t pt-2">
					<Button
						label="Apply"
						variant={applyButtonVariant}
						size="sm"
						class="flex-1"
						onclick={handleTagFilterApply}
					/>
					<Button
						label="Clear All"
						variant={resetButtonVariant}
						size="sm"
						class="flex-1"
						onclick={handleTagFilterClear}
					/>
				</div>
			</div>
		{/snippet}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl space-y-4">
				<DataTableToolbar
					bind:searchValue={defaultSearch}
					showFilter={true}
					bind:filterOpen={tagFilterOpen}
					filterContent={customTagFilterContent}
					searchPlaceholder="Search..."
					showSearch={true}
					searchSize="md"
					size="md"
					filterLabel="Filter by Tags"
					onFilterApply={tagFilterApplyCallback}
					onFilterClear={tagFilterClearCallback}
				/>

				<!-- Applied Filters Display -->
				{#if appliedTags.length > 0}
					<div class="bg-success border-success rounded-box border-2 p-4 shadow-lg">
						<div class="mb-3 flex items-center gap-2">
							<Icon size="sm" ariaHidden={true}>
								<Check />
							</Icon>
							<Text
								text="Filters Applied Successfully!"
								weight="bold"
								size="lg"
								display="block"
								class="text-success-content"
							/>
						</div>
						<Text
							text="Applied Filters:"
							weight="semibold"
							size="sm"
							display="block"
							class="text-success-content/90 mb-2"
						/>
						<div class="flex flex-wrap gap-2">
							{#each appliedTags as tag (tag)}
								<Tag label={tag} variant="primary" size="sm" />
							{/each}
						</div>
					</div>
				{:else}
					<div class="bg-base-200 rounded-box border-base-300 border p-4">
						<Text
							text="No filters applied. Select tags and click Apply button."
							weight="normal"
							size="sm"
							display="block"
							class="text-base-content/60"
						/>
					</div>
				{/if}
			</div>

			<!-- Toast Notifications -->
			{#if showApplyToast}
				<Toast
					title="Filters Applied"
					message={appliedTags.length > 0
						? `Applied ${appliedTags.length} filter${appliedTags.length > 1 ? 's' : ''}`
						: 'No filters selected'}
					variant="success"
					position="top-right"
					duration={3000}
					showIcon={true}
					closable={true}
					onDismiss={() => {
						showApplyToast = false;
					}}
				/>
			{/if}

			{#if showClearToast}
				<Toast
					title="Filters Cleared"
					message="All filters have been cleared"
					variant="info"
					position="top-right"
					duration={3000}
					showIcon={true}
					closable={true}
					onDismiss={() => {
						showClearToast = false;
					}}
				/>
			{/if}
		</div>
	{/snippet}
</Story>

<!-- Loading State Story -->
<Story name="Loading State" args={{ actions: sampleActions, loading: true }}>
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl">
				<DataTableToolbar
					bind:searchValue={loadingSearch}
					actions={sampleActions}
					loading={true}
					searchPlaceholder="Search..."
					showSearch={true}
					showFilter={true}
					searchSize="md"
					size="md"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Disabled State Story -->
<Story name="Disabled State" args={{ actions: sampleActions, disabled: true }}>
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl">
				<DataTableToolbar
					bind:searchValue={disabledSearch}
					actions={sampleActions}
					disabled={true}
					searchPlaceholder="Search..."
					showSearch={true}
					showFilter={true}
					searchSize="md"
					size="md"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Multiple Actions Story -->
<Story name="Multiple Actions" args={{ actions: multipleActions }}>
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl">
				<DataTableToolbar
					bind:searchValue={customActionsSearch}
					actions={multipleActions}
					searchPlaceholder="Search..."
					showSearch={true}
					showFilter={true}
					searchSize="md"
					size="md"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Small Size Story -->
<Story name="Small Size" args={{ actions: sampleActions, size: 'sm', searchSize: 'sm' }}>
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl">
				<DataTableToolbar
					bind:searchValue={defaultSearch}
					actions={sampleActions}
					showFilter={true}
					size="sm"
					searchSize="sm"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Playground Story (Required - Must be last) -->
<Story
	name="Playground"
	args={{
		showFilter: true,
		filterContent: filterContentSnippet
	}}
>
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl">
				<DataTableToolbar
					bind:searchValue={playgroundSearch}
					bind:filterOpen={playgroundFilterOpen}
					bind:viewValue={playgroundViewValue}
					searchPlaceholder="Search..."
					showSearch={true}
					searchSize="md"
					selectedCount={0}
					showFilter={true}
					filterContent={filterContentSnippet}
					showViewOptions={false}
					size="md"
					disabled={false}
					loading={false}
					actions={sampleActions}
					{bulkActions}
					{viewOptions}
				/>
			</div>
		</div>
	{/snippet}
</Story>
