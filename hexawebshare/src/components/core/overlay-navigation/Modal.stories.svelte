<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Modal from './Modal.svelte';
	import Button from '../buttons/Button.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Modal',
		component: Modal,
		tags: ['autodocs'],
		argTypes: {
			open: { control: 'boolean' },
			title: { control: 'text' },
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg', null]
			},
			closeOnBackdrop: { control: 'boolean' }
		},
		args: {
			open: false, // Changed to false by default
			onclose: fn()
		}
	});
</script>

<script>
	// Each story needs its own state to allow reopening
	let isDefaultOpen = $state(false);
	let isActionsOpen = $state(false);
	let isLongContentOpen = $state(false);
	let isSizeSmallOpen = $state(false);
	let isSizeLargeOpen = $state(false);
	let isNoBackdropOpen = $state(false);
</script>

<Story name="Default">
	<Button label="Open Default Modal" onclick={() => (isDefaultOpen = true)} />
	<Modal open={isDefaultOpen} title="Basic Modal" onclose={() => (isDefaultOpen = false)}>
		{#snippet children()}
			<p>This is a simple modal using the default configuration.</p>
		{/snippet}
	</Modal>
</Story>

<Story name="With Actions">
	<Button label="Open Actions Modal" onclick={() => (isActionsOpen = true)} />
	<Modal open={isActionsOpen} title="Confirmation" onclose={() => (isActionsOpen = false)}>
		{#snippet children()}
			<p class="py-4">Are you sure you want to proceed? This is a dangerous action.</p>
			<div class="modal-action">
				<Button label="Cancel" onclick={() => (isActionsOpen = false)} />
				<Button label="Confirm" variant="primary" onclick={() => (isActionsOpen = false)} />
			</div>
		{/snippet}
	</Modal>
</Story>

<Story name="Long Content">
	<Button label="Open Long Content Modal" onclick={() => (isLongContentOpen = true)} />
	<Modal
		open={isLongContentOpen}
		title="Terms and Conditions"
		onclose={() => (isLongContentOpen = false)}
	>
		{#snippet children()}
			<p class="py-4">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<p class="py-4">
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
				laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
				architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
				aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
				sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
				adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam
				aliquam quaerat voluptatem.
			</p>
			<p class="py-4">
				Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
				nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
				voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
				voluptas nulla pariatur?
			</p>
		{/snippet}
	</Modal>
</Story>

<Story name="Size Small">
	<Button label="Open Small Modal" onclick={() => (isSizeSmallOpen = true)} />
	<Modal
		open={isSizeSmallOpen}
		title="Small Modal"
		size="sm"
		onclose={() => (isSizeSmallOpen = false)}
	>
		{#snippet children()}
			<p>This is a small modal.</p>
		{/snippet}
	</Modal>
</Story>

<Story name="Size Large">
	<Button label="Open Large Modal" onclick={() => (isSizeLargeOpen = true)} />
	<Modal
		open={isSizeLargeOpen}
		title="Large Modal"
		size="lg"
		onclose={() => (isSizeLargeOpen = false)}
	>
		{#snippet children()}
			<p>This is a large modal.</p>
		{/snippet}
	</Modal>
</Story>

<Story name="No Backdrop Close">
	<Button label="Open No Backdrop Close Modal" onclick={() => (isNoBackdropOpen = true)} />
	<Modal
		open={isNoBackdropOpen}
		title="Must Close via Button"
		closeOnBackdrop={false}
		onclose={() => (isNoBackdropOpen = false)}
	>
		{#snippet children()}
			<p>Clicking outside (on the backdrop) will NOT close this modal.</p>
		{/snippet}
	</Modal>
</Story>

<!-- Playground -->
<Story name="Playground" args={{ open: false, title: 'Playground Modal' }}>
	{#snippet children()}
		<p>This is the interactive playground. Use controls to test different props.</p>
		<p class="mt-2 text-sm text-base-content/70">
			Tip: Toggle the "open" control to show/hide the modal
		</p>
	{/snippet}
</Story>
