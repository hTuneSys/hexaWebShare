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

<!-- Default Story -->
<Story name="Default" args={{ currentPage: 1, totalPages: 10 }} />

<!-- Basic Examples -->
<Story name="Basic" args={{ currentPage: 3, totalPages: 10 }} />
<Story name="First Page" args={{ currentPage: 1, totalPages: 10 }} />
<Story name="Last Page" args={{ currentPage: 10, totalPages: 10 }} />
<Story name="Middle Page" args={{ currentPage: 5, totalPages: 10 }} />

<!-- Size Variants -->
<Story name="Extra Small" args={{ currentPage: 3, totalPages: 10, size: 'xs' }} />
<Story name="Small" args={{ currentPage: 3, totalPages: 10, size: 'sm' }} />
<Story name="Medium" args={{ currentPage: 3, totalPages: 10, size: 'md' }} />
<Story name="Large" args={{ currentPage: 3, totalPages: 10, size: 'lg' }} />

<!-- Variant Colors -->
<Story name="Primary" args={{ currentPage: 3, totalPages: 10, variant: 'primary' }} />
<Story name="Secondary" args={{ currentPage: 3, totalPages: 10, variant: 'secondary' }} />
<Story name="Accent" args={{ currentPage: 3, totalPages: 10, variant: 'accent' }} />
<Story name="Neutral" args={{ currentPage: 3, totalPages: 10, variant: 'neutral' }} />
<Story name="Info" args={{ currentPage: 3, totalPages: 10, variant: 'info' }} />
<Story name="Success" args={{ currentPage: 3, totalPages: 10, variant: 'success' }} />
<Story name="Warning" args={{ currentPage: 3, totalPages: 10, variant: 'warning' }} />
<Story name="Error" args={{ currentPage: 3, totalPages: 10, variant: 'error' }} />
<Story name="Ghost" args={{ currentPage: 3, totalPages: 10, variant: 'ghost' }} />

<!-- Large Page Counts -->
<Story name="Many Pages - Beginning" args={{ currentPage: 2, totalPages: 50 }} />
<Story name="Many Pages - Middle" args={{ currentPage: 25, totalPages: 50 }} />
<Story name="Many Pages - End" args={{ currentPage: 49, totalPages: 50 }} />
<Story name="Very Many Pages" args={{ currentPage: 100, totalPages: 500 }} />

<!-- Navigation Options -->
<Story name="No First Last" args={{ currentPage: 5, totalPages: 10, showFirstLast: false }} />
<Story name="No Prev Next" args={{ currentPage: 5, totalPages: 10, showPrevNext: false }} />
<Story
	name="Minimal"
	args={{ currentPage: 5, totalPages: 10, showFirstLast: false, showPrevNext: false }}
/>

<!-- States -->
<Story name="Disabled" args={{ currentPage: 3, totalPages: 10, disabled: true }} />
<Story name="Loading" args={{ currentPage: 3, totalPages: 10, loading: true }} />

<!-- With Total Items -->
<Story
	name="With Total Items"
	args={{ currentPage: 3, totalPages: 10, totalItems: 100, pageSize: 10, showTotal: true }}
/>
<Story
	name="With Page Size Selector"
	args={{ currentPage: 3, totalPages: 10, showPageSize: true }}
/>
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

<!-- Edge Cases -->
<Story name="Single Page" args={{ currentPage: 1, totalPages: 1 }} />
<Story name="Two Pages" args={{ currentPage: 1, totalPages: 2 }} />
<Story name="Three Pages" args={{ currentPage: 2, totalPages: 3 }} />
<Story name="Max Visible Pages" args={{ currentPage: 5, totalPages: 10, maxVisiblePages: 5 }} />

<!-- Interactive Example -->
<Story
	name="Interactive"
	args={{
		currentPage: 1,
		totalPages: 20,
		showTotal: true,
		totalItems: 200,
		pageSize: 10,
		showPageSize: true
	}}
/>
