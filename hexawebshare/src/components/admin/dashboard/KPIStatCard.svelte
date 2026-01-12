<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	// Core component imports
	import Card from '../../core/layout/Card.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Heading from '../../core/typography/Heading.svelte';
	import Icon from '../../core/media/Icon.svelte';
	import Badge from '../../core/media/Badge.svelte';

	/**
	 * Props interface for the KPIStatCard component
	 */
	interface Props {
		/**
		 * Main value to display (e.g., "125,000", "$50K")
		 */
		value: string | number;
		/**
		 * Label/title for the KPI card
		 */
		label: string;
		/**
		 * Optional trend percentage (e.g., 12.5 for +12.5%)
		 */
		trend?: number;
		/**
		 * Trend direction: 'up' for increase, 'down' for decrease
		 * @default 'up'
		 */
		trendDirection?: 'up' | 'down';
		/**
		 * Color variant of the card
		 * @default 'primary'
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the card
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Optional icon name or SVG content
		 */
		icon?: string;
		/**
		 * Optional description text below the value
		 */
		description?: string;
		/**
		 * Whether the card is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the card is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		value,
		label,
		trend,
		trendDirection = 'up',
		variant = 'primary',
		size = 'md',
		icon,
		description,
		loading = false,
		disabled = false,
		ariaLabel,
		class: className = ''
	}: Props = $props();

	// Size-based padding classes for card body
	let bodyPaddingClasses = $derived(size === 'sm' ? 'p-4' : size === 'md' ? 'p-6' : 'p-8');

	// Loading container min-height based on size
	let loadingMinHeight = $derived(
		size === 'sm' ? 'min-h-[100px]' : size === 'md' ? 'min-h-[120px]' : 'min-h-[140px]'
	);

	// Spinner size mapping
	let spinnerSize = $derived<'sm' | 'md' | 'lg'>(
		size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'
	);

	// Text size mapping for label
	let labelSize = $derived<'xs' | 'sm' | 'base'>(
		size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'base'
	);

	// Heading size mapping for value
	let valueSize = $derived<'2xl' | '3xl' | '4xl'>(
		size === 'sm' ? '2xl' : size === 'md' ? '3xl' : '4xl'
	);

	// Description size mapping
	let descriptionSize = $derived<'xs' | 'sm' | 'base'>(
		size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'base'
	);

	// Icon size mapping
	let iconSize = $derived<'sm' | 'md' | 'lg'>(size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg');
</script>

<Card
	{variant}
	shadow={true}
	shadowSize="md"
	{disabled}
	ariaLabel={ariaLabel || label}
	class={className}
>
	{#snippet children()}
		<div class={bodyPaddingClasses}>
			{#if loading}
				<!-- Loading State -->
				<div class="flex flex-col items-center justify-center {loadingMinHeight} gap-2">
					<Spinner size={spinnerSize} variant="neutral" />
					<Text text="Loading..." size="sm" class="!text-current opacity-70" />
				</div>
			{:else}
				<!-- Label Row with Icon and Trend Badge -->
				<div class="mb-2 flex items-center justify-between">
					<div class="flex items-center gap-2">
						{#if icon}
							<Icon size={iconSize} class="!text-current opacity-80" ariaHidden={true}>
								{#snippet children()}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d={icon} />
									</svg>
								{/snippet}
							</Icon>
						{/if}
						<Text text={label} size={labelSize} weight="medium" class="!text-current opacity-70" />
					</div>
					{#if trend !== undefined}
						<Badge
							label={`${trendDirection === 'up' ? '+' : '-'}${trend}%`}
							variant={trendDirection === 'up' ? 'success' : 'error'}
							size="sm"
						/>
					{/if}
				</div>

				<!-- Value -->
				<div class="mb-1">
					<Heading
						text={String(value)}
						level="h3"
						size={valueSize}
						weight="bold"
						class="!text-current"
					/>
				</div>

				<!-- Description -->
				{#if description}
					<div class="mt-1">
						<Text text={description} size={descriptionSize} class="!text-current opacity-70" />
					</div>
				{/if}
			{/if}
		</div>
	{/snippet}
</Card>
