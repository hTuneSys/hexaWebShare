<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->


<script lang="ts">
  export let theme: string = 'light';
  
  import { onMount } from 'svelte';
  
  $: if (typeof window !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }
  
  onMount(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  });
</script>
<div data-theme={theme} class="theme-wrapper">
  <slot />
</div>
<style>
  .theme-wrapper {
    min-height: 100vh;
    width: 100%;
  }
</style>
