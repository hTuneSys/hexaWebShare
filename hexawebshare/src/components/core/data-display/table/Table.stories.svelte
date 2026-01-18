<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Table from './Table.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Data Display/Table',
		component: Table,
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
			pinRows: {
				control: 'boolean',
				description: 'Pin the header row'
			},
			pinCols: {
				control: 'boolean',
				description: 'Pin the first column'
			},
			hover: {
				control: 'boolean',
				description: 'Enable hover effect on rows'
			},
			compact: {
				control: 'boolean',
				description: 'Make the table compact'
			},
			loading: {
				control: 'boolean',
				description: 'Show loading state'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the table'
			},
			bordered: {
				control: 'boolean',
				description: 'Show borders between cells'
			},
			responsive: {
				control: 'boolean',
				description: 'Enable horizontal scroll on small screens'
			},
			selectable: {
				control: 'boolean',
				description: 'Enable row selection'
			},
			caption: {
				control: 'text',
				description: 'Accessible caption for the table'
			},
			captionHidden: {
				control: 'boolean',
				description: 'Hide caption visually'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the table'
			},
			emptyMessage: {
				control: 'text',
				description: 'Custom empty state message'
			}
		},
		args: {
			onsort: fn(),
			onrowclick: fn(),
			onselect: fn()
		}
	});

	// Sample data for stories
	const sampleColumns = [
		{ key: 'id', label: 'ID', sortable: true, width: '60px' },
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'Email', sortable: true },
		{ key: 'role', label: 'Role', sortable: true },
		{ key: 'status', label: 'Status', align: /** @type {'center'} */ ('center') }
	];

	const sampleData = [
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

	const productColumns = [
		{ key: 'sku', label: 'SKU', sortable: true, width: '100px' },
		{ key: 'product', label: 'Product', sortable: true },
		{ key: 'category', label: 'Category', sortable: true, hideOnMobile: true },
		{ key: 'price', label: 'Price', sortable: true, align: /** @type {'right'} */ ('right') },
		{ key: 'stock', label: 'Stock', sortable: true, align: /** @type {'center'} */ ('center') }
	];

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

	const simpleColumns = [
		{ key: 'name', label: 'Name' },
		{ key: 'job', label: 'Job' },
		{ key: 'company', label: 'Company' }
	];

	const simpleData = [
		{
			name: 'Cy Ganderton',
			job: 'Quality Control Specialist',
			company: 'Littel, Schaden and Vandervort'
		},
		{
			name: 'Hart Hagerty',
			job: 'Desktop Support Technician',
			company: 'Zemlak, Daniel and Leannon'
		},
		{ name: 'Brice Swyre', job: 'Tax Accountant', company: 'Carroll Group' }
	];
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		columns: sampleColumns,
		data: sampleData,
		size: 'md',
		hover: true,
		ariaLabel: 'User accounts table'
	}}
/>

<!-- Size Stories -->
<Story
	name="Extra Small Size"
	args={{
		columns: simpleColumns,
		data: simpleData,
		size: 'xs',
		ariaLabel: 'Extra small table'
	}}
/>

<Story
	name="Large Size"
	args={{
		columns: simpleColumns,
		data: simpleData,
		size: 'lg',
		ariaLabel: 'Large table'
	}}
/>

<!-- Style Variants -->
<Story
	name="Zebra Striped"
	args={{
		columns: sampleColumns,
		data: sampleData,
		zebra: true,
		ariaLabel: 'Zebra striped table'
	}}
/>

<Story
	name="Bordered"
	args={{
		columns: sampleColumns,
		data: sampleData,
		bordered: true,
		ariaLabel: 'Bordered table'
	}}
/>

<Story
	name="Compact"
	args={{
		columns: productColumns,
		data: productData,
		compact: true,
		ariaLabel: 'Compact table'
	}}
/>

<!-- Pinned Headers and Columns -->
<Story
	name="Pinned Header Rows"
	args={{
		columns: productColumns,
		data: productData,
		pinRows: true,
		ariaLabel: 'Table with pinned header'
	}}
/>

<!-- State Stories -->
<Story
	name="Loading State"
	args={{
		columns: sampleColumns,
		data: [],
		loading: true,
		ariaLabel: 'Loading table'
	}}
/>

<Story
	name="Empty State"
	args={{
		columns: sampleColumns,
		data: [],
		emptyMessage: 'No users found',
		ariaLabel: 'Empty table'
	}}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		columns: productColumns,
		data: productData,
		size: 'md',
		zebra: true,
		hover: true,
		pinRows: false,
		pinCols: false,
		compact: false,
		loading: false,
		disabled: false,
		bordered: false,
		responsive: true,
		selectable: false,
		caption: 'Interactive table playground',
		captionHidden: true,
		ariaLabel: 'Playground table for testing all options'
	}}
/>
