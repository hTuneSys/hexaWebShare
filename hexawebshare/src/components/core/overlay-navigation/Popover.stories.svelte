<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Popover from './Popover.svelte';
	import Button from '../buttons/Button.svelte';
	import Paragraph from '../typography/Paragraph.svelte';

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Popover',
		component: Popover,
		tags: ['autodocs'],
		argTypes: {
			placement: {
				control: { type: 'select' },
				options: ['top', 'bottom', 'left', 'right'],
				description: 'Popover placement relative to the trigger'
			},
			align: {
				control: { type: 'select' },
				options: ['start', 'center', 'end'],
				description: 'Alignment of the popover content'
			},
			tone: {
				control: { type: 'select' },
				options: ['neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
				description: 'Color tone for the popover content'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Content size'
			},
			defaultOpen: {
				control: 'boolean',
				description: 'Initial open state for uncontrolled usage'
			},
			closeOnOutsideClick: {
				control: 'boolean',
				description: 'Close when clicking outside the popover'
			},
			closeOnEscape: {
				control: 'boolean',
				description: 'Close when pressing Escape'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable interactions'
			},
			contentClass: {
				control: 'text',
				description: 'Additional classes for the popover content'
			},
			triggerClass: {
				control: 'text',
				description: 'Additional classes for the trigger wrapper'
			}
		},
		args: {
			placement: 'bottom',
			align: 'center',
			tone: 'neutral',
			size: 'md',
			defaultOpen: false,
			closeOnOutsideClick: true,
			closeOnEscape: true,
			disabled: false
		}
	});
</script>

<script lang="ts">
	import Badge from '../media/Badge.svelte';

	let controlledOpen = $state(false);
</script>

<Story name="Default">
	<Popover>
		{#snippet trigger()}
			<Button label="Toggle popover" />
		{/snippet}
		{#snippet children()}
			<div class="space-y-1">
				<p class="font-semibold">Popover title</p>
				<p class="text-sm text-base-content/80">Helpful supporting text for the trigger.</p>
			</div>
		{/snippet}
	</Popover>
</Story>

<Story name="Top" args={{ placement: 'top' }}>
	<Popover placement="top">
		{#snippet trigger()}
			<Button label="Top placement" />
		{/snippet}
		{#snippet children()}
			<p class="text-sm">This popover appears above the trigger.</p>
		{/snippet}
	</Popover>
</Story>

<Story name="Left" args={{ placement: 'left', align: 'center' }}>
	<div class="flex justify-center">
		<Popover placement="left" align="center">
			{#snippet trigger()}
				<Button label="Left placement" />
			{/snippet}
			{#snippet children()}
				<p class="text-sm">Content aligned to the left of the trigger.</p>
			{/snippet}
		</Popover>
	</div>
</Story>

<Story name="Right" args={{ placement: 'right', align: 'center' }}>
	<div class="flex justify-center">
		<Popover placement="right" align="center">
			{#snippet trigger()}
				<Button label="Right placement" />
			{/snippet}
			{#snippet children()}
				<p class="text-sm">Content aligned to the right of the trigger.</p>
			{/snippet}
		</Popover>
	</div>
</Story>

<Story name="Alignment Start" args={{ align: 'start' }}>
	<Popover align="start">
		{#snippet trigger()}
			<Button label="Aligned start" />
		{/snippet}
		{#snippet children()}
			<div class="text-sm space-y-1">
				<p class="font-semibold">Aligned start</p>
				<p>Useful for left-anchored tooltips or menus.</p>
			</div>
		{/snippet}
	</Popover>
</Story>

<Story name="Tones">
	<div class="flex flex-wrap gap-4">
		<Popover tone="primary">
			{#snippet trigger()}
				<Button label="Primary" />
			{/snippet}
			{#snippet children()}
				<p class="text-sm">Primary tone with brand emphasis.</p>
			{/snippet}
		</Popover>
		<Popover tone="info">
			{#snippet trigger()}
				<Button label="Info" variant="info" />
			{/snippet}
			{#snippet children()}
				<p class="text-sm">Information tone for guidance.</p>
			{/snippet}
		</Popover>
		<Popover tone="success">
			{#snippet trigger()}
				<Button label="Success" variant="success" />
			{/snippet}
			{#snippet children()}
				<p class="text-sm">Success tone for confirmations.</p>
			{/snippet}
		</Popover>
		<Popover tone="warning">
			{#snippet trigger()}
				<Button label="Warning" variant="warning" />
			{/snippet}
			{#snippet children()}
				<p class="text-sm">Warning tone for cautions.</p>
			{/snippet}
		</Popover>
		<Popover tone="error">
			{#snippet trigger()}
				<Button label="Error" variant="error" />
			{/snippet}
			{#snippet children()}
				<p class="text-sm">Error tone for critical alerts.</p>
			{/snippet}
		</Popover>
	</div>
</Story>

<Story name="Sizes">
	<div class="flex flex-wrap gap-4">
		<Popover size="sm">
			{#snippet trigger()}
				<Button label="Small" />
			{/snippet}
			{#snippet children()}
				<p class="text-sm">Compact content for concise notes.</p>
			{/snippet}
		</Popover>
		<Popover size="md">
			{#snippet trigger()}
				<Button label="Medium" />
			{/snippet}
			{#snippet children()}
				<p class="text-sm">Default sizing for most use cases.</p>
			{/snippet}
		</Popover>
		<Popover size="lg">
			{#snippet trigger()}
				<Button label="Large" />
			{/snippet}
			{#snippet children()}
				<div class="space-y-1">
					<p class="font-semibold">Large popover</p>
					<Paragraph size="sm" variant="muted">
						Great for richer explanations or short forms inside overlays.
					</Paragraph>
				</div>
			{/snippet}
		</Popover>
	</div>
</Story>

<Story name="With Badges">
	<Popover>
		{#snippet trigger()}
			<Button label="Popover with badge" />
		{/snippet}
		{#snippet children()}
			<div class="flex items-center gap-2">
				<p class="text-sm">Attach metadata inside popovers.</p>
				<Badge label="New" variant="success" />
			</div>
		{/snippet}
	</Popover>
</Story>

<Story name="Persistent" args={{ closeOnOutsideClick: false }}>
	<Popover closeOnOutsideClick={false}>
		{#snippet trigger()}
			<Button label="Persistent popover" />
		{/snippet}
		{#snippet children()}
			<p class="text-sm">Click outside will not dismiss this popover.</p>
		{/snippet}
	</Popover>
</Story>

<Story name="Disabled" args={{ disabled: true }}>
	<Popover disabled={true}>
		{#snippet trigger()}
			<Button label="Disabled popover" disabled={true} />
		{/snippet}
		{#snippet children()}
			<p class="text-sm">Interactions are disabled.</p>
		{/snippet}
	</Popover>
</Story>

<Story name="Controlled">
	<div class="flex items-center gap-4">
		<Button
			label={controlledOpen ? 'Close popover' : 'Open popover'}
			onclick={() => (controlledOpen = !controlledOpen)}
		/>
		<Popover
			open={controlledOpen}
			onOpenChange={(value) => (controlledOpen = value)}
			closeOnOutsideClick={true}
		>
			{#snippet trigger()}
				<Button label="Controlled trigger" variant="secondary" />
			{/snippet}
			{#snippet children()}
				<div class="space-y-1">
					<p class="font-semibold">Controlled popover</p>
					<p class="text-sm text-base-content/80">State is managed externally.</p>
				</div>
			{/snippet}
		</Popover>
	</div>
</Story>

<Story
	name="Playground"
	args={{
		placement: 'bottom',
		align: 'center',
		tone: 'neutral',
		size: 'md',
		defaultOpen: false
	}}
>
	<Popover
		placement="bottom"
		align="center"
		tone="neutral"
		size="md"
		defaultOpen={false}
		closeOnOutsideClick={true}
		closeOnEscape={true}
	>
		{#snippet trigger()}
			<Button label="Interactive popover" />
		{/snippet}
		{#snippet children()}
			<div class="space-y-1">
				<p class="font-semibold">Playground</p>
				<p class="text-sm text-base-content/80">
					Use the controls to adjust placement, tone, and behavior.
				</p>
			</div>
		{/snippet}
	</Popover>
</Story>

