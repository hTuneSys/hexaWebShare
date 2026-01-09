<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Input from '../../core/forms/Input.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';
	import FormWrapper from '../../core/forms/FormWrapper.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';

	/**
	 * Props interface for the InlineEditField component
	 */
	interface Props {
		/**
		 * Current value (controlled)
		 */
		value?: string;
		/**
		 * Input type
		 * @default 'text'
		 */
		type?: 'text' | 'email' | 'tel' | 'url' | 'number' | 'date' | 'time';
		/**
		 * Color variant of the input
		 * @default undefined (default DaisyUI input style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the field
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the field is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the field is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Placeholder text when editing
		 */
		placeholder?: string;
		/**
		 * Label text for the field
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
		 * Maximum length of input value
		 */
		maxlength?: number;
		/**
		 * Minimum length of input value
		 */
		minlength?: number;
		/**
		 * Pattern for validation (regex)
		 */
		pattern?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * ARIA describedby attribute
		 */
		ariaDescribedby?: string;
		/**
		 * Whether the field is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether to show save/cancel buttons
		 * @default false (auto-save on blur)
		 */
		showButtons?: boolean;
		/**
		 * Whether to auto-save on blur
		 * @default true
		 */
		autoSave?: boolean;
		/**
		 * Display format function for the read-only view
		 */
		displayFormat?: (value: string) => string;
		/**
		 * Empty state text when value is empty
		 * @default 'Click to edit'
		 */
		emptyText?: string;
		/**
		 * Save event handler - called when value is saved
		 */
		onsave?: (value: string) => void;
		/**
		 * Cancel event handler - called when editing is cancelled
		 */
		oncancel?: () => void;
		/**
		 * Change event handler
		 */
		onchange?: (event: Event) => void;
		/**
		 * Input event handler
		 */
		oninput?: (event: Event) => void;
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
		value = '',
		type = 'text',
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
		maxlength,
		minlength,
		pattern,
		ariaLabel,
		ariaDescribedby,
		loading = false,
		showButtons = false,
		autoSave = true,
		displayFormat,
		emptyText = 'Click to edit',
		onsave,
		oncancel,
		onchange,
		oninput,
		onblur,
		onfocus,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `inline-edit-${Math.random().toString(36).substring(2, 11)}`);

	// State for edit mode
	let isEditing = $state(false);
	let editValue = $state('');
	let inputElement: HTMLInputElement | null = $state(null);

	// Initialize edit value when entering edit mode
	function startEditing() {
		if (disabled || loading) return;
		isEditing = true;
		editValue = value || '';
		// Focus input after next tick
		setTimeout(() => {
			const input = document.getElementById(fieldId) as HTMLInputElement;
			if (input) {
				input.focus();
				input.select();
			}
		}, 0);
	}

	// Save changes
	function saveChanges() {
		if (disabled || loading) return;
		const newValue = editValue.trim();
		onsave?.(newValue);
		isEditing = false;
	}

	// Cancel editing
	function cancelEditing() {
		if (disabled || loading) return;
		editValue = value || '';
		isEditing = false;
		oncancel?.();
	}

	// Handle blur event
	function handleBlur(event: Event) {
		if (autoSave && !showButtons) {
			saveChanges();
		}
		onblur?.(event);
	}

	// Handle keydown events
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			saveChanges();
		} else if (event.key === 'Escape') {
			event.preventDefault();
			cancelEditing();
		}
	}

	// Handle input change
	function handleInputChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target) {
			editValue = target.value;
		}
		oninput?.(event);
	}

	// Action to attach keydown handler to input element
	function attachKeydownHandler(node: HTMLElement) {
		function handleKeydownEvent(event: KeyboardEvent) {
			// Only handle if event is from the input element
			const input = node.querySelector(`#${fieldId}`) as HTMLInputElement;
			if (input && event.target === input) {
				handleKeydown(event);
			}
		}
		node.addEventListener('keydown', handleKeydownEvent, true);
		return {
			destroy() {
				node.removeEventListener('keydown', handleKeydownEvent, true);
			}
		};
	}

	// Display value formatting
	let displayValue = $derived(
		value && value.trim() !== '' ? (displayFormat ? displayFormat(value) : value) : emptyText
	);


	// Display text classes
	let displayClasses = $derived(
		[
			'inline-block',
			'cursor-pointer',
			'transition-colors',
			'duration-200',
			'hover:text-primary',
			'focus:outline-none',
			'focus:ring-2',
			'focus:ring-primary',
			'focus:ring-offset-2',
			'rounded',
			'px-2',
			'py-1',
			'-mx-2',
			'-my-1',
			size === 'xs' && 'text-xs',
			size === 'sm' && 'text-sm',
			size === 'md' && 'text-base',
			size === 'lg' && 'text-lg',
			disabled && 'cursor-not-allowed opacity-50',
			!value || value.trim() === '' ? 'text-base-content/50 italic' : 'text-base-content'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<FormWrapper
	id={fieldId}
	{label}
	{error}
	{helpText}
	{required}
	{disabled}
	{size}
	{loading}
	labelFor={fieldId}
	hasError={error !== undefined && error !== ''}
	class="w-full {className}"
>
	<div class="relative">
		{#if isEditing}
			<div class="flex items-center gap-2">
				<div class="relative flex-1" use:attachKeydownHandler>
					<Input
						id={fieldId}
						{name}
						value={editValue}
						{type}
						{placeholder}
						{disabled}
						{required}
						{maxlength}
						{minlength}
						{pattern}
						{variant}
						{size}
						error=""
						loading={false}
						ariaLabel={ariaLabel || (label ? undefined : placeholder)}
						ariaDescribedby={ariaDescribedby}
						oninput={handleInputChange}
						onchange={onchange}
						onblur={handleBlur}
						onfocus={onfocus}
					/>
				</div>
				{#if showButtons}
					<div class="flex items-center gap-1">
						<IconButton
							variant="ghost"
							size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'md' ? 'sm' : 'md'}
							{disabled}
							ariaLabel="Save changes"
							onclick={saveChanges}
						>
							{@const checkIconSize = size === 'xs' ? '12' : size === 'sm' ? '16' : size === 'md' ? '16' : '20'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={checkIconSize}
								height={checkIconSize}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
							</svg>
						</IconButton>
						<IconButton
							variant="ghost"
							size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'md' ? 'sm' : 'md'}
							{disabled}
							ariaLabel="Cancel editing"
							onclick={cancelEditing}
						>
							{@const closeIconSize = size === 'xs' ? '12' : size === 'sm' ? '16' : size === 'md' ? '16' : '20'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={closeIconSize}
								height={closeIconSize}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</IconButton>
					</div>
				{/if}
			</div>
		{:else}
			<div
				class={displayClasses}
				role="button"
				tabindex={disabled ? -1 : 0}
				onclick={startEditing}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						startEditing();
					}
				}}
				aria-label={ariaLabel || (label ? `${label}, click to edit` : 'Click to edit')}
				aria-describedby={ariaDescribedby}
			>
				{displayValue}
			</div>
		{/if}
	</div>
</FormWrapper>
