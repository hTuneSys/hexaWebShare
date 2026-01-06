<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Notification item interface
	 */
	export interface NotificationItem {
		/** Unique identifier for the notification */
		id: string;
		/** Notification title */
		title: string;
		/** Notification message/description */
		message?: string;
		/** Notification type/variant */
		variant?: 'info' | 'success' | 'warning' | 'error';
		/** Whether the notification has been read */
		read?: boolean;
		/** Timestamp of the notification */
		timestamp?: Date | string;
	}

	/**
	 * Props interface for the NotificationCenter component
	 */
	interface Props {
		/**
		 * Array of notifications to display
		 * @default []
		 */
		notifications?: NotificationItem[];
		/**
		 * Title of the notification center
		 * @default 'Notifications'
		 */
		title?: string;
		/**
		 * Whether the component is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the component is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Maximum height of the notification list (enables scrolling)
		 * @default '320px'
		 */
		maxHeight?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Callback when a notification is marked as read
		 */
		onread?: (id: string) => void;
		/**
		 * Callback when a notification is deleted
		 */
		ondelete?: (id: string) => void;
		/**
		 * Callback when all notifications are marked as read
		 */
		onmarkallread?: () => void;
		/**
		 * Callback when all notifications are cleared
		 */
		onclearall?: () => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		notifications = [],
		title = 'Notifications',
		loading = false,
		disabled = false,
		maxHeight = '320px',
		ariaLabel,
		onread,
		ondelete,
		onmarkallread,
		onclearall,
		class: className = ''
	}: Props = $props();

	// Generate unique ID for ARIA references
	const componentId = $derived(`notification-center-${Math.random().toString(36).substring(2, 9)}`);

	// Count unread notifications
	let unreadCount = $derived(notifications.filter((n) => !n.read).length);

	// Computed aria label
	let computedAriaLabel = $derived(
		ariaLabel ||
			`${title}${unreadCount > 0 ? `, ${unreadCount} unread` : ', no unread notifications'}`
	);

	// Container classes
	let containerClasses = $derived(
		[
			'card',
			'bg-base-100',
			'shadow-lg',
			'w-full',
			'max-w-md',
			disabled && 'pointer-events-none opacity-50',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Get variant indicator classes
	function getVariantClasses(variant: NotificationItem['variant']): string {
		return [
			'w-2',
			'h-2',
			'rounded-full',
			'mt-1.5',
			'shrink-0',
			variant === 'info' && 'bg-info',
			variant === 'success' && 'bg-success',
			variant === 'warning' && 'bg-warning',
			variant === 'error' && 'bg-error',
			!variant && 'bg-base-content/30'
		]
			.filter(Boolean)
			.join(' ');
	}

	// Get notification item classes
	function getItemClasses(read: boolean | undefined): string {
		return [
			'flex',
			'w-full',
			'items-start',
			'gap-3',
			'rounded-lg',
			'p-3',
			'transition-all',
			'duration-200',
			'focus-within:ring-2',
			'focus-within:ring-primary/50',
			!read && 'bg-base-200',
			read && 'hover:bg-base-200/50'
		]
			.filter(Boolean)
			.join(' ');
	}

	// Get variant label for screen readers
	function getVariantLabel(variant: NotificationItem['variant']): string {
		switch (variant) {
			case 'info':
				return 'Information';
			case 'success':
				return 'Success';
			case 'warning':
				return 'Warning';
			case 'error':
				return 'Error';
			default:
				return 'Notification';
		}
	}

	// Format timestamp
	function formatTimestamp(timestamp: Date | string | undefined): string {
		if (!timestamp) return '';
		const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(diff / 3600000);
		const days = Math.floor(diff / 86400000);

		if (minutes < 1) return 'Just now';
		if (minutes < 60) return `${minutes}m ago`;
		if (hours < 24) return `${hours}h ago`;
		if (days < 7) return `${days}d ago`;
		return date.toLocaleDateString();
	}

	// Handle mark as read
	function handleRead(id: string) {
		if (!disabled && onread) {
			onread(id);
		}
	}

	// Handle delete
	function handleDelete(id: string) {
		if (!disabled && ondelete) {
			ondelete(id);
		}
	}

	// Handle mark all as read
	function handleMarkAllRead() {
		if (!disabled && onmarkallread) {
			onmarkallread();
		}
	}

	// Handle clear all
	function handleClearAll() {
		if (!disabled && onclearall) {
			onclearall();
		}
	}

	// Keyboard handler for notification items
	function handleKeyDown(event: KeyboardEvent, notification: NotificationItem) {
		if (disabled) return;

		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault();
				if (!notification.read) {
					handleRead(notification.id);
				}
				break;
			case 'Delete':
			case 'Backspace':
				event.preventDefault();
				handleDelete(notification.id);
				break;
		}
	}
</script>

<div
	class={containerClasses}
	role="region"
	aria-label={computedAriaLabel}
	aria-busy={loading}
	aria-disabled={disabled}
>
	<div class="card-body p-0">
		<!-- Header -->
		<div class="border-base-200 flex items-center justify-between border-b px-4 py-3">
			<h2 id="{componentId}-title" class="flex items-center gap-2 text-lg font-semibold">
				{title}
				{#if unreadCount > 0}
					<span class="badge badge-primary badge-sm" aria-label="{unreadCount} unread">
						{unreadCount}
					</span>
				{/if}
			</h2>

			<!-- Header Actions Dropdown -->
			{#if notifications.length > 0 && !loading}
				<div class="dropdown dropdown-end">
					<button
						type="button"
						class="btn btn-ghost btn-sm btn-square"
						aria-label="Notification options menu"
						aria-haspopup="menu"
						{disabled}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
							/>
						</svg>
					</button>
					<ul
						class="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-lg"
						role="menu"
						aria-label="Notification actions"
					>
						{#if unreadCount > 0}
							<li role="none">
								<button type="button" onclick={handleMarkAllRead} role="menuitem">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									Mark all as read
								</button>
							</li>
						{/if}
						<li role="none">
							<button type="button" onclick={handleClearAll} class="text-error" role="menuitem">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
								Clear all
							</button>
						</li>
					</ul>
				</div>
			{/if}
		</div>

		<!-- Notification List -->
		{#if loading}
			<div class="flex justify-center py-12" role="status" aria-label="Loading notifications">
				<span class="loading loading-spinner loading-md"></span>
				<span class="sr-only">Loading notifications...</span>
			</div>
		{:else if notifications.length === 0}
			<div class="flex flex-col items-center justify-center py-12 text-center" role="status">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="text-base-content/20 mb-3 h-12 w-12"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
				<p class="text-base-content/60">No notifications</p>
				<p class="text-base-content/40 mt-1 text-xs">You're all caught up!</p>
			</div>
		{:else}
			<ul
				class="flex flex-col gap-0.5 overflow-y-auto p-2"
				style="max-height: {maxHeight};"
				role="list"
				aria-labelledby="{componentId}-title"
				aria-live="polite"
				aria-relevant="additions removals"
			>
				{#each notifications as notification (notification.id)}
					{@const itemAriaLabel = `${getVariantLabel(notification.variant)}: ${notification.title}${notification.message ? `. ${notification.message}` : ''}${notification.timestamp ? `. ${formatTimestamp(notification.timestamp)}` : ''}${!notification.read ? '. Unread' : ''}`}
					<li
						class={getItemClasses(notification.read)}
						role="listitem"
						tabindex="0"
						aria-label={itemAriaLabel}
						onkeydown={(e) => handleKeyDown(e, notification)}
					>
						<!-- Variant indicator -->
						<span
							class={getVariantClasses(notification.variant)}
							aria-hidden="true"
							role="presentation"
						></span>

						<!-- Content -->
						<div class="min-w-0 flex-1">
							<div class="flex items-start justify-between gap-2">
								<p class="text-sm" class:font-semibold={!notification.read}>
									{notification.title}
								</p>
								{#if notification.timestamp}
									<time
										class="text-base-content/50 shrink-0 text-xs"
										datetime={typeof notification.timestamp === 'string'
											? notification.timestamp
											: notification.timestamp.toISOString()}
									>
										{formatTimestamp(notification.timestamp)}
									</time>
								{/if}
							</div>
							{#if notification.message}
								<p class="text-base-content/70 mt-0.5 text-xs">{notification.message}</p>
							{/if}
						</div>

						<!-- Actions -->
						<div class="flex shrink-0 gap-1" role="group" aria-label="Notification actions">
							{#if !notification.read}
								<button
									type="button"
									class="btn btn-ghost btn-xs"
									onclick={() => handleRead(notification.id)}
									aria-label="Mark notification as read"
									title="Mark as read"
									{disabled}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</button>
							{/if}
							<button
								type="button"
								class="btn btn-ghost btn-xs"
								onclick={() => handleDelete(notification.id)}
								aria-label="Delete notification"
								title="Delete notification"
								{disabled}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
