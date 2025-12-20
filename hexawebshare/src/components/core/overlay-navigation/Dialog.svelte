<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		title?: string;
		description?: string;
		children?: Snippet;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		closable?: boolean;
		closeOnBackdropClick?: boolean;
		onClose?: () => void;
		ariaLabel?: string;
		ariaLabelledBy?: string;
		class?: string;
	}

	const {
		open,
		title,
		description,
		children,
		size = 'md',
		closable = true,
		closeOnBackdropClick = true,
		onClose,
		ariaLabel,
		ariaLabelledBy,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique IDs once (not reactive)
	const titleId = `dialog-title-${crypto.randomUUID?.() ?? Math.random().toString(36).substr(2, 9)}`;
	const descriptionId = `dialog-description-${crypto.randomUUID?.() ?? Math.random().toString(36).substr(2, 9)}`;

	let modalClasses = $derived(['modal', open && 'modal-open', className].filter(Boolean).join(' '));

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

	let modalElement = $state<HTMLDivElement | null>(null);
	let previousActiveElement = $state<HTMLElement | null>(null);

	// Handle ESC key to close dialog
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open && onClose) {
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

	// Focus trap: Store previous active element and focus modal when opened
	$effect(() => {
		if (open) {
			previousActiveElement = document.activeElement as HTMLElement;
			// Focus the modal box when it opens
			setTimeout(() => {
				if (modalElement) {
					const focusableElement = modalElement.querySelector<HTMLElement>(
						'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
					);
					focusableElement?.focus();
				}
			}, 0);
		} else if (previousActiveElement) {
			// Restore focus when modal closes
			previousActiveElement.focus();
		}
	});
</script>

{#if open}
	<div
		bind:this={modalElement}
		class={modalClasses}
		role="dialog"
		aria-modal="true"
		aria-label={ariaLabel}
		aria-labelledby={ariaLabelledBy || (title ? titleId : undefined)}
		aria-describedby={description ? descriptionId : undefined}
		{...props}
	>
		<div class={modalBoxClasses}>
			{#if closable}
				<button
					class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2"
					onclick={onClose}
					aria-label="Close dialog"
					type="button"
				>
					✕
				</button>
			{/if}

			{#if title}
				<h3 id={titleId} class="text-lg font-bold">
					{title}
				</h3>
			{/if}

			{#if description}
				<p id={descriptionId} class="py-4">
					{description}
				</p>
			{/if}

			{#if children}
				{@render children()}
			{/if}
		</div>

		{#if closeOnBackdropClick}
			<form method="dialog" class="modal-backdrop">
				<button type="button" onclick={onClose}>close</button>
			</form>
		{/if}
	</div>
{/if}
