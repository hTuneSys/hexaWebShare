<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the Accordion component
	 */
	interface Props {
		/**
		 * Whether multiple items can be open at the same time
		 * @default false
		 */
		multiple?: boolean;
		/**
		 * Index or array of indices of initially open items
		 * @default []
		 */
		defaultOpen?: number | number[];
		/**
		 * Visual variant of the accordion
		 * @default 'default'
		 */
		variant?: 'default' | 'bordered' | 'ghost';
		/**
		 * Size of the accordion items
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Whether the accordion is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Accordion items content (using Svelte 5 snippets)
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Accessible label for the accordion
		 */
		ariaLabel?: string;
		/**
		 * Callback when an item is opened
		 */
		onItemOpen?: (index: number) => void;
		/**
		 * Callback when an item is closed
		 */
		onItemClose?: (index: number) => void;
	}

	const {
		multiple = false,
		defaultOpen = [],
		variant = 'default',
		size = 'md',
		disabled = false,
		children,
		class: className = '',
		ariaLabel,
		onItemOpen,
		onItemClose,
		...props
	}: Props = $props();

	// Track open items
	let openItems = $state<Set<number>>(
		new Set(
			Array.isArray(defaultOpen) ? defaultOpen : defaultOpen !== undefined ? [defaultOpen] : []
		)
	);

	// Create reactive context object first
	const accordionContext = $state({
		toggleItem: (index: number) => {
			if (accordionContext.disabled) return;

			if (openItems.has(index)) {
				openItems.delete(index);
				if (onItemClose) onItemClose(index);
			} else {
				// Use current multiple value from context (reactive)
				if (!accordionContext.multiple) {
					openItems.clear();
				}
				openItems.add(index);
				if (onItemOpen) onItemOpen(index);
			}
			// Trigger reactivity
			openItems = new Set(openItems);
		},
		isItemOpen: (index: number): boolean => {
			return openItems.has(index);
		},
		multiple,
		disabled,
		size
	});

	// Update context when props change - this ensures toggleItem uses latest multiple value
	$effect(() => {
		accordionContext.multiple = multiple;
		accordionContext.disabled = disabled;
		accordionContext.size = size;

		// If multiple changes from true to false, close all but the first open item
		if (!multiple && openItems.size > 1) {
			const firstOpen = Array.from(openItems)[0];
			openItems = new Set([firstOpen]);
		}
	});

	// Share accordion state with child components via context
	setContext('accordion', accordionContext);

	// Accordion container classes
	let accordionClasses = $derived(
		[
			'accordion',
			variant === 'bordered' && 'border border-base-300 rounded-lg divide-y divide-base-300',
			variant === 'ghost' && 'bg-base-100',
			variant === 'default' && 'bg-base-200',
			disabled && 'opacity-50 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={accordionClasses} role="region" aria-label={ariaLabel || 'Accordion'} {...props}>
	{#if children}
		{@render children()}
	{/if}
</div>
