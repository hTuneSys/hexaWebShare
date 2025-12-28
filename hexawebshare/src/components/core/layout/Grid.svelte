<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the Grid component
	 * A flexible grid layout system for organizing content in rows and columns
	 */
	interface Props {
		/**
		 * Grid content snippet
		 */
		children: Snippet;
		/**
		 * Number of columns in the grid
		 * @default 3
		 */
		columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
		/**
		 * Responsive column configuration
		 * Format: { xs?: number, sm?: number, md?: number, lg?: number, xl?: number, '2xl'?: number }
		 */
		responsiveColumns?: {
			xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
			sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
			md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
			lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
			xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
			'2xl'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
		};
		/**
		 * Gap between grid items
		 * @default 'md'
		 */
		gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
		/**
		 * Visual variant of the grid
		 * @default 'default'
		 */
		variant?: 'default' | 'bordered' | 'filled' | 'ghost';
		/**
		 * Whether the grid is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the grid is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether to show a background
		 * @default false
		 */
		background?: boolean;
		/**
		 * Accessible label for the grid
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		children,
		columns = 3,
		responsiveColumns,
		gap = 'md',
		variant = 'default',
		loading = false,
		disabled = false,
		background = false,
		ariaLabel,
		class: className = '',
		...props
	}: Props = $props();

	// Grid container classes
	let gridClasses = $derived(
		[
			'grid',
			'w-full',
			// Base column class
			columns === 1 && 'grid-cols-1',
			columns === 2 && 'grid-cols-2',
			columns === 3 && 'grid-cols-3',
			columns === 4 && 'grid-cols-4',
			columns === 5 && 'grid-cols-5',
			columns === 6 && 'grid-cols-6',
			columns === 7 && 'grid-cols-7',
			columns === 8 && 'grid-cols-8',
			columns === 9 && 'grid-cols-9',
			columns === 10 && 'grid-cols-10',
			columns === 11 && 'grid-cols-11',
			columns === 12 && 'grid-cols-12',
			// Responsive column classes
			responsiveColumns?.xs === 1 && 'grid-cols-1',
			responsiveColumns?.xs === 2 && 'grid-cols-2',
			responsiveColumns?.xs === 3 && 'grid-cols-3',
			responsiveColumns?.xs === 4 && 'grid-cols-4',
			responsiveColumns?.xs === 5 && 'grid-cols-5',
			responsiveColumns?.xs === 6 && 'grid-cols-6',
			responsiveColumns?.xs === 7 && 'grid-cols-7',
			responsiveColumns?.xs === 8 && 'grid-cols-8',
			responsiveColumns?.xs === 9 && 'grid-cols-9',
			responsiveColumns?.xs === 10 && 'grid-cols-10',
			responsiveColumns?.xs === 11 && 'grid-cols-11',
			responsiveColumns?.xs === 12 && 'grid-cols-12',
			responsiveColumns?.sm === 1 && 'sm:grid-cols-1',
			responsiveColumns?.sm === 2 && 'sm:grid-cols-2',
			responsiveColumns?.sm === 3 && 'sm:grid-cols-3',
			responsiveColumns?.sm === 4 && 'sm:grid-cols-4',
			responsiveColumns?.sm === 5 && 'sm:grid-cols-5',
			responsiveColumns?.sm === 6 && 'sm:grid-cols-6',
			responsiveColumns?.sm === 7 && 'sm:grid-cols-7',
			responsiveColumns?.sm === 8 && 'sm:grid-cols-8',
			responsiveColumns?.sm === 9 && 'sm:grid-cols-9',
			responsiveColumns?.sm === 10 && 'sm:grid-cols-10',
			responsiveColumns?.sm === 11 && 'sm:grid-cols-11',
			responsiveColumns?.sm === 12 && 'sm:grid-cols-12',
			responsiveColumns?.md === 1 && 'md:grid-cols-1',
			responsiveColumns?.md === 2 && 'md:grid-cols-2',
			responsiveColumns?.md === 3 && 'md:grid-cols-3',
			responsiveColumns?.md === 4 && 'md:grid-cols-4',
			responsiveColumns?.md === 5 && 'md:grid-cols-5',
			responsiveColumns?.md === 6 && 'md:grid-cols-6',
			responsiveColumns?.md === 7 && 'md:grid-cols-7',
			responsiveColumns?.md === 8 && 'md:grid-cols-8',
			responsiveColumns?.md === 9 && 'md:grid-cols-9',
			responsiveColumns?.md === 10 && 'md:grid-cols-10',
			responsiveColumns?.md === 11 && 'md:grid-cols-11',
			responsiveColumns?.md === 12 && 'md:grid-cols-12',
			responsiveColumns?.lg === 1 && 'lg:grid-cols-1',
			responsiveColumns?.lg === 2 && 'lg:grid-cols-2',
			responsiveColumns?.lg === 3 && 'lg:grid-cols-3',
			responsiveColumns?.lg === 4 && 'lg:grid-cols-4',
			responsiveColumns?.lg === 5 && 'lg:grid-cols-5',
			responsiveColumns?.lg === 6 && 'lg:grid-cols-6',
			responsiveColumns?.lg === 7 && 'lg:grid-cols-7',
			responsiveColumns?.lg === 8 && 'lg:grid-cols-8',
			responsiveColumns?.lg === 9 && 'lg:grid-cols-9',
			responsiveColumns?.lg === 10 && 'lg:grid-cols-10',
			responsiveColumns?.lg === 11 && 'lg:grid-cols-11',
			responsiveColumns?.lg === 12 && 'lg:grid-cols-12',
			responsiveColumns?.xl === 1 && 'xl:grid-cols-1',
			responsiveColumns?.xl === 2 && 'xl:grid-cols-2',
			responsiveColumns?.xl === 3 && 'xl:grid-cols-3',
			responsiveColumns?.xl === 4 && 'xl:grid-cols-4',
			responsiveColumns?.xl === 5 && 'xl:grid-cols-5',
			responsiveColumns?.xl === 6 && 'xl:grid-cols-6',
			responsiveColumns?.xl === 7 && 'xl:grid-cols-7',
			responsiveColumns?.xl === 8 && 'xl:grid-cols-8',
			responsiveColumns?.xl === 9 && 'xl:grid-cols-9',
			responsiveColumns?.xl === 10 && 'xl:grid-cols-10',
			responsiveColumns?.xl === 11 && 'xl:grid-cols-11',
			responsiveColumns?.xl === 12 && 'xl:grid-cols-12',
			responsiveColumns?.['2xl'] === 1 && '2xl:grid-cols-1',
			responsiveColumns?.['2xl'] === 2 && '2xl:grid-cols-2',
			responsiveColumns?.['2xl'] === 3 && '2xl:grid-cols-3',
			responsiveColumns?.['2xl'] === 4 && '2xl:grid-cols-4',
			responsiveColumns?.['2xl'] === 5 && '2xl:grid-cols-5',
			responsiveColumns?.['2xl'] === 6 && '2xl:grid-cols-6',
			responsiveColumns?.['2xl'] === 7 && '2xl:grid-cols-7',
			responsiveColumns?.['2xl'] === 8 && '2xl:grid-cols-8',
			responsiveColumns?.['2xl'] === 9 && '2xl:grid-cols-9',
			responsiveColumns?.['2xl'] === 10 && '2xl:grid-cols-10',
			responsiveColumns?.['2xl'] === 11 && '2xl:grid-cols-11',
			responsiveColumns?.['2xl'] === 12 && '2xl:grid-cols-12',
			// Gap classes
			gap === 'none' && 'gap-0',
			gap === 'xs' && 'gap-1',
			gap === 'sm' && 'gap-2',
			gap === 'md' && 'gap-4',
			gap === 'lg' && 'gap-6',
			gap === 'xl' && 'gap-8',
			gap === '2xl' && 'gap-12',
			// Variant classes
			background && variant === 'default' && 'bg-base-200',
			background && variant === 'bordered' && 'bg-base-200 border border-base-300',
			background && variant === 'filled' && 'bg-base-300',
			background && variant === 'ghost' && 'bg-base-200/50',
			// State classes
			disabled && 'opacity-50 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div
	class={gridClasses}
	role="grid"
	aria-label={ariaLabel || 'Grid layout'}
	aria-busy={loading}
	aria-disabled={disabled}
	aria-live={loading ? 'polite' : undefined}
	{...props}
>
	{#if loading}
		<div
			class="col-span-full flex min-h-[50vh] items-center justify-center"
			role="status"
			aria-live="polite"
			aria-label="Loading grid content"
		>
			<span class="loading loading-spinner loading-lg text-primary" aria-hidden="true"></span>
		</div>
	{:else}
		{@render children()}
	{/if}
</div>
