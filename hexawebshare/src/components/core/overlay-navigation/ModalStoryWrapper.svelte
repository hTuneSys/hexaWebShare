<script lang="ts">
	import Modal from './Modal.svelte';
	import { type Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		title?: string;
		size?: 'sm' | 'md' | 'lg' | null;
		closeOnBackdrop?: boolean;
		onclose?: () => void;
		// Text content to simulate snippet
		content?: string;
		showActions?: boolean;
	}

	let {
		open = false,
		title,
		size,
		closeOnBackdrop,
		onclose,
		content = 'Default modal content',
		showActions = false
	}: Props = $props();
</script>

<Modal {open} {title} {size} {closeOnBackdrop} {onclose}>
	<div class="py-4">
		{content}
	</div>
	{#if showActions}
		<div class="modal-action">
			<button class="btn" onclick={onclose}>Cancel</button>
			<button class="btn btn-primary" onclick={onclose}>Confirm</button>
		</div>
	{/if}
</Modal>
