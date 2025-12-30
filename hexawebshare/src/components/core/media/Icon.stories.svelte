<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Icon from './Icon.svelte';

	const { Story } = defineMeta({
		title: 'Core/Media/Icon',
		component: Icon,
		tags: ['autodocs'],
		argTypes: {
			name: {
				control: 'text',
				description: 'Icon name/identifier for semantic purposes'
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
				description: 'Color variant of the icon'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Size of the icon (xs=12px, sm=16px, md=20px, lg=24px, xl=32px)'
			},
			spin: {
				control: 'boolean',
				description: 'Enable spinning animation'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the icon is disabled (reduced opacity)'
			},
			clickable: {
				control: 'boolean',
				description: 'Make the icon clickable with hover effects'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide icon from screen readers'
			}
		},
		args: {
			name: 'star',
			size: 'lg',
			variant: 'primary',
			spin: false,
			disabled: false,
			clickable: false,
			ariaHidden: true
		}
	});
</script>

<!-- Default Story with star icon -->
<Story name="Default" args={{ name: 'star', size: 'lg', variant: 'primary' }} />

<!-- Size Stories -->
<Story name="Extra Small (12px)" args={{ name: 'star', size: 'xs', variant: 'primary' }} />
<Story name="Small (16px)" args={{ name: 'star', size: 'sm', variant: 'primary' }} />
<Story name="Medium (20px)" args={{ name: 'star', size: 'md', variant: 'primary' }} />
<Story name="Large (24px)" args={{ name: 'star', size: 'lg', variant: 'primary' }} />
<Story name="Extra Large (32px)" args={{ name: 'star', size: 'xl', variant: 'primary' }} />

<!-- Variant/Color Stories -->
<Story name="Primary" args={{ name: 'star', size: 'xl', variant: 'primary' }} />
<Story name="Secondary" args={{ name: 'star', size: 'xl', variant: 'secondary' }} />
<Story name="Accent" args={{ name: 'star', size: 'xl', variant: 'accent' }} />
<Story name="Neutral" args={{ name: 'star', size: 'xl', variant: 'neutral' }} />
<Story name="Info" args={{ name: 'star', size: 'xl', variant: 'info' }} />
<Story name="Success" args={{ name: 'star', size: 'xl', variant: 'success' }} />
<Story name="Warning" args={{ name: 'star', size: 'xl', variant: 'warning' }} />
<Story name="Error" args={{ name: 'star', size: 'xl', variant: 'error' }} />

<!-- State Stories -->
<Story name="Spinning" args={{ name: 'loading', size: 'xl', variant: 'primary', spin: true }} />
<Story name="Disabled" args={{ name: 'star', size: 'xl', variant: 'primary', disabled: true }} />
<Story name="Clickable" args={{ name: 'star', size: 'xl', variant: 'primary', clickable: true }} />

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{ name: 'star', size: 'xl', variant: 'success', ariaLabel: 'Favorite' }}
/>
<Story
	name="Decorative"
	args={{ name: 'star', size: 'xl', variant: 'neutral', ariaHidden: true }}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		name: 'star',
		size: 'xl',
		variant: 'primary',
		spin: false,
		disabled: false,
		clickable: false,
		ariaLabel: 'Interactive icon'
	}}
/>

<!-- Custom SVG Example -->
<Story name="Custom SVG (Heart)">
	<Icon name="heart" size="xl" variant="error">
		{#snippet children()}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
				<path
					d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
				/>
			</svg>
		{/snippet}
	</Icon>
</Story>

<!-- Custom SVG with Spin -->
<Story name="Custom SVG Spinning (Loader)">
	<Icon name="loader" size="xl" variant="info" spin={true}>
		{#snippet children()}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<circle cx="12" cy="12" r="10" stroke-opacity="0.25" />
				<path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" />
			</svg>
		{/snippet}
	</Icon>
</Story>
