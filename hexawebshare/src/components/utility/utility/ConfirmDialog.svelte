<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '../../core/buttons/Button.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';

	/**
	 * Props interface for the ConfirmDialog component
	 */
	interface Props {
		/**
		 * Whether the dialog is open (controlled)
		 */
		open: boolean;
		/**
		 * Dialog title
		 */
		title?: string;
		/**
		 * Dialog description/message
		 */
		description?: string;
		/**
		 * Custom content to render in the dialog body
		 */
		children?: Snippet;
		/**
		 * Confirm button text
		 * @default 'Confirm'
		 */
		confirmText?: string;
		/**
		 * Cancel button text
		 * @default 'Cancel'
		 */
		cancelText?: string;
		/**
		 * Confirm button color variant
		 * @default 'primary'
		 */
		confirmVariant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost'
			| 'link';
		/**
		 * Cancel button color variant
		 * @default 'ghost'
		 */
		cancelVariant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost'
			| 'link';
		/**
		 * Size of the dialog
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Whether the confirm button is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the confirm button is disabled
		 * @default false
		 */
		confirmDisabled?: boolean;
		/**
		 * Whether the cancel button is disabled
		 * @default false
		 */
		cancelDisabled?: boolean;
		/**
		 * Whether to show the close button (X)
		 * @default true
		 */
		closable?: boolean;
		/**
		 * Close button color variant
		 * @default 'ghost'
		 */
		closeButtonVariant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost'
			| 'link';
		/**
		 * Close button size
		 * @default 'sm'
		 */
		closeButtonSize?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether clicking backdrop closes the dialog
		 * @default true
		 */
		closeOnBackdropClick?: boolean;
		/**
		 * Whether this is a destructive action (e.g., delete confirmation)
		 * When true, confirm button uses 'error' variant
		 * @default false
		 */
		destructive?: boolean;
		/**
		 * Icon to display before the title
		 */
		icon?: Snippet;
		/**
		 * Confirm button click handler
		 */
		onConfirm?: () => void;
		/**
		 * Cancel button click handler
		 */
		onCancel?: () => void;
		/**
		 * Close handler (called when dialog closes via X button or backdrop)
		 */
		onClose?: () => void;
		/**
		 * Accessible label for the dialog
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		open,
		title,
		description,
		children,
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		confirmVariant = 'primary',
		cancelVariant = 'ghost',
		size = 'md',
		loading = false,
		confirmDisabled = false,
		cancelDisabled = false,
		closable = true,
		closeButtonVariant = 'ghost',
		closeButtonSize = 'sm',
		closeOnBackdropClick = true,
		destructive = false,
		icon,
		onConfirm,
		onCancel,
		onClose,
		ariaLabel,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique IDs once (not reactive)
	const dialogId = `confirm-dialog-${crypto.randomUUID?.() ?? Math.random().toString(36).substring(2, 11)}`;
	const titleId = `${dialogId}-title`;
	const descriptionId = `${dialogId}-description`;
	const contentId = `${dialogId}-content`;

	// Dialog classes
	let modalClasses = $derived(['modal', open && 'modal-open', className].filter(Boolean).join(' '));

	// Modal box classes with size
	let modalBoxClasses = $derived(
		[
			'modal-box',
			'relative',
			size === 'xs' && 'max-w-xs',
			size === 'sm' && 'max-w-sm',
			size === 'md' && 'max-w-md',
			size === 'lg' && 'max-w-lg',
			size === 'xl' && 'max-w-xl'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Determine effective confirm variant (destructive overrides)
	let effectiveConfirmVariant = $derived(destructive ? 'error' : confirmVariant);

	let modalElement = $state<HTMLDivElement | null>(null);
	let previousActiveElement = $state<HTMLElement | null>(null);

	/**
	 * Handle confirm button click
	 */
	function handleConfirm() {
		if (!loading && !confirmDisabled && onConfirm) {
			onConfirm();
		}
	}

	/**
	 * Handle cancel button click
	 */
	function handleCancel() {
		if (!cancelDisabled) {
			if (onCancel) {
				onCancel();
			} else if (onClose) {
				onClose();
			}
		}
	}

	/**
	 * Handle close button click
	 */
	function handleClose() {
		if (onClose) {
			onClose();
		}
	}

	/**
	 * Handle ESC key to close dialog
	 */
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open && onClose && !loading) {
			onClose();
		}
	}

	// ESC key listener - only active when modal is open
	$effect(() => {
		if (open) {
			document.addEventListener('keydown', handleKeyDown);
			return () => {
				document.removeEventListener('keydown', handleKeyDown);
			};
		}
	});

	// Focus trap: Store previous active element and focus dialog when opened
	$effect(() => {
		if (open) {
			previousActiveElement = document.activeElement as HTMLElement;
			// Focus the first focusable element when dialog opens
			setTimeout(() => {
				if (modalElement) {
					const focusableElement = modalElement.querySelector<HTMLElement>(
						'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
					);
					focusableElement?.focus();
				}
			}, 0);
		} else if (previousActiveElement) {
			// Restore focus when dialog closes
			previousActiveElement.focus();
		}
	});
</script>

{#snippet closeIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<line x1="18" y1="6" x2="6" y2="18"></line>
		<line x1="6" y1="6" x2="18" y2="18"></line>
	</svg>
{/snippet}

{#if open}
	<div
		bind:this={modalElement}
		class={modalClasses}
		role="dialog"
		aria-modal="true"
		aria-label={ariaLabel}
		aria-labelledby={title ? titleId : undefined}
		aria-describedby={description ? descriptionId : children ? contentId : undefined}
		{...props}
	>
		<div class={modalBoxClasses}>
			{#if closable}
				<div class="absolute top-2 right-2">
					<IconButton
						variant={closeButtonVariant}
						size={closeButtonSize}
						circle={true}
						ariaLabel="Close dialog"
						onclick={handleClose}
						disabled={loading}
						children={closeIcon}
					/>
				</div>
			{/if}

			{#if icon || title}
				<div class="mb-4 flex items-start gap-3">
					{#if icon}
						<div class="text-base-content/70 mt-0.5 flex-shrink-0">{@render icon()}</div>
					{/if}
					{#if title}
						<h3 id={titleId} class="flex-1 text-lg font-bold">{title}</h3>
					{/if}
				</div>
			{/if}

			{#if description}
				<p id={descriptionId} class="text-base-content/80 mb-4">{description}</p>
			{/if}

			{#if children}
				<div id={contentId} class="mb-4">
					{@render children()}
				</div>
			{/if}

			<!-- Action Buttons -->
			<div class="modal-action mt-6">
				<Button
					label={cancelText}
					variant={cancelVariant}
					disabled={cancelDisabled || loading}
					onclick={handleCancel}
				/>
				<Button
					label={confirmText}
					variant={effectiveConfirmVariant}
					{loading}
					disabled={confirmDisabled || loading}
					onclick={handleConfirm}
				/>
			</div>
		</div>

		{#if closeOnBackdropClick}
			<form method="dialog" class="modal-backdrop">
				<button
					type="button"
					onclick={onClose}
					disabled={loading}
					aria-label="Close dialog by clicking backdrop">close</button
				>
			</form>
		{/if}
	</div>
{/if}
