<!-- SPDX-FileCopyrightText: 2025 hexaTune LLC -->
<!-- SPDX-License-Identifier: MIT -->

<script lang="ts">
  export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
  export type ButtonColor = 'primary' | 'secondary' | 'accent' | 'neutral';
  export type ButtonSize = 'sm' | 'md' | 'lg';

  export let variant: ButtonVariant = 'solid';
  export let color: ButtonColor = 'primary';
  export let size: ButtonSize = 'md';
  export let disabled = false;
  export let loading = false;
  export let fullWidth = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';

  const baseClass = 'btn';

  const variantClassMap: Record<ButtonVariant, string> = {
    solid: '',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    link: 'btn-link'
  };

  const colorClassMap: Record<ButtonColor, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    neutral: 'btn-neutral'
  };

  const sizeClassMap: Record<ButtonSize, string> = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg'
  };
</script>

<button
  class={`${baseClass} ${variantClassMap[variant]} ${colorClassMap[color]} ${sizeClassMap[size]} ${fullWidth ? 'w-full' : ''}`}
  {type}
  disabled={disabled || loading}
>
  {#if loading}
    <span class="loading loading-spinner loading-sm mr-2"></span>
  {/if}
  <slot />
</button>

