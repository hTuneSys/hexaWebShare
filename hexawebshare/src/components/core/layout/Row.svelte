<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		/**
		 * Content to be rendered inside the row
		 */
		children?: Snippet;

		/**
		 * Gap between items
		 * @default '4'
		 */
		gap?: '0' | '1' | '2' | '4' | '6' | '8' | '12';

		/**
		 * Vertical alignment of items (align-items)
		 * @default 'center'
		 */
		align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';

		/**
		 * Horizontal alignment of items (justify-content)
		 * @default 'start'
		 */
		justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

		/**
		 * Whether items should wrap to the next line
		 * @default false
		 */
		wrap?: boolean;

		/**
		 * ARIA label for accessibility
		 */
		ariaLabel?: string;

		/**
		 * Additional CSS classes
		 * @default ''
		 */
		class?: string;
	}

	let {
		children,
		gap = '4',
		align = 'center',
		justify = 'start',
		wrap = false,
		ariaLabel,
		class: className = '',
		...props
	}: Props = $props();

	// Static class mapping for Gap
	let gapClass = $derived(
		gap === '0'
			? 'gap-0'
			: gap === '1'
				? 'gap-1'
				: gap === '2'
					? 'gap-2'
					: gap === '4'
						? 'gap-4'
						: gap === '6'
							? 'gap-6'
							: gap === '8'
								? 'gap-8'
								: gap === '12'
									? 'gap-12'
									: 'gap-4'
	);

	// Static class mapping for Align
	let alignClass = $derived(
		align === 'start'
			? 'items-start'
			: align === 'center'
				? 'items-center'
				: align === 'end'
					? 'items-end'
					: align === 'baseline'
						? 'items-baseline'
						: align === 'stretch'
							? 'items-stretch'
							: 'items-center'
	);

	// Static class mapping for Justify
	let justifyClass = $derived(
		justify === 'start'
			? 'justify-start'
			: justify === 'center'
				? 'justify-center'
				: justify === 'end'
					? 'justify-end'
					: justify === 'between'
						? 'justify-between'
						: justify === 'around'
							? 'justify-around'
							: justify === 'evenly'
								? 'justify-evenly'
								: 'justify-start'
	);

	// Static class mapping for Wrap
	let wrapClass = $derived(wrap ? 'flex-wrap' : 'flex-nowrap');
</script>

<div
	class="flex {gapClass} {alignClass} {justifyClass} {wrapClass} {className}"
	role="group"
	aria-label={ariaLabel}
	{...props}
>
	{@render children?.()}
</div>
