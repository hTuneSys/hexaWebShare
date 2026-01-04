<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the KeyboardShortcutHint component
	 */
	interface Props {
		/**
		 * Keyboard shortcut keys to display
		 * Can be a string (e.g., "Ctrl+K") or an array of strings (e.g., ["Ctrl", "K"])
		 * For multiple shortcuts, use array of arrays (e.g., [["Ctrl", "K"], ["Cmd", "K"]])
		 */
		keys: string | string[] | string[][];
		/**
		 * Color variant of the hint
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
			| 'error'
			| 'ghost';
		/**
		 * Size of the hint
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Outline style hint
		 * @default false
		 */
		outline?: boolean;
		/**
		 * Soft/muted background style
		 * @default false
		 */
		soft?: boolean;
		/**
		 * Separator between keys (e.g., "+", "/", "or")
		 * @default '+'
		 */
		separator?: string;
		/**
		 * Whether the hint is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Accessible label for screen readers
		 * If not provided, will be auto-generated from keys
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		keys,
		variant = 'neutral',
		size = 'md',
		outline = false,
		soft = false,
		separator = '+',
		disabled = false,
		ariaLabel,
		class: className = '',
		...props
	}: Props = $props();

	/**
	 * Normalize keys input to a consistent format
	 * Converts string or array inputs to array of key groups
	 */
	let normalizedKeys = $derived(() => {
		if (typeof keys === 'string') {
			// Single string: "Ctrl+K" -> [["Ctrl", "K"]]
			return [keys.split(/[+\/]/).map((k) => k.trim())];
		}
		if (Array.isArray(keys) && keys.length > 0) {
			if (typeof keys[0] === 'string') {
				// Array of strings: ["Ctrl", "K"] -> [["Ctrl", "K"]]
				return [keys as string[]];
			}
			// Array of arrays: [["Ctrl", "K"], ["Cmd", "K"]]
			return keys as string[][];
		}
		return [];
	});

	/**
	 * Generate accessible label from keys
	 */
	let generatedAriaLabel = $derived(() => {
		if (ariaLabel) return ariaLabel;
		const keyGroups = normalizedKeys();
		if (keyGroups.length === 0) return 'Keyboard shortcut';
		if (keyGroups.length === 1) {
			return `Keyboard shortcut: ${keyGroups[0].join(' + ')}`;
		}
		return `Keyboard shortcuts: ${keyGroups.map((group) => group.join(' + ')).join(' or ')}`;
	});

	/**
	 * Badge classes using static DaisyUI classes
	 */
	let badgeClasses = $derived(
		[
			'badge',
			'inline-flex',
			'items-center',
			'gap-1',
			'font-mono',
			'select-none',
			variant === 'primary' && 'badge-primary',
			variant === 'secondary' && 'badge-secondary',
			variant === 'accent' && 'badge-accent',
			variant === 'neutral' && 'badge-neutral',
			variant === 'info' && 'badge-info',
			variant === 'success' && 'badge-success',
			variant === 'warning' && 'badge-warning',
			variant === 'error' && 'badge-error',
			variant === 'ghost' && 'badge-ghost',
			size === 'xs' && 'badge-xs',
			size === 'sm' && 'badge-sm',
			size === 'md' && 'badge-md',
			size === 'lg' && 'badge-lg',
			outline && 'badge-outline',
			soft && 'badge-soft',
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	/**
	 * Key badge classes for individual keys
	 */
	let keyBadgeClasses = $derived(
		[
			'badge',
			'badge-sm',
			'badge-ghost',
			'px-1.5',
			'py-0.5',
			'min-w-[1.5rem]',
			'justify-center',
			'font-mono',
			'text-xs',
			'border',
			'border-base-content/20'
		]
			.filter(Boolean)
			.join(' ')
	);

	/**
	 * Separator classes
	 */
	let separatorClasses = $derived(
		[
			'text-base-content/60',
			'font-normal',
			size === 'xs' && 'text-xs',
			size === 'sm' && 'text-xs',
			size === 'md' && 'text-sm',
			size === 'lg' && 'text-base'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<span class={badgeClasses} aria-label={generatedAriaLabel()} role="status" {...props}>
	{#each normalizedKeys() as keyGroup, groupIndex}
		{#if groupIndex > 0}
			<span class={separatorClasses} aria-hidden="true"> or </span>
		{/if}
		{#each keyGroup as key, keyIndex}
			{#if keyIndex > 0}
				<span class={separatorClasses} aria-hidden="true"> {separator} </span>
			{/if}
			<kbd class={keyBadgeClasses}>{key}</kbd>
		{/each}
	{/each}
</span>
