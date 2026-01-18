<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component ListItemContent

Internal helper component for rendering list item content.
This is used by List.svelte to avoid code duplication while maintaining DaisyUI menu structure.

**Purpose:**
- Provides reusable rendering logic for list items
- Does NOT render wrapper elements (<a>, <div>, etc.)
- Only renders the inner content (icon, text, badge)
- Maintains DaisyUI menu DOM structure compatibility

**Usage:**
This component is internal to the data-display module and should not be used directly.
Use List component or ListItem component instead.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Badge from '../media/Badge.svelte';
	import Text from '../typography/Text.svelte';

	interface Props {
		/**
		 * Item label text
		 */
		label: string;
		/**
		 * Optional description text
		 */
		description?: string;
		/**
		 * Optional icon (emoji or text)
		 */
		icon?: string;
		/**
		 * Optional badge label
		 */
		badge?: string;
		/**
		 * Badge variant
		 */
		badgeVariant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Custom leading content snippet
		 */
		leading?: Snippet;
		/**
		 * Custom trailing content snippet
		 */
		trailing?: Snippet;
	}

	const { label, description, icon, badge, badgeVariant, leading, trailing }: Props = $props();
</script>

<!-- 
	NOTE: Raw HTML span elements are used for structural layout.
	REASON: Pure flexbox containers for positioning (no semantic meaning).
	These spans enable proper text truncation and flex layout behavior.
-->

{#if leading}
	<span class="flex-shrink-0" aria-hidden="true">
		{@render leading()}
	</span>
{:else if icon}
	<span class="flex items-center gap-2">
		<span class="text-lg" aria-hidden="true">{icon}</span>
		<span class="flex flex-col">
			<Text text={label} />
			{#if description}
				<Text text={description} size="xs" class="opacity-60" />
			{/if}
		</span>
	</span>
{:else}
	<span class="flex items-center gap-2">
		<span class="flex flex-col">
			<Text text={label} />
			{#if description}
				<Text text={description} size="xs" class="opacity-60" />
			{/if}
		</span>
	</span>
{/if}

{#if trailing}
	<span class="flex-shrink-0" aria-hidden="true">
		{@render trailing()}
	</span>
{:else if badge}
	<Badge label={badge} variant={badgeVariant || 'neutral'} size="sm" />
{/if}
