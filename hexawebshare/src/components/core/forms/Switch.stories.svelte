<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Switch from './Switch.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/Switch',
		component: Switch,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: [
					undefined,
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the switch'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the switch'
			},
			labelPosition: {
				control: { type: 'select' },
				options: ['left', 'right'],
				description: 'Position of the label'
			},
			checked: {
				control: 'boolean',
				description: 'Whether the switch is checked/on'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the switch is disabled'
			},
			required: {
				control: 'boolean',
				description: 'Whether the switch is required'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the switch is in loading state'
			},
			label: {
				control: 'text',
				description: 'Label text'
			},
			helpText: {
				control: 'text',
				description: 'Helper text or description'
			},
			error: {
				control: 'text',
				description: 'Error message to display'
			}
		},
		args: {
			onchange: fn()
		}
	});
</script>

<!-- Default -->
<Story name="Default" args={{ label: 'Enable notifications' }} />

<!-- Checked State -->
<Story name="Checked" args={{ label: 'Dark mode', checked: true }} />

<!-- With Help Text -->
<Story
	name="With Help Text"
	args={{
		label: 'Email notifications',
		helpText: 'Receive email updates about your account'
	}}
/>

<!-- Label Position Left -->
<Story
	name="Label Position Left"
	args={{
		label: 'Auto-save',
		labelPosition: 'left',
		checked: true
	}}
/>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="w-full max-w-2xl space-y-6">
		<div>
			<h3 class="mb-3 text-lg font-bold">Color Variants</h3>
			<div class="space-y-2">
				<Switch label="Default" checked={true} />
				<Switch variant="primary" label="Primary" checked={true} />
				<Switch variant="secondary" label="Secondary" checked={true} />
				<Switch variant="accent" label="Accent" checked={true} />
				<Switch variant="info" label="Info" checked={true} />
				<Switch variant="success" label="Success" checked={true} />
				<Switch variant="warning" label="Warning" checked={true} />
				<Switch variant="error" label="Error" checked={true} />
			</div>
		</div>
		<div>
			<h3 class="mb-3 text-lg font-bold">Sizes</h3>
			<div class="space-y-2">
				<Switch size="xs" label="Extra Small (xs)" checked={true} />
				<Switch size="sm" label="Small (sm)" checked={true} />
				<Switch size="md" label="Medium (md) - Default" checked={true} />
				<Switch size="lg" label="Large (lg)" checked={true} />
			</div>
		</div>
		<div>
			<h3 class="mb-3 text-lg font-bold">States</h3>
			<div class="space-y-2">
				<Switch label="Default (Off)" />
				<Switch label="Checked (On)" checked={true} />
				<Switch label="Disabled (Off)" disabled={true} />
				<Switch label="Disabled (On)" disabled={true} checked={true} />
				<Switch label="Loading" loading={true} />
				<Switch label="With Error" error="This field has an error" />
				<Switch label="Required" required={true} />
			</div>
		</div>
		<div>
			<h3 class="mb-3 text-lg font-bold">Label Positions</h3>
			<div class="space-y-2">
				<Switch label="Label on Right (default)" labelPosition="right" checked={true} />
				<Switch label="Label on Left" labelPosition="left" checked={true} />
			</div>
		</div>
	</div>
</Story>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		checked: false,
		helpText: 'Use the Controls panel to test all props'
	}}
/>
