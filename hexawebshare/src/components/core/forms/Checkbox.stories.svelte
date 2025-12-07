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
			label: {
				control: { type: 'text' },
				description: 'Label text for the checkbox'
			},
			checked: {
				control: { type: 'boolean' },
				description: 'Whether the checkbox is checked'
			},
			indeterminate: {
				control: { type: 'boolean' },
				description: 'Whether the checkbox is in indeterminate state'
			},
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info'],
				description: 'Color variant of the checkbox'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the checkbox'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the checkbox is disabled'
			},
			required: {
				control: { type: 'boolean' },
				description: 'Whether the checkbox is required'
			},
			error: {
				control: { type: 'boolean' },
				description: 'Whether the checkbox has an error state'
			},
			errorMessage: {
				control: { type: 'text' },
				description: 'Error message to display'
			},
			name: {
				control: { type: 'text' },
				description: 'Name attribute for form submission'
			},
			value: {
				control: { type: 'text' },
				description: 'Value attribute for form submission'
			}
		},
		args: {
			onchange: fn(),
			onchecked: fn()
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ label: 'I agree to the terms and conditions' }} />

<!-- Variant Stories -->
<Story name="Primary" args={{ variant: 'primary', label: 'Primary Checkbox', checked: true }} />
<Story name="Secondary" args={{ variant: 'secondary', label: 'Secondary Checkbox', checked: true }} />
<Story name="Accent" args={{ variant: 'accent', label: 'Accent Checkbox', checked: true }} />
<Story name="Success" args={{ variant: 'success', label: 'Success Checkbox', checked: true }} />
<Story name="Warning" args={{ variant: 'warning', label: 'Warning Checkbox', checked: true }} />
<Story name="Error" args={{ variant: 'error', label: 'Error Checkbox', checked: true }} />
<Story name="Info" args={{ variant: 'info', label: 'Info Checkbox', checked: true }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ size: 'xs', label: 'Extra Small Checkbox', checked: true }} />
<Story name="Small" args={{ size: 'sm', label: 'Small Checkbox', checked: true }} />
<Story name="Medium" args={{ size: 'md', label: 'Medium Checkbox', checked: true }} />
<Story name="Large" args={{ size: 'lg', label: 'Large Checkbox', checked: true }} />

<!-- State Stories -->
<Story name="Unchecked" args={{ label: 'Unchecked Checkbox' }} />
<Story name="Checked" args={{ label: 'Checked Checkbox', checked: true }} />
<Story name="Indeterminate" args={{ label: 'Indeterminate Checkbox', indeterminate: true }} />
<Story name="Disabled" args={{ label: 'Disabled Checkbox', disabled: true }} />
<Story name="Disabled Checked" args={{ label: 'Disabled Checked Checkbox', checked: true, disabled: true }} />
<Story name="Required" args={{ label: 'Required Checkbox', required: true }} />
<Story name="Required Checked" args={{ label: 'Required Checkbox', required: true, checked: true }} />

<!-- Error State Stories -->
<Story name="With Error" args={{ label: 'Checkbox with Error', error: true }} />
<Story name="With Error Message" args={{ label: 'Checkbox with Error', error: true, errorMessage: 'This field is required' }} />
<Story name="Error Variant" args={{ variant: 'error', label: 'Error Variant Checkbox', checked: true }} />

<!-- Form Integration Stories -->
<Story name="With Name and Value" args={{ label: 'Form Checkbox', name: 'agreement', value: 'accepted', checked: true }} />
<Story name="Without Label" args={{ checked: true }} />

<!-- Interactive Examples -->
<Story name="Interactive" args={{ label: 'Click me to toggle', checked: false }} />

