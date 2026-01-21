<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import DateRangePicker from '../../core/forms/DateRangePicker.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Card from '../../core/layout/Card.svelte';

	/**
	 * Preset date range option
	 */
	export interface DateRangePreset {
		/**
		 * Unique identifier for the preset
		 */
		id: string;
		/**
		 * Display label for the preset
		 */
		label: string;
		/**
		 * Function that returns start and end dates for this preset
		 */
		getDates: () => { startDate: string; endDate: string };
	}

	/**
	 * Props interface for the DashboardDateRangeFilter component
	 */
	interface Props {
		/**
		 * Start date value (ISO date string: YYYY-MM-DD)
		 */
		startDate?: string;
		/**
		 * End date value (ISO date string: YYYY-MM-DD)
		 */
		endDate?: string;
		/**
		 * Minimum selectable date (ISO date string: YYYY-MM-DD)
		 */
		min?: string;
		/**
		 * Maximum selectable date (ISO date string: YYYY-MM-DD)
		 */
		max?: string;
		/**
		 * Color variant of the date range picker
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
		 * Size of the date range picker
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the date range picker is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the date range picker is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Label text for the date range picker
		 * @default 'Date Range'
		 */
		label?: string;
		/**
		 * Start date label text
		 * @default 'Start Date'
		 */
		startLabel?: string;
		/**
		 * End date label text
		 * @default 'End Date'
		 */
		endLabel?: string;
		/**
		 * Error message to display
		 */
		error?: string;
		/**
		 * Helper text or description
		 */
		helpText?: string;
		/**
		 * Whether to show preset date range buttons
		 * @default true
		 */
		showPresets?: boolean;
		/**
		 * Array of custom preset date ranges
		 */
		presets?: DateRangePreset[];
		/**
		 * Whether to show the filter in a card container
		 * @default true
		 */
		showCard?: boolean;
		/**
		 * HTML id prefix for the date inputs
		 */
		id?: string;
		/**
		 * HTML name prefix for form submission
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
		 * Accessible label for required field indicator
		 * @default 'required'
		 */
		requiredLabel?: string;
		/**
		 * Template for preset button aria-labels
		 * Use {label} as placeholder for preset label
		 * @default 'Select {label} date range'
		 */
		presetAriaLabelTemplate?: string;
		/**
		 * Change event handler for start date
		 */
		onStartDateChange?: (event: Event) => void;
		/**
		 * Change event handler for end date
		 */
		onEndDateChange?: (event: Event) => void;
		/**
		 * Input event handler for start date
		 */
		onStartDateInput?: (event: Event) => void;
		/**
		 * Input event handler for end date
		 */
		onEndDateInput?: (event: Event) => void;
		/**
		 * Callback when a preset is selected
		 */
		onPresetSelect?: (
			preset: DateRangePreset,
			dates: { startDate: string; endDate: string }
		) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		startDate: startDateProp,
		endDate: endDateProp,
		min,
		max,
		variant = 'primary',
		size = 'md',
		disabled = false,
		required = false,
		label = 'Date Range',
		startLabel = 'Start Date',
		endLabel = 'End Date',
		error,
		helpText,
		showPresets = true,
		presets,
		showCard = true,
		id,
		name,
		ariaLabel,
		ariaDescribedby,
		requiredLabel = 'required',
		presetAriaLabelTemplate = 'Select {label} date range',
		onStartDateChange,
		onEndDateChange,
		onStartDateInput,
		onEndDateInput,
		onPresetSelect,
		class: className = '',
		...props
	}: Props = $props();

	// Local state for date values to allow internal updates
	let startDate = $state<string | undefined>(startDateProp);
	let endDate = $state<string | undefined>(endDateProp);

	// Track active preset ID for visual feedback
	let activePresetId = $state<string | undefined>(undefined);

	// Sync props to state when props change and validate
	// Only read props, never read state to avoid infinite loop
	$effect(() => {
		const newStartDate = startDateProp;
		const newEndDate = endDateProp;

		// Calculate validated end date before updating state
		let validatedEndDate = newEndDate;
		if (newStartDate && newEndDate && newEndDate < newStartDate) {
			validatedEndDate = newStartDate;
		}

		// Update state (Svelte will handle change detection)
		startDate = newStartDate;
		endDate = validatedEndDate;

		// Reset active preset when dates change externally
		activePresetId = undefined;
	});

	// Default preset options
	const defaultPresets: DateRangePreset[] = $derived([
		{
			id: 'today',
			label: 'Today',
			getDates: () => {
				const today = new Date();
				const todayStr = today.toISOString().split('T')[0];
				return { startDate: todayStr, endDate: todayStr };
			}
		},
		{
			id: 'yesterday',
			label: 'Yesterday',
			getDates: () => {
				const yesterday = new Date();
				yesterday.setDate(yesterday.getDate() - 1);
				const yesterdayStr = yesterday.toISOString().split('T')[0];
				return { startDate: yesterdayStr, endDate: yesterdayStr };
			}
		},
		{
			id: 'last7days',
			label: 'Last 7 Days',
			getDates: () => {
				const end = new Date();
				const start = new Date();
				start.setDate(start.getDate() - 6);
				return {
					startDate: start.toISOString().split('T')[0],
					endDate: end.toISOString().split('T')[0]
				};
			}
		},
		{
			id: 'last30days',
			label: 'Last 30 Days',
			getDates: () => {
				const end = new Date();
				const start = new Date();
				start.setDate(start.getDate() - 29);
				return {
					startDate: start.toISOString().split('T')[0],
					endDate: end.toISOString().split('T')[0]
				};
			}
		},
		{
			id: 'thisMonth',
			label: 'This Month',
			getDates: () => {
				const now = new Date();
				const start = new Date(now.getFullYear(), now.getMonth(), 1);
				const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
				return {
					startDate: start.toISOString().split('T')[0],
					endDate: end.toISOString().split('T')[0]
				};
			}
		},
		{
			id: 'lastMonth',
			label: 'Last Month',
			getDates: () => {
				const now = new Date();
				const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
				const end = new Date(now.getFullYear(), now.getMonth(), 0);
				return {
					startDate: start.toISOString().split('T')[0],
					endDate: end.toISOString().split('T')[0]
				};
			}
		}
	]);

	// Use custom presets if provided, otherwise use defaults
	// If presets is explicitly an empty array, use it; if undefined, use defaults
	let availablePresets = $derived(presets !== undefined ? presets : defaultPresets);

	// Handle preset selection
	function handlePresetSelect(preset: DateRangePreset) {
		if (disabled) return;

		const dates = preset.getDates();

		// Validate dates against min/max constraints
		let validStartDate = dates.startDate;
		let validEndDate = dates.endDate;

		// Apply min constraint
		if (min) {
			if (validStartDate < min) {
				validStartDate = min;
			}
			if (validEndDate < min) {
				validEndDate = min;
			}
		}

		// Apply max constraint
		if (max) {
			if (validStartDate > max) {
				validStartDate = max;
			}
			if (validEndDate > max) {
				validEndDate = max;
			}
		}

		// Ensure end date is not before start date
		if (validStartDate && validEndDate && validEndDate < validStartDate) {
			validEndDate = validStartDate;
		}

		// Update local state
		startDate = validStartDate;
		endDate = validEndDate;

		// Track active preset for visual feedback
		activePresetId = preset.id;

		// Trigger change events programmatically
		if (onStartDateChange) {
			const startEvent = new Event('change', { bubbles: true });
			Object.defineProperty(startEvent, 'target', {
				value: { value: validStartDate },
				writable: false
			});
			onStartDateChange(startEvent);
		}

		if (onEndDateChange) {
			const endEvent = new Event('change', { bubbles: true });
			Object.defineProperty(endEvent, 'target', {
				value: { value: validEndDate },
				writable: false
			});
			onEndDateChange(endEvent);
		}

		// Call preset select callback with validated dates
		if (onPresetSelect) {
			onPresetSelect(preset, { startDate: validStartDate, endDate: validEndDate });
		}
	}

	// Handle date changes from DateRangePicker
	function handleStartDateChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target) {
			const newStartDate = target.value;
			startDate = newStartDate;

			// Reset active preset when manually changing dates
			activePresetId = undefined;

			// If end date is before new start date, adjust it
			if (newStartDate && endDate && endDate < newStartDate) {
				endDate = newStartDate;

				// Trigger end date change event
				if (onEndDateChange) {
					const endEvent = new Event('change', { bubbles: true });
					Object.defineProperty(endEvent, 'target', {
						value: { value: newStartDate },
						writable: false
					});
					onEndDateChange(endEvent);
				}
			}
		}
		if (onStartDateChange) {
			onStartDateChange(event);
		}
	}

	function handleEndDateChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target) {
			endDate = target.value;

			// Reset active preset when manually changing dates
			activePresetId = undefined;
		}
		if (onEndDateChange) {
			onEndDateChange(event);
		}
	}

	// Check if a preset is currently active (by ID, not by date comparison)
	function isPresetActive(preset: DateRangePreset): boolean {
		return activePresetId === preset.id;
	}

	// Check if preset dates are within min/max range
	function isPresetValid(preset: DateRangePreset): boolean {
		if (!min && !max) return true;

		const dates = preset.getDates();

		// Check if start date is within bounds
		if (min && dates.startDate < min) {
			return false;
		}
		if (max && dates.startDate > max) {
			return false;
		}

		// Check if end date is within bounds
		if (min && dates.endDate < min) {
			return false;
		}
		if (max && dates.endDate > max) {
			return false;
		}

		return true;
	}

	// Button size (directly use size prop as it's already type-safe)
	let buttonSize = $derived(size);

	// Container classes
	let containerClasses = $derived(
		['dashboard-date-range-filter', 'w-full', className].filter(Boolean).join(' ')
	);
</script>

{#snippet filterContent()}
	{#if showPresets && availablePresets.length > 0}
		<!-- Preset Buttons -->
		<!-- 
			NOTE: Raw HTML div is intentional here.
			This is a structural container for preset buttons with flexbox layout.
			No suitable library component exists for generic flex wrappers.
		-->
		<div class="mb-4 flex flex-wrap gap-2">
			{#each availablePresets as preset}
				<Button
					label={preset.label}
					variant={isPresetActive(preset) ? variant : 'ghost'}
					size={buttonSize}
					disabled={disabled || !isPresetValid(preset)}
					onclick={() => handlePresetSelect(preset)}
					ariaLabel={presetAriaLabelTemplate.replace('{label}', preset.label)}
				/>
			{/each}
		</div>
	{/if}

	<!-- Date Range Picker -->
	<DateRangePicker
		{startDate}
		{endDate}
		{min}
		{max}
		{variant}
		{size}
		{disabled}
		{required}
		{label}
		{startLabel}
		{endLabel}
		{error}
		{helpText}
		{id}
		{name}
		{ariaLabel}
		{ariaDescribedby}
		{requiredLabel}
		onStartDateChange={handleStartDateChange}
		onEndDateChange={handleEndDateChange}
		{onStartDateInput}
		{onEndDateInput}
		{...props}
	/>
{/snippet}

{#if showCard}
	<Card shadow={true} shadowSize="sm" class={containerClasses}>
		{#snippet children()}
			<!-- 
				NOTE: Raw HTML div is intentional here.
				This is a structural container for padding inside the Card component.
				No suitable library component exists for generic padding wrappers.
			-->
			<div class="p-4">
				{@render filterContent()}
			</div>
		{/snippet}
	</Card>
{:else}
	<!-- 
		NOTE: Raw HTML div is intentional here.
		This is a structural container when showCard is false.
		No suitable library component exists for generic layout wrappers.
	-->
	<div class={containerClasses}>
		{@render filterContent()}
	</div>
{/if}
