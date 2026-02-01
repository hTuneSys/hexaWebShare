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
	import Text from '../../core/typography/Text.svelte';
	import Icon from '../../core/media/Icon.svelte';
	import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
	import Check from 'lucide-svelte/icons/check';
	import X from 'lucide-svelte/icons/x';
	import Bell from 'lucide-svelte/icons/bell';

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
		 * Custom timestamp formatter function
		 * @default Built-in relative time formatter
		 */
		formatTimestamp?: (timestamp: Date | string | undefined) => string;
		/**
		 * Label for "Mark all as read" action
		 * @default 'Mark all as read'
		 */
		markAllReadLabel?: string;
		/**
		 * Label for "Clear all" action
		 * @default 'Clear all'
		 */
		clearAllLabel?: string;
		/**
		 * Empty state title text
		 * @default 'No notifications'
		 */
		emptyStateTitle?: string;
		/**
		 * Empty state description text
		 * @default 'You're all caught up!'
		 */
		emptyStateDescription?: string;
		/**
		 * Aria-label for loading state
		 * @default 'Loading notifications'
		 */
		loadingAriaLabel?: string;
		/**
		 * Aria-label for empty state
		 * @default 'No notifications available'
		 */
		emptyAriaLabel?: string;
		/**
		 * Aria-label for notification options menu
		 * @default 'Notification options menu'
		 */
		optionsMenuAriaLabel?: string;
		/**
		 * Aria-label for unread count badge
		 * @default ' unread'
		 */
		unreadAriaLabelSuffix?: string;
		/**
		 * Aria-label for mark as read button
		 * @default 'Mark notification as read'
		 */
		markAsReadAriaLabel?: string;
		/**
		 * Aria-label for delete notification button
		 * @default 'Delete notification'
		 */
		deleteNotificationAriaLabel?: string;
		/**
		 * Aria-label for notification actions group
		 * @default 'Notification actions'
		 */
		notificationActionsAriaLabel?: string;
		/**
		 * Label for information variant in screen readers
		 * @default 'Information'
		 */
		variantInfoLabel?: string;
		/**
		 * Label for success variant in screen readers
		 * @default 'Success'
		 */
		variantSuccessLabel?: string;
		/**
		 * Label for warning variant in screen readers
		 * @default 'Warning'
		 */
		variantWarningLabel?: string;
		/**
		 * Label for error variant in screen readers
		 * @default 'Error'
		 */
		variantErrorLabel?: string;
		/**
		 * Default label for notification variant in screen readers
		 * @default 'Notification'
		 */
		variantDefaultLabel?: string;
		/**
		 * Suffix appended to unread notifications in aria-label
		 * @default '. Unread'
		 */
		unreadSuffix?: string;
		/**
		 * Text for "just now" timestamp
		 * @default 'Just now'
		 */
		timestampJustNow?: string;
		/**
		 * Format string for minutes ago (use {0} for number)
		 * @default '{0}m ago'
		 */
		timestampMinutesAgo?: string;
		/**
		 * Format string for hours ago (use {0} for number)
		 * @default '{0}h ago'
		 */
		timestampHoursAgo?: string;
		/**
		 * Format string for days ago (use {0} for number)
		 * @default '{0}d ago'
		 */
		timestampDaysAgo?: string;
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
		formatTimestamp: customFormatTimestamp,
		markAllReadLabel = 'Mark all as read',
		clearAllLabel = 'Clear all',
		emptyStateTitle = 'No notifications',
		emptyStateDescription = "You're all caught up!",
		loadingAriaLabel = 'Loading notifications',
		emptyAriaLabel = 'No notifications available',
		optionsMenuAriaLabel = 'Notification options menu',
		unreadAriaLabelSuffix = ' unread',
		markAsReadAriaLabel = 'Mark notification as read',
		deleteNotificationAriaLabel = 'Delete notification',
		notificationActionsAriaLabel = 'Notification actions',
		variantInfoLabel = 'Information',
		variantSuccessLabel = 'Success',
		variantWarningLabel = 'Warning',
		variantErrorLabel = 'Error',
		variantDefaultLabel = 'Notification',
		unreadSuffix = '. Unread',
		timestampJustNow = 'Just now',
		timestampMinutesAgo = '{0}m ago',
		timestampHoursAgo = '{0}h ago',
		timestampDaysAgo = '{0}d ago',
		class: className = ''
	}: Props = $props();

	// Generate unique ID for ARIA references
	const componentId = $derived(`notification-center-${Math.random().toString(36).substring(2, 9)}`);

	// Count unread notifications
	let unreadCount = $derived(notifications.filter((n) => !n.read).length);

	// Computed aria label
	let computedAriaLabel = $derived(
		ariaLabel ||
			`${title}${unreadCount > 0 ? `, ${unreadCount}${unreadAriaLabelSuffix}` : `, no${unreadAriaLabelSuffix}`}`
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
				return variantInfoLabel;
			case 'success':
				return variantSuccessLabel;
			case 'warning':
				return variantWarningLabel;
			case 'error':
				return variantErrorLabel;
			default:
				return variantDefaultLabel;
		}
	}

	// Default timestamp formatter with externalized strings
	function defaultFormatTimestamp(timestamp: Date | string | undefined): string {
		if (!timestamp) return '';
		const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(diff / 3600000);
		const days = Math.floor(diff / 86400000);

		if (minutes < 1) return timestampJustNow;
		if (minutes < 60) return timestampMinutesAgo.replace('{0}', minutes.toString());
		if (hours < 24) return timestampHoursAgo.replace('{0}', hours.toString());
		if (days < 7) return timestampDaysAgo.replace('{0}', days.toString());
		return date.toLocaleDateString();
	}

	// Use custom formatter if provided, otherwise use default
	const formatTimestamp = customFormatTimestamp || defaultFormatTimestamp;

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
						label: markAllReadLabel,
						onClick: handleMarkAllRead
					}
				]
			: []),
		{
			id: 'clear-all',
			label: clearAllLabel,
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
								ariaLabel="{unreadCount}{unreadAriaLabelSuffix}"
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
						ariaLabel={optionsMenuAriaLabel}
					>
						{#snippet trigger()}
							<IconButton
								variant="ghost"
								size="sm"
								square={true}
								ariaLabel={optionsMenuAriaLabel}
								{disabled}
							>
								{#snippet children()}
									<Icon size="sm" ariaHidden={true}>
										<EllipsisVertical />
									</Icon>
								{/snippet}
							</IconButton>
						{/snippet}
					</Dropdown>
				{/if}
			</div>

			<!-- Notification List -->
			{#if loading}
				<div class="flex justify-center py-12" role="status" aria-label={loadingAriaLabel}>
					<Spinner type="spinner" size="md" variant="primary" ariaLabel={loadingAriaLabel} />
				</div>
			{:else if notifications.length === 0}
				<EmptyState
					title={emptyStateTitle}
					description={emptyStateDescription}
					variant="neutral"
					size="md"
					ariaLabel={emptyAriaLabel}
				>
					{#snippet icon()}
						<Icon size="lg" ariaHidden={true} class="text-base-content/20">
							<Bell />
						</Icon>
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
								{@const itemAriaLabel = `${getVariantLabel(notification.variant)}: ${notification.title}${notification.message ? `. ${notification.message}` : ''}${notification.timestamp ? `. ${formatTimestamp(notification.timestamp)}` : ''}${!notification.read ? unreadSuffix : ''}`}
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
											<Text 
												text={notification.title} 
												size="sm" 
												weight={!notification.read ? 'semibold' : 'normal'} 
											/>
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
											<Text 
												text={notification.message} 
												variant="muted" 
												size="xs" 
												display="block" 
												class="mt-0.5" 
											/>
										{/if}
									</div>
								{/snippet}
									{#snippet trailing()}
										<div class="flex shrink-0 gap-1" role="group" aria-label={notificationActionsAriaLabel}>
											{#if !notification.read}
												<IconButton
													variant="ghost"
													size="xs"
													ariaLabel={markAsReadAriaLabel}
													onclick={() => handleRead(notification.id)}
													{disabled}
												>
													{#snippet children()}
														<Icon size="xs" ariaHidden={true}>
															<Check />
														</Icon>
													{/snippet}
												</IconButton>
											{/if}
											<IconButton
												variant="ghost"
												size="xs"
												ariaLabel={deleteNotificationAriaLabel}
												onclick={() => handleDelete(notification.id)}
												{disabled}
											>
												{#snippet children()}
													<Icon size="xs" ariaHidden={true}>
														<X />
													</Icon>
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
