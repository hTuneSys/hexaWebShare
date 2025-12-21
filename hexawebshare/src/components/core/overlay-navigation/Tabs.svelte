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
		 * Optional icon snippet for the tab
		 */
		icon?: Snippet;
		/**
		 * Tab panel content snippet
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
		 * Visual style variant (DaisyUI v4 naming)
		 * - 'bordered': Tabs with bottom border indicator
		 * - 'lifted': 3D lifted tab style
		 * - 'boxed': Contained box style
		 * @default 'bordered'
		 */
		variant?: 'boxed' | 'bordered' | 'lifted';
		/**
		 * Color variant (applies to tabs)
		 */
		color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error';
		/**
		 * Tab size
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether tabs are disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Use radio inputs with tab-content (for CSS-only tab switching)
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
		 * Additional CSS classes for the tabs container
		 */
		class?: string;
		/**
		 * Children content (alternative to tab.content for simple use cases)
		 */
		children?: Snippet;
	}

	const {
		tabs = [],
		value,
		defaultValue,
		variant = 'bordered',
		color,
		size = 'md',
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

	// Get first enabled tab value
	function getFirstEnabledTabValue(): string | number | undefined {
		return tabs.find((tab) => !tab.disabled)?.value ?? tabs[0]?.value;
	}

	// Internal state for uncontrolled mode
	let internalValue = $state<string | number | undefined>(
		defaultValue ?? getFirstEnabledTabValue()
	);

	// Active tab value
	let activeValue = $derived(isControlled ? value : internalValue);

	// Ensure activeValue is valid on initialization
	$effect(() => {
		if (!isControlled && activeValue !== undefined) {
			const tab = tabs.find((t) => t.value === activeValue);
			if (!tab || tab.disabled) {
				const firstEnabled = getFirstEnabledTabValue();
				if (firstEnabled !== undefined) {
					internalValue = firstEnabled;
				}
			}
		}
	});

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

	// Generate unique IDs for accessibility and radio groups
	const tablistId = `tabs-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
	const radioGroupName = name || tablistId;

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
		const button = tablistElement.querySelector<HTMLButtonElement | HTMLInputElement>(
			`#${CSS.escape(tabId)}`
		);
		button?.focus();
	}

	// Tab container classes (DaisyUI v4 naming)
	let tabsClasses = $derived(
		[
			'tabs',
			variant === 'boxed' && 'tabs-boxed',
			variant === 'bordered' && 'tabs-bordered',
			variant === 'lifted' && 'tabs-lifted',
			size === 'xs' && 'tabs-xs',
			size === 'sm' && 'tabs-sm',
			size === 'md' && 'tabs-md',
			size === 'lg' && 'tabs-lg',
			disabled && 'opacity-50 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Get tab classes
	function getTabClasses(tab: TabItem, isActive: boolean): string {
		return [
			'tab',
			isActive && 'tab-active',
			(tab.disabled || disabled) && 'tab-disabled',
			color === 'primary' && 'tab-primary',
			color === 'secondary' && 'tab-secondary',
			color === 'accent' && 'tab-accent',
			color === 'success' && 'tab-success',
			color === 'warning' && 'tab-warning',
			color === 'info' && 'tab-info',
			color === 'error' && 'tab-error'
		]
			.filter(Boolean)
			.join(' ');
	}

	// Get active tab content
	let activeTab = $derived(tabs.find((tab) => tab.value === activeValue));

	// Check if any tab has content
	let hasContent = $derived(tabs.some((tab) => tab.content) || children);
</script>

{#if useRadio}
	<!-- Radio input based tabs (DaisyUI v4 pattern with tab-content) -->
	<div
		bind:this={tablistElement}
		class={tabsClasses}
		role="tablist"
		aria-label={ariaLabel}
		{...props}
	>
		{#each tabs as tab, index}
			{@const isActive = tab.value === activeValue}
			{@const tabId = `${tablistId}-tab-${tab.value}`}
			{@const isDisabled = disabled || tab.disabled}

			<input
				type="radio"
				id={tabId}
				name={radioGroupName}
				class={getTabClasses(tab, isActive)}
				role="tab"
				aria-label={tab.label}
				checked={isActive}
				disabled={isDisabled}
				onchange={() => setActiveValue(tab.value)}
				onkeydown={(e) => handleKeyDown(e, index)}
			/>

			{#if tab.content && variant === 'lifted'}
				<!-- Tab content for lifted variant (goes after each tab) -->
				<div class="tab-content rounded-box border-base-300 bg-base-100 p-6" role="tabpanel">
					{@render tab.content()}
				</div>
			{/if}
		{/each}
	</div>

	{#if hasContent && variant !== 'lifted'}
		<!-- Tab panels for non-lifted variants -->
		<div class="mt-4">
			{#if activeTab?.content}
				{@render activeTab.content()}
			{:else if children}
				{@render children()}
			{/if}
		</div>
	{/if}
{:else}
	<!-- Button based tabs (default, more accessible) -->
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
			{@const isDisabled = disabled || tab.disabled}

			<button
				type="button"
				role="tab"
				id={tabId}
				aria-controls={hasContent ? panelId : undefined}
				aria-selected={isActive}
				aria-disabled={isDisabled}
				tabindex={isDisabled ? -1 : isActive ? 0 : -1}
				class={getTabClasses(tab, isActive)}
				disabled={isDisabled}
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
	{#if hasContent && activeTab}
		{@const panelId = `${tablistId}-panel-${activeTab.value}`}
		{@const tabId = `${tablistId}-tab-${activeTab.value}`}
		<div role="tabpanel" id={panelId} aria-labelledby={tabId} class="mt-4">
			{#if activeTab.content}
				{@render activeTab.content()}
			{:else if children}
				{@render children()}
			{/if}
		</div>
	{/if}
{/if}
