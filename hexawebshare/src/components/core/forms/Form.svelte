<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the Form component
	 */
	interface Props {
		/**
		 * HTTP method for form submission
		 * @default 'post'
		 */
		method?: 'get' | 'post' | 'dialog';
		/**
		 * URL to submit the form to
		 */
		action?: string;
		/**
		 * Form encoding type
		 */
		enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
		/**
		 * Target window for form submission
		 */
		target?: '_self' | '_blank' | '_parent' | '_top' | string;
		/**
		 * Form name attribute
		 */
		name?: string;
		/**
		 * Whether to validate form before submission
		 * @default true
		 */
		novalidate?: boolean;
		/**
		 * Autocomplete setting for the form
		 * @default 'on'
		 */
		autocomplete?: 'on' | 'off';
		/**
		 * Submit event handler
		 */
		onsubmit?: (event: SubmitEvent) => void;
		/**
		 * Reset event handler
		 */
		onreset?: (event: Event) => void;
		/**
		 * Form content
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Accessible label for the form
		 */
		ariaLabel?: string;
		/**
		 * ID of element that labels this form
		 */
		ariaLabelledby?: string;
		/**
		 * ID of element that describes this form
		 */
		ariaDescribedby?: string;
	}

	const {
		method = 'post',
		action,
		enctype,
		target,
		name,
		novalidate = false,
		autocomplete = 'on',
		onsubmit,
		onreset,
		children,
		class: className = '',
		ariaLabel,
		ariaLabelledby,
		ariaDescribedby,
		...props
	}: Props = $props();
</script>

<form
	{method}
	{action}
	{enctype}
	{target}
	{name}
	{novalidate}
	{autocomplete}
	{onsubmit}
	{onreset}
	class={className}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	aria-describedby={ariaDescribedby}
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
</form>
