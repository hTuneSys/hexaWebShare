<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import * as icons from 'lucide-svelte';

	interface Props {
		name: string;
		size?: 'xs' | 'sm' | 'md' | 'lg';
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		ariaLabel?: string;
		ariaHidden?: boolean;
		disabled?: boolean;
		loading?: boolean;
		class?: string;
	}

	const {
		name,
		size = 'md',
		variant = 'neutral',
		ariaLabel,
		ariaHidden = false,
		disabled = false,
		loading = false,
		class: className = '',
		...props
	}: Props = $props();

	let iconClasses = $derived(
		[
			'inline-block',
			'flex-shrink-0',
			size === 'xs' && 'w-4 h-4',
			size === 'sm' && 'w-5 h-5',
			size === 'md' && 'w-6 h-6',
			size === 'lg' && 'w-8 h-8',
			variant === 'primary' && 'text-primary',
			variant === 'secondary' && 'text-secondary',
			variant === 'accent' && 'text-accent',
			variant === 'neutral' && 'text-neutral',
			variant === 'info' && 'text-info',
			variant === 'success' && 'text-success',
			variant === 'warning' && 'text-warning',
			variant === 'error' && 'text-error',
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Accessibility: Determine if icon is decorative or semantic
	let isDecorative = $derived(ariaHidden || !ariaLabel);
	let shouldBeFocusable = $derived(!disabled && !isDecorative && ariaLabel !== undefined);

	// Loading state classes
	let loadingClasses = $derived(
		[
			'loading',
			'loading-spinner',
			size === 'xs' && 'loading-xs',
			size === 'sm' && 'loading-sm',
			size === 'md' && 'loading-md',
			size === 'lg' && 'loading-lg',
			variant === 'primary' && 'text-primary',
			variant === 'secondary' && 'text-secondary',
			variant === 'accent' && 'text-accent',
			variant === 'neutral' && 'text-neutral',
			variant === 'info' && 'text-info',
			variant === 'success' && 'text-success',
			variant === 'warning' && 'text-warning',
			variant === 'error' && 'text-error'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Dynamically select icon component based on name
	// Convert kebab-case or camelCase to PascalCase for Lucide icon names
	let iconName = $derived.by(() => {
		// If already PascalCase (starts with uppercase), use as is
		if (
			name.charAt(0) === name.charAt(0).toUpperCase() &&
			name.charAt(0) !== name.charAt(0).toLowerCase()
		) {
			return name;
		}
		// Convert kebab-case or camelCase to PascalCase
		return name
			.split(/[-_]/)
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join('');
	});

	// Get icon component from lucide-svelte, fallback to first available icon if not found
	type ComponentType = typeof import('svelte').SvelteComponent;
	let IconComponent = $derived.by(() => {
		const convertedName = iconName;
		let icon = icons[convertedName as keyof typeof icons] as ComponentType;

		// If not found, try alternative names for common icons
		if (!icon) {
			// Try alternative names for Info icon
			if (convertedName.includes('Info')) {
				// Try 'Info' first (most common in Lucide)
				icon =
					(icons['Info' as keyof typeof icons] as ComponentType) ||
					(icons['InfoCircle' as keyof typeof icons] as ComponentType) ||
					(icons['CircleInfo' as keyof typeof icons] as ComponentType);
			}
		}

		// Final fallback to first available icon
		return icon || (Object.values(icons)[0] as ComponentType);
	});
</script>

{#if loading}
	<span
		class={loadingClasses}
		aria-label={ariaLabel || 'Loading'}
		aria-hidden={isDecorative}
		role={isDecorative ? undefined : 'status'}
		{...props}
	></span>
{:else if IconComponent}
	<IconComponent
		class={iconClasses}
		aria-label={ariaLabel}
		aria-hidden={isDecorative}
		role={isDecorative ? undefined : 'img'}
		{...shouldBeFocusable ? { tabindex: 0 } : {}}
		{...props}
	/>
{/if}
