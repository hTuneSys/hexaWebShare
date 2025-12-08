<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	interface Props {
		name: string;
		size?: 'xs' | 'sm' | 'md' | 'lg';
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		ariaLabel?: string;
		ariaHidden?: boolean;
		disabled?: boolean;
		loading?: boolean;
		class?: string;
	}

	const {
		name,
		size = 'md',
		variant = 'neutral',
		ariaLabel,
		ariaHidden = false,
		disabled = false,
		loading = false,
		class: className = '',
		...props
	}: Props = $props();

	let iconClasses = $derived(
		[
			'inline-block',
			'flex-shrink-0',
			size === 'xs' && 'w-4 h-4',
			size === 'sm' && 'w-5 h-5',
			size === 'md' && 'w-6 h-6',
			size === 'lg' && 'w-8 h-8',
			variant === 'primary' && 'text-primary',
			variant === 'secondary' && 'text-secondary',
			variant === 'accent' && 'text-accent',
			variant === 'neutral' && 'text-neutral',
			variant === 'info' && 'text-info',
			variant === 'success' && 'text-success',
			variant === 'warning' && 'text-warning',
			variant === 'error' && 'text-error',
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Accessibility: Determine if icon is decorative or semantic
	let isDecorative = $derived(ariaHidden || (!ariaLabel && true));
	let shouldBeFocusable = $derived(!disabled && !isDecorative && ariaLabel !== undefined);

	// Loading state classes
	let loadingClasses = $derived(
		[
			'loading',
			'loading-spinner',
			size === 'xs' && 'loading-xs',
			size === 'sm' && 'loading-sm',
			size === 'md' && 'loading-md',
			size === 'lg' && 'loading-lg',
			variant === 'primary' && 'text-primary',
			variant === 'secondary' && 'text-secondary',
			variant === 'accent' && 'text-accent',
			variant === 'neutral' && 'text-neutral',
			variant === 'info' && 'text-info',
			variant === 'success' && 'text-success',
			variant === 'warning' && 'text-warning',
			variant === 'error' && 'text-error'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

{#if loading}
	<span
		class={loadingClasses}
		aria-label={ariaLabel || 'Loading'}
		aria-hidden={isDecorative}
		aria-disabled={disabled}
		role={isDecorative ? undefined : 'status'}
		{...props}
	></span>
{:else}
	<svg
		class={iconClasses}
		fill="currentColor"
		viewBox="0 0 24 24"
		aria-label={ariaLabel}
		aria-hidden={isDecorative}
		aria-disabled={disabled}
		role={isDecorative ? undefined : 'img'}
		focusable={shouldBeFocusable ? 'true' : 'false'}
		{...props}
	>
		{#if ariaLabel && !isDecorative}
			<title>{ariaLabel}</title>
		{/if}
		<!-- Icon content will be rendered here based on name prop -->
		<path
			d="M12 2L2 7L12 12L22 7L12 2Z"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="none"
		/>
	</svg>
{/if}
