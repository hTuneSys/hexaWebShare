<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { DropdownItem } from '../../core/overlay-navigation/Dropdown.svelte';

	// Core component imports
	import Heading from '../../core/typography/Heading.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Dropdown from '../../core/overlay-navigation/Dropdown.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';
	import Divider from '../../core/layout/Divider.svelte';

	/**
	 * Props interface for the FormCard component
	 * A card container specifically designed for forms with header actions and footer buttons
	 */
	interface Props {
		/** Card title text */
		title?: string;
		/** Card description/subtitle text */
		description?: string;
		/** Visual variant of the card */
		variant?: 'default' | 'bordered' | 'filled' | 'elevated';
		/** Padding size for the card content */
		padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/** Whether the card content is collapsible */
		collapsible?: boolean;
		/** Whether the card is currently collapsed */
		collapsed?: boolean;
		/** Whether the card is disabled */
		disabled?: boolean;
		/** Whether the card is in loading state */
		loading?: boolean;
		/** Whether the card has an error state */
		error?: boolean;
		/** Error message to display */
		errorMessage?: string;
		/** Dropdown menu items for header actions */
		menuItems?: DropdownItem[];
		/** Label for the dropdown menu trigger button */
		menuLabel?: string;
		/** Primary action button label (footer) */
		primaryActionLabel?: string;
		/** Secondary action button label (footer) */
		secondaryActionLabel?: string;
		/** Whether the primary button is in loading state */
		primaryLoading?: boolean;
		/** Whether the primary button is disabled */
		primaryDisabled?: boolean;
		/** Accessible label for screen readers */
		ariaLabel?: string;
		/** Label for expand button */
		expandLabel?: string;
		/** Label for collapse button */
		collapseLabel?: string;
		/** Whether to show divider before footer */
		showDivider?: boolean;
		/** CSS class for the divider */
		dividerClass?: string;
		/** Custom header content snippet */
		header?: Snippet;
		/** Main content snippet (form fields) */
		children?: Snippet;
		/** Custom footer content snippet */
		footer?: Snippet;
		/** Custom collapse icon snippet */
		collapseIcon?: Snippet<[{ isCollapsed: boolean }]>;
		/** Callback when primary action is clicked */
		onPrimaryAction?: () => void;
		/** Callback when secondary action is clicked */
		onSecondaryAction?: () => void;
		/** Callback when collapsed state changes */
		onCollapseChange?: (collapsed: boolean) => void;
		/** Callback when a menu item is clicked */
		onMenuItemClick?: (item: DropdownItem, index: number) => void;
		/** Additional CSS classes */
		class?: string;
		/** Spinner size for loading state */
		spinnerSize?: 'xs' | 'sm' | 'md' | 'lg';
		/** CSS class for loading container */
		loadingContainerClass?: string;
		/** CSS class for header title container */
		headerTitleContainerClass?: string;
		/** CSS class for header actions container */
		headerActionsContainerClass?: string;
		/** Heading level */
		headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		/** Heading size */
		headingSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
		/** Heading weight */
		headingWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
		/** Description text size */
		descriptionSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
		/** Description text variant */
		descriptionVariant?: 'default' | 'muted' | 'primary' | 'secondary' | 'error';
		/** Dropdown position */
		dropdownPosition?: 'top' | 'bottom' | 'left' | 'right';
		/** Dropdown alignment */
		dropdownAlign?: 'start' | 'end';
		/** Dropdown size */
		dropdownSize?: 'sm' | 'md' | 'lg';
		/** Dropdown variant */
		dropdownVariant?: 'default' | 'bordered' | 'ghost';
		/** Collapse button variant */
		collapseButtonVariant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost'
			| 'link';
		/** Collapse button size */
		collapseButtonSize?: 'xs' | 'sm' | 'md' | 'lg';
		/** Error text size */
		errorTextSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
		/** Error text variant */
		errorTextVariant?: 'default' | 'muted' | 'primary' | 'secondary' | 'error';
		/** Secondary button variant */
		secondaryButtonVariant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost'
			| 'link';
		/** Primary button variant */
		primaryButtonVariant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost'
			| 'link';
		/** Base CSS class for the card */
		baseClass?: string;
		/** CSS class for bordered variant */
		borderedClass?: string;
		/** CSS class for filled variant */
		filledClass?: string;
		/** CSS class for elevated variant */
		elevatedClass?: string;
		/** CSS class for default variant */
		defaultVariantClass?: string;
		/** CSS class for disabled state */
		disabledClass?: string;
		/** CSS class for error state */
		errorClass?: string;
		/** CSS class for header */
		headerClass?: string;
		/** CSS class for content */
		contentClass?: string;
		/** CSS class for footer */
		footerClass?: string;
		/** CSS class for hidden state */
		hiddenClass?: string;
	}

	const {
		title,
		description,
		variant,
		padding,
		collapsible,
		collapsed,
		disabled,
		loading,
		error,
		errorMessage,
		menuItems,
		menuLabel,
		primaryActionLabel,
		secondaryActionLabel,
		primaryLoading,
		primaryDisabled,
		ariaLabel,
		expandLabel,
		collapseLabel,
		showDivider,
		dividerClass,
		header,
		children,
		footer,
		collapseIcon,
		onPrimaryAction,
		onSecondaryAction,
		onCollapseChange,
		onMenuItemClick,
		class: className,
		spinnerSize,
		loadingContainerClass,
		headerTitleContainerClass,
		headerActionsContainerClass,
		headingLevel,
		headingSize,
		headingWeight,
		descriptionSize,
		descriptionVariant,
		dropdownPosition,
		dropdownAlign,
		dropdownSize,
		dropdownVariant,
		collapseButtonVariant,
		collapseButtonSize,
		errorTextSize,
		errorTextVariant,
		secondaryButtonVariant,
		primaryButtonVariant,
		baseClass,
		borderedClass,
		filledClass,
		elevatedClass,
		defaultVariantClass,
		disabledClass,
		errorClass,
		headerClass,
		contentClass,
		footerClass,
		hiddenClass,
		...props
	}: Props = $props();

	// Internal collapsed state - initialized from collapsed prop
	let isCollapsed = $state<boolean>(!!collapsed);

	// Sync external collapsed prop with internal state
	$effect(() => {
		if (collapsed !== undefined) {
			isCollapsed = collapsed;
		}
	});

	// Check if header should be shown
	let hasHeader = $derived(
		!!title || !!description || !!header || !!menuItems?.length || !!collapsible
	);

	// Check if footer should be shown
	let hasFooter = $derived(!!primaryActionLabel || !!secondaryActionLabel || !!footer);

	// Check if menu should be shown
	let hasMenu = $derived(!!menuItems?.length);

	// Check if collapse button should be shown
	let hasCollapseButton = $derived(!!collapsible && !!collapseIcon);

	// Card container classes
	let cardClasses = $derived(
		[
			baseClass,
			variant === 'bordered' && borderedClass,
			variant === 'filled' && filledClass,
			variant === 'elevated' && elevatedClass,
			variant === 'default' && defaultVariantClass,
			disabled && disabledClass,
			error && errorClass,
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Padding classes
	let paddingClasses = $derived(
		[
			padding === 'xs' && 'p-2',
			padding === 'sm' && 'p-3',
			padding === 'md' && 'p-4',
			padding === 'lg' && 'p-6',
			padding === 'xl' && 'p-8'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Header classes
	let headerClasses = $derived([headerClass, paddingClasses].filter(Boolean).join(' '));

	// Content classes
	let contentClasses = $derived(
		[contentClass, paddingClasses, collapsible && isCollapsed && hiddenClass]
			.filter(Boolean)
			.join(' ')
	);

	// Footer classes
	let footerClasses = $derived(
		[footerClass, paddingClasses, collapsible && isCollapsed && hiddenClass]
			.filter(Boolean)
			.join(' ')
	);

	// Collapse button aria label
	let collapseAriaLabel = $derived(isCollapsed ? expandLabel : collapseLabel);

	// Toggle collapsed state
	function toggleCollapse() {
		if (collapsible && !disabled) {
			isCollapsed = !isCollapsed;
			onCollapseChange?.(isCollapsed);
		}
	}

	// Handle keyboard navigation for collapse toggle
	function handleCollapseKeyDown(event: KeyboardEvent) {
		if (collapsible && !disabled && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault();
			toggleCollapse();
		}
	}

	// Handle primary action click
	function handlePrimaryAction() {
		if (!disabled && !primaryDisabled && !primaryLoading) {
			onPrimaryAction?.();
		}
	}

	// Handle secondary action click
	function handleSecondaryAction() {
		if (!disabled) {
			onSecondaryAction?.();
		}
	}

	// Handle menu item click
	function handleMenuItemClick(item: DropdownItem, index: number) {
		if (!disabled) {
			onMenuItemClick?.(item, index);
		}
	}
</script>

<section
	class={cardClasses}
	aria-label={ariaLabel || title}
	aria-disabled={disabled}
	aria-busy={loading}
	{...props}
>
	{#if loading}
		<div class={loadingContainerClass}>
			<Spinner size={spinnerSize} />
		</div>
	{:else}
		{#if hasHeader}
			<div class={headerClasses}>
				<div class={headerTitleContainerClass}>
					{#if header}
						{@render header()}
					{:else}
						{#if title}
							<Heading
								level={headingLevel}
								size={headingSize}
								weight={headingWeight}
								text={title}
							/>
						{/if}
						{#if description}
							<Text size={descriptionSize} variant={descriptionVariant} text={description} />
						{/if}
					{/if}
				</div>

				<div class={headerActionsContainerClass}>
					{#if hasMenu}
						<Dropdown
							items={menuItems}
							label={menuLabel}
							position={dropdownPosition}
							align={dropdownAlign}
							size={dropdownSize}
							variant={dropdownVariant}
							{disabled}
							onItemClick={handleMenuItemClick}
						/>
					{/if}

					{#if hasCollapseButton}
						<Button
							variant={collapseButtonVariant}
							size={collapseButtonSize}
							ariaLabel={collapseAriaLabel}
							aria-expanded={!isCollapsed}
							onclick={toggleCollapse}
							onkeydown={handleCollapseKeyDown}
							{disabled}
						>
							{#if collapseIcon}
								{@render collapseIcon({ isCollapsed })}
							{/if}
						</Button>
					{/if}
				</div>
			</div>
		{/if}

		{#if error && errorMessage}
			<div class={paddingClasses}>
				<Text variant={errorTextVariant} size={errorTextSize} text={errorMessage} />
			</div>
		{/if}

		<div class={contentClasses}>
			{#if children}
				{@render children()}
			{/if}
		</div>

		{#if hasFooter && !isCollapsed}
			{#if showDivider}
				<Divider class={dividerClass} />
			{/if}
			<div class={footerClasses}>
				{#if footer}
					{@render footer()}
				{:else}
					{#if secondaryActionLabel}
						<Button
							variant={secondaryButtonVariant}
							label={secondaryActionLabel}
							onclick={handleSecondaryAction}
							{disabled}
						/>
					{/if}
					{#if primaryActionLabel}
						<Button
							variant={primaryButtonVariant}
							label={primaryActionLabel}
							onclick={handlePrimaryAction}
							loading={primaryLoading}
							disabled={disabled || primaryDisabled}
						/>
					{/if}
				{/if}
			</div>
		{/if}
	{/if}
</section>
