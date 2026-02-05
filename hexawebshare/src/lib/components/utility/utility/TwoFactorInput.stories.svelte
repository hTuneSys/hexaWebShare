<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TwoFactorInput from './TwoFactorInput.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Utility/Utility/TwoFactorInput',
		component: TwoFactorInput,
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: 'select',
				options: ['numeric', 'alphanumeric']
			},
			variant: {
				control: 'select',
				options: [
					undefined,
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error'
				]
			},
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg']
			},
			length: {
				control: { type: 'number', min: 1, max: 10 }
			},
			disabled: {
				control: 'boolean'
			},
			loading: {
				control: 'boolean'
			},
			error: {
				control: 'text'
			},
			label: {
				control: 'text'
			},
			helpText: {
				control: 'text'
			}
		},
		args: {
			oncomplete: fn(),
			onchange: fn()
		}
	});
</script>

<Story
	name="Default"
	args={{ label: 'Enter 2FA Code', helpText: 'Please enter the 6-digit code.' }}
/>

<Story name="Centered" args={{ label: 'Centered Layout', position: 'center' }} />

<Story
	name="Success Variant"
	args={{ label: 'Success State', variant: 'success', value: '123456' }}
/>

<Story
	name="Error State"
	args={{
		label: 'Error State',
		error: 'Invalid code provided.',
		variant: 'error',
		value: '000000'
	}}
/>

<Story
	name="Alphanumeric"
	args={{ label: 'Alphanumeric Code', type: 'alphanumeric', value: 'A1B2' }}
/>

<Story name="Small Size" args={{ label: 'Small Size', size: 'sm', length: 4 }} />

<Story name="Large Size" args={{ label: 'Large Size', size: 'lg' }} />

<Story name="Disabled" args={{ label: 'Disabled State', disabled: true, value: '123456' }} />

<Story name="Loading" args={{ label: 'Verifying...', loading: true, value: '987654' }} />

<Story
	name="Playground"
	args={{
		label: 'Interactive Playground',
		length: 6,
		position: 'start',
		variant: 'primary',
		size: 'md',
		type: 'numeric'
	}}
/>
