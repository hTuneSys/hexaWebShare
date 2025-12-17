<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Placement = 'top' | 'bottom' | 'left' | 'right';
	type Align = 'start' | 'center' | 'end';
	type Tone =
		| 'neutral'
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'info'
		| 'success'
		| 'warning'
		| 'error';
	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		trigger?: Snippet;
		children?: Snippet;
		open?: boolean;
		defaultOpen?: boolean;
		placement?: Placement;
		align?: Align;
		tone?: Tone;
		size?: Size;
		closeOnOutsideClick?: boolean;
		closeOnEscape?: boolean;
		disabled?: boolean;
		ariaLabel?: string;
		ariaDescribedBy?: string;
		triggerAriaLabel?: string;
		class?: string;
		triggerClass?: string;
		contentClass?: string;
		onOpenChange?: (open: boolean) => void;
	}

	const {
		trigger,
		children,
		open,
		defaultOpen = false,
		placement = 'bottom',
		align = 'center',
		tone = 'neutral',
		size = 'md',
		closeOnOutsideClick = true,
		closeOnEscape = true,
		disabled = false,
		ariaLabel,
		ariaDescribedBy,
		triggerAriaLabel,
		class: className = '',
		triggerClass = '',
		contentClass = '',
		onOpenChange,
		...props
	}: Props = $props();

	const isControlled = open !== undefined;

	let internalOpen = $state(defaultOpen);
	let popoverElement = $state<HTMLDivElement | null>(null);
	let triggerElement = $state<HTMLElement | null>(null);
	let contentElement = $state<HTMLDivElement | null>(null);

	const contentId = `popover-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;

	let isOpen = $derived(open ?? internalOpen);

	function setOpen(next: boolean) {
		if (disabled) return;
		if (!isControlled) {
			internalOpen = next;
		}
		onOpenChange?.(next);
	}

	function toggleOpen() {
		setOpen(!isOpen);
	}

	function handleTriggerClick() {
		if (disabled) return;
		toggleOpen();
	}

	function handleTriggerKeydown(event: KeyboardEvent) {
		if (disabled) return;
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			toggleOpen();
		}
		if (event.key === 'Escape' && isOpen) {
			event.stopPropagation();
			setOpen(false);
			triggerElement?.focus();
		}
	}

	// Close when clicking outside the popover
	$effect(() => {
		if (!isOpen || !closeOnOutsideClick) return;

		function handlePointerDown(event: PointerEvent) {
			if (!popoverElement) return;
			const target = event.target as Node;
			if (!popoverElement.contains(target)) {
				setOpen(false);
			}
		}

		document.addEventListener('pointerdown', handlePointerDown);
		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
		};
	});

	// Close with Escape key
	$effect(() => {
		if (!isOpen || !closeOnEscape) return;

		function handleKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setOpen(false);
				triggerElement?.focus();
			}
		}

		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	// Focus first focusable element when the popover opens
	$effect(() => {
		if (isOpen && contentElement) {
			const focusable = contentElement.querySelector<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			focusable?.focus();
		}
	});

	// Calculate position for fixed positioning (prevents overflow issues)
	let popoverStyle = $state<string>('');

	// Update position when popover opens or placement changes
	$effect(() => {
		if (!isOpen || !triggerElement || !contentElement) {
			popoverStyle = '';
			return;
		}

		const updatePosition = () => {
			if (!triggerElement || !contentElement) return;

			const triggerRect = triggerElement.getBoundingClientRect();
			const contentRect = contentElement.getBoundingClientRect();
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;
			const spacing = 8; // 8px spacing (mt-2 equivalent)

			let top = 0;
			let left = 0;

			// Calculate position based on placement
			if (placement === 'bottom') {
				top = triggerRect.bottom + spacing;
				if (align === 'start') {
					left = triggerRect.left;
				} else if (align === 'end') {
					left = triggerRect.right - contentRect.width;
				} else {
					left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
				}
			} else if (placement === 'top') {
				top = triggerRect.top - contentRect.height - spacing;
				if (align === 'start') {
					left = triggerRect.left;
				} else if (align === 'end') {
					left = triggerRect.right - contentRect.width;
				} else {
					left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
				}
			} else if (placement === 'right') {
				left = triggerRect.right + spacing;
				if (align === 'start') {
					top = triggerRect.top;
				} else if (align === 'end') {
					top = triggerRect.bottom - contentRect.height;
				} else {
					top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
				}
			} else if (placement === 'left') {
				left = triggerRect.left - contentRect.width - spacing;
				if (align === 'start') {
					top = triggerRect.top;
				} else if (align === 'end') {
					top = triggerRect.bottom - contentRect.height;
				} else {
					top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
				}
			}

			// Keep popover within viewport bounds
			if (left < 0) left = spacing;
			if (left + contentRect.width > viewportWidth) {
				left = viewportWidth - contentRect.width - spacing;
			}
			if (top < 0) top = spacing;
			if (top + contentRect.height > viewportHeight) {
				top = viewportHeight - contentRect.height - spacing;
			}

			popoverStyle = `position: fixed; top: ${top}px; left: ${left}px; z-index: 50;`;
		};

		// Use requestAnimationFrame to ensure element is rendered
		requestAnimationFrame(() => {
			updatePosition();
		});

		// Update on scroll/resize
		window.addEventListener('scroll', updatePosition, true);
		window.addEventListener('resize', updatePosition);

		return () => {
			window.removeEventListener('scroll', updatePosition, true);
			window.removeEventListener('resize', updatePosition);
		};
	});

	// Positioning classes for popover content (fallback for absolute positioning)
	let contentPositionClasses = $derived.by(() => {
		const base = ['z-50'];
		return base.join(' ');
	});

	let popoverClasses = $derived(
		['relative', 'inline-block', disabled && 'opacity-60 pointer-events-none', className]
			.filter(Boolean)
			.join(' ')
	);

	let triggerClasses = $derived(['w-fit', triggerClass].filter(Boolean).join(' '));

	let contentClasses = $derived(
		[
			'border',
			'border-base-300',
			'bg-base-100',
			'rounded-box',
			'shadow-lg',
			'p-4',
			'max-w-full',
			'text-base',
			size === 'sm' && 'text-sm max-w-xs p-2',
			size === 'md' && 'max-w-sm',
			size === 'lg' && 'max-w-md p-6',
			tone === 'primary' && 'bg-primary text-primary-content border-primary',
			tone === 'secondary' && 'bg-secondary text-secondary-content border-secondary',
			tone === 'accent' && 'bg-accent text-accent-content border-accent',
			tone === 'info' && 'bg-info text-info-content border-info',
			tone === 'success' && 'bg-success text-success-content border-success',
			tone === 'warning' && 'bg-warning text-warning-content border-warning',
			tone === 'error' && 'bg-error text-error-content border-error',
			contentClass
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div
	bind:this={popoverElement}
	class={popoverClasses}
	data-state={isOpen ? 'open' : 'closed'}
	{...props}
>
	<div
		bind:this={triggerElement}
		class={triggerClasses}
		role="button"
		tabindex={disabled ? -1 : 0}
		aria-haspopup="dialog"
		aria-expanded={isOpen}
		aria-controls={contentId}
		aria-label={triggerAriaLabel}
		onclick={handleTriggerClick}
		onkeydown={handleTriggerKeydown}
	>
		{#if trigger}
			{@render trigger()}
		{:else}
			<button class="btn btn-primary" type="button">Toggle popover</button>
		{/if}
	</div>

	{#if isOpen}
		<div
			id={contentId}
			bind:this={contentElement}
			class={contentPositionClasses + ' ' + contentClasses}
			style={popoverStyle}
			role="dialog"
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
			aria-hidden={false}
			data-open={isOpen}
		>
			{#if children}
				{@render children()}
			{:else}
				<div class="space-y-1">
					<p class="font-semibold">Popover title</p>
					<p class="text-sm text-base-content/80">Add your popover content here.</p>
				</div>
			{/if}
		</div>
	{/if}
</div>
