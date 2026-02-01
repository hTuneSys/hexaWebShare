<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component ListItem

A standalone list item component with rich features for building custom lists.

**Features:**
- Multiple size variants (sm, md, lg)
- Color variants for active/selected states
- Loading state with skeleton placeholders
- Disabled state
- Hoverable styling
- Link support (href prop)
- Keyboard navigation
- Leading/trailing content slots (icons, badges, actions)
- Full content customization via children snippet

**Relationship with List component:**
- ListItem is a standalone component, can be used independently or within List
- When used within List's children snippet, provides full customization
- List component's items array mode handles basic cases internally
- Use ListItem for advanced scenarios requiring custom rendering logic

**Example - Standalone:**
```svelte
<ListItem 
  label="Settings" 
  description="Manage your preferences"
  active 
  variant="primary"
  leading={settingsIconSnippet}
/>
```

**Example - Within List:**
```svelte
<List>
  <li><ListItem label="Item 1" /></li>
  <li><ListItem label="Item 2" active /></li>
</List>
```

**Example - With snippets:**
```svelte
<ListItem label="User Profile">
  {#snippet leading()}
    <Avatar src="/user.jpg" size="sm" />
  {/snippet}
  {#snippet trailing()}
    <Badge label="Pro" variant="success" />
  {/snippet}
</ListItem>
```
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Spinner from '../feedback/Spinner.svelte';
	import Text from '../typography/Text.svelte';

	/**
	 * Props interface for the ListItem component
	 */
	interface Props {
		/**
		 * Primary text content of the list item
		 */
		label: string;
		/**
		 * Secondary/description text displayed below the label
		 */
		description?: string;
		/**
		 * Color variant of the list item when active or focused
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
		 * Size of the list item
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Whether the list item is currently active/selected
		 * @default false
		 */
		active?: boolean;
		/**
		 * Whether the list item is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the list item is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the list item shows hover effect
		 * @default true
		 */
		hoverable?: boolean;
		/**
		 * Whether the list item has a border at the bottom
		 * @default false
		 */
		bordered?: boolean;
		/**
		 * Click handler for the list item
		 */
		onclick?: (event: MouseEvent) => void;
		/**
		 * Keyboard handler for the list item
		 */
		onkeydown?: (event: KeyboardEvent) => void;
		/**
		 * URL to navigate to (makes the item a link)
		 */
		href?: string;
		/**
		 * Target for the link
		 */
		target?: '_blank' | '_self' | '_parent' | '_top';
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Whether the item is currently selected (for aria-selected)
		 */
		selected?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Slot for leading content (icon, avatar, checkbox, etc.)
		 */
		leading?: Snippet;
		/**
		 * Slot for trailing content (badge, action buttons, etc.)
		 */
		trailing?: Snippet;
		/**
		 * Slot for custom content (replaces label and description)
		 */
		children?: Snippet;
	}

	const {
		label,
		description,
		variant = 'neutral',
		size = 'md',
		active = false,
		disabled = false,
		loading = false,
		hoverable = true,
		bordered = false,
		onclick,
		onkeydown,
		href,
		target,
		ariaLabel,
		selected,
		class: className = '',
		leading,
		trailing,
		children,
		...props
	}: Props = $props();

	// Base classes for the list item container
	let containerClasses = $derived(
		[
			'flex items-center gap-3 w-full transition-colors duration-200',
			// Size classes
			size === 'sm' && 'px-3 py-2 text-sm',
			size === 'md' && 'px-4 py-3 text-base',
			size === 'lg' && 'px-5 py-4 text-lg',
			// Hover effect
			hoverable && !disabled && 'hover:bg-base-200 cursor-pointer',
			// Active/selected state using static classes
			active && variant === 'primary' && 'bg-primary text-primary-content',
			active && variant === 'secondary' && 'bg-secondary text-secondary-content',
			active && variant === 'accent' && 'bg-accent text-accent-content',
			active && variant === 'neutral' && 'bg-base-300 text-base-content',
			active && variant === 'info' && 'bg-info text-info-content',
			active && variant === 'success' && 'bg-success text-success-content',
			active && variant === 'warning' && 'bg-warning text-warning-content',
			active && variant === 'error' && 'bg-error text-error-content',
			// Disabled state
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			// Border
			bordered && 'border-b border-base-300',
			// Focus visible
			!disabled && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
			// Custom classes
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Text styling for labels
	let labelExtraClasses = $derived(
		[
			'truncate',
			disabled && 'text-base-content/50',
			active && 'font-semibold'
		]
			.filter(Boolean)
			.join(' ')
	);

	let descriptionExtraClasses = $derived(
		[
			'truncate',
			active ? 'opacity-80' : 'opacity-70',
			disabled && 'text-base-content/40'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Loading spinner size based on item size
	let spinnerSizeClass = $derived(
		size === 'sm' ? 'loading-xs' : size === 'md' ? 'loading-sm' : 'loading-md'
	);

	// Determine if the item is interactive
	let isInteractive = $derived(!!onclick || !!href || !!onkeydown);

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (onclick) {
				onclick(event as unknown as MouseEvent);
			}
		}

		if (onkeydown) {
			onkeydown(event);
		}
	}

	// Handle click
	function handleClick(event: MouseEvent) {
		if (disabled) return;
		if (onclick) {
			onclick(event);
		}
	}
</script>

<!-- 
	NOTE: Raw HTML span elements are used in this component for structural layout.
	REASON: These spans are pure flexbox containers with no semantic meaning.
	TECHNICAL JUSTIFICATION:
	- flex-shrink-0: Prevents icon/avatar/badge from being compressed in flex layout
	- min-w-0 flex-1: Enables text truncation (without min-w-0, flex items don't shrink below content size)
	- All structural spans are marked with aria-hidden="true" to indicate they're decorative
	NO LIBRARY COMPONENT EXISTS: No generic container component for flexbox wrappers
	VALIDATION: This is a standard CSS flexbox pattern for truncating text in flex containers
-->

{#if href && !disabled}
	<!-- Link variant -->
	<a
		{href}
		{target}
		class={containerClasses}
		aria-label={ariaLabel || label}
		aria-disabled={disabled}
		aria-current={active ? 'true' : undefined}
		rel={target === '_blank' ? 'noopener noreferrer' : undefined}
		{...props}
	>
		{#if loading}
			<Spinner
				size={spinnerSizeClass === 'loading-xs'
					? 'xs'
					: spinnerSizeClass === 'loading-sm'
						? 'sm'
						: 'md'}
			/>
		{:else if leading}
			<span class="flex-shrink-0" aria-hidden="true">
				{@render leading()}
			</span>
		{/if}

		<span class="min-w-0 flex-1">
			{#if children}
				{@render children()}
			{:else if loading}
				<!-- Loading skeleton for label and description -->
				<div class="skeleton h-4 w-32"></div>
				{#if description}
					<div class="skeleton mt-1 h-3 w-48"></div>
				{/if}
			{:else}
				<Text text={label} weight="medium" class={labelExtraClasses} />
				{#if description}
					<Text text={description} size="sm" class={descriptionExtraClasses} />
				{/if}
			{/if}
		</span>

		{#if trailing}
			<span class="flex-shrink-0" aria-hidden="true">
				{@render trailing()}
			</span>
		{/if}
	</a>
{:else}
	<!-- Button/div variant -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class={containerClasses}
		role={isInteractive ? 'button' : selected !== undefined ? 'option' : 'listitem'}
		tabindex={isInteractive && !disabled ? 0 : undefined}
		aria-label={ariaLabel || label}
		aria-disabled={disabled}
		aria-selected={selected}
		aria-current={active ? 'true' : undefined}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...props}
	>
		{#if loading}
			<Spinner
				size={spinnerSizeClass === 'loading-xs'
					? 'xs'
					: spinnerSizeClass === 'loading-sm'
						? 'sm'
						: 'md'}
			/>
		{:else if leading}
			<span class="flex-shrink-0" aria-hidden="true">
				{@render leading()}
			</span>
		{/if}

		<span class="flex min-w-0 flex-1 flex-col">
			{#if children}
				{@render children()}
			{:else if loading}
				<!-- Loading skeleton for label and description -->
				<div class="skeleton h-4 w-32"></div>
				{#if description}
					<div class="skeleton mt-1 h-3 w-48"></div>
				{/if}
			{:else}
				<Text text={label} weight="medium" class={labelExtraClasses} />
				{#if description}
					<Text text={description} size="sm" class={descriptionExtraClasses} />
				{/if}
			{/if}
		</span>

		{#if trailing}
			<span class="flex-shrink-0">
				{@render trailing()}
			</span>
		{/if}
	</div>
{/if}
