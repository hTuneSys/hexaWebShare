<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { onDestroy } from 'svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import Label from '../data-display/Label.svelte';
	import Spinner from '../feedback/Spinner.svelte';
	import Text from '../typography/Text.svelte';
	import Icon from '../media/Icon.svelte';
	import Search from 'lucide-svelte/icons/search';
	import X from 'lucide-svelte/icons/x';

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
		/**
		 * Accessible label for search input when no label is provided
		 * @default 'Search'
		 */
		searchAriaLabel?: string;
		/**
		 * Accessible label for loading/searching state
		 * @default 'Searching'
		 */
		searchingLabel?: string;
		/**
		 * Accessible label for clear button
		 * @default 'Clear search'
		 */
		clearLabel?: string;
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
		searchAriaLabel = 'Search',
		searchingLabel = 'Searching',
		clearLabel = 'Clear search',
		onsearch,
		onclear,
		oninput,
		onchange,
		onblur,
		onfocus,
		class: className = ''
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `search-input-${Math.random().toString(36).substring(2, 11)}`);
	let labelForId = $derived(label ? fieldId : undefined);

	// Debounce timer reference
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	// Cleanup debounce timer on component destroy to prevent memory leaks
	onDestroy(() => {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}
	});

	// Input classes using static DaisyUI classes
	let inputClasses = $derived(
		[
			'input',
			'input-bordered',
			'bg-base-200/40',
			'transition-all duration-200 ease-in-out',
			'focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5',
			'w-full',
			'pl-10',
			showClearButton && value ? 'pr-10' : 'pr-4',
			variant === 'primary' && 'input-primary focus:ring-primary/10',
			variant === 'secondary' && 'input-secondary focus:ring-secondary/10',
			variant === 'accent' && 'input-accent focus:ring-accent/10',
			variant === 'info' && 'input-info focus:ring-info/10',
			variant === 'success' && 'input-success focus:ring-success/10',
			variant === 'warning' && 'input-warning focus:ring-warning/10',
			variant === 'error' && 'input-error focus:ring-error/10',
			size === 'xs' && 'input-xs',
			size === 'sm' && 'input-sm',
			size === 'md' && 'input-md',
			size === 'lg' && 'input-lg',
			error !== undefined && error !== '' && 'input-error focus:ring-error/10'
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

	// Loading spinner size
	let spinnerSize = $derived(size);

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

<div class="form-control w-full {className}">
	{#if label}
		<Label text={label} for={labelForId} {size} />
	{/if}

	<div class="relative">
		<!-- Search Icon -->
		<div
			class="text-base-content/50 pointer-events-none absolute top-1/2 -translate-y-1/2 {iconLeftClass}"
			aria-hidden="true"
		>
			<Icon {size} ariaHidden={true}>
				<Search />
			</Icon>
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
			aria-label={ariaLabel || label || searchAriaLabel}
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
		<div class="absolute top-1/2 z-10 -translate-y-1/2 {iconRightClass}">
			{#if loading}
				<Spinner size={spinnerSize} class="text-base-content/50" ariaLabel={searchingLabel} />
			{:else if showClearButton && value}
				<IconButton
					variant="ghost"
					circle
					{size}
					onclick={handleClear}
					{disabled}
					ariaLabel={clearLabel}
					class="h-8 min-h-0 w-8 p-0"
				>
					<Icon {size} ariaHidden={true}>
						<X />
					</Icon>
				</IconButton>
			{/if}
		</div>
	</div>

	{#if error && error !== ''}
		<div class={labelClasses}>
			<div role="alert" aria-live="polite">
				<Text text={error} size="xs" variant="error" class="label-text-alt" />
			</div>
		</div>
	{/if}

	{#if helpText && (!error || error === '')}
		<div class={labelClasses}>
			<Text text={helpText} size="xs" variant="muted" class="label-text-alt" />
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
