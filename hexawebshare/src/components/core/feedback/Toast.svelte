<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';

	type ToastVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';
	type ToastPosition =
		| 'top-left'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-right'
		| 'top-center'
		| 'bottom-center';
	type LiveSetting = 'polite' | 'assertive';

	/**
	 * Toast notification component
	 *
	 * Note: This is a single-toast component. For multiple simultaneous toasts,
	 * use a toast manager or queue system (not included).
	 *
	 * @example
	 * <Toast message="Saved" variant="success" />
	 */
	interface Props {
		/** Main message shown inside the toast */
		message?: string;
		/** Optional title displayed above the message */
		title?: string;
		/** Visual style of the toast */
		variant?: ToastVariant;
		/** Screen position where the toast appears */
		position?: ToastPosition;
		/** When true, renders a close button */
		closable?: boolean;
		/** Auto-dismiss duration in milliseconds. Set to null to keep it on screen. */
		duration?: number | null;
		/** Pause auto-dismiss while the user hovers the toast */
		pauseOnHover?: boolean;
		/** Show a subtle leading indicator */
		showIcon?: boolean;
		/** Show a loading spinner inside the toast */
		loading?: boolean;
		/** Disable interactive controls (action and close) */
		disabled?: boolean;
		/** Optional action button label */
		actionLabel?: string;
		/** Optional callback fired when the action button is clicked */
		onAction?: () => void;
		/** Optional callback fired when the toast is dismissed */
		onDismiss?: () => void;
		/**
		 * Automatically dismiss toast after action button is clicked
		 * @default true
		 */
		dismissOnAction?: boolean;
		/** ARIA live setting */
		ariaLive?: LiveSetting;
		/** Custom ARIA label */
		ariaLabel?: string;
		/** Additional classes applied to the outer container */
		class?: string;
	}

	const dispatch = createEventDispatcher<{ dismiss: void; action: void }>();

	const {
		message = 'Notification',
		title,
		variant = 'info',
		position = 'top-right',
		closable = true,
		duration = null,
		pauseOnHover = true,
		showIcon = false,
		loading = false,
		disabled = false,
		actionLabel,
		onAction,
		onDismiss,
		dismissOnAction = true,
		ariaLive = variant === 'error' || variant === 'warning' ? 'assertive' : 'polite',
		ariaLabel = 'Toast notification',
		class: className = '',
		...props
	}: Props = $props();

	const positionClasses: Record<ToastPosition, string> = {
		'top-left': 'toast-top toast-start',
		'top-right': 'toast-top toast-end',
		'bottom-left': 'toast-bottom toast-start',
		'bottom-right': 'toast-bottom toast-end',
		'top-center': 'toast-top toast-center',
		'bottom-center': 'toast-bottom toast-center'
	};

	const variantClasses: Record<ToastVariant, string> = {
		info: 'alert-info',
		success: 'alert-success',
		warning: 'alert-warning',
		error: 'alert-error',
		neutral: 'alert-neutral'
	};

	const indicatorText: Record<ToastVariant, string> = {
		info: 'I',
		success: 'S',
		warning: 'W',
		error: 'E',
		neutral: 'N'
	};

	let visible = $state(true);
	let isHovering = $state(false);
	let startTime = $state<number | null>(null);
	let remainingTime = $state(duration);
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	let containerClasses = $derived(
		['toast', positionClasses[position], className].filter(Boolean).join(' ')
	);

	let toastClasses = $derived(
		[
			'alert',
			'shadow-lg',
			'max-w-sm',
			'w-full',
			'transition-opacity',
			'duration-200',
			variantClasses[variant],
			disabled && 'opacity-60 cursor-not-allowed'
		]
			.filter(Boolean)
			.join(' ')
	);

	let liveRegionRole = $derived(ariaLive === 'assertive' ? 'alert' : 'status');

	function clearTimer() {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}

		startTime = null;
	}

	function scheduleDismiss() {
		if (remainingTime === null || remainingTime <= 0) {
			clearTimer();
			return;
		}

		clearTimer();
		startTime = Date.now();
		timeoutId = setTimeout(() => {
			handleDismiss();
		}, remainingTime);
	}

	function pauseTimer() {
		if (timeoutId && startTime !== null) {
			const elapsed = Date.now() - startTime;
			remainingTime = Math.max(0, (remainingTime ?? duration ?? 0) - elapsed);
			clearTimer();
		}
	}

	$effect(() => {
		if (!visible) {
			clearTimer();
			return;
		}

		if (duration === null || duration <= 0) {
			clearTimer();
			return;
		}

		if (pauseOnHover && isHovering) {
			pauseTimer();
			return;
		}

		if (remainingTime === null) {
			remainingTime = duration;
		}

		scheduleDismiss();
	});

	function handleDismiss() {
		if (!visible) return;

		visible = false;
		clearTimer();
		onDismiss?.();
		dispatch('dismiss');
	}

	function handleAction() {
		if (disabled) return;

		onAction?.();
		dispatch('action');

		if (dismissOnAction) {
			handleDismiss();
		}
	}

	function handleMouseEnter() {
		isHovering = true;
	}

	function handleMouseLeave() {
		isHovering = false;
	}

	onDestroy(clearTimer);
</script>

{#if visible}
	<div class={containerClasses}>
		<div
			class={toastClasses}
			role={liveRegionRole}
			aria-live={ariaLive}
			aria-label={ariaLabel}
			aria-disabled={disabled}
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
			{...props}
		>
			<div class="flex w-full items-start gap-3">
				{#if showIcon}
					<span
						class="bg-base-200 text-base-content inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
						aria-hidden="true"
					>
						{indicatorText[variant]}
					</span>
				{/if}

				{#if loading}
					<span class="loading loading-spinner loading-sm text-current" aria-hidden="true"></span>
				{/if}

				<div class="flex-1 space-y-1">
					{#if title}
						<p class="font-semibold leading-tight">{title}</p>
					{/if}
					<p class="text-sm leading-snug">{message}</p>
				</div>

				{#if actionLabel}
					<button type="button" class="btn btn-ghost btn-sm" onclick={handleAction} {disabled}>
						{actionLabel}
					</button>
				{/if}

				{#if closable}
					<button
						type="button"
						class="btn btn-square btn-ghost btn-sm"
						aria-label="Close notification"
						onclick={handleDismiss}
						{disabled}
					>
						<span aria-hidden="true">&times;</span>
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
