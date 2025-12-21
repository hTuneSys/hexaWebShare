<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Snippet } from 'svelte';
	import Spinner from './Spinner.svelte';

	type Children = Snippet | { default?: Snippet };

	interface Props {
		/**
		 * Slot content passed from parent
		 */
		children?: Children;
		/**
		 * Visual style of the callout
		 * @default 'info'
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
		 * Title displayed in bold at the top
		 */
		title?: string;
		/**
		 * Descriptive message below the title
		 */
		message?: string;
		/**
		 * Whether the callout can be dismissed
		 * @default false
		 */
		closable?: boolean;
		/**
		 * Accessible label for the close button
		 * @default 'Dismiss callout'
		 */
		dismissLabel?: string;
		/**
		 * Text for the optional action button
		 */
		actionLabel?: string;
		/**
		 * Accessible label for the action button
		 */
		actionAriaLabel?: string;
		/**
		 * Show a colored leading indicator
		 * @default true
		 */
		withIcon?: boolean;
		/**
		 * Indicates loading state and shows a spinner
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Disables interactions and dims the callout
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the callout should stretch to full width
		 * @default true
		 */
		fullWidth?: boolean;
		/**
		 * Custom ARIA live region setting
		 */
		ariaLive?: 'polite' | 'assertive';
		/**
		 * Explicit role override
		 */
		role?: 'status' | 'alert' | 'note';
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		children,
		variant = 'info',
		title = '',
		message = '',
		closable = false,
		dismissLabel = 'Dismiss callout',
		actionLabel,
		actionAriaLabel,
		withIcon = true,
		loading = false,
		disabled = false,
		fullWidth = true,
		ariaLive,
		role,
		class: className = '',
		...props
	}: Props = $props();

	const dispatch = createEventDispatcher<{ close: void; action: void }>();

	const defaultSlot = $derived(typeof children === 'function' ? children : children?.default);

	const computedRole = $derived(
		role ?? (variant === 'error' || variant === 'warning' ? 'alert' : 'note')
	);
	const computedAriaLive = $derived(
		ariaLive ?? (computedRole === 'alert' ? 'assertive' : 'polite')
	);

	let calloutClasses = $derived(
		[
			'alert',
			'gap-3',
			'items-start',
			'rounded-lg',
			'shadow-sm',
			'sm:items-center',
			fullWidth ? 'w-full' : 'w-fit',
			disabled && 'pointer-events-none opacity-70',
			variant === 'primary' && 'alert-primary',
			variant === 'secondary' && 'alert-secondary',
			variant === 'accent' && 'alert-accent',
			variant === 'neutral' && 'alert-neutral',
			variant === 'info' && 'alert-info',
			variant === 'success' && 'alert-success',
			variant === 'warning' && 'alert-warning',
			variant === 'error' && 'alert-error',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	let indicatorClasses = $derived(
		[
			'h-2',
			'w-2',
			'rounded-full',
			'mt-1.5',
			'sm:mt-0',
			'shrink-0',
			variant === 'primary' && 'bg-primary',
			variant === 'secondary' && 'bg-secondary',
			variant === 'accent' && 'bg-accent',
			variant === 'neutral' && 'bg-neutral',
			variant === 'info' && 'bg-info',
			variant === 'success' && 'bg-success',
			variant === 'warning' && 'bg-warning',
			variant === 'error' && 'bg-error'
		]
			.filter(Boolean)
			.join(' ')
	);

	const handleClose = () => {
		dispatch('close');
	};

	const handleAction = () => {
		dispatch('action');
	};
</script>

<div
	class={calloutClasses}
	role={computedRole}
	aria-live={computedAriaLive}
	aria-disabled={disabled}
	{...props}
>
	{#if withIcon}
		<span class={indicatorClasses} aria-hidden="true"></span>
	{/if}

	<div class="flex min-w-0 flex-1 flex-col gap-1">
		{#if title}
			<div class="text-base leading-tight font-semibold">{title}</div>
		{/if}

		{#if message}
			<p class="text-sm leading-snug break-words opacity-80">{message}</p>
		{/if}

		{@render defaultSlot?.()}
	</div>

	{#if actionLabel}
		<button
			type="button"
			class="btn btn-outline btn-sm shrink-0"
			onclick={handleAction}
			aria-label={actionAriaLabel ?? actionLabel}
			disabled={disabled || loading}
		>
			{actionLabel}
		</button>
	{/if}

	{#if loading}
		<Spinner
			type="spinner"
			size="md"
			variant="neutral"
			ariaLabel="Loading callout"
			class="shrink-0"
		/>
	{/if}

	{#if closable}
		<button
			type="button"
			class="btn btn-square btn-ghost btn-sm shrink-0"
			onclick={handleClose}
			aria-label={dismissLabel}
			title={dismissLabel}
			disabled={disabled || loading}
		>
			<span aria-hidden="true">×</span>
		</button>
	{/if}
</div>
