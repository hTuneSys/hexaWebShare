<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		text: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		ariaLabel?: string;
		disabled?: boolean;
		class?: string;
	}

	const {
		children,
		text,
		position = 'top',
		variant,
		ariaLabel,
		disabled = false,
		class: className = '',
		...props
	}: Props = $props();

	let tooltipElement: HTMLDivElement;
	let triggerElement: HTMLElement | null = null;

	let tooltipClasses = $derived(
		[
			'tooltip',
			position === 'top' && 'tooltip-top',
			position === 'bottom' && 'tooltip-bottom',
			position === 'left' && 'tooltip-left',
			position === 'right' && 'tooltip-right',
			variant === 'primary' && 'tooltip-primary',
			variant === 'secondary' && 'tooltip-secondary',
			variant === 'accent' && 'tooltip-accent',
			variant === 'info' && 'tooltip-info',
			variant === 'success' && 'tooltip-success',
			variant === 'warning' && 'tooltip-warning',
			variant === 'error' && 'tooltip-error',
			disabled && 'pointer-events-none opacity-50',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Accessibility: Generate unique ID for tooltip
	// Corrected: Use const and crypto.randomUUID for stable ID
	const tooltipId = `tooltip-${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2)}`;

	// Keyboard navigation support
	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;

		// Escape key closes tooltip (by blurring the trigger)
		if (event.key === 'Escape') {
			if (triggerElement) {
				triggerElement.blur();
			}
		}
	}

	// Find the first focusable child element using $effect instead of onMount
	$effect(() => {
		if (tooltipElement) {
			// Find the first interactive child element (button, input, link, etc.)
			// We check this inside the effect to ensure DOM is ready
			triggerElement =
				tooltipElement.querySelector('button, a, input, select, textarea, [tabindex]') ||
				(tooltipElement.firstElementChild as HTMLElement);

			// Ensure the trigger element is focusable if it's not already
			if (triggerElement && !triggerElement.hasAttribute('tabindex')) {
				// Only add tabindex if it's not a native interactive element
				if (
					!['button', 'a', 'input', 'select', 'textarea'].includes(
						triggerElement.tagName.toLowerCase()
					)
				) {
					triggerElement.setAttribute('tabindex', '0');
				}
			}

			// Add keyboard event listener
			if (triggerElement) {
				triggerElement.addEventListener('keydown', handleKeydown);
			}

			return () => {
				if (triggerElement) {
					triggerElement.removeEventListener('keydown', handleKeydown);
				}
			};
		}
	});
</script>

<div
	bind:this={tooltipElement}
	class={tooltipClasses}
	data-tip={disabled ? undefined : text}
	aria-label={ariaLabel || (disabled ? undefined : text)}
	{...props}
>
	{@render children()}
</div>
