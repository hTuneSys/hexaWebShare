<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Badge from '../../core/media/Badge.svelte';
	import FormWrapper from '../../core/forms/FormWrapper.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Input from '../../core/forms/Input.svelte';
	import Row from '../../core/layout/Row.svelte';
	import Icon from '../../core/media/Icon.svelte';
	import X from 'lucide-svelte/icons/x';

	/**
	 * Props interface for the TagInput component
	 */
	interface Props {
		/**
		 * Array of tags
		 * @default []
		 */
		tags?: string[];
		/**
		 * Current input value
		 * @default ''
		 */
		value?: string;
		/**
		 * Color variant of the input
		 * @default undefined (default DaisyUI input style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the component
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Color variant for tags (badges)
		 * @default 'neutral'
		 */
		tagVariant?:
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
		 * Whether tags should have outline style
		 * @default false
		 */
		outline?: boolean;
		/**
		 * Whether the input is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the input is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Whether the component is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Error message to display
		 */
		error?: string;
		/**
		 * Maximum number of tags allowed
		 */
		maxTags?: number;
		/**
		 * Minimum number of tags required
		 */
		minTags?: number;
		/**
		 * Maximum length of each tag
		 * @default 50
		 */
		maxTagLength?: number;
		/**
		 * Whether duplicate tags are allowed
		 * @default false
		 */
		allowDuplicates?: boolean;
		/**
		 * Label text for the input
		 */
		label?: string;
		/**
		 * Placeholder text
		 * @default 'Add a tag...'
		 */
		placeholder?: string;
		/**
		 * Helper text or description
		 */
		helpText?: string;
		/**
		 * Error text when max tags limit is reached
		 * @default 'Maximum tags limit reached'
		 */
		maxTagsErrorText?: string;
		/**
		 * Error text when min tags requirement is not met
		 * @default 'Minimum tags required not met'
		 */
		minTagsErrorText?: string;
		/**
		 * Error text when duplicate tag is entered
		 * @default 'Tag already exists'
		 */
		duplicateTagErrorText?: string;
		/**
		 * Aria label for remove tag button
		 * @default 'Remove tag'
		 */
		removeTagAriaLabel?: string;
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
		 * Tag add event handler
		 */
		ontagadd?: (tag: string) => void;
		/**
		 * Tag remove event handler
		 */
		ontagremove?: (tag: string) => void;
		/**
		 * Tags change event handler
		 */
		onchange?: (tags: string[]) => void;
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
		 * Width of the component
		 * @default 'full'
		 */
		width?: 'full' | 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Horizontal alignment
		 * @default undefined (no alignment wrapper)
		 */
		align?: 'left' | 'center' | 'right';
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		tags = [],
		value = '',
		variant,
		size = 'md',
		tagVariant = 'neutral',
		outline = false,
		disabled = false,
		required = false,
		loading = false,
		error,
		maxTags,
		minTags,
		maxTagLength = 50,
		allowDuplicates = false,
		label,
		placeholder = 'Add a tag...',
		helpText,
		maxTagsErrorText = 'Maximum tags limit reached',
		minTagsErrorText = 'Minimum tags required not met',
		duplicateTagErrorText = 'Tag already exists',
		removeTagAriaLabel = 'Remove tag',
		id,
		name,
		ariaLabel,
		ariaDescribedby,
		ontagadd,
		ontagremove,
		onchange,
		oninput,
		onblur,
		onfocus,
		width = 'full',
		align,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `tag-input-${Math.random().toString(36).substring(2, 11)}`);

	// Internal state
	let inputValue = $state(value);
	let internalTags = $state<string[]>([...tags]);
	let internalError = $state<string | undefined>(undefined);
	let inputElement: HTMLInputElement | null = $state(null);

	// Sync external value with internal state
	$effect(() => {
		inputValue = value;
	});

	// Sync external tags with internal state
	$effect(() => {
		internalTags = [...tags];
	});

	/**
	 * Centralized validation for the current state of tags
	 */
	function validateTags(currentTags: string[] = internalTags) {
		if (minTags !== undefined && currentTags.length < minTags) {
			internalError = minTagsErrorText;
		} else {
			internalError = undefined;
		}
	}

	// Add a new tag
	function addTag(tagValue: string) {
		let trimmedTag = tagValue.trim();
		if (!trimmedTag) return;

		// Truncate tag if too long
		if (maxTagLength && trimmedTag.length > maxTagLength) {
			trimmedTag = trimmedTag.substring(0, maxTagLength);
		}

		// Check max tags limit (prevents adding)
		if (maxTags !== undefined && internalTags.length >= maxTags) {
			internalError = maxTagsErrorText;
			return;
		}

		// Check for duplicates (prevents adding)
		if (!allowDuplicates && internalTags.includes(trimmedTag)) {
			internalError = duplicateTagErrorText;
			return;
		}

		// Add tag
		internalTags = [...internalTags, trimmedTag];
		inputValue = '';

		// Validate state after adding
		validateTags(internalTags);

		// Trigger events
		ontagadd?.(trimmedTag);
		onchange?.(internalTags);
	}

	// Remove a tag by index
	function removeTag(index: number) {
		if (disabled || loading) return;

		// Check min tags limit (prevents removing if at or below limit)
		if (minTags !== undefined && internalTags.length <= minTags) {
			internalError = minTagsErrorText;
			return;
		}

		const removedTag = internalTags[index];
		internalTags = internalTags.filter((_, i) => i !== index);

		// Trigger events
		ontagremove?.(removedTag);
		onchange?.(internalTags);

		// Validate state after removal
		validateTags(internalTags);

		// Focus input after removing
		inputElement?.focus();
	}

	// Handle keydown events
	function handleKeydown(event: KeyboardEvent) {
		if (disabled || loading) return;

		if (event.key === 'Enter' || event.key === ',') {
			event.preventDefault();
			addTag(inputValue);
		} else if (event.key === 'Backspace' && inputValue === '' && internalTags.length > 0) {
			removeTag(internalTags.length - 1);
		}
	}

	// Handle input change
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		inputValue = target.value;

		// Clear transient errors when typing, but keep state-based errors like minTags
		if (internalError === maxTagsErrorText || internalError === duplicateTagErrorText) {
			internalError = undefined;
		}

		oninput?.(event);
	}

	// Handle blur
	function handleBlur(event: Event) {
		// Add tag on blur if there's a value
		if (inputValue.trim()) {
			addTag(inputValue);
		}

		// Final validation on blur
		validateTags();

		onblur?.(event);
	}

	// Computed error - use external error or internal error
	let displayError = $derived(error || internalError);

	// Input container classes
	let containerClasses = $derived(
		[
			'flex',
			'flex-wrap',
			'items-center',
			'gap-2',
			'border',
			'border-base-300',
			'rounded-btn',
			'px-3',
			'min-h-fit',
			'h-auto',
			'py-2',
			'bg-base-100',
			'overflow-hidden',
			'focus-within:border-primary',
			'focus-within:outline-none',
			variant === 'primary' && 'border-primary',
			variant === 'secondary' && 'border-secondary',
			variant === 'accent' && 'border-accent',
			variant === 'info' && 'border-info',
			variant === 'success' && 'border-success',
			variant === 'warning' && 'border-warning',
			variant === 'error' && 'border-error',
			size === 'xs' && 'min-h-6 text-xs',
			size === 'sm' && 'min-h-8 text-sm',
			size === 'md' && 'min-h-12 text-base',
			size === 'lg' && 'min-h-16 text-lg',
			displayError !== undefined && displayError !== '' && 'border-error',
			disabled && 'opacity-50 cursor-not-allowed bg-base-200',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Input classes
	let inputClasses = $derived(
		[
			'flex-1',
			'min-w-20',
			'bg-transparent',
			'border-none',
			'outline-none',
			'shadow-none',
			'focus:outline-none',
			'focus:ring-0',
			'focus:border-none',
			'focus:shadow-none',
			size === 'xs' && 'text-xs',
			size === 'sm' && 'text-sm',
			size === 'md' && 'text-base',
			size === 'lg' && 'text-lg'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Badge size mapping
	let badgeSize = $derived(size);

	// Width class
	let widthClass = $derived(
		width === 'full'
			? 'w-full'
			: width === 'auto'
				? 'w-auto'
				: width === 'xs'
					? 'w-48'
					: width === 'sm'
						? 'w-64'
						: width === 'md'
							? 'w-80'
							: width === 'lg'
								? 'w-96'
								: width === 'xl'
									? 'w-[32rem]'
									: 'w-full'
	);

	// Align class
	let alignClass = $derived(
		align === 'left'
			? 'justify-start'
			: align === 'center'
				? 'justify-center'
				: align === 'right'
					? 'justify-end'
					: ''
	);

	// Whether to show align wrapper
	let showAlignWrapper = $derived(align !== undefined);
</script>

{#snippet tagInputContent()}
	<!-- 
		NOTE: Raw HTML div is intentional here.
		Reason: This is a structural container with no semantic or interactive behavior.
		No suitable library component exists for generic layout wrappers.
	-->
	<div class={containerClasses} {...props}>
		{#each internalTags as tag, index (tag + index)}
			<Row inline gap="1" align="center" class="max-w-full">
				<Badge
					label={tag}
					variant={tagVariant}
					size={badgeSize}
					{outline}
					class="max-w-[150px] truncate"
				/>
				{#if !disabled && !loading}
					<Button
						ariaLabel="{removeTagAriaLabel}: {tag}"
						onclick={() => removeTag(index)}
						class="text-base-content/70 hover:text-base-content ml-2 inline-flex h-auto min-h-0 min-w-0 border-none bg-transparent p-0 transition-colors hover:bg-transparent"
					>
						<Icon size="xs" ariaHidden={true}>
							<X />
						</Icon>
					</Button>
				{/if}
			</Row>
		{/each}

		<Input
			unstyled
			type="text"
			id={fieldId}
			{name}
			value={inputValue}
			{placeholder}
			disabled={disabled || loading}
			class={inputClasses}
			ariaLabel={ariaLabel || (label ? undefined : placeholder)}
			{ariaDescribedby}
			{required}
			error={displayError}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onblur={handleBlur}
			{onfocus}
		/>
	</div>

	{#if name}
		<Input type="hidden" name="{name}_tags" value={internalTags.join(',')} />
	{/if}
{/snippet}

{#snippet formWrapper()}
	<FormWrapper
		id={fieldId}
		{label}
		error={displayError}
		{helpText}
		{required}
		{disabled}
		{size}
		{loading}
		labelFor={fieldId}
		hasError={displayError !== undefined && displayError !== ''}
		class={widthClass}
	>
		{@render tagInputContent()}
	</FormWrapper>
{/snippet}

{#if showAlignWrapper}
	<!-- 
		NOTE: Raw HTML div is used here instead of a library component.
		Reason: This is a layout wrapper for the specific 'align' feature.
		No suitable library component exists that provides this specific flex alignment wrapper without adding unwanted styles.
	-->
	<div class="flex h-full min-h-[200px] w-full {alignClass}">
		{@render formWrapper()}
	</div>
{:else}
	{@render formWrapper()}
{/if}
