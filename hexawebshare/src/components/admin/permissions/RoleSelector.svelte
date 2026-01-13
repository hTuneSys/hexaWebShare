<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Select from '../../core/forms/Select.svelte';
	import type { SelectOption } from '../../core/forms/Select.svelte';

	/**
	 * Role option type for role selector
	 * Compatible with SelectOption from core Select component
	 */
	export type RoleOption = {
		value: string;
		label: string;
		description?: string;
		disabled?: boolean;
	};

	/**
	 * Props interface for the RoleSelector component
	 */
	interface Props {
		/**
		 * Selected role value (controlled)
		 */
		value?: string;
		/**
		 * Available roles array - can be array of strings or array of RoleOption objects
		 */
		roles: string[] | RoleOption[];
		/**
		 * Color variant of the role selector
		 * @default undefined (default DaisyUI select style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the role selector
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the role selector is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the role selector is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Placeholder text (shown when no role is selected)
		 */
		placeholder?: string;
		/**
		 * Label text for the role selector
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
		 * Whether the role selector is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Change event handler
		 */
		onchange?: (event: Event) => void;
		/**
		 * Blur event handler
		 */
		onblur?: (event: Event) => void;
		/**
		 * Focus event handler
		 */
		onfocus?: (event: Event) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		roles,
		disabled = false,
		loading = false,
		...selectProps
	}: Props = $props();

	// Convert roles to options format for Select component
	// RoleOption is compatible with SelectOption (description is ignored by Select)
	let options = $derived(
		roles.every((role) => typeof role === 'string')
			? (roles as string[])
			: roles.map((role) => {
					if (typeof role === 'string') {
						return role;
					}
					// Convert RoleOption to SelectOption (description is not used by Select)
					return {
						value: role.value,
						label: role.label,
						disabled: role.disabled
					};
				}) as SelectOption[]
	);

	// Disable select when loading
	let isDisabled = $derived(disabled || loading);
</script>

<Select options={options} disabled={isDisabled} loading={loading} {...selectProps} />
