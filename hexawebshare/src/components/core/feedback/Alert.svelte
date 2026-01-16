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

	type SlotContent = Snippet | { default?: Snippet };
	type AlertVariant =
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'neutral'
		| 'info'
		| 'success'
		| 'warning'
		| 'error';
	type LiveSetting = 'polite' | 'assertive';
	type RoleSetting = 'status' | 'alert';

	interface Props {
		/**
		 * Optional title displayed with emphasized style
		 */
		title?: string;
		/**
		 * Supporting description text
		 */
		description?: string;
		/**
		 * Custom slot content rendered below the description
		 */
		children?: SlotContent;
		/**
		 * Controls the visual style of the alert
		 * @default 'info'
		 */
		variant?: AlertVariant;
		/**
		 * Spacing preset for the alert content
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Whether the alert is visible (controlled mode)
		 */
		open?: boolean;
		/**
		 * Renders a dismiss button when true
		 * @default false
		 */
		closable?: boolean;
		/**
		 * Accessible label for the dismiss button
		 * @default 'Dismiss alert'
		 */
		dismissLabel?: string;
		/**
		 * Label for the optional action button
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
		 * Show a loading spinner on the right side
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Disable interactions and lower opacity
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Stretch the alert to full width
		 * @default true
		 */
		fullWidth?: boolean;
		/**
		 * Override the computed ARIA live region setting
		 */
		ariaLive?: LiveSetting;
		/**
		 * Override the computed role attribute
		 */
		role?: RoleSetting;
		/**
		 * Custom accessible label when no text is present
		 */
		ariaLabel?: string;
		/**
		 * Callback when alert is closed
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
		title = '',
		description = '',
		children,
		variant = 'info',
		size = 'md',
		open,
		closable = false,
		dismissLabel = 'Dismiss alert',
		actionLabel,
		actionAriaLabel,
		withIcon = true,
		loading = false,
		disabled = false,
		fullWidth = true,
		ariaLive,
		role,
		ariaLabel,
		onclose,
		onaction,
		class: className = '',
		...props
	}: Props = $props();

	const isControlled = open !== undefined;
	let isVisible = $state(open ?? true);
	const visible = $derived(isControlled ? (open ?? false) : isVisible);

	const defaultSlot = $derived(typeof children === 'function' ? children : children?.default);

	const baseId = crypto.randomUUID?.() ?? `alert-${Math.random().toString(36).slice(2, 9)}`;
	const titleId = `${baseId}-title`;
	const descriptionId = `${baseId}-description`;

	const computedRole = $derived(
		role ?? (variant === 'error' || variant === 'warning' ? 'alert' : 'status')
	);
	const computedAriaLive = $derived(
		ariaLive ?? (computedRole === 'alert' ? 'assertive' : 'polite')
	);
	const resolvedAriaLabel = $derived(
		ariaLabel ?? (title || description ? undefined : 'Alert message')
	);
	const describedBy = $derived(description || defaultSlot ? descriptionId : undefined);

	const iconSymbols: Record<AlertVariant, string> = {
		primary: '!',
		secondary: '!',
		accent: '!',
		neutral: '-',
		info: 'i',
		success: 'v',
		warning: '!',
		error: '!'
	};

	let alertClasses = $derived(
		[
			'alert',
			'flex',
			'flex-col',
			'items-start',
			'gap-3',
			'rounded-lg',
			'shadow-sm',
			'sm:flex-row',
			'sm:items-center',
			fullWidth ? 'w-full' : 'w-fit',
			size === 'sm' && 'px-3 py-2 text-sm',
			size === 'md' && 'px-4 py-3',
			size === 'lg' && 'px-5 py-4 text-base',
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

	let iconClasses = $derived(
		[
			'flex',
			'h-9',
			'w-9',
			'flex-none',
			'items-center',
			'justify-center',
			'rounded-full',
			'border',
			'text-sm',
			'font-semibold',
			variant === 'primary' && 'border-primary text-primary',
			variant === 'secondary' && 'border-secondary text-secondary',
			variant === 'accent' && 'border-accent text-accent',
			variant === 'neutral' && 'border-neutral text-neutral',
			variant === 'info' && 'border-info text-info',
			variant === 'success' && 'border-success text-success',
			variant === 'warning' && 'border-warning text-warning',
			variant === 'error' && 'border-error text-error'
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
		class={alertClasses}
		role={computedRole}
		aria-live={computedAriaLive}
		aria-disabled={disabled}
		aria-label={resolvedAriaLabel}
		aria-labelledby={title ? titleId : undefined}
		aria-describedby={describedBy}
		{...props}
	>
		{#if withIcon}
			<div class={iconClasses} aria-hidden="true">
				<span class="leading-none">{iconSymbols[variant]}</span>
			</div>
		{/if}

		<div class="flex min-w-0 flex-1 flex-col gap-1">
			{#if title}
				<Heading level="h4" text={title} class="text-base leading-tight font-semibold" id={titleId}>
					{title}
				</Heading>
			{/if}

			{#if description}
				<MutedText size="sm" class="leading-snug break-words opacity-80" id={descriptionId}>
					{description}
				</MutedText>
			{/if}

			{#if defaultSlot}
				<div
					id={!description ? descriptionId : undefined}
					class="text-base-content text-sm leading-snug"
				>
					{@render defaultSlot?.()}
				</div>
			{/if}
		</div>

		{#if loading}
			<Spinner
				type="spinner"
				size="sm"
				variant={variant === 'neutral' ? 'primary' : variant}
				ariaLabel="Loading alert"
			/>
		{/if}

		{#if actionLabel}
			<Button
				variant="ghost"
				size="sm"
				class="btn-outline"
				onclick={handleAction}
				ariaLabel={actionAriaLabel ?? actionLabel}
				disabled={disabled || loading}
				label={actionLabel}
			/>
		{/if}

		{#if closable}
			<IconButton
				variant="ghost"
				size="sm"
				square
				onclick={handleClose}
				ariaLabel={dismissLabel}
				title={dismissLabel}
				disabled={disabled || loading}
			>
				<span aria-hidden="true">x</span>
			</IconButton>
		{/if}
	</div>
{/if}
