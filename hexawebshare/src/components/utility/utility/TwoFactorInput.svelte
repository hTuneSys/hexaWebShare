<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { tick } from 'svelte';

	/**
	 * Props interface for the TwoFactorInput component
	 */
	interface Props {
		/**
		 * Number of input digits
		 * @default 6
		 */
		length?: number;
		/**
		 * The complete code value ($bindable)
		 */
		value?: string;
		/**
		 * Input type
		 * @default 'numeric'
		 */
		type?: 'numeric' | 'alphanumeric';
		/**
		 * Alignment of the inputs
		 * @default 'start'
		 */
		position?: 'start' | 'center' | 'end';
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
		 * Error message to display
		 */
		error?: string;
		/**
		 * Whether the input is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Label text for the component
		 */
		label?: string;
		/**
		 * Helper text or description
		 */
		helpText?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * HTML name attribute for form submission
		 */
		name?: string;
		/**
		 * Additional CSS classes for the container
		 */
		class?: string;
		/**
		 * Event triggered when all digits are filled
		 * @param code The complete code
		 */
		oncomplete?: (code: string) => void;
		/**
		 * Change event handler
		 */
		onchange?: (code: string) => void;
	}

	let {
		length = 6,
		value = $bindable(''),
		type = 'numeric',
		position = 'start',
		variant,
		size = 'md',
		disabled = false,
		error,
		loading = false,
		label,
		helpText,
		ariaLabel,
		name,
		class: className = '',
		oncomplete,
		onchange
	}: Props = $props();

	// Computed arrays for rendering
	let indices = $derived(Array.from({ length }, (_, i) => i));

	// Derived classes
	let containerClasses = $derived(
		[
			'form-control w-full',
			position === 'center' && 'items-center justify-center',
			position === 'end' && 'items-end justify-end',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	let groupClasses = $derived(
		[
			'flex flex-wrap items-center gap-2',
			position === 'center' && 'justify-center',
			position === 'end' && 'justify-end'
		]
			.filter(Boolean)
			.join(' ')
	);

	let inputClasses = $derived(
		[
			'input',
			'input-bordered',
			'text-center',
			'p-0',
			variant === 'primary' && 'input-primary',
			variant === 'secondary' && 'input-secondary',
			variant === 'accent' && 'input-accent',
			variant === 'info' && 'input-info',
			variant === 'success' && 'input-success',
			variant === 'warning' && 'input-warning',
			variant === 'error' && 'input-error',
			error && 'input-error',
			size === 'xs' && 'input-xs w-8 h-8',
			size === 'sm' && 'input-sm w-10 h-10',
			size === 'md' && 'input-md w-12 h-12',
			size === 'lg' && 'input-lg w-14 h-14'
		]
			.filter(Boolean)
			.join(' ')
	);

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

	let loadingSizeClass = $derived(
		size === 'xs'
			? 'loading-xs'
			: size === 'sm'
				? 'loading-sm'
				: size === 'lg'
					? 'loading-lg'
					: 'loading-md'
	);

	/**
	 * Get digit at index
	 */
	function getDigit(index: number): string {
		return value?.charAt(index) || '';
	}

	/**
	 * Update a digit at index
	 */
	function setDigit(index: number, char: string) {
		const current = value || '';
		let newVal = current.padEnd(length, ' ').split('');
		newVal[index] = char || ' ';
		value = newVal.join('').trimEnd();
		onchange?.(value);

		if (value.length === length && !value.includes(' ')) {
			oncomplete?.(value);
		}
	}

	/**
	 * Handle input for a digit
	 */
	async function handleInput(index: number, event: Event) {
		const input = event.target as HTMLInputElement;
		const char = input.value.slice(-1);

		// Validation
		const isNumeric = /^\d$/.test(char);
		const isAlpha = /^[a-zA-Z]$/.test(char);
		const isValid = type === 'numeric' ? isNumeric : isNumeric || isAlpha;

		if (char !== '' && !isValid) {
			input.value = getDigit(index);
			return;
		}

		setDigit(index, char);

		if (char !== '' && index < length - 1) {
			const next = input.nextElementSibling as HTMLInputElement;
			if (next) {
				next.focus();
				await tick();
				next.select();
			}
		}
	}

	/**
	 * Handle keydown for deletion and navigation
	 */
	function handleKeydown(index: number, event: KeyboardEvent) {
		const input = event.target as HTMLInputElement;

		if (event.key === 'Backspace') {
			if (getDigit(index) === '' && index > 0) {
				const prev = input.previousElementSibling as HTMLInputElement;
				if (prev) {
					prev.focus();
					prev.select();
				}
			} else {
				setDigit(index, '');
			}
		} else if (event.key === 'ArrowLeft' && index > 0) {
			const prev = input.previousElementSibling as HTMLInputElement;
			if (prev) {
				event.preventDefault();
				prev.focus();
				prev.select();
			}
		} else if (event.key === 'ArrowRight' && index < length - 1) {
			const next = input.nextElementSibling as HTMLInputElement;
			if (next) {
				event.preventDefault();
				next.focus();
				next.select();
			}
		}
	}

	/**
	 * Handle paste
	 */
	function handlePaste(event: ClipboardEvent) {
		event.preventDefault();
		if (disabled || loading) return;

		const pastedData = event.clipboardData?.getData('text') || '';
		const pattern = type === 'numeric' ? /[^0-9]/g : /[^a-zA-Z0-9]/g;
		const pastedChars = pastedData.replace(pattern, '').slice(0, length);

		value = pastedChars;
		onchange?.(value);

		if (value.length === length) {
			oncomplete?.(value);
		}

		// Focus appropriate box
		const lastIndex = Math.min(value.length, length - 1);
		const inputs = (event.currentTarget as HTMLElement).querySelectorAll('input');
		inputs[lastIndex]?.focus();
	}
</script>

<div class={containerClasses}>
	{#if label}
		<label class={labelClasses} for={undefined}>
			<span class="label-text">{label}</span>
		</label>
	{/if}

	<div class="relative">
		<div
			class={groupClasses}
			role="group"
			aria-label={ariaLabel || label || 'Two-factor code'}
			onpaste={handlePaste}
		>
			{#each indices as i (i)}
				<input
					type="text"
					inputmode={type === 'numeric' ? 'numeric' : 'text'}
					autocomplete="one-time-code"
					maxlength="1"
					class={inputClasses}
					value={getDigit(i)}
					{disabled}
					oninput={(e) => handleInput(i, e)}
					onkeydown={(e) => handleKeydown(i, e)}
					aria-label={`Digit ${i + 1}`}
					aria-invalid={error ? 'true' : undefined}
					aria-disabled={disabled}
					aria-busy={loading}
					readonly={loading}
				/>
			{/each}
		</div>

		{#if loading}
			<div class="bg-base-100/50 absolute inset-0 flex items-center justify-center rounded-lg">
				<span class="loading loading-spinner {loadingSizeClass} text-primary" aria-label="Loading"
				></span>
			</div>
		{/if}
	</div>

	{#if error}
		<div class={labelClasses}>
			<span class="label-text-alt text-error" role="alert">{error}</span>
		</div>
	{/if}

	{#if helpText && !error}
		<div class={labelClasses}>
			<span class="label-text-alt text-base-content/70">{helpText}</span>
		</div>
	{/if}

	{#if name}
		<input type="hidden" {name} {value} />
	{/if}
</div>
