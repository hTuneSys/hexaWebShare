<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { icons } from 'lucide-svelte';
	
	interface Props {
		/** Name of the icon from Lucide library (e.g. 'home', 'user', 'settings') */
		name: string;
		/** Size of the icon */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/** Color variant */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost';
		/** Additional CSS classes */
		class?: string;
		/** Accessible label for the icon */
		ariaLabel?: string;
		/** Whether to hide the icon from screen readers explicitly */
		ariaHidden?: boolean;
		/** Whether to spin the icon (e.g. for loading states) */
		spin?: boolean;
		
		[key: string]: any;
	}

	const {
		name,
		size = 'md',
		variant = 'ghost',
		class: className = '',
		ariaLabel,
		ariaHidden = false,
		spin = false,
		...props
	}: Props = $props();

	// Resolve icon component dynamically
	let IconComponent = $derived((icons as any)[name] || (icons as any)['HelpCircle'] || null);

	let iconClasses = $derived(
		[
			'inline-block align-middle transition-colors duration-200',
			// Sizes
			size === 'xs' && 'w-3 h-3',
			size === 'sm' && 'w-4 h-4',
			size === 'md' && 'w-6 h-6',
			size === 'lg' && 'w-8 h-8',
			size === 'xl' && 'w-12 h-12',
			// Variants (color)
			variant === 'primary' && 'text-primary',
			variant === 'secondary' && 'text-secondary',
			variant === 'accent' && 'text-accent',
			variant === 'info' && 'text-info',
			variant === 'success' && 'text-success',
			variant === 'warning' && 'text-warning',
			variant === 'error' && 'text-error',
			variant === 'ghost' && 'text-current',
			// Spin animation
			spin && 'animate-spin',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Accessibility logic fix
	let isDecorative = $derived(ariaHidden || !ariaLabel);
	
	// Focusable logic fix
	let shouldBeFocusable = $derived(!isDecorative);

</script>

{#if IconComponent}
	<IconComponent 
		class={iconClasses}
		role={isDecorative ? 'presentation' : 'img'}
		aria-label={ariaLabel}
		aria-hidden={isDecorative}
		focusable={shouldBeFocusable}
		{...props}
	/>
{:else}
	<span class="text-error" title="Icon configuration error">?</span>
{/if}
