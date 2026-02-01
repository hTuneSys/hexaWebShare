<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Badge from '../../core/media/Badge.svelte';

	/**
	 * Props interface for the RoleBadge component
	 */
	interface Props {
		/**
		 * Role name to display
		 */
		role: string;
		/**
		 * Color variant of the role badge
		 * If not provided, will be automatically determined based on role name
		 */
		variant?:
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
		 * Size of the role badge
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Outline style badge
		 * @default false
		 */
		outline?: boolean;
		/**
		 * Whether the badge is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Hide badge from screen readers (decorative badges)
		 * @default false
		 */
		ariaHidden?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		role,
		variant,
		size = 'md',
		outline = false,
		disabled = false,
		ariaLabel,
		ariaHidden = false,
		class: className = '',
		...props
	}: Props = $props();

	/**
	 * Automatically determine variant based on role name if variant is not provided
	 * Common role names are mapped to appropriate color variants
	 */
	let resolvedVariant = $derived.by(() => {
		if (variant) {
			return variant;
		}

		const roleLower = role.toLowerCase();

		// Admin roles - typically use error or primary
		if (roleLower.includes('admin') || roleLower.includes('administrator')) {
			return 'error';
		}

		// Moderator roles - typically use warning
		if (roleLower.includes('moderator') || roleLower.includes('mod')) {
			return 'warning';
		}

		// Manager roles - typically use primary
		if (roleLower.includes('manager') || roleLower.includes('mgr')) {
			return 'primary';
		}

		// Editor roles - typically use info
		if (roleLower.includes('editor') || roleLower.includes('edit')) {
			return 'info';
		}

		// Guest/Visitor roles - typically use ghost
		if (roleLower.includes('guest') || roleLower.includes('visitor')) {
			return 'ghost';
		}

		// User/Member roles - typically use neutral
		if (roleLower.includes('user') || roleLower.includes('member')) {
			return 'neutral';
		}

		// Default to neutral for unknown roles
		return 'neutral';
	});

	// Format role name for display (capitalize first letter)
	let displayRole = $derived(role.charAt(0).toUpperCase() + role.slice(1).toLowerCase());

	// Generate accessible label if not provided
	let computedAriaLabel = $derived(ariaLabel || (!ariaHidden ? `Role: ${displayRole}` : undefined));
</script>

<Badge
	label={displayRole}
	variant={resolvedVariant}
	{size}
	{outline}
	{disabled}
	ariaLabel={computedAriaLabel}
	{ariaHidden}
	class={className}
	{...props}
/>
