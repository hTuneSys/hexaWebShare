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

<dialog bind:this={dialogElement} class={dialogClasses} onclose={handleClose}>
	<div class={boxClasses}>
		<!-- Step 7 & 8: Header & Title & Close Button -->
		{#if title || onclose}
			<div class="mb-4 flex items-center justify-between">
				{#if title}
					<h3 class="text-lg font-bold">{title}</h3>
				{/if}
				{#if onclose}
					<button class="btn btn-circle btn-ghost btn-sm" onclick={onclose} aria-label="Close"
						>✕</button
					>
				{/if}
			</div>
		{/if}

		<!-- Step 9: Render Content -->
		{#if children}
			{@render children()}
		{/if}
	</div>

	<!-- Step 10: Backdrop -->
	{#if closeOnBackdrop}
		<form method="dialog" class="modal-backdrop">
			<button onclick={onclose}>close</button>
		</form>
	{/if}
</dialog>
