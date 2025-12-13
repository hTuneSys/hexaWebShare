<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	interface Props {
		/** Image source URL */
		src?: string;
		/** Alt text for accessibility */
		alt?: string;
		/** Size of the avatar */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/** Shape of the avatar mask */
		shape?: 'circle' | 'squircle' | 'hexagon' | 'triangle';
		/** Status indicator */
		status?: 'online' | 'offline' | null;
		/** Placeholder text (initials) if no image is provided */
		placeholder?: string;
		/** Additional CSS classes */
		class?: string;
	}

	const {
		src,
		alt = 'Avatar',
		size = 'md',
		shape = 'circle',
		status = null,
		placeholder,
		class: className = '',
		...props
	}: Props = $props();

	// Static DaisyUI classes via derived state
	let containerClasses = $derived(
		[
			'avatar',
			status === 'online' && 'online',
			status === 'offline' && 'offline',
			placeholder && 'placeholder',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	let maskClasses = $derived(
		[
			'w-24', // Default base width class, overridden by size logic if needed or handled via specific width classes
			size === 'xs' && 'w-8',
			size === 'sm' && 'w-12',
			size === 'md' && 'w-24',
			size === 'lg' && 'w-32',
			size === 'xl' && 'w-48',
			// Mask shapes
			!placeholder && 'mask',
			!placeholder && shape === 'circle' && 'mask-circle',
			!placeholder && shape === 'squircle' && 'mask-squircle',
			!placeholder && shape === 'hexagon' && 'mask-hexagon',
			!placeholder && shape === 'triangle' && 'mask-triangle',
			// Placeholder specific styling
			placeholder && 'bg-neutral text-neutral-content rounded-full'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Placeholder content wrapper classes
	let placeholderContentClasses = $derived(
		[
			size === 'xs' && 'text-xs',
			size === 'sm' && 'text-sm',
			size === 'md' && 'text-xl',
			size === 'lg' && 'text-3xl',
			size === 'xl' && 'text-4xl'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={containerClasses} {...props}>
	<div class={maskClasses}>
		{#if src}
			<img {src} {alt} />
		{:else if placeholder}
			<span class={placeholderContentClasses}>{placeholder}</span>
		{:else}
			<!-- Default fallback if neither src nor placeholder is provided -->
			<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" {alt} />
		{/if}
	</div>
</div>
