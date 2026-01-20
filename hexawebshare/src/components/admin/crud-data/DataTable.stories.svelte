<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DataTable from './DataTable.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Admin/CRUD Data/DataTable',
		component: DataTable,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size variant of the table'
			},
			zebra: {
				control: 'boolean',
				description: 'Enable zebra striped rows'
			},
			hover: {
				control: 'boolean',
				description: 'Enable hover effect on rows'
			},
			compact: {
				control: 'boolean',
				description: 'Make the table compact'
			},
			bordered: {
				control: 'boolean',
				description: 'Show borders between cells'
			},
			loading: {
				control: 'boolean',
				description: 'Show loading state'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the table'
			},
			selectable: {
				control: 'boolean',
				description: 'Enable row selection with checkboxes'
			},
			paginated: {
				control: 'boolean',
				description: 'Enable pagination'
			},
			currentPage: {
				control: 'number',
				description: 'Current page number (1-indexed)'
			},
			pageSize: {
				control: 'number',
				description: 'Number of items per page'
			},
			totalItems: {
				control: 'number',
				description: 'Total number of items'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the table'
			},
			caption: {
				control: 'text',
				description: 'Caption for the table'
			},
			emptyStateTitle: {
				control: 'text',
				description: 'Title for empty state'
			},
			emptyStateDescription: {
				control: 'text',
				description: 'Description for empty state'
			},
			actionsColumnLabel: {
				control: 'text',
				description: 'Label for actions column header'
			},
			selectAllAriaLabel: {
				control: 'text',
				description: 'Aria label for select all checkbox'
			},
			loadingAriaLabel: {
				control: 'text',
				description: 'Aria label for loading state'
			},
			paginationAriaLabel: {
				control: 'text',
				description: 'Aria label for pagination'
			}
		},
		args: {
			onSelectionChange: fn(),
			onSortChange: fn(),
			onPageChange: fn(),
			onPageSizeChange: fn(),
			onRowClick: fn()
		}
	});

	// Sample columns for user data
	const userColumns = [
		{ key: 'id', label: 'ID', sortable: true, width: '60px' },
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'Email', sortable: true },
		{ key: 'role', label: 'Role', sortable: true },
		{ key: 'status', label: 'Status', align: /** @type {'center'} */ ('center') }
	];

	// Sample user data
	const userData = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
		{ id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
		{
			id: 5,
			name: 'Charlie Wilson',
			email: 'charlie@example.com',
			role: 'Viewer',
			status: 'Pending'
		}
	];

	// Sample columns for product data
	const productColumns = [
		{ key: 'sku', label: 'SKU', sortable: true, width: '100px' },
		{ key: 'product', label: 'Product', sortable: true },
		{ key: 'category', label: 'Category', sortable: true, hideOnMobile: true },
		{ key: 'price', label: 'Price', sortable: true, align: /** @type {'right'} */ ('right') },
		{ key: 'stock', label: 'Stock', sortable: true, align: /** @type {'center'} */ ('center') }
	];

	// Sample product data
	const productData = [
		{
			sku: 'PRD-001',
			product: 'Wireless Mouse',
			category: 'Electronics',
			price: '$29.99',
			stock: 150
		},
		{ sku: 'PRD-002', product: 'USB-C Hub', category: 'Electronics', price: '$49.99', stock: 75 },
		{
			sku: 'PRD-003',
			product: 'Mechanical Keyboard',
			category: 'Electronics',
			price: '$129.99',
			stock: 45
		},
		{
			sku: 'PRD-004',
			product: 'Monitor Stand',
			category: 'Accessories',
			price: '$39.99',
			stock: 200
		},
		{ sku: 'PRD-005', product: 'Webcam HD', category: 'Electronics', price: '$79.99', stock: 60 },
		{ sku: 'PRD-006', product: 'Desk Lamp', category: 'Accessories', price: '$24.99', stock: 120 },
		{
			sku: 'PRD-007',
			product: 'Mouse Pad XL',
			category: 'Accessories',
			price: '$14.99',
			stock: 300
		}
	];

	// Sample row actions
	const rowActions = [
		{ id: 'view', label: 'View Details', icon: '👁️', onClick: fn() },
		{ id: 'edit', label: 'Edit', icon: '✏️', onClick: fn() },
		{
			id: 'delete',
			label: 'Delete',
			icon: '🗑️',
			variant: /** @type {'danger'} */ ('danger'),
			onClick: fn()
		}
	];

	// Page size options
	const pageSizeOptions = [5, 10, 20, 50];
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		columns: userColumns,
		data: userData,
		size: 'md',
		hover: true,
		ariaLabel: 'User accounts table'
	}}
/>

<!-- With Selection -->
<Story
	name="With Selection"
	args={{
		columns: userColumns,
		data: userData,
		size: 'md',
		hover: true,
		selectable: true,
		selectedRows: [0, 2],
		ariaLabel: 'Selectable user table',
		selectAllAriaLabel: 'Select all users',
		selectRowAriaLabelFormat: 'Select user row {index}'
	}}
/>

<!-- With Sorting -->
<Story
	name="With Sorting"
	args={{
		columns: productColumns,
		data: productData,
		size: 'md',
		hover: true,
		sortState: { column: 'product', direction: /** @type {'asc'} */ ('asc') },
		ariaLabel: 'Sortable product table'
	}}
/>

<!-- With Actions -->
<Story
	name="With Actions"
	args={{
		columns: userColumns,
		data: userData,
		size: 'md',
		hover: true,
		actions: rowActions,
		actionsColumnLabel: 'Actions',
		actionsAriaLabelFormat: 'Actions for row {index}',
		ariaLabel: 'User table with actions'
	}}
/>

<!-- With Pagination -->
<Story
	name="With Pagination"
	args={{
		columns: productColumns,
		data: productData,
		size: 'md',
		hover: true,
		paginated: true,
		currentPage: 1,
		pageSize: 5,
		totalItems: 25,
		pageSizeOptions: pageSizeOptions,
		paginationAriaLabel: 'Product table pagination',
		ariaLabel: 'Paginated product table'
	}}
/>

<!-- Loading State -->
<Story
	name="Loading State"
	args={{
		columns: userColumns,
		data: [],
		size: 'md',
		loading: true,
		loadingAriaLabel: 'Loading user data',
		ariaLabel: 'Loading table'
	}}
/>

<!-- Empty State -->
<Story
	name="Empty State"
	args={{
		columns: userColumns,
		data: [],
		size: 'md',
		emptyStateTitle: 'No Users Found',
		emptyStateDescription: 'There are no users matching your criteria. Try adjusting your filters.',
		ariaLabel: 'Empty user table'
	}}
/>

<!-- Zebra Striped -->
<Story
	name="Zebra Striped"
	args={{
		columns: productColumns,
		data: productData,
		size: 'md',
		zebra: true,
		hover: true,
		ariaLabel: 'Zebra striped product table'
	}}
/>

<!-- Bordered -->
<Story
	name="Bordered"
	args={{
		columns: userColumns,
		data: userData,
		size: 'md',
		bordered: true,
		hover: true,
		ariaLabel: 'Bordered user table'
	}}
/>

<!-- Playground - Interactive story with all features -->
<Story
	name="Playground"
	args={{
		columns: productColumns,
		data: productData,
		actions: rowActions,
		selectable: true,
		selectedRows: [],
		sortState: { column: null, direction: null },
		paginated: true,
		currentPage: 1,
		pageSize: 10,
		totalItems: 50,
		pageSizeOptions: pageSizeOptions,
		size: 'md',
		zebra: false,
		hover: true,
		compact: false,
		bordered: false,
		loading: false,
		disabled: false,
		ariaLabel: 'Interactive DataTable playground',
		caption: 'Product inventory management',
		emptyStateTitle: 'No Products',
		emptyStateDescription: 'No products available',
		loadingAriaLabel: 'Loading products',
		actionsColumnLabel: 'Actions',
		selectAllAriaLabel: 'Select all products',
		selectRowAriaLabelFormat: 'Select product row {index}',
		actionsAriaLabelFormat: 'Actions for product {index}',
		paginationAriaLabel: 'Product pagination'
	}}
/>
