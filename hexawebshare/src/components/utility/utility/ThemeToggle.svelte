<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Icon from '../../core/media/Icon.svelte';
	import type { Snippet } from 'svelte';

	/**
	 * Theme item definition for the expandable menu or dropdown
	 */
	interface ThemeItem {
		/** DaisyUI theme name */
		name: string;
		/** Display label */
		label?: string;
		/** Custom color for the item button */
		color?: string;
		/** Custom icon for the item */
		icon?: Snippet;
	}

	/**
	 * Props interface for the ThemeToggle component
	 */
	interface Props {
		/**
		 * Display layout of the component
		 * @default 'toggle'
		 */
		layout?: 'toggle' | 'fab' | 'dropdown';
		/**
		 * Size of the toggle
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Shape variant of the toggle
		 * @default 'circle'
		 */
		shape?: 'circle' | 'square';
		/**
		 * Color variant of the toggle (DaisyUI colors)
		 * @default 'ghost'
		 */
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost';
		/**
		 * Custom color (string, e.g., '#ff0000' or 'rgb(255,0,0)')
		 */
		customColor?: string;
		/**
		 * Fixed position in the viewport
		 * @default 'static'
		 */
		position?: 'static' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		/**
		 * Whether the toggle is currently in the "on" state (theme state)
		 */
		checked?: boolean;
		/**
		 * Callback when the toggle state changes
		 * @param checked - New state of the toggle (for basic mode)
		 * @param theme - Selected theme name
		 */
		onchange?: (checked: boolean, theme?: string) => void;
		/**
		 * DaisyUI theme name for the "on" state (basic mode)
		 * @default 'dark'
		 */
		theme?: string;
		/**
		 * Accessible label for the toggle
		 * @default 'Toggle theme'
		 */
		ariaLabel?: string;
		/**
		 * Animation type (basic mode)
		 * @default 'rotate'
		 */
		animation?: 'rotate' | 'flip';
		/**
		 * Whether the toggle is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the toggle is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * List of themes for the fab and dropdown layouts
		 */
		items?: ThemeItem[];
		/**
		 * Expansion direction for FAB. If 'auto', it is calculated based on position.
		 * @default 'auto'
		 */
		direction?: 'up' | 'down' | 'left' | 'right' | 'circle' | 'auto';
		/**
		 * Custom trigger icon for fab and dropdown modes
		 */
		triggerIcon?: Snippet;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Deprecated: Use layout="fab" instead
		 */
		expandable?: boolean;
	}

	let {
		layout = 'toggle',
		size = 'md',
		shape = 'circle',
		variant = 'ghost',
		customColor,
		position = 'static',
		checked = $bindable(false),
		onchange,
		theme = 'dark',
		ariaLabel = 'Toggle theme',
		animation = 'rotate',
		disabled = false,
		loading = false,
		items = [],
		direction = 'auto',
		triggerIcon,
		class: className = '',
		expandable, // Deprecated fallback
		...props
	}: Props = $props();

	// Support deprecated expandable prop
	let activeLayout = $derived(expandable ? 'fab' : layout);
	const instanceId = Math.random().toString(36).substring(2, 9);
	const radioName = `theme-radio-${instanceId}`;

	let isOpen = $state(false);
	let currentTheme = $state(theme);

	// Initial theme detection and sync
	$effect(() => {
		if (typeof document !== 'undefined') {
			// Try to detect current theme from documentElement
			const activeTheme = document.documentElement.getAttribute('data-theme');
			if (activeTheme) {
				currentTheme = activeTheme;
			}
		}
	});

	// Sync currentTheme with checked prop for toggle layout
	$effect(() => {
		if (activeLayout === 'toggle') {
			currentTheme = checked ? theme : 'light';
		}
	});

	// Default items if none provided
	let effectiveItems = $derived(
		items.length > 0
			? items
			: ([
					{ name: 'light', label: 'Light' },
					{ name: 'dark', label: 'Dark' },
					{ name: 'system', label: 'System' }
				] as ThemeItem[])
	);

	// Determine effective direction based on position
	let effectiveDirection = $derived.by(() => {
		if (direction !== 'auto') return direction;
		if (position === 'top-left') return 'down';
		if (position === 'top-right') return 'down';
		if (position === 'bottom-left') return 'up';
		if (position === 'bottom-right') return 'up';
		return 'up';
	});

	// Combine classes for the swap container/button
	let baseClasses = $derived(
		[
			'btn',
			size === 'xs' && 'btn-xs',
			size === 'sm' && 'btn-sm',
			size === 'md' && 'btn-md',
			size === 'lg' && 'btn-lg',
			shape === 'circle' && 'btn-circle',
			shape === 'square' && 'btn-square',
			(variant === 'primary' && 'btn-primary') ||
				(variant === 'secondary' && 'btn-secondary') ||
				(variant === 'accent' && 'btn-accent') ||
				(variant === 'neutral' && 'btn-neutral') ||
				(variant === 'info' && 'btn-info') ||
				(variant === 'success' && 'btn-success') ||
				(variant === 'warning' && 'btn-warning') ||
				(variant === 'error' && 'btn-error') ||
				(variant === 'ghost' && 'btn-ghost'),
			(disabled || loading) && 'btn-disabled cursor-not-allowed'
		]
			.filter(Boolean)
			.join(' ')
	);

	let containerClasses = $derived(
		[
			className,
			position !== 'static' && 'fixed z-50',
			position === 'top-left' && 'top-5 left-5',
			position === 'top-right' && 'top-5 right-5',
			position === 'bottom-left' && 'bottom-5 left-5',
			position === 'bottom-right' && 'bottom-5 right-5',
			activeLayout === 'fab' && position === 'static' && 'relative',
			activeLayout === 'fab' && 'inline-flex items-center justify-center',
			activeLayout === 'dropdown' && 'dropdown',
			activeLayout === 'dropdown' && position === 'top-right' && 'dropdown-end',
			activeLayout === 'dropdown' &&
				(position === 'bottom-left' || position === 'bottom-right') &&
				'dropdown-top'
		]
			.filter(Boolean)
			.join(' ')
	);

	function handleChange(event: Event) {
		if (disabled || loading) return;
		const isChecked = (event.target as HTMLInputElement).checked;
		checked = isChecked;
		const themeName = isChecked ? theme : 'light';
		currentTheme = themeName;

		// Manually set theme for better reliability
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', themeName);
		}

		if (onchange) {
			onchange(isChecked, themeName);
		}
	}

	function handleSelect(themeName: string) {
		if (disabled || loading) return;
		isOpen = false;
		currentTheme = themeName;

		// Manually set theme for better reliability across layouts
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', themeName);
		}

		if (onchange) {
			onchange(true, themeName);
		}
		// Close dropdown for DaisyUI (bluring fixed focus)
		if (activeLayout === 'dropdown') {
			(document.activeElement as HTMLElement)?.blur();
		}
	}

	function toggleFab() {
		if (disabled || loading) return;
		isOpen = !isOpen;
	}

	// Calculate item positions for circular layout
	function getItemStyle(index: number, totalItems: number) {
		if (activeLayout !== 'fab' || effectiveDirection !== 'circle' || !isOpen) return '';

		const radius = size === 'lg' ? 100 : size === 'md' ? 80 : 60;
		let startAngle = 0;
		let endAngle = 360;

		if (position === 'top-left') {
			startAngle = 0;
			endAngle = 90;
		} else if (position === 'top-right') {
			startAngle = 90;
			endAngle = 180;
		} else if (position === 'bottom-right') {
			startAngle = 180;
			endAngle = 270;
		} else if (position === 'bottom-left') {
			startAngle = 270;
			endAngle = 360;
		}

		const arcSize = endAngle - startAngle;
		let angleInDeg = 0;

		if (arcSize === 360) {
			angleInDeg = (index / totalItems) * 360 - 90;
		} else {
			const step = totalItems > 1 ? arcSize / (totalItems - 1) : 0;
			angleInDeg = startAngle + index * step;
		}

		const angleInRad = (angleInDeg * Math.PI) / 180;
		const x = Math.round(radius * Math.cos(angleInRad));
		const y = Math.round(radius * Math.sin(angleInRad));

		return `transform: translate(${x}px, ${y}px); opacity: 1;`;
	}
</script>

{#snippet ThemeIcon(name: string)}
	{#if name === 'light'}
		<!-- Sun icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-5 w-5"
		>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2" />
			<path d="M12 20v2" />
			<path d="m4.93 4.93 1.41 1.41" />
			<path d="m17.66 17.66 1.41 1.41" />
			<path d="M2 12h2" />
			<path d="M20 12h2" />
			<path d="m6.34 17.66-1.41 1.41" />
			<path d="m19.07 4.93-1.41 1.41" />
		</svg>
	{:else if name === 'dark'}
		<!-- Moon icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-5 w-5"
		>
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
		</svg>
	{:else if name === 'system' || name === 'device' || name === 'auto'}
		<!-- Enhanced System/Monitor icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-5 w-5"
		>
			<rect width="20" height="14" x="2" y="3" rx="2" />
			<path d="M12 17v4" />
			<path d="M8 21h8" />
			<path d="M12 7v6" />
			<path d="M9 10h6" />
		</svg>
	{:else}
		<!-- Simple text fallback if no icon found -->
		<span class="text-[10px] font-bold uppercase">{name.substring(0, 2)}</span>
	{/if}
{/snippet}

<div class={containerClasses}>
	{#if activeLayout === 'toggle'}
		<label
			class="swap {baseClasses} {animation === 'rotate' ? 'swap-rotate' : 'swap-flip'}"
			aria-label={ariaLabel}
			style={customColor
				? `background-color: ${customColor}; border-color: ${customColor}; color: white;`
				: ''}
			{...props}
		>
			<input
				type="checkbox"
				class="theme-controller hidden"
				value={theme}
				{checked}
				disabled={disabled || loading}
				onchange={handleChange}
			/>
			{#if loading}
				<span class="loading loading-spinner"></span>
			{:else}
				<div class="swap-on">
					<Icon size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}>
						{@render ThemeIcon('light')}
					</Icon>
				</div>
				<div class="swap-off">
					<Icon size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}>
						{@render ThemeIcon('dark')}
					</Icon>
				</div>
			{/if}
		</label>
	{:else if activeLayout === 'fab'}
		<!-- FAB Mode -->
		<div class="expandable-container {effectiveDirection}">
			<button
				class={baseClasses}
				onclick={toggleFab}
				aria-label={ariaLabel}
				aria-expanded={isOpen}
				style={customColor
					? `background-color: ${customColor}; border-color: ${customColor}; color: white;`
					: ''}
			>
				{#if loading}
					<span class="loading loading-spinner"></span>
				{:else if triggerIcon}
					{@render triggerIcon()}
				{:else}
					<Icon size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="transition-transform duration-300"
							class:rotate-45={isOpen}
						>
							<line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
						</svg>
					</Icon>
				{/if}
			</button>
			<div class="items-wrapper" class:open={isOpen}>
				{#each effectiveItems as item, i}
					<label
						class="item-btn {baseClasses} cursor-pointer shadow-lg"
						style="{getItemStyle(i, effectiveItems.length)} {item.color
							? `background-color: ${item.color}; border-color: ${item.color}; color: white;`
							: ''}"
						title={item.label || item.name}
					>
						<input
							type="radio"
							name={radioName}
							class="hidden"
							value={item.name}
							checked={currentTheme === item.name}
							onchange={() => handleSelect(item.name)}
						/>
						{#if item.icon}
							{@render item.icon()}
						{:else}
							{@render ThemeIcon(item.name)}
						{/if}
					</label>
				{/each}
			</div>
		</div>
	{:else if activeLayout === 'dropdown'}
		<!-- Dropdown Mode -->
		<div
			tabindex="0"
			role="button"
			class={baseClasses}
			style={customColor
				? `background-color: ${customColor}; border-color: ${customColor}; color: white;`
				: ''}
		>
			{#if loading}
				<span class="loading loading-spinner"></span>
			{:else if triggerIcon}
				{@render triggerIcon()}
			{:else}
				<div class="flex items-center justify-center">
					<Icon size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}>
						{@render ThemeIcon(currentTheme)}
					</Icon>
				</div>
			{/if}
		</div>
		<ul
			class="dropdown-content menu bg-base-200/90 rounded-box border-base-content/10 z-[100] mt-2 w-48 border p-2 shadow-2xl backdrop-blur-md"
		>
			{#each effectiveItems as item}
				<li>
					<button
						class="hover:bg-base-content/10 active:bg-base-content/20 text-base-content flex w-full items-center gap-3 text-left transition-colors"
						class:bg-base-content={currentTheme === item.name}
						class:text-base-100={currentTheme === item.name}
						onclick={() => handleSelect(item.name)}
						type="button"
					>
						{#if item.icon}
							{@render item.icon()}
						{:else}
							{@render ThemeIcon(item.name)}
						{/if}
						<span class="text-sm font-medium">{item.label || item.name}</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	:global(.swap-on),
	:global(.swap-off) {
		display: inline-flex !important;
		align-items: center;
		justify-content: center;
	}

	.expandable-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.items-wrapper {
		position: absolute;
		display: flex;
		gap: 0.5rem;
		pointer-events: none;
		z-index: -1;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.items-wrapper.open {
		pointer-events: auto;
		z-index: 10;
	}

	.up .items-wrapper {
		flex-direction: column-reverse;
		bottom: 100%;
		margin-bottom: 0.5rem;
		opacity: 0;
		transform: translateY(10px);
	}
	.up .items-wrapper.open {
		opacity: 1;
		transform: translateY(0);
	}

	.down .items-wrapper {
		flex-direction: column;
		top: 100%;
		margin-top: 0.5rem;
		opacity: 0;
		transform: translateY(-10px);
	}
	.down .items-wrapper.open {
		opacity: 1;
		transform: translateY(0);
	}

	.left .items-wrapper {
		flex-direction: row-reverse;
		right: 100%;
		margin-right: 0.5rem;
		opacity: 0;
		transform: translateX(10px);
	}
	.left .items-wrapper.open {
		opacity: 1;
		transform: translateX(0);
	}

	.right .items-wrapper {
		flex-direction: row;
		left: 100%;
		margin-left: 0.5rem;
		opacity: 0;
		transform: translateX(-10px);
	}
	.right .items-wrapper.open {
		opacity: 1;
		transform: translateX(0);
	}

	.circle .items-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 0;
		height: 0;
	}

	.item-btn {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.circle .item-btn {
		position: absolute;
		opacity: 0;
		transform: translate(0, 0);
	}

	/* Force cursor for disabled state regardless of DaisyUI overrides */
	:global(.btn-disabled),
	:global([disabled]) {
		cursor: not-allowed !important;
		pointer-events: auto !important; /* Enable hover for cursor change */
	}
</style>
