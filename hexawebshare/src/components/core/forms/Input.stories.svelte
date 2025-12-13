<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/Input',
		component: Input,
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: { type: 'select' },
				options: [
					'text',
					'email',
					'password',
					'tel',
					'url',
					'search',
					'number',
					'date',
					'time',
					'datetime-local',
					'month',
					'week'
				]
			},
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
			label: { control: 'text' },
			placeholder: { control: 'text' },
			error: { control: 'text' },
			helpText: { control: 'text' },
			value: { control: 'text' }
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
<Story name="Default" args={{ placeholder: 'Enter text' }} />

<Story name="With Label" args={{ label: 'Email Address', placeholder: 'example@email.com' }} />

<Story
	name="With Value"
	args={{ label: 'Username', value: 'john_doe', placeholder: 'Enter username' }}
/>

<Story
	name="With Help Text"
	args={{
		label: 'Password',
		placeholder: 'Enter password',
		helpText: 'Must be at least 8 characters long'
	}}
/>

<Story
	name="With Error"
	args={{
		label: 'Email Address',
		placeholder: 'example@email.com',
		error: 'Please enter a valid email address'
	}}
/>

<Story
	name="Required"
	args={{ label: 'Required Field', required: true, placeholder: 'Required' }}
/>

<Story name="Disabled" args={{ label: 'Disabled Field', disabled: true, value: 'Cannot edit' }} />

<Story
	name="Readonly"
	args={{ label: 'Readonly Field', readonly: true, value: 'Read-only value' }}
/>

<Story name="Loading" args={{ label: 'Loading Input', placeholder: 'Loading...', loading: true }} />

<!-- Type Stories -->
<Story name="Text Type" args={{ type: 'text', label: 'Text Input', placeholder: 'Enter text' }} />

<Story
	name="Email Type"
	args={{ type: 'email', label: 'Email', placeholder: 'example@email.com' }}
/>

<Story
	name="Password Type"
	args={{ type: 'password', label: 'Password', placeholder: 'Enter password' }}
/>

<Story name="Tel Type" args={{ type: 'tel', label: 'Phone', placeholder: '+1 (555) 123-4567' }} />

<Story
	name="URL Type"
	args={{ type: 'url', label: 'Website', placeholder: 'https://example.com' }}
/>

<Story name="Search Type" args={{ type: 'search', label: 'Search', placeholder: 'Search...' }} />

<Story name="Number Type" args={{ type: 'number', label: 'Age', placeholder: 'Enter age' }} />

<Story name="Date Type" args={{ type: 'date', label: 'Birth Date' }} />

<Story name="Time Type" args={{ type: 'time', label: 'Time' }} />

<!-- Variant Stories -->
<Story
	name="Primary Variant"
	args={{ variant: 'primary', label: 'Primary Input', placeholder: 'Primary variant' }}
/>

<Story
	name="Secondary Variant"
	args={{ variant: 'secondary', label: 'Secondary Input', placeholder: 'Secondary variant' }}
/>

<Story
	name="Accent Variant"
	args={{ variant: 'accent', label: 'Accent Input', placeholder: 'Accent variant' }}
/>

<Story
	name="Info Variant"
	args={{ variant: 'info', label: 'Info Input', placeholder: 'Info variant' }}
/>

<Story
	name="Success Variant"
	args={{ variant: 'success', label: 'Success Input', placeholder: 'Success variant' }}
/>

<Story
	name="Warning Variant"
	args={{ variant: 'warning', label: 'Warning Input', placeholder: 'Warning variant' }}
/>

<Story
	name="Error Variant"
	args={{ variant: 'error', label: 'Error Input', placeholder: 'Error variant' }}
/>

<!-- Size Stories -->
<Story name="Extra Small" args={{ size: 'xs', label: 'XS Input', placeholder: 'Extra small' }} />

<Story name="Small" args={{ size: 'sm', label: 'Small Input', placeholder: 'Small' }} />

<Story
	name="Medium"
	args={{ size: 'md', label: 'Medium Input', placeholder: 'Medium (Default)' }}
/>

<Story name="Large" args={{ size: 'lg', label: 'Large Input', placeholder: 'Large' }} />

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
	args={{ label: 'Readonly Field', readonly: true, value: 'Read-only content' }}
/>

<!-- Accessibility Stories -->
<Story
	name="ARIA Label Only"
	args={{ ariaLabel: 'Input without visible label', placeholder: 'Accessible input' }}
/>

<Story
	name="ARIA Describedby"
	args={{
		label: 'Input with Description',
		placeholder: 'Enter value',
		ariaDescribedby: 'input-help',
		helpText: 'This is helpful information'
	}}
/>

<!-- Real-world Examples -->
<Story name="Login Form Example">
	<div class="w-full max-w-xs space-y-4">
		<Input type="email" label="Email" placeholder="Enter your email" required={true} />
		<Input type="password" label="Password" placeholder="Enter your password" required={true} />
	</div>
</Story>

<Story name="Search Form Example">
	<div class="w-full max-w-md">
		<Input type="search" label="Search" placeholder="Search products..." loading={true} />
	</div>
</Story>

<Story name="Contact Form Example">
	<div class="w-full max-w-xs space-y-4">
		<Input type="text" label="Full Name" placeholder="John Doe" required={true} />
		<Input type="email" label="Email" placeholder="john@example.com" required={true} />
		<Input type="tel" label="Phone" placeholder="+1 (555) 123-4567" />
		<Input
			type="url"
			label="Website"
			placeholder="https://example.com"
			helpText="Optional: Your personal website"
		/>
	</div>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="w-full max-w-2xl space-y-4">
		<div>
			<h3 class="mb-2 text-lg font-bold">Color Variants</h3>
			<div class="space-y-2">
				<Input variant="primary" label="Primary" placeholder="Primary variant" />
				<Input variant="secondary" label="Secondary" placeholder="Secondary variant" />
				<Input variant="accent" label="Accent" placeholder="Accent variant" />
				<Input variant="info" label="Info" placeholder="Info variant" />
				<Input variant="success" label="Success" placeholder="Success variant" />
				<Input variant="warning" label="Warning" placeholder="Warning variant" />
				<Input variant="error" label="Error" placeholder="Error variant" />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">Sizes</h3>
			<div class="space-y-2">
				<Input size="xs" label="Extra Small" placeholder="XS size" />
				<Input size="sm" label="Small" placeholder="SM size" />
				<Input size="md" label="Medium" placeholder="MD size (Default)" />
				<Input size="lg" label="Large" placeholder="LG size" />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">States</h3>
			<div class="space-y-2">
				<Input label="Default" placeholder="Default state" />
				<Input label="Disabled" disabled={true} value="Disabled value" />
				<Input label="Readonly" readonly={true} value="Read-only value" />
				<Input label="Loading" placeholder="Loading..." loading={true} />
				<Input label="Error" error="This field has an error" />
				<Input label="Required" required={true} placeholder="Required field" />
			</div>
		</div>
		<div>
			<h3 class="mb-2 text-lg font-bold">Input Types</h3>
			<div class="space-y-2">
				<Input type="text" label="Text" placeholder="Text input" />
				<Input type="email" label="Email" placeholder="Email input" />
				<Input type="password" label="Password" placeholder="Password input" />
				<Input type="tel" label="Phone" placeholder="Phone input" />
				<Input type="url" label="URL" placeholder="URL input" />
				<Input type="search" label="Search" placeholder="Search input" />
				<Input type="number" label="Number" placeholder="Number input" />
			</div>
		</div>
	</div>
</Story>

<!-- Interactive Playground -->
<Story name="Playground" args={{ label: 'Playground', placeholder: 'Try different props' }} />
