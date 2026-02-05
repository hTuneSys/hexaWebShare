<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Size options for the spacer
	 */
	type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	/**
	 * Axis direction for the spacer
	 */
	type SpacerAxis = 'horizontal' | 'vertical' | 'both';

	interface Props {
		/**
		 * Size of the spacing
		 * @default 'md'
		 */
		size?: SpacerSize;
		/**
		 * Direction of the spacing
		 * @default 'vertical'
		 */
		axis?: SpacerAxis;
		/**
		 * Whether the spacer is purely decorative (hidden from screen readers)
		 * @default true
		 */
		ariaHidden?: boolean;
		/**
		 * Show a visual outline for debugging/demonstration purposes
		 * @default false
		 */
		showOutline?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		size = 'md',
		axis = 'vertical',
		ariaHidden = true,
		showOutline = false,
		class: className = ''
	}: Props = $props();

	// Size to pixel mapping
	const sizeMap: Record<SpacerSize, string> = {
		xs: '4px',
		sm: '8px',
		md: '16px',
		lg: '32px',
		xl: '48px',
		'2xl': '64px'
	};

	// Calculate dimensions based on axis
	const heightStyle = $derived(axis !== 'horizontal' ? sizeMap[size] : undefined);
	const widthStyle = $derived(axis !== 'vertical' ? sizeMap[size] : undefined);

	// Display style
	const displayStyle = $derived(axis === 'horizontal' ? 'inline-block' : 'block');

	// Outline classes for debugging
	const outlineClasses = $derived(
		showOutline ? 'border-2 border-dashed border-primary/50 bg-primary/10' : ''
	);

	// Combine all classes
	const spacerClasses = $derived([className, outlineClasses].filter(Boolean).join(' '));
</script>

<div
	class={spacerClasses}
	style:display={displayStyle}
	style:height={heightStyle}
	style:width={widthStyle}
	aria-hidden={ariaHidden}
></div>
