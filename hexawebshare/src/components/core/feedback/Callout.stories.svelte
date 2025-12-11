<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Callout from './Callout.svelte';

	const { Story } = defineMeta({
		title: 'Core/Feedback/Callout',
		component: Callout,
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
				description: 'Visual style of the callout'
			},
			title: { control: 'text', description: 'Title displayed in bold' },
			message: { control: 'text', description: 'Supporting message' },
			closable: { control: 'boolean', description: 'Show close button' },
			actionLabel: { control: 'text', description: 'Text for the action button' },
			withIcon: { control: 'boolean', description: 'Show leading indicator' },
			loading: { control: 'boolean', description: 'Show loading spinner' },
			disabled: { control: 'boolean', description: 'Disable interactions' },
			fullWidth: { control: 'boolean', description: 'Stretch callout to full width' },
			ariaLive: {
				control: { type: 'select' },
				options: ['polite', 'assertive'],
				description: 'ARIA live region setting'
			},
			role: {
				control: { type: 'select' },
				options: ['status', 'alert', 'note'],
				description: 'ARIA role override'
			}
		},
		args: {
			variant: 'info',
			title: 'Information',
			message:
				'This is an informational callout. Use it to highlight important information to users.',
			closable: false,
			actionLabel: '',
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
		message: 'Your action completed successfully.',
		loading: false
	}}
/>

<Story
	name="Warning"
	args={{
		variant: 'warning',
		title: 'Warning',
		message: 'Please double-check your inputs before proceeding.',
		loading: false
	}}
/>

<Story
	name="Error"
	args={{
		variant: 'error',
		title: 'Error',
		message: 'Something went wrong. Please try again.',
		loading: false
	}}
/>

<Story
	name="Primary"
	args={{
		variant: 'primary',
		title: 'Primary Callout',
		message: 'This is a primary variant callout.',
		loading: false
	}}
/>

<Story
	name="Secondary"
	args={{
		variant: 'secondary',
		title: 'Secondary Callout',
		message: 'This is a secondary variant callout.',
		loading: false
	}}
/>

<Story
	name="Accent"
	args={{
		variant: 'accent',
		title: 'Accent Callout',
		message: 'This is an accent variant callout.',
		loading: false
	}}
/>

<Story
	name="Neutral"
	args={{
		variant: 'neutral',
		title: 'Neutral Callout',
		message: 'This is a neutral variant callout.',
		loading: false
	}}
/>

<Story name="Without Icon" args={{ withIcon: false, loading: false }} />

<Story name="Closable" args={{ closable: true, loading: false }} />

<Story name="With Action" args={{ actionLabel: 'Learn More', loading: false }} />

<Story name="Loading State" args={{ loading: true, actionLabel: 'Details' }} />

<Story
	name="Disabled"
	args={{
		disabled: true,
		actionLabel: 'Details',
		title: 'Disabled callout',
		message: 'Interactions are disabled.',
		loading: false
	}}
/>

<Story
	name="Compact Width"
	args={{ fullWidth: false, title: 'Compact', message: 'Fits content width.', loading: false }}
/>

<Story name="Title Only" args={{ title: 'Important Notice', message: '', loading: false }} />

<Story
	name="Message Only"
	args={{ title: '', message: 'This callout has no title, only a message.', loading: false }}
/>

<Story name="Custom Content">
	<Callout title="Backup in progress" message="We are syncing your files.">
		<div class="text-xs opacity-70">This may take a few minutes. Keep this tab open.</div>
	</Callout>
</Story>

<Story
	name="With Action and Close"
	args={{
		closable: true,
		actionLabel: 'View Details',
		title: 'System Update',
		message: 'A new version is available for download.',
		loading: false
	}}
/>

<Story
	name="Error State"
	args={{
		variant: 'error',
		title: 'Connection Failed',
		message: 'Unable to connect to the server. Please check your internet connection.',
		actionLabel: 'Retry',
		closable: true,
		loading: false
	}}
/>

<Story
	name="Success with Action"
	args={{
		variant: 'success',
		title: 'Changes Saved',
		message: 'Your changes have been successfully saved.',
		actionLabel: 'View Changes',
		closable: true,
		loading: false
	}}
/>
