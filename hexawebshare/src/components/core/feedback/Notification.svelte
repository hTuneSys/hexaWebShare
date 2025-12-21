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
		 * Controls visibility of the notification
		 * @default true
		 */
		open?: boolean;
		/**
		 * Visual style of the notification
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
		 * Whether the notification can be dismissed
		 * @default true
		 */
		closable?: boolean;
		/**
		 * Accessible label for the close button
		 * @default 'Dismiss notification'
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
		 * Disables interactions and dims the notification
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the notification should stretch to full width
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
		role?: 'status' | 'alert';
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		children,
		open,
		variant = 'info',
		title = '',
		message = '',
		closable = true,
		dismissLabel = 'Dismiss notification',
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

	const isControlled = open !== undefined;

	const dispatch = createEventDispatcher<{ close: void; action: void }>();
	let isVisible = $state(open ?? true);

	const visible = $derived(isControlled ? (open ?? false) : isVisible);

	const defaultSlot = $derived(typeof children === 'function' ? children : children?.default);

	const computedRole = $derived(
		role ?? (variant === 'error' || variant === 'warning' ? 'alert' : 'status')
	);
	const computedAriaLive = $derived(
		ariaLive ?? (computedRole === 'alert' ? 'assertive' : 'polite')
	);

	let notificationClasses = $derived(
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
		if (!isControlled) {
			isVisible = false;
		}
		dispatch('close');
	};

	const handleAction = () => {
		dispatch('action');
	};
</script>

{#if visible}
	<div
		class={notificationClasses}
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

		{#if loading}
			<Spinner
				type="spinner"
				size="sm"
				variant={variant === 'neutral' ? 'primary' : variant}
				ariaLabel="Loading notification"
			/>
		{/if}

		{#if actionLabel}
			<button
				type="button"
				class="btn btn-outline btn-sm"
				onclick={handleAction}
				aria-label={actionAriaLabel ?? actionLabel}
				disabled={disabled || loading}
			>
				{actionLabel}
			</button>
		{/if}

		{#if closable}
			<button
				type="button"
				class="btn btn-square btn-ghost btn-sm"
				onclick={handleClose}
				aria-label={dismissLabel}
				title={dismissLabel}
				disabled={disabled || loading}
			>
				<span aria-hidden="true">×</span>
			</button>
		{/if}
	</div>
{/if}
