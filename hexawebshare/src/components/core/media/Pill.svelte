<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	interface Props {
		label: string;
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
		size?: 'xs' | 'sm' | 'md' | 'lg';
		outline?: boolean;
		ariaLabel?: string;
		ariaHidden?: boolean;
		disabled?: boolean;
		class?: string;
	}

	const {
		label,
		variant = 'neutral',
		size = 'md',
		outline = false,
		ariaLabel,
		ariaHidden = false,
		disabled = false,
		class: className = '',
		...props
	}: Props = $props();

	let pillClasses = $derived(
		[
			'badge',
			'rounded-full',
			variant === 'primary' && 'badge-primary',
			variant === 'secondary' && 'badge-secondary',
			variant === 'accent' && 'badge-accent',
			variant === 'neutral' && 'badge-neutral',
			variant === 'info' && 'badge-info',
			variant === 'success' && 'badge-success',
			variant === 'warning' && 'badge-warning',
			variant === 'error' && 'badge-error',
			variant === 'ghost' && 'badge-ghost',
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

	// Accessibility: Determine if pill is decorative or semantic
	let isDecorative = $derived(ariaHidden || !ariaLabel);
</script>

<span
	class={pillClasses}
	aria-label={ariaLabel}
	aria-hidden={isDecorative}
	aria-disabled={disabled}
	role={isDecorative ? undefined : 'status'}
	{...props}
>
	{label}
</span>
