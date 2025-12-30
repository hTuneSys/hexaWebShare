<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
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
		 * Make the icon clickable
		 * @default false
		 */
		clickable?: boolean;
		/**
		 * Callback when icon is clicked (only works if clickable is true)
		 */
		onclick?: () => void;
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
		clickable = false,
		onclick,
		ariaLabel,
		ariaHidden = false,
		children,
		class: className = '',
		...props
	}: Props = $props();

	// Size class mapping
	let sizeClass = $derived(
		size === 'xs'
			? 'icon--xs'
			: size === 'sm'
				? 'icon--sm'
				: size === 'md'
					? 'icon--md'
					: size === 'lg'
						? 'icon--lg'
						: 'icon--xl'
	);

	// Variant class mapping
	let variantClass = $derived(
		variant === 'primary'
			? 'icon--primary'
			: variant === 'secondary'
				? 'icon--secondary'
				: variant === 'accent'
					? 'icon--accent'
					: variant === 'neutral'
						? 'icon--neutral'
						: variant === 'info'
							? 'icon--info'
							: variant === 'success'
								? 'icon--success'
								: variant === 'warning'
									? 'icon--warning'
									: 'icon--error'
	);

	// Combined classes
	let iconClasses = $derived(
		[
			'icon',
			sizeClass,
			variantClass,
			spin && 'icon--spin',
			disabled && 'icon--disabled',
			clickable && !disabled && 'icon--clickable',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Accessibility: Determine if icon is decorative or semantic
	let isDecorative = $derived(ariaHidden || !ariaLabel);

	// Handle click event
	function handleClick() {
		if (clickable && !disabled && onclick) {
			onclick();
		}
	}

	// Handle keyboard navigation
	function handleKeyDown(event: KeyboardEvent) {
		if (disabled) return;

		if (clickable && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault();
			if (onclick) onclick();
		}
	}
</script>

<span
	class={iconClasses}
	aria-label={ariaLabel}
	aria-hidden={isDecorative}
	aria-disabled={disabled}
	role={clickable ? 'button' : isDecorative ? undefined : 'img'}
	tabindex={clickable && !disabled ? 0 : undefined}
	data-icon={name}
	onclick={handleClick}
	onkeydown={handleKeyDown}
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
			class="icon__svg"
		>
			<path
				d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
			/>
		</svg>
	{/if}
</span>

<style>
	/* Base icon styles */
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		line-height: 1;
	}

	/* SVG inside icon */
	.icon :global(svg),
	.icon__svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	/* Size variants */
	.icon--xs {
		width: 12px;
		height: 12px;
	}
	.icon--sm {
		width: 16px;
		height: 16px;
	}
	.icon--md {
		width: 20px;
		height: 20px;
	}
	.icon--lg {
		width: 24px;
		height: 24px;
	}
	.icon--xl {
		width: 32px;
		height: 32px;
	}

	/* Color variants using DaisyUI CSS variables */
	.icon--primary {
		color: var(--color-primary, #570df8);
	}
	.icon--secondary {
		color: var(--color-secondary, #f000b8);
	}
	.icon--accent {
		color: var(--color-accent, #37cdbe);
	}
	.icon--neutral {
		color: var(--color-base-content, #1f2937);
	}
	.icon--info {
		color: var(--color-info, #3abff8);
	}
	.icon--success {
		color: var(--color-success, #36d399);
	}
	.icon--warning {
		color: var(--color-warning, #fbbd23);
	}
	.icon--error {
		color: var(--color-error, #f87272);
	}

	/* Spin animation */
	@keyframes icon-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.icon--spin {
		animation: icon-spin 1s linear infinite;
	}

	/* Disabled state */
	.icon--disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Clickable state */
	.icon--clickable {
		cursor: pointer;
		transition: opacity 0.2s ease;
	}

	.icon--clickable:hover {
		opacity: 0.7;
	}

	.icon--clickable:focus {
		outline: 2px solid currentColor;
		outline-offset: 2px;
		border-radius: 2px;
	}
</style>
