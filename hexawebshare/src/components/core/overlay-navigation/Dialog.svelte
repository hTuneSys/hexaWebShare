<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '../buttons/Button.svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import Form from '../forms/Form.svelte';
	import Heading from '../typography/Heading.svelte';
	import Text from '../typography/Text.svelte';

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
	const titleId = `dialog-title-${crypto.randomUUID?.() ?? Math.random().toString(36).substring(2, 11)}`;
	const descriptionId = `dialog-description-${crypto.randomUUID?.() ?? Math.random().toString(36).substring(2, 11)}`;

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
				<div class="absolute top-2 right-2">
					<IconButton variant="ghost" size="sm" circle onclick={onClose} ariaLabel="Close dialog">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
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
					</IconButton>
				</div>
			{/if}

			{#if title}
				<Heading id={titleId} level="h3" size="lg" weight="bold" text={title} />
			{/if}

			{#if description}
				<Text id={descriptionId} display="block" class="py-4" text={description} />
			{/if}

			{#if children}
				{@render children()}
			{/if}
		</div>

		{#if closeOnBackdropClick}
			<!-- Backdrop click area - hidden from screen readers as it's a duplicate close action -->
			<Form method="dialog" class="modal-backdrop">
				<Button
					label=""
					variant="ghost"
					onclick={onClose}
					ariaLabel="Close dialog"
					class="!absolute !inset-0 !m-0 !h-full !min-h-0 !w-full !border-none !bg-transparent !p-0"
				/>
			</Form>
		{/if}
	</div>
{/if}
