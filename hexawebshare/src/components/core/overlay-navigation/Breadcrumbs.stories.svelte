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
			onclick: () => {
				console.log('Home clicked');
			}
		},
		{
			id: 2,
			label: 'Products',
			onclick: () => {
				console.log('Products clicked');
			}
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

<!-- Basic Examples -->
<Story
	name="Simple"
	args={{
		items: simpleItems,
		separator: '/',
		size: 'md',
		variant: 'neutral'
	}}
/>

<Story
	name="Long Path"
	args={{
		items: longItems,
		separator: '/',
		size: 'md',
		variant: 'neutral'
	}}
/>

<!-- Size Variants -->
<Story
	name="Extra Small"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'xs',
		variant: 'neutral'
	}}
/>

<Story
	name="Small"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'sm',
		variant: 'neutral'
	}}
/>

<Story
	name="Medium"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'neutral'
	}}
/>

<Story
	name="Large"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'lg',
		variant: 'neutral'
	}}
/>

<!-- Variant Colors -->
<Story
	name="Primary"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'primary'
	}}
/>

<Story
	name="Secondary"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'secondary'
	}}
/>

<Story
	name="Accent"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'accent'
	}}
/>

<Story
	name="Neutral"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'neutral'
	}}
/>

<Story
	name="Info"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'info'
	}}
/>

<Story
	name="Success"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'success'
	}}
/>

<Story
	name="Warning"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'warning'
	}}
/>

<Story
	name="Error"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'error'
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

<!-- Custom Separators -->
<Story
	name="Custom Separator - Arrow"
	args={{
		items: sampleItems,
		separator: '→',
		size: 'md',
		variant: 'neutral'
	}}
/>

<Story
	name="Custom Separator - Chevron"
	args={{
		items: sampleItems,
		separator: '›',
		size: 'md',
		variant: 'neutral'
	}}
/>

<Story
	name="Custom Separator - Dot"
	args={{
		items: sampleItems,
		separator: '•',
		size: 'md',
		variant: 'neutral'
	}}
/>

<Story
	name="Custom Separator - Pipe"
	args={{
		items: sampleItems,
		separator: '|',
		size: 'md',
		variant: 'neutral'
	}}
/>

<!-- States -->
<Story
	name="Disabled"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'neutral',
		disabled: true
	}}
/>

<Story
	name="Loading"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'neutral',
		loading: true
	}}
/>

<Story
	name="With Disabled Item"
	args={{
		items: itemsWithDisabled,
		separator: '/',
		size: 'md',
		variant: 'neutral'
	}}
/>

<!-- Interactive Examples -->
<Story
	name="With Button Handlers"
	args={{
		items: itemsWithButtons,
		separator: '/',
		size: 'md',
		variant: 'primary'
	}}
/>

<!-- Edge Cases -->
<Story
	name="Single Item"
	args={{
		items: [{ id: 1, label: 'Home', current: true }],
		separator: '/',
		size: 'md',
		variant: 'neutral'
	}}
/>

<Story
	name="Two Items"
	args={{
		items: [
			{ id: 1, label: 'Home', href: '/' },
			{ id: 2, label: 'Current', current: true }
		],
		separator: '/',
		size: 'md',
		variant: 'neutral'
	}}
/>

<Story
	name="Three Items"
	args={{
		items: [
			{ id: 1, label: 'Home', href: '/' },
			{ id: 2, label: 'Category', href: '/category' },
			{ id: 3, label: 'Current', current: true }
		],
		separator: '/',
		size: 'md',
		variant: 'neutral'
	}}
/>

<!-- Accessibility Testing -->
<Story
	name="Accessibility - Full Example"
	args={{
		items: sampleItems,
		separator: '/',
		size: 'md',
		variant: 'neutral',
		ariaLabel: 'Breadcrumb navigation for product page'
	}}
/>

<Story
	name="Accessibility - With Icons"
	args={{
		items: itemsWithIcons,
		separator: '/',
		size: 'md',
		variant: 'primary',
		ariaLabel: 'Breadcrumb navigation with icons'
	}}
/>

<!-- Responsive Example -->
<Story
	name="Responsive - Long Path"
	args={{
		items: longItems,
		separator: '/',
		size: 'md',
		variant: 'neutral'
	}}
/>

