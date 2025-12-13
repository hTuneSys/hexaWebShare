<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Modal from './Modal.svelte';

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
			open: true,
			onclose: () => console.log('closed')
		}
	});
</script>

<Story name="Default" args={{ title: 'Basic Modal' }}>
	{#snippet children()}
		<p>This is a simple modal using the default configuration.</p>
	{/snippet}
</Story>

<Story name="With Actions" args={{ title: 'Confirmation', showActions: true }}>
	{#snippet children()}
		<p class="py-4">Are you sure you want to proceed? This is a dangerous action.</p>
		<div class="modal-action">
			<button class="btn">Cancel</button>
			<button class="btn btn-primary">Confirm</button>
		</div>
	{/snippet}
</Story>

<Story name="Long Content" args={{ title: 'Terms and Conditions' }}>
	{#snippet children()}
		<p class="py-4">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<p class="py-4">
			Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
			laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
			beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
			odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
			Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
			sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
			voluptatem.
		</p>
		<p class="py-4">
			Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi
			ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
			voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
			voluptas nulla pariatur?
		</p>
	{/snippet}
</Story>

<Story name="Size Small" args={{ title: 'Small Modal', size: 'sm' }}>
	{#snippet children()}
		<p>This is a small modal.</p>
	{/snippet}
</Story>

<Story name="Size Large" args={{ title: 'Large Modal', size: 'lg' }}>
	{#snippet children()}
		<p>This is a large modal.</p>
	{/snippet}
</Story>

<Story name="No Backdrop Close" args={{ title: 'Must Close via Button', closeOnBackdrop: false }}>
	{#snippet children()}
		<p>Clicking outside (on the backdrop) will NOT close this modal.</p>
	{/snippet}
</Story>
