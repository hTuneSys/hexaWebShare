<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Accordion from './Accordion.svelte';
	import AccordionItem from './AccordionItem.svelte';

	interface Props {
		variant?: 'default' | 'bordered' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		multiple?: boolean;
		disabled?: boolean;
		defaultOpen?: number | number[];
	}

	const {
		variant = 'default',
		size = 'md',
		multiple = false,
		disabled = false,
		defaultOpen
	}: Props = $props();
</script>

<Accordion {variant} {size} {multiple} {disabled} {defaultOpen}>
	<AccordionItem title="Frequently Asked Questions" index={0}>
		<div class="space-y-4">
			<h4 class="font-semibold">Question 1</h4>
			<p>
				This is a detailed answer that can span multiple paragraphs and include various content
				types.
			</p>
			<ul class="list-inside list-disc space-y-2">
				<li>Feature 1</li>
				<li>Feature 2</li>
				<li>Feature 3</li>
			</ul>
		</div>
	</AccordionItem>
	<AccordionItem title="Product Information" index={1}>
		<div class="space-y-4">
			<p>Product details and specifications can be organized in accordion items.</p>
			<div class="bg-base-200 rounded p-4">
				<p class="text-sm">Additional information can be displayed in styled containers.</p>
			</div>
		</div>
	</AccordionItem>
	<AccordionItem title="Additional Details" index={2}>
		<div class="space-y-4">
			<p>This is the third item. It can be used to demonstrate multiple open functionality.</p>
		</div>
	</AccordionItem>
</Accordion>
