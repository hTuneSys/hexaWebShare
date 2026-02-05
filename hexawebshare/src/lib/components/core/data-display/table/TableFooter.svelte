<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component TableFooter

Internal helper component for rendering table footer.
Provides a simple wrapper for custom footer snippets.

**Purpose:**
- Renders table footer section
- Allows custom content via snippets
- Maintains DaisyUI table structure

**Usage:**
This component is internal to the Table module and should not be used directly.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/**
		 * Footer content snippet
		 */
		children?: Snippet;
	}

	const { children }: Props = $props();
</script>

{#if children}
	<tfoot>
		{@render children()}
	</tfoot>
{/if}
