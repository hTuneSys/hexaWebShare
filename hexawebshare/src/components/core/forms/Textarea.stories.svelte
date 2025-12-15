<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Textarea from './Textarea.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/Textarea',
		component: Textarea,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			disabled: { control: 'boolean' },
			required: { control: 'boolean' },
			readonly: { control: 'boolean' },
			loading: { control: 'boolean' },
			resize: { control: 'boolean' },
			label: { control: 'text' },
			placeholder: { control: 'text' },
			error: { control: 'text' },
			helpText: { control: 'text' },
			value: { control: 'text' },
			rows: { control: { type: 'number', min: 1, max: 20 } },
			cols: { control: { type: 'number', min: 1, max: 100 } },
			maxlength: { control: { type: 'number', min: 1 } },
			minlength: { control: { type: 'number', min: 1 } }
		},
		args: {
			onchange: fn(),
			oninput: fn(),
			onblur: fn(),
			onfocus: fn()
		}
	});
</script>

<!-- Default Stories -->
<Story name="Default" args={{ placeholder: 'Enter your message...' }} />

<Story name="With Label" args={{ label: 'Message', placeholder: 'Enter your message here...' }} />

<Story
	name="With Value"
	args={{
		label: 'Description',
		value: 'This is a pre-filled textarea value.',
		placeholder: 'Enter description'
	}}
/>

<Story
	name="With Help Text"
	args={{
		label: 'Comments',
		placeholder: 'Enter your comments',
		helpText: 'Maximum 500 characters allowed'
	}}
/>

<Story
	name="With Error"
	args={{
		label: 'Message',
		placeholder: 'Enter your message',
		error: 'Message is required and must be at least 10 characters'
	}}
/>

<Story
	name="Required"
	args={{ label: 'Required Field', required: true, placeholder: 'Required textarea' }}
/>

<Story
	name="Disabled"
	args={{
		label: 'Disabled Field',
		disabled: true,
		value: 'This textarea is disabled and cannot be edited.'
	}}
/>

<Story
	name="Readonly"
	args={{
		label: 'Readonly Field',
		readonly: true,
		value: 'This is a read-only textarea. The content cannot be modified.'
	}}
/>

<Story
	name="Loading"
	args={{ label: 'Loading Textarea', placeholder: 'Loading...', loading: true }}
/>

<!-- Variant Stories -->
<Story
	name="Primary Variant"
	args={{ variant: 'primary', label: 'Primary Textarea', placeholder: 'Primary variant' }}
/>

<Story
	name="Secondary Variant"
	args={{ variant: 'secondary', label: 'Secondary Textarea', placeholder: 'Secondary variant' }}
/>

<Story
	name="Accent Variant"
	args={{ variant: 'accent', label: 'Accent Textarea', placeholder: 'Accent variant' }}
/>

<Story
	name="Info Variant"
	args={{ variant: 'info', label: 'Info Textarea', placeholder: 'Info variant' }}
/>

<Story
	name="Success Variant"
	args={{ variant: 'success', label: 'Success Textarea', placeholder: 'Success variant' }}
/>

<Story
	name="Warning Variant"
	args={{ variant: 'warning', label: 'Warning Textarea', placeholder: 'Warning variant' }}
/>

<Story
	name="Error Variant"
	args={{ variant: 'error', label: 'Error Textarea', placeholder: 'Error variant' }}
/>

<!-- Size Stories -->
<Story
	name="Extra Small"
	args={{ size: 'xs', label: 'XS Textarea', placeholder: 'Extra small textarea' }}
/>

<Story name="Small" args={{ size: 'sm', label: 'Small Textarea', placeholder: 'Small textarea' }} />

<Story
	name="Medium"
	args={{ size: 'md', label: 'Medium Textarea', placeholder: 'Medium (Default)' }}
/>

<Story name="Large" args={{ size: 'lg', label: 'Large Textarea', placeholder: 'Large textarea' }} />

<!-- Rows and Cols Stories -->
<Story
	name="Custom Rows"
	args={{ label: 'Custom Rows', rows: 8, placeholder: 'Textarea with 8 rows' }}
/>

<Story
	name="Small Rows"
	args={{ label: 'Small Rows', rows: 2, placeholder: 'Textarea with 2 rows' }}
/>

<Story
	name="Large Rows"
	args={{ label: 'Large Rows', rows: 10, placeholder: 'Textarea with 10 rows' }}
/>

<!-- Resize Stories -->
<Story
	name="Resizable"
	args={{ label: 'Resizable Textarea', resize: true, placeholder: 'You can resize this textarea' }}
/>

<Story
	name="Non-Resizable"
	args={{
		label: 'Non-Resizable Textarea',
		resize: false,
		placeholder: 'This textarea cannot be resized'
	}}
/>

<!-- Length Constraints Stories -->
<Story
	name="With Max Length"
	args={{
		label: 'Max Length',
		maxlength: 100,
		placeholder: 'Maximum 100 characters',
		helpText: '100 characters maximum'
	}}
/>

<Story
	name="With Min Length"
	args={{
		label: 'Min Length',
		minlength: 10,
		placeholder: 'Minimum 10 characters',
		helpText: 'At least 10 characters required'
	}}
/>

<Story
	name="With Length Constraints"
	args={{
		label: 'Length Constraints',
		minlength: 10,
		maxlength: 200,
		placeholder: 'Between 10 and 200 characters',
		helpText: 'Must be between 10 and 200 characters'
	}}
/>

<!-- State Combinations -->
<Story
	name="Disabled with Error"
	args={{
		label: 'Disabled Error',
		disabled: true,
		error: 'This field is disabled',
		value: 'Disabled value'
	}}
/>

<Story
	name="Loading with Variant"
	args={{
		label: 'Loading Primary',
		variant: 'primary',
		placeholder: 'Loading...',
		loading: true
	}}
/>

<Story
	name="Required with Help Text"
	args={{
		label: 'Required Field',
		required: true,
		placeholder: 'Required',
		helpText: 'This field is required'
	}}
/>

<Story
	name="Readonly with Value"
	args={{
		label: 'Readonly Field',
		readonly: true,
		value: 'This is a read-only textarea with pre-filled content that cannot be modified.'
	}}
/>

<!-- Accessibility Stories -->
<Story
	name="ARIA Label Only"
	args={{ ariaLabel: 'Textarea without visible label', placeholder: 'Accessible textarea' }}
/>

<Story
	name="ARIA Describedby"
	args={{
		label: 'Textarea with Description',
		placeholder: 'Enter value',
		ariaDescribedby: 'textarea-help',
		helpText: 'This is helpful information'
	}}
/>

<!-- Real-world Examples -->
<Story name="Contact Form Example">
	<div class="w-full max-w-xs space-y-4">
		<Textarea label="Message" placeholder="Enter your message" required={true} rows={6} />
		<Textarea
			label="Additional Notes"
			placeholder="Optional notes"
			helpText="Optional: Any additional information"
			rows={4}
		/>
	</div>
</Story>

<Story name="Feedback Form Example">
	<div class="w-full max-w-md space-y-4">
		<Textarea
			label="Feedback"
			placeholder="Share your feedback..."
			required={true}
			rows={8}
			helpText="Please provide detailed feedback"
		/>
		<Textarea
			label="Suggestions"
			placeholder="Any suggestions for improvement?"
			rows={4}
			resize={false}
		/>
	</div>
</Story>

<Story name="Comment Form Example">
	<div class="w-full max-w-xs space-y-4">
		<Textarea
			label="Comment"
			placeholder="Write a comment..."
			required={true}
			minlength={10}
			maxlength={500}
			rows={5}
			helpText="10-500 characters"
		/>
	</div>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="w-full max-w-2xl space-y-4">
		<div>
			<h3 class="mb-2 text-lg font-bold">Color Variants</h3>
			<div class="space-y-2">
				<Textarea variant="primary" label="Primary" placeholder="Primary variant" />
				<Textarea variant="secondary" label="Secondary" placeholder="Secondary variant" />
				<Textarea variant="accent" label="Accent" placeholder="Accent variant" />
				<Textarea variant="info" label="Info" placeholder="Info variant" />
				<Textarea variant="success" label="Success" placeholder="Success variant" />
				<Textarea variant="warning" label="Warning" placeholder="Warning variant" />
				<Textarea variant="error" label="Error" placeholder="Error variant" />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">Sizes</h3>
			<div class="space-y-2">
				<Textarea size="xs" label="Extra Small" placeholder="XS size" />
				<Textarea size="sm" label="Small" placeholder="SM size" />
				<Textarea size="md" label="Medium" placeholder="MD size (Default)" />
				<Textarea size="lg" label="Large" placeholder="LG size" />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">States</h3>
			<div class="space-y-2">
				<Textarea label="Default" placeholder="Default state" />
				<Textarea label="Disabled" disabled={true} value="Disabled value" />
				<Textarea label="Readonly" readonly={true} value="Read-only value" />
				<Textarea label="Loading" placeholder="Loading..." loading={true} />
				<Textarea label="Error" error="This field has an error" />
				<Textarea label="Required" required={true} placeholder="Required field" />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">Resize Options</h3>
			<div class="space-y-2">
				<Textarea label="Resizable" resize={true} placeholder="Can be resized" />
				<Textarea label="Non-Resizable" resize={false} placeholder="Cannot be resized" />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">Row Sizes</h3>
			<div class="space-y-2">
				<Textarea label="2 Rows" rows={2} placeholder="Small textarea" />
				<Textarea label="4 Rows (Default)" rows={4} placeholder="Default textarea" />
				<Textarea label="8 Rows" rows={8} placeholder="Large textarea" />
			</div>
		</div>
	</div>
</Story>

<!-- Interactive Playground -->
<Story name="Playground" args={{ label: 'Playground', placeholder: 'Try different props' }} />
