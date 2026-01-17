<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component MutedText
Tailwind JIT Safelist (do not remove - ensures classes are included in build):
w-full block
text-xs text-sm text-base text-lg text-xl text-2xl
text-left text-center text-right text-justify
text-base-content/60
text-primary text-secondary text-accent text-info text-success text-warning text-error
font-light font-normal font-medium font-semibold font-bold
leading-none leading-tight leading-snug leading-normal leading-relaxed leading-loose
line-clamp-1 line-clamp-2 line-clamp-3 line-clamp-4 line-clamp-5 line-clamp-6
truncate italic underline line-through
animate-pulse bg-base-300 rounded text-transparent select-none
opacity-50 cursor-not-allowed
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the MutedText component
	 */
	interface Props {
		/**
		 * Text content (alternative to children snippet)
		 */
		text?: string;
		/**
		 * Size variant of the muted text
		 * @default 'base'
		 */
		size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
		/**
		 * Text alignment
		 * @default 'left'
		 */
		align?: 'left' | 'center' | 'right' | 'justify';
		/**
		 * Color variant of the muted text
		 * @default 'muted'
		 */
		variant?:
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
		 * @default 'normal'
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
		 * Whether the muted text is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the muted text is disabled (reduced opacity)
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
		 * Element ID
		 */
		id?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Hide muted text from screen readers (decorative text)
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
		size = 'base',
		align = 'left',
		variant = 'muted',
		weight = 'normal',
		leading = 'normal',
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

	// MutedText classes using static Tailwind/DaisyUI classes
	let mutedTextClasses = $derived(
		[
			// Base - w-full ensures alignment works properly
			'muted-text',
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

	// Determine if muted text is decorative
	let isDecorative = $derived(ariaHidden);
</script>

<p
	class={mutedTextClasses}
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
