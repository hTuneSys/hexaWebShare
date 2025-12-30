<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Checkbox from './Checkbox.svelte';
	import { fn } from 'storybook/test';
	const { Story } = defineMeta({
		title: 'Core/Forms/Checkbox',
		component: Checkbox,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error']
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			checked: { control: 'boolean' },
			disabled: { control: 'boolean' },
			indeterminate: { control: 'boolean' },
			label: { control: 'text' },
			required: { control: 'boolean' }
		},
		args: {
			onclick: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ label: 'Default Checkbox' }} />

<Story name="Checked State" args={{ label: 'Checked Checkbox', checked: true }} />

<Story name="Indeterminate State" args={{ label: 'Indeterminate State', indeterminate: true }} />

<Story name="Disabled State" args={{ label: 'Disabled Checkbox', disabled: true }} />

<Story name="Primary Variant" args={{ variant: 'primary', label: 'Primary', checked: true }} />

<Story name="Small Size" args={{ size: 'sm', label: 'Small', checked: true }} />

<Story name="Large Size" args={{ size: 'lg', label: 'Large', checked: true }} />

<Story name="Required Field" args={{ label: 'Required Field *', required: true }} />

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="space-y-4">
		<div>
			<h3 class="mb-2 text-lg font-bold">Color Variants</h3>
			<div class="flex flex-wrap gap-4">
				<Checkbox variant="primary" label="Primary" checked={true} />
				<Checkbox variant="secondary" label="Secondary" checked={true} />
				<Checkbox variant="accent" label="Accent" checked={true} />
				<Checkbox variant="success" label="Success" checked={true} />
				<Checkbox variant="warning" label="Warning" checked={true} />
				<Checkbox variant="info" label="Info" checked={true} />
				<Checkbox variant="error" label="Error" checked={true} />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">Sizes</h3>
			<div class="flex flex-wrap items-center gap-4">
				<Checkbox size="xs" label="Extra Small" checked={true} />
				<Checkbox size="sm" label="Small" checked={true} />
				<Checkbox size="md" label="Medium" checked={true} />
				<Checkbox size="lg" label="Large" checked={true} />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">States</h3>
			<div class="flex flex-wrap gap-4">
				<Checkbox label="Unchecked" />
				<Checkbox label="Checked" checked={true} />
				<Checkbox label="Indeterminate" indeterminate={true} />
				<Checkbox label="Disabled" disabled={true} />
				<Checkbox label="Disabled Checked" checked={true} disabled={true} />
			</div>
		</div>
	</div>
</Story>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Interactive Checkbox',
		variant: 'primary',
		size: 'md',
		checked: false,
		disabled: false,
		indeterminate: false,
		required: false,
		onclick: fn()
	}}
/>
