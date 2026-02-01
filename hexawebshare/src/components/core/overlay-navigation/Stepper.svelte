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
		const isDisabled = step.disabled || disabled;
		const state = getStepState(index);

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
			isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none'
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
					class="w-full text-left justify-start hover:opacity-80 focus:outline-2 focus:outline-offset-2"
					onclick={() => handleStepClick(step, index)}
					onkeydown={(e) => handleKeyDown(e, step, index)}
					ariaLabel={step.description ? `${step.label}: ${step.description}` : step.label}
					disabled={step.disabled || disabled}
				>
					{#snippet children()}
						<div class="flex items-center gap-2">
							{#if step.icon}
								<span class="inline-flex items-center justify-center" aria-hidden="true"
									>{step.icon}</span
								>
							{/if}
							<div class="flex flex-col gap-1">
								<Text>{step.label}</Text>
								{#if step.description}
									<Text size="sm">{step.description}</Text>
								{/if}
							</div>
						</div>
					{/snippet}
				</IconButton>
			{:else}
				<div class="flex items-center gap-2">
					{#if step.icon}
						<span class="inline-flex items-center justify-center" aria-hidden="true"
							>{step.icon}</span
						>
					{/if}
					<div class="flex flex-col gap-1">
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
