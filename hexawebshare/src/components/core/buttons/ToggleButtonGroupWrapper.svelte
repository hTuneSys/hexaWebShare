<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import ButtonGroup from './ButtonGroup.svelte';
	import ToggleButton from './ToggleButton.svelte';

	interface ButtonProps {
		label?: string;
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost'
			| 'link';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		pressed?: boolean;
		disabled?: boolean;
		outline?: boolean;
		wide?: boolean;
		block?: boolean;
		glass?: boolean;
		loading?: boolean;
		defaultIconPoints?: string;
		defaultIconWidth?: string | number;
		defaultIconHeight?: string | number;
		ariaLabel?: string;
		onclick?: (pressed: boolean) => void;
		class?: string;
	}

	interface Props extends ButtonProps {
		orientation?: 'horizontal' | 'vertical';
		gap?: 'xs' | 'sm' | 'md' | 'lg';
		buttons?: Array<ButtonProps>;
	}

	const {
		orientation = 'horizontal',
		gap = 'sm',
		buttons,
		label,
		variant,
		size,
		pressed,
		disabled,
		outline,
		wide,
		block,
		glass,
		loading,
		defaultIconPoints,
		defaultIconWidth,
		defaultIconHeight,
		ariaLabel,
		onclick,
		class: className,
		...rest
	}: Props = $props();

	// If buttons array is provided, render as button group
	// Otherwise, if label or other single button props are provided, render as single button
	const isButtonGroup = buttons !== undefined && buttons.length > 0;
</script>

{#if isButtonGroup}
	<ButtonGroup {orientation} {gap}>
		{#snippet children()}
			{#each buttons as button}
				<ToggleButton
					label={label || button.label}
					variant={variant || button.variant || 'primary'}
					size={size || button.size || 'md'}
					pressed={pressed !== undefined ? pressed : (button.pressed ?? false)}
					disabled={disabled !== undefined ? disabled : (button.disabled ?? false)}
					outline={outline !== undefined ? outline : (button.outline ?? false)}
					wide={wide !== undefined ? wide : (button.wide ?? false)}
					block={block !== undefined ? block : (button.block ?? false)}
					glass={glass !== undefined ? glass : (button.glass ?? false)}
					loading={loading !== undefined ? loading : (button.loading ?? false)}
					defaultIconPoints={defaultIconPoints || button.defaultIconPoints}
					defaultIconWidth={defaultIconWidth || button.defaultIconWidth}
					defaultIconHeight={defaultIconHeight || button.defaultIconHeight}
					ariaLabel={ariaLabel || button.ariaLabel}
					onclick={onclick || button.onclick}
					class={className || button.class}
				/>
			{/each}
		{/snippet}
	</ButtonGroup>
{:else}
	<!-- Single button mode -->
	<ToggleButton
		{label}
		{variant}
		{size}
		{pressed}
		{disabled}
		{outline}
		{wide}
		{block}
		{glass}
		{loading}
		{defaultIconPoints}
		{defaultIconWidth}
		{defaultIconHeight}
		{ariaLabel}
		{onclick}
		class={className}
		{...rest}
	/>
{/if}

