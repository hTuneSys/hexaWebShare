<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		title?: string;
		children?: Snippet;
		size?: 'sm' | 'md' | 'lg' | null;
		closeOnBackdrop?: boolean;
		onclose?: () => void;
		class?: string;
	}

	const {
		open = false,
		title,
		children,
		size = 'md',
		closeOnBackdrop = true,
		onclose,
		class: className = '',
		...props
	}: Props = $props();

	// Step 4 & 5: Dialog and DaisyUI Class
	let dialogElement: HTMLDialogElement;

	// Generate unique IDs for ARIA references
	const modalId = crypto.randomUUID?.() ?? `modal-${Math.random().toString(36).slice(2, 9)}`;
	const titleId = `${modalId}-title`;
	const contentId = `${modalId}-content`;

	let dialogClasses = $derived(['modal', className].filter(Boolean).join(' '));

	// Step 6: Box and Size Logic
	let boxClasses = $derived(
		[
			'modal-box',
			size === 'sm' && 'max-w-sm',
			size === 'md' && 'max-w-md', // Default usually, but explicit here
			size === 'lg' && 'max-w-lg'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Step 11: Reactivity
	$effect(() => {
		if (dialogElement) {
			if (open) {
				dialogElement.showModal();
			} else {
				dialogElement.close();
			}
		}
	});

	function handleClose() {
		if (onclose) onclose();
	}
</script>

<dialog
	bind:this={dialogElement}
	class={dialogClasses}
	aria-modal="true"
	aria-labelledby={title ? titleId : undefined}
	aria-describedby={contentId}
	onclose={handleClose}
	oncancel={(e) => {
		e.preventDefault();
		handleClose();
	}}
	{...props}
>
	<div class={boxClasses}>
		<!-- Step 7 & 8: Header & Title & Close Button -->
		{#if title || onclose}
			<div class="mb-4 flex items-center justify-between">
				{#if title}
					<h3 id={titleId} class="text-lg font-bold">{title}</h3>
				{/if}
				{#if onclose}
					<button class="btn btn-circle btn-ghost btn-sm" onclick={onclose} aria-label="Close modal"
						>✕</button
					>
				{/if}
			</div>
		{/if}

		<!-- Step 9: Render Content -->
		<div id={contentId}>
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>

	<!-- Step 10: Backdrop -->
	{#if closeOnBackdrop}
		<form method="dialog" class="modal-backdrop">
			<button onclick={onclose} aria-label="Close modal by clicking backdrop">close</button>
		</form>
	{/if}
</dialog>
