<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component TableCell

Internal helper component for rendering table cell content.
This component ensures consistent text rendering using the Text component.

**Purpose:**
- Provides reusable cell rendering logic
- Uses Text component for all cell content
- Handles alignment and responsive visibility
- Maintains DaisyUI table structure

**Usage:**
This component is internal to the Table module and should not be used directly.
Use the Table component instead.
-->

<script lang="ts">
	import Text from '../../typography/Text.svelte';

	interface Props {
		/**
		 * Cell content (text)
		 */
		content: string;
		/**
		 * Cell alignment
		 * @default 'left'
		 */
		align?: 'left' | 'center' | 'right';
		/**
		 * Hide on mobile devices
		 * @default false
		 */
		hideOnMobile?: boolean;
		/**
		 * Show border around cell
		 * @default false
		 */
		bordered?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		content,
		align = 'left',
		hideOnMobile = false,
		bordered = false,
		class: className = ''
	}: Props = $props();

	// Cell alignment class
	let alignmentClass = $derived(
		align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
	);

	// Cell classes
	let cellClasses = $derived(
		[
			alignmentClass,
			hideOnMobile && 'hidden sm:table-cell',
			bordered && 'border border-base-300',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<td class={cellClasses}>
	<Text text={content} />
</td>
