<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	/**
	 * Step item data structure
	 */
	export interface StepItem {
		/**
		 * Unique identifier for the step
		 */
		id?: string | number;
		/**
		 * Display label for the step
		 */
		label: string;
		/**
		 * Optional description for the step
		 */
		description?: string;
		/**
		 * Whether this step is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether this step is the current/active step
		 * @default false
		 */
		current?: boolean;
		/**
		 * Whether this step is completed
		 * @default false
		 */
		completed?: boolean;
		/**
		 * Optional icon to display in the step
		 */
		icon?: string;
		/**
		 * Callback when step is clicked
		 */
		onclick?: (item: StepItem, index: number) => void;
	}
</script>

<script lang="ts">
	/**
	 * Props interface for the Steps component
	 */
	interface Props {
		/**
		 * Array of step items to display
		 */
		items: StepItem[];
		/**
		 * Orientation of the steps
		 * @default 'horizontal'
		 */
		orientation?: 'horizontal' | 'vertical';
		/**
		 * Color variant for completed and current steps
		 * @default 'primary'
		 */
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		/**
		 * Size variant of the steps
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the steps are disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the steps are in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether steps are clickable
		 * @default false
		 */
		clickable?: boolean;
		/**
		 * Accessible label for the steps navigation
		 * @default 'Steps navigation'
		 */
		ariaLabel?: string;
		/**
		 * ID of the element that labels this steps
		 */
		ariaLabelledby?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		items,
		orientation = 'horizontal',
		variant = 'primary',
		size = 'md',
		disabled = false,
		loading = false,
		clickable = false,
		ariaLabel = 'Steps navigation',
		ariaLabelledby,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID for accessibility
	const stepsId = crypto.randomUUID?.() ?? `steps-${Math.random().toString(36).slice(2, 9)}`;

	// Computed container classes
	let containerClasses = $derived(
		[
			'steps',
			orientation === 'horizontal' && 'steps-horizontal',
			orientation === 'vertical' && 'steps-vertical',
			size === 'xs' && 'text-xs',
			size === 'sm' && 'text-sm',
			size === 'md' && 'text-base',
			size === 'lg' && 'text-lg',
			disabled && 'opacity-50 pointer-events-none',
			loading && 'opacity-75',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Get step state
	const getStepState = (item: StepItem, index: number): 'completed' | 'current' | 'pending' => {
		if (item.completed) return 'completed';
		if (item.current) return 'current';
		// Auto-detect: if previous item is completed, this might be current
		if (index > 0 && items[index - 1]?.completed && !item.completed && !item.current) {
			// Check if this is the first non-completed step
			const allPreviousCompleted = items.slice(0, index).every((i) => i.completed);
			if (allPreviousCompleted) return 'current';
		}
		return 'pending';
	};

	// Get step classes based on variant and state
	const getStepClasses = (item: StepItem, index: number): string => {
		const isDisabled = item.disabled || disabled;
		const state = getStepState(item, index);

		return [
			'step',
			!isDisabled && state === 'completed' && variant === 'primary' && 'step-primary',
			!isDisabled && state === 'completed' && variant === 'secondary' && 'step-secondary',
			!isDisabled && state === 'completed' && variant === 'accent' && 'step-accent',
			!isDisabled && state === 'completed' && variant === 'neutral' && 'step-neutral',
			!isDisabled && state === 'completed' && variant === 'info' && 'step-info',
			!isDisabled && state === 'completed' && variant === 'success' && 'step-success',
			!isDisabled && state === 'completed' && variant === 'warning' && 'step-warning',
			!isDisabled && state === 'completed' && variant === 'error' && 'step-error',
			!isDisabled && state === 'current' && variant === 'primary' && 'step-primary',
			!isDisabled && state === 'current' && variant === 'secondary' && 'step-secondary',
			!isDisabled && state === 'current' && variant === 'accent' && 'step-accent',
			!isDisabled && state === 'current' && variant === 'neutral' && 'step-neutral',
			!isDisabled && state === 'current' && variant === 'info' && 'step-info',
			!isDisabled && state === 'current' && variant === 'success' && 'step-success',
			!isDisabled && state === 'current' && variant === 'warning' && 'step-warning',
			!isDisabled && state === 'current' && variant === 'error' && 'step-error',
			isDisabled && 'opacity-50 cursor-not-allowed'
		]
			.filter(Boolean)
			.join(' ');
	};

	// Handle step click
	const handleStepClick = (item: StepItem, index: number) => {
		if (item.disabled || disabled || loading || !clickable) return;
		item.onclick?.(item, index);
	};

	// Handle keyboard navigation
	const handleKeyDown = (event: KeyboardEvent, item: StepItem, index: number) => {
		if (item.disabled || disabled || loading || !clickable) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleStepClick(item, index);
		}
	};

	// Get ARIA attributes for step
	const getStepAriaAttributes = (item: StepItem, index: number) => {
		const isDisabled = item.disabled || disabled;
		const state = getStepState(item, index);

		return {
			'aria-current': (state === 'current' ? 'step' : undefined) as 'step' | undefined,
			'aria-disabled': isDisabled || false,
			'aria-label': item.description ? `${item.label}: ${item.description}` : item.label,
			role: 'listitem'
		};
	};
</script>

<ul
	id={stepsId}
	class={containerClasses}
	role="list"
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	{...props}
>
	{#each items as item, index (item.id ?? index)}
		{@const stepState = getStepState(item, index)}
		{@const stepClasses = getStepClasses(item, index)}
		{@const ariaAttrs = getStepAriaAttributes(item, index)}
		<li class={stepClasses} data-content={item.icon ? item.icon : undefined} {...ariaAttrs}>
			{#if clickable && !item.disabled && !disabled && !loading}
				<button
					type="button"
					class="step-button"
					onclick={() => handleStepClick(item, index)}
					onkeydown={(e) => handleKeyDown(e, item, index)}
					aria-label={item.description ? `${item.label}: ${item.description}` : item.label}
					aria-current={stepState === 'current' ? 'step' : undefined}
					aria-disabled={item.disabled || disabled || false}
					tabindex={item.disabled || disabled || loading ? -1 : 0}
				>
					<div class="step-text">
						<span class="step-label">{item.label}</span>
						{#if item.description}
							<span class="step-description">{item.description}</span>
						{/if}
					</div>
				</button>
			{:else}
				<div class="step-text">
					<span class="step-label">{item.label}</span>
					{#if item.description}
						<span class="step-description">{item.description}</span>
					{/if}
				</div>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.step-text {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-top: 0.5rem;
	}

	.step-label {
		font-weight: 500;
		text-align: center;
	}

	.step-description {
		font-size: 0.875rem;
		opacity: 0.7;
		text-align: center;
	}

	.step-button {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		width: 100%;
		cursor: pointer;
		color: inherit;
		font: inherit;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.step-button:hover:not(:disabled):not([aria-disabled='true']) {
		opacity: 0.8;
	}

	.step-button:focus {
		outline: 2px solid currentColor;
		outline-offset: 2px;
		border-radius: 0.25rem;
	}

	.step-button:disabled,
	.step-button[aria-disabled='true'] {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.step[aria-disabled='true'] {
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Ensure icons in step circles are properly sized */
	.step[data-content]::after {
		font-size: 1.25rem;
		line-height: 1;
	}

	@media (max-width: 640px) {
		.steps {
			font-size: 0.875rem;
		}

		.step-description {
			font-size: 0.75rem;
		}

		.step[data-content]::after {
			font-size: 1rem;
		}
	}
</style>
