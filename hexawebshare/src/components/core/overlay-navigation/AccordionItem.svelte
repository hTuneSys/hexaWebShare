<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the AccordionItem component
	 */
	interface Props {
		/**
		 * Title text for the accordion item
		 */
		title: string;
		/**
		 * Content to display when the item is expanded
		 */
		children?: Snippet;
		/**
		 * Optional icon snippet to display before the title
		 */
		icon?: Snippet;
		/**
		 * Whether this item is initially open
		 * @default false
		 */
		defaultOpen?: boolean;
		/**
		 * Unique index for this item (auto-generated if not provided)
		 */
		index?: number;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Accessible label for this item
		 */
		ariaLabel?: string;
	}

	const {
		title,
		children,
		icon,
		defaultOpen = false,
		index,
		class: className = '',
		ariaLabel,
		...props
	}: Props = $props();

	// Get accordion context
	const accordionContext = getContext<{
		toggleItem: (index: number) => void;
		isItemOpen: (index: number) => boolean;
		multiple: boolean;
		disabled: boolean;
		size: 'sm' | 'md' | 'lg';
	}>('accordion');

	// Generate unique index if not provided (using crypto or fallback)
	// Use a counter for sequential indices when in Accordion context
	let itemIndex = $state(
		index ??
			(typeof crypto !== 'undefined' && crypto.randomUUID
				? parseInt(crypto.randomUUID().replace(/-/g, ''), 16) % 1000000
				: Math.floor(Math.random() * 1000000))
	);

	// Local state for standalone usage (when not in Accordion context)
	let localOpen = $state(defaultOpen);

	// Get open state from context or use local state - make it reactive
	let isOpen = $derived.by(() => {
		if (accordionContext) {
			return accordionContext.isItemOpen(itemIndex);
		}
		return localOpen;
	});

	// Toggle this item
	function toggle() {
		if (accordionContext) {
			accordionContext.toggleItem(itemIndex);
		} else {
			localOpen = !localOpen;
		}
	}

	// Handle checkbox change - DaisyUI automatically handles collapse-open class based on checked state
	function handleChange(event: Event) {
		toggle();
	}

	// Handle keyboard events for title
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggle();
		}
	}

	// Get size from context or default to 'md' - make it reactive
	const size = $derived.by(() => accordionContext?.size ?? 'md');

	// Collapse classes using DaisyUI
	// Note: DaisyUI automatically adds 'collapse-open' class when checkbox is checked
	let collapseClasses = $derived(
		[
			'collapse',
			'collapse-arrow',
			size === 'sm' && 'text-sm',
			size === 'md' && 'text-base',
			size === 'lg' && 'text-lg',
			accordionContext?.disabled && 'opacity-50 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Title classes with size-based padding
	let titleClasses = $derived(
		[
			'collapse-title',
			'font-medium',
			'flex items-center gap-2',
			size === 'sm' && 'text-sm py-2 px-3 min-h-[2.5rem]',
			size === 'md' && 'text-base py-3 px-4 min-h-[3rem]',
			size === 'lg' && 'text-lg py-4 px-5 min-h-[3.5rem]'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Content classes with size-based padding
	let contentClasses = $derived(
		[
			'collapse-content',
			size === 'sm' && 'text-sm py-2 px-3',
			size === 'md' && 'text-base py-3 px-4',
			size === 'lg' && 'text-lg py-4 px-5'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Unique ID for accessibility
	const itemId = `accordion-item-${itemIndex}`;
	const contentId = `accordion-content-${itemIndex}`;

	// Checkbox element reference for state synchronization
	let checkboxElement = $state<HTMLInputElement | null>(null);

	// Sync checkbox checked state with isOpen
	$effect(() => {
		if (checkboxElement) {
			checkboxElement.checked = isOpen;
		}
	});
</script>

<div class={collapseClasses} {...props}>
	<input
		bind:this={checkboxElement}
		type="checkbox"
		onchange={handleChange}
		aria-expanded={isOpen}
		aria-controls={contentId}
		aria-label={ariaLabel || title}
		disabled={accordionContext?.disabled}
	/>
	<div
		class={titleClasses}
		id={itemId}
		role="button"
		tabindex="0"
		onclick={toggle}
		onkeydown={handleKeyDown}
	>
		{#if icon}
			<span class="accordion-item-icon" aria-hidden="true">
				{@render icon()}
			</span>
		{/if}
		<span>{title}</span>
	</div>
	<div class={contentClasses} id={contentId} role="region" aria-labelledby={itemId}>
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
