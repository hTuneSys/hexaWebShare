<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import IconButton from './IconButton.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Buttons/IconButton',
		component: IconButton,
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
					'error',
					'ghost',
					'link'
				]
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			circle: { control: 'boolean' },
			square: { control: 'boolean' },
			outline: { control: 'boolean' },
			glass: { control: 'boolean' },
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' }
		},
		args: {
			onclick: fn(),
			ariaLabel: 'Icon button'
		}
	});
</script>

<!-- Variant Stories -->
<Story name="Primary" args={{ variant: 'primary', ariaLabel: 'Primary button' }} />
<Story name="Secondary" args={{ variant: 'secondary', ariaLabel: 'Secondary button' }} />
<Story name="Accent" args={{ variant: 'accent', ariaLabel: 'Accent button' }} />
<Story name="Info" args={{ variant: 'info', ariaLabel: 'Info button' }} />
<Story name="Success" args={{ variant: 'success', ariaLabel: 'Success button' }} />
<Story name="Warning" args={{ variant: 'warning', ariaLabel: 'Warning button' }} />
<Story name="Error" args={{ variant: 'error', ariaLabel: 'Error button' }} />
<Story name="Ghost" args={{ variant: 'ghost', ariaLabel: 'Ghost button' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ size: 'xs', ariaLabel: 'Extra small button' }} />
<Story name="Small" args={{ size: 'sm', ariaLabel: 'Small button' }} />
<Story name="Medium" args={{ size: 'md', ariaLabel: 'Medium button' }} />
<Story name="Large" args={{ size: 'lg', ariaLabel: 'Large button' }} />

<!-- Shape Stories -->
<Story name="Circle" args={{ circle: true, ariaLabel: 'Circle button' }} />
<Story name="Square" args={{ square: true, ariaLabel: 'Square button' }} />

<!-- Style Variants -->
<Story name="Outline" args={{ outline: true, ariaLabel: 'Outline button' }} />
<Story name="Glass" args={{ glass: true, ariaLabel: 'Glass button' }} />
<Story name="Disabled" args={{ disabled: true, ariaLabel: 'Disabled button' }} />
<Story name="Loading" args={{ loading: true, ariaLabel: 'Loading button' }} />

<!-- Icon Examples - These need custom icons, so we use let:args with explicit IconButton -->
<!-- @ts-ignore - Storybook args type inference issue with let:args -->
<Story name="Heart Icon" let:args>
	<IconButton {...args} ariaLabel="Heart button">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path
				d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
			/>
		</svg>
	</IconButton>
</Story>

<!-- @ts-ignore - Storybook args type inference issue with let:args -->
<Story name="Trash Icon" let:args>
	<IconButton {...args} variant="error" ariaLabel="Delete button">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="3 6 5 6 21 6" />
			<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
		</svg>
	</IconButton>
</Story>

<!-- @ts-ignore - Storybook args type inference issue with let:args -->
<Story name="Settings Icon" let:args>
	<IconButton {...args} variant="ghost" ariaLabel="Settings button">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="3" />
			<path
				d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"
			/>
		</svg>
	</IconButton>
</Story>

<!-- @ts-ignore - Storybook args type inference issue with let:args -->
<Story name="Search Icon" let:args>
	<IconButton {...args} variant="ghost" ariaLabel="Search button">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" />
		</svg>
	</IconButton>
</Story>

<!-- @ts-ignore - Storybook args type inference issue with let:args -->
<Story name="Plus Icon" let:args>
	<IconButton {...args} variant="primary" ariaLabel="Add button">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	</IconButton>
</Story>

<!-- @ts-ignore - Storybook args type inference issue with let:args -->
<Story name="Check Icon" let:args>
	<IconButton {...args} variant="success" ariaLabel="Confirm button">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	</IconButton>
</Story>

<!-- @ts-ignore - Storybook args type inference issue with let:args -->
<Story name="Close Icon" let:args>
	<IconButton {...args} variant="ghost" size="sm" ariaLabel="Close button">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
	</IconButton>
</Story>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		variant: 'primary',
		size: 'md',
		circle: false,
		square: false,
		outline: false,
		glass: false,
		disabled: false,
		loading: false,
		ariaLabel: 'Icon button'
	}}
/>
