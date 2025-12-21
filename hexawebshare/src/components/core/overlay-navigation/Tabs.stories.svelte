<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tabs from './Tabs.svelte';
	import { fn } from 'storybook/test';

	// Sample tab data
	const basicTabs = [
		{ value: 'tab1', label: 'Tab 1' },
		{ value: 'tab2', label: 'Tab 2' },
		{ value: 'tab3', label: 'Tab 3' }
	];

	const manyTabs = [
		{ value: 'tab1', label: 'Overview' },
		{ value: 'tab2', label: 'Details' },
		{ value: 'tab3', label: 'Settings' },
		{ value: 'tab4', label: 'History' },
		{ value: 'tab5', label: 'Analytics' }
	];

	const tabsWithDisabled = [
		{ value: 'tab1', label: 'Enabled Tab' },
		{ value: 'tab2', label: 'Disabled Tab', disabled: true },
		{ value: 'tab3', label: 'Another Enabled' }
	];

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Tabs',
		component: Tabs,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['boxed', 'bordered', 'lifted'],
				description: 'Visual style variant of the tabs (DaisyUI v4 naming)'
			},
			color: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error'],
				description: 'Color variant (applies to tabs)'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the tabs'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable all tabs'
			},
			useRadio: {
				control: 'boolean',
				description: 'Use radio inputs instead of buttons'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the tablist'
			}
		},
		args: {
			tabs: basicTabs,
			variant: 'bordered',
			size: 'md',
			disabled: false,
			onChange: fn()
		}
	});
</script>

<script lang="ts">
	let controlledValue = $state<string | number>('tab1');
</script>

<!-- Default Stories -->
<Story name="Default" args={{ tabs: basicTabs }} />

<Story name="Bordered" args={{ tabs: basicTabs, variant: 'bordered' }} />

<Story name="Lifted" args={{ tabs: basicTabs, variant: 'lifted' }} />

<Story name="Boxed" args={{ tabs: basicTabs, variant: 'boxed' }} />

<!-- Color Variant Stories -->
<Story name="Primary" args={{ tabs: basicTabs, color: 'primary' }} />

<Story name="Secondary" args={{ tabs: basicTabs, color: 'secondary' }} />

<Story name="Accent" args={{ tabs: basicTabs, color: 'accent' }} />

<Story name="Success" args={{ tabs: basicTabs, color: 'success' }} />

<Story name="Warning" args={{ tabs: basicTabs, color: 'warning' }} />

<Story name="Info" args={{ tabs: basicTabs, color: 'info' }} />

<Story name="Error" args={{ tabs: basicTabs, color: 'error' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ tabs: basicTabs, size: 'xs' }} />

<Story name="Small" args={{ tabs: basicTabs, size: 'sm' }} />

<Story name="Medium" args={{ tabs: basicTabs, size: 'md' }} />

<Story name="Large" args={{ tabs: basicTabs, size: 'lg' }} />

<!-- State Stories -->
<Story name="Disabled Tab" args={{ tabs: tabsWithDisabled }} />

<Story name="All Disabled" args={{ tabs: basicTabs, disabled: true }} />

<Story name="Many Tabs" args={{ tabs: manyTabs }} />

<!-- Radio Input Based Tabs -->
<Story
	name="Radio Bordered"
	args={{ tabs: basicTabs, useRadio: true, variant: 'bordered', name: 'radio-tabs-bordered' }}
/>

<Story
	name="Radio Lifted"
	args={{ tabs: basicTabs, useRadio: true, variant: 'lifted', name: 'radio-tabs-lifted' }}
/>

<Story
	name="Radio Boxed"
	args={{ tabs: basicTabs, useRadio: true, variant: 'boxed', name: 'radio-tabs-boxed' }}
/>

<!-- Controlled -->
<Story name="Controlled">
	<div class="space-y-4">
		<Tabs tabs={basicTabs} value={controlledValue} onChange={(v) => (controlledValue = v)} />
		<p class="text-sm text-base-content/70">Active tab: <strong>{controlledValue}</strong></p>
		<div class="flex gap-2">
			<button class="btn btn-primary btn-sm" onclick={() => (controlledValue = 'tab1')}
				>Go to Tab 1</button
			>
			<button class="btn btn-secondary btn-sm" onclick={() => (controlledValue = 'tab2')}
				>Go to Tab 2</button
			>
			<button class="btn btn-accent btn-sm" onclick={() => (controlledValue = 'tab3')}
				>Go to Tab 3</button
			>
		</div>
	</div>
</Story>

<!-- With Content -->
<Story name="With Content">
	<Tabs tabs={basicTabs}>
		{#snippet children()}
			<div class="rounded-box bg-base-200 p-6">
				<h3 class="mb-2 text-lg font-bold">Tab Content</h3>
				<p class="text-base-content/70">
					This is shared content that appears for all tabs. Use the <code class="kbd kbd-sm"
						>content</code
					> property on individual tabs for unique content.
				</p>
			</div>
		{/snippet}
	</Tabs>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="space-y-8">
		<div>
			<h3 class="mb-4 text-xl font-bold">Style Variants</h3>
			<div class="space-y-6">
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Bordered (default)</p>
					<Tabs tabs={basicTabs} variant="bordered" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Lifted</p>
					<Tabs tabs={basicTabs} variant="lifted" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Boxed</p>
					<Tabs tabs={basicTabs} variant="boxed" />
				</div>
			</div>
		</div>

		<div class="divider"></div>

		<div>
			<h3 class="mb-4 text-xl font-bold">Color Variants</h3>
			<div class="space-y-4">
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Primary</p>
					<Tabs tabs={basicTabs} color="primary" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Secondary</p>
					<Tabs tabs={basicTabs} color="secondary" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Accent</p>
					<Tabs tabs={basicTabs} color="accent" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Success</p>
					<Tabs tabs={basicTabs} color="success" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Warning</p>
					<Tabs tabs={basicTabs} color="warning" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Info</p>
					<Tabs tabs={basicTabs} color="info" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Error</p>
					<Tabs tabs={basicTabs} color="error" />
				</div>
			</div>
		</div>

		<div class="divider"></div>

		<div>
			<h3 class="mb-4 text-xl font-bold">Sizes</h3>
			<div class="space-y-4">
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Extra Small (xs)</p>
					<Tabs tabs={basicTabs} size="xs" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Small (sm)</p>
					<Tabs tabs={basicTabs} size="sm" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Medium (md)</p>
					<Tabs tabs={basicTabs} size="md" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Large (lg)</p>
					<Tabs tabs={basicTabs} size="lg" />
				</div>
			</div>
		</div>

		<div class="divider"></div>

		<div>
			<h3 class="mb-4 text-xl font-bold">States</h3>
			<div class="space-y-4">
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">Normal</p>
					<Tabs tabs={basicTabs} />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">With Disabled Tab</p>
					<Tabs tabs={tabsWithDisabled} />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-base-content/60">All Disabled</p>
					<Tabs tabs={basicTabs} disabled={true} />
				</div>
			</div>
		</div>
	</div>
</Story>

<!-- Playground -->
<Story name="Playground" args={{ tabs: basicTabs, variant: 'bordered', size: 'md' }} />
