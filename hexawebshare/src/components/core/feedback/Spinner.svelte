<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the Spinner component
	 */
	interface Props {
		/**
		 * Visual type of the spinner animation
		 * @default 'spinner'
		 */
		type?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
		/**
		 * Size of the spinner
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Color variant of the spinner
		 * @default 'primary'
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
		 * Accessible label for screen readers
		 * @default 'Loading'
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		type = 'spinner',
		size = 'md',
		variant = 'primary',
		ariaLabel = 'Loading',
		class: className = '',
		...props
	}: Props = $props();

	let spinnerClasses = $derived(
		[
			'loading',
			type === 'spinner' && 'loading-spinner',
			type === 'dots' && 'loading-dots',
			type === 'ring' && 'loading-ring',
			type === 'ball' && 'loading-ball',
			type === 'bars' && 'loading-bars',
			type === 'infinity' && 'loading-infinity',
			size === 'xs' && 'loading-xs',
			size === 'sm' && 'loading-sm',
			size === 'md' && 'loading-md',
			size === 'lg' && 'loading-lg',
			variant === 'primary' && 'text-primary',
			variant === 'secondary' && 'text-secondary',
			variant === 'accent' && 'text-accent',
			variant === 'neutral' && 'text-neutral',
			variant === 'info' && 'text-info',
			variant === 'success' && 'text-success',
			variant === 'warning' && 'text-warning',
			variant === 'error' && 'text-error',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<span class={spinnerClasses} role="status" aria-label={ariaLabel} {...props}></span>
