<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DataTableToolbar from './DataTableToolbar.svelte';
	import { fn } from 'storybook/test';

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
			class: {
				control: 'text',
				description: 'Additional CSS classes'
			}
		},
		args: {
			onsearch: fn(),
			onViewChange: fn(),
			onClearSelection: fn(),
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
	
	// Tag filter state for story
	let tagFilterSearch = $state('');
	let selectedTags = $state<string[]>([]);
	let tagFilterOpen = $state(true);
	
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
	<div class="p-4 space-y-4 min-w-64">
		<Text text="Filter Options" weight="bold" size="base" display="block" class="mb-2" />
		<div>
			<Select
				options={[
					{ value: 'all', label: 'All Status' },
					{ value: 'active', label: 'Active' },
					{ value: 'inactive', label: 'Inactive' },
					{ value: 'pending', label: 'Pending' }
				]}
				size="sm"
				ariaLabel="Status filter"
				class="w-full"
			/>
		</div>
		<div>
			<Select
				options={[
					{ value: 'all', label: 'All Categories' },
					{ value: 'cat1', label: 'Category 1' },
					{ value: 'cat2', label: 'Category 2' },
					{ value: 'cat3', label: 'Category 3' }
				]}
				size="sm"
				ariaLabel="Category filter"
				class="w-full"
			/>
		</div>
		<div class="flex gap-2 pt-2">
			<Button label="Apply" variant="primary" size="sm" class="flex-1" onclick={fn()} />
			<Button label="Reset" variant="ghost" size="sm" class="flex-1" onclick={fn()} />
		</div>
	</div>
{/snippet}

<!-- Tag Filter Content Snippet (with search and removable tags) -->
{#snippet tagFilterContentSnippet()}
	<div class="p-4 space-y-4 min-w-80">
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
			<div class="max-h-48 overflow-y-auto border border-base-300 rounded-box p-2">
				<div class="flex flex-wrap gap-2">
					{#each availableTags.filter((tag) => 
						!selectedTags.includes(tag) && 
						(tagFilterSearch === '' || tag.toLowerCase().includes(tagFilterSearch.toLowerCase()))
					) as tag (tag)}
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
		<div class="flex gap-2 pt-2 border-t border-base-300">
			<Button 
				label="Apply" 
				variant="primary" 
				size="sm" 
				class="flex-1" 
				onclick={fn()} 
			/>
			<Button 
				label="Clear All" 
				variant="ghost" 
				size="sm" 
				class="flex-1" 
				onclick={() => {
					selectedTags = [];
					tagFilterSearch = '';
				}} 
			/>
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
					bulkActions={bulkActions}
					selectedCount={5}
					searchPlaceholder="Search..."
					showSearch={true}
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
		filterContent: filterContentSnippet
	}}
>
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl">
				<DataTableToolbar
					bind:searchValue={withFiltersSearch}
					showFilter={true}
					bind:filterOpen={withFiltersFilterOpen}
					filterContent={filterContentSnippet}
					searchPlaceholder="Search..."
					showSearch={true}
					searchSize="md"
					size="md"
					filterLabel="Filter"
				/>
			</div>
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
					viewOptions={viewOptions}
					bind:viewValue={withViewOptionsViewValue}
					searchPlaceholder="Search..."
					showSearch={true}
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
		filterContent: tagFilterContentSnippet
	}}
>
	{#snippet children()}
		<div class="bg-base-100 min-h-screen p-8">
			<div class="container mx-auto max-w-6xl">
				<DataTableToolbar
					bind:searchValue={defaultSearch}
					showFilter={true}
					bind:filterOpen={tagFilterOpen}
					filterContent={tagFilterContentSnippet}
					searchPlaceholder="Search..."
					showSearch={true}
					searchSize="md"
					size="md"
					filterLabel="Filter by Tags"
				/>
			</div>
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
					bulkActions={bulkActions}
					viewOptions={viewOptions}
				/>
			</div>
		</div>
	{/snippet}
</Story>
