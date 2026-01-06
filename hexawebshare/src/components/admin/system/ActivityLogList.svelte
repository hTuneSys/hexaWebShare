<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import EmptyState from '../../core/data-display/EmptyState.svelte';
	import Avatar from '../../core/media/Avatar.svelte';
	import type { Snippet } from 'svelte';

	/**
	 * Activity log entry data structure
	 */
	interface ActivityLogEntry {
		/**
		 * Unique identifier for the log entry
		 */
		id: string | number;
		/**
		 * Action or event type (e.g., "User Created", "Settings Updated")
		 */
		action: string;
		/**
		 * User who performed the action
		 */
		user: {
			name: string;
			email?: string;
			avatar?: string;
		};
		/**
		 * Timestamp of the activity
		 */
		timestamp: Date | string;
		/**
		 * Type/category of the activity
		 * @default 'info'
		 */
		type?: 'info' | 'success' | 'warning' | 'error';
		/**
		 * Detailed description of the activity
		 */
		description?: string;
		/**
		 * Additional metadata (optional)
		 */
		metadata?: Record<string, unknown>;
	}

	/**
	 * Props interface for the ActivityLogList component
	 */
	interface Props {
		/**
		 * Array of activity log entries to display
		 */
		items?: ActivityLogEntry[];
		/**
		 * Whether the component is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Size preset for the list items
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Visual variant of the list container
		 * @default 'default'
		 */
		variant?: 'default' | 'bordered' | 'card';
		/**
		 * Whether to show user avatars
		 * @default true
		 */
		showAvatars?: boolean;
		/**
		 * Whether to show timestamps
		 * @default true
		 */
		showTimestamps?: boolean;
		/**
		 * Whether to show action type badges
		 * @default true
		 */
		showBadges?: boolean;
		/**
		 * Maximum number of items to display (0 = unlimited)
		 * @default 0
		 */
		maxItems?: number;
		/**
		 * Empty state title when no items are available
		 * @default 'No activity logs'
		 */
		emptyTitle?: string;
		/**
		 * Empty state description when no items are available
		 * @default 'There are no activity logs to display.'
		 */
		emptyDescription?: string;
		/**
		 * Actions slot for empty state (buttons, links, etc.)
		 */
		emptyActions?: Snippet;
		/**
		 * Callback when an activity log item is clicked
		 */
		onItemClick?: (entry: ActivityLogEntry, index: number) => void;
		/**
		 * Accessible label for the list
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		items = [],
		loading = false,
		size = 'md',
		variant = 'default',
		showAvatars = true,
		showTimestamps = true,
		showBadges = true,
		maxItems = 0,
		emptyTitle = 'No activity logs',
		emptyDescription = 'There are no activity logs to display.',
		emptyActions,
		onItemClick,
		ariaLabel = 'Activity log list',
		class: className = '',
		...props
	}: Props = $props();

	// Format timestamp to relative time or absolute date
	function formatTimestamp(timestamp: Date | string): string {
		const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMs / 3600000);
		const diffDays = Math.floor(diffMs / 86400000);

		if (diffMins < 1) {
			return 'Just now';
		} else if (diffMins < 60) {
			return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
		} else if (diffHours < 24) {
			return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
		} else if (diffDays < 7) {
			return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
		} else {
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		}
	}

	// Get badge classes from activity type (native DaisyUI badge)
	function getBadgeClasses(type?: ActivityLogEntry['type']): string {
		return [
			'badge',
			'badge-xs',
			type === 'success' && 'badge-success',
			type === 'warning' && 'badge-warning',
			type === 'error' && 'badge-error',
			(type === 'info' || !type) && 'badge-info'
		]
			.filter(Boolean)
			.join(' ');
	}

	// Limit items if maxItems is set
	let displayedItems = $derived(
		maxItems > 0 && items.length > maxItems ? items.slice(0, maxItems) : items
	);

	// Container classes using static DaisyUI classes
	let containerClasses = $derived(
		[
			'w-full',
			variant === 'bordered' && 'border border-base-300 rounded-lg p-4',
			variant === 'card' && 'card bg-base-100 shadow-sm border border-base-300',
			variant === 'card' && 'p-6',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// List container classes
	let listClasses = $derived(
		[
			'flex flex-col',
			variant === 'card' && 'divide-y divide-base-200',
			variant === 'default' && 'gap-2',
			variant === 'bordered' && 'gap-2',
			variant === 'card' && 'gap-0'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Handle item click
	function handleItemClick(entry: ActivityLogEntry, index: number) {
		onItemClick?.(entry, index);
	}
</script>

<div class={containerClasses} role="region" aria-label={ariaLabel} {...props}>
	{#if loading}
		<!-- Loading State -->
		<div
			class="flex items-center justify-center py-12"
			role="status"
			aria-label="Loading activity logs"
		>
			<span class="loading loading-spinner loading-md text-primary" aria-hidden="true"></span>
		</div>
	{:else if displayedItems.length === 0}
		<!-- Empty State -->
		<EmptyState
			title={emptyTitle}
			description={emptyDescription}
			variant="neutral"
			size="md"
			actions={emptyActions}
		/>
	{:else}
		<!-- Activity Log List -->
		<div class={listClasses} role="list" aria-label={ariaLabel}>
			{#each displayedItems as entry, index (entry.id)}
				{@const initials = entry.user.name
					.split(' ')
					.map((n) => n[0])
					.join('')
					.toUpperCase()
					.slice(0, 2)}
				{#if onItemClick}
					<!-- Interactive item -->
					<div
						class={[
							'flex w-full items-center gap-3 transition-colors duration-200',
							size === 'sm' && 'px-3 py-2 text-sm',
							size === 'md' && 'px-4 py-3 text-base',
							size === 'lg' && 'px-5 py-4 text-lg',
							'hover:bg-base-200 cursor-pointer',
							variant === 'card' && index < displayedItems.length - 1 && 'border-base-300 border-b'
						]
							.filter(Boolean)
							.join(' ')}
						role="button"
						tabindex="0"
						aria-label={`Activity: ${entry.action}`}
						onclick={() => handleItemClick(entry, index)}
						onkeydown={(e: KeyboardEvent) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								handleItemClick(entry, index);
							}
						}}
					>
						<!-- Leading: Avatar -->
						{#if showAvatars}
							<div class="flex-shrink-0" aria-hidden="true">
								<Avatar
									src={entry.user.avatar}
									alt={entry.user.name}
									placeholder={initials}
									size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
								/>
							</div>
						{/if}

						<!-- Content -->
						<div class="flex min-w-0 flex-1 flex-col gap-1">
							<div class="flex flex-wrap items-center gap-2">
								<span class="text-base-content truncate font-medium">{entry.action}</span>
								{#if showBadges && entry.type}
									<span class={getBadgeClasses(entry.type)} aria-hidden="true">
										{entry.type}
									</span>
								{/if}
							</div>
							{#if entry.description}
								<span class="text-base-content/70 truncate text-sm">{entry.description}</span>
							{/if}
							<div class="text-base-content/60 flex items-center gap-2 text-xs">
								<span class="truncate">{entry.user.name}</span>
								{#if entry.user.email && entry.user.email !== entry.user.name}
									<span class="hidden truncate sm:inline">• {entry.user.email}</span>
								{/if}
								{#if showTimestamps}
									<span class="hidden sm:inline">• {formatTimestamp(entry.timestamp)}</span>
								{/if}
							</div>
						</div>

						<!-- Trailing: Timestamp (mobile) -->
						{#if showTimestamps}
							<div class="flex-shrink-0 sm:hidden">
								<span class="text-base-content/60 text-xs">
									{formatTimestamp(entry.timestamp)}
								</span>
							</div>
						{/if}
					</div>
				{:else}
					<!-- Non-interactive item -->
					<div
						class={[
							'flex w-full items-center gap-3 transition-colors duration-200',
							size === 'sm' && 'px-3 py-2 text-sm',
							size === 'md' && 'px-4 py-3 text-base',
							size === 'lg' && 'px-5 py-4 text-lg',
							variant === 'card' && index < displayedItems.length - 1 && 'border-base-300 border-b'
						]
							.filter(Boolean)
							.join(' ')}
						role="listitem"
					>
						<!-- Leading: Avatar -->
						{#if showAvatars}
							<div class="flex-shrink-0" aria-hidden="true">
								<Avatar
									src={entry.user.avatar}
									alt={entry.user.name}
									placeholder={initials}
									size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
								/>
							</div>
						{/if}

						<!-- Content -->
						<div class="flex min-w-0 flex-1 flex-col gap-1">
							<div class="flex flex-wrap items-center gap-2">
								<span class="text-base-content truncate font-medium">{entry.action}</span>
								{#if showBadges && entry.type}
									<span class={getBadgeClasses(entry.type)} aria-hidden="true">
										{entry.type}
									</span>
								{/if}
							</div>
							{#if entry.description}
								<span class="text-base-content/70 truncate text-sm">{entry.description}</span>
							{/if}
							<div class="text-base-content/60 flex items-center gap-2 text-xs">
								<span class="truncate">{entry.user.name}</span>
								{#if entry.user.email && entry.user.email !== entry.user.name}
									<span class="hidden truncate sm:inline">• {entry.user.email}</span>
								{/if}
								{#if showTimestamps}
									<span class="hidden sm:inline">• {formatTimestamp(entry.timestamp)}</span>
								{/if}
							</div>
						</div>

						<!-- Trailing: Timestamp (mobile) -->
						{#if showTimestamps}
							<div class="flex-shrink-0 sm:hidden">
								<span class="text-base-content/60 text-xs">
									{formatTimestamp(entry.timestamp)}
								</span>
							</div>
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>
