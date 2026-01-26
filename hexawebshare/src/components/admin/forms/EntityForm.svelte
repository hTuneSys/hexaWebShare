<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type { SelectOption } from '../../core/forms/Select.svelte';

	/**
	 * Field type for form fields
	 */
	export type FieldType =
		| 'text'
		| 'email'
		| 'password'
		| 'tel'
		| 'url'
		| 'number'
		| 'date'
		| 'time'
		| 'datetime-local'
		| 'textarea'
		| 'select'
		| 'checkbox'
		| 'switch';

	/**
	 * Validation rule for a field
	 */
	export interface ValidationRule {
		/**
		 * Whether the field is required
		 */
		required?: boolean;
		/**
		 * Minimum length (for strings) or minimum value (for numbers)
		 */
		min?: number;
		/**
		 * Maximum length (for strings) or maximum value (for numbers)
		 */
		max?: number;
		/**
		 * Pattern for validation (regex string)
		 */
		pattern?: string;
		/**
		 * Custom validation function
		 * Returns error message string if invalid, undefined if valid
		 */
		validate?: (value: unknown) => string | undefined;
		/**
		 * Type-specific validation
		 */
		type?: 'email' | 'url' | 'number' | 'date';
	}

	/**
	 * Field definition for entity form
	 */
	export interface EntityField {
		/**
		 * Field key/name (maps to entity property)
		 */
		key: string;
		/**
		 * Field type
		 */
		type: FieldType;
		/**
		 * Field label
		 */
		label: string;
		/**
		 * Placeholder text
		 */
		placeholder?: string;
		/**
		 * Helper text or description
		 */
		helpText?: string;
		/**
		 * Validation rules
		 */
		validation?: ValidationRule;
		/**
		 * Whether the field is disabled
		 */
		disabled?: boolean;
		/**
		 * Whether the field is readonly
		 */
		readonly?: boolean;
		/**
		 * Default value for the field
		 */
		defaultValue?: unknown;
		/**
		 * Options for select fields
		 */
		options?: string[] | SelectOption[];
		/**
		 * Section/group name for organizing fields
		 */
		section?: string;
		/**
		 * Field size
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Field variant
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Whether to hide the field in edit mode
		 */
		hideInEdit?: boolean;
		/**
		 * Whether to hide the field in create mode
		 */
		hideInCreate?: boolean;
		/**
		 * Custom render function for the field (returns a snippet)
		 * Note: This is advanced usage - most cases should use the standard field types
		 */
		render?: (
			field: EntityField,
			value: unknown,
			errors: Record<string, string>,
			onChange: (key: string, value: unknown) => void
		) => Snippet;
	}

	/**
	 * Form mode
	 */
	export type FormMode = 'create' | 'edit';
</script>

<script lang="ts">
	import FormSection from './FormSection.svelte';
	import Form from '../../core/forms/Form.svelte';
	import Input from '../../core/forms/Input.svelte';
	import NumberInput from '../../core/forms/NumberInput.svelte';
	import Select from '../../core/forms/Select.svelte';
	import Checkbox from '../../core/forms/Checkbox.svelte';
	import Switch from '../../core/forms/Switch.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Heading from '../../core/typography/Heading.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Callout from '../../core/feedback/Callout.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';

	/**
	 * Props interface for the EntityForm component
	 * A comprehensive form component for creating and editing entities based on field definitions
	 */
	interface Props {
		/**
		 * Form title/heading
		 */
		title?: string;
		/**
		 * Form description text
		 */
		description?: string;
		/**
		 * Form mode: 'create' or 'edit'
		 * @default 'create'
		 */
		mode?: FormMode;
		/**
		 * Field definitions that describe the entity model
		 */
		fields: EntityField[];
		/**
		 * Initial values for the form (used in edit mode)
		 */
		initialValues?: Record<string, unknown>;
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
		 * Global error message to display at the top of the form
		 */
		error?: string;
		/**
		 * Global success message to display at the top of the form
		 */
		success?: string;
		/**
		 * Whether to show automatic success message after submit
		 * @default true
		 */
		showAutoSuccess?: boolean;
		/**
		 * Custom success message for create mode
		 * @default 'Created successfully!'
		 */
		createSuccessMessage?: string;
		/**
		 * Custom success message for edit mode
		 * @default 'Updated successfully!'
		 */
		updateSuccessMessage?: string;
		/**
		 * Duration in milliseconds to show auto messages
		 * @default 5000
		 */
		autoMessageDuration?: number;
		/**
		 * Submit button label
		 * @default 'Submit'
		 */
		submitLabel?: string;
		/**
		 * Cancel button label
		 * @default 'Cancel'
		 */
		cancelLabel?: string;
		/**
		 * Reset button label
		 * @default 'Reset'
		 */
		resetLabel?: string;
		/**
		 * Whether to show the submit button
		 * @default true
		 */
		showSubmit?: boolean;
		/**
		 * Whether to show the cancel button
		 * @default false
		 */
		showCancel?: boolean;
		/**
		 * Whether to show the reset button
		 * @default false
		 */
		showReset?: boolean;
		/**
		 * Submit event handler
		 * Receives the form data as DTO (Data Transfer Object)
		 */
		onsubmit?: (data: Record<string, unknown>) => void | Promise<void>;
		/**
		 * Cancel button click handler
		 */
		oncancel?: () => void;
		/**
		 * Reset event handler
		 */
		onreset?: () => void;
		/**
		 * Field change handler (called when any field value changes)
		 */
		onchange?: (key: string, value: unknown, allValues: Record<string, unknown>) => void;
		/**
		 * Layout variant for the form
		 * @default 'default'
		 */
		variant?: 'default' | 'bordered' | 'card';
		/**
		 * Padding size for the form container
		 * @default 'md'
		 */
		padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Accessible label for the form
		 */
		ariaLabel?: string;
		/**
		 * Accessible label for loading state
		 * @default 'Form is loading'
		 */
		loadingLabel?: string;
		/**
		 * Accessible label for submit button
		 * @default 'Submit form'
		 */
		submitAriaLabel?: string;
		/**
		 * Accessible label for cancel button
		 * @default 'Cancel form'
		 */
		cancelAriaLabel?: string;
		/**
		 * Accessible label for reset button
		 * @default 'Reset form'
		 */
		resetAriaLabel?: string;
	}

	const {
		title,
		description,
		mode = 'create',
		fields,
		initialValues = {},
		disabled = false,
		loading = false,
		error,
		success,
		showAutoSuccess = true,
		createSuccessMessage = 'Created successfully!',
		updateSuccessMessage = 'Updated successfully!',
		autoMessageDuration = 5000,
		submitLabel = 'Submit',
		cancelLabel = 'Cancel',
		resetLabel = 'Reset',
		showSubmit = true,
		showCancel = false,
		showReset = false,
		onsubmit,
		oncancel,
		onreset,
		onchange,
		variant = 'default',
		padding = 'md',
		class: className = '',
		ariaLabel,
		loadingLabel = 'Form is loading',
		submitAriaLabel = 'Submit form',
		cancelAriaLabel = 'Cancel form',
		resetAriaLabel = 'Reset form',
		...props
	}: Props = $props();

	// Form state: values and errors
	let formValues = $state<Record<string, unknown>>({});
	let formErrors = $state<Record<string, string>>({});
	let touchedFields = $state<Set<string>>(new Set());
	let internalSuccess = $state<string | undefined>(undefined);
	let internalError = $state<string | undefined>(undefined);

	// Initialize form values from initialValues and field defaults
	$effect(() => {
		const values: Record<string, unknown> = {};
		for (const field of fields) {
			// Skip fields that should be hidden in current mode
			if (mode === 'edit' && field.hideInEdit) continue;
			if (mode === 'create' && field.hideInCreate) continue;

			// Use initial value if provided, otherwise use field default
			values[field.key] =
				initialValues[field.key] !== undefined
					? initialValues[field.key]
					: field.defaultValue !== undefined
						? field.defaultValue
						: field.type === 'checkbox' || field.type === 'switch'
							? false
							: '';
		}
		formValues = values;
		formErrors = {};
		touchedFields = new Set();
	});

	// Validate a single field
	function validateField(field: EntityField, value: unknown): string | undefined {
		const rules = field.validation;
		if (!rules) return undefined;

		// Required validation
		if (rules.required) {
			if (value === null || value === undefined || value === '') {
				return `${field.label} is required`;
			}
		}

		// Skip other validations if value is empty and not required
		if (value === null || value === undefined || value === '') {
			return undefined;
		}

		const stringValue = String(value);
		const numValue = typeof value === 'number' ? value : Number(value);

		// Min validation
		if (rules.min !== undefined) {
			if (field.type === 'number' || field.type === 'text' || field.type === 'textarea') {
				if (field.type === 'number') {
					if (isNaN(numValue) || numValue < rules.min) {
						return `${field.label} must be at least ${rules.min}`;
					}
				} else {
					if (stringValue.length < rules.min) {
						return `${field.label} must be at least ${rules.min} characters`;
					}
				}
			}
		}

		// Max validation
		if (rules.max !== undefined) {
			if (field.type === 'number' || field.type === 'text' || field.type === 'textarea') {
				if (field.type === 'number') {
					if (isNaN(numValue) || numValue > rules.max) {
						return `${field.label} must be at most ${rules.max}`;
					}
				} else {
					if (stringValue.length > rules.max) {
						return `${field.label} must be at most ${rules.max} characters`;
					}
				}
			}
		}

		// Pattern validation
		if (rules.pattern) {
			const regex = new RegExp(rules.pattern);
			if (!regex.test(stringValue)) {
				return `${field.label} format is invalid`;
			}
		}

		// Type validation
		if (rules.type) {
			if (rules.type === 'email') {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(stringValue)) {
					return `${field.label} must be a valid email address`;
				}
			} else if (rules.type === 'url') {
				try {
					new URL(stringValue);
				} catch {
					return `${field.label} must be a valid URL`;
				}
			} else if (rules.type === 'number') {
				if (isNaN(numValue)) {
					return `${field.label} must be a valid number`;
				}
			} else if (rules.type === 'date') {
				if (isNaN(Date.parse(stringValue))) {
					return `${field.label} must be a valid date`;
				}
			}
		}

		// Custom validation function
		if (rules.validate) {
			return rules.validate(value);
		}

		return undefined;
	}

	// Validate all fields
	function validateForm(): boolean {
		const errors: Record<string, string> = {};
		let isValid = true;

		for (const field of fields) {
			// Skip hidden fields
			if (mode === 'edit' && field.hideInEdit) continue;
			if (mode === 'create' && field.hideInCreate) continue;

			const value = formValues[field.key];
			const error = validateField(field, value);
			if (error) {
				errors[field.key] = error;
				isValid = false;
			}
		}

		formErrors = errors;
		return isValid;
	}

	// Handle field value change
	function handleFieldChange(key: string, value: unknown) {
		formValues[key] = value;
		touchedFields.add(key);

		// Validate field on change if it's been touched
		const field = fields.find((f) => f.key === key);
		if (field) {
			const error = validateField(field, value);
			if (error) {
				formErrors[key] = error;
			} else {
				delete formErrors[key];
			}
		}

		// Call onChange handler
		onchange?.(key, value, formValues);
	}

	// Handle form submission
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (disabled || loading) return;

		// Clear previous messages
		internalSuccess = undefined;
		internalError = undefined;

		// Mark all fields as touched
		for (const field of fields) {
			touchedFields.add(field.key);
		}

		// Validate form
		if (!validateForm()) {
			return;
		}

		// Prepare DTO (Data Transfer Object) - only include visible fields
		const dto: Record<string, unknown> = {};
		for (const field of fields) {
			// Skip hidden fields
			if (mode === 'edit' && field.hideInEdit) continue;
			if (mode === 'create' && field.hideInCreate) continue;

			dto[field.key] = formValues[field.key];
		}

		// Call submit handler
		if (onsubmit) {
			try {
				await onsubmit(dto);

				// Show success message if auto-success is enabled
				if (showAutoSuccess) {
					internalSuccess = mode === 'create' ? createSuccessMessage : updateSuccessMessage;

					// Auto-hide success message after specified duration
					setTimeout(() => {
						internalSuccess = undefined;
					}, autoMessageDuration);
				}
			} catch (err) {
				// Show error message
				internalError =
					err instanceof Error ? err.message : 'An error occurred while submitting the form';

				// Auto-hide error message after specified duration
				setTimeout(() => {
					internalError = undefined;
				}, autoMessageDuration);
			}
		}
	}

	// Handle form reset
	function handleReset() {
		if (disabled || loading) return;

		// Reset to initial values
		const values: Record<string, unknown> = {};
		for (const field of fields) {
			if (mode === 'edit' && field.hideInEdit) continue;
			if (mode === 'create' && field.hideInCreate) continue;

			values[field.key] =
				initialValues[field.key] !== undefined
					? initialValues[field.key]
					: field.defaultValue !== undefined
						? field.defaultValue
						: field.type === 'checkbox' || field.type === 'switch'
							? false
							: '';
		}
		formValues = values;
		formErrors = {};
		touchedFields = new Set();

		onreset?.();
	}

	// Handle cancel
	function handleCancel() {
		if (disabled || loading) return;
		oncancel?.();
	}

	// Group fields by section
	let fieldsBySection = $derived(() => {
		const grouped: Record<string, EntityField[]> = {};
		const noSection: EntityField[] = [];

		for (const field of fields) {
			// Skip hidden fields
			if (mode === 'edit' && field.hideInEdit) continue;
			if (mode === 'create' && field.hideInCreate) continue;

			if (field.section) {
				if (!grouped[field.section]) {
					grouped[field.section] = [];
				}
				grouped[field.section].push(field);
			} else {
				noSection.push(field);
			}
		}

		return { grouped, noSection };
	});

	// Get field value and error state
	function getFieldState(field: EntityField) {
		const value = formValues[field.key];
		const error = formErrors[field.key];
		const isTouched = touchedFields.has(field.key);
		const showError = isTouched && error;
		return { value, error, showError };
	}

	// Form container classes
	let formContainerClasses = $derived(
		[
			'entity-form',
			variant === 'bordered' && 'border border-base-300 rounded-lg',
			variant === 'card' && 'card bg-base-100 shadow-md',
			disabled && 'opacity-50 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Padding classes
	let paddingClasses = $derived(
		[
			padding === 'none' && '',
			padding === 'xs' && 'p-2',
			padding === 'sm' && 'p-3',
			padding === 'md' && 'p-4',
			padding === 'lg' && 'p-6',
			padding === 'xl' && 'p-8'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Footer classes
	let footerClasses = $derived(
		[
			'entity-form-footer',
			'flex items-center justify-end gap-3',
			'pt-4 mt-4',
			variant === 'bordered' && 'border-t border-base-300',
			variant === 'card' && 'border-t border-base-300'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class="{formContainerClasses} {paddingClasses}">
	{#if title || description}
		<div class="entity-form-header mb-6">
			{#if title}
				<Heading level="h2" size="lg" weight="semibold" class="mb-2">
					{title}
				</Heading>
			{/if}
			{#if description}
				<Text size="sm" variant="muted">
					{description}
				</Text>
			{/if}
		</div>
	{/if}

	{#if error || internalError}
		<div class="mb-4">
			<Callout variant="error" title={error || internalError} />
		</div>
	{/if}

	{#if success || internalSuccess}
		<div class="mb-4">
			<Callout variant="success" title={success || internalSuccess} />
		</div>
	{/if}

	<Form onsubmit={handleSubmit} onreset={handleReset} ariaLabel={ariaLabel || title} {...props}>
		<div class="entity-form-content">
			{#if loading}
				<div
					class="bg-base-100/80 absolute inset-0 z-10 flex items-center justify-center rounded-lg"
					role="status"
					aria-label={loadingLabel}
				>
					<Spinner size="lg" variant="primary" />
				</div>
			{/if}

			{#if Object.keys(fieldsBySection().grouped).length > 0 || fieldsBySection().noSection.length > 0}
				{#each Object.entries(fieldsBySection().grouped) as [sectionName, sectionFields]}
					<FormSection title={sectionName} class="mb-6">
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							{#each sectionFields as field}
								{@const fieldState = getFieldState(field)}
								{#if field.render}
									{@const customFieldSnippet = field.render(
										field,
										fieldState.value,
										formErrors,
										handleFieldChange
									)}
									{@render customFieldSnippet()}
								{:else if field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'tel' || field.type === 'url' || field.type === 'date' || field.type === 'time' || field.type === 'datetime-local'}
									<Input
										type={field.type}
										label={field.label}
										placeholder={field.placeholder}
										helpText={field.helpText}
										value={String(fieldState.value || '')}
										error={fieldState.showError ? fieldState.error : undefined}
										required={field.validation?.required}
										disabled={disabled || field.disabled}
										readonly={field.readonly}
										size={field.size}
										variant={field.variant}
										minlength={field.validation?.min}
										maxlength={field.validation?.max}
										pattern={field.validation?.pattern}
										oninput={(e) => {
											const target = e.target as HTMLInputElement;
											handleFieldChange(field.key, target.value);
										}}
									/>
								{:else if field.type === 'number'}
									<NumberInput
										label={field.label}
										placeholder={field.placeholder}
										helpText={field.helpText}
										value={typeof fieldState.value === 'number'
											? fieldState.value
											: fieldState.value
												? Number(fieldState.value)
												: undefined}
										error={fieldState.showError ? fieldState.error : undefined}
										required={field.validation?.required}
										disabled={disabled || field.disabled}
										readonly={field.readonly}
										size={field.size}
										variant={field.variant}
										min={field.validation?.min}
										max={field.validation?.max}
										onchange={(e) => {
											const target = e.target as HTMLInputElement;
											handleFieldChange(field.key, target.value ? Number(target.value) : undefined);
										}}
									/>
								{:else if field.type === 'textarea'}
									<!-- 
										NOTE: Textarea component doesn't exist yet, using Input as fallback.
										In production, you would use a Textarea component.
									-->
									<Input
										type="text"
										label={field.label}
										placeholder={field.placeholder}
										helpText={field.helpText}
										value={String(fieldState.value || '')}
										error={fieldState.showError ? fieldState.error : undefined}
										required={field.validation?.required}
										disabled={disabled || field.disabled}
										readonly={field.readonly}
										size={field.size}
										variant={field.variant}
										minlength={field.validation?.min}
										maxlength={field.validation?.max}
										pattern={field.validation?.pattern}
										oninput={(e) => {
											const target = e.target as HTMLInputElement;
											handleFieldChange(field.key, target.value);
										}}
									/>
								{:else if field.type === 'select'}
									<Select
										label={field.label}
										placeholder={field.placeholder}
										helpText={field.helpText}
										options={field.options || []}
										value={String(fieldState.value || '')}
										error={fieldState.showError ? fieldState.error : undefined}
										required={field.validation?.required}
										disabled={disabled || field.disabled}
										size={field.size}
										variant={field.variant}
										onchange={(e) => {
											const target = e.target as HTMLSelectElement;
											handleFieldChange(field.key, target.value);
										}}
									/>
								{:else if field.type === 'checkbox'}
									<Checkbox
										label={field.label}
										checked={Boolean(fieldState.value)}
										disabled={disabled || field.disabled}
										required={field.validation?.required}
										size={field.size}
										variant={field.variant}
										onchange={(e) => {
											const target = e.target as HTMLInputElement;
											handleFieldChange(field.key, target.checked);
										}}
									/>
								{:else if field.type === 'switch'}
									<Switch
										label={field.label}
										checked={Boolean(fieldState.value)}
										disabled={disabled || field.disabled}
										required={field.validation?.required}
										size={field.size}
										variant={field.variant}
										onchange={(e) => {
											const target = e.target as HTMLInputElement;
											handleFieldChange(field.key, target.checked);
										}}
									/>
								{:else}
									<Text text={`Unknown field type: ${field.type}`} variant="error" />
								{/if}
							{/each}
						</div>
					</FormSection>
				{/each}

				{#if fieldsBySection().noSection.length > 0}
					<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
						{#each fieldsBySection().noSection as field}
							{@const fieldState = getFieldState(field)}
							{#if field.render}
								{@const customFieldSnippet = field.render(
									field,
									fieldState.value,
									formErrors,
									handleFieldChange
								)}
								{@render customFieldSnippet()}
							{:else if field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'tel' || field.type === 'url' || field.type === 'date' || field.type === 'time' || field.type === 'datetime-local'}
								<Input
									type={field.type}
									label={field.label}
									placeholder={field.placeholder}
									helpText={field.helpText}
									value={String(fieldState.value || '')}
									error={fieldState.showError ? fieldState.error : undefined}
									required={field.validation?.required}
									disabled={disabled || field.disabled}
									readonly={field.readonly}
									size={field.size}
									variant={field.variant}
									minlength={field.validation?.min}
									maxlength={field.validation?.max}
									pattern={field.validation?.pattern}
									oninput={(e) => {
										const target = e.target as HTMLInputElement;
										handleFieldChange(field.key, target.value);
									}}
								/>
							{:else if field.type === 'number'}
								<NumberInput
									label={field.label}
									placeholder={field.placeholder}
									helpText={field.helpText}
									value={typeof fieldState.value === 'number'
										? fieldState.value
										: fieldState.value
											? Number(fieldState.value)
											: undefined}
									error={fieldState.showError ? fieldState.error : undefined}
									required={field.validation?.required}
									disabled={disabled || field.disabled}
									readonly={field.readonly}
									size={field.size}
									variant={field.variant}
									min={field.validation?.min}
									max={field.validation?.max}
									onchange={(e) => {
										const target = e.target as HTMLInputElement;
										handleFieldChange(field.key, target.value ? Number(target.value) : undefined);
									}}
								/>
							{:else if field.type === 'textarea'}
								<!-- 
									NOTE: Textarea component doesn't exist yet, using Input as fallback.
									In production, you would use a Textarea component.
								-->
								<Input
									type="text"
									label={field.label}
									placeholder={field.placeholder}
									helpText={field.helpText}
									value={String(fieldState.value || '')}
									error={fieldState.showError ? fieldState.error : undefined}
									required={field.validation?.required}
									disabled={disabled || field.disabled}
									readonly={field.readonly}
									size={field.size}
									variant={field.variant}
									minlength={field.validation?.min}
									maxlength={field.validation?.max}
									pattern={field.validation?.pattern}
									oninput={(e) => {
										const target = e.target as HTMLInputElement;
										handleFieldChange(field.key, target.value);
									}}
								/>
							{:else if field.type === 'select'}
								<Select
									label={field.label}
									placeholder={field.placeholder}
									helpText={field.helpText}
									options={field.options || []}
									value={String(fieldState.value || '')}
									error={fieldState.showError ? fieldState.error : undefined}
									required={field.validation?.required}
									disabled={disabled || field.disabled}
									size={field.size}
									variant={field.variant}
									onchange={(e) => {
										const target = e.target as HTMLSelectElement;
										handleFieldChange(field.key, target.value);
									}}
								/>
							{:else if field.type === 'checkbox'}
								<Checkbox
									label={field.label}
									checked={Boolean(fieldState.value)}
									disabled={disabled || field.disabled}
									required={field.validation?.required}
									size={field.size}
									variant={field.variant}
									onchange={(e) => {
										const target = e.target as HTMLInputElement;
										handleFieldChange(field.key, target.checked);
									}}
								/>
							{:else if field.type === 'switch'}
								<Switch
									label={field.label}
									checked={Boolean(fieldState.value)}
									disabled={disabled || field.disabled}
									required={field.validation?.required}
									size={field.size}
									variant={field.variant}
									onchange={(e) => {
										const target = e.target as HTMLInputElement;
										handleFieldChange(field.key, target.checked);
									}}
								/>
							{:else}
								<Text text={`Unknown field type: ${field.type}`} variant="error" />
							{/if}
						{/each}
					</div>
				{/if}
			{/if}
		</div>

		{#if showSubmit || showCancel || showReset}
			<div class={footerClasses}>
				<div class="flex items-center gap-3">
					{#if showReset}
						<Button type="reset" variant="ghost" size="md" {disabled} ariaLabel={resetAriaLabel}>
							{resetLabel}
						</Button>
					{/if}

					{#if showCancel}
						<Button
							type="button"
							variant="ghost"
							size="md"
							{disabled}
							onclick={handleCancel}
							ariaLabel={cancelAriaLabel}
						>
							{cancelLabel}
						</Button>
					{/if}

					{#if showSubmit}
						<Button
							type="submit"
							variant="primary"
							size="md"
							{disabled}
							{loading}
							ariaLabel={submitAriaLabel}
						>
							{submitLabel}
						</Button>
					{/if}
				</div>
			</div>
		{/if}
	</Form>
</div>
