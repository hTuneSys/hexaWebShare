<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	interface Props {
		/**
		 * Image source URL
		 * @default undefined
		 */
		src?: string;
		/**
		 * Alt text for accessibility
		 * @default 'Avatar'
		 */
		alt?: string;
		/**
		 * Size of the avatar
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Shape of the avatar mask
		 * @default 'circle'
		 */
		shape?: 'circle' | 'squircle' | 'hexagon' | 'triangle';
		/**
		 * Status indicator
		 * @default null
		 */
		status?: 'online' | 'offline' | null;
		/**
		 * Placeholder text (initials) if no image is provided
		 * @default undefined
		 */
		placeholder?: string;
		/**
		 * ARIA label for screen readers
		 * @default undefined (uses alt text)
		 */
		ariaLabel?: string;
		/**
		 * Whether avatar is decorative only
		 * @default false
		 */
		ariaHidden?: boolean;
		/**
		 * Show loading skeleton while image loads
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Additional CSS classes
		 * @default ''
		 */
		class?: string;
	}

	const {
		src,
		alt = 'Avatar',
		size = 'md',
		shape = 'circle',
		status = null,
		placeholder,
		ariaLabel,
		ariaHidden = false,
		loading = false,
		class: className = '',
		...props
	}: Props = $props();

	// Accessibility logic
	let isDecorative = $derived(ariaHidden);
	let effectiveAriaLabel = $derived(ariaLabel || alt);

	// Image loading state
	let imageLoading = $state(true);
	let imageError = $state(false);

	function handleImageLoad() {
		imageLoading = false;
	}

	function handleImageError() {
		imageLoading = false;
		imageError = true;
	}

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
			// Size classes (removed redundant base w-24)
			size === 'xs' && 'w-8',
			size === 'sm' && 'w-12',
			size === 'md' && 'w-24',
			size === 'lg' && 'w-32',
			size === 'xl' && 'w-48',

			// Mask shapes - apply to both images AND placeholders
			'mask',
			shape === 'circle' && 'mask-circle',
			shape === 'squircle' && 'mask-squircle',
			shape === 'hexagon' && 'mask-hexagon',
			shape === 'triangle' && 'mask-triangle',

			// Placeholder colors
			placeholder && 'bg-neutral text-neutral-content flex items-center justify-center'
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

<div
	class={containerClasses}
	role={isDecorative ? 'presentation' : 'img'}
	aria-label={!isDecorative ? effectiveAriaLabel : undefined}
	aria-hidden={isDecorative}
	{...props}
>
	<div class={maskClasses}>
		{#if loading || (src && imageLoading)}
			<div class="skeleton h-full w-full bg-base-300"></div>
		{/if}

		{#if src}
			<img
				{src}
				{alt}
				onload={handleImageLoad}
				onerror={handleImageError}
				class:hidden={loading || imageLoading}
			/>
		{:else if !loading}
			{#if placeholder}
				<span class={placeholderContentClasses}>{placeholder}</span>
			{:else}
				<!-- Fallback: Show first letter of alt text -->
				<span
					class="flex h-full w-full items-center justify-center bg-base-300 text-base-content {placeholderContentClasses}"
				>
					{alt.charAt(0).toUpperCase() || '?'}
				</span>
			{/if}
		{/if}
	</div>
</div>
