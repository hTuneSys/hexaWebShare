<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		open: boolean;
		title: string;
		description?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		onClose?: () => void;
		ariaLabel?: string;
		ariaLabelledBy?: string;
		class?: string;
	}

	const {
		open,
		title,
		description,
		size = 'md',
		onClose,
		ariaLabel,
		ariaLabelledBy,
		class: className = '',
		...props
	}: Props = $props();

	let modalClasses = $derived(['modal', open && 'modal-open', className].filter(Boolean).join(' '));

	let modalBoxClasses = $derived(
		[
			'modal-box',
			size === 'xs' && 'max-w-xs',
			size === 'sm' && 'max-w-sm',
			size === 'md' && 'max-w-md',
			size === 'lg' && 'max-w-lg',
			size === 'xl' && 'max-w-xl'
		]
			.filter(Boolean)
			.join(' ')
	);

	let titleId = $derived(`dialog-title-${Math.random().toString(36).substr(2, 9)}`);
	let descriptionId = $derived(`dialog-description-${Math.random().toString(36).substr(2, 9)}`);

	let modalElement = $state<HTMLDivElement | null>(null);
	let previousActiveElement = $state<HTMLElement | null>(null);

	// Handle ESC key to close dialog
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open && onClose) {
			onClose();
		}
	}

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

	onMount(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

{#if open}
	<div
		bind:this={modalElement}
		class={modalClasses}
		role="dialog"
		aria-modal="true"
		aria-label={ariaLabel}
		aria-labelledby={ariaLabelledBy || titleId}
		aria-describedby={description ? descriptionId : undefined}
		{...props}
	>
		<div class={modalBoxClasses}>
			<h3 id={titleId} class="text-lg font-bold">
				{title}
			</h3>
			{#if description}
				<p id={descriptionId} class="py-4">
					{description}
				</p>
			{/if}
		</div>
		<form method="dialog">
			<button
				class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
				onclick={onClose}
				aria-label="Close dialog"
				type="button"
			>
				✕
			</button>
		</form>
	</div>
{/if}
