<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Dialog from './Dialog.svelte';
	import Button from '../buttons/Button.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Dialog',
		component: Dialog,
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: 'boolean',
				description: 'Whether the dialog is open'
			},
			title: {
				control: 'text',
				description: 'Dialog title'
			},
			description: {
				control: 'text',
				description: 'Dialog description text'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Size of the dialog'
			},
			closable: {
				control: 'boolean',
				description: 'Show close button'
			},
			closeOnBackdropClick: {
				control: 'boolean',
				description: 'Close dialog when clicking backdrop'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaLabelledBy: {
				control: 'text',
				description: 'ID of element that labels the dialog'
			}
		},
		args: {
			open: false, // Changed to false by default
			title: 'Dialog Title',
			size: 'md',
			onClose: fn()
		}
	});
</script>

<script>
	// Each story needs its own state to allow reopening
	let isDefaultOpen = $state(false);
	let isSmallOpen = $state(false);
	let isLargeOpen = $state(false);
	let isXLOpen = $state(false);
	let isWithDescOpen = $state(false);
	let isTitleOnlyOpen = $state(false);
	let isAriaLabelOpen = $state(false);
	let isCustomContentOpen = $state(false);
</script>

<!-- Default Story -->
<Story name="Default">
	<Button label="Open Default Dialog" onclick={() => (isDefaultOpen = true)} />
	<Dialog
		open={isDefaultOpen}
		title="Dialog Title"
		description="This is a default dialog with a title and description."
		size="md"
		onClose={() => (isDefaultOpen = false)}
	/>
</Story>

<!-- Size Stories -->
<Story name="Small Size">
	<Button label="Open Small Dialog" onclick={() => (isSmallOpen = true)} />
	<Dialog
		open={isSmallOpen}
		title="Small Dialog"
		description="This is a small dialog."
		size="sm"
		onClose={() => (isSmallOpen = false)}
	/>
</Story>

<Story name="Large Size">
	<Button label="Open Large Dialog" onclick={() => (isLargeOpen = true)} />
	<Dialog
		open={isLargeOpen}
		title="Large Dialog"
		description="This is a large dialog."
		size="lg"
		onClose={() => (isLargeOpen = false)}
	/>
</Story>

<Story name="Extra Large Size">
	<Button label="Open XL Dialog" onclick={() => (isXLOpen = true)} />
	<Dialog
		open={isXLOpen}
		title="Extra Large Dialog"
		description="This is an extra large dialog."
		size="xl"
		onClose={() => (isXLOpen = false)}
	/>
</Story>

<!-- Content Stories -->
<Story name="With Description">
	<Button label="Open Dialog with Description" onclick={() => (isWithDescOpen = true)} />
	<Dialog
		open={isWithDescOpen}
		title="Dialog with Description"
		description="This dialog includes a detailed description to provide more context to the user."
		size="md"
		onClose={() => (isWithDescOpen = false)}
	/>
</Story>

<Story name="Title Only">
	<Button label="Open Title Only Dialog" onclick={() => (isTitleOnlyOpen = true)} />
	<Dialog
		open={isTitleOnlyOpen}
		title="Dialog Title Only"
		size="md"
		onClose={() => (isTitleOnlyOpen = false)}
	/>
</Story>

<!-- Accessibility Stories -->
<Story name="With Aria Label">
	<Button label="Open Accessible Dialog" onclick={() => (isAriaLabelOpen = true)} />
	<Dialog
		open={isAriaLabelOpen}
		title="Accessible Dialog"
		description="This dialog has a custom aria-label."
		ariaLabel="Custom dialog label"
		size="md"
		onClose={() => (isAriaLabelOpen = false)}
	/>
</Story>

<!-- With Children/Content -->
<Story name="With Custom Content">
	<Button label="Open Custom Content Dialog" onclick={() => (isCustomContentOpen = true)} />
	<Dialog
		open={isCustomContentOpen}
		title="Delete Confirmation"
		size="md"
		onClose={() => (isCustomContentOpen = false)}
	>
		{#snippet children()}
			<p class="py-4">Are you sure you want to delete this item? This action cannot be undone.</p>
			<div class="modal-action">
				<Button label="Cancel" onclick={() => (isCustomContentOpen = false)} />
				<Button label="Delete" variant="error" onclick={() => (isCustomContentOpen = false)} />
			</div>
		{/snippet}
	</Dialog>
</Story>

<!-- Interactive Examples -->
<Story
	name="Playground"
	args={{
		open: false,
		title: 'Dialog Playground',
		description: 'Use the controls to customize this dialog.',
		size: 'md'
	}}
/>
