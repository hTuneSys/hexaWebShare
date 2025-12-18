<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Breadcrumb item data structure
	 */
	export interface BreadcrumbItem {
		/**
		 * Unique identifier for the breadcrumb item
		 */
		id?: string | number;
		/**
		 * Display label for the breadcrumb item
		 */
		label: string;
		/**
		 * URL or path for the breadcrumb link
		 */
		href?: string;
		/**
		 * Icon to display before the label
		 */
		icon?: string;
		/**
		 * Whether this item is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether this item is the current page
		 * @default false
		 */
		current?: boolean;
		/**
		 * Callback when item is clicked
		 */
		onclick?: (item: BreadcrumbItem, index: number) => void;
	}

	/**
	 * Props interface for the Breadcrumbs component
	 */
	interface Props {
		/**
		 * Array of breadcrumb items to display
		 */
		items: BreadcrumbItem[];
		/**
		 * Custom separator between breadcrumb items
		 * @default '/'
		 */
		separator?: string;
		/**
		 * Size variant of the breadcrumbs
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Color variant of the breadcrumbs
		 * @default 'neutral'
		 */
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		/**
		 * Whether the breadcrumbs are disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the breadcrumbs are in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Accessible label for the breadcrumbs navigation
		 * @default 'Breadcrumb navigation'
		 */
		ariaLabel?: string;
		/**
		 * ID of the element that labels this breadcrumbs
		 */
		ariaLabelledby?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		items,
		separator = '/',
		size = 'md',
		variant = 'neutral',
		disabled = false,
		loading = false,
		ariaLabel = 'Breadcrumb navigation',
		ariaLabelledby,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID for accessibility
	const breadcrumbsId = crypto.randomUUID?.() ?? `breadcrumbs-${Math.random().toString(36).slice(2, 9)}`;

	// Computed container classes
	let containerClasses = $derived(
		[
			'breadcrumbs',
			size === 'xs' && 'text-xs',
			size === 'sm' && 'text-sm',
			size === 'md' && 'text-base',
			size === 'lg' && 'text-lg',
			disabled && 'opacity-50 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Get item classes based on variant and state
	const getItemClasses = (item: BreadcrumbItem, index: number, isLast: boolean): string => {
		const isDisabled = item.disabled || disabled;
		const isCurrent = item.current !== undefined ? item.current : isLast;
		
		return [
			'breadcrumb-item',
			!isDisabled && variant === 'primary' && 'text-primary',
			!isDisabled && variant === 'secondary' && 'text-secondary',
			!isDisabled && variant === 'accent' && 'text-accent',
			!isDisabled && variant === 'neutral' && 'text-base-content',
			!isDisabled && variant === 'info' && 'text-info',
			!isDisabled && variant === 'success' && 'text-success',
			!isDisabled && variant === 'warning' && 'text-warning',
			!isDisabled && variant === 'error' && 'text-error',
			isDisabled && 'opacity-50 cursor-not-allowed',
			isCurrent && !isDisabled && 'font-semibold'
		]
			.filter(Boolean)
			.join(' ');
	};

	// Handle item click
	const handleItemClick = (item: BreadcrumbItem, index: number) => {
		if (item.disabled || disabled || loading) return;
		item.onclick?.(item, index);
	};

	// Handle keyboard navigation
	const handleKeyDown = (event: KeyboardEvent, item: BreadcrumbItem, index: number) => {
		if (item.disabled || disabled || loading) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleItemClick(item, index);
		}
	};

	// Get ARIA attributes for item
	const getItemAriaAttributes = (item: BreadcrumbItem, index: number, isLast: boolean) => {
		const isDisabled = item.disabled || disabled;
		const isCurrent = item.current !== undefined ? item.current : isLast;
		
		return {
			'aria-current': (isCurrent ? 'page' : undefined) as 'page' | undefined,
			'aria-disabled': isDisabled || false,
			'aria-label': item.label,
			role: 'listitem'
		};
	};

	// Determine if item is last (current page)
	const isLastItem = (index: number): boolean => {
		return index === items.length - 1;
	};
</script>

<nav
	id={breadcrumbsId}
	class={containerClasses}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	{...props}
>
	<ul class="breadcrumbs" role="list">
		{#each items as item, index (item.id ?? index)}
			{@const isLast = isLastItem(index)}
			{@const itemClasses = getItemClasses(item, index, isLast)}
			{@const ariaAttrs = getItemAriaAttributes(item, index, isLast)}
			<li class={itemClasses} {...ariaAttrs}>
				{#if item.href && !item.disabled && !disabled && !loading && !isLast}
					<a
						href={item.href}
						class="breadcrumb-link"
						aria-label={item.label}
						aria-disabled={item.disabled || disabled || false}
						tabindex={item.disabled || disabled || loading ? -1 : 0}
						onclick={(e) => {
							if (item.onclick) {
								e.preventDefault();
								handleItemClick(item, index);
							}
						}}
						onkeydown={(e) => handleKeyDown(e, item, index)}
					>
						{#if item.icon}
							<span class="breadcrumb-icon" aria-hidden="true">{item.icon}</span>
						{/if}
						<span class="breadcrumb-label">{item.label}</span>
					</a>
				{:else if item.onclick && !item.disabled && !disabled && !loading && !isLast}
					<button
						type="button"
						class="breadcrumb-button"
						aria-label={item.label}
						aria-disabled={item.disabled || disabled || false}
						tabindex={item.disabled || disabled || loading ? -1 : 0}
						onclick={() => handleItemClick(item, index)}
						onkeydown={(e) => handleKeyDown(e, item, index)}
					>
						{#if item.icon}
							<span class="breadcrumb-icon" aria-hidden="true">{item.icon}</span>
						{/if}
						<span class="breadcrumb-label">{item.label}</span>
					</button>
				{:else}
					<span class="breadcrumb-text" aria-current={isLast ? 'page' : undefined}>
						{#if item.icon}
							<span class="breadcrumb-icon" aria-hidden="true">{item.icon}</span>
						{/if}
						<span class="breadcrumb-label">{item.label}</span>
					</span>
				{/if}
			</li>
			{#if !isLast}
				<li class="breadcrumb-separator" aria-hidden="true">
					<span class="separator-text">{separator}</span>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

<style>
	.breadcrumbs {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.breadcrumb-item {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.breadcrumb-link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		text-decoration: none;
		color: inherit;
		transition: opacity 0.2s ease;
	}

	.breadcrumb-link:hover {
		opacity: 0.8;
	}

	.breadcrumb-link:focus {
		outline: 2px solid currentColor;
		outline-offset: 2px;
		border-radius: 0.25rem;
	}

	.breadcrumb-button {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		color: inherit;
		font: inherit;
		cursor: pointer;
		text-decoration: none;
		transition: opacity 0.2s ease;
	}

	.breadcrumb-button:hover {
		opacity: 0.8;
	}

	.breadcrumb-button:focus {
		outline: 2px solid currentColor;
		outline-offset: 2px;
		border-radius: 0.25rem;
	}

	.breadcrumb-button:disabled,
	.breadcrumb-button[aria-disabled='true'] {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.breadcrumb-text {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.breadcrumb-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.breadcrumb-label {
		display: inline-block;
	}

	.breadcrumb-separator {
		display: inline-flex;
		align-items: center;
		color: hsl(var(--bc) / 0.5);
		margin: 0 0.25rem;
	}

	.separator-text {
		user-select: none;
	}

	.breadcrumb-item[aria-current='page'] {
		font-weight: 600;
	}

	.breadcrumb-item[aria-disabled='true'] {
		cursor: not-allowed;
		pointer-events: none;
	}

	@media (max-width: 640px) {
		.breadcrumbs {
			font-size: 0.875rem;
		}

		.breadcrumb-separator {
			margin: 0 0.125rem;
		}
	}
</style>
