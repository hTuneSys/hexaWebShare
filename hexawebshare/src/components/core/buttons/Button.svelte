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
  
  // Tailwind JIT'in görebileceği şekilde STATIK class'lar kullan
  let buttonClasses = $derived([
    'btn',
    // Variant class'ları - STATIK
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
    // Size class'ları - STATIK
    size === 'xs' && 'btn-xs',
    size === 'sm' && 'btn-sm',
    size === 'md' && 'btn-md',
    size === 'lg' && 'btn-lg',
    // Modifier class'ları
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
