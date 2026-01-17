<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Text from '../typography/Text.svelte';
	import IconButton from '../buttons/IconButton.svelte';

	/**
	 * Step data structure for programmatic rendering
	 */
	export interface StepData {
		id: string | number;
		label: string;
		description?: string;
		icon?: string;
		disabled?: boolean;
		href?: string;
	}

	interface Props {
		/**
		 * Array of steps to display
		 */
		steps: StepData[];
		/**
		 * Current active step index (0-based)
		 * @default 0
		 */
		currentStep?: number;
		/**
		 * Orientation of the stepper
		 * @default 'horizontal'
		 */
		orientation?: 'horizontal' | 'vertical';
		/**
		 * Color variant for completed steps
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
		 * Allow clicking on steps to navigate
		 * @default false
		 */
		clickable?: boolean;
		/**
		 * Disable all steps
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Accessible label for the stepper
		 */
		ariaLabel?: string;
		/**
		 * ID of the element that labels this stepper
		 */
		ariaLabelledby?: string;
		/**
		 * Callback when a step is clicked
		 */
		onStepClick?: (step: StepData, index: number) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		steps,
		currentStep = 0,
		orientation = 'horizontal',
		variant = 'primary',
		clickable = false,
		disabled = false,
		ariaLabel,
		ariaLabelledby,
		onStepClick,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID for accessibility
	const stepperId = crypto.randomUUID?.() ?? `stepper-${Math.random().toString(36).slice(2, 9)}`;

	// Computed container classes
	let containerClasses = $derived(
		[
			'steps',
			orientation === 'horizontal' && 'steps-horizontal',
			orientation === 'vertical' && 'steps-vertical',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Get step state based on index
	const getStepState = (index: number): 'completed' | 'current' | 'pending' => {
		if (index < currentStep) return 'completed';
		if (index === currentStep) return 'current';
		return 'pending';
	};

	// Get step classes based on state
	const getStepClasses = (index: number, step: StepData): string => {
		const state = getStepState(index);
		const isDisabled = step.disabled || disabled;
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
			isDisabled && 'step-disabled'
		]
			.filter(Boolean)
			.join(' ');
	};

	// Handle step click
	const handleStepClick = (step: StepData, index: number) => {
		if (step.disabled || disabled || !clickable) return;
		onStepClick?.(step, index);
	};

	// Handle keyboard navigation
	const handleKeyDown = (event: KeyboardEvent, step: StepData, index: number) => {
		if (step.disabled || disabled || !clickable) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleStepClick(step, index);
		}
	};

	// Get ARIA attributes for step
	const getStepAriaAttributes = (index: number, step: StepData) => {
		const state = getStepState(index);
		return {
			'aria-current': (state === 'current' ? 'step' : undefined) as 'step' | undefined,
			'aria-disabled': step.disabled || disabled || false,
			'aria-label': step.description ? `${step.label}: ${step.description}` : step.label,
			role: 'listitem'
		};
	};
</script>

<ul
	id={stepperId}
	class={containerClasses}
	role="list"
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	{...props}
>
	{#each steps as step, index (step.id)}
		<li class={getStepClasses(index, step)} {...getStepAriaAttributes(index, step)}>
			{#if clickable && !step.disabled && !disabled}
				<IconButton
					variant="ghost"
					class="step-button"
					onclick={() => handleStepClick(step, index)}
					onkeydown={(e) => handleKeyDown(e, step, index)}
					ariaLabel={step.description ? `${step.label}: ${step.description}` : step.label}
					disabled={step.disabled || disabled}
				>
					{#snippet children()}
						<div class="step-wrapper">
							{#if step.icon}
								<span class="step-icon" aria-hidden="true">{step.icon}</span>
							{/if}
							<div class="step-content">
								<Text>{step.label}</Text>
								{#if step.description}
									<Text size="sm">{step.description}</Text>
								{/if}
							</div>
						</div>
					{/snippet}
				</IconButton>
			{:else}
				<div class="step-wrapper">
					{#if step.icon}
						<span class="step-icon" aria-hidden="true">{step.icon}</span>
					{/if}
					<div class="step-content">
						<Text>{step.label}</Text>
						{#if step.description}
							<Text size="sm">{step.description}</Text>
						{/if}
					</div>
				</div>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.step-wrapper {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.step-content {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.step-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.step.step-disabled {
		cursor: not-allowed;
		pointer-events: none;
		opacity: 1;
	}

	.step.step-disabled::before {
		background-color: hsl(var(--bc) / 0.25);
		opacity: 1;
	}

	.step.step-disabled::after {
		background-color: hsl(var(--bc) / 0.15);
		border: 2px solid hsl(var(--bc) / 0.4);
		color: hsl(var(--bc) / 0.7);
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
	}


	.step.step-disabled .step-icon {
		opacity: 0.8;
	}

	.step-button {
		width: 100%;
		text-align: left;
		justify-content: flex-start;
	}

	.step-button:hover {
		opacity: 0.8;
	}

	.step-button:focus {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}
</style>
