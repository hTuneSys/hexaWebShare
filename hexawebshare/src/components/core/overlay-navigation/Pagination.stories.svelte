<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Pagination from './Pagination.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Pagination',
		component: Pagination,
		tags: ['autodocs'],
		argTypes: {
			currentPage: {
				control: { type: 'number', min: 1 }
			},
			totalPages: {
				control: { type: 'number', min: 1 }
			},
			totalItems: {
				control: { type: 'number', min: 0 }
			},
			pageSize: {
				control: { type: 'number', min: 1 }
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			variant: {
				control: { type: 'select' },
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error',
					'ghost'
				]
			},
			showFirstLast: { control: 'boolean' },
			showPrevNext: { control: 'boolean' },
			maxVisiblePages: {
				control: { type: 'number', min: 3, max: 15 }
			},
			showPageSize: { control: 'boolean' },
			showTotal: { control: 'boolean' },
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' }
		},
		args: {
			onpagechange: fn(),
			onpagesizechange: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ currentPage: 1, totalPages: 10 }} />

<Story name="Middle Page" args={{ currentPage: 5, totalPages: 10 }} />

<Story name="Primary Variant" args={{ currentPage: 3, totalPages: 10, variant: 'primary' }} />

<Story name="Small Size" args={{ currentPage: 3, totalPages: 10, size: 'sm' }} />

<Story name="Large Size" args={{ currentPage: 3, totalPages: 10, size: 'lg' }} />

<Story name="Many Pages" args={{ currentPage: 25, totalPages: 50 }} />

<Story
	name="With Total Items"
	args={{ currentPage: 3, totalPages: 10, totalItems: 100, pageSize: 10, showTotal: true }}
/>

<Story name="Disabled State" args={{ currentPage: 3, totalPages: 10, disabled: true }} />

<Story
	name="Full Featured"
	args={{
		currentPage: 3,
		totalPages: 10,
		totalItems: 100,
		pageSize: 10,
		showTotal: true,
		showPageSize: true
	}}
/>

<Story name="Loading State" args={{ currentPage: 3, totalPages: 10, loading: true }} />

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		currentPage: 1,
		totalPages: 20,
		showTotal: true,
		totalItems: 200,
		pageSize: 10,
		showPageSize: true
	}}
/>
