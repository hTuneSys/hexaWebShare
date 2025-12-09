<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->
<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Notification from './Notification.svelte';

	const { Story } = defineMeta({
		title: 'Core/Feedback/Notification',
		component: Notification,
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
				description: 'Visual style of the notification'
			},
			title: { control: 'text', description: 'Title displayed in bold' },
			message: { control: 'text', description: 'Supporting message' },
			open: { control: 'boolean', description: 'Controls visibility' },
			closable: { control: 'boolean', description: 'Show close button' },
			actionLabel: { control: 'text', description: 'Text for the action button' },
			withIcon: { control: 'boolean', description: 'Show leading indicator' },
			loading: { control: 'boolean', description: 'Show loading spinner' },
			disabled: { control: 'boolean', description: 'Disable interactions' },
			fullWidth: { control: 'boolean', description: 'Stretch notification to full width' },
			ariaLive: {
				control: { type: 'select' },
				options: ['polite', 'assertive'],
				description: 'ARIA live region setting'
			}
		},
		args: {
			variant: 'info',
			title: 'System update available',
			message: 'A new version is ready to install. Please review the changes.',
			open: true,
			closable: true,
			actionLabel: 'Review',
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
	args={{ variant: 'success', title: 'Success', message: 'Your action completed successfully.' }}
/>

<Story
	name="Warning"
	args={{ variant: 'warning', title: 'Warning', message: 'Please double-check your inputs.' }}
/>

<Story
	name="Error"
	args={{ variant: 'error', title: 'Error', message: 'Something went wrong. Try again.' }}
/>

<Story name="Without Icon" args={{ withIcon: false }} />

<Story name="Non Closable" args={{ closable: false }} />

<Story name="With Action" args={{ actionLabel: 'Undo' }} />

<Story name="Loading State" args={{ loading: true, actionLabel: 'Details' }} />

<Story
	name="Compact Width"
	args={{ fullWidth: false, title: 'Compact', message: 'Fits content width.' }}
/>

<Story
	name="Disabled"
	args={{
		disabled: true,
		open: true,
		actionLabel: 'Details',
		title: 'Disabled notification',
		message: 'Interactions are disabled.'
	}}
/>

<Story name="Custom Content">
	<Notification title="Backup running" message="We are syncing your files.">
		<div class="text-xs opacity-70">This may take a few minutes. Keep this tab open.</div>
	</Notification>
</Story>
