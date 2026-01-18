<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Label from './Label.svelte';

	const { Story } = defineMeta({
		component: Label,
		title: 'Core/Data Display/Label',
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: 'text',
				description: 'Label text content'
			},
			for: {
				control: 'text',
				description: 'ID of the associated form element'
			},
			required: {
				control: 'boolean',
				description: 'Whether the field is required'
			},
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size variant'
			},
			requiredText: {
				control: 'text',
				description: 'Text to display for required indicator'
			},
			requiredAriaLabel: {
				control: 'text',
				description: 'Aria label for required indicator'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the label is disabled'
			},
			id: {
				control: 'text',
				description: 'HTML id attribute'
			},
			ariaLabel: {
				control: 'text',
				description: 'ARIA label'
			},
			class: {
				control: 'text',
				description: 'Additional CSS classes'
			}
		},
		args: {
			text: 'Form Label',
			required: false,
			size: 'md',
			disabled: false
		}
	});
</script>

<script>
	import Input from '../forms/Input.svelte';
</script>

<!-- Basic Label -->
<Story name="Default" args={{ text: 'Form Label' }} />

<!-- Required Field -->
<Story name="Required" args={{ text: 'Required Field', required: true }} />

<!-- Small Size -->
<Story name="Small Size" args={{ text: 'Small Label', size: 'sm' }} />

<!-- Large Size -->
<Story name="Large Size" args={{ text: 'Large Label', size: 'lg' }} />

<!-- Disabled State -->
<Story name="Disabled" args={{ text: 'Disabled Label', disabled: true }} />

<!-- With Form Input -->
<Story name="With Input" args={{ text: 'Email Address', for: 'email-input', required: true }}>
	{#snippet children()}
		<div class="space-y-2">
			<Label text="Email Address" for="email-input" required />
			<Input
				id="email-input"
				type="email"
				placeholder="Enter your email"
				value=""
				onchange={() => {}}
			/>
		</div>
	{/snippet}
</Story>

<!-- All Sizes Comparison -->
<Story name="Size Comparison" args={{ text: 'Label Text', required: true }}>
	{#snippet children()}
		<div class="space-y-4">
			<div>
				<Label text="Extra Small Label" size="xs" required />
			</div>
			<div>
				<Label text="Small Label" size="sm" required />
			</div>
			<div>
				<Label text="Medium Label" size="md" required />
			</div>
			<div>
				<Label text="Large Label" size="lg" required />
			</div>
		</div>
	{/snippet}
</Story>

<!-- Custom Required Text -->
<Story
	name="Custom Required"
	args={{ text: 'Custom Required', required: true, requiredText: '(required)' }}
/>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		text: 'Interactive Label',
		for: 'playground-input',
		required: false,
		size: 'md',
		requiredText: '*',
		requiredAriaLabel: 'required',
		disabled: false
	}}
/>
