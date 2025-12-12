<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from './Alert.svelte';

	const { Story } = defineMeta({
		title: 'Core/Feedback/Alert',
		component: Alert,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Visual style of the alert'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Spacing preset for the alert content'
			},
			open: { control: 'boolean', description: 'Controls visibility of the alert' },
			closable: { control: 'boolean', description: 'Show dismiss button' },
			actionLabel: { control: 'text', description: 'Text for the optional action button' },
			withIcon: { control: 'boolean', description: 'Show leading indicator' },
			loading: { control: 'boolean', description: 'Display loading spinner' },
			disabled: { control: 'boolean', description: 'Disable interactions' },
			fullWidth: { control: 'boolean', description: 'Stretch to full width' },
			title: { control: 'text', description: 'Title displayed at the top' },
			description: { control: 'text', description: 'Supporting message below the title' }
		},
		args: {
			title: 'System notice',
			description: 'A concise alert message with helpful context.',
			variant: 'info',
			size: 'md',
			open: true,
			closable: true,
			withIcon: true,
			loading: false,
			disabled: false,
			fullWidth: true
		}
	});
</script>

<Story name="Default" />

<Story
	name="Success"
	args={{
		variant: 'success',
		title: 'Success',
		description: 'Your action completed successfully.',
		actionLabel: 'View details'
	}}
/>

<Story
	name="Warning"
	args={{
		variant: 'warning',
		title: 'Warning',
		description: 'Please double-check your inputs before continuing.'
	}}
/>

<Story
	name="Error"
	args={{
		variant: 'error',
		title: 'Error',
		description: 'Something went wrong while processing your request.'
	}}
/>

<Story name="Without Icon" args={{ withIcon: false }} />

<Story name="Non Closable" args={{ closable: false }} />

<Story name="With Action" args={{ actionLabel: 'Retry' }} />

<Story name="Loading State" args={{ loading: true, actionLabel: 'Details' }} />

<Story
	name="Disabled"
	args={{
		disabled: true,
		actionLabel: 'Details',
		title: 'Disabled alert',
		description: 'Interactions are disabled.'
	}}
/>

<Story
	name="Compact Width"
	args={{ fullWidth: false, title: 'Compact', description: 'Fits content width.' }}
/>

<Story name="Small Size" args={{ size: 'sm', title: 'Small alert' }} />

<Story name="Large Size" args={{ size: 'lg', title: 'Large alert' }} />

<Story name="Custom Content">
	<Alert title="Backup running" description="We are syncing your files.">
		<div class="text-xs opacity-70">This may take a few minutes. Keep this tab open.</div>
	</Alert>
</Story>
