<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Option type for multiselect options
	 */
	export type MultiSelectOption = {
		value: string;
		label: string;
		disabled?: boolean;
	};

	/**
	 * Props interface for the MultiSelect component
	 */
	interface Props {
		/**
		 * Selected values array (controlled mode - if provided, component is controlled)
		 */
		value?: string[];
		/**
		 * Default selected values (uncontrolled mode - used when value is not provided)
		 */
		defaultValue?: string[];
		/**
		 * Options array - can be array of strings or array of MultiSelectOption objects
		 */
		options: string[] | MultiSelectOption[];
		/**
		 * Color variant of the multiselect
		 * @default undefined (default DaisyUI select style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the multiselect
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Width of the multiselect container
		 * @default 'full'
		 */
		width?: 'full' | 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Horizontal alignment of the component
		 * @default undefined (follows normal flow, left-aligned)
		 */
		align?: 'left' | 'center' | 'right';
		/**
		 * Whether the multiselect is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the multiselect is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Placeholder text (shown when no option is selected)
		 */
		placeholder?: string;
		/**
		 * Label text for the multiselect
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
		 * Whether the multiselect is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Enable search/filter functionality
		 * @default false
		 */
		searchable?: boolean;
		/**
		 * Maximum number of selections allowed
		 */
		maxSelected?: number;
		/**
		 * Show clear all button
		 * @default true
		 */
		clearable?: boolean;
		/**
		 * Change event handler - receives array of selected values
		 */
		onchange?: (values: string[]) => void;
		/**
		 * Blur event handler
		 */
		onblur?: (event: FocusEvent) => void;
		/**
		 * Focus event handler
		 */
		onfocus?: (event: FocusEvent) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		value,
		defaultValue = [],
		options,
		variant,
		size = 'md',
		width = 'full',
		align,
		disabled = false,
		required = false,
		placeholder = 'Select options...',
		label,
		error,
		helpText,
		id,
		name,
		ariaLabel,
		ariaDescribedby,
		loading = false,
		searchable = false,
		maxSelected,
		clearable = true,
		onchange,
		onblur,
		onfocus,
		class: className = ''
	}: Props = $props();

	// Component state
	let isOpen = $state(false);
	let searchQuery = $state('');
	let focusedIndex = $state(-1);
	let containerRef: HTMLDivElement | undefined = $state();
	let searchInputRef: HTMLInputElement | undefined = $state();
	let listboxRef: HTMLUListElement | undefined = $state();

	// Internal state for uncontrolled mode
	let internalState = $state<string[]>(defaultValue);

	// Determine if component is controlled or uncontrolled
	let isControlled = $derived(value !== undefined);

	// Current value - either from props (controlled) or internal state (uncontrolled)
	let currentValue = $derived.by(() => {
		if (isControlled) {
			return Array.isArray(value) ? value : [];
		}
		return internalState;
	});

	// Generate unique ID if not provided
	let fieldId = $derived(id || `multiselect-${Math.random().toString(36).substr(2, 9)}`);
	let listboxId = $derived(`${fieldId}-listbox`);

	// Normalize options to MultiSelectOption format
	let normalizedOptions = $derived(
		(options || []).map((option) => {
			if (typeof option === 'string') {
				return { value: option, label: option, disabled: false };
			}
			return option;
		})
	);

	// Filter options based on search query
	let filteredOptions = $derived(
		searchable && searchQuery
			? normalizedOptions.filter((option) =>
					option.label.toLowerCase().includes(searchQuery.toLowerCase())
				)
			: normalizedOptions
	);

	// Get selected option objects
	let selectedOptions = $derived(
		normalizedOptions.filter((option) => currentValue.includes(option.value))
	);

	// Check if max selection reached
	let isMaxReached = $derived(
		maxSelected !== undefined && maxSelected > 0 && currentValue.length >= maxSelected
	);

	// Width classes
	let widthClasses = $derived(
		width === 'full'
			? 'w-full'
			: width === 'auto'
				? 'w-auto'
				: width === 'xs'
					? 'w-32'
					: width === 'sm'
						? 'w-48'
						: width === 'md'
							? 'w-64'
							: width === 'lg'
								? 'w-80'
								: width === 'xl'
									? 'w-96'
									: 'w-full'
	);

	// Alignment classes (horizontal only)
	let alignClasses = $derived(align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : '');

	// Container classes
	let containerClasses = $derived(
		['relative', widthClasses, disabled && 'opacity-50 cursor-not-allowed']
			.filter(Boolean)
			.join(' ')
	);

	// Input container classes (the clickable area that looks like an input)
	let inputContainerClasses = $derived(
		[
			'flex',
			'flex-wrap',
			'items-center',
			'gap-1',
			'min-h-[2.5rem]',
			'px-3',
			'py-1.5',
			'border',
			'rounded-btn',
			'bg-base-100',
			'cursor-pointer',
			'transition-colors',
			isOpen && 'ring-2 ring-offset-2',
			variant === 'primary' && 'border-primary',
			variant === 'primary' && isOpen && 'ring-primary',
			variant === 'secondary' && 'border-secondary',
			variant === 'secondary' && isOpen && 'ring-secondary',
			variant === 'accent' && 'border-accent',
			variant === 'accent' && isOpen && 'ring-accent',
			variant === 'info' && 'border-info',
			variant === 'info' && isOpen && 'ring-info',
			variant === 'success' && 'border-success',
			variant === 'success' && isOpen && 'ring-success',
			variant === 'warning' && 'border-warning',
			variant === 'warning' && isOpen && 'ring-warning',
			variant === 'error' && 'border-error',
			variant === 'error' && isOpen && 'ring-error',
			!variant && 'border-base-300',
			!variant && isOpen && 'ring-primary',
			error && 'border-error',
			error && isOpen && 'ring-error',
			size === 'xs' && 'min-h-[1.75rem] text-xs',
			size === 'sm' && 'min-h-[2rem] text-sm',
			size === 'md' && 'min-h-[2.5rem] text-base',
			size === 'lg' && 'min-h-[3rem] text-lg',
			disabled && 'pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Tag/chip classes for selected items
	let tagClasses = $derived(
		[
			'badge',
			'gap-1',
			variant === 'primary' && 'badge-primary',
			variant === 'secondary' && 'badge-secondary',
			variant === 'accent' && 'badge-accent',
			variant === 'info' && 'badge-info',
			variant === 'success' && 'badge-success',
			variant === 'warning' && 'badge-warning',
			variant === 'error' && 'badge-error',
			!variant && 'badge-neutral',
			size === 'xs' && 'badge-xs',
			size === 'sm' && 'badge-sm',
			size === 'md' && 'badge-md',
			size === 'lg' && 'badge-lg'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Dropdown classes
	let dropdownClasses = $derived(
		[
			'absolute',
			'z-50',
			'w-full',
			'mt-1',
			'bg-base-100',
			'border',
			'border-base-300',
			'rounded-box',
			'shadow-lg',
			'max-h-60',
			'overflow-auto'
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

	// Update value (handles both controlled and uncontrolled modes)
	function updateValue(newValue: string[]) {
		if (!isControlled) {
			internalState = newValue;
		}
		onchange?.(newValue);
	}

	// Toggle dropdown
	function toggleDropdown() {
		if (disabled || loading) return;
		isOpen = !isOpen;
		if (isOpen) {
			focusedIndex = -1;
			searchQuery = '';
			// Focus search input when dropdown opens
			setTimeout(() => {
				if (searchable && searchInputRef) {
					searchInputRef.focus();
				}
			}, 10);
		}
	}

	// Open dropdown
	function openDropdown() {
		if (disabled || loading) return;
		isOpen = true;
		focusedIndex = -1;
	}

	// Close dropdown
	function closeDropdown() {
		isOpen = false;
		searchQuery = '';
		focusedIndex = -1;
	}

	// Toggle option selection
	function toggleOption(optionValue: string) {
		if (disabled || loading) return;

		const option = normalizedOptions.find((o) => o.value === optionValue);
		if (option?.disabled) return;

		let newValue: string[];
		if (currentValue.includes(optionValue)) {
			// Remove option
			newValue = currentValue.filter((v) => v !== optionValue);
		} else {
			// Check max selection limit
			if (isMaxReached) return;
			// Add option
			newValue = [...currentValue, optionValue];
		}

		updateValue(newValue);
	}

	// Remove a selected option
	function removeOption(optionValue: string, event: MouseEvent) {
		event.stopPropagation();
		if (disabled || loading) return;
		const newValue = currentValue.filter((v) => v !== optionValue);
		updateValue(newValue);
	}

	// Clear all selections
	function clearAll(event: MouseEvent) {
		event.stopPropagation();
		if (disabled || loading) return;
		updateValue([]);
	}

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (disabled || loading) return;

		switch (event.key) {
			case 'Enter':
			case ' ':
				if (!searchable || event.key === 'Enter') {
					event.preventDefault();
					if (!isOpen) {
						openDropdown();
					} else if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
						toggleOption(filteredOptions[focusedIndex].value);
					}
				}
				break;
			case 'Escape':
				event.preventDefault();
				closeDropdown();
				break;
			case 'ArrowDown':
				event.preventDefault();
				if (!isOpen) {
					openDropdown();
				} else {
					focusedIndex = Math.min(focusedIndex + 1, filteredOptions.length - 1);
				}
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (isOpen) {
					focusedIndex = Math.max(focusedIndex - 1, 0);
				}
				break;
			case 'Home':
				event.preventDefault();
				if (isOpen) {
					focusedIndex = 0;
				}
				break;
			case 'End':
				event.preventDefault();
				if (isOpen) {
					focusedIndex = filteredOptions.length - 1;
				}
				break;
			case 'Backspace':
				if (searchable && searchQuery === '' && currentValue.length > 0) {
					const lastValue = currentValue[currentValue.length - 1];
					toggleOption(lastValue);
				}
				break;
		}
	}

	// Handle click outside
	function handleClickOutside(event: MouseEvent) {
		if (containerRef && !containerRef.contains(event.target as Node)) {
			closeDropdown();
		}
	}

	// Handle focus events
	function handleFocus(event: FocusEvent) {
		onfocus?.(event);
	}

	function handleBlur(event: FocusEvent) {
		// Delay blur to allow click events on dropdown items
		setTimeout(() => {
			if (containerRef && !containerRef.contains(document.activeElement)) {
				closeDropdown();
				onblur?.(event);
			}
		}, 150);
	}

	// Scroll focused option into view
	$effect(() => {
		if (isOpen && focusedIndex >= 0 && listboxRef) {
			const focusedElement = listboxRef.children[focusedIndex] as HTMLElement;
			focusedElement?.scrollIntoView({ block: 'nearest' });
		}
	});

	// Add/remove click outside listener
	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<div class="form-control {widthClasses} {alignClasses}">
	{#if label}
		<label for={fieldId} class={labelClasses}>
			<span class="label-text">
				{label}
				{#if required}
					<span class="text-error ml-1" aria-label="required">*</span>
				{/if}
			</span>
		</label>
	{/if}

	<div class={containerClasses} bind:this={containerRef}>
		<!-- Hidden input for form submission -->
		{#each currentValue as val}
			<input type="hidden" {name} value={val} />
		{/each}

		<!-- Main clickable container -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			id={fieldId}
			role="combobox"
			aria-expanded={isOpen}
			aria-haspopup="listbox"
			aria-controls={isOpen ? listboxId : undefined}
			aria-label={ariaLabel || label || placeholder}
			aria-describedby={ariaDescribedby}
			aria-invalid={error ? 'true' : undefined}
			aria-required={required}
			aria-disabled={disabled}
			aria-busy={loading}
			tabindex={disabled ? -1 : 0}
			class={inputContainerClasses}
			onclick={toggleDropdown}
			onkeydown={handleKeydown}
			onfocus={handleFocus}
			onblur={handleBlur}
		>
			<!-- Selected tags -->
			{#each selectedOptions as option (option.value)}
				<span class={tagClasses}>
					{option.label}
					{#if !disabled && !loading}
						<button
							type="button"
							class="btn btn-ghost btn-xs h-auto min-h-0 p-0"
							aria-label="Remove {option.label}"
							onclick={(e) => removeOption(option.value, e)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3 w-3"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					{/if}
				</span>
			{/each}

			<!-- Search input or placeholder -->
			{#if searchable && isOpen}
				<input
					bind:this={searchInputRef}
					type="text"
					class="min-w-[60px] flex-1 border-none bg-transparent outline-none focus:ring-0"
					placeholder={selectedOptions.length === 0 ? placeholder : 'Search...'}
					bind:value={searchQuery}
					onclick={(e) => e.stopPropagation()}
					onkeydown={handleKeydown}
				/>
			{:else if selectedOptions.length === 0}
				<span class="text-base-content/50">{placeholder}</span>
			{/if}

			<!-- Right side controls -->
			<div class="ml-auto flex items-center gap-1">
				{#if loading}
					<span class="loading loading-spinner {loadingSizeClass} text-primary" aria-hidden="true"
					></span>
				{:else}
					{#if clearable && currentValue.length > 0 && !disabled}
						<button
							type="button"
							class="btn btn-ghost btn-xs h-auto min-h-0 p-0"
							aria-label="Clear all selections"
							onclick={clearAll}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					{/if}
					<!-- Dropdown arrow -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 transition-transform {isOpen ? 'rotate-180' : ''}"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</div>
		</div>

		<!-- Dropdown -->
		{#if isOpen}
			<ul
				bind:this={listboxRef}
				id={listboxId}
				role="listbox"
				aria-multiselectable="true"
				aria-label={label || ariaLabel || 'Options'}
				class={dropdownClasses}
			>
				{#if filteredOptions.length === 0}
					<li class="text-base-content/50 px-4 py-2 text-center">No options found</li>
				{:else}
					{#each filteredOptions as option, index (option.value)}
						{@const isSelected = currentValue.includes(option.value)}
						{@const isDisabled = option.disabled || (isMaxReached && !isSelected)}
						{@const isFocused = focusedIndex === index}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<li
							role="option"
							aria-selected={isSelected}
							aria-disabled={isDisabled}
							tabindex={-1}
							class="flex cursor-pointer items-center gap-2 px-4 py-2 transition-colors
								{isFocused ? 'bg-base-200' : ''}
								{isSelected ? 'bg-primary/10' : ''}
								{isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-base-200'}"
							onclick={() => !isDisabled && toggleOption(option.value)}
							onmouseenter={() => (focusedIndex = index)}
						>
							<input
								type="checkbox"
								class="checkbox checkbox-sm {variant ? `checkbox-${variant}` : 'checkbox-primary'}"
								checked={isSelected}
								disabled={isDisabled}
								tabindex={-1}
								onclick={(e) => e.stopPropagation()}
								onchange={() => !isDisabled && toggleOption(option.value)}
							/>
							<span class="flex-1">{option.label}</span>
							{#if isSelected}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-primary h-4 w-4"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							{/if}
						</li>
					{/each}
				{/if}
			</ul>
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
