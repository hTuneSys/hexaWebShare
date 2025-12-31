<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ButtonGroup from './ButtonGroup.svelte';
	import Button from './Button.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Buttons/ButtonGroup',
		component: ButtonGroup,
		tags: ['autodocs'],
		argTypes: {
			orientation: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical']
			},
			gap: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			responsive: { control: 'boolean' },
			ariaLabel: { control: 'text' }
		},
		args: {
			onclick: fn()
		}
	});
</script>

<!-- Essential Variants (5-10 stories required) -->
<Story
	name="Default Horizontal"
	args={{
		orientation: 'horizontal',
		gap: 'sm',
		ariaLabel: 'Action buttons group',
		responsive: false
	}}
>
	{#snippet children()}
		<ButtonGroup
			orientation="horizontal"
			gap="sm"
			ariaLabel="Action buttons group"
			responsive={false}
		>
			<Button label="Save" variant="primary" />
			<Button label="Cancel" variant="secondary" />
			<Button label="Delete" variant="error" />
		</ButtonGroup>
	{/snippet}
</Story>

<Story name="Vertical Orientation">
	{#snippet children()}
		<ButtonGroup orientation="vertical" ariaLabel="Vertical button group">
			<Button label="First" variant="primary" />
			<Button label="Second" variant="primary" />
			<Button label="Third" variant="primary" />
		</ButtonGroup>
	{/snippet}
</Story>

<Story name="Small Gap">
	{#snippet children()}
		<ButtonGroup gap="sm" ariaLabel="Small gap button group">
			<Button label="Button 1" variant="primary" />
			<Button label="Button 2" variant="primary" />
			<Button label="Button 3" variant="primary" />
		</ButtonGroup>
	{/snippet}
</Story>

<Story name="Large Gap">
	{#snippet children()}
		<ButtonGroup gap="lg" ariaLabel="Large gap button group">
			<Button label="Button 1" variant="primary" />
			<Button label="Button 2" variant="primary" />
			<Button label="Button 3" variant="primary" />
		</ButtonGroup>
	{/snippet}
</Story>

<Story name="Mixed Variants">
	{#snippet children()}
		<ButtonGroup ariaLabel="Mixed button variants">
			<Button label="Primary" variant="primary" />
			<Button label="Secondary" variant="secondary" />
			<Button label="Success" variant="success" />
			<Button label="Error" variant="error" />
		</ButtonGroup>
	{/snippet}
</Story>

<Story name="Outline Style">
	{#snippet children()}
		<ButtonGroup ariaLabel="Outline button group">
			<Button label="Primary" variant="primary" outline />
			<Button label="Secondary" variant="secondary" outline />
			<Button label="Accent" variant="accent" outline />
		</ButtonGroup>
	{/snippet}
</Story>

<Story name="With Disabled">
	{#snippet children()}
		<ButtonGroup ariaLabel="Button group with disabled buttons">
			<Button label="Enabled" variant="primary" />
			<Button label="Disabled" variant="primary" disabled />
			<Button label="Enabled" variant="primary" />
		</ButtonGroup>
	{/snippet}
</Story>

<Story name="With Loading">
	{#snippet children()}
		<ButtonGroup ariaLabel="Button group with loading buttons">
			<Button label="Save" variant="primary" loading />
			<Button label="Cancel" variant="secondary" />
			<Button label="Delete" variant="error" />
		</ButtonGroup>
	{/snippet}
</Story>

<Story name="Responsive">
	{#snippet children()}
		<ButtonGroup orientation="horizontal" responsive ariaLabel="Responsive horizontal button group">
			<Button label="Button 1" variant="primary" />
			<Button label="Button 2" variant="primary" />
			<Button label="Button 3" variant="primary" />
		</ButtonGroup>
	{/snippet}
</Story>

<Story name="Small Size Buttons">
	{#snippet children()}
		<ButtonGroup ariaLabel="Small buttons">
			<Button label="Small" variant="primary" size="sm" />
			<Button label="Small" variant="primary" size="sm" />
			<Button label="Small" variant="primary" size="sm" />
		</ButtonGroup>
	{/snippet}
</Story>

<!-- Playground -->
<Story name="Playground" />
