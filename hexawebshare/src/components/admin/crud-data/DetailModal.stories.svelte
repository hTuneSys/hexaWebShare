<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DetailModal from './DetailModal.svelte';
	import { fn } from 'storybook/test';

	const sampleData = [
		{ key: 'name', label: 'Name', value: 'John Doe' },
		{ key: 'email', label: 'Email', value: 'john.doe@example.com' },
		{ key: 'role', label: 'Role', value: 'Administrator' },
		{ key: 'status', label: 'Status', value: 'Active' },
		{ key: 'createdAt', label: 'Created At', value: '2025-01-15' },
		{ key: 'lastLogin', label: 'Last Login', value: '2025-01-20 14:30:00' }
	];

	const sampleDataArray = [
		{ key: 'id', label: 'User ID', value: '12345' },
		{ key: 'name', label: 'Full Name', value: 'John Doe' },
		{ key: 'email', label: 'Email Address', value: 'john.doe@example.com' },
		{ key: 'role', label: 'Role', value: 'Administrator', valueVariant: 'primary' },
		{ key: 'status', label: 'Status', value: 'Active', valueVariant: 'success' },
		{ key: 'createdAt', label: 'Created At', value: '2025-01-15' },
		{ key: 'lastLogin', label: 'Last Login', value: '2025-01-20 14:30:00' }
	];

	const badgeData = [
		{ key: 'id', label: 'Product ID', value: 'PROD-001' },
		{ key: 'name', label: 'Product Name', value: 'Premium Widget' },
		{ key: 'category', label: 'Category', value: 'Electronics', valueVariant: 'info' },
		{ key: 'status', label: 'Status', value: 'In Stock', valueVariant: 'success' },
		{ key: 'price', label: 'Price', value: '$99.99' },
		{ key: 'discount', label: 'Discount', value: '20%', valueVariant: 'warning' },
		{ key: 'rating', label: 'Rating', value: '4.5', valueVariant: 'primary' }
	];

	const sampleActions = [
		{ label: 'Edit', variant: 'primary', onclick: () => console.log('Edit clicked') },
		{ label: 'Delete', variant: 'error', onclick: () => console.log('Delete clicked') }
	];

	const mockDropdownItems = [
		{ id: 'export', label: 'Export', onClick: () => console.log('Export clicked') },
		{ id: 'duplicate', label: 'Duplicate', onClick: () => console.log('Duplicate clicked') },
		{ id: 'archive', label: 'Archive', onClick: () => console.log('Archive clicked') }
	];

	const dataWithBooleans = [
		{ key: 'active', label: 'Active', value: true },
		{ key: 'verified', label: 'Verified', value: false },
		{ key: 'notes', label: 'Notes', value: null }
	];

	const { Story } = defineMeta({
		title: 'Admin/CRUD Data/DetailModal',
		component: DetailModal,
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: 'boolean',
				description: 'Whether the modal is open',
				type: { name: 'boolean' }
			},
			title: {
				control: 'text',
				description: 'Title displayed in the modal header'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Modal size'
			},
			closeOnBackdrop: {
				control: 'boolean',
				description: 'Whether clicking the backdrop closes the modal'
			},
			showCloseButton: {
				control: 'boolean',
				description: 'Whether to show close button'
			},
			ariaLabel: {
				control: 'text',
				description: 'ARIA label for accessibility'
			},
			emptyStateTitle: {
				control: 'text',
				description: 'Title when no data'
			},
			emptyStateDescription: {
				control: 'text',
				description: 'Description when no data'
			},
			emptyValuePlaceholder: {
				control: 'text',
				description: 'Placeholder for null/undefined values'
			},
			booleanTrueLabel: {
				control: 'text',
				description: 'Label for boolean true'
			},
			booleanFalseLabel: {
				control: 'text',
				description: 'Label for boolean false'
			},
			headerDropdownLabel: {
				control: 'text',
				description: 'Label for header dropdown trigger'
			},
			itemLabelSize: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'base', 'lg'],
				description: 'Size for item labels'
			},
			itemValueSize: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'base', 'lg'],
				description: 'Size for item values'
			},
			badgeSize: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size for badges'
			},
			buttonSize: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size for action buttons'
			},
			emptyStateSize: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size for empty state'
			},
			itemSpacing: {
				control: 'text',
				description: 'Spacing class for items container'
			},
			headerDropdownSpacing: {
				control: 'text',
				description: 'Spacing class for header dropdown container'
			},
			dividerSpacing: {
				control: 'text',
				description: 'Spacing class for dividers'
			},
			actionsContainerSpacing: {
				control: 'text',
				description: 'Spacing class for actions container'
			},
			itemContainerClass: {
				control: 'text',
				description: 'CSS classes for individual item containers'
			}
		},
		args: {
			onclose: fn(),
			onopen: fn(),
			open: true,
			title: 'Detail Modal',
			size: 'md',
			closeOnBackdrop: true,
			showCloseButton: true,
			emptyValuePlaceholder: '—',
			booleanTrueLabel: 'Yes',
			booleanFalseLabel: 'No',
			itemSpacing: 'space-y-4',
			itemLabelSize: 'sm',
			itemValueSize: 'base',
			badgeSize: 'md',
			buttonSize: 'md',
			emptyStateSize: 'md',
			headerDropdownSpacing: 'mb-4 flex justify-end',
			dividerSpacing: 'my-4',
			actionsContainerSpacing: 'flex flex-wrap justify-end gap-2',
			itemContainerClass: 'flex flex-col gap-2 pb-4 last:border-b-0 last:pb-0'
		},
		parameters: {
			docs: {
				description: {
					component:
						'A detail modal component for displaying key-value data in admin interfaces. Supports action buttons, badges, and optional header dropdown. Built with Svelte 5 and DaisyUI.'
				}
			}
		}
	});
</script>

<Story
	name="Default"
	args={{
		open: true,
		title: 'Detail Modal',
		data: sampleData,
		emptyValuePlaceholder: '—',
		booleanTrueLabel: 'Yes',
		booleanFalseLabel: 'No',
		itemSpacing: 'space-y-4',
		itemLabelSize: 'sm',
		itemValueSize: 'base',
		badgeSize: 'md',
		buttonSize: 'md',
		emptyStateSize: 'md',
		headerDropdownSpacing: 'mb-4 flex justify-end',
		dividerSpacing: 'my-4',
		actionsContainerSpacing: 'flex flex-wrap justify-end gap-2',
		itemContainerClass: 'flex flex-col gap-2 pb-4 last:border-b-0 last:pb-0'
	}}
/>

<Story
	name="With Data"
	args={{
		open: true,
		title: 'User Details',
		data: sampleData,
		emptyValuePlaceholder: '—',
		booleanTrueLabel: 'Yes',
		booleanFalseLabel: 'No',
		itemSpacing: 'space-y-4',
		itemLabelSize: 'sm',
		itemValueSize: 'base',
		badgeSize: 'md',
		buttonSize: 'md',
		emptyStateSize: 'md',
		headerDropdownSpacing: 'mb-4 flex justify-end',
		dividerSpacing: 'my-4',
		actionsContainerSpacing: 'flex flex-wrap justify-end gap-2',
		itemContainerClass: 'flex flex-col gap-2 pb-4 last:border-b-0 last:pb-0'
	}}
/>

<Story
	name="With Data Array"
	args={{
		open: true,
		title: 'User Details',
		data: sampleDataArray,
		emptyValuePlaceholder: '—',
		booleanTrueLabel: 'Yes',
		booleanFalseLabel: 'No',
		itemSpacing: 'space-y-4',
		itemLabelSize: 'sm',
		itemValueSize: 'base',
		badgeSize: 'md',
		buttonSize: 'md',
		emptyStateSize: 'md',
		headerDropdownSpacing: 'mb-4 flex justify-end',
		dividerSpacing: 'my-4',
		actionsContainerSpacing: 'flex flex-wrap justify-end gap-2',
		itemContainerClass: 'flex flex-col gap-2 pb-4 last:border-b-0 last:pb-0'
	}}
/>

<Story
	name="With Actions"
	args={{
		open: true,
		title: 'Edit Item',
		data: sampleDataArray,
		actions: sampleActions,
		emptyValuePlaceholder: '—',
		booleanTrueLabel: 'Yes',
		booleanFalseLabel: 'No',
		itemSpacing: 'space-y-4',
		itemLabelSize: 'sm',
		itemValueSize: 'base',
		badgeSize: 'md',
		buttonSize: 'md',
		emptyStateSize: 'md',
		headerDropdownSpacing: 'mb-4 flex justify-end',
		dividerSpacing: 'my-4',
		actionsContainerSpacing: 'flex flex-wrap justify-end gap-2',
		itemContainerClass: 'flex flex-col gap-2 pb-4 last:border-b-0 last:pb-0'
	}}
/>

<Story
	name="Empty State"
	args={{
		open: true,
		title: 'Empty Details',
		data: [],
		emptyStateTitle: 'No data available',
		emptyStateDescription: 'There is no detail information to display.',
		emptyValuePlaceholder: '—',
		booleanTrueLabel: 'Yes',
		booleanFalseLabel: 'No',
		itemSpacing: 'space-y-4',
		itemLabelSize: 'sm',
		itemValueSize: 'base',
		badgeSize: 'md',
		buttonSize: 'md',
		emptyStateSize: 'md',
		headerDropdownSpacing: 'mb-4 flex justify-end',
		dividerSpacing: 'my-4',
		actionsContainerSpacing: 'flex flex-wrap justify-end gap-2',
		itemContainerClass: 'flex flex-col gap-2 pb-4 last:border-b-0 last:pb-0'
	}}
/>

<Story
	name="With Badges"
	args={{
		open: true,
		title: 'Product Details',
		data: badgeData,
		emptyValuePlaceholder: '—',
		booleanTrueLabel: 'Yes',
		booleanFalseLabel: 'No',
		itemSpacing: 'space-y-4',
		itemLabelSize: 'sm',
		itemValueSize: 'base',
		badgeSize: 'md',
		buttonSize: 'md',
		emptyStateSize: 'md',
		headerDropdownSpacing: 'mb-4 flex justify-end',
		dividerSpacing: 'my-4',
		actionsContainerSpacing: 'flex flex-wrap justify-end gap-2',
		itemContainerClass: 'flex flex-col gap-2 pb-4 last:border-b-0 last:pb-0'
	}}
/>

<Story
	name="With Dropdown"
	args={{
		open: true,
		title: 'Item Details',
		data: sampleData,
		headerDropdownItems: mockDropdownItems,
		headerDropdownLabel: 'Actions',
		headerDropdownPosition: 'bottom',
		headerDropdownAlign: 'end',
		emptyValuePlaceholder: '—',
		booleanTrueLabel: 'Yes',
		booleanFalseLabel: 'No',
		itemSpacing: 'space-y-4',
		itemLabelSize: 'sm',
		itemValueSize: 'base',
		badgeSize: 'md',
		buttonSize: 'md',
		emptyStateSize: 'md',
		headerDropdownSpacing: 'mb-4 flex justify-end',
		dividerSpacing: 'mb-4',
		actionsContainerSpacing: 'flex flex-wrap justify-end gap-2'
	}}
/>

<Story
	name="With Format Props"
	args={{
		open: true,
		title: 'Formatted Values',
		data: dataWithBooleans,
		emptyValuePlaceholder: '—',
		booleanTrueLabel: 'Yes',
		booleanFalseLabel: 'No',
		itemSpacing: 'space-y-4',
		itemLabelSize: 'sm',
		itemValueSize: 'base',
		badgeSize: 'md',
		buttonSize: 'md',
		emptyStateSize: 'md',
		headerDropdownSpacing: 'mb-4 flex justify-end',
		dividerSpacing: 'my-4',
		actionsContainerSpacing: 'flex flex-wrap justify-end gap-2',
		itemContainerClass: 'flex flex-col gap-2 pb-4 last:border-b-0 last:pb-0'
	}}
/>

<Story
	name="Full Featured"
	args={{
		open: true,
		title: 'Complete Details',
		data: sampleDataArray,
		actions: sampleActions,
		headerDropdownItems: mockDropdownItems,
		headerDropdownLabel: 'More',
		headerDropdownPosition: 'bottom',
		headerDropdownAlign: 'end',
		emptyValuePlaceholder: '—',
		booleanTrueLabel: 'Yes',
		booleanFalseLabel: 'No',
		itemSpacing: 'space-y-4',
		itemLabelSize: 'sm',
		itemValueSize: 'base',
		badgeSize: 'md',
		buttonSize: 'md',
		emptyStateSize: 'md',
		headerDropdownSpacing: 'mb-4 flex justify-end',
		dividerSpacing: 'my-4',
		actionsContainerSpacing: 'flex flex-wrap justify-end gap-2',
		itemContainerClass: 'flex flex-col gap-2 pb-4 last:border-b-0 last:pb-0'
	}}
/>

<Story
	name="Custom Sizes"
	args={{
		open: true,
		title: 'Custom Size Variants',
		data: sampleDataArray,
		actions: sampleActions,
		emptyValuePlaceholder: '—',
		booleanTrueLabel: 'Yes',
		booleanFalseLabel: 'No',
		itemSpacing: 'space-y-4',
		itemLabelSize: 'lg',
		itemValueSize: 'lg',
		badgeSize: 'lg',
		buttonSize: 'lg',
		emptyStateSize: 'lg',
		headerDropdownSpacing: 'mb-4 flex justify-end',
		dividerSpacing: 'my-4',
		actionsContainerSpacing: 'flex flex-wrap justify-end gap-2'
	}}
/>

<Story
	name="Custom Spacing"
	args={{
		open: true,
		title: 'Custom Spacing',
		data: sampleDataArray,
		actions: sampleActions,
		emptyValuePlaceholder: '—',
		booleanTrueLabel: 'Yes',
		booleanFalseLabel: 'No',
		itemSpacing: 'space-y-6',
		itemLabelSize: 'sm',
		itemValueSize: 'base',
		badgeSize: 'md',
		buttonSize: 'md',
		emptyStateSize: 'md',
		headerDropdownSpacing: 'mb-4 flex justify-end',
		dividerSpacing: 'my-6',
		actionsContainerSpacing: 'flex flex-wrap justify-end gap-4',
		itemContainerClass: 'flex flex-col gap-2 pb-4 last:border-b-0 last:pb-0'
	}}
/>

<Story
	name="Playground"
	args={{
		open: true,
		title: 'Interactive Detail Modal',
		data: sampleDataArray,
		actions: sampleActions,
		headerDropdownItems: mockDropdownItems,
		headerDropdownLabel: 'Actions',
		headerDropdownPosition: 'bottom',
		headerDropdownAlign: 'end',
		size: 'md',
		closeOnBackdrop: true,
		showCloseButton: true,
		emptyStateTitle: 'No data available',
		emptyStateDescription: 'There is no detail information to display.',
		emptyValuePlaceholder: '—',
		booleanTrueLabel: 'Yes',
		booleanFalseLabel: 'No',
		itemLabelSize: 'sm',
		itemValueSize: 'base',
		badgeSize: 'md',
		buttonSize: 'md',
		emptyStateSize: 'md',
		itemSpacing: 'space-y-4',
		headerDropdownSpacing: 'mb-4 flex justify-end',
		dividerSpacing: 'my-4',
		actionsContainerSpacing: 'flex flex-wrap justify-end gap-2',
		itemContainerClass: 'flex flex-col gap-2 pb-4 last:border-b-0 last:pb-0'
	}}
/>
