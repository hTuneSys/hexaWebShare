<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the GlobalSearchBar component
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
		 * Whether to show search results dropdown
		 * @default false
		 */
		showResults?: boolean;
		/**
		 * Whether the results dropdown is open
		 * @default false
		 */
		open?: boolean;
		/**
		 * Default open state for uncontrolled mode
		 * @default false
		 */
		defaultOpen?: boolean;
		/**
		 * Whether to enable keyboard shortcut (Cmd/Ctrl+K) to open search
		 * @default true
		 */
		enableKeyboardShortcut?: boolean;
		/**
		 * Custom keyboard shortcut key combination
		 * @default 'k'
		 */
		shortcutKey?: string;
		/**
		 * Custom search results content
		 */
		results?: Snippet;
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
		 * Open change event handler (triggered when dropdown opens/closes)
		 */
		onOpenChange?: (open: boolean) => void;
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
		showResults = false,
		open,
		defaultOpen = false,
		enableKeyboardShortcut = true,
		shortcutKey = 'k',
		results,
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
		onOpenChange,
		class: className = ''
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `global-search-${Math.random().toString(36).substring(2, 11)}`);
	let labelForId = $derived(label ? fieldId : undefined);
	let resultsId = $derived(`${fieldId}-results`);

	// Controlled vs uncontrolled state
	const isControlled = open !== undefined;
	let internalOpen = $state(defaultOpen);
	let isOpen = $derived(open ?? internalOpen);

	// Element references
	let searchContainer = $state<HTMLDivElement | null>(null);
	let inputElement = $state<HTMLInputElement | null>(null);
	let resultsElement = $state<HTMLDivElement | null>(null);

	// Debounce timer reference
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	// Cleanup debounce timer on component destroy
	onDestroy(() => {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}
	});

	// Set open state
	function setOpen(next: boolean) {
		if (disabled) return;
		if (!isControlled) {
			internalOpen = next;
		}
		onOpenChange?.(next);
	}

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
			error !== undefined && error !== '' && 'input-error'
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

	// Results dropdown classes
	let resultsClasses = $derived(
		[
			'absolute',
			'top-full',
			'left-0',
			'right-0',
			'mt-2',
			'bg-base-100',
			'border',
			'border-base-300',
			'rounded-box',
			'shadow-lg',
			'z-50',
			'max-h-96',
			'overflow-y-auto',
			size === 'xs' && 'text-xs p-2',
			size === 'sm' && 'text-sm p-3',
			size === 'md' && 'text-base p-4',
			size === 'lg' && 'text-lg p-5'
		]
			.filter(Boolean)
			.join(' ')
	);

	/**
	 * Handle search action
	 */
	function handleSearch() {
		if (!disabled && onsearch) {
			onsearch(value);
		}
		if (showResults && value) {
			setOpen(true);
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
		if (showResults) {
			setOpen(false);
		}
		inputElement?.focus();
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

		// Auto-open results when typing if showResults is enabled
		if (showResults && value && !isOpen) {
			setOpen(true);
		}
	}

	/**
	 * Handle keydown event for Enter key and Escape
	 */
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !disabled) {
			event.preventDefault();
			handleSearch();
		}
		if (event.key === 'Escape') {
			if (isOpen && showResults) {
				event.preventDefault();
				setOpen(false);
				inputElement?.focus();
			} else if (value) {
				event.preventDefault();
				handleClear();
			}
		}
		// Arrow keys for results navigation (if results are shown)
		if (showResults && isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
			event.preventDefault();
			// Focus management can be handled by parent component
		}
	}

	/**
	 * Handle focus event
	 */
	function handleFocus(event: Event) {
		if (onfocus) {
			onfocus(event);
		}
		if (showResults && value) {
			setOpen(true);
		}
	}

	/**
	 * Handle blur event (with delay to allow clicking on results)
	 */
	let blurTimer: ReturnType<typeof setTimeout> | null = null;
	function handleBlur(event: Event) {
		if (onblur) {
			onblur(event);
		}
		// Delay closing to allow clicking on results
		blurTimer = setTimeout(() => {
			if (showResults) {
				setOpen(false);
			}
		}, 200);
	}

	// Close results when clicking outside
	$effect(() => {
		if (!isOpen || !showResults || !searchContainer) return;

		function handlePointerDown(event: PointerEvent) {
			const target = event.target as Node;
			if (!searchContainer?.contains(target)) {
				setOpen(false);
			}
		}

		document.addEventListener('pointerdown', handlePointerDown);
		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
		};
	});

	// Keyboard shortcut handler (Cmd/Ctrl+K)
	$effect(() => {
		if (!enableKeyboardShortcut || disabled) return;

		function handleKeyboardShortcut(event: KeyboardEvent) {
			const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
			const modifierKey = isMac ? event.metaKey : event.ctrlKey;

			if (modifierKey && event.key.toLowerCase() === shortcutKey.toLowerCase()) {
				event.preventDefault();
				inputElement?.focus();
				if (showResults) {
					setOpen(true);
				}
			}
		}

		document.addEventListener('keydown', handleKeyboardShortcut);
		return () => {
			document.removeEventListener('keydown', handleKeyboardShortcut);
		};
	});

	// Cleanup blur timer
	onDestroy(() => {
		if (blurTimer) {
			clearTimeout(blurTimer);
		}
	});
</script>

<div class="form-control w-full {className}" bind:this={searchContainer}>
	{#if label}
		<label for={labelForId} class={labelClasses}>
			<span class="label-text">{label}</span>
		</label>
	{/if}

	<div class="relative">
		<!-- Search Icon -->
		<div
			class="text-base-content/50 pointer-events-none absolute top-1/2 -translate-y-1/2 {iconLeftClass}"
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
			bind:this={inputElement}
			{name}
			bind:value
			{placeholder}
			{disabled}
			{maxlength}
			class={inputClasses}
			aria-label={ariaLabel || label || 'Global search'}
			aria-invalid={error !== undefined && error !== '' ? 'true' : undefined}
			aria-disabled={disabled}
			aria-busy={loading}
			role={showResults ? 'combobox' : undefined}
			aria-expanded={showResults ? isOpen : undefined}
			aria-controls={showResults ? resultsId : undefined}
			aria-haspopup={showResults ? 'listbox' : undefined}
			onkeydown={handleKeydown}
			oninput={handleInput}
			{onchange}
			onblur={handleBlur}
			onfocus={handleFocus}
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

		<!-- Search Results Dropdown -->
		{#if showResults && isOpen && (value || results)}
			<div
				id={resultsId}
				bind:this={resultsElement}
				class={resultsClasses}
				role="listbox"
				aria-label="Search results"
				onpointerdown={(e) => e.preventDefault()}
			>
				{#if results}
					{@render results()}
				{:else}
					<div class="text-base-content/60 p-4 text-center">
						<p class="text-sm">No results found</p>
						<p class="mt-1 text-xs">Try a different search term</p>
					</div>
				{/if}
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

<style>
	/* Hide native browser search clear button for consistent UX */
	input[type='search']::-webkit-search-decoration,
	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-results-button,
	input[type='search']::-webkit-search-results-decoration {
		-webkit-appearance: none;
		appearance: none;
		display: none;
	}

	/* Firefox */
	input[type='search']::-moz-search-clear-button {
		display: none;
	}
</style>
