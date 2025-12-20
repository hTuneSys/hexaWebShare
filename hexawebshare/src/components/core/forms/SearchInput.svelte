<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the SearchInput component
	 */
	interface Props {
		/**
		 * Current search value (controlled)
		 */
		value?: string;
		/**
		 * Placeholder text
		 * @default 'Search...'
		 */
		placeholder?: string;
		/**
		 * Color variant of the input
		 * @default undefined (default DaisyUI input style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the input
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the input is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the input is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether to show the clear button when there is a value
		 * @default true
		 */
		showClearButton?: boolean;
		/**
		 * Whether to trigger search on every input change
		 * @default false
		 */
		searchOnType?: boolean;
		/**
		 * Debounce delay in milliseconds for searchOnType
		 * @default 300
		 */
		debounceMs?: number;
		/**
		 * Label text for the input
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
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Search event handler (triggered on Enter or search button click)
		 */
		onsearch?: (value: string) => void;
		/**
		 * Clear event handler (triggered when clear button is clicked)
		 */
		onclear?: () => void;
		/**
		 * Input event handler
		 */
		oninput?: (event: Event) => void;
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

	let {
		value = $bindable(''),
		placeholder = 'Search...',
		variant,
		size = 'md',
		disabled = false,
		loading = false,
		showClearButton = true,
		searchOnType = false,
		debounceMs = 300,
		label,
		error,
		helpText,
		id,
		name,
		maxlength,
		ariaLabel,
		onsearch,
		onclear,
		oninput,
		onchange,
		onblur,
		onfocus,
		class: className = ''
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `search-input-${Math.random().toString(36).substr(2, 9)}`);
	let labelForId = $derived(label ? fieldId : undefined);

	// Debounce timer reference
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	// Input classes using static DaisyUI classes
	let inputClasses = $derived(
		[
			'input',
			'input-bordered',
			'w-full',
			'pl-10',
			showClearButton && value ? 'pr-10' : 'pr-4',
			variant === 'primary' && 'input-primary',
			variant === 'secondary' && 'input-secondary',
			variant === 'accent' && 'input-accent',
			variant === 'info' && 'input-info',
			variant === 'success' && 'input-success',
			variant === 'warning' && 'input-warning',
			variant === 'error' && 'input-error',
			size === 'xs' && 'input-xs',
			size === 'sm' && 'input-sm',
			size === 'md' && 'input-md',
			size === 'lg' && 'input-lg',
			error !== undefined && error !== '' && 'input-error',
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

	// Icon size classes based on input size
	let iconSizeClass = $derived(
		size === 'xs' ? 'w-3 h-3' : size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
	);

	// Icon position classes based on input size
	let iconLeftClass = $derived(
		size === 'xs' ? 'left-2' : size === 'sm' ? 'left-2.5' : size === 'lg' ? 'left-4' : 'left-3'
	);

	let iconRightClass = $derived(
		size === 'xs' ? 'right-2' : size === 'sm' ? 'right-2.5' : size === 'lg' ? 'right-4' : 'right-3'
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

	// Clear button size classes
	let clearButtonSizeClass = $derived(
		size === 'xs' ? 'btn-xs' : size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : 'btn-md'
	);

	/**
	 * Handle search action
	 */
	function handleSearch() {
		if (!disabled && onsearch) {
			onsearch(value);
		}
	}

	/**
	 * Handle clear action
	 */
	function handleClear() {
		value = '';
		if (onclear) {
			onclear();
		}
		if (onsearch) {
			onsearch('');
		}
	}

	/**
	 * Handle input event with optional debounce
	 */
	function handleInput(event: Event) {
		if (oninput) {
			oninput(event);
		}

		if (searchOnType && onsearch) {
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
			debounceTimer = setTimeout(() => {
				onsearch(value);
			}, debounceMs);
		}
	}

	/**
	 * Handle keydown event for Enter key
	 */
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !disabled) {
			event.preventDefault();
			handleSearch();
		}
		if (event.key === 'Escape' && value) {
			event.preventDefault();
			handleClear();
		}
	}
</script>

<div class="form-control w-full">
	{#if label}
		<label for={labelForId} class={labelClasses}>
			<span class="label-text">{label}</span>
		</label>
	{/if}

	<div class="relative">
		<!-- Search Icon -->
		<div
			class="pointer-events-none absolute top-1/2 -translate-y-1/2 text-base-content/50 {iconLeftClass}"
			aria-hidden="true"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class={iconSizeClass}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
		</div>

		<!-- Input -->
		<input
			type="search"
			id={fieldId}
			{name}
			bind:value
			{placeholder}
			{disabled}
			{maxlength}
			class={inputClasses}
			aria-label={ariaLabel || label || 'Search'}
			aria-invalid={error !== undefined && error !== '' ? 'true' : undefined}
			aria-disabled={disabled}
			aria-busy={loading}
			onkeydown={handleKeydown}
			oninput={handleInput}
			{onchange}
			{onblur}
			{onfocus}
		/>

		<!-- Clear Button or Loading Spinner -->
		<div class="absolute top-1/2 -translate-y-1/2 {iconRightClass}">
			{#if loading}
				<span
					class="loading loading-spinner {loadingSizeClass} text-base-content/50"
					role="status"
					aria-label="Searching"
				></span>
			{:else if showClearButton && value}
				<button
					type="button"
					class="btn btn-circle btn-ghost {clearButtonSizeClass} h-auto min-h-0 p-0.5"
					onclick={handleClear}
					{disabled}
					aria-label="Clear search"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						class={iconSizeClass}
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			{/if}
		</div>
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
