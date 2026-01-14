<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Card from '../../core/layout/Card.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';
	import Badge from '../../core/media/Badge.svelte';
	import Dropdown from '../../core/overlay-navigation/Dropdown.svelte';
	import type { DropdownItem } from '../../core/overlay-navigation/Dropdown.svelte';
	import EmptyState from '../../core/data-display/EmptyState.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';
	import List from '../../core/data-display/List.svelte';
	import ListItem from '../../core/data-display/ListItem.svelte';
	import Heading from '../../core/typography/Heading.svelte';

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

	// Dropdown items for header actions
	let dropdownItems = $derived<DropdownItem[]>([
		...(unreadCount > 0
			? [
					{
						id: 'mark-all-read',
						label: 'Mark all as read',
						onClick: handleMarkAllRead
					}
				]
			: []),
		{
			id: 'clear-all',
			label: 'Clear all',
			onClick: handleClearAll,
			divider: unreadCount > 0
		}
	]);

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

<Card
	shadowSize="lg"
	{disabled}
	ariaLabel={computedAriaLabel}
	role="region"
	class="w-full max-w-md {className}"
>
	{#snippet children()}
		<div class="p-0">
			<!-- Header -->
			<div class="border-base-200 flex items-center justify-between border-b px-4 py-3">
				<Heading
					level="h2"
					size="lg"
					weight="semibold"
					class="flex items-center gap-2"
					{...{ id: `${componentId}-title` }}
				>
					{#snippet children()}
						{title}
						{#if unreadCount > 0}
							<Badge
								label={unreadCount.toString()}
								variant="primary"
								size="sm"
								ariaLabel="{unreadCount} unread"
							/>
						{/if}
					{/snippet}
				</Heading>

				<!-- Header Actions Dropdown -->
				{#if notifications.length > 0 && !loading}
					<Dropdown
						items={dropdownItems}
						position="bottom"
						align="end"
						{disabled}
						ariaLabel="Notification options menu"
					>
						{#snippet trigger()}
							<IconButton
								variant="ghost"
								size="sm"
								square={true}
								ariaLabel="Notification options menu"
								{disabled}
							>
								{#snippet children()}
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
								{/snippet}
							</IconButton>
						{/snippet}
					</Dropdown>
				{/if}
			</div>

			<!-- Notification List -->
			{#if loading}
				<div class="flex justify-center py-12" role="status" aria-label="Loading notifications">
					<Spinner type="spinner" size="md" variant="primary" ariaLabel="Loading notifications" />
				</div>
			{:else if notifications.length === 0}
				<EmptyState
					title="No notifications"
					description="You're all caught up!"
					variant="neutral"
					size="md"
					ariaLabel="No notifications available"
				>
					{#snippet icon()}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="text-base-content/20 h-8 w-8"
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
					{/snippet}
				</EmptyState>
			{:else}
				<div
					style="max-height: {maxHeight};"
					class="overflow-y-auto"
					aria-live="polite"
					aria-relevant="additions removals"
				>
					<List
						variant="hoverable"
						size="md"
						compact={true}
						ariaLabelledby="{componentId}-title"
						class="p-2"
					>
						{#snippet children()}
							{#each notifications as notification (notification.id)}
								{@const itemAriaLabel = `${getVariantLabel(notification.variant)}: ${notification.title}${notification.message ? `. ${notification.message}` : ''}${notification.timestamp ? `. ${formatTimestamp(notification.timestamp)}` : ''}${!notification.read ? '. Unread' : ''}`}
								<ListItem
									label={notification.title}
									description={notification.message}
									variant={notification.variant || 'neutral'}
									size="sm"
									active={!notification.read}
									{disabled}
									ariaLabel={itemAriaLabel}
									class={!notification.read ? 'bg-base-200' : ''}
									onkeydown={(e) => handleKeyDown(e, notification)}
								>
									{#snippet leading()}
										<span
											class={getVariantClasses(notification.variant)}
											aria-hidden="true"
											role="presentation"
										></span>
									{/snippet}
									{#snippet children()}
										<div class="min-w-0 flex-1">
											<div class="flex items-start justify-between gap-2">
												<span class="text-sm" class:font-semibold={!notification.read}>
													{notification.title}
												</span>
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
												<span class="text-base-content/70 mt-0.5 block text-xs"
													>{notification.message}</span
												>
											{/if}
										</div>
									{/snippet}
									{#snippet trailing()}
										<div class="flex shrink-0 gap-1" role="group" aria-label="Notification actions">
											{#if !notification.read}
												<IconButton
													variant="ghost"
													size="xs"
													ariaLabel="Mark notification as read"
													onclick={() => handleRead(notification.id)}
													{disabled}
												>
													{#snippet children()}
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
													{/snippet}
												</IconButton>
											{/if}
											<IconButton
												variant="ghost"
												size="xs"
												ariaLabel="Delete notification"
												onclick={() => handleDelete(notification.id)}
												{disabled}
											>
												{#snippet children()}
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
												{/snippet}
											</IconButton>
										</div>
									{/snippet}
								</ListItem>
							{/each}
						{/snippet}
					</List>
				</div>
			{/if}
		</div>
	{/snippet}
</Card>
