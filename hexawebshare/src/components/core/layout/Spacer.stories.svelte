<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spacer from './Spacer.svelte';

	const { Story } = defineMeta({
		title: 'Core/Layout/Spacer',
		component: Spacer,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
				description: 'Size of the spacing'
			},
			axis: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical', 'both'],
				description: 'Direction of the spacing'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Whether the spacer is decorative (hidden from screen readers)'
			},
			showOutline: {
				control: 'boolean',
				description: 'Show a visual outline for debugging/demonstration purposes'
			}
		},
		args: {
			size: 'md',
			axis: 'vertical',
			ariaHidden: true,
			showOutline: true
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ size: 'md', axis: 'vertical', showOutline: true }} />

<!-- Size Variants -->
<Story name="Size XS" args={{ size: 'xs', axis: 'vertical', showOutline: true }} />
<Story name="Size SM" args={{ size: 'sm', axis: 'vertical', showOutline: true }} />
<Story name="Size MD" args={{ size: 'md', axis: 'vertical', showOutline: true }} />
<Story name="Size LG" args={{ size: 'lg', axis: 'vertical', showOutline: true }} />
<Story name="Size XL" args={{ size: 'xl', axis: 'vertical', showOutline: true }} />
<Story name="Size 2XL" args={{ size: '2xl', axis: 'vertical', showOutline: true }} />

<!-- Axis Variants -->
<Story name="Vertical" args={{ size: 'lg', axis: 'vertical', showOutline: true }} />
<Story name="Horizontal" args={{ size: 'lg', axis: 'horizontal', showOutline: true }} />
<Story name="Both" args={{ size: 'lg', axis: 'both', showOutline: true }} />

<!-- Production Example (no outline) -->
<Story name="Production Example" args={{ size: 'md', axis: 'vertical', showOutline: false }} />

<!-- Playground -->
<Story name="Playground" args={{ size: 'md', axis: 'vertical', showOutline: true }} />
