<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CardSection from './CardSection.svelte';
	const { Story } = defineMeta({
		title: 'Core/Layout/CardSection',
		component: CardSection,
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: { type: 'text' },
				description: 'Title text for the card section'
			},
			subtitle: {
				control: { type: 'text' },
				description: 'Subtitle text for the card section'
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'compact'],
				description: 'Visual variant of the card section'
			},
			padding: {
				control: { type: 'select' },
				options: ['none', 'sm', 'md', 'lg'],
				description: 'Padding size for the section'
			},
			divider: {
				control: { type: 'boolean' },
				description: 'Whether to show a divider'
			}
		}
	});
</script>

<!-- Default Story -->
<Story name="Default">
	<div class="card w-96 bg-base-100 shadow-xl">
		<CardSection>
			<p>This is a default card section with some content.</p>
		</CardSection>
	</div>
</Story>

<!-- With Title -->
<Story name="With Title">
	<div class="card w-96 bg-base-100 shadow-xl">
		<CardSection title="Section Title">
			<p>This card section has a title.</p>
		</CardSection>
	</div>
</Story>

<!-- With Title and Subtitle -->
<Story name="With Title and Subtitle">
	<div class="card w-96 bg-base-100 shadow-xl">
		<CardSection title="Section Title" subtitle="This is a subtitle">
			<p>This card section has both a title and subtitle.</p>
		</CardSection>
	</div>
</Story>

<!-- Variant Stories -->
<Story name="Default Variant">
	<div class="card w-96 bg-base-100 shadow-xl">
		<CardSection variant="default" title="Default Variant">
			<p>This is the default variant with standard styling.</p>
		</CardSection>
	</div>
</Story>

<Story name="Bordered Variant">
	<div class="card w-96 bg-base-100 shadow-xl">
		<CardSection variant="bordered" title="Bordered Variant">
			<p>This variant has a border on top.</p>
		</CardSection>
	</div>
</Story>

<Story name="Compact Variant">
	<div class="card w-96 bg-base-100 shadow-xl">
		<CardSection variant="compact" title="Compact Variant">
			<p>This variant has reduced padding for compact layouts.</p>
		</CardSection>
	</div>
</Story>

<!-- Padding Stories -->
<Story name="No Padding">
	<div class="card w-96 bg-base-100 shadow-xl">
		<CardSection padding="none" title="No Padding">
			<p>This section has no padding.</p>
		</CardSection>
	</div>
</Story>

<Story name="Small Padding">
	<div class="card w-96 bg-base-100 shadow-xl">
		<CardSection padding="sm" title="Small Padding">
			<p>This section has small padding.</p>
		</CardSection>
	</div>
</Story>

<Story name="Medium Padding">
	<div class="card w-96 bg-base-100 shadow-xl">
		<CardSection padding="md" title="Medium Padding">
			<p>This section has medium padding (default).</p>
		</CardSection>
	</div>
</Story>

<Story name="Large Padding">
	<div class="card w-96 bg-base-100 shadow-xl">
		<CardSection padding="lg" title="Large Padding">
			<p>This section has large padding.</p>
		</CardSection>
	</div>
</Story>

<!-- Divider Stories -->
<Story name="With Divider">
	<div class="card w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">First Section</h2>
			<p>Content of the first section.</p>
		</div>
		<CardSection divider title="Second Section">
			<p>This section has a divider above it.</p>
		</CardSection>
	</div>
</Story>

<Story name="Divider Only">
	<div class="card w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<p>Content above the divider.</p>
		</div>
		<CardSection divider>
			<p>Content below the divider.</p>
		</CardSection>
	</div>
</Story>

<!-- Complex Example -->
<Story name="Complex Example">
	<div class="card w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Card Header</h2>
			<p>This is the main content area.</p>
		</div>
		<CardSection variant="bordered" title="Additional Information" subtitle="More details here">
			<ul class="list-disc list-inside space-y-2">
				<li>First item</li>
				<li>Second item</li>
				<li>Third item</li>
			</ul>
		</CardSection>
		<CardSection variant="bordered" padding="sm" divider>
			<div class="flex justify-between items-center">
				<span>Footer content</span>
				<button class="btn btn-sm btn-primary">Action</button>
			</div>
		</CardSection>
	</div>
</Story>

<!-- Multiple Sections -->
<Story name="Multiple Sections">
	<div class="card w-96 bg-base-100 shadow-xl">
		<CardSection title="First Section">
			<p>Content of the first section.</p>
		</CardSection>
		<CardSection variant="bordered" title="Second Section">
			<p>Content of the second section with border.</p>
		</CardSection>
		<CardSection variant="bordered" title="Third Section" padding="sm">
			<p>Content of the third section with small padding.</p>
		</CardSection>
	</div>
</Story>

