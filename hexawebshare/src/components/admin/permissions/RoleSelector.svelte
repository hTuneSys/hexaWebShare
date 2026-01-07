<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Role option type for role selector
	 */
	export type RoleOption = {
		value: string;
		label: string;
		description?: string;
		disabled?: boolean;
	};

	/**
	 * Props interface for the RoleSelector component
	 */
	interface Props {
		/**
		 * Selected role value (controlled)
		 */
		value?: string;
		/**
		 * Available roles array - can be array of strings or array of RoleOption objects
		 */
		roles: string[] | RoleOption[];
		/**
		 * Color variant of the role selector
		 * @default undefined (default DaisyUI select style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the role selector
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the role selector is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the role selector is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Placeholder text (shown when no role is selected)
		 */
		placeholder?: string;
		/**
		 * Label text for the role selector
		 */
		label?: string;
		/**
		 * Error message to display
		 */
		error?: string;
		/**
		 * Helper text or description
		 */
		helpText?: string;
		/**
		 * HTML id attribute
		 */
		id?: string;
		/**
		 * HTML name attribute for form submission
		 */
		name?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * ARIA describedby attribute
		 */
		ariaDescribedby?: string;
		/**
		 * Whether the role selector is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Change event handler
		 */
		onchange?: (event: Event) => void;
		/**
		 * Blur event handler
		 */
		onblur?: (event: Event) => void;
		/**
		 * Focus event handler
		 */
		onfocus?: (event: Event) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		value,
		roles,
		variant,
		size = 'md',
		disabled = false,
		required = false,
		placeholder,
		label,
		error,
		helpText,
		id,
		name,
		ariaLabel,
		ariaDescribedby,
		loading = false,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `role-selector-${Math.random().toString(36).substring(2, 11)}`);
	let labelForId = $derived(label ? fieldId : undefined);

	// Select classes
	let selectClasses = $derived(
		[
			'select',
			'select-bordered',
			'w-full',
			variant === 'primary' && 'select-primary',
			variant === 'secondary' && 'select-secondary',
			variant === 'accent' && 'select-accent',
			variant === 'info' && 'select-info',
			variant === 'success' && 'select-success',
			variant === 'warning' && 'select-warning',
			variant === 'error' && 'select-error',
			size === 'xs' && 'select-xs',
			size === 'sm' && 'select-sm',
			size === 'md' && 'select-md',
			size === 'lg' && 'select-lg',
			error !== undefined && error !== '' && 'select-error',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Label classes
	let labelClasses = $derived(
		[
			'label',
			size === 'xs' && 'py-0',
			size === 'sm' && 'py-1',
			size === 'md' && 'py-2',
			size === 'lg' && 'py-3'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Loading spinner size classes
	let loadingSizeClass = $derived(
		size === 'xs'
			? 'loading-xs'
			: size === 'sm'
				? 'loading-sm'
				: size === 'lg'
					? 'loading-lg'
					: 'loading-md'
	);

	// Normalize roles to RoleOption format
	let normalizedRoles = $derived(
		roles.map((role) => {
			if (typeof role === 'string') {
				return { value: role, label: role, disabled: false };
			}
			return role;
		})
	);

	// Generate IDs for error and help text for ARIA describedby
	let errorId = $derived(error && error !== '' ? `${fieldId}-error` : undefined);
	let helpTextId = $derived(helpText && (!error || error === '') ? `${fieldId}-help` : undefined);
	let describedByIds = $derived(
		[ariaDescribedby, errorId, helpTextId].filter(Boolean).join(' ') || undefined
	);
</script>

<div class="form-control w-full">
	{#if label}
		<label for={labelForId} class={labelClasses}>
			<span class="label-text">
				{label}
				{#if required}
					<span class="text-error ml-1" aria-label="required">*</span>
				{/if}
			</span>
		</label>
	{/if}

	<div class="relative">
		<select
			id={fieldId}
			{name}
			value={value ?? ''}
			disabled={disabled || loading}
			{required}
			class={selectClasses}
			aria-label={ariaLabel || (label ? undefined : placeholder)}
			aria-describedby={describedByIds}
			aria-invalid={error !== undefined && error !== '' ? 'true' : 'false'}
			aria-required={required}
			aria-disabled={disabled || loading}
			aria-busy={loading}
			aria-expanded="false"
			role="combobox"
			{onchange}
			{onblur}
			{onfocus}
			{...props}
		>
			{#if placeholder}
				<option value="" disabled>
					{placeholder}
				</option>
			{/if}
			{#each normalizedRoles as role}
				<option value={role.value} disabled={role.disabled || false}>
					{role.label}
				</option>
			{/each}
		</select>
		{#if loading}
			<div class="absolute top-1/2 right-3 -translate-y-1/2" role="status" aria-label="Loading">
				<span class="loading loading-spinner {loadingSizeClass} text-primary" aria-hidden="true"
				></span>
			</div>
		{/if}
	</div>

	{#if error && error !== ''}
		<div class={labelClasses}>
			<span class="label-text-alt text-error" role="alert" aria-live="polite" id={errorId}>
				{error}
			</span>
		</div>
	{/if}

	{#if helpText && (!error || error === '')}
		<div class={labelClasses}>
			<span class="label-text-alt text-base-content/70" id={helpTextId}>{helpText}</span>
		</div>
	{/if}
</div>

<style>
	:global(select.select) {
		line-height: normal;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	:global(select.select.select-xs) {
		line-height: 1.25;
		padding-top: 0.125rem;
		padding-bottom: 0.125rem;
	}

	:global(select.select.select-sm) {
		line-height: 1.375;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}

	:global(select.select.select-md) {
		line-height: 1.5;
		padding-top: 0.375rem;
		padding-bottom: 0.375rem;
	}

	:global(select.select.select-lg) {
		line-height: 1.625;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
</style>
