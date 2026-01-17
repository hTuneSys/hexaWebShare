<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import Heading from '../typography/Heading.svelte';
	import Icon from '../media/Icon.svelte';
	import Text from '../typography/Text.svelte';

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
					<Heading level="h3" size="lg" weight="bold" ariaLabel={title}>
						<span id={titleId}>{title}</span>
					</Heading>
				{/if}
				{#if onclose}
					<IconButton variant="ghost" size="sm" circle ariaLabel="Close modal" onclick={onclose}>
						<Icon name="close" size="sm" ariaHidden>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</Icon>
					</IconButton>
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
		<!-- Backdrop button for closing modal when clicking outside -->
		<IconButton
			class="modal-backdrop btn-ghost! h-auto! min-h-0! rounded-none! p-0!"
			ariaLabel="Close modal by clicking backdrop"
			onclick={onclose}
		>
			<Text ariaHidden class="sr-only">close</Text>
		</IconButton>
	{/if}
</dialog>
