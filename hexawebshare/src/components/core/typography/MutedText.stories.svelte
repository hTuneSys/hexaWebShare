<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MutedText from './MutedText.svelte';

	const { Story } = defineMeta({
		title: 'Core/Typography/MutedText',
		component: MutedText,
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: 'text',
				description: 'Text content of the muted text'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
				description: 'Size variant of the muted text'
			},
			align: {
				control: { type: 'select' },
				options: ['left', 'center', 'right', 'justify'],
				description: 'Text alignment'
			},
			variant: {
				control: { type: 'select' },
				options: ['muted', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
				description: 'Color variant of the muted text'
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
			disabled: {
				control: 'boolean',
				description: 'Disabled state with reduced opacity'
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
				description: 'Hide muted text from screen readers'
			}
		},
		args: {
			text: 'This is muted text with reduced opacity, typically used for secondary or less important content.',
			size: 'base',
			align: 'left',
			variant: 'muted',
			weight: 'normal',
			leading: 'normal'
		}
	});

	const sampleText =
		'This is a sample muted text paragraph. Muted text is typically used for secondary information, captions, or less prominent content that should be visually de-emphasized.';

	const longText =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.';
</script>

<!-- Default Story -->
<Story name="Default" args={{ text: sampleText }} />

<!-- Variant/Color Stories -->
<Story
	name="Muted (Default)"
	args={{
		text: 'This is muted text with the default muted variant (reduced opacity).',
		variant: 'muted'
	}}
/>
<Story name="Primary" args={{ text: 'Primary colored muted text.', variant: 'primary' }} />
<Story name="Secondary" args={{ text: 'Secondary colored muted text.', variant: 'secondary' }} />
<Story name="Accent" args={{ text: 'Accent colored muted text.', variant: 'accent' }} />
<Story name="Info" args={{ text: 'Info colored muted text.', variant: 'info' }} />
<Story name="Success" args={{ text: 'Success colored muted text.', variant: 'success' }} />
<Story name="Warning" args={{ text: 'Warning colored muted text.', variant: 'warning' }} />
<Story name="Error" args={{ text: 'Error colored muted text.', variant: 'error' }} />

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

<!-- Weight Stories -->
<Story name="Light Weight" args={{ text: 'Light weight muted text.', weight: 'light' }} />
<Story name="Normal Weight" args={{ text: 'Normal weight muted text.', weight: 'normal' }} />
<Story name="Medium Weight" args={{ text: 'Medium weight muted text.', weight: 'medium' }} />
<Story
	name="Semibold Weight"
	args={{ text: 'Semibold weight muted text.', weight: 'semibold' }}
/>
<Story name="Bold Weight" args={{ text: 'Bold weight muted text.', weight: 'bold' }} />

<!-- Leading Stories -->
<Story name="Leading None" args={{ text: sampleText, leading: 'none' }} />
<Story name="Leading Tight" args={{ text: sampleText, leading: 'tight' }} />
<Story name="Leading Snug" args={{ text: sampleText, leading: 'snug' }} />
<Story name="Leading Normal" args={{ text: sampleText, leading: 'normal' }} />
<Story name="Leading Relaxed" args={{ text: sampleText, leading: 'relaxed' }} />
<Story name="Leading Loose" args={{ text: sampleText, leading: 'loose' }} />

<!-- Text Style Stories -->
<Story name="Italic" args={{ text: 'This muted text is styled with italic.', italic: true }} />
<Story name="Underline" args={{ text: 'This muted text has underline.', underline: true }} />
<Story
	name="Strikethrough"
	args={{ text: 'This muted text has strikethrough.', strikethrough: true }}
/>
<Story
	name="Combined Styles"
	args={{
		text: 'This muted text combines italic, underline, and bold styles.',
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
<Story
	name="Disabled"
	args={{
		text: 'This is muted text in disabled state.',
		disabled: true
	}}
/>

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{
		text: 'Important muted announcement text.',
		ariaLabel: 'Important announcement: This is crucial information for all users.'
	}}
/>
<Story
	name="Decorative (Aria Hidden)"
	args={{ text: 'Decorative muted text that is hidden from screen readers.', ariaHidden: true }}
/>

<!-- All Sizes Showcase -->
<Story name="All Sizes">
	<div class="space-y-4">
		<MutedText text="Extra Small (xs) - Compact muted text for fine print" size="xs" />
		<MutedText text="Small (sm) - Smaller muted text for captions" size="sm" />
		<MutedText text="Base (base) - Default muted text size" size="base" />
		<MutedText text="Large (lg) - Larger muted text for emphasis" size="lg" />
		<MutedText text="Extra Large (xl) - Extra large muted text" size="xl" />
		<MutedText text="Size 2XL (2xl) - Maximum muted text size" size="2xl" />
	</div>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="space-y-2">
		<MutedText text="Muted variant - subdued text color (default)" variant="muted" />
		<MutedText text="Primary variant - primary brand color" variant="primary" />
		<MutedText text="Secondary variant - secondary brand color" variant="secondary" />
		<MutedText text="Accent variant - accent color" variant="accent" />
		<MutedText text="Info variant - informational color" variant="info" />
		<MutedText text="Success variant - success/positive color" variant="success" />
		<MutedText text="Warning variant - warning/caution color" variant="warning" />
		<MutedText text="Error variant - error/danger color" variant="error" />
	</div>
</Story>

<!-- All Weights Showcase -->
<Story name="All Weights">
	<div class="space-y-2">
		<MutedText text="Light weight muted text" weight="light" />
		<MutedText text="Normal weight muted text" weight="normal" />
		<MutedText text="Medium weight muted text" weight="medium" />
		<MutedText text="Semibold weight muted text" weight="semibold" />
		<MutedText text="Bold weight muted text" weight="bold" />
	</div>
</Story>

<!-- All Alignments Showcase -->
<Story name="All Alignments">
	<div class="w-full max-w-2xl space-y-4">
		<MutedText text="Left aligned muted text." align="left" />
		<MutedText text="Center aligned muted text." align="center" />
		<MutedText text="Right aligned muted text." align="right" />
		<MutedText text={sampleText} align="justify" />
	</div>
</Story>

<!-- Line Clamp Showcase -->
<Story name="Line Clamp Showcase">
	<div class="max-w-md space-y-6">
		<div>
			<span class="text-base-content/70 text-sm font-semibold">1 Line:</span>
			<MutedText text={longText} lineClamp={1} />
		</div>
		<div>
			<span class="text-base-content/70 text-sm font-semibold">2 Lines:</span>
			<MutedText text={longText} lineClamp={2} />
		</div>
		<div>
			<span class="text-base-content/70 text-sm font-semibold">3 Lines:</span>
			<MutedText text={longText} lineClamp={3} />
		</div>
		<div>
			<span class="text-base-content/70 text-sm font-semibold">4 Lines:</span>
			<MutedText text={longText} lineClamp={4} />
		</div>
	</div>
</Story>

<!-- Real-world Examples -->
<Story name="Article Preview">
	<article class="max-w-xl space-y-3">
		<h2 class="text-2xl font-bold">Article Title</h2>
		<MutedText text="Published on December 16, 2024" size="sm" variant="muted" />
		<p class="text-base-content leading-relaxed">{sampleText}</p>
		<MutedText text="Read more..." variant="primary" weight="medium" />
	</article>
</Story>

<Story name="Product Description">
	<div class="max-w-md space-y-3">
		<p class="text-lg font-medium text-base-content">
			Premium quality product with exceptional features and modern design.
		</p>
		<MutedText text={sampleText} variant="muted" lineClamp={3} />
		<p class="text-xl font-bold text-primary">$99.99</p>
	</div>
</Story>

<Story name="Error Message">
	<div class="bg-error/10 max-w-md rounded-lg p-4">
		<p class="text-error font-medium mb-2">Something went wrong</p>
		<MutedText
			text="Please try again later or contact support if the problem persists."
			variant="error"
			weight="medium"
		/>
	</div>
</Story>

<Story name="Success Message">
	<div class="bg-success/10 max-w-md rounded-lg p-4">
		<p class="text-success font-medium mb-2">Success!</p>
		<MutedText
			text="Your changes have been saved successfully!"
			variant="success"
			weight="medium"
		/>
	</div>
</Story>

<Story name="Terms and Conditions">
	<div class="max-w-xl space-y-4">
		<MutedText
			text={longText}
			size="xs"
			variant="muted"
			align="justify"
			leading="relaxed"
		/>
		<MutedText
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
		variant: 'muted',
		weight: 'normal',
		leading: 'normal',
		truncate: false,
		loading: false,
		disabled: false,
		italic: false,
		underline: false,
		strikethrough: false
	}}
/>

