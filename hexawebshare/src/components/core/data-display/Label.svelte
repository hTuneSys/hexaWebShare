<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Text from '../typography/Text.svelte';

	/**
	 * Props interface for the Label component
	 */
	interface Props {
		/**
		 * Label text content
		 */
		text: string;
		/**
		 * The ID of the form element this label is associated with
		 */
		for?: string;
		/**
		 * Whether the field is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Size variant
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Text to display for required indicator
		 * @default '*'
		 */
		requiredText?: string;
		/**
		 * Aria label for required indicator
		 * @default 'required'
		 */
		requiredAriaLabel?: string;
		/**
		 * Whether the label is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * HTML id attribute
		 */
		id?: string;
		/**
		 * ARIA label
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		text,
		for: htmlFor,
		required = false,
		size = 'md',
		requiredText = '*',
		requiredAriaLabel = 'required',
		disabled = false,
		id,
		ariaLabel,
		class: className = '',
		...props
	}: Props = $props();

	// Label classes based on size
	let labelClasses = $derived(
		[
			'label',
			size === 'xs' && 'py-0',
			size === 'sm' && 'py-1',
			size === 'md' && 'py-2',
			size === 'lg' && 'py-3',
			disabled && 'opacity-50 cursor-not-allowed',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Text size mapping
	let textSize = $derived<'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'>(
		size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'md' ? 'sm' : 'base'
	);
</script>

<label for={htmlFor} class={labelClasses} {id} aria-label={ariaLabel} {...props}>
	<Text size={textSize} class="label-text" display="inline">
		{text}
		{#if required}
			<Text
				text={requiredText}
				variant="error"
				size={textSize}
				class="ml-1"
				ariaLabel={requiredAriaLabel}
			/>
		{/if}
	</Text>
</label>
