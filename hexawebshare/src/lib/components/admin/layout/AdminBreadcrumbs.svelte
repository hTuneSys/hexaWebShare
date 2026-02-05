<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Breadcrumbs from '../../core/overlay-navigation/Breadcrumbs.svelte';
	import type { BreadcrumbItem } from '../../core/overlay-navigation/Breadcrumbs.svelte';

	/**
	 * Props interface for the AdminBreadcrumbs component
	 */
	interface Props {
		/**
		 * Array of breadcrumb items to display
		 */
		items: BreadcrumbItem[];
		/**
		 * Custom separator between breadcrumb items
		 * @default '/'
		 */
		separator?: string;
		/**
		 * Size variant of the breadcrumbs
		 * @default 'sm'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Color variant of the breadcrumbs
		 * @default 'neutral'
		 */
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		/**
		 * Whether the breadcrumbs are disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the breadcrumbs are in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Accessible label for the breadcrumbs navigation
		 * @default 'Admin navigation'
		 */
		ariaLabel?: string;
		/**
		 * ID of the element that labels this breadcrumbs
		 */
		ariaLabelledby?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		items,
		separator = '/',
		size = 'sm',
		variant = 'neutral',
		disabled = false,
		loading = false,
		ariaLabel = 'Admin navigation',
		ariaLabelledby,
		class: className = '',
		...props
	}: Props = $props();
</script>

<Breadcrumbs
	{items}
	{separator}
	{size}
	{variant}
	{disabled}
	{loading}
	{ariaLabel}
	{ariaLabelledby}
	class={className}
	{...props}
/>
