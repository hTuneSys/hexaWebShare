<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Menu item interface for ContextMenu
	 */
	export interface MenuItem {
		/**
		 * Label text displayed in the menu item
		 */
		label: string;
		/**
		 * Click handler function
		 */
		onClick?: () => void;
		/**
		 * Whether the item is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether to show a divider after this item
		 * @default false
		 */
		divider?: boolean;
		/**
		 * Optional icon identifier
		 */
		icon?: string;
	}

	/**
	 * Props interface for ContextMenu component
	 */
	interface Props {
		/**
		 * Whether the context menu is open
		 * @default false
		 */
		open: boolean;
		/**
		 * X position of the menu (in pixels)
		 * @default 0
		 */
		x?: number;
		/**
		 * Y position of the menu (in pixels)
		 * @default 0
		 */
		y?: number;
		/**
		 * Array of menu items to display
		 */
		items: MenuItem[];
		/**
		 * Callback function when menu should close
		 */
		onClose?: () => void;
		/**
		 * ARIA label for accessibility
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 * @default ''
		 */
		class?: string;
	}

	const {
		open,
		x = 0,
		y = 0,
		items,
		onClose,
		ariaLabel,
		class: className = '',
		...props
	}: Props = $props();

	// State for menu element reference
	let menuElement = $state<HTMLDivElement | null>(null);

	// State for keyboard navigation (focused item index)
	let focusedIndex = $state<number>(-1);

	// Derived classes for menu container
	let menuClasses = $derived(
		[
			'menu',
			'menu-vertical',
			'bg-base-100',
			'rounded-box',
			'shadow-lg',
			'border',
			'border-base-300',
			'min-w-48',
			'p-1',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Derived classes for menu items
	let getMenuItemClasses = (item: MenuItem, index: number) => {
		return [
			'menu-item',
			'w-full',
			'text-left',
			'px-4',
			'py-2',
			item.disabled && 'disabled',
			item.disabled && 'opacity-50',
			item.disabled && 'cursor-not-allowed',
			item.disabled && 'text-base-content/50',
			item.disabled && 'select-none',
			focusedIndex === index && 'focus',
			!item.disabled && 'cursor-pointer',
			!item.disabled && 'hover:bg-base-200',
			!item.disabled && 'focus:bg-base-200',
			!item.disabled && 'focus:outline-none',
			!item.disabled && 'transition-colors',
			!item.disabled && 'duration-150'
		]
			.filter(Boolean)
			.join(' ');
	};

	// Derived position styles for menu
	let menuPosition = $derived({
		left: `${x}px`,
		top: `${y}px`,
		position: 'fixed' as const,
		zIndex: 1000
	});

	// Calculate if menu would overflow viewport (for future auto-positioning)
	let menuStyle = $derived(
		`left: ${x}px; top: ${y}px; position: fixed; z-index: 1000; max-height: calc(100vh - 20px); max-width: calc(100vw - 20px); min-width: 12rem; overflow: auto;`
	);

	// Handle click outside to close menu
	function handleClickOutside(event: MouseEvent) {
		if (menuElement && !menuElement.contains(event.target as Node) && open && onClose) {
			onClose();
		}
	}

	// Add click outside listener when menu is open
	$effect(() => {
		if (open) {
			// Use setTimeout to avoid immediate trigger
			setTimeout(() => {
				document.addEventListener('click', handleClickOutside);
			}, 0);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});

	// Get enabled items indices mapping
	let enabledIndices = $derived.by(() => {
		const indices: number[] = [];
		items.forEach((item, index) => {
			if (!item.disabled) {
				indices.push(index);
			}
		});
		return indices;
	});

	// Handle keyboard navigation
	function handleKeyDown(event: KeyboardEvent) {
		if (!open) return;

		const enabledCount = enabledIndices.length;
		if (enabledCount === 0) return;

		const currentEnabledIndex = enabledIndices.indexOf(focusedIndex);
		let newEnabledIndex = currentEnabledIndex >= 0 ? currentEnabledIndex : 0;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				newEnabledIndex = currentEnabledIndex < enabledCount - 1 ? currentEnabledIndex + 1 : 0;
				focusedIndex = enabledIndices[newEnabledIndex];
				// Focus the button
				setTimeout(() => {
					if (menuElement) {
						const buttons = menuElement.querySelectorAll<HTMLElement>('button:not([disabled])');
						if (buttons[newEnabledIndex]) {
							buttons[newEnabledIndex].focus();
						}
					}
				}, 0);
				break;
			case 'ArrowUp':
				event.preventDefault();
				newEnabledIndex = currentEnabledIndex > 0 ? currentEnabledIndex - 1 : enabledCount - 1;
				focusedIndex = enabledIndices[newEnabledIndex];
				// Focus the button
				setTimeout(() => {
					if (menuElement) {
						const buttons = menuElement.querySelectorAll<HTMLElement>('button:not([disabled])');
						if (buttons[newEnabledIndex]) {
							buttons[newEnabledIndex].focus();
						}
					}
				}, 0);
				break;
			case 'Enter':
				event.preventDefault();
				if (focusedIndex >= 0) {
					const item = items[focusedIndex];
					if (item && !item.disabled) {
						if (item.onClick) {
							item.onClick();
						}
						if (onClose) {
							onClose();
						}
					}
				}
				break;
			case 'Escape':
				event.preventDefault();
				if (onClose) {
					onClose();
				}
				break;
		}
	}

	// Add keyboard listener when menu is open
	$effect(() => {
		if (open) {
			// Reset focus when menu opens - set to first enabled item
			const firstEnabledIndex = enabledIndices[0] ?? -1;
			focusedIndex = firstEnabledIndex;
			document.addEventListener('keydown', handleKeyDown);
			return () => {
				document.removeEventListener('keydown', handleKeyDown);
			};
		} else {
			// Reset focus when menu closes
			focusedIndex = -1;
		}
	});

	// Handle menu item click
	function handleItemClick(item: MenuItem) {
		if (item.disabled) return;

		if (item.onClick) {
			item.onClick();
		}

		// Close menu after item click
		if (onClose) {
			onClose();
		}
	}

	// Focus management - focus first item when menu opens
	$effect(() => {
		if (open && menuElement) {
			setTimeout(() => {
				if (menuElement) {
					const firstItem = menuElement.querySelector<HTMLElement>(
						'button:not([disabled]), [role="menuitem"]:not([disabled])'
					);
					firstItem?.focus();
				}
			}, 0);
		}
	});
</script>

{#if open}
	<div
		bind:this={menuElement}
		class={menuClasses}
		style={menuStyle}
		role="menu"
		aria-label={ariaLabel}
		aria-orientation="vertical"
		{...props}
	>
		{#each items as item, index}
			<button
				type="button"
				class={getMenuItemClasses(item, index)}
				role="menuitem"
				aria-disabled={item.disabled}
				disabled={item.disabled}
				tabindex={item.disabled ? -1 : focusedIndex === index ? 0 : -1}
				onclick={() => handleItemClick(item)}
			>
				{item.label}
			</button>
			{#if item.divider && index < items.length - 1}
				<div class="divider my-1" role="separator" aria-orientation="horizontal"></div>
			{/if}
		{/each}
	</div>
{/if}
