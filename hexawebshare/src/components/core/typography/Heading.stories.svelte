<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Heading from './Heading.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Typography/Heading',
		component: Heading,
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: 'text',
				description: 'Heading text content'
			},
			level: {
				control: { type: 'select' },
				options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
				description: 'HTML heading level (semantic)'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
				description: 'Visual size of the heading'
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
				description: 'Color variant of the heading'
			},
			weight: {
				control: { type: 'select' },
				options: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
				description: 'Font weight'
			},
			align: {
				control: { type: 'select' },
				options: ['left', 'center', 'right', 'justify'],
				description: 'Text alignment'
			},
			transform: {
				control: { type: 'select' },
				options: ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
				description: 'Text transform'
			},
			tracking: {
				control: { type: 'select' },
				options: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
				description: 'Letter spacing'
			},
			truncate: {
				control: 'boolean',
				description: 'Truncate with ellipsis'
			},
			lineClamp: {
				control: { type: 'select' },
				options: [1, 2, 3, 4, 5, 6],
				description: 'Number of lines before truncating'
			},
			gradient: {
				control: 'boolean',
				description: 'Enable gradient text effect'
			},
			gradientFrom: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
				description: 'Gradient start color'
			},
			gradientTo: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
				description: 'Gradient end color'
			},
			withMargin: {
				control: 'boolean',
				description: 'Add bottom margin'
			},
			loading: {
				control: 'boolean',
				description: 'Loading state (skeleton)'
			},
			disabled: {
				control: 'boolean',
				description: 'Disabled state'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaLevel: {
				control: 'number',
				description: 'ARIA level attribute'
			}
		},
		args: {
			text: 'Heading Text',
			level: 'h2',
			align: 'left',
			onclick: fn()
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ text: 'Default Heading', level: 'h2' }} />

<!-- Heading Levels -->
<Story name="H1 Level" args={{ text: 'Heading Level 1', level: 'h1' }} />
<Story name="H2 Level" args={{ text: 'Heading Level 2', level: 'h2' }} />
<Story name="H3 Level" args={{ text: 'Heading Level 3', level: 'h3' }} />
<Story name="H4 Level" args={{ text: 'Heading Level 4', level: 'h4' }} />
<Story name="H5 Level" args={{ text: 'Heading Level 5', level: 'h5' }} />
<Story name="H6 Level" args={{ text: 'Heading Level 6', level: 'h6' }} />

<!-- Visual Sizes -->
<Story name="Extra Small Size" args={{ text: 'Extra Small Heading', level: 'h2', size: 'xs' }} />
<Story name="Small Size" args={{ text: 'Small Heading', level: 'h2', size: 'sm' }} />
<Story name="Medium Size" args={{ text: 'Medium Heading', level: 'h2', size: 'md' }} />
<Story name="Large Size" args={{ text: 'Large Heading', level: 'h2', size: 'lg' }} />
<Story name="Extra Large Size" args={{ text: 'Extra Large Heading', level: 'h2', size: 'xl' }} />
<Story name="Size 2XL" args={{ text: '2XL Heading', level: 'h2', size: '2xl' }} />
<Story name="Size 3XL" args={{ text: '3XL Heading', level: 'h2', size: '3xl' }} />
<Story name="Size 4XL" args={{ text: '4XL Heading', level: 'h2', size: '4xl' }} />

<!-- Color Variants -->
<Story name="Primary Variant" args={{ text: 'Primary Heading', level: 'h2', variant: 'primary' }} />
<Story
	name="Secondary Variant"
	args={{ text: 'Secondary Heading', level: 'h2', variant: 'secondary' }}
/>
<Story name="Accent Variant" args={{ text: 'Accent Heading', level: 'h2', variant: 'accent' }} />
<Story name="Neutral Variant" args={{ text: 'Neutral Heading', level: 'h2', variant: 'neutral' }} />
<Story name="Info Variant" args={{ text: 'Info Heading', level: 'h2', variant: 'info' }} />
<Story name="Success Variant" args={{ text: 'Success Heading', level: 'h2', variant: 'success' }} />
<Story name="Warning Variant" args={{ text: 'Warning Heading', level: 'h2', variant: 'warning' }} />
<Story name="Error Variant" args={{ text: 'Error Heading', level: 'h2', variant: 'error' }} />

<!-- Font Weights -->
<Story name="Light Weight" args={{ text: 'Light Weight Heading', level: 'h2', weight: 'light' }} />
<Story
	name="Normal Weight"
	args={{ text: 'Normal Weight Heading', level: 'h2', weight: 'normal' }}
/>
<Story
	name="Medium Weight"
	args={{ text: 'Medium Weight Heading', level: 'h2', weight: 'medium' }}
/>
<Story
	name="Semibold Weight"
	args={{ text: 'Semibold Weight Heading', level: 'h2', weight: 'semibold' }}
/>
<Story name="Bold Weight" args={{ text: 'Bold Weight Heading', level: 'h2', weight: 'bold' }} />
<Story
	name="Extrabold Weight"
	args={{ text: 'Extrabold Weight Heading', level: 'h2', weight: 'extrabold' }}
/>
<Story name="Black Weight" args={{ text: 'Black Weight Heading', level: 'h2', weight: 'black' }} />

<!-- Text Alignment -->
<Story name="Left Aligned" args={{ text: 'Left Aligned Heading', level: 'h2', align: 'left' }} />
<Story
	name="Center Aligned"
	args={{ text: 'Center Aligned Heading', level: 'h2', align: 'center' }}
/>
<Story name="Right Aligned" args={{ text: 'Right Aligned Heading', level: 'h2', align: 'right' }} />
<Story
	name="Justified"
	args={{ text: 'Justified Heading with Multiple Words', level: 'h2', align: 'justify' }}
/>

<!-- Text Transform -->
<Story name="Uppercase" args={{ text: 'Uppercase Heading', level: 'h2', transform: 'uppercase' }} />
<Story name="Lowercase" args={{ text: 'Lowercase Heading', level: 'h2', transform: 'lowercase' }} />
<Story
	name="Capitalize"
	args={{ text: 'capitalize heading', level: 'h2', transform: 'capitalize' }}
/>

<!-- Letter Spacing -->
<Story name="Tight Tracking" args={{ text: 'Tight Tracking', level: 'h2', tracking: 'tight' }} />
<Story name="Normal Tracking" args={{ text: 'Normal Tracking', level: 'h2', tracking: 'normal' }} />
<Story name="Wide Tracking" args={{ text: 'Wide Tracking', level: 'h2', tracking: 'wide' }} />
<Story name="Widest Tracking" args={{ text: 'Widest Tracking', level: 'h2', tracking: 'widest' }} />

<!-- Truncation -->
<Story
	name="Truncated"
	args={{
		text: 'This is a very long heading that should be truncated with an ellipsis at the end',
		level: 'h2',
		truncate: true
	}}
/>
<Story
	name="Line Clamp 2"
	args={{
		text: 'This is a multi-line heading that should be clamped to two lines maximum with an ellipsis shown at the end of the second line',
		level: 'h2',
		lineClamp: 2
	}}
/>
<Story
	name="Line Clamp 3"
	args={{
		text: 'This is a multi-line heading that should be clamped to three lines maximum with an ellipsis shown at the end of the third line when the text is too long to fit',
		level: 'h2',
		lineClamp: 3
	}}
/>

<!-- Gradient Text -->
<Story
	name="Gradient Primary to Secondary"
	args={{
		text: 'Gradient Heading',
		level: 'h1',
		gradient: true,
		gradientFrom: 'primary',
		gradientTo: 'secondary'
	}}
/>
<Story
	name="Gradient Accent to Success"
	args={{
		text: 'Gradient Heading',
		level: 'h1',
		gradient: true,
		gradientFrom: 'accent',
		gradientTo: 'success'
	}}
/>
<Story
	name="Gradient Info to Warning"
	args={{
		text: 'Gradient Heading',
		level: 'h1',
		gradient: true,
		gradientFrom: 'info',
		gradientTo: 'warning'
	}}
/>

<!-- States -->
<Story name="With Margin" args={{ text: 'Heading with Margin', level: 'h2', withMargin: true }} />
<Story name="Loading State" args={{ text: 'Loading Heading', level: 'h2', loading: true }} />
<Story name="Disabled State" args={{ text: 'Disabled Heading', level: 'h2', disabled: true }} />

<!-- Combinations -->
<Story
	name="Large Primary Bold Centered"
	args={{
		text: 'Large Primary Bold Centered',
		level: 'h1',
		size: '3xl',
		variant: 'primary',
		weight: 'bold',
		align: 'center'
	}}
/>
<Story
	name="Medium Accent Uppercase Wide"
	args={{
		text: 'Medium Accent Uppercase Wide',
		level: 'h2',
		size: '2xl',
		variant: 'accent',
		transform: 'uppercase',
		tracking: 'wide'
	}}
/>
<Story
	name="Small Success Light"
	args={{
		text: 'Small Success Light Heading',
		level: 'h3',
		size: 'lg',
		variant: 'success',
		weight: 'light'
	}}
/>

<!-- Accessibility -->
<Story
	name="With ARIA Label"
	args={{
		text: 'Heading Text',
		level: 'h2',
		ariaLabel: 'Custom accessible label for screen readers'
	}}
/>
<Story
	name="Custom ARIA Level"
	args={{
		text: 'Visually H3 but semantically level 4',
		level: 'h3',
		ariaLevel: 4
	}}
/>

<!-- Interactive -->
<Story
	name="Clickable"
	args={{
		text: 'Click Me!',
		level: 'h2',
		variant: 'primary'
	}}
/>
