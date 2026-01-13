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
				<th scope="col" class="min-w-[200px]">Name</th>
				<th scope="col" class="hidden md:table-cell">Email</th>
				<th scope="col" class="hidden sm:table-cell">Role</th>
				<th scope="col">Status</th>
				{#if showActions}
					<th scope="col" class="w-[100px] text-right">Actions</th>
				{/if}
			</tr>
		</thead>

		<tbody>
			{#if loading}
				<tr>
					<td colspan={showActions ? 5 : 4} class="py-12 text-center">
						<div class="flex flex-col items-center justify-center gap-3">
							<Spinner type="spinner" size="md" variant="primary" ariaLabel="Loading users table" />
							<span class="text-base-content/60 text-sm">
								<span class="sr-only">Loading users table</span>
								<span aria-hidden="true">Loading users...</span>
							</span>
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
								actionLabel={onretry ? 'Retry' : undefined}
								actionAriaLabel={onretry ? 'Retry loading users' : undefined}
								onaction={onretry}
								fullWidth={false}
								withIcon={true}
								ariaLabel="Error loading users"
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
							ariaLabel="Empty users table"
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
						aria-label={onuserclick
							? `User ${user.name}, ${user.role}, ${user.status}. Press Enter or Space to select.`
							: undefined}
					>
						<td class="min-w-[200px] max-w-[300px]">
							<div class="flex items-center gap-3">
								<Avatar
									src={isValidAvatarUrl(user.avatar) ? user.avatar : undefined}
									alt={user.name}
									size="sm"
									placeholder={getUserInitials(user.name)}
									ariaLabel={`${user.name} avatar`}
									ariaHidden={true}
								/>
								<div class="flex min-w-0 flex-1 flex-col">
									<span class="truncate font-medium">{user.name}</span>
									{#if user.lastLogin}
										<span
											class="text-base-content/60 truncate text-xs hidden md:block"
											aria-label="Last login"
										>
											Last login: {typeof user.lastLogin === 'string'
												? user.lastLogin
												: user.lastLogin.toLocaleDateString()}
										</span>
									{/if}
									<!-- Mobile: Show email on small screens -->
									<span
										class="text-base-content/60 truncate text-xs md:hidden"
										aria-label="Email address"
									>
										{user.email}
									</span>
								</div>
							</div>
						</td>
						<td class="hidden md:table-cell">
							<span
								class="text-base-content block max-w-[200px] truncate"
								aria-label="Email address"
							>
								{user.email}
							</span>
						</td>
						<td class="hidden sm:table-cell">
							<Badge
								label={user.role}
								variant={getRoleVariant(user.role)}
								size="sm"
								ariaLabel={`User role: ${user.role}`}
							/>
						</td>
						<td>
							<StatusBadge
								label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
								variant={getStatusVariant(user.status)}
								size="sm"
								ariaLabel={`User status: ${user.status}`}
							/>
						</td>
						{#if showActions}
							<td class="w-[100px] text-right">
								<div
									class="flex items-center justify-end gap-1 sm:gap-2"
									role="group"
									aria-label="User actions"
								>
									{#if onedit}
										<IconButton
											variant="ghost"
											size="xs"
											circle={true}
											ariaLabel={`Edit user ${user.name}`}
											onclick={() => handleEditClick(user, index)}
											disabled={disabled || loading}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												aria-hidden="true"
											>
												<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
												<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
											</svg>
										</IconButton>
									{/if}
									{#if ondelete}
										<IconButton
											variant="ghost"
											size="xs"
											circle={true}
											ariaLabel={`Delete user ${user.name}`}
											onclick={() => handleDeleteClick(user, index)}
											disabled={disabled || loading}
											class="text-error hover:bg-error/10"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												aria-hidden="true"
											>
												<polyline points="3 6 5 6 21 6"></polyline>
												<path
													d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
												></path>
											</svg>
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
