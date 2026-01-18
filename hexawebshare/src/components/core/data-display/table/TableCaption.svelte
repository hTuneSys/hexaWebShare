<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component TableCaption

Internal helper component for rendering table captions.
Uses Text component for consistent typography.

**Purpose:**
- Renders accessible table captions
- Uses Text component for typography consistency
- Supports visually hidden captions for screen readers

**Usage:**
This component is internal to the Table module and should not be used directly.
-->

<script lang="ts">
	import Text from '../../typography/Text.svelte';

	interface Props {
		/**
		 * Caption text
		 */
		text: string;
		/**
		 * Hide caption visually but keep for screen readers
		 * @default false
		 */
		hidden?: boolean;
	}

	const { text, hidden = false }: Props = $props();

	// Caption classes
	let captionClasses = $derived(
		hidden ? 'sr-only' : 'text-base-content/70 caption-top py-2'
	);
</script>

<caption class={captionClasses}>
	<Text text={text} />
</caption>
