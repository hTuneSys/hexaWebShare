<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the FormWrapper component
	 */
	interface Props {
		/**
		 * Label text for the form field
		 */
		label?: string;
		/**
		 * Error message to display below the field
		 */
		error?: string;
		/**
		 * Helper text or description displayed below the field
		 */
		helpText?: string;
		/**
		 * Whether the field is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Whether the field is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Size variant of the form field
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * HTML id attribute for the form field
		 */
		id?: string;
		/**
		 * Additional CSS classes for the wrapper
		 */
		class?: string;
		/**
		 * HTML for attribute for the label (links label to input)
		 */
		labelFor?: string;
		/**
		 * Whether the field has an error state
		 * When true, automatically applies the `input-error` class to input, select, or textarea elements
		 * @default false
		 */
		hasError?: boolean;
		/**
		 * Whether the field is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Children content (form field)
		 */
		children?: import('svelte').Snippet;
	}

	const {
		label,
		error,
		helpText,
		required = false,
		disabled = false,
		size = 'md',
		id,
		class: className = '',
		labelFor,
		hasError = false,
		loading = false,
		children,
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `form-field-${Math.random().toString(36).substr(2, 9)}`);
	let labelForId = $derived(labelFor || fieldId);

	// Reference to the wrapper div containing the input
	let inputWrapperRef: HTMLDivElement | undefined = $state();

	// Automatically apply input-error class to form elements when hasError or error is present
	$effect(() => {
		// Track hasError and error props for reactivity
		const showError = hasError || (error !== undefined && error !== '');
		
		if (!inputWrapperRef) return;

		// Use MutationObserver to watch for children being added
		const observer = new MutationObserver(() => {
			const formElements = inputWrapperRef?.querySelectorAll('input, select, textarea');
			
			if (!formElements || formElements.length === 0) return;
			
			formElements.forEach((element) => {
				if (showError) {
					element.classList.add('input-error');
				} else {
					element.classList.remove('input-error');
				}
			});
		});

		// Start observing
		observer.observe(inputWrapperRef, {
			childList: true,
			subtree: true
		});

		// Also check immediately
		requestAnimationFrame(() => {
			const formElements = inputWrapperRef?.querySelectorAll('input, select, textarea');
			
			if (formElements && formElements.length > 0) {
				formElements.forEach((element) => {
					if (showError) {
						element.classList.add('input-error');
					} else {
						element.classList.remove('input-error');
					}
				});
			}
		});

		// Cleanup
		return () => {
			observer.disconnect();
		};
	});

	// Wrapper classes
	let wrapperClasses = $derived(
		[
			'form-control',
			size === 'xs' && 'text-xs',
			size === 'sm' && 'text-sm',
			size === 'md' && 'text-base',
			size === 'lg' && 'text-lg',
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
</script>

<div class={wrapperClasses} {...props}>
	{#if label}
		<label for={labelForId} class={labelClasses}>
			<span class="label-text">
				{label}
				{#if required}
					<span class="ml-1 text-error" aria-label="required">*</span>
				{/if}
			</span>
		</label>
	{/if}

	<div class="relative" bind:this={inputWrapperRef}>
		{#if children}
			{@render children()}
		{/if}
		{#if loading}
			<div class="absolute right-3 top-1/2 -translate-y-1/2" role="status" aria-label="Loading">
				<span class="loading loading-spinner {loadingSizeClass} text-primary"></span>
			</div>
		{/if}
	</div>

	{#if error && error !== ''}
		<div class={labelClasses}>
			<span class="label-text-alt text-error" role="alert" aria-live="polite">{error}</span>
		</div>
	{/if}

	{#if helpText && (!error || error === '')}
		<div class={labelClasses}>
			<span class="label-text-alt text-base-content/70">{helpText}</span>
		</div>
	{/if}
</div>
