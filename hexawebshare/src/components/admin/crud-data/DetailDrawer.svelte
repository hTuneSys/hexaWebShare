<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Drawer from '../../core/overlay-navigation/Drawer.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Divider from '../../core/layout/Divider.svelte';
	import Heading from '../../core/typography/Heading.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Badge from '../../core/media/Badge.svelte';

	/**
	 * Key-Value pair structure for detail data
	 */
	export interface DetailItem {
		key: string;
		label?: string;
		value: string | number | boolean | null | undefined;
		valueVariant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
	}

	/**
	 * Action button configuration
	 */
	export interface DetailAction {
		label: string;
		variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | 'link';
		outline?: boolean;
		disabled?: boolean;
		loading?: boolean;
		onclick?: () => void;
	}

	interface Props {
		/**
		 * Unique ID for the drawer (auto-generated if not provided)
		 */
		id?: string;
		/**
		 * Whether the drawer is open
		 */
		open?: boolean;
		/**
		 * Title displayed in the drawer header
		 */
		title?: string;
		/**
		 * Detail data to display (key-value pairs)
		 * Can be an object (Record) or array of DetailItem
		 */
		data?: Record<string, unknown> | DetailItem[];
		/**
		 * Position of the drawer
		 * @default 'right'
		 */
		side?: 'left' | 'right';
		/**
		 * Action buttons to display in the footer
		 */
		actions?: DetailAction[];
		/**
		 * Whether to show overlay backdrop
		 * @default true
		 */
		overlay?: boolean;
		/**
		 * Whether clicking the backdrop closes the drawer
		 * @default true
		 */
		closeOnBackdrop?: boolean;
		/**
		 * Whether to show close button
		 * @default true
		 */
		showCloseButton?: boolean;
		/**
		 * Whether to allow closing with Escape key
		 * @default true
		 */
		closeOnEscape?: boolean;
		/**
		 * Custom class for drawer container
		 */
		class?: string;
		/**
		 * Custom class for drawer content area
		 */
		contentClass?: string;
		/**
		 * ARIA label for accessibility
		 */
		ariaLabel?: string;
		/**
		 * Callback when drawer is closed
		 */
		onclose?: () => void;
		/**
		 * Callback when drawer is opened
		 */
		onopen?: () => void;
	}

	let {
		id,
		open = $bindable(false),
		title,
		data = {},
		side = 'right',
		actions = [],
		overlay = true,
		closeOnBackdrop = true,
		showCloseButton = true,
		closeOnEscape = true,
		class: className = '',
		contentClass = '',
		ariaLabel,
		onclose,
		onopen,
		...props
	}: Props = $props();

	// Handle drawer close
	function handleClose() {
		open = false;
		onclose?.();
	}

	// Handle drawer open
	function handleOpen() {
		onopen?.();
	}

	// Computed ARIA label
	const computedAriaLabel = $derived(
		ariaLabel || title || 'Detail drawer'
	);

	// Normalize data to DetailItem array
	const normalizedData = $derived.by(() => {
		if (Array.isArray(data)) {
			return data as DetailItem[];
		}
		if (typeof data === 'object' && data !== null) {
			return Object.entries(data).map(([key, value]) => ({
				key,
				value
			})) as DetailItem[];
		}
		return [] as DetailItem[];
	});

	// Format value for display
	function formatValue(value: string | number | boolean | null | undefined): string {
		if (value === null || value === undefined) {
			return '--';
		}
		if (typeof value === 'boolean') {
			return value ? 'Yes' : 'No';
		}
		return String(value);
	}

	// Check if value should be displayed as badge
	function shouldShowAsBadge(item: DetailItem): boolean {
		return item.valueVariant !== undefined;
	}
</script>

<Drawer
	{id}
	bind:open={open}
	{side}
	{overlay}
	{closeOnBackdrop}
	showCloseButton={false}
	{closeOnEscape}
	class={className}
	contentClass={contentClass}
	ariaLabel={computedAriaLabel}
	onclose={handleClose}
	onopen={handleOpen}
	{...props}
>
	{#snippet children()}
		<!-- Header Section -->
		{#if title || showCloseButton}
			<div class="mb-4 flex items-center justify-between">
				{#if title}
					<Heading level="h2" size="lg" text={title} />
				{/if}
				{#if showCloseButton}
					<button
						type="button"
						class="btn btn-circle btn-ghost btn-sm"
						onclick={handleClose}
						aria-label="Close drawer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				{/if}
			</div>
			<Divider class="mb-4" />
		{/if}

		<!-- Content Section -->
		<div class="flex-1 overflow-y-auto">
			{#if normalizedData.length > 0}
				<div class="space-y-4">
					{#each normalizedData as item (item.key)}
						<div class="flex flex-col gap-2 pb-4 border-b border-base-300 last:border-b-0 last:pb-0">
							<!-- Key/Label -->
							<div class="text-sm font-semibold text-base-content/70">
								{item.label || item.key}
							</div>
							<!-- Value -->
							<div class="text-base text-base-content">
								{#if shouldShowAsBadge(item)}
									<Badge
										label={formatValue(item.value)}
										variant={item.valueVariant}
										size="md"
									/>
								{:else}
									<Text text={formatValue(item.value)} size="base" />
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="flex flex-col items-center justify-center py-12 text-center">
					<Text text="No data available" size="lg" display="block" />
					<Text text="There is no detail information to display." size="sm" display="block" class="mt-2 opacity-60" />
				</div>
			{/if}
		</div>

		<!-- Footer Section -->
		{#if actions && actions.length > 0}
			<div class="mt-6 pt-4 border-t border-base-300">
				<div class="flex flex-wrap gap-2 justify-end">
					{#each actions as action (action.label)}
						<Button
							label={action.label}
							variant={action.variant || 'primary'}
							outline={action.outline || false}
							disabled={action.disabled || false}
							loading={action.loading || false}
							size="md"
							onclick={action.onclick}
						/>
					{/each}
				</div>
			</div>
		{/if}
	{/snippet}
</Drawer>
