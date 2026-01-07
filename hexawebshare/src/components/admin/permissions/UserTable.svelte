<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Avatar from '../../core/media/Avatar.svelte';
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
		users,
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
	function handleEdit(user: User, index: number, event: MouseEvent) {
		event.stopPropagation();
		if (disabled || loading) return;
		onedit?.(user, index);
	}

	// Handle delete action
	function handleDelete(user: User, index: number, event: MouseEvent) {
		event.stopPropagation();
		if (disabled || loading) return;
		ondelete?.(user, index);
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
</script>

<div class={wrapperClasses} {...props}>
	<table
		class={tableClasses}
		aria-label={ariaLabel}
		aria-busy={loading}
		aria-disabled={disabled}
		aria-rowcount={error ? 1 : users.length + 1}
		aria-live={error ? 'polite' : undefined}
		role="table"
	>
		<thead>
			<tr role="row">
				<th scope="col" class="min-w-[200px]" role="columnheader">Name</th>
				<th scope="col" class="hidden md:table-cell" role="columnheader">Email</th>
				<th scope="col" class="hidden sm:table-cell" role="columnheader">Role</th>
				<th scope="col" role="columnheader">Status</th>
				{#if showActions}
					<th scope="col" class="text-right w-[100px]" role="columnheader">Actions</th>
				{/if}
			</tr>
		</thead>

		<tbody>
			{#if loading}
				<tr role="row">
					<td colspan={showActions ? 5 : 4} class="text-center py-12" role="gridcell">
						<div class="flex flex-col items-center justify-center gap-3">
							<span class="loading loading-spinner loading-md" aria-hidden="true"></span>
							<span class="text-sm text-base-content/60">
								<span class="sr-only">Loading users table</span>
								<span aria-hidden="true">Loading users...</span>
							</span>
						</div>
					</td>
				</tr>
			{:else if error}
				<tr role="row">
					<td colspan={showActions ? 5 : 4} class="text-center py-12" role="gridcell">
						<div class="flex flex-col items-center justify-center gap-3">
							<div class="flex flex-col items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="48"
									height="48"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-error"
									aria-hidden="true"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<line x1="12" y1="8" x2="12" y2="12"></line>
									<line x1="12" y1="16" x2="12.01" y2="16"></line>
								</svg>
								<div class="flex flex-col items-center gap-2">
									<span class="text-error font-medium" role="alert" aria-live="polite">
										{error}
									</span>
									{#if onretry}
										<button
											type="button"
											class="btn btn-sm btn-outline btn-error mt-2"
											onclick={() => onretry()}
											aria-label="Retry loading users"
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
												<polyline points="23 4 23 10 17 10"></polyline>
												<polyline points="1 20 1 14 7 14"></polyline>
												<path d="M3.51 9a9 9 0 0 1 14.85-3.7L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
											</svg>
											Retry
										</button>
									{/if}
								</div>
							</div>
						</div>
					</td>
				</tr>
			{:else if users.length === 0}
				<tr role="row">
					<td colspan={showActions ? 5 : 4} class="text-center py-12" role="gridcell">
						<div class="flex flex-col items-center justify-center gap-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="48"
								height="48"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-base-content/40"
								aria-hidden="true"
							>
								<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
								<circle cx="9" cy="7" r="4"></circle>
								<line x1="23" y1="11" x2="17" y2="11"></line>
							</svg>
							<span class="text-base-content/60" role="status">{emptyMessage}</span>
						</div>
					</td>
				</tr>
			{:else}
				{#each users as user, index (user.id)}
					<tr
						class={getRowClasses(index)}
						onclick={() => handleRowClick(user, index)}
						onkeydown={(e) => handleRowKeyDown(e, user, index)}
						role="row"
						aria-rowindex={index + 2}
						tabindex={onuserclick && !disabled && !loading ? 0 : undefined}
						aria-label={onuserclick ? `User ${user.name}, ${user.role}, ${user.status}. Press Enter or Space to select.` : undefined}
					>
						<td class="min-w-[200px]" role="gridcell">
							<div class="flex items-center gap-3">
								<Avatar
									src={user.avatar}
									alt={user.name}
									size="sm"
									placeholder={getUserInitials(user.name)}
									ariaLabel={`${user.name} avatar`}
									ariaHidden={true}
								/>
								<div class="flex flex-col min-w-0">
									<span class="font-medium truncate">{user.name}</span>
									{#if user.lastLogin}
										<span class="text-xs text-base-content/60 hidden lg:inline" aria-label="Last login">
											Last login: {typeof user.lastLogin === 'string' ? user.lastLogin : user.lastLogin.toLocaleDateString()}
										</span>
									{/if}
									<!-- Mobile: Show email on small screens -->
									<span class="text-xs text-base-content/60 md:hidden truncate" aria-label="Email address">
										{user.email}
									</span>
								</div>
							</div>
						</td>
						<td class="hidden md:table-cell" role="gridcell">
							<span class="text-base-content truncate block max-w-[200px]" aria-label="Email address">
								{user.email}
							</span>
						</td>
						<td class="hidden sm:table-cell" role="gridcell">
							<span
								class={[
									'badge',
									getRoleVariant(user.role) === 'primary' && 'badge-primary',
									getRoleVariant(user.role) === 'secondary' && 'badge-secondary',
									getRoleVariant(user.role) === 'accent' && 'badge-accent',
									getRoleVariant(user.role) === 'neutral' && 'badge-neutral',
									'badge-sm'
								]
									.filter(Boolean)
									.join(' ')}
								role="status"
								aria-label={`User role: ${user.role}`}
							>
								{user.role}
							</span>
						</td>
						<td role="gridcell">
							<StatusBadge
								label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
								variant={getStatusVariant(user.status)}
								size="sm"
								ariaLabel={`User status: ${user.status}`}
							/>
						</td>
						{#if showActions}
							<td class="text-right w-[100px]" role="gridcell">
								<div class="flex items-center justify-end gap-1 sm:gap-2" role="group" aria-label="User actions">
									{#if onedit}
										<button
											type="button"
											class="btn btn-ghost btn-xs btn-circle hover:bg-base-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
											aria-label={`Edit user ${user.name}`}
											onclick={(e) => handleEdit(user, index, e)}
											disabled={disabled || loading}
											aria-disabled={disabled || loading}
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
										</button>
									{/if}
									{#if ondelete}
										<button
											type="button"
											class="btn btn-ghost btn-xs btn-circle text-error hover:bg-error/10 transition-colors focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2"
											aria-label={`Delete user ${user.name}`}
											onclick={(e) => handleDelete(user, index, e)}
											disabled={disabled || loading}
											aria-disabled={disabled || loading}
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
										</button>
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
