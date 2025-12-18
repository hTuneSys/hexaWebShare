<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tabs from './Tabs.svelte';
	import type { TabItem } from './Tabs.svelte';

	// Sample tab data - defined in module script for use in args
	const basicTabs: TabItem[] = [
		{ value: 'tab1', label: 'Tab 1' },
		{ value: 'tab2', label: 'Tab 2' },
		{ value: 'tab3', label: 'Tab 3' }
	];

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Tabs',
		component: Tabs,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['box', 'border', 'lift'],
				description: 'Visual style variant of the tabs'
			},
			color: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'],
				description: 'Color variant (only applies to box variant)'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Size of the tabs'
			},
			placement: {
				control: { type: 'select' },
				options: ['top', 'bottom'],
				description: 'Placement of tabs relative to content'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable all tabs'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the tablist'
			}
		},
		args: {
			tabs: basicTabs,
			variant: 'border',
			size: 'md',
			placement: 'top',
			disabled: false
		}
	});
</script>

<script lang="ts">
	let controlledValue = $state<string | number>('tab1');
</script>

<!-- Default Story -->
<Story name="Default">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Active Tab Content</h3>
				<p class="text-sm">Click on different tabs to see their content change.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<!-- Variants -->
<Story name="Box Variant">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Box Variant</h3>
				<p class="text-sm">This variant uses rounded box style tabs with clear visual separation.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<!-- Box Variant with Colors -->
<Story name="Box Variant - Primary">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="primary"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Box Variant - Primary Color</h3>
				<p class="text-sm">Box tabs with primary color background.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Box Variant - Secondary">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="secondary"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Box Variant - Secondary Color</h3>
				<p class="text-sm">Box tabs with secondary color background.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Box Variant - Accent">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="accent"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Box Variant - Accent Color</h3>
				<p class="text-sm">Box tabs with accent color background.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Box Variant - Info">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="info"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Box Variant - Info Color</h3>
				<p class="text-sm">Box tabs with info color background.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Box Variant - Success">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="success"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Box Variant - Success Color</h3>
				<p class="text-sm">Box tabs with success color background.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Box Variant - Warning">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="warning"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Box Variant - Warning Color</h3>
				<p class="text-sm">Box tabs with warning color background.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Box Variant - Error">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="error"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Box Variant - Error Color</h3>
				<p class="text-sm">Box tabs with error color background.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Box Variant - Neutral">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="neutral"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Box Variant - Neutral Color</h3>
				<p class="text-sm">Box tabs with neutral color background.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Border Variant">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="border"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Border Variant</h3>
				<p class="text-sm">This variant shows a clean border under the active tab.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Lift Variant">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="lift"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Lift Variant</h3>
				<p class="text-sm">This variant gives tabs a lifted/elevated appearance with depth.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<!-- Sizes -->
<Story name="Extra Small">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Tab 1' },
			{ value: 'tab2', label: 'Tab 2' },
			{ value: 'tab3', label: 'Tab 3' }
		]}
		size="xs"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<p class="text-xs">Extra small size tabs - compact and minimal</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Small">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Tab 1' },
			{ value: 'tab2', label: 'Tab 2' },
			{ value: 'tab3', label: 'Tab 3' }
		]}
		size="sm"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<p class="text-sm">Small size tabs - slightly larger than extra small</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Medium">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Tab 1' },
			{ value: 'tab2', label: 'Tab 2' },
			{ value: 'tab3', label: 'Tab 3' }
		]}
		size="md"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<p class="text-base">Medium size tabs - default size, balanced and readable</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Large">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Tab 1' },
			{ value: 'tab2', label: 'Tab 2' },
			{ value: 'tab3', label: 'Tab 3' }
		]}
		size="lg"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<p class="text-lg">Large size tabs - more prominent and easier to click</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Extra Large">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Tab 1' },
			{ value: 'tab2', label: 'Tab 2' },
			{ value: 'tab3', label: 'Tab 3' }
		]}
		size="xl"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<p class="text-xl">Extra large size tabs - maximum size for emphasis</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<!-- With Content Using Children -->
<Story name="With Content">
	<Tabs tabs={basicTabs}>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<p class="font-semibold mb-2">Active Tab Content</p>
				<p class="text-sm">This content is displayed for the currently active tab.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<!-- Disabled States -->
<Story name="Disabled Tab">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Enabled Tab' },
			{ value: 'tab2', label: 'Disabled Tab', disabled: true },
			{ value: 'tab3', label: 'Another Enabled Tab' }
		]}
	/>
</Story>

<Story name="All Disabled">
	<Tabs tabs={basicTabs} disabled={true} />
</Story>

<!-- Placement -->
<Story name="Bottom Placement">
	<Tabs tabs={basicTabs} placement="bottom" />
</Story>

<!-- Controlled -->
<Story name="Controlled">
	<div class="space-y-4">
		<Tabs tabs={basicTabs} value={controlledValue} onChange={(v) => (controlledValue = v)} />
		<p class="text-sm">Active tab: {controlledValue}</p>
	</div>
</Story>

<!-- Multiple Tabs -->
<Story name="Many Tabs">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Overview' },
			{ value: 'tab2', label: 'Details' },
			{ value: 'tab3', label: 'Settings' },
			{ value: 'tab4', label: 'History' },
			{ value: 'tab5', label: 'Analytics' }
		]}
	/>
</Story>

<!-- Accessibility -->
<Story name="With Aria Label">
	<Tabs tabs={basicTabs} ariaLabel="Navigation tabs" />
</Story>

<!-- Radio Input Based Tabs -->
<Story name="Radio Tabs Box">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Tab 1' },
			{ value: 'tab2', label: 'Tab 2' },
			{ value: 'tab3', label: 'Tab 3' }
		]}
		variant="box"
		useRadio={true}
		name="radio-tabs-box"
	>
		{#snippet children()}
			<div>
				<h3 class="font-bold mb-2">Active Tab Content</h3>
				<p class="text-sm">This is the content for the selected tab using radio inputs.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Radio Tabs Lift with Content">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="lift"
		useRadio={true}
		name="radio-tabs-lift"
	>
		{#snippet children()}
			<div>
				<h3 class="font-bold mb-2">Active Tab Content</h3>
				<p class="text-sm">This content changes based on the selected radio tab.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Radio Tabs Lift with Icons and Content">
	<div class="space-y-4">
		<p class="text-sm text-base-content/60">
			Note: Icons in radio tabs require snippet definitions. This example shows radio tabs with content.
		</p>
		<Tabs
			tabs={[
				{ value: 'tab1', label: '🏠 Home' },
				{ value: 'tab2', label: '⚙️ Settings' },
				{ value: 'tab3', label: '👤 Profile' }
			]}
			variant="lift"
			useRadio={true}
			name="radio-tabs-lift-icons"
		>
			{#snippet children()}
				<div>
					<h3 class="font-bold mb-2">Active Tab Content</h3>
					<p class="text-sm">Radio tabs with emoji icons and content panel.</p>
				</div>
			{/snippet}
		</Tabs>
	</div>
</Story>

<Story name="Radio Tabs Lift with Content on Bottom">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="lift"
		placement="bottom"
		useRadio={true}
		name="radio-tabs-lift-bottom"
	>
		{#snippet children()}
			<div>
				<h3 class="font-bold mb-2">Content Above Tabs</h3>
				<p class="text-sm">This content appears above the tabs when placement is set to bottom.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<!-- Variant Combinations -->
<Story name="Border Variant - Small">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="border"
		size="sm"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Border Variant - Small</h3>
				<p class="text-sm">Border variant with small size.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Border Variant - Large">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="border"
		size="lg"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Border Variant - Large</h3>
				<p class="text-sm">Border variant with large size.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Lift Variant - Small">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="lift"
		size="sm"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Lift Variant - Small</h3>
				<p class="text-sm">Lift variant with small size.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Lift Variant - Large">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="lift"
		size="lg"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Lift Variant - Large</h3>
				<p class="text-sm">Lift variant with large size.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Box Variant Primary - Small">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="primary"
		size="sm"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Box Variant Primary - Small</h3>
				<p class="text-sm">Box variant with primary color and small size.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Box Variant Primary - Large">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="primary"
		size="lg"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Box Variant Primary - Large</h3>
				<p class="text-sm">Box variant with primary color and large size.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<!-- Radio Tabs with Border Variant -->
<Story name="Radio Tabs Border">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="border"
		useRadio={true}
		name="radio-tabs-border"
	>
		{#snippet children()}
			<div>
				<h3 class="font-bold mb-2">Radio Tabs Border</h3>
				<p class="text-sm">Radio input tabs with border variant.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<!-- Radio Tabs with Sizes -->
<Story name="Radio Tabs Box - Small">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Tab 1' },
			{ value: 'tab2', label: 'Tab 2' },
			{ value: 'tab3', label: 'Tab 3' }
		]}
		variant="box"
		size="sm"
		useRadio={true}
		name="radio-tabs-box-sm"
	>
		{#snippet children()}
			<div>
				<h3 class="font-bold mb-2">Radio Tabs Box - Small</h3>
				<p class="text-sm">Radio tabs with box variant and small size.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Radio Tabs Box - Large">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Tab 1' },
			{ value: 'tab2', label: 'Tab 2' },
			{ value: 'tab3', label: 'Tab 3' }
		]}
		variant="box"
		size="lg"
		useRadio={true}
		name="radio-tabs-box-lg"
	>
		{#snippet children()}
			<div>
				<h3 class="font-bold mb-2">Radio Tabs Box - Large</h3>
				<p class="text-sm">Radio tabs with box variant and large size.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<!-- Radio Tabs with Colors -->
<Story name="Radio Tabs Box Primary">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="primary"
		useRadio={true}
		name="radio-tabs-box-primary"
	>
		{#snippet children()}
			<div>
				<h3 class="font-bold mb-2">Radio Tabs Box Primary</h3>
				<p class="text-sm">Radio tabs with box variant and primary color.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Radio Tabs Box Accent">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="accent"
		useRadio={true}
		name="radio-tabs-box-accent"
	>
		{#snippet children()}
			<div>
				<h3 class="font-bold mb-2">Radio Tabs Box Accent</h3>
				<p class="text-sm">Radio tabs with box variant and accent color.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Radio Tabs Box Success">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		color="success"
		useRadio={true}
		name="radio-tabs-box-success"
	>
		{#snippet children()}
			<div>
				<h3 class="font-bold mb-2">Radio Tabs Box Success</h3>
				<p class="text-sm">Radio tabs with box variant and success color.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<!-- Bottom Placement Combinations -->
<Story name="Box Variant Bottom Placement">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		placement="bottom"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Box Variant Bottom</h3>
				<p class="text-sm">Box variant with tabs at the bottom.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Border Variant Bottom Placement">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="border"
		placement="bottom"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Border Variant Bottom</h3>
				<p class="text-sm">Border variant with tabs at the bottom.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<Story name="Lift Variant Bottom Placement">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="lift"
		placement="bottom"
	>
		{#snippet children()}
			<div class="p-4 bg-base-200 rounded-box">
				<h3 class="font-bold mb-2">Lift Variant Bottom</h3>
				<p class="text-sm">Lift variant with tabs at the bottom.</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<!-- Disabled States with Variants -->
<Story name="Box Variant Disabled">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="box"
		disabled={true}
	/>
</Story>

<Story name="Border Variant Disabled">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="border"
		disabled={true}
	/>
</Story>

<Story name="Lift Variant Disabled">
	<Tabs
		tabs={[
			{ value: 'tab1', label: 'Home' },
			{ value: 'tab2', label: 'About' },
			{ value: 'tab3', label: 'Contact' }
		]}
		variant="lift"
		disabled={true}
	/>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants Showcase">
	<div class="space-y-8">
		<div>
			<h3 class="mb-4 text-xl font-bold">Box Variants</h3>
			<div class="space-y-4">
				<Tabs
					tabs={[
						{ value: 'tab1', label: 'Default' },
						{ value: 'tab2', label: 'Box' }
					]}
					variant="box"
				/>
				<Tabs
					tabs={[
						{ value: 'tab1', label: 'Primary' },
						{ value: 'tab2', label: 'Box' }
					]}
					variant="box"
					color="primary"
				/>
				<Tabs
					tabs={[
						{ value: 'tab1', label: 'Accent' },
						{ value: 'tab2', label: 'Box' }
					]}
					variant="box"
					color="accent"
				/>
			</div>
		</div>
		<div>
			<h3 class="mb-4 text-xl font-bold">Border Variants</h3>
			<Tabs
				tabs={[
					{ value: 'tab1', label: 'Border' },
					{ value: 'tab2', label: 'Variant' }
				]}
				variant="border"
			/>
		</div>
		<div>
			<h3 class="mb-4 text-xl font-bold">Lift Variants</h3>
			<Tabs
				tabs={[
					{ value: 'tab1', label: 'Lift' },
					{ value: 'tab2', label: 'Variant' }
				]}
				variant="lift"
			/>
		</div>
	</div>
</Story>

<!-- Playground -->
<Story name="Playground">
	<Tabs tabs={basicTabs} variant="border" size="md" placement="top" />
</Story>
