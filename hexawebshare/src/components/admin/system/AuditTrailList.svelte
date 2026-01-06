<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import EmptyState from '../../core/data-display/EmptyState.svelte';
	import Alert from '../../core/feedback/Alert.svelte';

	/**
	 * User information for audit trail entries
	 */
	export interface AuditTrailUser {
		id: string | number;
		name: string;
		email?: string;
		avatar?: string;
	}

	/**
	 * Change details for audit trail entries
	 */
	export interface AuditTrailChange {
		field: string;
		oldValue: string | number | boolean | null;
		newValue: string | number | boolean | null;
	}

	/**
	 * Audit trail entry data structure
	 */
	export interface AuditTrailItem {
		id: string | number;
		user: AuditTrailUser;
		action: 'created' | 'updated' | 'deleted' | 'viewed' | 'exported' | 'imported' | 'logged_in' | 'logged_out' | 'permission_changed' | 'other';
		entity: string;
		entityId?: string | number;
		timestamp: Date | string;
		details?: string;
		ipAddress?: string;
		userAgent?: string;
		changes?: AuditTrailChange[];
	}

	/**
	 * Props interface for AuditTrailList component
	 */
	interface Props {
		/**
		 * Array of audit trail items to display
		 * @default []
		 */
		items?: AuditTrailItem[];
		/**
		 * Loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Error message to display
		 */
		error?: string | null;
		/**
		 * Visual variant of the list
		 * @default 'default'
		 */
		variant?: 'default' | 'bordered' | 'compact';
		/**
		 * Size preset for the list items
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Message to display when list is empty
		 * @default 'No audit trail entries found'
		 */
		emptyMessage?: string;
		/**
		 * Callback when an item is clicked
		 */
		onItemClick?: (item: AuditTrailItem, index: number) => void;
		/**
		 * Accessible label for the list
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	// Props destructuring with defaults
	const {
		items = [],
		loading = false,
		error = null,
		variant = 'default',
		size = 'md',
		emptyMessage = 'No audit trail entries found',
		onItemClick,
		ariaLabel,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID for accessibility
	const listId = `audit-trail-list-${Math.random().toString(36).substring(2, 9)}`;

	// Track focused item index for keyboard navigation
	let focusedIndex = $state(-1);

	// Format timestamp to readable string
	function formatTimestamp(timestamp: Date | string): string {
		const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	// Format action text
	function formatAction(action: AuditTrailItem['action']): string {
		const actionMap: Record<AuditTrailItem['action'], string> = {
			created: 'Created',
			updated: 'Updated',
			deleted: 'Deleted',
			viewed: 'Viewed',
			exported: 'Exported',
			imported: 'Imported',
			logged_in: 'Logged In',
			logged_out: 'Logged Out',
			permission_changed: 'Permission Changed',
			other: 'Other'
		};
		return actionMap[action] || action;
	}

	// Handle item click
	function handleItemClick(item: AuditTrailItem, index: number) {
		if (onItemClick) {
			onItemClick(item, index);
		}
	}

	// Handle keyboard navigation
	function handleKeyDown(event: KeyboardEvent, item: AuditTrailItem, index: number) {
		if (!onItemClick) return;

		switch (event.key) {
			case 'ArrowDown': {
				event.preventDefault();
				const nextIndex = (index + 1) % items.length;
				focusedIndex = nextIndex;
				focusItem(nextIndex);
				break;
			}
			case 'ArrowUp': {
				event.preventDefault();
				const prevIndex = (index - 1 + items.length) % items.length;
				focusedIndex = prevIndex;
				focusItem(prevIndex);
				break;
			}
			case 'Home': {
				event.preventDefault();
				focusedIndex = 0;
				focusItem(0);
				break;
			}
			case 'End': {
				event.preventDefault();
				const lastIndex = items.length - 1;
				focusedIndex = lastIndex;
				focusItem(lastIndex);
				break;
			}
			case 'Enter':
			case ' ': {
				event.preventDefault();
				handleItemClick(item, index);
				break;
			}
		}
	}

	// Focus a specific item by index
	function focusItem(index: number) {
		const element = document.getElementById(`${listId}-item-${index}`);
		if (element) {
			element.focus();
		}
	}

	// Handle focus events
	function handleFocus(index: number) {
		focusedIndex = index;
	}

	function handleBlur() {
		// Keep focus index for keyboard navigation continuity
	}

	// Container classes based on variant
	let containerClasses = $derived(
		[
			'w-full bg-base-100',
			variant === 'bordered' && 'rounded-box border border-base-300',
			variant === 'compact' && 'divide-y divide-base-200',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Item classes based on variant and size
	let itemClasses = $derived(
		[
			'flex flex-col gap-2 transition-colors duration-200',
			// Size classes
			size === 'sm' && 'p-3',
			size === 'md' && 'p-4',
			size === 'lg' && 'p-5',
			// Variant classes
			variant === 'default' && 'border-b border-base-300 last:border-b-0',
			variant === 'bordered' && 'border-b border-base-300 last:border-b-0',
			variant === 'compact' && 'py-2',
			// Hover effect
			onItemClick && 'hover:bg-base-200 cursor-pointer'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Avatar size classes
	let avatarClasses = $derived(
		[
			'rounded-full flex items-center justify-center',
			size === 'sm' && 'w-8 h-8 text-xs',
			size === 'md' && 'w-10 h-10 text-sm',
			size === 'lg' && 'w-12 h-12 text-base'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Text size classes
	let nameClasses = $derived(
		[
			'font-semibold',
			size === 'sm' && 'text-sm',
			size === 'md' && 'text-base',
			size === 'lg' && 'text-lg'
		]
			.filter(Boolean)
			.join(' ')
	);

	let emailClasses = $derived(
		[
			'text-base-content/60',
			size === 'sm' && 'text-xs',
			size === 'md' && 'text-sm',
			size === 'lg' && 'text-base'
		]
			.filter(Boolean)
			.join(' ')
	);

	let timestampClasses = $derived(
		[
			'text-base-content/60',
			size === 'sm' && 'text-xs',
			size === 'md' && 'text-sm',
			size === 'lg' && 'text-base'
		]
			.filter(Boolean)
			.join(' ')
	);

	let actionClasses = $derived(
		[
			'font-medium',
			size === 'sm' && 'text-xs',
			size === 'md' && 'text-sm',
			size === 'lg' && 'text-base'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div
	id={listId}
	class={containerClasses}
	role="list"
	aria-label={ariaLabel || 'Audit trail list'}
	aria-busy={loading}
	{...props}
>
	{#if loading}
		<!-- Loading skeleton -->
		{#each Array(3) as _, index}
			<div
				role="listitem"
				class={itemClasses}
				aria-label="Loading audit trail entry"
			>
				<div class="flex items-start justify-between gap-4">
					<div class="flex items-center gap-3 flex-1 min-w-0">
						<div class={[avatarClasses, 'bg-base-300 skeleton'].filter(Boolean).join(' ')}></div>
						<div class="flex-1 min-w-0 space-y-2">
							<div class={[nameClasses, 'skeleton h-4 w-32'].filter(Boolean).join(' ')}></div>
							<div class={[emailClasses, 'skeleton h-3 w-40'].filter(Boolean).join(' ')}></div>
						</div>
					</div>
					<div class={[timestampClasses, 'skeleton h-4 w-24'].filter(Boolean).join(' ')}></div>
				</div>
				<div
					class={[
						size === 'sm' && 'ml-11',
						size === 'md' && 'ml-14',
						size === 'lg' && 'ml-16'
					]
						.filter(Boolean)
						.join(' ')}
				>
					<div class={[actionClasses, 'skeleton h-4 w-48'].filter(Boolean).join(' ')}></div>
					<div class={[emailClasses, 'skeleton h-3 w-64 mt-2'].filter(Boolean).join(' ')}></div>
				</div>
			</div>
		{/each}
	{:else if error}
		<!-- Error state -->
		<div class="flex items-center justify-center py-12">
			<Alert
				variant="error"
				size={size}
				title="Error loading audit trail"
				description={error}
				ariaLabel="Error message"
				role="alert"
			/>
		</div>
	{:else if items.length === 0}
		<!-- Empty state -->
		<div class="flex items-center justify-center py-12">
			<EmptyState
				title="No audit trail entries"
				description={emptyMessage}
				variant="neutral"
				size={size}
				ariaLabel="Empty audit trail list"
			/>
		</div>
	{:else}
		{#each items as item, index (item.id)}
		<div
			id="{listId}-item-{index}"
			role="listitem"
			class={itemClasses}
			onclick={() => handleItemClick(item, index)}
			onkeydown={(e) => handleKeyDown(e, item, index)}
			onfocus={() => handleFocus(index)}
			onblur={handleBlur}
			tabindex={onItemClick ? (focusedIndex === -1 ? (index === 0 ? 0 : -1) : (focusedIndex === index ? 0 : -1)) : -1}
			aria-label={`Audit trail entry: ${formatAction(item.action)} ${item.entity} by ${item.user.name} on ${formatTimestamp(item.timestamp)}`}
		>
			<div class="flex items-start justify-between gap-4">
				<div class="flex items-center gap-3 flex-1 min-w-0">
					{#if item.user.avatar}
						<img
							src={item.user.avatar}
							alt={`${item.user.name} avatar`}
							class={avatarClasses}
							aria-hidden="false"
						/>
					{:else}
						<div
							class={[avatarClasses, 'bg-base-300'].filter(Boolean).join(' ')}
							aria-hidden="true"
						>
							<span class="font-semibold">
								{item.user.name.charAt(0).toUpperCase()}
							</span>
						</div>
					{/if}
					<div class="flex-1 min-w-0">
						<div class={nameClasses}>{item.user.name}</div>
						{#if item.user.email}
							<div class={emailClasses}>{item.user.email}</div>
						{/if}
					</div>
				</div>
				<time
					class={timestampClasses}
					datetime={typeof item.timestamp === 'string' ? item.timestamp : item.timestamp.toISOString()}
					aria-label={`Timestamp: ${formatTimestamp(item.timestamp)}`}
				>
					{formatTimestamp(item.timestamp)}
				</time>
			</div>
			<div
				class={[
					size === 'sm' && 'ml-11',
					size === 'md' && 'ml-14',
					size === 'lg' && 'ml-16'
				]
					.filter(Boolean)
					.join(' ')}
			>
				<div class={actionClasses}>
					<span class="font-medium" aria-label="Action">{formatAction(item.action)}</span>
					<span class="text-base-content/60" aria-label="Entity"> {item.entity}</span>
					{#if item.entityId}
						<span class="text-base-content/60" aria-label="Entity ID"> (#{item.entityId})</span>
					{/if}
				</div>
				{#if item.details}
					<div class={[emailClasses, 'mt-1'].filter(Boolean).join(' ')}>
						{item.details}
					</div>
				{/if}
				{#if item.ipAddress}
					<div class="text-xs text-base-content/50 mt-1" aria-label="IP Address">
						IP: {item.ipAddress}
					</div>
				{/if}
			</div>
		</div>
		{/each}
	{/if}
</div>
