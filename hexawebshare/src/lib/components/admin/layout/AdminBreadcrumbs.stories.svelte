<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AdminBreadcrumbs from './AdminBreadcrumbs.svelte';
	import { fn } from 'storybook/test';
	import type { BreadcrumbItem } from '../../core/overlay-navigation/Breadcrumbs.svelte';

	const { Story } = defineMeta({
		title: 'Admin/Layout/AdminBreadcrumbs',
		component: AdminBreadcrumbs,
		tags: ['autodocs'],
		argTypes: {
			separator: { control: 'text' },
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg']
			},
			variant: {
				control: 'select',
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				]
			},
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' },
			ariaLabel: { control: 'text' }
		}
	});

	const sampleItems: BreadcrumbItem[] = [
		{ id: 1, label: 'Admin', href: '/admin' },
		{ id: 2, label: 'Dashboard', href: '/admin/dashboard' },
		{ id: 3, label: 'Settings', current: true }
	];

	const itemsWithIcons: BreadcrumbItem[] = [
		{ id: 1, label: 'Home', href: '/admin', icon: '🏠' },
		{ id: 2, label: 'Users', href: '/admin/users', icon: '👥' },
		{ id: 3, label: 'Profile', current: true, icon: '👤' }
	];

	const longItems: BreadcrumbItem[] = [
		{ id: 1, label: 'Admin', href: '/admin' },
		{ id: 2, label: 'System', href: '/admin/system' },
		{ id: 3, label: 'Configuration', href: '/admin/system/config' },
		{ id: 4, label: 'Network', href: '/admin/system/config/network' },
		{ id: 5, label: 'Security', current: true }
	];

	const itemsWithButtons: BreadcrumbItem[] = [
		{ id: 1, label: 'Admin', onclick: fn() },
		{ id: 2, label: 'System', onclick: fn() },
		{ id: 3, label: 'Tools', current: true }
	];
</script>

<!-- 1. Default Story -->
<Story
	name="Default"
	args={{
		items: sampleItems
	}}
/>

<!-- 2. Size Variants -->
<Story
	name="Extra Small Size"
	args={{
		items: sampleItems,
		size: 'xs'
	}}
/>

<Story
	name="Large Size"
	args={{
		items: sampleItems,
		size: 'lg'
	}}
/>

<!-- 3. Variant Colors -->
<Story
	name="Primary Variant"
	args={{
		items: sampleItems,
		variant: 'primary'
	}}
/>

<Story
	name="Success Variant"
	args={{
		items: sampleItems,
		variant: 'success'
	}}
/>

<!-- 5. With Icons -->
<Story
	name="With Icons"
	args={{
		items: itemsWithIcons
	}}
/>

<!-- 6. Items with Buttons -->
<Story
	name="Items with Buttons"
	args={{
		items: itemsWithButtons
	}}
/>

<!-- 7. Custom Separator -->
<Story
	name="Custom Separator"
	args={{
		items: sampleItems,
		separator: '→'
	}}
/>

<!-- 8. Long Path -->
<Story
	name="Long Path"
	args={{
		items: longItems
	}}
/>

<!-- 7. States -->
<Story
	name="Loading State"
	args={{
		items: sampleItems,
		loading: true
	}}
/>

<Story
	name="Disabled State"
	args={{
		items: sampleItems,
		disabled: true
	}}
/>

<!-- ✅ REQUIRED: Interactive Playground Story (must be last) -->
<Story
	name="Playground"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'sm',
		variant: 'neutral',
		disabled: false,
		loading: false,
		ariaLabel: 'Admin navigation'
	}}
/>
