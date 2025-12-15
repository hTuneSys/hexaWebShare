<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from './Tooltip.svelte';
	import Button from '../buttons/Button.svelte';

	const { Story } = defineMeta({
		title: 'Core/Media/Tooltip',
		component: Tooltip,
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: 'text',
				description: 'Tooltip text content'
			},
			position: {
				control: { type: 'select' },
				options: ['top', 'bottom', 'left', 'right'],
				description: 'Tooltip position relative to trigger element'
			},
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
				description: 'Color variant of the tooltip'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the tooltip'
			}
		},
		args: {
			text: 'Tooltip text'
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ text: 'This is a tooltip' }}>
	<Tooltip text="This is a tooltip">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<!-- Position Stories -->
<Story name="Top" args={{ text: 'Tooltip on top', position: 'top' }}>
	<Tooltip text="Tooltip on top" position="top">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Bottom" args={{ text: 'Tooltip on bottom', position: 'bottom' }}>
	<Tooltip text="Tooltip on bottom" position="bottom">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Left" args={{ text: 'Tooltip on left', position: 'left' }}>
	<Tooltip text="Tooltip on left" position="left">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Right" args={{ text: 'Tooltip on right', position: 'right' }}>
	<Tooltip text="Tooltip on right" position="right">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<!-- Variant Stories -->
<Story name="Primary" args={{ text: 'Primary tooltip', variant: 'primary' }}>
	<Tooltip text="Primary tooltip" variant="primary">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Secondary" args={{ text: 'Secondary tooltip', variant: 'secondary' }}>
	<Tooltip text="Secondary tooltip" variant="secondary">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Accent" args={{ text: 'Accent tooltip', variant: 'accent' }}>
	<Tooltip text="Accent tooltip" variant="accent">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Info" args={{ text: 'Info tooltip', variant: 'info' }}>
	<Tooltip text="Info tooltip" variant="info">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Success" args={{ text: 'Success tooltip', variant: 'success' }}>
	<Tooltip text="Success tooltip" variant="success">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Warning" args={{ text: 'Warning tooltip', variant: 'warning' }}>
	<Tooltip text="Warning tooltip" variant="warning">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Error" args={{ text: 'Error tooltip', variant: 'error' }}>
	<Tooltip text="Error tooltip" variant="error">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<!-- State Stories -->
<Story name="Disabled" args={{ text: 'Disabled tooltip', disabled: true }}>
	<Tooltip text="Disabled tooltip" disabled={true}>
		<Button label="Hover me (disabled)" />
	</Tooltip>
</Story>

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{ text: 'Tooltip with aria label', ariaLabel: 'Additional context information' }}
>
	<Tooltip text="Tooltip with aria label" ariaLabel="Additional context information">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<!-- Interactive Examples -->
<Story
	name="Long Text"
	args={{
		text: 'This is a longer tooltip text that demonstrates how the component handles multiple lines and extended content'
	}}
>
	<Tooltip
		text="This is a longer tooltip text that demonstrates how the component handles multiple lines and extended content"
	>
		<Button label="Hover for long text" />
	</Tooltip>
</Story>

<Story name="With Icon Button" args={{ text: 'Icon button tooltip' }}>
	<Tooltip text="Icon button tooltip">
		<button class="btn btn-circle btn-primary" aria-label="Add">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
		</button>
	</Tooltip>
</Story>

<Story name="Playground" args={{ text: 'Tooltip text', position: 'top', variant: 'primary' }}>
	<Tooltip text="Tooltip text" position="top" variant="primary">
		<Button label="Interactive Tooltip" />
	</Tooltip>
</Story>
