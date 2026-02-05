<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Loader from './Loader.svelte';

	const { Story } = defineMeta({
		title: 'Core/Feedback/Loader',
		component: Loader,
		tags: ['autodocs'],
		argTypes: {
			status: {
				control: { type: 'select' },
				options: ['loading', 'success', 'warning', 'error'],
				description: 'Current status of the loader'
			},
			type: {
				control: { type: 'select' },
				options: ['spinner', 'dots', 'ring', 'bars', 'ball'],
				description: 'Loader animation style'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the loader indicator'
			},
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
				description: 'Visual style of the indicator'
			},
			fullWidth: { control: 'boolean', description: 'Stretch and center within its container' },
			showBackdrop: { control: 'boolean', description: 'Add a subtle backdrop container' },
			disabled: { control: 'boolean', description: 'Dim and disable interactions' },
			label: { control: 'text', description: 'Main label text' },
			description: { control: 'text', description: 'Secondary descriptive text' },
			ariaLive: {
				control: { type: 'select' },
				options: ['polite', 'assertive'],
				description: 'ARIA live setting'
			}
		},
		args: {
			status: 'loading',
			label: 'Loading data',
			description: 'Fetching your content, please wait.',
			type: 'spinner',
			size: 'md',
			variant: 'info',
			fullWidth: false,
			showBackdrop: false,
			disabled: false,
			ariaLive: 'polite'
		}
	});
</script>

<Story name="Default" />

<Story
	name="Success"
	args={{
		status: 'success',
		label: 'Completed',
		description: 'All items processed successfully.',
		variant: 'success'
	}}
/>

<Story
	name="Warning"
	args={{
		status: 'warning',
		label: 'Almost there',
		description: 'We are finalizing the operation.',
		variant: 'warning'
	}}
/>

<Story
	name="Error"
	args={{
		status: 'error',
		label: 'Failed',
		description: 'Something went wrong. Please retry.',
		variant: 'error'
	}}
/>

<Story name="Dots Type" args={{ type: 'dots', label: 'Loading dots', variant: 'primary' }} />

<Story name="Ring Type" args={{ type: 'ring', label: 'Loading ring', variant: 'accent' }} />

<Story name="Bars Type" args={{ type: 'bars', label: 'Loading bars', variant: 'secondary' }} />

<Story name="Ball Type" args={{ type: 'ball', label: 'Loading ball', variant: 'info' }} />

<Story
	name="Large With Backdrop"
	args={{
		size: 'lg',
		label: 'Large loader',
		description: 'Prominent indicator for blocking operations.',
		showBackdrop: true
	}}
/>

<Story
	name="Full Width Centered"
	args={{
		fullWidth: true,
		showBackdrop: true,
		label: 'Center aligned',
		description: 'Centered within its container.'
	}}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		status: 'loading',
		label: 'Loading data',
		description: 'Fetching your content, please wait.',
		type: 'spinner',
		size: 'md',
		variant: 'info',
		fullWidth: false,
		showBackdrop: false,
		disabled: false,
		ariaLive: 'polite'
	}}
/>
