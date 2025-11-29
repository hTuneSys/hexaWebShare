<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->


<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | 'link';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    label: string;
    outline?: boolean;
    wide?: boolean;
    block?: boolean;
    glass?: boolean;
    disabled?: boolean;
    loading?: boolean;
    onclick?: () => void;
  }
  
  const { 
    variant = 'primary', 
    size = 'md', 
    label, 
    outline = false,
    wide = false,
    block = false,
    glass = false,
    disabled = false,
    loading = false,
    ...props 
  }: Props = $props();
  
  let buttonClasses = $derived([
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
    variant === 'accent' && 'btn-accent',
    variant === 'neutral' && 'btn-neutral',
    variant === 'info' && 'btn-info',
    variant === 'success' && 'btn-success',
    variant === 'warning' && 'btn-warning',
    variant === 'error' && 'btn-error',
    variant === 'ghost' && 'btn-ghost',
    variant === 'link' && 'btn-link',
    size === 'xs' && 'btn-xs',
    size === 'sm' && 'btn-sm',
    size === 'md' && 'btn-md',
    size === 'lg' && 'btn-lg',
    outline && 'btn-outline',
    wide && 'btn-wide',
    block && 'btn-block',
    glass && 'glass',
  ].filter(Boolean).join(' '));
</script>
<button
  type="button"
  class={buttonClasses}
  {disabled}
  {...props}
>
  {#if loading}
    <span class="loading loading-spinner"></span>
  {/if}
  {label}
</button>
