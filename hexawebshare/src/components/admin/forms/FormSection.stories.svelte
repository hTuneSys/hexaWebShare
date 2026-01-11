<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FormSection from './FormSection.svelte';
	import Input from '../../core/forms/Input.svelte';
	import Textarea from '../../core/forms/Textarea.svelte';
	import Select from '../../core/forms/Select.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import FormWrapper from '../../core/forms/FormWrapper.svelte';

	const { Story } = defineMeta({
		title: 'Admin/Forms/FormSection',
		component: FormSection,
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: 'text',
				description: 'Section title/heading'
			},
			description: {
				control: 'text',
				description: 'Section description text'
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'filled', 'ghost'],
				description: 'Visual variant of the section'
			},
			padding: {
				control: { type: 'select' },
				options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Padding size for the section'
			},
			collapsible: {
				control: 'boolean',
				description: 'Whether the section is collapsible'
			},
			collapsed: {
				control: 'boolean',
				description: 'Whether the section is initially collapsed'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the section is disabled'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the section is in loading state'
			},
			divider: {
				control: 'boolean',
				description: 'Whether to show a divider after the section'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			}
		},
		args: {
			variant: 'default',
			padding: 'md',
			collapsible: false,
			collapsed: false,
			disabled: false,
			loading: false,
			divider: false
		}
	});
</script>

<!-- Default Story -->
<Story name="Default">
	<div class="w-full max-w-2xl">
		<FormSection title="Personal Information" description="Enter your personal details">
			<div class="space-y-4">
				<Input label="First Name" placeholder="Enter first name" />
				<Input label="Last Name" placeholder="Enter last name" />
				<Input label="Email" type="email" placeholder="Enter email address" />
			</div>
		</FormSection>
	</div>
</Story>

<!-- With Title Only -->
<Story name="With Title Only">
	<div class="w-full max-w-2xl">
		<FormSection title="Contact Information">
			<div class="space-y-4">
				<Input label="Phone Number" type="tel" placeholder="Enter phone number" />
				<Input label="Address" placeholder="Enter address" />
			</div>
		</FormSection>
	</div>
</Story>

<!-- With Description -->
<Story name="With Description">
	<div class="w-full max-w-2xl">
		<FormSection
			title="Account Settings"
			description="Manage your account preferences and security settings"
		>
			<div class="space-y-4">
				<Input label="Username" placeholder="Enter username" />
				<Input label="Password" type="password" placeholder="Enter password" />
			</div>
		</FormSection>
	</div>
</Story>

<!-- Bordered Variant -->
<Story name="Bordered Variant">
	<div class="w-full max-w-2xl">
		<FormSection title="Billing Information" variant="bordered">
			<div class="space-y-4">
				<Input label="Card Number" placeholder="1234 5678 9012 3456" />
				<Input label="Expiry Date" placeholder="MM/YY" />
				<Input label="CVV" placeholder="123" />
			</div>
		</FormSection>
	</div>
</Story>

<!-- Filled Variant -->
<Story name="Filled Variant">
	<div class="w-full max-w-2xl">
		<FormSection title="Preferences" variant="filled" description="Set your preferences">
			<div class="space-y-4">
				<Select label="Language" options={['English', 'Spanish', 'French']} />
				<Select label="Timezone" options={['UTC', 'EST', 'PST']} />
			</div>
		</FormSection>
	</div>
</Story>

<!-- Ghost Variant -->
<Story name="Ghost Variant">
	<div class="w-full max-w-2xl">
		<FormSection title="Additional Notes" variant="ghost">
			<Textarea label="Notes" placeholder="Enter any additional notes" rows={4} />
		</FormSection>
	</div>
</Story>

<!-- Collapsible -->
<Story name="Collapsible">
	<div class="w-full max-w-2xl">
		<FormSection title="Advanced Settings" description="Click to expand" collapsible>
			<div class="space-y-4">
				<Input label="API Key" placeholder="Enter API key" />
				<Input label="Secret Key" type="password" placeholder="Enter secret key" />
			</div>
		</FormSection>
	</div>
</Story>

<!-- Collapsible Collapsed -->
<Story name="Collapsible Collapsed">
	<div class="w-full max-w-2xl">
		<FormSection
			title="Optional Information"
			description="Additional fields (click to expand)"
			collapsible
			collapsed
		>
			<div class="space-y-4">
				<Input label="Company" placeholder="Enter company name" />
				<Input label="Website" type="url" placeholder="Enter website URL" />
			</div>
		</FormSection>
	</div>
</Story>

<!-- With Divider -->
<Story name="With Divider">
	<div class="w-full max-w-2xl space-y-6">
		<FormSection title="Section One" divider>
			<div class="space-y-4">
				<Input label="Field 1" placeholder="Enter value" />
			</div>
		</FormSection>
		<FormSection title="Section Two">
			<div class="space-y-4">
				<Input label="Field 2" placeholder="Enter value" />
			</div>
		</FormSection>
	</div>
</Story>

<!-- Disabled State -->
<Story name="Disabled State">
	<div class="w-full max-w-2xl">
		<FormSection title="Read-only Information" description="This section is disabled" disabled>
			<div class="space-y-4">
				<Input label="User ID" value="12345" disabled />
				<Input label="Created Date" value="2025-01-15" disabled />
			</div>
		</FormSection>
	</div>
</Story>

<!-- Loading State -->
<Story name="Loading State">
	<div class="w-full max-w-2xl">
		<FormSection title="Loading Data" description="Please wait while data loads" loading>
			<div class="space-y-4">
				<Input label="Field 1" placeholder="Enter value" />
				<Input label="Field 2" placeholder="Enter value" />
			</div>
		</FormSection>
	</div>
</Story>

<!-- Different Padding Sizes -->
<Story name="Small Padding">
	<div class="w-full max-w-2xl">
		<FormSection title="Compact Section" padding="sm">
			<div class="space-y-2">
				<Input label="Field 1" size="sm" placeholder="Enter value" />
				<Input label="Field 2" size="sm" placeholder="Enter value" />
			</div>
		</FormSection>
	</div>
</Story>

<!-- Large Padding -->
<Story name="Large Padding">
	<div class="w-full max-w-2xl">
		<FormSection title="Spacious Section" padding="lg">
			<div class="space-y-4">
				<Input label="Field 1" placeholder="Enter value" />
				<Input label="Field 2" placeholder="Enter value" />
			</div>
		</FormSection>
	</div>
</Story>

<!-- Complex Form Example -->
<Story name="Complex Form Example">
	<div class="w-full max-w-2xl space-y-6">
		<FormSection title="Personal Details" variant="bordered" divider>
			<div class="space-y-4">
				<Input label="First Name" placeholder="John" required />
				<Input label="Last Name" placeholder="Doe" required />
				<Input label="Email" type="email" placeholder="john.doe@example.com" required />
			</div>
		</FormSection>
		<FormSection title="Address Information" variant="bordered" divider>
			<div class="space-y-4">
				<Input label="Street Address" placeholder="123 Main St" />
				<Input label="City" placeholder="New York" />
				<Input label="Postal Code" placeholder="10001" />
			</div>
		</FormSection>
		<FormSection title="Additional Information" variant="bordered" collapsible collapsed>
			<Textarea label="Notes" placeholder="Enter any additional information" rows={4} />
		</FormSection>
	</div>
</Story>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		title: 'Form Section Title',
		description: 'Section description text',
		variant: 'default',
		padding: 'md',
		collapsible: false,
		collapsed: false,
		disabled: false,
		loading: false,
		divider: false,
		ariaLabel: 'Form section example'
	}}
>
	<div class="w-full max-w-2xl">
		<FormSection
			title="Form Section Title"
			description="Section description text"
			variant="default"
			padding="md"
			collapsible={false}
			collapsed={false}
			disabled={false}
			loading={false}
			divider={false}
			ariaLabel="Form section example"
		>
			<div class="space-y-4">
				<Input label="Sample Input" placeholder="Enter value" />
				<Input label="Email" type="email" placeholder="email@example.com" />
				<Textarea label="Description" placeholder="Enter description" rows={3} />
			</div>
		</FormSection>
	</div>
</Story>
