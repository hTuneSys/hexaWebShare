<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Tab item interface
	 */
	export interface TabItem {
		/**
		 * Unique identifier for the tab
		 */
		value: string | number;
		/**
		 * Tab label text
		 */
		label: string;
		/**
		 * Whether the tab is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Optional icon or badge content for the tab
		 */
		icon?: Snippet;
		/**
		 * Tab panel content (optional, can also use children prop)
		 */
		content?: Snippet;
	}

	/**
	 * Props interface for the Tabs component
	 */
	interface Props {
		/**
		 * Array of tab items
		 */
		tabs: TabItem[];
		/**
		 * Active tab value (controlled mode)
		 */
		value?: string | number;
		/**
		 * Default active tab value (uncontrolled mode)
		 */
		defaultValue?: string | number;
		/**
		 * Visual style variant
		 * @default 'border'
		 */
		variant?: 'box' | 'border' | 'lift';
		/**
		 * Color variant (only applies to box variant)
		 * @default undefined
		 */
		color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Tab size
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Tab placement
		 * @default 'top'
		 */
		placement?: 'top' | 'bottom';
		/**
		 * Whether tabs are disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Use radio inputs instead of buttons (DaisyUI pattern)
		 * @default false
		 */
		useRadio?: boolean;
		/**
		 * Radio group name (required when useRadio is true)
		 */
		name?: string;
		/**
		 * Change event handler
		 */
		onChange?: (value: string | number) => void;
		/**
		 * Accessible label for the tablist
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Children content (alternative to tab.content)
		 */
		children?: Snippet;
	}

	const {
		tabs = [],
		value,
		defaultValue,
		variant = 'border',
		color,
		size = 'md',
		placement = 'top',
		disabled = false,
		useRadio = false,
		name,
		onChange,
		ariaLabel,
		class: className = '',
		children,
		...props
	}: Props = $props();

	// Determine if component is controlled
	const isControlled = value !== undefined;

	// Internal state for uncontrolled mode
	let internalValue = $state<string | number | undefined>(defaultValue);

	// Active tab value
	let activeValue = $derived(value ?? internalValue ?? tabs[0]?.value);

	// Set active tab
	function setActiveValue(newValue: string | number) {
		if (disabled) return;

		const tab = tabs.find((t) => t.value === newValue);
		if (!tab || tab.disabled) return;

		if (!isControlled) {
			internalValue = newValue;
		}
		onChange?.(newValue);
	}

	// Generate unique IDs for accessibility
	const tablistId = `tabs-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
	const radioGroupName = name || `tabs-${tablistId}`;

	// Keyboard navigation handler
	function handleKeyDown(event: KeyboardEvent, currentIndex: number) {
		if (disabled) return;

		const enabledTabs = tabs.filter((tab) => !tab.disabled);
		const currentTab = tabs[currentIndex];
		if (!currentTab || currentTab.disabled) return;

		const currentEnabledIndex = enabledTabs.findIndex((tab) => tab.value === currentTab.value);
		let nextIndex = currentEnabledIndex;

		switch (event.key) {
			case 'ArrowLeft':
			case 'ArrowUp':
				event.preventDefault();
				nextIndex = currentEnabledIndex > 0 ? currentEnabledIndex - 1 : enabledTabs.length - 1;
				setActiveValue(enabledTabs[nextIndex].value);
				focusTab(enabledTabs[nextIndex].value);
				break;
			case 'ArrowRight':
			case 'ArrowDown':
				event.preventDefault();
				nextIndex = currentEnabledIndex < enabledTabs.length - 1 ? currentEnabledIndex + 1 : 0;
				setActiveValue(enabledTabs[nextIndex].value);
				focusTab(enabledTabs[nextIndex].value);
				break;
			case 'Home':
				event.preventDefault();
				if (enabledTabs.length > 0) {
					setActiveValue(enabledTabs[0].value);
					focusTab(enabledTabs[0].value);
				}
				break;
			case 'End':
				event.preventDefault();
				if (enabledTabs.length > 0) {
					setActiveValue(enabledTabs[enabledTabs.length - 1].value);
					focusTab(enabledTabs[enabledTabs.length - 1].value);
				}
				break;
		}
	}

	// Focus a specific tab button
	let tablistElement = $state<HTMLDivElement | null>(null);

	function focusTab(tabValue: string | number) {
		if (!tablistElement) return;
		const tabId = `${tablistId}-tab-${tabValue}`;
		const button = tablistElement.querySelector<HTMLButtonElement>(`#${tabId}`);
		button?.focus();
	}

	// Tab container classes
	let tabsClasses = $derived(
		[
			'tabs',
			variant === 'box' && 'tabs-box',
			variant === 'border' && 'tabs-border',
			variant === 'lift' && 'tabs-lifted',
			// Color variants (only for box variant)
			variant === 'box' && color === 'primary' && 'bg-primary text-primary-content',
			variant === 'box' && color === 'secondary' && 'bg-secondary text-secondary-content',
			variant === 'box' && color === 'accent' && 'bg-accent text-accent-content',
			variant === 'box' && color === 'neutral' && 'bg-neutral text-neutral-content',
			variant === 'box' && color === 'info' && 'bg-info text-info-content',
			variant === 'box' && color === 'success' && 'bg-success text-success-content',
			variant === 'box' && color === 'warning' && 'bg-warning text-warning-content',
			variant === 'box' && color === 'error' && 'bg-error text-error-content',
			size === 'xs' && 'tabs-xs',
			size === 'sm' && 'tabs-sm',
			size === 'md' && 'tabs-md',
			size === 'lg' && 'tabs-lg',
			size === 'xl' && 'tabs-xl',
			placement === 'bottom' && 'tabs-bottom',
			disabled && 'opacity-60 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Get active tab content
	let activeTab = $derived(tabs.find((tab) => tab.value === activeValue));
</script>

{#if useRadio}
	<!-- Radio input based tabs (DaisyUI pattern) -->
	<div
		bind:this={tablistElement}
		class={tabsClasses}
		{...props}
	>
		{#each tabs as tab, index}
			{@const isActive = tab.value === activeValue}
			{@const tabId = `${tablistId}-tab-${tab.value}`}
			{@const panelId = `${tablistId}-panel-${tab.value}`}
			{#if tab.icon}
				<!-- Radio input with label for icon support -->
				<input
					type="radio"
					name={radioGroupName}
					id={tabId}
					class="hidden"
					checked={isActive}
					disabled={disabled || tab.disabled}
					onchange={() => setActiveValue(tab.value)}
				/>
				<label
					for={tabId}
					class="tab {isActive ? 'tab-active' : ''} {tab.disabled || disabled ? 'tab-disabled' : ''} cursor-pointer"
				>
					<span class="mr-2">
						{@render tab.icon()}
					</span>
					{tab.label}
				</label>
			{:else}
				<!-- Radio input without label (DaisyUI simple pattern) -->
				<input
					type="radio"
					name={radioGroupName}
					class="tab {isActive ? 'tab-active' : ''} {tab.disabled || disabled ? 'tab-disabled' : ''}"
					aria-label={tab.label}
					checked={isActive}
					disabled={disabled || tab.disabled}
					onchange={() => setActiveValue(tab.value)}
				/>
			{/if}
			{#if tab.content || children}
				<div
					class="tab-content bg-base-100 border-base-300 p-6"
					id={panelId}
					style={isActive ? '' : 'display: none;'}
				>
					{#if tab.content}
						{@render tab.content()}
					{:else if children}
						{@render children()}
					{/if}
				</div>
			{/if}
		{/each}
	</div>
{:else}
	<!-- Button based tabs (default) -->
	<div
		bind:this={tablistElement}
		class={tabsClasses}
		role="tablist"
		aria-label={ariaLabel}
		id={tablistId}
		{...props}
	>
		{#each tabs as tab, index}
			{@const isActive = tab.value === activeValue}
			{@const tabId = `${tablistId}-tab-${tab.value}`}
			{@const panelId = `${tablistId}-panel-${tab.value}`}
			<button
				type="button"
				role="tab"
				id={tabId}
				aria-controls={panelId}
				aria-selected={isActive}
				aria-disabled={disabled || tab.disabled}
				tabindex={disabled || tab.disabled
					? -1
					: isActive
						? 0
						: -1}
				class="tab {isActive ? 'tab-active' : ''} {tab.disabled || disabled ? 'tab-disabled' : ''}"
				disabled={disabled || tab.disabled}
				onclick={() => setActiveValue(tab.value)}
				onkeydown={(e) => handleKeyDown(e, index)}
			>
				{#if tab.icon}
					<span class="mr-2">
						{@render tab.icon()}
					</span>
				{/if}
				{tab.label}
			</button>
		{/each}
	</div>

	<!-- Tab panels -->
	{#if activeTab}
		{@const panelId = `${tablistId}-panel-${activeTab.value}`}
		{@const tabId = `${tablistId}-tab-${activeTab.value}`}
		<div
			role="tabpanel"
			id={panelId}
			aria-labelledby={tabId}
			class="mt-4"
		>
			{#if activeTab.content}
				{@render activeTab.content()}
			{:else if children}
				{@render children()}
			{/if}
		</div>
	{/if}
{/if}
