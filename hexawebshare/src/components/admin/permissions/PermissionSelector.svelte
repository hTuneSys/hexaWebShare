<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Checkbox from '../../core/forms/Checkbox.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Loader from '../../core/feedback/Loader.svelte';
	import Heading from '../../core/typography/Heading.svelte';
	import MutedText from '../../core/typography/MutedText.svelte';
	import Text from '../../core/typography/Text.svelte';
	import ButtonGroup from '../../core/buttons/ButtonGroup.svelte';

	/**
	 * Permission option type
	 */
	export type PermissionOption = {
		value: string;
		label: string;
		description?: string;
		group?: string;
		disabled?: boolean;
	};

	/**
	 * Props interface for the PermissionSelector component
	 */
	interface Props {
		/**
		 * Selected permission values (controlled)
		 */
		value?: string[];
		/**
		 * Default selected values (uncontrolled mode)
		 */
		defaultValue?: string[];
		/**
		 * Available permissions array (optional if using children slot)
		 */
		permissions?: PermissionOption[];
		/**
		 * Children slot for custom permission rendering
		 */
		children?: Snippet;
		/**
		 * Color variant of the checkboxes
		 * @default 'primary'
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the checkboxes
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the component is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the component is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Label text for the permission selector
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
		 * Whether to show group headers
		 * @default true
		 */
		showGroups?: boolean;
		/**
		 * Whether to show select all/deselect all buttons
		 * @default true
		 */
		showSelectAll?: boolean;
		/**
		 * Whether the component is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * HTML id attribute
		 */
		id?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * ARIA describedby attribute
		 */
		ariaDescribedby?: string;
		/**
		 * Change event handler
		 */
		onchange?: (selected: string[]) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		value,
		defaultValue,
		permissions,
		children,
		variant = 'primary',
		size = 'md',
		disabled = false,
		required = false,
		label,
		error,
		helpText,
		showGroups = true,
		showSelectAll = true,
		loading = false,
		id,
		ariaLabel,
		ariaDescribedby,
		onchange,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(
		id || `permission-selector-${Math.random().toString(36).substring(2, 11)}`
	);

	// Determine if component is controlled
	let isControlled = $derived(value !== undefined);

	// Internal state for uncontrolled mode
	let internalSelected = $state<string[]>(defaultValue || []);

	// Update internal state when defaultValue changes (only in uncontrolled mode)
	$effect(() => {
		if (!isControlled && defaultValue !== undefined) {
			internalSelected = defaultValue || [];
		}
	});

	// Get current selected values
	let selectedValues = $derived(isControlled ? value || [] : internalSelected);

	// Determine if using children slot or permissions prop
	let useChildren = $derived(children !== undefined);
	let usePermissions = $derived(permissions !== undefined && permissions.length > 0);

	// Group permissions by group name
	let groupedPermissions = $derived(() => {
		if (!permissions || permissions.length === 0) {
			return {};
		}

		if (!showGroups) {
			return { '': permissions };
		}

		const grouped: Record<string, PermissionOption[]> = {};
		permissions.forEach((permission) => {
			const group = permission.group || '';
			if (!grouped[group]) {
				grouped[group] = [];
			}
			grouped[group].push(permission);
		});
		return grouped;
	});

	// Get all available permission values (not disabled)
	let availableValues = $derived(
		permissions && permissions.length > 0
			? permissions.filter((p) => !p.disabled && !disabled).map((p) => p.value)
			: []
	);

	// Check if all permissions are selected
	let allSelected = $derived(
		availableValues.length > 0 && availableValues.every((val) => selectedValues.includes(val))
	);

	// Check if some permissions are selected (for indeterminate state)
	let someSelected = $derived(
		availableValues.length > 0 &&
			selectedValues.some((val) => availableValues.includes(val)) &&
			!allSelected
	);

	// Handle permission toggle
	function handlePermissionToggle(permissionValue: string, checked: boolean) {
		if (disabled || loading) return;

		let newSelected: string[];
		if (checked) {
			newSelected = [...selectedValues, permissionValue];
		} else {
			newSelected = selectedValues.filter((val) => val !== permissionValue);
		}

		if (!isControlled) {
			internalSelected = newSelected;
		}

		onchange?.(newSelected);
	}

	// Handle select all
	function handleSelectAll() {
		if (disabled || loading) return;

		const newSelected = [...availableValues];

		if (!isControlled) {
			internalSelected = newSelected;
		}

		onchange?.(newSelected);
	}

	// Handle deselect all
	function handleDeselectAll() {
		if (disabled || loading) return;

		const newSelected: string[] = [];

		if (!isControlled) {
			internalSelected = newSelected;
		}

		onchange?.(newSelected);
	}

	// Container classes
	let containerClasses = $derived(['form-control', 'w-full', className].filter(Boolean).join(' '));

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
</script>

<div class={containerClasses} id={fieldId} {...props}>
	{#if label}
		<label class={labelClasses} for={fieldId}>
			<span class="label-text">
				{label}
				{#if required}
					<Text text="*" variant="error" size="sm" class="ml-1" ariaLabel="required" />
				{/if}
			</span>
		</label>
	{/if}

	{#if showSelectAll && usePermissions && availableValues.length > 0}
		<div class="mb-4">
			<ButtonGroup orientation="horizontal" gap="sm" ariaLabel="Permission selection actions">
				{#snippet children()}
					<Button
						variant="ghost"
						size="sm"
						label="Select All"
						disabled={disabled || loading || allSelected}
						ariaLabel="Select all permissions"
						onclick={handleSelectAll}
					/>
					<Button
						variant="ghost"
						size="sm"
						label="Deselect All"
						disabled={disabled || loading || selectedValues.length === 0}
						ariaLabel="Deselect all permissions"
						onclick={handleDeselectAll}
					/>
				{/snippet}
			</ButtonGroup>
		</div>
	{/if}

	{#if loading}
		<div class="flex items-center justify-center py-8">
			<Loader
				status="loading"
				label="Loading permissions"
				variant="primary"
				type="spinner"
				size="md"
				fullWidth={false}
			/>
		</div>
	{:else if useChildren && children}
		<!-- Render children slot -->
		<div
			class="space-y-4"
			role="group"
			aria-label={ariaLabel || label || 'Permission selector'}
			aria-describedby={ariaDescribedby}
			aria-disabled={disabled}
		>
			{@render children()}
		</div>
	{:else if usePermissions}
		<!-- Render permissions from prop -->
		<div
			class="space-y-4"
			role="group"
			aria-label={ariaLabel || label || 'Permission selector'}
			aria-describedby={ariaDescribedby}
			aria-disabled={disabled}
		>
			{#each Object.entries(groupedPermissions()) as [groupName, groupPermissions]}
				<div class="space-y-2">
					{#if showGroups && groupName}
						<Heading
							level="h3"
							text={groupName}
							size="sm"
							weight="semibold"
							class="text-base-content/80 tracking-wide uppercase"
						/>
					{/if}
					<div class="space-y-2">
						{#each groupPermissions as permission}
							<div class="flex items-start gap-2">
								<Checkbox
									variant={variant || 'primary'}
									{size}
									checked={selectedValues.includes(permission.value)}
									disabled={disabled || permission.disabled || loading}
									label={permission.label}
									ariaLabel={`${permission.label}${permission.description ? `: ${permission.description}` : ''}`}
									onchange={(e) => {
										const target = e.target as HTMLInputElement;
										handlePermissionToggle(permission.value, target.checked);
									}}
								/>
							</div>
							{#if permission.description}
								<MutedText text={permission.description} size="xs" class="ml-6" />
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}

	{#if error && error !== ''}
		<div class={labelClasses}>
			<span class="label-text-alt text-error text-sm" role="alert" aria-live="polite">{error}</span>
		</div>
	{/if}

	{#if helpText && (!error || error === '')}
		<div class={labelClasses}>
			<MutedText text={helpText} size="sm" class="label-text-alt" />
		</div>
	{/if}
</div>
