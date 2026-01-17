<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Popover from './Popover.svelte';
	import Button from '../buttons/Button.svelte';
	import Text from '../typography/Text.svelte';
	import { fn } from 'storybook/test';

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
				options: [
					'neutral',
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error'
				],
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
			disabled: false,
			onOpenChange: fn()
		}
	});
</script>

<script lang="ts">
	import Badge from '../media/Badge.svelte';
</script>

<!-- Story 1: Default -->
<Story name="Default">
	<div class="flex min-h-[200px] items-start justify-center pt-4">
		<Popover>
			{#snippet trigger()}
				<Button label="Show Info" variant="primary" />
			{/snippet}
			{#snippet children()}
				<div class="space-y-2">
					<Text text="Welcome!" weight="bold" size="lg" display="block" />
					<Text
						text="This is a helpful popover that provides additional context for your actions."
						size="sm"
						variant="muted"
						display="block"
					/>
				</div>
			{/snippet}
		</Popover>
	</div>
</Story>

<!-- Story 2: Placement Top -->
<Story name="Placement Top" args={{ placement: 'top' }}>
	<div class="flex min-h-[250px] items-end justify-center pb-4">
		<Popover placement="top">
			{#snippet trigger()}
				<Button label="Top Popover" variant="secondary" />
			{/snippet}
			{#snippet children()}
				<div class="space-y-2">
					<Text text="Appears Above" weight="semibold" display="block" />
					<Text
						text="This popover opens above the trigger button."
						size="sm"
						variant="muted"
						display="block"
					/>
				</div>
			{/snippet}
		</Popover>
	</div>
</Story>

<!-- Story 3: Placement Left -->
<Story name="Placement Left" args={{ placement: 'left' }}>
	<div class="flex min-h-[200px] items-center justify-end pr-8">
		<Popover placement="left" align="center">
			{#snippet trigger()}
				<Button label="Left Popover" variant="accent" />
			{/snippet}
			{#snippet children()}
				<div class="space-y-2">
					<Text text="Side Panel" weight="semibold" display="block" />
					<Text
						text="Content aligned to the left of the trigger."
						size="sm"
						variant="muted"
						display="block"
					/>
				</div>
			{/snippet}
		</Popover>
	</div>
</Story>

<!-- Story 4: Placement Right -->
<Story name="Placement Right" args={{ placement: 'right' }}>
	<div class="flex min-h-[200px] items-center justify-start pl-8">
		<Popover placement="right" align="center">
			{#snippet trigger()}
				<Button label="Right Popover" variant="info" />
			{/snippet}
			{#snippet children()}
				<div class="space-y-2">
					<Text text="Quick Actions" weight="semibold" display="block" />
					<Text
						text="Content appears to the right of the trigger."
						size="sm"
						variant="muted"
						display="block"
					/>
				</div>
			{/snippet}
		</Popover>
	</div>
</Story>

<!-- Story 5: Success Tone -->
<Story name="Success Tone" args={{ tone: 'success' }}>
	<div class="flex min-h-[200px] items-start justify-center pt-4">
		<Popover tone="success">
			{#snippet trigger()}
				<Button label="Show Success" variant="success" />
			{/snippet}
			{#snippet children()}
				<div class="space-y-2">
					<Text text="Action Completed!" weight="bold" display="block" />
					<Text text="Your changes have been saved successfully." size="sm" display="block" />
				</div>
			{/snippet}
		</Popover>
	</div>
</Story>

<!-- Story 6: Warning Tone -->
<Story name="Warning Tone" args={{ tone: 'warning' }}>
	<div class="flex min-h-[200px] items-start justify-center pt-4">
		<Popover tone="warning">
			{#snippet trigger()}
				<Button label="Show Warning" variant="warning" />
			{/snippet}
			{#snippet children()}
				<div class="space-y-2">
					<Text text="Attention Required" weight="bold" display="block" />
					<Text text="Please review your input before proceeding." size="sm" display="block" />
				</div>
			{/snippet}
		</Popover>
	</div>
</Story>

<!-- Story 7: Error Tone -->
<Story name="Error Tone" args={{ tone: 'error' }}>
	<div class="flex min-h-[200px] items-start justify-center pt-4">
		<Popover tone="error">
			{#snippet trigger()}
				<Button label="Show Error" variant="error" />
			{/snippet}
			{#snippet children()}
				<div class="space-y-2">
					<Text text="Something Went Wrong" weight="bold" display="block" />
					<Text text="Please try again or contact support." size="sm" display="block" />
				</div>
			{/snippet}
		</Popover>
	</div>
</Story>

<!-- Story 8: Small Size -->
<Story name="Small Size" args={{ size: 'sm' }}>
	<div class="flex min-h-[200px] items-start justify-center pt-4">
		<Popover size="sm">
			{#snippet trigger()}
				<Button label="Small" size="sm" />
			{/snippet}
			{#snippet children()}
				<Text text="Compact tooltip-like content." size="sm" display="block" />
			{/snippet}
		</Popover>
	</div>
</Story>

<!-- Story 9: Large Size with Rich Content -->
<Story name="Large Size" args={{ size: 'lg' }}>
	<div class="flex min-h-[300px] items-start justify-center pt-4">
		<Popover size="lg">
			{#snippet trigger()}
				<Button label="Show Details" size="lg" variant="primary" />
			{/snippet}
			{#snippet children()}
				<div class="space-y-3">
					<Text text="Feature Overview" weight="bold" size="lg" display="block" />
					<Text
						text="This larger popover can contain more detailed information, including multiple paragraphs and interactive elements."
						size="sm"
						variant="muted"
						display="block"
					/>
					<div class="flex gap-2 pt-2">
						<Badge label="New" variant="primary" size="sm" />
						<Badge label="Beta" variant="secondary" size="sm" />
					</div>
				</div>
			{/snippet}
		</Popover>
	</div>
</Story>

<!-- Story 10: Disabled State -->
<Story name="Disabled State" args={{ disabled: true }}>
	<div class="flex min-h-[200px] items-start justify-center pt-4">
		<Popover disabled={true}>
			{#snippet trigger()}
				<Button label="Disabled Popover" disabled={true} variant="neutral" />
			{/snippet}
			{#snippet children()}
				<Text text="This content will not be shown." size="sm" display="block" />
			{/snippet}
		</Popover>
	</div>
</Story>

<!-- Story 11: Playground -->
<Story
	name="Playground"
	args={{
		placement: 'bottom',
		align: 'center',
		tone: 'neutral',
		size: 'md',
		defaultOpen: false,
		closeOnOutsideClick: true,
		closeOnEscape: true,
		disabled: false
	}}
>
	<div class="flex min-h-[300px] items-center justify-center">
		<Popover
			placement="bottom"
			align="center"
			tone="neutral"
			size="md"
			defaultOpen={false}
			closeOnOutsideClick={true}
			closeOnEscape={true}
			disabled={false}
		>
			{#snippet trigger()}
				<Button label="Interactive Popover" variant="primary" />
			{/snippet}
			{#snippet children()}
				<div class="space-y-3">
					<Text text="Playground" weight="bold" size="lg" display="block" />
					<Text
						text="Use the Storybook controls panel to adjust placement, tone, size, and behavior options."
						size="sm"
						variant="muted"
						display="block"
					/>
					<div class="flex items-center gap-2 pt-1">
						<Badge label="bottom" variant="info" size="sm" />
						<Badge label="neutral" variant="accent" size="sm" />
						<Badge label="md" variant="secondary" size="sm" />
					</div>
				</div>
			{/snippet}
		</Popover>
	</div>
</Story>
