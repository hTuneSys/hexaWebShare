<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component Lead
Tailwind JIT Safelist (do not remove - ensures classes are included in build):
lead
w-full block
text-xs text-sm text-base text-lg text-xl text-2xl
text-left text-center text-right text-justify
text-base-content text-base-content/60
text-primary text-secondary text-accent text-info text-success text-warning text-error
font-light font-normal font-medium font-semibold font-bold
leading-none leading-tight leading-snug leading-normal leading-relaxed leading-loose
line-clamp-1 line-clamp-2 line-clamp-3 line-clamp-4 line-clamp-5 line-clamp-6
truncate italic underline line-through
animate-pulse bg-base-300 rounded text-transparent select-none
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the Lead component
	 */
	interface Props {
		/**
		 * Text content (alternative to children snippet)
		 */
		text?: string;
		/**
		 * Size variant of the lead text
		 * @default 'lg'
		 */
		size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
		/**
		 * Text alignment
		 * @default 'left'
		 */
		align?: 'left' | 'center' | 'right' | 'justify';
		/**
		 * Color variant of the lead text
		 * @default 'default'
		 */
		variant?:
			| 'default'
			| 'muted'
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		/**
		 * Font weight
		 * @default 'normal'
		 */
		weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
		/**
		 * Line height / leading
		 * @default 'relaxed'
		 */
		leading?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
		/**
		 * Truncate text with ellipsis (single line)
		 * @default false
		 */
		truncate?: boolean;
		/**
		 * Limit text to specified number of lines (with ellipsis)
		 */
		lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
		/**
		 * Whether the lead text is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the lead text is disabled (reduced opacity)
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Use italic style
		 * @default false
		 */
		italic?: boolean;
		/**
		 * Use underline style
		 * @default false
		 */
		underline?: boolean;
		/**
		 * Use strikethrough style
		 * @default false
		 */
		strikethrough?: boolean;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Hide lead text from screen readers (decorative text)
		 * @default false
		 */
		ariaHidden?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Children snippet for complex content
		 */
		children?: Snippet;
	}

	const {
		text,
		size = 'lg',
		align = 'left',
		variant = 'default',
		weight = 'normal',
		leading = 'relaxed',
		truncate = false,
		lineClamp,
		loading = false,
		disabled = false,
		italic = false,
		underline = false,
		strikethrough = false,
		ariaLabel,
		ariaHidden = false,
		class: className = '',
		children,
		...props
	}: Props = $props();

	// Lead classes using static Tailwind/DaisyUI classes
	let leadClasses = $derived(
		[
			// Base - DaisyUI lead class for typography
			'lead',
			'w-full',
			'block',
			// Size
			size === 'xs' && 'text-xs',
			size === 'sm' && 'text-sm',
			size === 'base' && 'text-base',
			size === 'lg' && 'text-lg',
			size === 'xl' && 'text-xl',
			size === '2xl' && 'text-2xl',
			// Alignment
			align === 'left' && 'text-left',
			align === 'center' && 'text-center',
			align === 'right' && 'text-right',
			align === 'justify' && 'text-justify',
			// Variant/Color - only apply color when not loading
			!loading && variant === 'default' && 'text-base-content',
			!loading && variant === 'muted' && 'text-base-content/60',
			!loading && variant === 'primary' && 'text-primary',
			!loading && variant === 'secondary' && 'text-secondary',
			!loading && variant === 'accent' && 'text-accent',
			!loading && variant === 'info' && 'text-info',
			!loading && variant === 'success' && 'text-success',
			!loading && variant === 'warning' && 'text-warning',
			!loading && variant === 'error' && 'text-error',
			// Weight
			weight === 'light' && 'font-light',
			weight === 'normal' && 'font-normal',
			weight === 'medium' && 'font-medium',
			weight === 'semibold' && 'font-semibold',
			weight === 'bold' && 'font-bold',
			// Leading
			leading === 'none' && 'leading-none',
			leading === 'tight' && 'leading-tight',
			leading === 'snug' && 'leading-snug',
			leading === 'normal' && 'leading-normal',
			leading === 'relaxed' && 'leading-relaxed',
			leading === 'loose' && 'leading-loose',
			// Truncation
			truncate && 'truncate',
			lineClamp === 1 && 'line-clamp-1',
			lineClamp === 2 && 'line-clamp-2',
			lineClamp === 3 && 'line-clamp-3',
			lineClamp === 4 && 'line-clamp-4',
			lineClamp === 5 && 'line-clamp-5',
			lineClamp === 6 && 'line-clamp-6',
			// Text styles
			italic && 'italic',
			underline && 'underline',
			strikethrough && 'line-through',
			// Loading state
			loading && 'animate-pulse bg-base-300 rounded text-transparent select-none',
			// Disabled state
			disabled && 'opacity-50 cursor-not-allowed',
			// Custom classes
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Determine if lead text is decorative
	let isDecorative = $derived(ariaHidden);
</script>

<p
	class={leadClasses}
	aria-label={ariaLabel}
	aria-hidden={isDecorative || undefined}
	aria-busy={loading || undefined}
	{...props}
>
	{#if children}
		{@render children()}
	{:else if text}
		{text}
	{/if}
</p>
