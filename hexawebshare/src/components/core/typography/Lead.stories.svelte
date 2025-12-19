<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Lead from './Lead.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Typography/Lead',
		component: Lead,
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: 'text',
				description: 'Lead text content'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
				description: 'Size variant of the lead text'
			},
			align: {
				control: { type: 'select' },
				options: ['left', 'center', 'right', 'justify'],
				description: 'Text alignment'
			},
			variant: {
				control: { type: 'select' },
				options: [
					'default',
					'muted',
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the lead text'
			},
			weight: {
				control: { type: 'select' },
				options: ['light', 'normal', 'medium', 'semibold', 'bold'],
				description: 'Font weight'
			},
			leading: {
				control: { type: 'select' },
				options: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
				description: 'Line height / leading'
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
			loading: {
				control: 'boolean',
				description: 'Loading state (skeleton)'
			},
			disabled: {
				control: 'boolean',
				description: 'Disabled state'
			},
			italic: {
				control: 'boolean',
				description: 'Italic style'
			},
			underline: {
				control: 'boolean',
				description: 'Underline style'
			},
			strikethrough: {
				control: 'boolean',
				description: 'Strikethrough style'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide from screen readers'
			}
		},
		args: {
			text: 'This is a lead paragraph that stands out from regular text. It is typically used for important introductory content or call-to-action descriptions.',
			size: 'lg',
			align: 'left',
			variant: 'default',
			weight: 'normal',
			leading: 'relaxed'
		}
	});
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		text: 'This is a default lead paragraph that stands out from regular text. It is typically used for important introductory content or call-to-action descriptions.'
	}}
/>

<!-- Size Variants -->
<Story
	name="Extra Small"
	args={{
		text: 'This is an extra small lead paragraph.',
		size: 'xs'
	}}
/>
<Story
	name="Small"
	args={{
		text: 'This is a small lead paragraph.',
		size: 'sm'
	}}
/>
<Story
	name="Base"
	args={{
		text: 'This is a base size lead paragraph.',
		size: 'base'
	}}
/>
<Story
	name="Large"
	args={{
		text: 'This is a large lead paragraph that stands out more.',
		size: 'lg'
	}}
/>
<Story
	name="Extra Large"
	args={{
		text: 'This is an extra large lead paragraph for maximum emphasis.',
		size: 'xl'
	}}
/>
<Story
	name="Size 2XL"
	args={{
		text: 'This is a 2XL lead paragraph for hero sections.',
		size: '2xl'
	}}
/>

<!-- Color Variants -->
<Story
	name="Default Variant"
	args={{
		text: 'This is a default lead paragraph with base content color.',
		variant: 'default'
	}}
/>
<Story
	name="Muted Variant"
	args={{
		text: 'This is a muted lead paragraph with reduced opacity.',
		variant: 'muted'
	}}
/>
<Story
	name="Primary Variant"
	args={{
		text: 'This is a primary lead paragraph with primary theme color.',
		variant: 'primary'
	}}
/>
<Story
	name="Secondary Variant"
	args={{
		text: 'This is a secondary lead paragraph with secondary theme color.',
		variant: 'secondary'
	}}
/>
<Story
	name="Accent Variant"
	args={{
		text: 'This is an accent lead paragraph with accent theme color.',
		variant: 'accent'
	}}
/>
<Story
	name="Info Variant"
	args={{
		text: 'This is an info lead paragraph with info theme color.',
		variant: 'info'
	}}
/>
<Story
	name="Success Variant"
	args={{
		text: 'This is a success lead paragraph with success theme color.',
		variant: 'success'
	}}
/>
<Story
	name="Warning Variant"
	args={{
		text: 'This is a warning lead paragraph with warning theme color.',
		variant: 'warning'
	}}
/>
<Story
	name="Error Variant"
	args={{
		text: 'This is an error lead paragraph with error theme color.',
		variant: 'error'
	}}
/>

<!-- Font Weights -->
<Story
	name="Light Weight"
	args={{
		text: 'This is a light weight lead paragraph.',
		weight: 'light'
	}}
/>
<Story
	name="Normal Weight"
	args={{
		text: 'This is a normal weight lead paragraph.',
		weight: 'normal'
	}}
/>
<Story
	name="Medium Weight"
	args={{
		text: 'This is a medium weight lead paragraph.',
		weight: 'medium'
	}}
/>
<Story
	name="Semibold Weight"
	args={{
		text: 'This is a semibold weight lead paragraph.',
		weight: 'semibold'
	}}
/>
<Story
	name="Bold Weight"
	args={{
		text: 'This is a bold weight lead paragraph.',
		weight: 'bold'
	}}
/>

<!-- Text Alignment -->
<Story
	name="Left Aligned"
	args={{
		text: 'This is a left aligned lead paragraph.',
		align: 'left'
	}}
/>
<Story
	name="Center Aligned"
	args={{
		text: 'This is a center aligned lead paragraph.',
		align: 'center'
	}}
/>
<Story
	name="Right Aligned"
	args={{
		text: 'This is a right aligned lead paragraph.',
		align: 'right'
	}}
/>
<Story
	name="Justified"
	args={{
		text: 'This is a justified lead paragraph with multiple words that should be evenly distributed across the line width.',
		align: 'justify'
	}}
/>

<!-- Line Height / Leading -->
<Story
	name="Tight Leading"
	args={{
		text: 'This is a lead paragraph with tight leading. The lines are closer together.',
		leading: 'tight'
	}}
/>
<Story
	name="Normal Leading"
	args={{
		text: 'This is a lead paragraph with normal leading. The lines have standard spacing.',
		leading: 'normal'
	}}
/>
<Story
	name="Relaxed Leading"
	args={{
		text: 'This is a lead paragraph with relaxed leading. The lines have more comfortable spacing for better readability.',
		leading: 'relaxed'
	}}
/>
<Story
	name="Loose Leading"
	args={{
		text: 'This is a lead paragraph with loose leading. The lines have generous spacing for maximum readability.',
		leading: 'loose'
	}}
/>

<!-- Truncation -->
<Story
	name="Truncated"
	args={{
		text: 'This is a very long lead paragraph that should be truncated with an ellipsis at the end when it exceeds the container width.',
		truncate: true
	}}
/>
<Story
	name="Line Clamp 2"
	args={{
		text: 'This is a multi-line lead paragraph that should be clamped to two lines maximum with an ellipsis shown at the end of the second line when the text is too long to fit within the specified line count.',
		lineClamp: 2
	}}
/>
<Story
	name="Line Clamp 3"
	args={{
		text: 'This is a multi-line lead paragraph that should be clamped to three lines maximum with an ellipsis shown at the end of the third line when the text is too long to fit within the specified line count. This allows for more content to be displayed while still maintaining a clean appearance.',
		lineClamp: 3
	}}
/>

<!-- Text Styles -->
<Story
	name="Italic"
	args={{
		text: 'This is an italic lead paragraph.',
		italic: true
	}}
/>
<Story
	name="Underline"
	args={{
		text: 'This is an underlined lead paragraph.',
		underline: true
	}}
/>
<Story
	name="Strikethrough"
	args={{
		text: 'This is a strikethrough lead paragraph.',
		strikethrough: true
	}}
/>

<!-- States -->
<Story
	name="Loading State"
	args={{
		text: 'This is a loading lead paragraph.',
		loading: true
	}}
/>
<Story
	name="Disabled State"
	args={{
		text: 'This is a disabled lead paragraph.',
		disabled: true
	}}
/>

<!-- Combinations -->
<Story
	name="Large Primary Bold Centered"
	args={{
		text: 'This is a large, primary colored, bold, centered lead paragraph for hero sections.',
		size: 'xl',
		variant: 'primary',
		weight: 'bold',
		align: 'center'
	}}
/>
<Story
	name="Medium Accent Semibold"
	args={{
		text: 'This is a medium size, accent colored, semibold lead paragraph.',
		size: 'lg',
		variant: 'accent',
		weight: 'semibold'
	}}
/>
<Story
	name="Small Success Light"
	args={{
		text: 'This is a small, success colored, light weight lead paragraph.',
		size: 'sm',
		variant: 'success',
		weight: 'light'
	}}
/>

<!-- Real-world Examples -->
<Story
	name="Article Introduction"
	args={{
		text: 'Welcome to our comprehensive guide on modern web development. This article will explore the latest trends, best practices, and innovative techniques that are shaping the future of digital experiences.',
		size: 'lg',
		variant: 'default',
		align: 'left',
		leading: 'relaxed'
	}}
/>
<Story
	name="Hero Section"
	args={{
		text: 'Transform your business with our cutting-edge solutions. Join thousands of companies already experiencing unprecedented growth and success.',
		size: 'xl',
		variant: 'primary',
		weight: 'medium',
		align: 'center',
		leading: 'relaxed'
	}}
/>
<Story
	name="Product Highlight"
	args={{
		text: 'Discover the power of our revolutionary platform designed to streamline your workflow and boost productivity like never before.',
		size: 'lg',
		variant: 'accent',
		align: 'center'
	}}
/>
<Story
	name="Announcement Banner"
	args={{
		text: 'Important: We are launching new features next week. Stay tuned for exciting updates that will enhance your experience.',
		size: 'base',
		variant: 'info',
		weight: 'semibold',
		align: 'center'
	}}
/>
<Story
	name="Error Message"
	args={{
		text: 'Something went wrong. Please check your input and try again. If the problem persists, contact our support team.',
		size: 'base',
		variant: 'error',
		align: 'left'
	}}
/>
<Story
	name="Success Message"
	args={{
		text: 'Congratulations! Your changes have been saved successfully. You can now continue with your workflow.',
		size: 'base',
		variant: 'success',
		align: 'left'
	}}
/>

<!-- Accessibility -->
<Story
	name="With ARIA Label"
	args={{
		text: 'Lead paragraph text',
		ariaLabel: 'Custom accessible label for screen readers'
	}}
/>
<Story
	name="Hidden from Screen Readers"
	args={{
		text: 'This decorative lead paragraph is hidden from screen readers.',
		ariaHidden: true
	}}
/>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		text: 'This is an interactive lead paragraph. Use the controls panel to customize all properties.',
		size: 'lg',
		variant: 'default',
		weight: 'normal',
		align: 'left',
		leading: 'relaxed'
	}}
/>
