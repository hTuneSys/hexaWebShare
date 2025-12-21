<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Paragraph from './Paragraph.svelte';

	const { Story } = defineMeta({
		title: 'Core/Typography/Paragraph',
		component: Paragraph,
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: 'text',
				description: 'Text content of the paragraph'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
				description: 'Size variant of the paragraph'
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
				description: 'Color variant of the paragraph text'
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
				description: 'Truncate text with ellipsis (single line)'
			},
			lineClamp: {
				control: { type: 'select' },
				options: [undefined, 1, 2, 3, 4, 5, 6],
				description: 'Limit text to specified number of lines'
			},
			loading: {
				control: 'boolean',
				description: 'Loading state with skeleton animation'
			},
			italic: {
				control: 'boolean',
				description: 'Use italic style'
			},
			underline: {
				control: 'boolean',
				description: 'Use underline style'
			},
			strikethrough: {
				control: 'boolean',
				description: 'Use strikethrough style'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide paragraph from screen readers'
			}
		},
		args: {
			text: 'This is a sample paragraph with default styling. It demonstrates the basic usage of the Paragraph component.',
			size: 'base',
			align: 'left',
			variant: 'default',
			weight: 'normal',
			leading: 'normal'
		}
	});

	const sampleText =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

	const longText =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.';
</script>

<!-- Default Story -->
<Story name="Default" args={{ text: sampleText }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ text: sampleText, size: 'xs' }} />
<Story name="Small" args={{ text: sampleText, size: 'sm' }} />
<Story name="Base" args={{ text: sampleText, size: 'base' }} />
<Story name="Large" args={{ text: sampleText, size: 'lg' }} />
<Story name="Extra Large" args={{ text: sampleText, size: 'xl' }} />
<Story name="Size 2XL" args={{ text: sampleText, size: '2xl' }} />

<!-- Alignment Stories -->
<Story name="Left Aligned" args={{ text: sampleText, align: 'left' }} />
<Story name="Center Aligned" args={{ text: sampleText, align: 'center' }} />
<Story name="Right Aligned" args={{ text: sampleText, align: 'right' }} />
<Story name="Justified" args={{ text: sampleText, align: 'justify' }} />

<!-- Variant/Color Stories -->
<Story
	name="Default Color"
	args={{ text: 'Default colored paragraph text.', variant: 'default' }}
/>
<Story
	name="Muted"
	args={{ text: 'Muted paragraph text for secondary content.', variant: 'muted' }}
/>
<Story name="Primary" args={{ text: 'Primary colored paragraph text.', variant: 'primary' }} />
<Story
	name="Secondary"
	args={{ text: 'Secondary colored paragraph text.', variant: 'secondary' }}
/>
<Story name="Accent" args={{ text: 'Accent colored paragraph text.', variant: 'accent' }} />
<Story name="Info" args={{ text: 'Info colored paragraph text.', variant: 'info' }} />
<Story name="Success" args={{ text: 'Success colored paragraph text.', variant: 'success' }} />
<Story name="Warning" args={{ text: 'Warning colored paragraph text.', variant: 'warning' }} />
<Story name="Error" args={{ text: 'Error colored paragraph text.', variant: 'error' }} />

<!-- Weight Stories -->
<Story name="Light Weight" args={{ text: 'Light weight paragraph text.', weight: 'light' }} />
<Story name="Normal Weight" args={{ text: 'Normal weight paragraph text.', weight: 'normal' }} />
<Story name="Medium Weight" args={{ text: 'Medium weight paragraph text.', weight: 'medium' }} />
<Story
	name="Semibold Weight"
	args={{ text: 'Semibold weight paragraph text.', weight: 'semibold' }}
/>
<Story name="Bold Weight" args={{ text: 'Bold weight paragraph text.', weight: 'bold' }} />

<!-- Leading Stories -->
<Story name="Leading None" args={{ text: sampleText, leading: 'none' }} />
<Story name="Leading Tight" args={{ text: sampleText, leading: 'tight' }} />
<Story name="Leading Snug" args={{ text: sampleText, leading: 'snug' }} />
<Story name="Leading Normal" args={{ text: sampleText, leading: 'normal' }} />
<Story name="Leading Relaxed" args={{ text: sampleText, leading: 'relaxed' }} />
<Story name="Leading Loose" args={{ text: sampleText, leading: 'loose' }} />

<!-- Text Style Stories -->
<Story name="Italic" args={{ text: 'This paragraph is styled with italic text.', italic: true }} />
<Story name="Underline" args={{ text: 'This paragraph has underlined text.', underline: true }} />
<Story
	name="Strikethrough"
	args={{ text: 'This paragraph has strikethrough text.', strikethrough: true }}
/>
<Story
	name="Combined Styles"
	args={{
		text: 'This paragraph combines italic, underline, and bold styles.',
		italic: true,
		underline: true,
		weight: 'bold'
	}}
/>

<!-- Truncation Stories -->
<Story
	name="Truncated"
	args={{
		text: longText,
		truncate: true
	}}
/>
<Story name="Line Clamp 1" args={{ text: longText, lineClamp: 1 }} />
<Story name="Line Clamp 2" args={{ text: longText, lineClamp: 2 }} />
<Story name="Line Clamp 3" args={{ text: longText, lineClamp: 3 }} />

<!-- State Stories -->
<Story name="Loading" args={{ text: sampleText, loading: true }} />
<Story name="Loading Large" args={{ text: sampleText, loading: true, size: 'lg' }} />

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{
		text: 'Important announcement text.',
		ariaLabel: 'Important announcement: This is crucial information for all users.'
	}}
/>
<Story
	name="Decorative (Aria Hidden)"
	args={{ text: 'Decorative text that is hidden from screen readers.', ariaHidden: true }}
/>

<!-- All Sizes Showcase -->
<Story name="All Sizes">
	<div class="space-y-4">
		<Paragraph text="Extra Small (xs) - Compact text for fine print" size="xs" />
		<Paragraph text="Small (sm) - Smaller text for captions" size="sm" />
		<Paragraph text="Base (base) - Default paragraph size" size="base" />
		<Paragraph text="Large (lg) - Larger text for emphasis" size="lg" />
		<Paragraph text="Extra Large (xl) - Extra large text" size="xl" />
		<Paragraph text="Size 2XL (2xl) - Maximum text size" size="2xl" />
	</div>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="space-y-2">
		<Paragraph text="Default variant - standard text color" variant="default" />
		<Paragraph text="Muted variant - subdued text color" variant="muted" />
		<Paragraph text="Primary variant - primary brand color" variant="primary" />
		<Paragraph text="Secondary variant - secondary brand color" variant="secondary" />
		<Paragraph text="Accent variant - accent color" variant="accent" />
		<Paragraph text="Info variant - informational color" variant="info" />
		<Paragraph text="Success variant - success/positive color" variant="success" />
		<Paragraph text="Warning variant - warning/caution color" variant="warning" />
		<Paragraph text="Error variant - error/danger color" variant="error" />
	</div>
</Story>

<!-- All Weights Showcase -->
<Story name="All Weights">
	<div class="space-y-2">
		<Paragraph text="Light weight text" weight="light" />
		<Paragraph text="Normal weight text" weight="normal" />
		<Paragraph text="Medium weight text" weight="medium" />
		<Paragraph text="Semibold weight text" weight="semibold" />
		<Paragraph text="Bold weight text" weight="bold" />
	</div>
</Story>

<!-- All Alignments Showcase -->
<Story name="All Alignments">
	<div class="w-full max-w-2xl space-y-4">
		<Paragraph text="Left aligned paragraph text." align="left" />
		<Paragraph text="Center aligned paragraph text." align="center" />
		<Paragraph text="Right aligned paragraph text." align="right" />
		<Paragraph text={sampleText} align="justify" />
	</div>
</Story>

<!-- Line Clamp Showcase -->
<Story name="Line Clamp Showcase">
	<div class="max-w-md space-y-6">
		<div>
			<span class="text-base-content/70 text-sm font-semibold">1 Line:</span>
			<Paragraph text={longText} lineClamp={1} />
		</div>
		<div>
			<span class="text-base-content/70 text-sm font-semibold">2 Lines:</span>
			<Paragraph text={longText} lineClamp={2} />
		</div>
		<div>
			<span class="text-base-content/70 text-sm font-semibold">3 Lines:</span>
			<Paragraph text={longText} lineClamp={3} />
		</div>
		<div>
			<span class="text-base-content/70 text-sm font-semibold">4 Lines:</span>
			<Paragraph text={longText} lineClamp={4} />
		</div>
	</div>
</Story>

<!-- Real-world Examples -->
<Story name="Article Preview">
	<article class="max-w-xl space-y-3">
		<h2 class="text-2xl font-bold">Article Title</h2>
		<Paragraph text="Published on December 16, 2024" size="sm" variant="muted" />
		<Paragraph text={sampleText} leading="relaxed" />
		<Paragraph text="Read more..." variant="primary" weight="medium" />
	</article>
</Story>

<Story name="Product Description">
	<div class="max-w-md space-y-3">
		<Paragraph
			text="Premium quality product with exceptional features and modern design."
			size="lg"
			weight="medium"
		/>
		<Paragraph text={sampleText} variant="muted" lineClamp={3} />
		<Paragraph text="$99.99" size="xl" weight="bold" variant="primary" />
	</div>
</Story>

<Story name="Error Message">
	<div class="bg-error/10 max-w-md rounded-lg p-4">
		<Paragraph
			text="Something went wrong. Please try again later or contact support if the problem persists."
			variant="error"
			weight="medium"
		/>
	</div>
</Story>

<Story name="Success Message">
	<div class="bg-success/10 max-w-md rounded-lg p-4">
		<Paragraph
			text="Your changes have been saved successfully!"
			variant="success"
			weight="medium"
		/>
	</div>
</Story>

<Story name="Terms and Conditions">
	<div class="max-w-xl space-y-4">
		<Paragraph text={longText} size="xs" variant="muted" align="justify" leading="relaxed" />
		<Paragraph
			text="By continuing, you agree to our terms and conditions."
			size="sm"
			weight="medium"
		/>
	</div>
</Story>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		text: sampleText,
		size: 'base',
		align: 'left',
		variant: 'default',
		weight: 'normal',
		leading: 'normal',
		truncate: false,
		loading: false,
		italic: false,
		underline: false,
		strikethrough: false
	}}
/>
