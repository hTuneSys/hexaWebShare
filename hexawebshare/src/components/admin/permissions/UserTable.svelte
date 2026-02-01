<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Avatar from '../../core/media/Avatar.svelte';
	import Badge from '../../core/media/Badge.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';
	import Alert from '../../core/feedback/Alert.svelte';
	import EmptyState from '../../core/data-display/EmptyState.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';
	import StatusBadge from '../../core/data-display/StatusBadge.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Icon from '../../core/media/Icon.svelte';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Trash2 from 'lucide-svelte/icons/trash-2';

	/**
	 * User data structure for UserTable component
	 */
	export interface User {
		/**
		 * Unique identifier for the user
		 */
		id: string | number;
		/**
		 * User's full name
		 */
		name: string;
		/**
		 * User's email address
		 */
		email: string;
		/**
		 * User's role (e.g., 'admin', 'editor', 'viewer')
		 */
		role: string;
		/**
		 * User's status (e.g., 'active', 'inactive', 'pending')
		 */
		status: 'active' | 'inactive' | 'pending' | 'suspended';
		/**
		 * Optional avatar URL
		 */
		avatar?: string;
		/**
		 * Optional last login timestamp
		 */
		lastLogin?: string | Date;
		/**
		 * Optional additional metadata
		 */
		metadata?: Record<string, unknown>;
	}

	/**
	 * Props interface for the UserTable component
	 */
	interface Props {
		/**
		 * Array of user data to display
		 */
		users: User[];
		/**
		 * Size variant of the table
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Enable zebra striped rows
		 * @default false
		 */
		zebra?: boolean;
		/**
		 * Enable hover effect on rows
		 * @default true
		 */
		hover?: boolean;
		/**
		 * Make the table compact
		 * @default false
		 */
		compact?: boolean;
		/**
		 * Whether the table is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Error message to display when data loading fails
		 */
		error?: string;
		/**
		 * Whether the table is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Show borders between cells
		 * @default false
		 */
		bordered?: boolean;
		/**
		 * Make the table responsive with horizontal scroll
		 * - true: Table maintains width, shows horizontal scroll on small screens (all columns visible)
		 * - false: Table fits container, columns hide/show based on responsive classes (no scroll)
		 * @default true
		 */
		responsive?: boolean;
		/**
		 * Show action buttons (edit, delete) for each row
		 * @default true
		 */
		showActions?: boolean;
		/**
		 * Callback when a user row is clicked
		 */
		onuserclick?: (user: User, index: number) => void;
		/**
		 * Callback when edit action is clicked
		 */
		onedit?: (user: User, index: number) => void;
		/**
		 * Callback when delete action is clicked
		 */
		ondelete?: (user: User, index: number) => void;
		/**
		 * Accessible label for the table
		 */
		ariaLabel?: string;
		/**
		 * Custom empty state message
		 * @default 'No users found'
		 */
		emptyMessage?: string;
		/**
		 * Callback when retry is clicked in error state
		 */
		onretry?: () => void;
		/**
		 * Table column header text for Name column
		 * @default 'Name'
		 */
		headerName?: string;
		/**
		 * Table column header text for Email column
		 * @default 'Email'
		 */
		headerEmail?: string;
		/**
		 * Table column header text for Role column
		 * @default 'Role'
		 */
		headerRole?: string;
		/**
		 * Table column header text for Status column
		 * @default 'Status'
		 */
		headerStatus?: string;
		/**
		 * Table column header text for Actions column
		 * @default 'Actions'
		 */
		headerActions?: string;
		/**
		 * Loading message text displayed in spinner
		 * @default 'Loading users table'
		 */
		loadingAriaLabel?: string;
		/**
		 * Loading display text shown during load
		 * @default 'Loading users...'
		 */
		loadingText?: string;
		/**
		 * Retry button label text
		 * @default 'Retry'
		 */
		retryLabel?: string;
		/**
		 * Retry button aria-label text
		 * @default 'Retry loading users'
		 */
		retryAriaLabel?: string;
		/**
		 * Error state aria-label
		 * @default 'Error loading users'
		 */
		errorAriaLabel?: string;
		/**
		 * Empty state aria-label
		 * @default 'Empty users table'
		 */
		emptyAriaLabel?: string;
		/**
		 * Aria-label for last login text
		 * @default 'Last login'
		 */
		lastLoginAriaLabel?: string;
		/**
		 * Aria-label for email address
		 * @default 'Email address'
		 */
		emailAriaLabel?: string;
		/**
		 * Aria-label prefix for user role
		 * @default 'User role: '
		 */
		userRoleAriaLabelPrefix?: string;
		/**
		 * Aria-label prefix for user status
		 * @default 'User status: '
		 */
		userStatusAriaLabelPrefix?: string;
		/**
		 * Aria-label for user actions group
		 * @default 'User actions'
		 */
		userActionsAriaLabel?: string;
		/**
		 * Aria-label prefix for edit action
		 * @default 'Edit user '
		 */
		editUserAriaLabelPrefix?: string;
		/**
		 * Aria-label prefix for delete action
		 * @default 'Delete user '
		 */
		deleteUserAriaLabelPrefix?: string;
	/**
	 * Aria-label suffix for avatar
	 * @default ' avatar'
	 */
	avatarAriaLabelSuffix?: string;
	/**
	 * Function to format clickable row aria-label with user info
	 * @param user - User object
	 * @returns Formatted aria-label string
	 * @default (user) => `User ${user.name}, ${user.role}, ${user.status}. Press Enter or Space to select.`
	 */
	formatRowAriaLabel?: (user: User) => string;
	/**
	 * Additional CSS classes
	 */
	class?: string;
}

	const {
		users = [],
		size = 'md',
		zebra = false,
		hover = true,
		compact = false,
		loading = false,
		error,
		disabled = false,
		bordered = false,
		responsive = true,
		showActions = true,
		onuserclick,
		onedit,
		ondelete,
		ariaLabel = 'Users table',
		emptyMessage = 'No users found',
		onretry,
		headerName = 'Name',
		headerEmail = 'Email',
		headerRole = 'Role',
		headerStatus = 'Status',
		headerActions = 'Actions',
		loadingAriaLabel = 'Loading users table',
		loadingText = 'Loading users...',
		retryLabel = 'Retry',
		retryAriaLabel = 'Retry loading users',
		errorAriaLabel = 'Error loading users',
		emptyAriaLabel = 'Empty users table',
		lastLoginAriaLabel = 'Last login',
		emailAriaLabel = 'Email address',
		userRoleAriaLabelPrefix = 'User role: ',
		userStatusAriaLabelPrefix = 'User status: ',
		userActionsAriaLabel = 'User actions',
	editUserAriaLabelPrefix = 'Edit user ',
	deleteUserAriaLabelPrefix = 'Delete user ',
	avatarAriaLabelSuffix = ' avatar',
	formatRowAriaLabel = (user: User) =>
		`User ${user.name}, ${user.role}, ${user.status}. Press Enter or Space to select.`,
	class: className = '',
	...props
}: Props = $props();

	// Table wrapper classes
	let wrapperClasses = $derived(
		[
			responsive && 'overflow-x-auto',
			responsive && 'w-full',
			disabled && 'opacity-50 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Table classes using static DaisyUI classes
	let tableClasses = $derived(
		[
			'table',
			size === 'xs' && 'table-xs',
			size === 'sm' && 'table-sm',
			size === 'md' && 'table-md',
			size === 'lg' && 'table-lg',
			zebra && 'table-zebra',
			compact && 'table-compact',
			bordered && 'border border-base-300'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Row classes with hover effect
	let getRowClasses = (index: number): string => {
		return [
			hover && 'hover:bg-base-200',
			onuserclick && !disabled && !loading && 'cursor-pointer',
			disabled && 'opacity-50'
		]
			.filter(Boolean)
			.join(' ');
	};

	// Handle row click
	function handleRowClick(user: User, index: number) {
		if (disabled || loading) return;
		onuserclick?.(user, index);
	}

	// Handle keyboard navigation for rows
	function handleRowKeyDown(event: KeyboardEvent, user: User, index: number) {
		if (disabled || loading) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleRowClick(user, index);
		}
	}

	// Handle edit action
	function handleEdit(user: User, index: number, event?: MouseEvent) {
		if (event) {
			event.stopPropagation();
		}
		if (disabled || loading) return;
		onedit?.(user, index);
	}

	// Handle delete action
	function handleDelete(user: User, index: number, event?: MouseEvent) {
		if (event) {
			event.stopPropagation();
		}
		if (disabled || loading) return;
		ondelete?.(user, index);
	}

	// Wrapper functions for IconButton onclick (no event parameter)
	function handleEditClick(user: User, index: number) {
		handleEdit(user, index);
	}

	function handleDeleteClick(user: User, index: number) {
		handleDelete(user, index);
	}

	// Get status badge variant based on user status
	function getStatusVariant(
		status: 'active' | 'inactive' | 'pending' | 'suspended'
	): 'success' | 'error' | 'warning' | 'neutral' {
		switch (status) {
			case 'active':
				return 'success';
			case 'inactive':
				return 'neutral';
			case 'pending':
				return 'warning';
			case 'suspended':
				return 'error';
			default:
				return 'neutral';
		}
	}

	// Get role badge variant (simple mapping)
	function getRoleVariant(role: string): 'primary' | 'secondary' | 'accent' | 'neutral' {
		const roleLower = role.toLowerCase();
		if (roleLower.includes('admin')) return 'primary';
		if (roleLower.includes('editor')) return 'accent';
		if (roleLower.includes('viewer')) return 'secondary';
		return 'neutral';
	}

	// Get user initials for avatar placeholder
	function getUserInitials(name: string): string {
		const parts = name.trim().split(/\s+/);
		if (parts.length >= 2) {
			return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
		}
		return name.substring(0, 2).toUpperCase();
	}

	// Check if avatar URL is valid
	function isValidAvatarUrl(url: string | undefined): boolean {
		if (!url || !url.trim()) return false;
		try {
			const parsedUrl = new URL(url);
			return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
		} catch {
			return false;
		}
	}
</script>

<div class={wrapperClasses} {...props}>
	<table
		class={tableClasses}
		aria-label={ariaLabel}
		aria-busy={loading}
		aria-rowcount={error ? 1 : (users?.length ?? 0) + 1}
		aria-live={error ? 'polite' : undefined}
	>
		<thead>
			<tr>
				<th scope="col" class="min-w-[200px]">{headerName}</th>
				<th scope="col" class="hidden md:table-cell">{headerEmail}</th>
				<th scope="col" class="hidden sm:table-cell">{headerRole}</th>
				<th scope="col">{headerStatus}</th>
				{#if showActions}
					<th scope="col" class="w-[100px] text-right">{headerActions}</th>
				{/if}
			</tr>
		</thead>

		<tbody>
			{#if loading}
				<tr>
					<td colspan={showActions ? 5 : 4} class="py-12 text-center">
						<div class="flex flex-col items-center justify-center gap-3">
							<Spinner type="spinner" size="md" variant="primary" ariaLabel={loadingAriaLabel} />
							<div>
								<Text text={loadingAriaLabel} class="sr-only" />
								<Text text={loadingText} variant="muted" size="sm" ariaHidden={true} />
							</div>
						</div>
					</td>
				</tr>
			{:else if error}
				<tr>
					<td colspan={showActions ? 5 : 4} class="py-12 text-center">
						<div class="flex flex-col items-center justify-center gap-3">
							<Alert
								variant="error"
								size="md"
								description={error}
								actionLabel={onretry ? retryLabel : undefined}
								actionAriaLabel={onretry ? retryAriaLabel : undefined}
								onaction={onretry}
								fullWidth={false}
								withIcon={true}
								ariaLabel={errorAriaLabel}
							/>
						</div>
					</td>
				</tr>
			{:else if !users || users.length === 0}
				<tr>
					<td colspan={showActions ? 5 : 4} class="py-12 text-center">
						<EmptyState
							description={emptyMessage}
							variant="neutral"
							size="md"
							fullWidth={false}
							ariaLabel={emptyAriaLabel}
						/>
					</td>
				</tr>
			{:else}
				{#each users as user, index (user.id)}
					<tr
						class={getRowClasses(index)}
						onclick={() => handleRowClick(user, index)}
						onkeydown={(e) => handleRowKeyDown(e, user, index)}
					aria-rowindex={index + 2}
					tabindex={onuserclick && !disabled && !loading ? 0 : undefined}
					aria-label={onuserclick ? formatRowAriaLabel(user) : undefined}
				>
						<td class="max-w-[300px] min-w-[200px]">
							<div class="flex items-center gap-3">
								<Avatar
									src={isValidAvatarUrl(user.avatar) ? user.avatar : undefined}
									alt={user.name}
									size="sm"
									placeholder={getUserInitials(user.name)}
									ariaLabel={`${user.name}${avatarAriaLabelSuffix}`}
									ariaHidden={true}
							/>
							<div class="flex min-w-0 flex-1 flex-col">
								<Text text={user.name} weight="medium" truncate={true} />
								{#if user.lastLogin}
									<Text 
										text={`${lastLoginAriaLabel}: ${typeof user.lastLogin === 'string' ? user.lastLogin : user.lastLogin.toLocaleDateString()}`}
										variant="muted" 
										size="xs" 
										truncate={true}
										class="hidden md:block"
										ariaLabel={lastLoginAriaLabel}
									/>
								{/if}
								<!-- Mobile: Show email on small screens -->
								<Text 
									text={user.email}
									variant="muted" 
									size="xs" 
									truncate={true}
									class="md:hidden"
									ariaLabel={emailAriaLabel}
								/>
							</div>
							</div>
						</td>
						<td class="hidden md:table-cell">
							<span
								class="text-base-content block max-w-[200px] truncate"
								aria-label={emailAriaLabel}
							>
								{user.email}
							</span>
						</td>
						<td class="hidden sm:table-cell">
							<Badge
								label={user.role}
								variant={getRoleVariant(user.role)}
								size="sm"
								ariaLabel={`${userRoleAriaLabelPrefix}${user.role}`}
							/>
						</td>
						<td>
							<StatusBadge
								label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
								variant={getStatusVariant(user.status)}
								size="sm"
								ariaLabel={`${userStatusAriaLabelPrefix}${user.status}`}
							/>
						</td>
						{#if showActions}
							<td class="w-[100px] text-right">
								<div
									class="flex items-center justify-end gap-1 sm:gap-2"
									role="group"
									aria-label={userActionsAriaLabel}
								>
									{#if onedit}
										<IconButton
											variant="ghost"
											size="xs"
											circle={true}
											ariaLabel={`${editUserAriaLabelPrefix}${user.name}`}
											onclick={() => handleEditClick(user, index)}
											disabled={disabled || loading}
										>
											<Icon size="xs" ariaHidden={true}>
												<Pencil />
											</Icon>
										</IconButton>
									{/if}
									{#if ondelete}
										<IconButton
											variant="ghost"
											size="xs"
											circle={true}
											ariaLabel={`${deleteUserAriaLabelPrefix}${user.name}`}
											onclick={() => handleDeleteClick(user, index)}
											disabled={disabled || loading}
											class="text-error hover:bg-error/10"
										>
											<Icon size="xs" ariaHidden={true}>
												<Trash2 />
											</Icon>
										</IconButton>
									{/if}
								</div>
							</td>
						{/if}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
