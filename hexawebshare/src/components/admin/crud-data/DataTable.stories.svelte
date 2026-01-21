<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DataTable from './DataTable.svelte';
	import type { DataTableColumn, DataTableAction, SortState } from './DataTable.svelte';

	/**
	 * Sample user interface for story examples
	 */
	interface User {
		id: number;
		name: string;
		email: string;
		role: string;
		status: string;
		createdAt: string;
	}

	/**
	 * Sample user data for stories
	 */
	const sampleUsers: User[] = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			role: 'Admin',
			status: 'Active',
			createdAt: '2024-01-15'
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			role: 'Editor',
			status: 'Active',
			createdAt: '2024-02-20'
		},
		{
			id: 3,
			name: 'Bob Johnson',
			email: 'bob@example.com',
			role: 'Viewer',
			status: 'Inactive',
			createdAt: '2024-03-10'
		},
		{
			id: 4,
			name: 'Alice Brown',
			email: 'alice@example.com',
			role: 'Editor',
			status: 'Active',
			createdAt: '2024-04-05'
		},
		{
			id: 5,
			name: 'Charlie Wilson',
			email: 'charlie@example.com',
			role: 'Viewer',
			status: 'Pending',
			createdAt: '2024-05-12'
		}
	];

	/**
	 * Extended sample data for pagination stories
	 */
	const extendedUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
		id: i + 1,
		name: `User ${i + 1}`,
		email: `user${i + 1}@example.com`,
		role: ['Admin', 'Editor', 'Viewer'][i % 3],
		status: ['Active', 'Inactive', 'Pending'][i % 3],
		createdAt: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`
	}));

	/**
	 * Sample columns configuration
	 */
	const columns: DataTableColumn<User>[] = [
		{ key: 'id', label: 'ID', width: '60px', sortable: true },
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'Email', hideOnMobile: true },
		{ key: 'role', label: 'Role', sortable: true },
		{ key: 'status', label: 'Status', align: 'center' },
		{ key: 'createdAt', label: 'Created', hideOnMobile: true, sortable: true }
	];

	/**
	 * Sample actions configuration
	 */
	const actions: DataTableAction<User>[] = [
		{
			id: 'view',
			label: 'View Details',
			icon: 'eye',
			onClick: (row: User) => console.log('View:', row)
		},
		{
			id: 'edit',
			label: 'Edit',
			icon: 'edit',
			onClick: (row: User) => console.log('Edit:', row)
		},
		{
			id: 'delete',
			label: 'Delete',
			icon: 'trash',
			variant: 'danger',
			onClick: (row: User) => console.log('Delete:', row)
		}
	];

	const { Story } = defineMeta({
		component: DataTable,
		title: 'Admin/CRUD Data/DataTable',
		tags: ['autodocs'],
		argTypes: {
			columns: {
				control: 'object',
				description: 'Column definitions for the table'
			},
			data: {
				control: 'object',
				description: 'Data array to display in the table'
			},
			actions: {
				control: 'object',
				description: 'Row action definitions'
			},
			selectable: {
				control: 'boolean',
				description: 'Enable row selection with checkboxes'
			},
			selectedRows: {
				control: 'object',
				description: 'Array of selected row indices'
			},
			sortState: {
				control: 'object',
				description: 'Current sort state'
			},
			paginated: {
				control: 'boolean',
				description: 'Enable pagination'
			},
			currentPage: {
				control: 'number',
				description: 'Current page number (1-based)'
			},
			pageSize: {
				control: 'number',
				description: 'Number of items per page'
			},
			totalItems: {
				control: 'number',
				description: 'Total number of items'
			},
			pageSizeOptions: {
				control: 'object',
				description: 'Available page size options'
			},
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Table size variant'
			},
			zebra: {
				control: 'boolean',
				description: 'Enable zebra striping'
			},
			hover: {
				control: 'boolean',
				description: 'Enable row hover effect'
			},
			compact: {
				control: 'boolean',
				description: 'Use compact spacing'
			},
			bordered: {
				control: 'boolean',
				description: 'Show cell borders'
			},
			loading: {
				control: 'boolean',
				description: 'Show loading state'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable all interactions'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the table'
			},
			caption: {
				control: 'text',
				description: 'Table caption text'
			},
			emptyStateTitle: {
				control: 'text',
				description: 'Title for empty state'
			},
			emptyStateDescription: {
				control: 'text',
				description: 'Description for empty state'
			},
			loadingAriaLabel: {
				control: 'text',
				description: 'Accessible label for loading spinner'
			},
			actionsColumnLabel: {
				control: 'text',
				description: 'Label for actions column header'
			},
			selectAllAriaLabel: {
				control: 'text',
				description: 'Accessible label for select all checkbox'
			},
			selectRowAriaLabelFormat: {
				control: 'text',
				description: 'Format string for row checkbox aria label'
			},
			actionsAriaLabelFormat: {
				control: 'text',
				description: 'Format string for actions dropdown aria label'
			},
			paginationAriaLabel: {
				control: 'text',
				description: 'Accessible label for pagination'
			},
			onSelectionChange: {
				action: 'selectionChange',
				description: 'Callback when selection changes'
			},
			onSortChange: {
				action: 'sortChange',
				description: 'Callback when sort changes'
			},
			onPageChange: {
				action: 'pageChange',
				description: 'Callback when page changes'
			},
			onPageSizeChange: {
				action: 'pageSizeChange',
				description: 'Callback when page size changes'
			},
			onRowClick: {
				action: 'rowClick',
				description: 'Callback when a row is clicked'
			}
		}
	});
</script>

<!-- Story 1: Default -->
<Story
	name="Default"
	args={{
		columns: columns as any,
		data: sampleUsers as any,
		ariaLabel: 'User data table'
	}}
/>

<!-- Story 2: With Selection -->
<Story
	name="With Selection"
	args={{
		columns: columns as any,
		data: sampleUsers as any,
		selectable: true,
		selectedRows: [0, 2],
		selectAllAriaLabel: 'Select all users',
		selectRowAriaLabelFormat: 'Select user {index}',
		ariaLabel: 'Selectable user data table'
	}}
/>

<!-- Story 3: With Sorting -->
<Story
	name="With Sorting"
	args={{
		columns: columns as any,
		data: sampleUsers as any,
		sortState: { column: 'name', direction: 'asc' } as SortState,
		ariaLabel: 'Sortable user data table'
	}}
/>

<!-- Story 4: With Actions -->
<Story
	name="With Actions"
	args={{
		columns: columns as any,
		data: sampleUsers as any,
		actions: actions as any,
		actionsColumnLabel: 'Actions',
		actionsAriaLabelFormat: 'Actions for row {index}',
		ariaLabel: 'User data table with actions'
	}}
/>

<!-- Story 5: With Pagination -->
<Story
	name="With Pagination"
	args={{
		columns: columns as any,
		data: extendedUsers.slice(0, 10) as any,
		paginated: true,
		currentPage: 1,
		pageSize: 10,
		totalItems: 50,
		pageSizeOptions: [5, 10, 25, 50],
		paginationAriaLabel: 'User table pagination',
		ariaLabel: 'Paginated user data table'
	}}
/>

<!-- Story 6: Zebra Striping -->
<Story
	name="Zebra Striping"
	args={{
		columns: columns as any,
		data: sampleUsers as any,
		zebra: true,
		ariaLabel: 'Zebra striped user data table'
	}}
/>

<!-- Story 7: Bordered -->
<Story
	name="Bordered"
	args={{
		columns: columns as any,
		data: sampleUsers as any,
		bordered: true,
		ariaLabel: 'Bordered user data table'
	}}
/>

<!-- Story 8: Compact Size -->
<Story
	name="Compact Size"
	args={{
		columns: columns as any,
		data: sampleUsers as any,
		size: 'xs',
		compact: true,
		ariaLabel: 'Compact user data table'
	}}
/>

<!-- Story 9: Loading State -->
<Story
	name="Loading State"
	args={{
		columns: columns as any,
		data: [],
		loading: true,
		loadingAriaLabel: 'Loading user data',
		ariaLabel: 'Loading user data table'
	}}
/>

<!-- Story 10: Empty State -->
<Story
	name="Empty State"
	args={{
		columns: columns as any,
		data: [],
		emptyStateTitle: 'No users found',
		emptyStateDescription: 'There are no users matching your criteria. Try adjusting your filters.',
		ariaLabel: 'Empty user data table'
	}}
/>

<!-- Story 11: Disabled State -->
<Story
	name="Disabled State"
	args={{
		columns: columns as any,
		data: sampleUsers as any,
		selectable: true,
		actions: actions as any,
		disabled: true,
		ariaLabel: 'Disabled user data table'
	}}
/>

<!-- Story 12: With Caption -->
<Story
	name="With Caption"
	args={{
		columns: columns as any,
		data: sampleUsers as any,
		caption: 'List of registered users in the system',
		ariaLabel: 'User data table with caption'
	}}
/>

<!-- Story 13: Playground (Interactive) -->
<Story
	name="Playground"
	args={{
		columns: columns as any,
		data: sampleUsers as any,
		actions: actions as any,
		selectable: true,
		selectedRows: [],
		sortState: { column: null, direction: null } as SortState,
		paginated: true,
		currentPage: 1,
		pageSize: 10,
		totalItems: 5,
		pageSizeOptions: [5, 10, 25],
		size: 'md',
		zebra: false,
		hover: true,
		compact: false,
		bordered: false,
		loading: false,
		disabled: false,
		ariaLabel: 'Interactive user data table',
		caption: '',
		emptyStateTitle: 'No data available',
		emptyStateDescription: 'There is no data to display.',
		loadingAriaLabel: 'Loading data',
		actionsColumnLabel: 'Actions',
		selectAllAriaLabel: 'Select all rows',
		selectRowAriaLabelFormat: 'Select row {index}',
		actionsAriaLabelFormat: 'Actions for row {index}',
		paginationAriaLabel: 'Table pagination'
	}}
/>
