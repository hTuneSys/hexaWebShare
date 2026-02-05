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
<Story name="Top Position" args={{ text: 'Tooltip on top', position: 'top' }}>
	<Tooltip text="Tooltip on top" position="top">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Bottom Position" args={{ text: 'Tooltip on bottom', position: 'bottom' }}>
	<Tooltip text="Tooltip on bottom" position="bottom">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Left Position" args={{ text: 'Tooltip on left', position: 'left' }}>
	<Tooltip text="Tooltip on left" position="left">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Right Position" args={{ text: 'Tooltip on right', position: 'right' }}>
	<Tooltip text="Tooltip on right" position="right">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<!-- Variant Stories -->
<Story name="Primary Variant" args={{ text: 'Primary tooltip', variant: 'primary' }}>
	<Tooltip text="Primary tooltip" variant="primary">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Success Variant" args={{ text: 'Success tooltip', variant: 'success' }}>
	<Tooltip text="Success tooltip" variant="success">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Warning Variant" args={{ text: 'Warning tooltip', variant: 'warning' }}>
	<Tooltip text="Warning tooltip" variant="warning">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Error Variant" args={{ text: 'Error tooltip', variant: 'error' }}>
	<Tooltip text="Error tooltip" variant="error">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<!-- State Stories -->
<Story name="Disabled State" args={{ text: 'Disabled tooltip', disabled: true }}>
	<Tooltip text="Disabled tooltip" disabled={true}>
		<Button label="Hover me (disabled)" />
	</Tooltip>
</Story>

<Story
	name="Playground"
	args={{ text: 'Tooltip text', position: 'top', variant: 'primary', disabled: false }}
>
	<Tooltip text="Tooltip text" position="top" variant="primary" disabled={false}>
		<Button label="Interactive Tooltip" />
	</Tooltip>
</Story>
