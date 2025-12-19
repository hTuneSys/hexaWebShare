<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Accordion from './Accordion.svelte';
	import AccordionItem from './AccordionItem.svelte';
	import AccordionWrapper from './AccordionWrapper.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Accordion',
		component: AccordionWrapper,
		tags: ['autodocs'],
		argTypes: {
			multiple: { control: 'boolean' },
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'ghost']
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg']
			},
			disabled: { control: 'boolean' }
		},
		args: {
			variant: 'default',
			size: 'md',
			multiple: false,
			disabled: false
		}
	});
</script>

<!-- Default Story with Controls -->
<Story
	name="Default"
	args={{
		variant: 'default',
		size: 'md',
		multiple: false,
		disabled: false
	}}
/>

<!-- Basic Accordion -->
<Story name="Basic">
	<Accordion>
		<AccordionItem title="Item 1" index={0}>
			<p>This is the content for item 1. It can contain any HTML or components.</p>
		</AccordionItem>
		<AccordionItem title="Item 2" index={1}>
			<p>
				This is the content for item 2. You can add multiple paragraphs, lists, or other components.
			</p>
		</AccordionItem>
		<AccordionItem title="Item 3" index={2}>
			<p>
				This is the content for item 3. The accordion allows you to organize content in a
				collapsible format.
			</p>
		</AccordionItem>
	</Accordion>
</Story>

<!-- Multiple Open -->
<Story
	name="Multiple Open"
	args={{
		multiple: true,
		variant: 'default',
		size: 'md',
		disabled: false
	}}
/>

<!-- Default Open -->
<Story name="Default Open">
	<Accordion defaultOpen={0}>
		<AccordionItem title="Item 1 (Open by default)" index={0}>
			<p>This item is open by default. You can specify which items should be open initially.</p>
		</AccordionItem>
		<AccordionItem title="Item 2" index={1}>
			<p>This item is closed by default.</p>
		</AccordionItem>
		<AccordionItem title="Item 3" index={2}>
			<p>This item is also closed by default.</p>
		</AccordionItem>
	</Accordion>
</Story>

<!-- Multiple Default Open -->
<Story
	name="Multiple Default Open"
	args={{
		multiple: true,
		defaultOpen: [0, 2],
		variant: 'default',
		size: 'md',
		disabled: false
	}}
/>

<!-- Variants -->
<Story name="Bordered Variant">
	<Accordion variant="bordered">
		<AccordionItem title="Item 1" index={0}>
			<p>The bordered variant adds a border around the accordion.</p>
		</AccordionItem>
		<AccordionItem title="Item 2" index={1}>
			<p>Each item is separated by a divider.</p>
		</AccordionItem>
		<AccordionItem title="Item 3" index={2}>
			<p>This creates a more structured appearance.</p>
		</AccordionItem>
	</Accordion>
</Story>

<Story name="Ghost Variant">
	<Accordion variant="ghost">
		<AccordionItem title="Item 1" index={0}>
			<p>The ghost variant has a lighter background color.</p>
		</AccordionItem>
		<AccordionItem title="Item 2" index={1}>
			<p>It's useful for minimal designs.</p>
		</AccordionItem>
		<AccordionItem title="Item 3" index={2}>
			<p>Perfect for clean, modern interfaces.</p>
		</AccordionItem>
	</Accordion>
</Story>

<!-- Sizes -->
<Story name="Small Size">
	<Accordion size="sm">
		<AccordionItem title="Small Item 1" index={0}>
			<p>This accordion uses the small size variant.</p>
		</AccordionItem>
		<AccordionItem title="Small Item 2" index={1}>
			<p>Text and spacing are reduced for compact layouts.</p>
		</AccordionItem>
	</Accordion>
</Story>

<Story name="Large Size">
	<Accordion size="lg">
		<AccordionItem title="Large Item 1" index={0}>
			<p>This accordion uses the large size variant.</p>
		</AccordionItem>
		<AccordionItem title="Large Item 2" index={1}>
			<p>Text and spacing are increased for better readability.</p>
		</AccordionItem>
	</Accordion>
</Story>

<!-- Disabled -->
<Story name="Disabled">
	<Accordion disabled={true}>
		<AccordionItem title="Item 1" index={0}>
			<p>This accordion is disabled and cannot be interacted with.</p>
		</AccordionItem>
		<AccordionItem title="Item 2" index={1}>
			<p>All items are disabled when the accordion is disabled.</p>
		</AccordionItem>
	</Accordion>
</Story>

<!-- Standalone Item -->
<Story name="Standalone Item">
	<AccordionItem title="Standalone Accordion Item">
		<p>
			AccordionItem can be used standalone without the Accordion wrapper. It manages its own state.
		</p>
	</AccordionItem>
</Story>
