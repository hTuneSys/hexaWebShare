<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component Icon

A flexible icon component that wraps SVG icons (including Lucide icons) with consistent sizing,
theming, and accessibility features.

**Features:**
- Supports any SVG icon via children snippet
- Integrates seamlessly with Lucide icons (peer dependency)
- Consistent sizing with xs/sm/md/lg/xl sizes
- Theme-aware color variants
- Optional spinning animation
- Full accessibility support (ARIA labels)
- Disabled state support

**Lucide Integration:**
This component is designed to work perfectly with Lucide icons. Simply import any Lucide icon
and pass it as a child:

```svelte
<script>
  import { Icon } from 'hexawebshare';
  import { X, Check, ChevronDown, Search } from 'lucide-svelte';
</script>

<Icon size="md" variant="primary">
  <X />
</Icon>

<Icon size="lg" variant="success">
  <Check />
</Icon>
```

**Custom SVG Icons:**
You can also use custom SVG icons:

```svelte
<Icon size="md" variant="neutral">
  {#snippet children()}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
    </svg>
  {/snippet}
</Icon>
```

**Default Fallback:**
If no children are provided, displays a default star icon as a placeholder.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the Icon component
	 */
	interface Props {
		/**
		 * Icon name/identifier for semantic purposes
		 */
		name?: string;
		/**
		 * Color variant of the icon
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
		 * Size of the icon
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Enable spinning animation (useful for loading icons)
		 * @default false
		 */
		spin?: boolean;
		/**
		 * Whether the icon is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Hide icon from screen readers (decorative icons)
		 * @default false
		 */
		ariaHidden?: boolean;
		/**
		 * Custom SVG content as a snippet
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		name,
		variant = 'neutral',
		size = 'md',
		spin = false,
		disabled = false,
		ariaLabel,
		ariaHidden = false,
		children,
		class: className = '',
		...props
	}: Props = $props();

	// Size class mapping using static Tailwind classes
	let sizeClass = $derived(
		size === 'xs'
			? 'w-3 h-3'
			: size === 'sm'
				? 'w-4 h-4'
				: size === 'md'
					? 'w-5 h-5'
					: size === 'lg'
						? 'w-6 h-6'
						: 'w-8 h-8'
	);

	// Variant class mapping using static DaisyUI/Tailwind color classes
	let variantClass = $derived(
		variant === 'primary'
			? 'text-primary'
			: variant === 'secondary'
				? 'text-secondary'
				: variant === 'accent'
					? 'text-accent'
					: variant === 'neutral'
						? 'text-base-content'
						: variant === 'info'
							? 'text-info'
							: variant === 'success'
								? 'text-success'
								: variant === 'warning'
									? 'text-warning'
									: 'text-error'
	);

	// Combined classes using Tailwind utilities
	let iconClasses = $derived(
		[
			'inline-flex',
			'items-center',
			'justify-center',
			'shrink-0',
			'leading-none',
			sizeClass,
			variantClass,
			spin && 'animate-spin',
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Accessibility: Determine if icon is decorative or semantic
	let isDecorative = $derived(ariaHidden || !ariaLabel);
</script>

<span
	class={iconClasses}
	aria-label={ariaLabel}
	aria-hidden={isDecorative}
	aria-disabled={disabled}
	role={isDecorative ? undefined : 'img'}
	data-icon={name}
	{...props}
>
	{#if children}
		{@render children()}
	{:else}
		<!-- Default placeholder icon (star) when no children provided -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			class="block h-full w-full"
		>
			<path
				d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
			/>
		</svg>
	{/if}
</span>
