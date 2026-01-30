<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import Heading from '../typography/Heading.svelte';

	interface Props {
		/**
		 * Unique ID for the drawer (auto-generated if not provided)
		 */
		id?: string;
		/**
		 * Whether the drawer is open
		 */
		open?: boolean;
		/**
		 * Position of the drawer
		 */
		side?: 'left' | 'right' | 'top' | 'bottom';
		/**
		 * Content to render inside the drawer
		 */
		children?: Snippet;
		/**
		 * Content to render in the main area (behind the drawer)
		 */
		content?: Snippet;
		/**
		 * Title of the drawer
		 */
		title?: string;
		/**
		 * Whether to show overlay backdrop
		 */
		overlay?: boolean;
		/**
		 * Whether clicking the backdrop closes the drawer
		 */
		closeOnBackdrop?: boolean;
		/**
		 * Whether to show close button
		 */
		showCloseButton?: boolean;
		/**
		 * Whether to allow closing with Escape key
		 */
		closeOnEscape?: boolean;
		/**
		 * Custom class for drawer container
		 */
		class?: string;
		/**
		 * Custom class for drawer side panel
		 */
		sideClass?: string;
		/**
		 * Custom class for drawer content area
		 */
		contentClass?: string;
		/**
		 * ARIA label for accessibility
		 */
		ariaLabel?: string;
		/**
		 * Default ARIA label text if ariaLabel and title are not provided
		 * @default 'Drawer'
		 */
		defaultAriaLabel?: string;
		/**
		 * ARIA label for the toggle checkbox
		 * @default 'Toggle drawer'
		 */
		toggleAriaLabel?: string;
		/**
		 * ARIA label for close button/overlay
		 * @default 'Close drawer'
		 */
		closeAriaLabel?: string;
		/**
		 * Callback when drawer is closed
		 */
		onclose?: () => void;
		/**
		 * Callback when drawer is opened
		 */
		onopen?: () => void;
	}

	let {
		id,
		open = $bindable(false),
		side = 'left',
		children,
		content,
		title,
		overlay = true,
		closeOnBackdrop = true,
		showCloseButton = true,
		closeOnEscape = true,
		class: className = '',
		sideClass = '',
		contentClass = '',
		ariaLabel,
		defaultAriaLabel = 'Drawer',
		toggleAriaLabel = 'Toggle drawer',
		closeAriaLabel = 'Close drawer',
		onclose,
		onopen,
		...props
	}: Props = $props();

	// Generate unique IDs to avoid collisions when multiple drawers are on the same page
	const drawerId = $derived(id ?? `drawer-${crypto.randomUUID()}`);
	const toggleId = $derived(`${drawerId}-toggle`);

	// Previous open state for tracking changes
	let previousOpen = $state(open);

	// Watch for open state changes and trigger callbacks
	$effect(() => {
		if (open !== previousOpen) {
			if (open && onopen) {
				onopen();
			} else if (!open && onclose) {
				onclose();
			}
			previousOpen = open;
		}
	});

	// Drawer container classes
	let drawerClasses = $derived(['drawer', className].filter(Boolean).join(' '));

	// Drawer side classes with position
	let drawerSideClasses = $derived(
		[
			'drawer-side',
			// Z-index for overlay
			overlay && 'z-40',
			sideClass
		]
			.filter(Boolean)
			.join(' ')
	);

	// Drawer content classes (the actual drawer panel)
	let drawerContentClasses = $derived(
		[
			'menu',
			'bg-base-200',
			'text-base-content',
			'min-h-full',
			// Width/height based on side
			side === 'left' && 'w-80',
			side === 'right' && 'w-80',
			side === 'top' && 'h-80 w-full',
			side === 'bottom' && 'h-80 w-full',
			// Elevation and position
			'z-20',
			'relative',
			// Padding
			'p-4',
			contentClass
		]
			.filter(Boolean)
			.join(' ')
	);

	// Handle backdrop click
	function handleBackdropClick() {
		if (closeOnBackdrop) {
			open = false;
		}
	}

	// Handle backdrop keyboard interaction (for accessibility)
	function handleBackdropKeydown(event: KeyboardEvent) {
		if (closeOnBackdrop && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault();
			open = false;
		}
	}

	// Handle escape key
	function handleKeyDown(event: KeyboardEvent) {
		if (closeOnEscape && event.key === 'Escape' && open) {
			open = false;
			event.preventDefault();
		}
	}

	// Handle close button click
	function handleClose() {
		open = false;
	}

	// Add/remove escape key listener
	$effect(() => {
		if (open && closeOnEscape) {
			window.addEventListener('keydown', handleKeyDown);
			return () => {
				window.removeEventListener('keydown', handleKeyDown);
			};
		}
	});
</script>

<div class={drawerClasses} {...props}>
	<!-- 
		NOTE: Raw HTML input (checkbox) is intentional here.
		Reason: This is a core part of DaisyUI's drawer component architecture.
		DaisyUI uses a hidden checkbox as a state control mechanism for the drawer (open/closed).
		The checkbox's checked state is linked to CSS :checked selectors that control drawer visibility.
		This is a structural/utility element (not user-facing) and cannot be replaced with a library component.
	-->
	<input
		type="checkbox"
		id={toggleId}
		class="drawer-toggle"
		checked={open}
		aria-label={ariaLabel || toggleAriaLabel}
	/>

	<!-- Main content area -->
	<div class="drawer-content">
		{#if content}
			{@render content()}
		{/if}
	</div>

	<!-- Drawer side panel -->
	<div class={drawerSideClasses}>
		<!-- Backdrop overlay -->
		{#if overlay}
			<!-- 
				NOTE: Raw HTML label is intentional here.
				TECHNICAL REASON: DaisyUI drawer architecture requires label linked to hidden checkbox.
				The label with 'for' attribute controls drawer state via CSS :checked selectors.
				Backdrop interactions are handled by a separate button overlay for accessibility.
			-->
			<label for={toggleId} class="drawer-overlay" aria-hidden="true"></label>
			<!-- 
				Interactive backdrop overlay for accessibility.
				This button provides proper keyboard navigation and screen reader support.
			-->
			{#if closeOnBackdrop}
				<button
					type="button"
					class="absolute inset-0 z-10 cursor-default"
					onclick={handleBackdropClick}
					onkeydown={handleBackdropKeydown}
					aria-label={closeAriaLabel}
					tabindex="0"
				></button>
			{/if}
		{/if}

		<!-- Drawer content -->
		<div
			class={drawerContentClasses}
			role="dialog"
			aria-modal="true"
			aria-label={ariaLabel || title || defaultAriaLabel}
		>
			<!-- Header with title and close button -->
			{#if title || showCloseButton}
				<div class="mb-4 flex items-center justify-between">
					{#if title}
						<Heading level="h2" text={title} class="text-xl font-bold" />
					{/if}
					{#if showCloseButton}
						<IconButton
							variant="ghost"
							circle
							size="sm"
							onclick={handleClose}
							ariaLabel={closeAriaLabel}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</IconButton>
					{/if}
				</div>
			{/if}

			<!-- Drawer body content -->
			{#if children}
				<div class="flex-1 overflow-y-auto">
					{@render children()}
				</div>
			{/if}
		</div>
	</div>
</div>
