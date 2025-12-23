<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ButtonGroup from './ButtonGroup.svelte';
	import Button from './Button.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Buttons/ButtonGroup',
		component: ButtonGroup,
		tags: ['autodocs'],
		argTypes: {
			orientation: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical']
			},
			gap: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			responsive: { control: 'boolean' },
			ariaLabel: { control: 'text' }
		},
		args: {
			onclick: fn()
		}
	});
</script>

<!-- Default Horizontal Group -->
<Story
	name="Default"
	args={{
		orientation: 'horizontal',
		gap: 'sm',
		ariaLabel: 'Action buttons group',
		responsive: false
	}}
>
	{#snippet children()}
		<ButtonGroup orientation="horizontal" gap="sm" ariaLabel="Action buttons group" responsive={false}>
			<Button label="Save" variant="primary" />
			<Button label="Cancel" variant="secondary" />
			<Button label="Delete" variant="error" />
		</ButtonGroup>
	{/snippet}
</Story>

<!-- Vertical Group -->
<Story name="Vertical">
	{#snippet children()}
		<ButtonGroup orientation="vertical" ariaLabel="Vertical button group">
			<Button label="First" variant="primary" />
			<Button label="Second" variant="primary" />
			<Button label="Third" variant="primary" />
		</ButtonGroup>
	{/snippet}
</Story>

<!-- Gap Sizes -->
<Story name="Gap Sizes">
	{#snippet children()}
		<div class="space-y-6">
			<div>
				<p class="mb-2 text-sm font-semibold">Extra Small Gap (xs)</p>
				<ButtonGroup gap="xs" ariaLabel="Extra small gap button group">
					<Button label="Button 1" variant="primary" />
					<Button label="Button 2" variant="primary" />
					<Button label="Button 3" variant="primary" />
				</ButtonGroup>
			</div>
			<div>
				<p class="mb-2 text-sm font-semibold">Small Gap (sm) - Default</p>
				<ButtonGroup gap="sm" ariaLabel="Small gap button group">
					<Button label="Button 1" variant="primary" />
					<Button label="Button 2" variant="primary" />
					<Button label="Button 3" variant="primary" />
				</ButtonGroup>
			</div>
			<div>
				<p class="mb-2 text-sm font-semibold">Medium Gap (md)</p>
				<ButtonGroup gap="md" ariaLabel="Medium gap button group">
					<Button label="Button 1" variant="primary" />
					<Button label="Button 2" variant="primary" />
					<Button label="Button 3" variant="primary" />
				</ButtonGroup>
			</div>
			<div>
				<p class="mb-2 text-sm font-semibold">Large Gap (lg)</p>
				<ButtonGroup gap="lg" ariaLabel="Large gap button group">
					<Button label="Button 1" variant="primary" />
					<Button label="Button 2" variant="primary" />
					<Button label="Button 3" variant="primary" />
				</ButtonGroup>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Button Sizes -->
<Story name="Button Sizes">
	{#snippet children()}
		<div class="space-y-6">
			<div>
				<p class="mb-2 text-sm font-semibold">Extra Small</p>
				<ButtonGroup ariaLabel="Extra small buttons">
					<Button label="XS" variant="primary" size="xs" />
					<Button label="XS" variant="primary" size="xs" />
					<Button label="XS" variant="primary" size="xs" />
				</ButtonGroup>
			</div>
			<div>
				<p class="mb-2 text-sm font-semibold">Small</p>
				<ButtonGroup ariaLabel="Small buttons">
					<Button label="Small" variant="primary" size="sm" />
					<Button label="Small" variant="primary" size="sm" />
					<Button label="Small" variant="primary" size="sm" />
				</ButtonGroup>
			</div>
			<div>
				<p class="mb-2 text-sm font-semibold">Medium (Default)</p>
				<ButtonGroup ariaLabel="Medium buttons">
					<Button label="Medium" variant="primary" size="md" />
					<Button label="Medium" variant="primary" size="md" />
					<Button label="Medium" variant="primary" size="md" />
				</ButtonGroup>
			</div>
			<div>
				<p class="mb-2 text-sm font-semibold">Large</p>
				<ButtonGroup ariaLabel="Large buttons">
					<Button label="Large" variant="primary" size="lg" />
					<Button label="Large" variant="primary" size="lg" />
					<Button label="Large" variant="primary" size="lg" />
				</ButtonGroup>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Button Variants -->
<Story name="Mixed Variants">
	{#snippet children()}
		<ButtonGroup ariaLabel="Mixed button variants">
			<Button label="Primary" variant="primary" />
			<Button label="Secondary" variant="secondary" />
			<Button label="Accent" variant="accent" />
			<Button label="Info" variant="info" />
			<Button label="Success" variant="success" />
			<Button label="Warning" variant="warning" />
			<Button label="Error" variant="error" />
		</ButtonGroup>
	{/snippet}
</Story>

<!-- Disabled States -->
<Story name="Disabled States">
	{#snippet children()}
		<div class="space-y-6">
			<div>
				<p class="mb-2 text-sm font-semibold">Some Buttons Disabled</p>
				<ButtonGroup ariaLabel="Button group with disabled buttons">
					<Button label="Enabled" variant="primary" />
					<Button label="Disabled" variant="primary" disabled />
					<Button label="Enabled" variant="primary" />
				</ButtonGroup>
			</div>
			<div>
				<p class="mb-2 text-sm font-semibold">All Disabled</p>
				<ButtonGroup ariaLabel="All buttons disabled">
					<Button label="Disabled 1" variant="primary" disabled />
					<Button label="Disabled 2" variant="primary" disabled />
					<Button label="Disabled 3" variant="primary" disabled />
				</ButtonGroup>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Loading States -->
<Story name="Loading States">
	{#snippet children()}
		<div class="space-y-6">
			<div>
				<p class="mb-2 text-sm font-semibold">Some Buttons Loading</p>
				<ButtonGroup ariaLabel="Button group with loading buttons">
					<Button label="Save" variant="primary" loading />
					<Button label="Cancel" variant="secondary" />
					<Button label="Delete" variant="error" />
				</ButtonGroup>
			</div>
			<div>
				<p class="mb-2 text-sm font-semibold">All Loading</p>
				<ButtonGroup ariaLabel="All buttons loading">
					<Button label="Loading 1" variant="primary" loading />
					<Button label="Loading 2" variant="primary" loading />
					<Button label="Loading 3" variant="primary" loading />
				</ButtonGroup>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Outline Style -->
<Story name="Outline Style">
	{#snippet children()}
		<ButtonGroup ariaLabel="Outline button group">
			<Button label="Primary" variant="primary" outline />
			<Button label="Secondary" variant="secondary" outline />
			<Button label="Accent" variant="accent" outline />
			<Button label="Error" variant="error" outline />
		</ButtonGroup>
	{/snippet}
</Story>

<!-- Responsive Design -->
<Story name="Responsive">
	{#snippet children()}
		<div class="space-y-6">
			<div>
				<p class="mb-2 text-sm font-semibold">Responsive Horizontal (stacks on mobile)</p>
				<p class="text-base-content/60 mb-4 text-xs">
					Resize the viewport to see buttons stack vertically on small screens
				</p>
				<ButtonGroup
					orientation="horizontal"
					responsive
					ariaLabel="Responsive horizontal button group"
				>
					<Button label="Button 1" variant="primary" />
					<Button label="Button 2" variant="primary" />
					<Button label="Button 3" variant="primary" />
				</ButtonGroup>
			</div>
			<div>
				<p class="mb-2 text-sm font-semibold">Responsive Vertical (horizontal on mobile)</p>
				<p class="text-base-content/60 mb-4 text-xs">
					Resize the viewport to see buttons arrange horizontally on small screens
				</p>
				<ButtonGroup orientation="vertical" responsive ariaLabel="Responsive vertical button group">
					<Button label="Button 1" variant="primary" />
					<Button label="Button 2" variant="primary" />
					<Button label="Button 3" variant="primary" />
				</ButtonGroup>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Interactive Example -->
<Story name="Interactive">
	{#snippet children()}
		<div class="space-y-4">
			<ButtonGroup ariaLabel="Interactive button group">
				<Button label="Like" variant="primary" onclick={() => alert('Liked!')} />
				<Button label="Share" variant="secondary" onclick={() => alert('Shared!')} />
				<Button label="Comment" variant="accent" onclick={() => alert('Comment clicked!')} />
			</ButtonGroup>
			<p class="text-base-content/60 text-xs">
				Click the buttons above to see interactive behavior. All buttons are keyboard accessible.
			</p>
		</div>
	{/snippet}
</Story>

<!-- Accessibility Features -->
<Story name="Accessibility">
	{#snippet children()}
		<div class="bg-base-100 space-y-6 p-8">
			<div class="alert alert-success">
				<span>✅ All button groups include proper accessibility features</span>
			</div>

			<div class="space-y-4">
				<div class="card bg-base-200 p-4">
					<h4 class="mb-2 font-semibold">With ARIA Label</h4>
					<ButtonGroup
						ariaLabel="Action buttons group for form submission"
						ariaLabelledby={undefined}
					>
						<Button label="Save" variant="primary" />
						<Button label="Cancel" variant="secondary" />
					</ButtonGroup>
					<p class="text-base-content/60 mt-2 text-sm">
						Screen readers will announce "Action buttons group for form submission"
					</p>
				</div>

				<div class="card bg-base-200 p-4">
					<h4 class="mb-2 font-semibold">Keyboard Navigation</h4>
					<ButtonGroup ariaLabel="Keyboard accessible button group">
						<Button label="Tab to focus" variant="primary" />
						<Button label="Enter to activate" variant="primary" />
						<Button label="Arrow keys to navigate" variant="primary" />
					</ButtonGroup>
					<p class="text-base-content/60 mt-2 text-sm">
						All buttons are fully keyboard accessible with proper focus indicators
					</p>
				</div>

				<div class="card bg-base-200 p-4">
					<h4 class="mb-2 font-semibold">Role Attribute</h4>
					<ButtonGroup ariaLabel="Button group with role attribute">
						<Button label="Button 1" variant="primary" />
						<Button label="Button 2" variant="primary" />
					</ButtonGroup>
					<p class="text-base-content/60 mt-2 text-sm">
						The group container has role="group" for semantic HTML structure
					</p>
				</div>

				<div class="card bg-base-200 p-4">
					<h4 class="mb-2 font-semibold">Disabled State Accessibility</h4>
					<ButtonGroup ariaLabel="Button group with disabled state">
						<Button label="Enabled" variant="primary" />
						<Button label="Disabled" variant="primary" disabled />
					</ButtonGroup>
					<p class="text-base-content/60 mt-2 text-sm">
						Disabled buttons have proper aria-disabled attributes and are excluded from keyboard
						navigation
					</p>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Complex Example -->
<Story name="Complex Example">
	{#snippet children()}
		<div class="space-y-8">
			<div>
				<h3 class="mb-4 text-lg font-semibold">Form Actions</h3>
				<ButtonGroup gap="md" ariaLabel="Form action buttons">
					<Button label="Save Draft" variant="secondary" outline />
					<Button label="Submit" variant="primary" />
					<Button label="Cancel" variant="ghost" />
				</ButtonGroup>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-semibold">Data Table Actions</h3>
				<ButtonGroup ariaLabel="Table row action buttons">
					<Button label="View" variant="info" size="sm" />
					<Button label="Edit" variant="warning" size="sm" />
					<Button label="Delete" variant="error" size="sm" />
				</ButtonGroup>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-semibold">Pagination Controls</h3>
				<ButtonGroup gap="sm" ariaLabel="Pagination controls">
					<Button label="Previous" variant="primary" />
					<Button label="1" variant="primary" />
					<Button label="2" variant="secondary" />
					<Button label="3" variant="primary" />
					<Button label="Next" variant="primary" />
				</ButtonGroup>
			</div>
		</div>
	{/snippet}
</Story>
