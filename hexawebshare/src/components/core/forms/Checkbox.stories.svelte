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

<!-- Default Stories -->
<Story name="Default" args={{ label: 'Default Checkbox' }} />

<Story name="Checked" args={{ label: 'Checked Checkbox', checked: true }} />

<Story name="Disabled" args={{ label: 'Disabled Checkbox', disabled: true }} />

<Story
	name="Disabled Checked"
	args={{ label: 'Disabled Checked', checked: true, disabled: true }}
/>

<Story name="Indeterminate" args={{ label: 'Indeterminate State', indeterminate: true }} />

<!-- Variant Stories -->
<Story name="Primary" args={{ variant: 'primary', label: 'Primary', checked: true }} />

<Story name="Secondary" args={{ variant: 'secondary', label: 'Secondary', checked: true }} />

<Story name="Accent" args={{ variant: 'accent', label: 'Accent', checked: true }} />

<Story name="Success" args={{ variant: 'success', label: 'Success', checked: true }} />

<Story name="Warning" args={{ variant: 'warning', label: 'Warning', checked: true }} />

<Story name="Info" args={{ variant: 'info', label: 'Info', checked: true }} />

<Story name="Error" args={{ variant: 'error', label: 'Error', checked: true }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ size: 'xs', label: 'Extra Small', checked: true }} />

<Story name="Small" args={{ size: 'sm', label: 'Small', checked: true }} />

<Story name="Medium" args={{ size: 'md', label: 'Medium (Default)', checked: true }} />

<Story name="Large" args={{ size: 'lg', label: 'Large', checked: true }} />

<!-- Without Label -->
<Story name="No Label" args={{ ariaLabel: 'Checkbox without visible label', checked: true }} />

<!-- Required -->
<Story name="Required" args={{ label: 'Required Field *', required: true }} />

<!-- Interactive Group Example -->
<Story name="Group Example">
	<div class="space-y-2">
		<Checkbox label="Option 1" name="group1" value="option1" />
		<Checkbox label="Option 2" name="group1" value="option2" checked={true} />
		<Checkbox label="Option 3" name="group1" value="option3" />
		<Checkbox label="Option 4 (Disabled)" name="group1" value="option4" disabled={true} />
	</div>
</Story>

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
