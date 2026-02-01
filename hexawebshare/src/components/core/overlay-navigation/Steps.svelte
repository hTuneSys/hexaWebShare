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
	import Button from '../buttons/Button.svelte';
	import Text from '../typography/Text.svelte';

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

	const stepsId = crypto.randomUUID?.() ?? `steps-${Math.random().toString(36).slice(2, 9)}`;

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

	// Responsive step content size
	let stepContentSizeClass = $derived(
		size === 'xs' || size === 'sm' ? 'text-xl sm:text-lg' : 'text-2xl sm:text-xl'
	);

	const getStepState = (item: StepItem, index: number): 'completed' | 'current' | 'pending' => {
		if (item.completed) return 'completed';
		if (item.current) return 'current';
		if (index > 0 && items[index - 1]?.completed && !item.completed && !item.current) {
			const allPreviousCompleted = items.slice(0, index).every((i) => i.completed);
			if (allPreviousCompleted) return 'current';
		}
		return 'pending';
	};

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
			isDisabled && 'cursor-not-allowed pointer-events-none',
			stepContentSizeClass
		]
			.filter(Boolean)
			.join(' ');
	};

	const handleStepClick = (item: StepItem, index: number) => {
		if (item.disabled || disabled || loading || !clickable) return;
		item.onclick?.(item, index);
	};

	const handleKeyDown = (event: KeyboardEvent, item: StepItem, index: number) => {
		if (item.disabled || disabled || loading || !clickable) return;
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleStepClick(item, index);
		}
	};

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
			<div class="flex flex-col items-center gap-1 mt-2 w-full">
				{#if clickable && !item.disabled && !disabled && !loading}
					<Button
						variant="ghost"
						label={item.label}
						class="p-1 min-h-0 h-auto w-full"
						onclick={() => handleStepClick(item, index)}
						onkeydown={(e: KeyboardEvent) => handleKeyDown(e, item, index)}
						ariaLabel={item.description ? `${item.label}: ${item.description}` : item.label}
						aria-current={stepState === 'current' ? 'step' : undefined}
						disabled={item.disabled || disabled}
					/>
				{:else}
					<Text weight="medium" class="text-center">{item.label}</Text>
				{/if}
				{#if item.description}
					<Text size="sm" class="text-center opacity-70">{item.description}</Text>
				{/if}
			</div>
		</li>
	{/each}
</ul>
