<script lang="ts">
	import type { Snippet } from 'svelte';
	import Spinner from '../feedback/Spinner.svelte';

	interface Props {
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost'
			| 'link';
		title?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg';
		circle?: boolean;
		square?: boolean;
		outline?: boolean;
		glass?: boolean;
		disabled?: boolean;
		loading?: boolean;
		ariaLabel?: string;
		'aria-expanded'?: boolean;
		onclick?: () => void;
		onkeydown?: (event: KeyboardEvent) => void;
		children?: Snippet;
		/**
		 * Additional CSS classes
		 * @default ''
		 */
		class?: string;
		/**
		 * Inline CSS style attribute
		 */
		style?: string;
	}

	const {
		variant = 'primary',
		title,
		size = 'md',
		circle = false,
		square = false,
		outline = false,
		glass = false,
		disabled = false,
		loading = false,
		ariaLabel,
		'aria-expanded': ariaExpanded,
		children,
		class: className = '',
		onclick,
		onkeydown,
		...props
	}: Props = $props();

	let buttonClasses = $derived(
		[
			'btn',
			variant === 'primary' && 'btn-primary',
			variant === 'secondary' && 'btn-secondary',
			variant === 'accent' && 'btn-accent',
			variant === 'neutral' && 'btn-neutral',
			variant === 'info' && 'btn-info',
			variant === 'success' && 'btn-success',
			variant === 'warning' && 'btn-warning',
			variant === 'error' && 'btn-error',
			variant === 'ghost' && 'btn-ghost',
			variant === 'link' && 'btn-link',
			size === 'xs' && 'btn-xs',
			size === 'sm' && 'btn-sm',
			size === 'md' && 'btn-md',
			size === 'lg' && 'btn-lg',
			circle && 'btn-circle',
			square && 'btn-square',
			outline && 'btn-outline',
			glass && 'glass',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component IconButton

A button component optimized for displaying icon-only buttons with consistent styling and behavior.

**Features:**
- All DaisyUI button variants (primary, secondary, accent, etc.)
- Multiple sizes (xs, sm, md, lg)
- Circle and square shapes
- Outline and glass styles
- Loading state with spinner
- Disabled state
- Full accessibility support

**Lucide Integration:**
Works seamlessly with Lucide icons via the Icon component or directly.

USAGE EXAMPLES:

Using Icon component wrapper (recommended):
  import IconButton from 'hexawebshare';
  import Icon from 'hexawebshare';
  import X from 'lucide-svelte/icons/x';
  
  IconButton with variant="ghost", circle, and ariaLabel="Close"
    Icon with size="sm"
      X icon component

Direct Lucide icon (also works):
  import Menu from 'lucide-svelte/icons/menu';
  
  IconButton with variant="primary", square, ariaLabel="Open menu"
    Menu icon component

Custom SVG Icons (when Lucide doesn't have what you need):
  IconButton with variant="secondary", circle, ariaLabel="Custom action"
    svg element with viewBox="0 0 24 24", fill="currentColor", class="h-5 w-5"
      path element with custom d attribute
  
  NOTE: Raw SVG is acceptable here only for truly custom icons
  not available in Lucide. For standard icons, always use Lucide.

Loading State:
  IconButton with loading prop and ariaLabel="Loading"
    Search icon component
-->

<button
	type="button"
	class={buttonClasses}
	{disabled}
	aria-label={ariaLabel}
	aria-expanded={ariaExpanded}
	{onclick}
	{onkeydown}
	{...props}
>
	{#if loading}
		<Spinner type="spinner" {size} />
	{:else if children}
		{@render children()}
	{/if}
</button>
