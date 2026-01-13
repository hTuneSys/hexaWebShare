<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Input from '../../core/forms/Input.svelte';
	import Select, { type SelectOption } from '../../core/forms/Select.svelte';
	import FormWrapper from '../../core/forms/FormWrapper.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';
	import Alert from '../../core/feedback/Alert.svelte';
	import Card from '../../core/layout/Card.svelte';
	import CardSection from '../../core/layout/CardSection.svelte';
	import Heading from '../../core/typography/Heading.svelte';
	import Badge from '../../core/media/Badge.svelte';

	/**
	 * Role option type
	 */
	export type RoleOption = {
		value: string;
		label: string;
		disabled?: boolean;
	};

	/**
	 * Permission option type
	 */
	export type PermissionOption = {
		value: string;
		label: string;
		disabled?: boolean;
	};

	/**
	 * Form data type
	 */
	export type InviteUserFormData = {
		email: string;
		role: string;
		permissions: string[];
	};

	/**
	 * Props interface for the InviteUserForm component
	 */
	interface Props {
		/**
		 * Available role options
		 * @default []
		 */
		roles?: RoleOption[] | string[];
		/**
		 * Available permission options
		 * @default []
		 */
		permissions?: PermissionOption[] | string[];
		/**
		 * Initial email value
		 */
		email?: string;
		/**
		 * Initial role value
		 */
		role?: string;
		/**
		 * Initial permissions values
		 */
		initialPermissions?: string[];
		/**
		 * Whether the form is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the form is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Form title
		 * @default 'Invite User'
		 */
		title?: string;
		/**
		 * Submit button label
		 * @default 'Send Invitation'
		 */
		submitLabel?: string;
		/**
		 * Cancel button label
		 * @default 'Cancel'
		 */
		cancelLabel?: string;
		/**
		 * Email field label
		 * @default 'Email Address'
		 */
		emailLabel?: string;
		/**
		 * Email field placeholder
		 * @default 'user@example.com'
		 */
		emailPlaceholder?: string;
		/**
		 * Role field label
		 * @default 'Role'
		 */
		roleLabel?: string;
		/**
		 * Role field placeholder
		 * @default 'Select a role'
		 */
		rolePlaceholder?: string;
		/**
		 * Permissions field label
		 * @default 'Permissions'
		 */
		permissionsLabel?: string;
		/**
		 * Permissions field placeholder
		 * @default 'Select permissions'
		 */
		permissionsPlaceholder?: string;
		/**
		 * Email field error message
		 */
		emailError?: string;
		/**
		 * Role field error message
		 */
		roleError?: string;
		/**
		 * Permissions field error message
		 */
		permissionsError?: string;
		/**
		 * General form error message
		 */
		formError?: string;
		/**
		 * Whether to show cancel button
		 * @default true
		 */
		showCancel?: boolean;
		/**
		 * Size variant for form fields
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Color variant for form fields
		 * @default undefined (default DaisyUI style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Variant for submit button
		 * @default 'primary'
		 */
		submitVariant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost'
			| 'link';
		/**
		 * Variant for cancel button
		 * @default 'ghost'
		 */
		cancelVariant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost'
			| 'link';
		/**
		 * Variant for permission badges
		 * @default 'primary'
		 */
		badgeVariant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost';
		/**
		 * Submit event handler - called when form is submitted
		 */
		onFormSubmit?: (data: InviteUserFormData) => void | Promise<void>;
		/**
		 * Cancel event handler
		 */
		onCancel?: (event?: MouseEvent) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		roles = [],
		permissions = [],
		email: initialEmail = '',
		role: initialRole = '',
		initialPermissions = [],
		disabled = false,
		loading = false,
		title = 'Invite User',
		submitLabel = 'Send Invitation',
		cancelLabel = 'Cancel',
		emailLabel = 'Email Address',
		emailPlaceholder = 'user@example.com',
		roleLabel = 'Role',
		rolePlaceholder = 'Select a role',
		permissionsLabel = 'Permissions',
		permissionsPlaceholder = 'Select permissions',
		emailError,
		roleError,
		permissionsError,
		formError,
		showCancel = true,
		size = 'md',
		variant,
		submitVariant = 'primary',
		cancelVariant = 'ghost',
		badgeVariant = 'primary',
		onFormSubmit,
		onCancel,
		class: className = '',
		...props
	}: Props = $props();

	// Form state
	let email = $state(initialEmail);
	let role = $state(initialRole);
	let selectedPermissions = $state<string[]>(initialPermissions);
	let permissionsSelectValue = $state('');

	// Update state when initial values change
	$effect(() => {
		email = initialEmail;
		role = initialRole;
		selectedPermissions = [...initialPermissions];
	});

	// Normalize roles to SelectOption format
	let normalizedRoles = $derived(
		roles.map((roleOption) => {
			if (typeof roleOption === 'string') {
				return { value: roleOption, label: roleOption, disabled: false };
			}
			return roleOption;
		})
	);

	// Normalize permissions to SelectOption format
	let normalizedPermissions = $derived(
		permissions.map((permissionOption) => {
			if (typeof permissionOption === 'string') {
				return { value: permissionOption, label: permissionOption, disabled: false };
			}
			return permissionOption;
		})
	);

	// Form wrapper classes
	let formClasses = $derived(['w-full', className].filter(Boolean).join(' '));

	// Generate unique ID for permissions field
	let permissionsFieldId = `permissions-${Math.random().toString(36).substring(2, 11)}`;

	// Handle form submission
	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		submitForm();
	};

	// Submit form data
	const submitForm = () => {
		if (disabled || loading) return;

		const formData: InviteUserFormData = {
			email: email.trim(),
			role,
			permissions: selectedPermissions
		};

		if (onFormSubmit) {
			onFormSubmit(formData);
		}
	};

	// Handle cancel
	const handleCancel = (event?: MouseEvent) => {
		if (disabled || loading) return;
		if (onCancel) {
			onCancel(event);
		}
	};

	// Remove permission
	function removePermission(permissionValue: string) {
		selectedPermissions = selectedPermissions.filter((p) => p !== permissionValue);
	}
</script>

<form class={formClasses} onsubmit={handleSubmit} {...props}>
	<Card>
		<CardSection>
			{#if title}
				<Heading level="h3" class="mb-6">
					{title}
				</Heading>
			{/if}

			{#if formError}
				<Alert variant="error" description={formError} class="mb-4" />
			{/if}

			<div class="space-y-4">
				<!-- Email Field -->
				<Input
					type="email"
					label={emailLabel}
					placeholder={emailPlaceholder}
					value={email || ''}
					required
					disabled={disabled || loading}
					error={emailError}
					{variant}
					{size}
					oninput={(e) => {
						if (e.target && e.target instanceof HTMLInputElement) {
							email = e.target.value;
						}
					}}
					ariaLabel="Email address for user invitation"
				/>

				<!-- Role Field -->
				<Select
					label={roleLabel}
					placeholder={rolePlaceholder}
					options={normalizedRoles}
					value={role}
					required
					disabled={disabled || loading}
					error={roleError}
					{variant}
					{size}
					onchange={(e) => {
						if (e.target && e.target instanceof HTMLSelectElement) {
							role = e.target.value;
						}
					}}
					ariaLabel="User role selection"
				/>

				<!-- Permissions Field -->
				<FormWrapper
					label={permissionsLabel}
					error={permissionsError}
					{size}
					id={permissionsFieldId}
					labelFor={permissionsFieldId}
					hasError={permissionsError !== undefined && permissionsError !== ''}
				>
					<Select
						id={permissionsFieldId}
						placeholder={permissionsPlaceholder}
						options={normalizedPermissions}
						value={permissionsSelectValue}
						disabled={disabled || loading}
						{variant}
						{size}
						onchange={(e) => {
							if (e.target && e.target instanceof HTMLSelectElement) {
								const value = e.target.value;
								if (value && !selectedPermissions.includes(value)) {
									selectedPermissions = [...selectedPermissions, value];
								}
								// Reset select value after selection
								permissionsSelectValue = '';
							}
						}}
						ariaLabel="User permissions selection"
					/>
				</FormWrapper>
				{#if selectedPermissions.length > 0}
					<div class="mt-2 flex flex-wrap gap-2">
						{#each selectedPermissions as permissionValue}
							{@const permission = normalizedPermissions.find((p) => p.value === permissionValue)}
							{#if permission}
								<div class="flex items-center gap-2">
									<Badge label={permission.label} variant={badgeVariant} size="lg" />
									{#if !disabled && !loading}
										<IconButton
											variant="ghost"
											size="xs"
											circle={true}
											onclick={() => removePermission(permissionValue)}
											ariaLabel="Remove {permission.label} permission"
											defaultIconPoints="6 6 12 12 18 6 12 12 18 18 12 12 6 18 12 12"
										/>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				{/if}
			</div>

			<!-- Form Actions -->
			<div class="mt-6 flex justify-end gap-3">
				{#if showCancel}
					<Button
						variant={cancelVariant}
						{size}
						label={cancelLabel}
						disabled={disabled || loading}
						onclick={handleCancel}
						ariaLabel="Cancel user invitation"
					/>
				{/if}
				<Button
					variant={submitVariant}
					{size}
					label={submitLabel}
					disabled={disabled || loading}
					{loading}
					onclick={submitForm}
					ariaLabel="Submit user invitation"
				/>
			</div>
		</CardSection>
	</Card>
</form>
