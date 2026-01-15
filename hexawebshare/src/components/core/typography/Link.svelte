<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	interface Props {
		/**
		 * The URL or path to link to
		 */
		href: string;
		/**
		 * Link text content - can be passed as prop or through children snippet
		 */
		label?: string;
		/**
		 * Child content to render inside the link
		 */
		children?: import('svelte').Snippet;
		/**
		 * Color variant of the link
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
		 * Size of the link text
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Whether to open link in new tab/window
		 */
		target?: '_blank' | '_self' | '_parent' | '_top';
		/**
		 * Relationship between current document and linked document
		 */
		rel?: string;
		/**
		 * Whether the link should be underlined
		 */
		underline?: boolean | 'hover' | 'always' | 'never';
		/**
		 * Whether the link is disabled
		 */
		disabled?: boolean;
		/**
		 * Whether to show hover effect
		 */
		hoverable?: boolean;
		/**
		 * Font weight of the link
		 */
		fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
		/**
		 * Whether to show external link icon
		 */
		external?: boolean;
		/**
		 * Custom class name
		 */
		class?: string;
		/**
		 * HTML id attribute
		 */
		id?: string;
		/**
		 * HTML tabindex attribute
		 */
		tabindex?: number;
		/**
		 * HTML role attribute
		 */
		role?: string;
		/**
		 * ARIA disabled attribute
		 */
		'aria-disabled'?: boolean;
		/**
		 * ARIA label for accessibility
		 */
		ariaLabel?: string;
		/**
		 * Title attribute for tooltip
		 */
		title?: string;
		/**
		 * Download attribute for download links
		 */
		download?: string | boolean;
		/**
		 * Click event handler
		 */
		onclick?: (event: MouseEvent) => void;
	}

	const {
		children,
		href,
		label,
		variant,
		size = 'md',
		target,
		rel: userRel,
		underline = 'hover',
		disabled = false,
		hoverable = true,
		fontWeight = 'normal',
		external = false,
		class: className = '',
		id,
		tabindex,
		role,
		'aria-disabled': ariaDisabled,
		ariaLabel,
		title,
		download,
		onclick,
		...props
	}: Props = $props();

	// Automatically set rel for external links for security
	let rel = $derived(() => {
		if (userRel) return userRel;
		if (target === '_blank' || external) {
			return 'noopener noreferrer';
		}
		return undefined;
	});

	// Link classes using static DaisyUI classes
	let linkClasses = $derived(
		[
			'link',
			// Color variants
			variant === 'primary' && 'link-primary',
			variant === 'secondary' && 'link-secondary',
			variant === 'accent' && 'link-accent',
			variant === 'neutral' && 'link-neutral',
			variant === 'info' && 'link-info',
			variant === 'success' && 'link-success',
			variant === 'warning' && 'link-warning',
			variant === 'error' && 'link-error',
			// Size classes
			size === 'xs' && 'text-xs',
			size === 'sm' && 'text-sm',
			size === 'md' && 'text-base',
			size === 'lg' && 'text-lg',
			size === 'xl' && 'text-xl',
			// Underline behavior
			underline === 'hover' && 'link-hover',
			underline === 'always' && 'underline',
			underline === 'never' && 'no-underline',
			underline === true && 'underline',
			// Font weight
			fontWeight === 'medium' && 'font-medium',
			fontWeight === 'semibold' && 'font-semibold',
			fontWeight === 'bold' && 'font-bold',
			// Hover effect
			hoverable && 'transition-colors duration-200',
			// Disabled state
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			// External link indicator
			external && 'inline-flex items-center gap-1',
			// Custom class
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Handle click event
	function handleClick(event: MouseEvent) {
		if (disabled) {
			event.preventDefault();
			return;
		}
		if (onclick) {
			onclick(event);
		}
	}

	// Handle keyboard navigation for accessibility
	function handleKeyDown(event: KeyboardEvent) {
		if (disabled) {
			event.preventDefault();
			return;
		}
		// Allow Enter key to trigger click for accessibility
		if (event.key === 'Enter' && onclick) {
			onclick(event as any);
		}
	}
</script>

<a
	{href}
	class={linkClasses}
	{target}
	rel={rel()}
		id={id}
		role={role}
		aria-label={ariaLabel}
	aria-disabled={ariaDisabled !== undefined ? ariaDisabled : disabled}
	{title}
	download={download === true ? '' : download === false ? undefined : download}
	tabindex={tabindex !== undefined ? tabindex : disabled ? -1 : 0}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	{...props}
>
	{#if children}
		{@render children()}
	{:else if label}
		{label}
	{/if}
	{#if external}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="inline-block"
			aria-hidden="true"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
			<polyline points="15 3 21 3 21 9"></polyline>
			<line x1="10" y1="14" x2="21" y2="3"></line>
		</svg>
	{/if}
</a>
