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

<!-- Default Stories -->
<Story name="Default" args={{ label: 'Default Toggle' }} />

<Story name="Checked" args={{ label: 'Checked Toggle', checked: true }} />

<Story name="Disabled" args={{ label: 'Disabled Toggle', disabled: true }} />

<Story
	name="Disabled Checked"
	args={{ label: 'Disabled Checked', checked: true, disabled: true }}
/>

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
<Story name="No Label" args={{ ariaLabel: 'Toggle without visible label', checked: true }} />

<!-- Required -->
<Story name="Required" args={{ label: 'Required Field *', required: true }} />

<!-- Interactive Group Example -->
<Story name="Group Example">
	<div class="space-y-2">
		<Toggle label="Option 1" name="group1" value="option1" />
		<Toggle label="Option 2" name="group1" value="option2" checked={true} />
		<Toggle label="Option 3" name="group1" value="option3" />
		<Toggle label="Option 4 (Disabled)" name="group1" value="option4" disabled={true} />
	</div>
</Story>

