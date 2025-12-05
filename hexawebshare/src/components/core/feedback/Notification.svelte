<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	interface Props {
		/**
		 * Notification message content
		 */
		message: string;
		/**
		 * Optional notification title
		 */
		title?: string;
		/**
		 * Visual variant of the notification
		 */
		variant?: 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the notification
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Whether the notification can be dismissed
		 */
		dismissible?: boolean;
		/**
		 * Callback function when notification is closed
		 */
		onclose?: () => void;
		/**
		 * Custom icon slot
		 */
		icon?: import('svelte').Snippet;
	}

	const {
		message,
		title,
		variant,
		size = 'md',
		dismissible = false,
		onclose,
		icon,
		...props
	}: Props = $props();

	let isVisible = $state(true);

	let notificationClasses = $derived(
		[
			'alert',
			variant === 'info' && 'alert-info',
			variant === 'success' && 'alert-success',
			variant === 'warning' && 'alert-warning',
			variant === 'error' && 'alert-error',
			size === 'sm' && 'alert-sm',
			size === 'md' && 'alert-md',
			size === 'lg' && 'alert-lg'
		]
			.filter(Boolean)
			.join(' ')
	);

	let role = $derived(variant === 'error' ? ('alert' as const) : ('status' as const));
	let ariaLive = $derived(variant === 'error' ? ('assertive' as const) : ('polite' as const));

	function handleClose() {
		isVisible = false;
		onclose?.();
	}
</script>

{#if isVisible}
	<div class={notificationClasses} {role} aria-live={ariaLive} {...props}>
		{#if icon}
			{@render icon()}
		{/if}
		<div class="flex-1">
			{#if title}
				<h3 class="font-bold">{title}</h3>
			{/if}
			<div class="text-sm">{message}</div>
		</div>
		{#if dismissible}
			<button
				type="button"
				class="btn btn-circle btn-ghost btn-sm"
				onclick={handleClose}
				aria-label="Close notification"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		{/if}
	</div>
{/if}
