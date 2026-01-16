<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Breadcrumbs from './Breadcrumbs.svelte';
	import { fn } from 'storybook/test';
	import type { BreadcrumbItem } from './Breadcrumbs.svelte';

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Breadcrumbs',
		component: Breadcrumbs,
		tags: ['autodocs'],
		argTypes: {
			separator: {
				control: { type: 'text' }
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
					'error'
				]
			},
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' }
		}
	});

	// Sample breadcrumb items
	const sampleItems: BreadcrumbItem[] = [
		{ id: 1, label: 'Home', href: '/' },
		{ id: 2, label: 'Products', href: '/products' },
		{ id: 3, label: 'Electronics', href: '/products/electronics' },
		{ id: 4, label: 'Smartphones', href: '/products/electronics/smartphones' },
		{ id: 5, label: 'iPhone 15 Pro', current: true }
	];

	const simpleItems: BreadcrumbItem[] = [
		{ id: 1, label: 'Home', href: '/' },
		{ id: 2, label: 'About', href: '/about' },
		{ id: 3, label: 'Contact', current: true }
	];

	const itemsWithIcons: BreadcrumbItem[] = [
		{ id: 1, label: 'Home', href: '/', icon: '🏠' },
		{ id: 2, label: 'Dashboard', href: '/dashboard', icon: '📊' },
		{ id: 3, label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
		{ id: 4, label: 'Profile', current: true, icon: '👤' }
	];

	const longItems: BreadcrumbItem[] = [
		{ id: 1, label: 'Home', href: '/' },
		{ id: 2, label: 'Category', href: '/category' },
		{ id: 3, label: 'Subcategory', href: '/category/subcategory' },
		{ id: 4, label: 'Product Type', href: '/category/subcategory/type' },
		{ id: 5, label: 'Brand', href: '/category/subcategory/type/brand' },
		{ id: 6, label: 'Model', href: '/category/subcategory/type/brand/model' },
		{ id: 7, label: 'Variant', current: true }
	];

	const itemsWithButtons: BreadcrumbItem[] = [
		{
			id: 1,
			label: 'Home',
			onclick: fn()
		},
		{
			id: 2,
			label: 'Products',
			onclick: fn()
		},
		{ id: 3, label: 'Current Page', current: true }
	];

	const itemsWithDisabled: BreadcrumbItem[] = [
		{ id: 1, label: 'Home', href: '/' },
		{ id: 2, label: 'Products', href: '/products', disabled: true },
		{ id: 3, label: 'Electronics', href: '/products/electronics' },
		{ id: 4, label: 'Current Page', current: true }
	];
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'neutral'
	}}
/>

<!-- Size Variants -->
<Story
	name="Small Size"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'sm',
		variant: 'neutral'
	}}
/>

<Story
	name="Large Size"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'lg',
		variant: 'neutral'
	}}
/>

<!-- Variant Colors -->
<Story
	name="Primary Variant"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'primary'
	}}
/>

<!-- With Icons -->
<Story
	name="With Icons"
	args={{
		items: itemsWithIcons,
		separator: '/',
		size: 'md',
		variant: 'primary'
	}}
/>

<!-- Custom Separator -->
<Story
	name="Custom Separator"
	args={{
		items: sampleItems,
		separator: '→',
		size: 'md',
		variant: 'neutral'
	}}
/>

<!-- Long Path -->
<Story
	name="Long Path"
	args={{
		items: longItems,
		separator: '/',
		size: 'md',
		variant: 'neutral'
	}}
/>

<!-- States -->
<Story
	name="Disabled State"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'neutral',
		disabled: true
	}}
/>

<Story
	name="Loading State"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'neutral',
		loading: true
	}}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'neutral',
		disabled: false,
		loading: false
	}}
/>
