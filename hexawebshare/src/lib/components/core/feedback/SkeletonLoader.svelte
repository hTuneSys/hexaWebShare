<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props for the SkeletonLoader component.
	 */
	interface Props {
		/**
		 * Visual shape of the skeleton element.
		 * @default 'rect'
		 */
		shape?: 'rect' | 'text' | 'pill' | 'circle';
		/**
		 * Height scale for the skeleton.
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Width preset for rectangular or text skeletons.
		 * @default 'medium'
		 */
		width?: 'short' | 'medium' | 'long' | 'full';
		/**
		 * Color theme of the skeleton.
		 * @default 'base'
		 */
		variant?:
			| 'base'
			| 'neutral'
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		/**
		 * Number of stacked lines (for text shape).
		 * @default 1
		 */
		lines?: number;
		/**
		 * Vertical spacing between stacked lines.
		 * @default 'sm'
		 */
		gap?: 'none' | 'sm' | 'md';
		/**
		 * Disable shimmer animation.
		 * @default true
		 */
		animated?: boolean;
		/**
		 * Accessible label for assistive technologies.
		 * @default 'Loading content'
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes.
		 */
		class?: string;
	}

	const {
		shape = 'rect',
		size = 'md',
		width = 'medium',
		variant = 'base',
		lines = 1,
		gap = 'sm',
		animated = true,
		ariaLabel = 'Loading content',
		class: className = '',
		...props
	}: Props = $props();

	const heightClasses = {
		xs: 'h-3',
		sm: 'h-4',
		md: 'h-5',
		lg: 'h-6',
		xl: 'h-8'
	} as const;

	const widthClasses = {
		short: 'w-16',
		medium: 'w-28',
		long: 'w-40',
		full: 'w-full'
	} as const;

	const circleSizeClasses = {
		xs: ['h-6', 'w-6'],
		sm: ['h-8', 'w-8'],
		md: ['h-10', 'w-10'],
		lg: ['h-12', 'w-12'],
		xl: ['h-16', 'w-16']
	} as const;

	const variantClasses = {
		base: 'bg-base-300',
		neutral: 'bg-neutral/30',
		primary: 'bg-primary/30',
		secondary: 'bg-secondary/30',
		accent: 'bg-accent/30',
		info: 'bg-info/30',
		success: 'bg-success/30',
		warning: 'bg-warning/30',
		error: 'bg-error/30'
	} as const;

	const gapClasses = {
		none: 'space-y-0',
		sm: 'space-y-2',
		md: 'space-y-3'
	} as const;

	let lineCount = $derived(Math.max(1, Math.min(lines, 10)));

	const containerClasses = $derived(
		['flex', 'flex-col', gapClasses[gap] ?? gapClasses.sm].join(' ')
	);

	const baseClasses = $derived(
		[
			'skeleton',
			variantClasses[variant] ?? variantClasses.base,
			shape !== 'circle' && heightClasses[size],
			shape !== 'circle' && (shape === 'pill' ? 'rounded-full' : 'rounded-md'),
			!animated && 'animate-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	const circleClasses = $derived(
		[
			'skeleton',
			variantClasses[variant] ?? variantClasses.base,
			'rounded-full',
			...(circleSizeClasses[size] ?? circleSizeClasses.md),
			!animated && 'animate-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	const pickWidthClass = (index: number): string => {
		if (width === 'full') return widthClasses.full;

		if (shape === 'text' && lineCount > 1 && index === lineCount - 1) {
			if (width === 'long') return 'w-32';
			if (width === 'medium') return 'w-24';
			if (width === 'short') return 'w-14';
		}

		return widthClasses[width] ?? widthClasses.medium;
	};
</script>

<div
	class={containerClasses}
	role="status"
	aria-live="polite"
	aria-busy="true"
	aria-label={ariaLabel}
	{...props}
>
	{#if shape === 'circle'}
		<div class={circleClasses} aria-hidden="true"></div>
	{:else}
		{#each Array.from({ length: lineCount }) as _, index}
			<div
				class={[baseClasses, pickWidthClass(index), shape === 'text' && 'rounded']
					.filter(Boolean)
					.join(' ')}
				aria-hidden="true"
			></div>
		{/each}
	{/if}
</div>
