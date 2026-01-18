<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
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

	// Badge classes using static DaisyUI classes
	let badgeClasses = $derived(
		[
			'badge',
			resolvedVariant === 'primary' && 'badge-primary',
			resolvedVariant === 'secondary' && 'badge-secondary',
			resolvedVariant === 'accent' && 'badge-accent',
			resolvedVariant === 'neutral' && 'badge-neutral',
			resolvedVariant === 'info' && 'badge-info',
			resolvedVariant === 'success' && 'badge-success',
			resolvedVariant === 'warning' && 'badge-warning',
			resolvedVariant === 'error' && 'badge-error',
			resolvedVariant === 'ghost' && 'badge-ghost',
			size === 'xs' && 'badge-xs',
			size === 'sm' && 'badge-sm',
			size === 'md' && 'badge-md',
			size === 'lg' && 'badge-lg',
			outline && 'badge-outline',
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Accessibility: Determine if badge is decorative or semantic
	// Role badges are typically semantic, so default to false unless explicitly hidden
	let isDecorative = $derived(ariaHidden || (!ariaLabel && false));

	// Format role name for display (capitalize first letter)
	let displayRole = $derived(role.charAt(0).toUpperCase() + role.slice(1).toLowerCase());
</script>

<span
	class={badgeClasses}
	aria-label={ariaLabel || (isDecorative ? undefined : `Role: ${displayRole}`)}
	aria-hidden={isDecorative}
	aria-disabled={disabled}
	role={isDecorative ? undefined : 'status'}
	{...props}
>
	{displayRole}
</span>
