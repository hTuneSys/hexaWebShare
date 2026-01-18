<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '../buttons/Button.svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import Heading from '../typography/Heading.svelte';
	import MutedText from '../typography/MutedText.svelte';
	import StatusDot from '../data-display/StatusDot.svelte';
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
		 * Callback when callout is closed
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
		onclose,
		onaction,
		class: className = '',
		...props
	}: Props = $props();

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

	const handleClose = () => {
		onclose?.();
	};

	const handleAction = () => {
		onaction?.();
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
		<StatusDot {variant} size="sm" class="mt-1.5 sm:mt-0" ariaHidden={true} />
	{/if}

	<div class="flex min-w-0 flex-1 flex-col gap-1">
		{#if title}
			<Heading level="h6" size="md" weight="semibold" class="leading-tight" text={title} />
		{/if}

		{#if message}
			<MutedText size="sm" leading="snug" class="break-words opacity-80" text={message} />
		{/if}

		{@render defaultSlot?.()}
	</div>

	{#if actionLabel}
		<Button
			variant="ghost"
			size="sm"
			class="shrink-0"
			onclick={handleAction}
			ariaLabel={actionAriaLabel ?? actionLabel}
			disabled={disabled || loading}
			label={actionLabel}
		/>
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
		<IconButton
			variant="ghost"
			size="sm"
			square
			class="shrink-0"
			onclick={handleClose}
			ariaLabel={dismissLabel}
			disabled={disabled || loading}
		>
			<span aria-hidden="true">×</span>
		</IconButton>
	{/if}
</div>
