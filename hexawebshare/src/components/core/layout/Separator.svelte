<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Color variant for the separator
	 */
	type SeparatorVariant =
		| 'default'
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'neutral'
		| 'info'
		| 'success'
		| 'warning'
		| 'error';

	/**
	 * Orientation of the separator
	 */
	type SeparatorOrientation = 'horizontal' | 'vertical';

	/**
	 * Spacing/margin size for the separator
	 */
	type SeparatorSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	interface Props {
		/**
		 * Orientation of the separator
		 * @default 'horizontal'
		 */
		orientation?: SeparatorOrientation;

		/**
		 * Color variant of the separator
		 * @default 'default'
		 */
		variant?: SeparatorVariant;

		/**
		 * Spacing/margin size around the separator
		 * @default 'md'
		 */
		spacing?: SeparatorSpacing;

		/**
		 * Thickness/size of the separator
		 * @default '1'
		 */
		thickness?: '1' | '2' | '4';

		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;

		/**
		 * Whether the separator is purely decorative (hidden from screen readers)
		 * @default true
		 */
		ariaHidden?: boolean;

		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		orientation = 'horizontal',
		variant = 'default',
		spacing = 'md',
		thickness = '1',
		ariaLabel,
		ariaHidden = true,
		class: className = '',
		...props
	}: Props = $props();

	// Static class mapping for orientation and width
	let orientationClasses = $derived(
		orientation === 'horizontal' ? 'w-full' : 'h-full self-stretch flex-shrink-0'
	);

	// Static class mapping for thickness (horizontal uses border-top)
	let thicknessClass = $derived(
		thickness === '1'
			? 'border-t'
			: thickness === '2'
				? 'border-t-2'
				: thickness === '4'
					? 'border-t-4'
					: 'border-t'
	);

	// Static class mapping for vertical thickness (vertical uses border-left)
	// The border itself creates the visual width
	let verticalThicknessClass = $derived(
		thickness === '1'
			? 'border-l w-0'
			: thickness === '2'
				? 'border-l-2 w-0'
				: thickness === '4'
					? 'border-l-4 w-0'
					: 'border-l w-0'
	);

	// Static class mapping for variant colors
	let variantClass = $derived(
		variant === 'default'
			? 'border-base-300'
			: variant === 'primary'
				? 'border-primary'
				: variant === 'secondary'
					? 'border-secondary'
					: variant === 'accent'
						? 'border-accent'
						: variant === 'neutral'
							? 'border-neutral'
							: variant === 'info'
								? 'border-info'
								: variant === 'success'
									? 'border-success'
									: variant === 'warning'
										? 'border-warning'
										: variant === 'error'
											? 'border-error'
											: 'border-base-300'
	);

	// Static class mapping for spacing
	let spacingClass = $derived(
		spacing === 'none'
			? ''
			: spacing === 'xs'
				? orientation === 'horizontal'
					? 'my-1'
					: 'mx-1'
				: spacing === 'sm'
					? orientation === 'horizontal'
						? 'my-2'
						: 'mx-2'
					: spacing === 'md'
						? orientation === 'horizontal'
							? 'my-4'
							: 'mx-4'
						: spacing === 'lg'
							? orientation === 'horizontal'
								? 'my-6'
								: 'mx-6'
							: spacing === 'xl'
								? orientation === 'horizontal'
									? 'my-8'
									: 'mx-8'
								: orientation === 'horizontal'
									? 'my-4'
									: 'mx-4'
	);

	// Combine all classes - ensure all properties are reactive
	let separatorClasses = $derived(
		[
			// Thickness class based on orientation
			orientation === 'horizontal' ? thicknessClass : verticalThicknessClass,
			// Orientation-specific classes
			orientationClasses,
			// Variant color class
			variantClass,
			// Spacing class
			spacingClass,
			// Custom classes
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	const computedAriaHidden = $derived(ariaLabel ? false : ariaHidden);
	const role = $derived(computedAriaHidden ? undefined : 'separator');
	const ariaOrientation = $derived(computedAriaHidden ? undefined : orientation);
</script>

{#if orientation === 'horizontal'}
	<hr
		class="{separatorClasses} border-r-0 border-b-0 border-l-0"
		{role}
		aria-orientation={ariaOrientation}
		aria-hidden={computedAriaHidden}
		aria-label={ariaLabel}
		{...props}
	/>
{:else}
	<div
		class={separatorClasses}
		{role}
		aria-orientation={ariaOrientation}
		aria-hidden={computedAriaHidden}
		aria-label={ariaLabel}
		{...props}
	></div>
{/if}
