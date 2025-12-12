<script lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Modal from './Modal.svelte';

	const { Story } = defineMeta({
		component: Modal,
		title: 'Core/Overlay Navigation/Modal',
		tags: ['autodocs'],
		argTypes: {
			open: { control: 'boolean' },
			title: { control: 'text' },
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg', null]
			},
			closeOnBackdrop: { control: 'boolean' }
		}
	});
</script>

<Story name="Default" args={{ open: true, title: 'Basic Modal' }}>
	{#snippet children()}
		<p>This is a simple modal with text content.</p>
	{/snippet}
</Story>

<Story name="With Actions" args={{ open: true, title: 'Confirmation Modal' }}>
	{#snippet children()}
		<p class="py-4">Are you sure you want to delete this item? This action cannot be undone.</p>
		<div class="modal-action">
			<button class="btn">Cancel</button>
			<button class="btn btn-error">Delete</button>
		</div>
	{/snippet}
</Story>

<Story name="Large Size" args={{ open: true, title: 'Large Modal', size: 'lg' }}>
	{#snippet children()}
		<p class="py-4">This uses the size="lg" prop.</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua.
		</p>
	{/snippet}
</Story>
