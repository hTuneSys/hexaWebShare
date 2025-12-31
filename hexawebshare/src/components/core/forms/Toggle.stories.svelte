<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toggle from './Toggle.svelte';
	import { fn } from 'storybook/test';
	const { Story } = defineMeta({
		title: 'Core/Forms/Toggle',
		component: Toggle,
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
			label: { control: 'text' },
			required: { control: 'boolean' }
		},
		args: {
			onclick: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ label: 'Default Toggle' }} />

<Story name="Checked State" args={{ label: 'Checked Toggle', checked: true }} />

<Story name="Primary Variant" args={{ variant: 'primary', label: 'Primary', checked: true }} />

<Story name="Small Size" args={{ size: 'sm', label: 'Small', checked: true }} />

<Story name="Large Size" args={{ size: 'lg', label: 'Large', checked: true }} />

<Story name="Disabled State" args={{ label: 'Disabled Toggle', disabled: true }} />

<Story
	name="Disabled Checked"
	args={{ label: 'Disabled Checked', checked: true, disabled: true }}
/>

<Story name="Required Field" args={{ label: 'Required Field *', required: true }} />

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="space-y-4">
		<div>
			<h3 class="mb-2 text-lg font-bold">Color Variants</h3>
			<div class="flex flex-wrap gap-4">
				<Toggle variant="primary" label="Primary" checked={true} />
				<Toggle variant="secondary" label="Secondary" checked={true} />
				<Toggle variant="accent" label="Accent" checked={true} />
				<Toggle variant="success" label="Success" checked={true} />
				<Toggle variant="warning" label="Warning" checked={true} />
				<Toggle variant="info" label="Info" checked={true} />
				<Toggle variant="error" label="Error" checked={true} />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">Sizes</h3>
			<div class="flex flex-wrap items-center gap-4">
				<Toggle size="xs" label="Extra Small" checked={true} />
				<Toggle size="sm" label="Small" checked={true} />
				<Toggle size="md" label="Medium" checked={true} />
				<Toggle size="lg" label="Large" checked={true} />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">States</h3>
			<div class="flex flex-wrap gap-4">
				<Toggle label="Unchecked" />
				<Toggle label="Checked" checked={true} />
				<Toggle label="Disabled" disabled={true} />
				<Toggle label="Disabled Checked" checked={true} disabled={true} />
			</div>
		</div>
	</div>
</Story>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Interactive Toggle',
		variant: 'primary',
		size: 'md',
		checked: false,
		disabled: false,
		required: false,
		onclick: fn()
	}}
/>
