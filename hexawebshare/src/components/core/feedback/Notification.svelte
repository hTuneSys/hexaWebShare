<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Spinner from './Spinner.svelte';
	import Button from '../buttons/Button.svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import Heading from '../typography/Heading.svelte';
	import MutedText from '../typography/MutedText.svelte';
	import StatusDot from '../data-display/StatusDot.svelte';

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
		 * Callback when notification is closed
		 */
		onclose?: () => void;
		/**
		 * Callback when action button is clicked
		 */
		onaction?: () => void;
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
		onclose,
		onaction,
		class: className = '',
		...props
	}: Props = $props();

	const isControlled = open !== undefined;

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

	const handleClose = () => {
		if (!isControlled) {
			isVisible = false;
		}
		onclose?.();
	};

	const handleAction = () => {
		onaction?.();
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
			<StatusDot {variant} size="sm" ariaHidden class="mt-1.5 sm:mt-0" />
		{/if}

		<div class="flex min-w-0 flex-1 flex-col gap-1">
			{#if title}
				<Heading level="h6" text={title} weight="semibold" class="leading-tight" />
			{/if}

			{#if message}
				<MutedText text={message} size="sm" class="leading-snug break-words" />
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
			<Button
				variant="ghost"
				size="sm"
				label={actionLabel}
				onclick={handleAction}
				ariaLabel={actionAriaLabel ?? actionLabel}
				disabled={disabled || loading}
			/>
		{/if}

		{#if closable}
			<IconButton
				variant="ghost"
				size="sm"
				square
				onclick={handleClose}
				ariaLabel={dismissLabel}
				disabled={disabled || loading}
			>
				×
			</IconButton>
		{/if}
	</div>
{/if}
