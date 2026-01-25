<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Modal from '../../core/overlay-navigation/Modal.svelte';
	import Container from '../../core/layout/Container.svelte';
	import List from '../../core/data-display/List.svelte';
	import ListItem from '../../core/data-display/ListItem.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Badge from '../../core/media/Badge.svelte';
	import EmptyState from '../../core/data-display/EmptyState.svelte';
	import Dropdown, { type DropdownItem } from '../../core/overlay-navigation/Dropdown.svelte';
	import Divider from '../../core/layout/Divider.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Row from '../../core/layout/Row.svelte';

	/**
	 * Key-value pair structure for detail data
	 */
	export interface DetailItem {
		key: string;
		label: string;
		value: string | number | boolean | null | undefined;
		valueVariant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
	}

	/**
	 * Action button configuration
	 */
	export interface DetailAction {
		label: string;
		variant?:
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
		outline?: boolean;
		disabled?: boolean;
		loading?: boolean;
		onclick?: () => void;
	}

	interface Props {
		id?: string;
		open?: boolean;
		title?: string;
		data?: DetailItem[];
		size?: 'sm' | 'md' | 'lg' | null;
		actions?: DetailAction[];
		overlay?: boolean;
		closeOnBackdrop?: boolean;
		showCloseButton?: boolean;
		closeOnEscape?: boolean;
		class?: string;
		contentClass?: string;
		ariaLabel?: string;
		emptyStateTitle?: string;
		emptyStateDescription?: string;
		emptyValuePlaceholder: string;
		booleanTrueLabel: string;
		booleanFalseLabel: string;
		closeAriaLabel?: string;
		headerDropdownItems?: DropdownItem[];
		headerDropdownLabel?: string;
		headerDropdownPosition?: 'bottom' | 'top' | 'left' | 'right';
		headerDropdownAlign?: 'start' | 'end';
		itemSpacing: string;
		itemLabelSize: 'xs' | 'sm' | 'base' | 'lg';
		itemValueSize: 'xs' | 'sm' | 'base' | 'lg';
		badgeSize: 'sm' | 'md' | 'lg';
		buttonSize: 'sm' | 'md' | 'lg';
		emptyStateSize: 'sm' | 'md' | 'lg';
		headerDropdownSpacing: string;
		dividerSpacing: string;
		actionsContainerSpacing: string;
		itemContainerClass: string;
		onclose?: () => void;
		onopen?: () => void;
	}

	let {
		id: _id,
		open = $bindable(),
		title,
		data,
		size,
		actions,
		overlay,
		closeOnBackdrop,
		showCloseButton,
		closeOnEscape,
		class: className,
		contentClass,
		ariaLabel,
		emptyStateTitle,
		emptyStateDescription,
		emptyValuePlaceholder,
		booleanTrueLabel,
		booleanFalseLabel,
		closeAriaLabel,
		headerDropdownItems,
		headerDropdownLabel,
		headerDropdownPosition,
		headerDropdownAlign,
		itemSpacing,
		itemLabelSize,
		itemValueSize,
		badgeSize,
		buttonSize,
		emptyStateSize,
		headerDropdownSpacing,
		dividerSpacing,
		actionsContainerSpacing,
		itemContainerClass,
		onclose,
		onopen,
		...props
	}: Props = $props();

	function handleClose() {
		open = false;
		onclose?.();
	}

	function handleOpen() {
		onopen?.();
	}

	$effect(() => {
		if (open) handleOpen();
	});

	const normalizedData = $derived.by(() => {
		if (Array.isArray(data)) {
			return data as DetailItem[];
		}
		return [] as DetailItem[];
	});

	function formatValue(value: string | number | boolean | null | undefined): string {
		if (value === null || value === undefined) {
			return emptyValuePlaceholder;
		}
		if (typeof value === 'boolean') {
			return value ? booleanTrueLabel : booleanFalseLabel;
		}
		return String(value);
	}

	function shouldShowAsBadge(item: DetailItem): boolean {
		return item.valueVariant !== undefined;
	}
</script>

<Modal {open} {title} {size} {closeOnBackdrop} onclose={handleClose} class={className}>
	{#snippet children()}
		<Container
			maxWidth="none"
			padding="none"
			centered={false}
			fluid={true}
			responsive={false}
			className={contentClass}
			{ariaLabel}
		>
			{#snippet children()}
				{#if headerDropdownItems && headerDropdownItems.length > 0 && headerDropdownLabel && headerDropdownPosition && headerDropdownAlign && headerDropdownSpacing && dividerSpacing}
					<Row justify="end" class={headerDropdownSpacing}>
						{#snippet children()}
							<Dropdown
								items={headerDropdownItems}
								label={headerDropdownLabel}
								position={headerDropdownPosition}
								align={headerDropdownAlign}
							/>
						{/snippet}
					</Row>
					<Divider class={dividerSpacing} />
				{/if}
				{#if normalizedData.length > 0 && itemSpacing && itemLabelSize && itemValueSize && badgeSize && emptyStateSize && itemContainerClass}
					<List class={itemSpacing} variant="default" size="md" compact={false}>
						{#snippet children()}
							{#each normalizedData as item (item.key)}
								<!-- 
									NOTE: Raw HTML <li> element is required by List component's snippet structure.
									REASON: DaisyUI menu class requires semantic <ul><li> structure for proper styling and WCAG accessibility compliance.
									This is a technical requirement of the core List component, not a design choice.
								-->
								<li>
									<ListItem
										label={item.label}
										size="md"
										bordered={true}
										hoverable={false}
										class={itemContainerClass}
									>
										{#snippet children()}
											{#if shouldShowAsBadge(item) && item.valueVariant}
												<Badge
													label={formatValue(item.value)}
													variant={item.valueVariant}
													size={badgeSize}
												/>
											{:else}
												<Text text={formatValue(item.value)} size={itemValueSize} display="block" />
											{/if}
										{/snippet}
									</ListItem>
								</li>
							{/each}
						{/snippet}
					</List>
				{:else if emptyStateSize && emptyStateTitle && emptyStateDescription}
					<EmptyState
						title={emptyStateTitle}
						description={emptyStateDescription}
						size={emptyStateSize}
					/>
				{/if}
				{#if actions && actions.length > 0 && dividerSpacing && actionsContainerSpacing && buttonSize}
					<Divider class={dividerSpacing} />
					<Row justify="end" wrap={true} class={actionsContainerSpacing}>
						{#snippet children()}
							{#each actions as action (action.label)}
								<Button
									label={action.label}
									variant={action.variant}
									outline={action.outline}
									disabled={action.disabled}
									loading={action.loading}
									size={buttonSize}
									onclick={action.onclick}
								/>
							{/each}
						{/snippet}
					</Row>
				{/if}
			{/snippet}
		</Container>
	{/snippet}
</Modal>
