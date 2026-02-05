<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FormCard from './FormCard.svelte';
	import Input from '../../core/forms/Input.svelte';
	import Textarea from '../../core/forms/Textarea.svelte';
	import Select from '../../core/forms/Select.svelte';
	import Icon from '../../core/media/Icon.svelte';
	import type { DropdownItem } from '../../core/overlay-navigation/Dropdown.svelte';

	const { Story } = defineMeta({
		title: 'Admin/Forms/FormCard',
		component: FormCard,
		tags: ['autodocs'],
		argTypes: {
			title: { control: 'text', description: 'Card title text' },
			description: { control: 'text', description: 'Card description/subtitle text' },
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'filled', 'elevated'],
				description: 'Visual variant of the card'
			},
			padding: {
				control: { type: 'select' },
				options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Padding size for the card content'
			},
			collapsible: { control: 'boolean', description: 'Whether the card content is collapsible' },
			collapsed: { control: 'boolean', description: 'Whether the card is initially collapsed' },
			disabled: { control: 'boolean', description: 'Whether the card is disabled' },
			loading: { control: 'boolean', description: 'Whether the card is in loading state' },
			error: { control: 'boolean', description: 'Whether the card has an error state' },
			errorMessage: { control: 'text', description: 'Error message to display' },
			menuItems: {
				control: 'object',
				description: 'Dropdown menu items for header actions'
			},
			menuLabel: { control: 'text', description: 'Label for the dropdown menu trigger button' },
			primaryActionLabel: { control: 'text', description: 'Primary action button label' },
			secondaryActionLabel: { control: 'text', description: 'Secondary action button label' },
			primaryLoading: {
				control: 'boolean',
				description: 'Whether the primary button is in loading state'
			},
			primaryDisabled: {
				control: 'boolean',
				description: 'Whether the primary button is disabled'
			},
			showDivider: { control: 'boolean', description: 'Whether to show divider before footer' },
			expandLabel: { control: 'text', description: 'Label for expand button (accessibility)' },
			collapseLabel: { control: 'text', description: 'Label for collapse button (accessibility)' },
			ariaLabel: { control: 'text', description: 'Accessible label for screen readers' },
			spinnerSize: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Spinner size for loading state'
			},
			headingLevel: {
				control: { type: 'select' },
				options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
				description: 'Heading level'
			},
			headingSize: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
				description: 'Heading size'
			},
			headingWeight: {
				control: { type: 'select' },
				options: ['normal', 'medium', 'semibold', 'bold'],
				description: 'Heading weight'
			},
			descriptionSize: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
				description: 'Description text size'
			},
			descriptionVariant: {
				control: { type: 'select' },
				options: ['default', 'muted', 'primary', 'secondary', 'error'],
				description: 'Description text variant'
			},
			dropdownPosition: {
				control: { type: 'select' },
				options: ['top', 'bottom', 'left', 'right'],
				description: 'Dropdown position'
			},
			dropdownAlign: {
				control: { type: 'select' },
				options: ['start', 'end'],
				description: 'Dropdown alignment'
			},
			dropdownSize: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Dropdown size'
			},
			dropdownVariant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'ghost'],
				description: 'Dropdown variant'
			},
			collapseButtonVariant: {
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
				],
				description: 'Collapse button variant'
			},
			collapseButtonSize: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Collapse button size'
			},
			errorTextSize: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
				description: 'Error text size'
			},
			errorTextVariant: {
				control: { type: 'select' },
				options: ['default', 'muted', 'primary', 'secondary', 'error'],
				description: 'Error text variant'
			},
			secondaryButtonVariant: {
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
				],
				description: 'Secondary button variant'
			},
			primaryButtonVariant: {
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
				],
				description: 'Primary button variant'
			},
			onPrimaryAction: { action: 'primaryAction', description: 'Primary action callback' },
			onSecondaryAction: { action: 'secondaryAction', description: 'Secondary action callback' },
			onCollapseChange: { action: 'collapseChange', description: 'Collapse state change callback' },
			onMenuItemClick: { action: 'menuItemClick', description: 'Menu item click callback' }
		}
	});

	const sampleMenuItems: DropdownItem[] = [
		{ id: 'edit', label: 'Edit', icon: '✏️' },
		{ id: 'duplicate', label: 'Duplicate', icon: '📋' },
		{ id: 'delete', label: 'Delete', icon: '🗑️', divider: true }
	];
</script>

<!-- Default Story -->
<Story name="Default">
	<div class="w-full max-w-2xl">
		<FormCard
			title="User Information"
			description="Enter user details below"
			padding="md"
			baseClass="form-card"
			defaultVariantClass="bg-base-100 rounded-lg"
			headerClass="form-card-header flex items-start justify-between gap-4"
			headerTitleContainerClass="flex flex-1 flex-col gap-1"
			contentClass="form-card-content"
			headingLevel="h3"
			headingSize="lg"
			headingWeight="semibold"
			descriptionSize="sm"
			descriptionVariant="muted"
		>
			<div class="space-y-4">
				<Input label="First Name" placeholder="Enter first name" />
				<Input label="Last Name" placeholder="Enter last name" />
				<Input label="Email" type="email" placeholder="Enter email address" />
			</div>
		</FormCard>
	</div>
</Story>

<!-- Bordered Variant -->
<Story name="Bordered Variant">
	<div class="w-full max-w-2xl">
		<FormCard
			title="Account Settings"
			description="Manage your account preferences"
			variant="bordered"
			padding="lg"
			baseClass="form-card"
			borderedClass="border border-base-300 rounded-lg"
			headerClass="form-card-header flex items-start justify-between gap-4"
			headerTitleContainerClass="flex flex-1 flex-col gap-1"
			contentClass="form-card-content"
			headingLevel="h3"
			headingSize="lg"
			headingWeight="semibold"
			descriptionSize="sm"
			descriptionVariant="muted"
		>
			<div class="space-y-4">
				<Input label="Username" placeholder="Enter username" />
				<Input label="Password" type="password" placeholder="Enter password" />
			</div>
		</FormCard>
	</div>
</Story>

<!-- Filled Variant -->
<Story name="Filled Variant">
	<div class="w-full max-w-2xl">
		<FormCard
			title="Preferences"
			description="Set your preferences"
			variant="filled"
			padding="md"
			baseClass="form-card"
			filledClass="bg-base-200 rounded-lg"
			headerClass="form-card-header flex items-start justify-between gap-4"
			headerTitleContainerClass="flex flex-1 flex-col gap-1"
			contentClass="form-card-content"
			headingLevel="h3"
			headingSize="lg"
			headingWeight="semibold"
			descriptionSize="sm"
			descriptionVariant="muted"
		>
			<div class="space-y-4">
				<Select label="Language" options={['English', 'Spanish', 'French']} />
				<Select label="Timezone" options={['UTC', 'EST', 'PST']} />
			</div>
		</FormCard>
	</div>
</Story>

<!-- Elevated Variant -->
<Story name="Elevated Variant">
	<div class="w-full max-w-2xl">
		<FormCard
			title="Contact Information"
			description="How can we reach you?"
			variant="elevated"
			padding="lg"
			baseClass="form-card"
			elevatedClass="bg-base-100 rounded-lg shadow-lg"
			headerClass="form-card-header flex items-start justify-between gap-4"
			headerTitleContainerClass="flex flex-1 flex-col gap-1"
			contentClass="form-card-content"
			headingLevel="h3"
			headingSize="lg"
			headingWeight="semibold"
			descriptionSize="sm"
			descriptionVariant="muted"
		>
			<div class="space-y-4">
				<Input label="Phone" type="tel" placeholder="Enter phone number" />
				<Input label="Address" placeholder="Enter address" />
			</div>
		</FormCard>
	</div>
</Story>

<!-- With Footer Actions -->
<Story name="With Footer Actions">
	<div class="w-full max-w-2xl">
		<FormCard
			title="Create New User"
			description="Fill in the form to create a new user"
			variant="bordered"
			padding="md"
			primaryActionLabel="Create User"
			secondaryActionLabel="Cancel"
			showDivider
			baseClass="form-card"
			borderedClass="border border-base-300 rounded-lg"
			headerClass="form-card-header flex items-start justify-between gap-4"
			headerTitleContainerClass="flex flex-1 flex-col gap-1"
			contentClass="form-card-content"
			footerClass="form-card-footer flex items-center justify-end gap-2"
			headingLevel="h3"
			headingSize="lg"
			headingWeight="semibold"
			descriptionSize="sm"
			descriptionVariant="muted"
			primaryButtonVariant="primary"
			secondaryButtonVariant="ghost"
			onPrimaryAction={() => console.log('Primary action clicked')}
			onSecondaryAction={() => console.log('Secondary action clicked')}
		>
			<div class="space-y-4">
				<Input label="Full Name" placeholder="Enter full name" />
				<Input label="Email" type="email" placeholder="Enter email" />
				<Input label="Role" placeholder="Enter role" />
			</div>
		</FormCard>
	</div>
</Story>

<!-- With Menu -->
<Story name="With Menu">
	<div class="w-full max-w-2xl">
		<FormCard
			title="Edit Profile"
			description="Update your profile information"
			variant="bordered"
			padding="md"
			menuItems={sampleMenuItems}
			menuLabel="Actions"
			baseClass="form-card"
			borderedClass="border border-base-300 rounded-lg"
			headerClass="form-card-header flex items-start justify-between gap-4"
			headerTitleContainerClass="flex flex-1 flex-col gap-1"
			headerActionsContainerClass="flex items-center gap-2"
			contentClass="form-card-content"
			headingLevel="h3"
			headingSize="lg"
			headingWeight="semibold"
			descriptionSize="sm"
			descriptionVariant="muted"
			dropdownPosition="bottom"
			dropdownAlign="end"
			dropdownSize="sm"
			dropdownVariant="ghost"
			onMenuItemClick={(item) => console.log('Menu item clicked:', item)}
		>
			<div class="space-y-4">
				<Input label="Display Name" placeholder="Enter display name" />
				<Textarea label="Bio" placeholder="Write something about yourself" rows={3} />
			</div>
		</FormCard>
	</div>
</Story>

<!-- Collapsible -->
<Story name="Collapsible">
	<div class="w-full max-w-2xl">
		<FormCard
			title="Advanced Settings"
			description="Click to expand or collapse"
			variant="bordered"
			padding="md"
			collapsible
			collapsed={false}
			expandLabel="Expand section"
			collapseLabel="Collapse section"
			baseClass="form-card"
			borderedClass="border border-base-300 rounded-lg"
			headerClass="form-card-header flex items-start justify-between gap-4"
			headerTitleContainerClass="flex flex-1 flex-col gap-1"
			headerActionsContainerClass="flex items-center gap-2"
			contentClass="form-card-content"
			hiddenClass="hidden"
			headingLevel="h3"
			headingSize="lg"
			headingWeight="semibold"
			descriptionSize="sm"
			descriptionVariant="muted"
			collapseButtonVariant="ghost"
			collapseButtonSize="sm"
			onCollapseChange={(collapsed) => console.log('Collapsed:', collapsed)}
		>
			{#snippet collapseIcon({ isCollapsed })}
				<Icon size="sm" class={isCollapsed ? '' : 'rotate-180 transition-transform duration-200'} />
			{/snippet}
			<div class="space-y-4">
				<Input label="API Key" placeholder="Enter API key" />
				<Input label="Secret Key" type="password" placeholder="Enter secret key" />
				<Input label="Webhook URL" type="url" placeholder="Enter webhook URL" />
			</div>
		</FormCard>
	</div>
</Story>

<!-- Loading State -->
<Story name="Loading State">
	<div class="w-full max-w-2xl">
		<FormCard
			title="Loading Data"
			description="Please wait while data loads"
			variant="bordered"
			padding="md"
			loading
			baseClass="form-card"
			borderedClass="border border-base-300 rounded-lg"
			loadingContainerClass="flex items-center justify-center p-8"
			spinnerSize="lg"
			headingLevel="h3"
			headingSize="lg"
			headingWeight="semibold"
			descriptionSize="sm"
			descriptionVariant="muted"
		>
			<div class="space-y-4">
				<Input label="Field 1" placeholder="Enter value" />
				<Input label="Field 2" placeholder="Enter value" />
			</div>
		</FormCard>
	</div>
</Story>

<!-- Error State -->
<Story name="Error State">
	<div class="w-full max-w-2xl">
		<FormCard
			title="Form with Error"
			description="Please fix the errors below"
			variant="bordered"
			padding="md"
			error
			errorMessage="There was an error processing your request. Please try again."
			primaryActionLabel="Retry"
			secondaryActionLabel="Cancel"
			showDivider
			baseClass="form-card"
			borderedClass="border border-base-300 rounded-lg"
			errorClass="border-error"
			headerClass="form-card-header flex items-start justify-between gap-4"
			headerTitleContainerClass="flex flex-1 flex-col gap-1"
			contentClass="form-card-content"
			footerClass="form-card-footer flex items-center justify-end gap-2"
			headingLevel="h3"
			headingSize="lg"
			headingWeight="semibold"
			descriptionSize="sm"
			descriptionVariant="muted"
			errorTextSize="sm"
			errorTextVariant="error"
			primaryButtonVariant="primary"
			secondaryButtonVariant="ghost"
		>
			<div class="space-y-4">
				<Input label="Email" type="email" placeholder="Enter email" error="Invalid email" />
				<Input label="Password" type="password" placeholder="Enter password" />
			</div>
		</FormCard>
	</div>
</Story>

<!-- Disabled State -->
<Story name="Disabled State">
	<div class="w-full max-w-2xl">
		<FormCard
			title="Read-only Form"
			description="This form is disabled"
			variant="bordered"
			padding="md"
			disabled
			primaryActionLabel="Submit"
			secondaryActionLabel="Cancel"
			showDivider
			baseClass="form-card"
			borderedClass="border border-base-300 rounded-lg"
			disabledClass="opacity-50 pointer-events-none"
			headerClass="form-card-header flex items-start justify-between gap-4"
			headerTitleContainerClass="flex flex-1 flex-col gap-1"
			contentClass="form-card-content"
			footerClass="form-card-footer flex items-center justify-end gap-2"
			headingLevel="h3"
			headingSize="lg"
			headingWeight="semibold"
			descriptionSize="sm"
			descriptionVariant="muted"
			primaryButtonVariant="primary"
			secondaryButtonVariant="ghost"
		>
			<div class="space-y-4">
				<Input label="User ID" value="12345" disabled />
				<Input label="Created Date" value="2025-01-15" disabled />
			</div>
		</FormCard>
	</div>
</Story>

<!-- Playground -->
<!-- Playground -->
<Story name="Playground">
	<div class="w-full max-w-2xl">
		<FormCard
			title="Form Card Title"
			description="Form card description text"
			variant="bordered"
			padding="md"
			collapsible
			collapsed={false}
			disabled={false}
			loading={false}
			error={false}
			errorMessage="There was an error processing your request. Please try again."
			menuItems={sampleMenuItems}
			menuLabel="Actions"
			primaryActionLabel="Submit"
			secondaryActionLabel="Cancel"
			primaryLoading={false}
			primaryDisabled={false}
			showDivider
			expandLabel="Expand section"
			collapseLabel="Collapse section"
			ariaLabel="Form card example"
			spinnerSize="lg"
			loadingContainerClass="flex items-center justify-center p-8"
			headerTitleContainerClass="flex flex-1 flex-col gap-1"
			headerActionsContainerClass="flex items-center gap-2"
			headingLevel="h3"
			headingSize="lg"
			headingWeight="semibold"
			descriptionSize="sm"
			descriptionVariant="muted"
			dropdownPosition="bottom"
			dropdownAlign="end"
			dropdownSize="sm"
			dropdownVariant="ghost"
			collapseButtonVariant="ghost"
			collapseButtonSize="sm"
			errorTextSize="sm"
			errorTextVariant="error"
			secondaryButtonVariant="ghost"
			primaryButtonVariant="primary"
			baseClass="form-card"
			borderedClass="border border-base-300 rounded-lg"
			filledClass="bg-base-200 rounded-lg"
			elevatedClass="bg-base-100 rounded-lg shadow-lg"
			defaultVariantClass="bg-base-100 rounded-lg"
			disabledClass="opacity-50 pointer-events-none"
			errorClass="border-error"
			headerClass="form-card-header flex items-start justify-between gap-4"
			contentClass="form-card-content"
			footerClass="form-card-footer flex items-center justify-end gap-2"
			hiddenClass="hidden"
			onPrimaryAction={() => console.log('Primary action clicked')}
			onSecondaryAction={() => console.log('Secondary action clicked')}
			onCollapseChange={(collapsed) => console.log('Collapsed:', collapsed)}
			onMenuItemClick={(item) => console.log('Menu item clicked:', item)}
		>
			{#snippet collapseIcon({ isCollapsed })}
				<Icon size="sm" class={isCollapsed ? '' : 'rotate-180 transition-transform duration-200'} />
			{/snippet}
			<div class="space-y-4">
				<Input label="Sample Input" placeholder="Enter value" />
				<Input label="Email" type="email" placeholder="email@example.com" />
				<Textarea label="Description" placeholder="Enter description" rows={3} />
			</div>
		</FormCard>
	</div>
</Story>
