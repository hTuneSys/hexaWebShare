<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		/**
		 * Content to be rendered inside the column
		 */
		children?: Snippet;

		/**
		 * Number of columns to span (1-12)
		 * @default 'auto'
		 */
		span?:
			| 'auto'
			| '1'
			| '2'
			| '3'
			| '4'
			| '5'
			| '6'
			| '7'
			| '8'
			| '9'
			| '10'
			| '11'
			| '12'
			| 'full';

		/**
		 * Column start position (1-13)
		 * @default undefined
		 */
		start?:
			| '1'
			| '2'
			| '3'
			| '4'
			| '5'
			| '6'
			| '7'
			| '8'
			| '9'
			| '10'
			| '11'
			| '12'
			| '13'
			| 'auto';

		/**
		 * Column span at sm breakpoint (640px+)
		 * @default undefined
		 */
		sm?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full';

		/**
		 * Column span at md breakpoint (768px+)
		 * @default undefined
		 */
		md?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full';

		/**
		 * Column span at lg breakpoint (1024px+)
		 * @default undefined
		 */
		lg?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full';

		/**
		 * Column span at xl breakpoint (1280px+)
		 * @default undefined
		 */
		xl?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full';

		/**
		 * Order of the column in the grid
		 * @default undefined
		 */
		order?:
			| 'first'
			| 'last'
			| 'none'
			| '1'
			| '2'
			| '3'
			| '4'
			| '5'
			| '6'
			| '7'
			| '8'
			| '9'
			| '10'
			| '11'
			| '12';

		/**
		 * Self alignment within the grid cell
		 * @default undefined
		 */
		align?: 'auto' | 'start' | 'center' | 'end' | 'stretch';

		/**
		 * Additional CSS classes
		 * @default ''
		 */
		class?: string;
	}

	let {
		children,
		span = 'auto',
		start,
		sm,
		md,
		lg,
		xl,
		order,
		align,
		class: className = '',
		...props
	}: Props = $props();

	// Static class mapping for Span
	let spanClass = $derived(
		span === 'auto'
			? 'col-auto'
			: span === '1'
				? 'col-span-1'
				: span === '2'
					? 'col-span-2'
					: span === '3'
						? 'col-span-3'
						: span === '4'
							? 'col-span-4'
							: span === '5'
								? 'col-span-5'
								: span === '6'
									? 'col-span-6'
									: span === '7'
										? 'col-span-7'
										: span === '8'
											? 'col-span-8'
											: span === '9'
												? 'col-span-9'
												: span === '10'
													? 'col-span-10'
													: span === '11'
														? 'col-span-11'
														: span === '12'
															? 'col-span-12'
															: span === 'full'
																? 'col-span-full'
																: 'col-auto'
	);

	// Static class mapping for Start
	let startClass = $derived(
		start === '1'
			? 'col-start-1'
			: start === '2'
				? 'col-start-2'
				: start === '3'
					? 'col-start-3'
					: start === '4'
						? 'col-start-4'
						: start === '5'
							? 'col-start-5'
							: start === '6'
								? 'col-start-6'
								: start === '7'
									? 'col-start-7'
									: start === '8'
										? 'col-start-8'
										: start === '9'
											? 'col-start-9'
											: start === '10'
												? 'col-start-10'
												: start === '11'
													? 'col-start-11'
													: start === '12'
														? 'col-start-12'
														: start === '13'
															? 'col-start-13'
															: start === 'auto'
																? 'col-start-auto'
																: ''
	);

	// Static class mapping for SM breakpoint
	let smClass = $derived(
		sm === '1'
			? 'sm:col-span-1'
			: sm === '2'
				? 'sm:col-span-2'
				: sm === '3'
					? 'sm:col-span-3'
					: sm === '4'
						? 'sm:col-span-4'
						: sm === '5'
							? 'sm:col-span-5'
							: sm === '6'
								? 'sm:col-span-6'
								: sm === '7'
									? 'sm:col-span-7'
									: sm === '8'
										? 'sm:col-span-8'
										: sm === '9'
											? 'sm:col-span-9'
											: sm === '10'
												? 'sm:col-span-10'
												: sm === '11'
													? 'sm:col-span-11'
													: sm === '12'
														? 'sm:col-span-12'
														: sm === 'full'
															? 'sm:col-span-full'
															: ''
	);

	// Static class mapping for MD breakpoint
	let mdClass = $derived(
		md === '1'
			? 'md:col-span-1'
			: md === '2'
				? 'md:col-span-2'
				: md === '3'
					? 'md:col-span-3'
					: md === '4'
						? 'md:col-span-4'
						: md === '5'
							? 'md:col-span-5'
							: md === '6'
								? 'md:col-span-6'
								: md === '7'
									? 'md:col-span-7'
									: md === '8'
										? 'md:col-span-8'
										: md === '9'
											? 'md:col-span-9'
											: md === '10'
												? 'md:col-span-10'
												: md === '11'
													? 'md:col-span-11'
													: md === '12'
														? 'md:col-span-12'
														: md === 'full'
															? 'md:col-span-full'
															: ''
	);

	// Static class mapping for LG breakpoint
	let lgClass = $derived(
		lg === '1'
			? 'lg:col-span-1'
			: lg === '2'
				? 'lg:col-span-2'
				: lg === '3'
					? 'lg:col-span-3'
					: lg === '4'
						? 'lg:col-span-4'
						: lg === '5'
							? 'lg:col-span-5'
							: lg === '6'
								? 'lg:col-span-6'
								: lg === '7'
									? 'lg:col-span-7'
									: lg === '8'
										? 'lg:col-span-8'
										: lg === '9'
											? 'lg:col-span-9'
											: lg === '10'
												? 'lg:col-span-10'
												: lg === '11'
													? 'lg:col-span-11'
													: lg === '12'
														? 'lg:col-span-12'
														: lg === 'full'
															? 'lg:col-span-full'
															: ''
	);

	// Static class mapping for XL breakpoint
	let xlClass = $derived(
		xl === '1'
			? 'xl:col-span-1'
			: xl === '2'
				? 'xl:col-span-2'
				: xl === '3'
					? 'xl:col-span-3'
					: xl === '4'
						? 'xl:col-span-4'
						: xl === '5'
							? 'xl:col-span-5'
							: xl === '6'
								? 'xl:col-span-6'
								: xl === '7'
									? 'xl:col-span-7'
									: xl === '8'
										? 'xl:col-span-8'
										: xl === '9'
											? 'xl:col-span-9'
											: xl === '10'
												? 'xl:col-span-10'
												: xl === '11'
													? 'xl:col-span-11'
													: xl === '12'
														? 'xl:col-span-12'
														: xl === 'full'
															? 'xl:col-span-full'
															: ''
	);

	// Static class mapping for Order
	let orderClass = $derived(
		order === 'first'
			? 'order-first'
			: order === 'last'
				? 'order-last'
				: order === 'none'
					? 'order-none'
					: order === '1'
						? 'order-1'
						: order === '2'
							? 'order-2'
							: order === '3'
								? 'order-3'
								: order === '4'
									? 'order-4'
									: order === '5'
										? 'order-5'
										: order === '6'
											? 'order-6'
											: order === '7'
												? 'order-7'
												: order === '8'
													? 'order-8'
													: order === '9'
														? 'order-9'
														: order === '10'
															? 'order-10'
															: order === '11'
																? 'order-11'
																: order === '12'
																	? 'order-12'
																	: ''
	);

	// Static class mapping for Align
	let alignClass = $derived(
		align === 'auto'
			? 'self-auto'
			: align === 'start'
				? 'self-start'
				: align === 'center'
					? 'self-center'
					: align === 'end'
						? 'self-end'
						: align === 'stretch'
							? 'self-stretch'
							: ''
	);

	// Combine all classes
	let colClasses = $derived(
		[spanClass, startClass, smClass, mdClass, lgClass, xlClass, orderClass, alignClass, className]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={colClasses} role="region" aria-label="Grid column" {...props}>
	{@render children?.()}
</div>
