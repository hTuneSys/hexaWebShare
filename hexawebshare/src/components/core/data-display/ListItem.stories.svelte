<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ListItem from './ListItem.svelte';

	const { Story } = defineMeta({
		title: 'Core/Data Display/ListItem',
		component: ListItem,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Primary text content of the list item'
			},
			description: {
				control: 'text',
				description: 'Secondary/description text displayed below the label'
			},
			variant: {
				control: { type: 'select' },
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the list item when active'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size of the list item'
			},
			active: {
				control: 'boolean',
				description: 'Whether the list item is currently active/selected'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the list item is disabled'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the list item is in loading state'
			},
			hoverable: {
				control: 'boolean',
				description: 'Whether the list item shows hover effect'
			},
			bordered: {
				control: 'boolean',
				description: 'Whether the list item has a border at the bottom'
			},
			href: {
				control: 'text',
				description: 'URL to navigate to (makes the item a link)'
			},
			target: {
				control: { type: 'select' },
				options: ['_blank', '_self', '_parent', '_top'],
				description: 'Target for the link'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			selected: {
				control: 'boolean',
				description: 'Whether the item is currently selected (for aria-selected)'
			}
		},
		args: {
			label: 'List Item',
			size: 'md',
			variant: 'neutral',
			hoverable: true
		}
	});
</script>

<script lang="ts">
	let selectedIndex = $state(0);

	function handleClick(index: number) {
		selectedIndex = index;
	}
</script>

<!-- Default Story -->
<Story name="Default" args={{ label: 'Default List Item', size: 'md', variant: 'neutral' }} />

<!-- With Description -->
<Story
	name="With Description"
	args={{
		label: 'List Item with Description',
		description: 'This is a secondary description text that provides more context',
		size: 'md',
		variant: 'neutral'
	}}
/>

<!-- Size Stories -->
<Story
	name="Small"
	args={{
		label: 'Small Item',
		description: 'Compact size for dense lists',
		size: 'sm'
	}}
/>
<Story
	name="Medium"
	args={{
		label: 'Medium Item',
		description: 'Default size for most use cases',
		size: 'md'
	}}
/>
<Story
	name="Large"
	args={{
		label: 'Large Item',
		description: 'Larger size for prominent items',
		size: 'lg'
	}}
/>

<!-- Active Variant Stories -->
<Story name="Active Primary" args={{ label: 'Active Primary', variant: 'primary', active: true }} />
<Story
	name="Active Secondary"
	args={{ label: 'Active Secondary', variant: 'secondary', active: true }}
/>
<Story name="Active Accent" args={{ label: 'Active Accent', variant: 'accent', active: true }} />
<Story name="Active Neutral" args={{ label: 'Active Neutral', variant: 'neutral', active: true }} />
<Story name="Active Info" args={{ label: 'Active Info', variant: 'info', active: true }} />
<Story name="Active Success" args={{ label: 'Active Success', variant: 'success', active: true }} />
<Story name="Active Warning" args={{ label: 'Active Warning', variant: 'warning', active: true }} />
<Story name="Active Error" args={{ label: 'Active Error', variant: 'error', active: true }} />

<!-- State Stories -->
<Story
	name="Disabled"
	args={{
		label: 'Disabled Item',
		description: 'This item is disabled',
		disabled: true
	}}
/>
<Story
	name="Loading"
	args={{
		label: 'Loading Item',
		description: 'Loading state with spinner',
		loading: true
	}}
/>
<Story
	name="Non-Hoverable"
	args={{
		label: 'Non-Hoverable Item',
		description: 'No hover effect',
		hoverable: false
	}}
/>
<Story
	name="Bordered"
	args={{
		label: 'Bordered Item',
		description: 'Has a bottom border',
		bordered: true
	}}
/>

<!-- Link Stories -->
<Story
	name="As Link"
	args={{
		label: 'Link Item',
		description: 'Click to navigate',
		href: '#example-link'
	}}
/>
<Story
	name="External Link"
	args={{
		label: 'External Link',
		description: 'Opens in new tab',
		href: 'https://example.com',
		target: '_blank'
	}}
/>

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{
		label: 'List Item',
		ariaLabel: 'Accessible list item with custom aria label'
	}}
/>
<Story
	name="Selected State"
	args={{
		label: 'Selected Item',
		selected: true,
		active: true,
		variant: 'primary'
	}}
/>

<!-- All Sizes Showcase -->
<Story name="All Sizes">
	<div class="bg-base-100 w-full max-w-md rounded-lg shadow">
		<ListItem label="Small Item" description="Compact size" size="sm" bordered={true} />
		<ListItem label="Medium Item" description="Default size" size="md" bordered={true} />
		<ListItem label="Large Item" description="Prominent size" size="lg" />
	</div>
</Story>

<!-- All Active Variants Showcase -->
<Story name="All Active Variants">
	<div class="bg-base-100 w-full max-w-md rounded-lg shadow">
		<ListItem label="Primary" variant="primary" active={true} bordered={true} />
		<ListItem label="Secondary" variant="secondary" active={true} bordered={true} />
		<ListItem label="Accent" variant="accent" active={true} bordered={true} />
		<ListItem label="Neutral" variant="neutral" active={true} bordered={true} />
		<ListItem label="Info" variant="info" active={true} bordered={true} />
		<ListItem label="Success" variant="success" active={true} bordered={true} />
		<ListItem label="Warning" variant="warning" active={true} bordered={true} />
		<ListItem label="Error" variant="error" active={true} />
	</div>
</Story>

<!-- With Leading Icon -->
<Story name="With Leading Icon">
	<div class="bg-base-100 w-full max-w-md rounded-lg shadow">
		<ListItem label="Home" description="Go to dashboard" bordered={true}>
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			{/snippet}
		</ListItem>
		<ListItem label="Settings" description="Manage preferences" bordered={true}>
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			{/snippet}
		</ListItem>
		<ListItem label="Profile" description="View your profile">
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
			{/snippet}
		</ListItem>
	</div>
</Story>

<!-- With Trailing Content -->
<Story name="With Trailing Badge">
	<div class="bg-base-100 w-full max-w-md rounded-lg shadow">
		<ListItem label="Notifications" description="View all notifications" bordered={true}>
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
			{/snippet}
			{#snippet trailing()}
				<span class="badge badge-primary badge-sm">5</span>
			{/snippet}
		</ListItem>
		<ListItem label="Messages" description="Read your messages" bordered={true}>
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
					/>
				</svg>
			{/snippet}
			{#snippet trailing()}
				<span class="badge badge-error badge-sm">12</span>
			{/snippet}
		</ListItem>
		<ListItem label="Updates" description="Software updates available">
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					/>
				</svg>
			{/snippet}
			{#snippet trailing()}
				<span class="badge badge-success badge-sm">New</span>
			{/snippet}
		</ListItem>
	</div>
</Story>

<!-- With Trailing Action -->
<Story name="With Trailing Action">
	<div class="bg-base-100 w-full max-w-md rounded-lg shadow">
		<ListItem label="John Doe" description="john.doe@example.com" bordered={true}>
			{#snippet leading()}
				<div class="avatar placeholder">
					<div class="bg-neutral text-neutral-content w-10 rounded-full">
						<span class="text-sm">JD</span>
					</div>
				</div>
			{/snippet}
			{#snippet trailing()}
				<button class="btn btn-circle btn-ghost btn-sm" aria-label="More options for John Doe">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
						/>
					</svg>
				</button>
			{/snippet}
		</ListItem>
		<ListItem label="Jane Smith" description="jane.smith@example.com" bordered={true}>
			{#snippet leading()}
				<div class="avatar placeholder">
					<div class="bg-primary text-primary-content w-10 rounded-full">
						<span class="text-sm">JS</span>
					</div>
				</div>
			{/snippet}
			{#snippet trailing()}
				<button class="btn btn-circle btn-ghost btn-sm" aria-label="More options for Jane Smith">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
						/>
					</svg>
				</button>
			{/snippet}
		</ListItem>
	</div>
</Story>

<!-- Interactive Selection Example -->
<Story name="Interactive Selection">
	<div class="bg-base-100 w-full max-w-md rounded-lg shadow">
		<p class="text-base-content/70 px-4 py-2 text-sm">Click to select an item:</p>
		<ListItem
			label="Option 1"
			description="First option"
			active={selectedIndex === 0}
			variant="primary"
			bordered={true}
			onclick={() => handleClick(0)}
		/>
		<ListItem
			label="Option 2"
			description="Second option"
			active={selectedIndex === 1}
			variant="primary"
			bordered={true}
			onclick={() => handleClick(1)}
		/>
		<ListItem
			label="Option 3"
			description="Third option"
			active={selectedIndex === 2}
			variant="primary"
			onclick={() => handleClick(2)}
		/>
	</div>
</Story>

<!-- Loading States -->
<Story name="Loading States">
	<div class="bg-base-100 w-full max-w-md rounded-lg shadow">
		<ListItem label="Loading..." loading={true} bordered={true} />
		<ListItem
			label="Loading with description"
			description="Please wait..."
			loading={true}
			bordered={true}
		/>
		<ListItem label="Normal Item" description="Not loading" bordered={true} />
	</div>
</Story>

<!-- Disabled States -->
<Story name="Disabled States">
	<div class="bg-base-100 w-full max-w-md rounded-lg shadow">
		<ListItem label="Enabled Item" description="Click me" bordered={true} />
		<ListItem label="Disabled Item" description="Cannot interact" disabled={true} bordered={true} />
		<ListItem label="Disabled with Icon" description="Also disabled" disabled={true}>
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
					/>
				</svg>
			{/snippet}
		</ListItem>
	</div>
</Story>

<!-- Navigation Menu Example -->
<Story name="Navigation Menu">
	<div class="bg-base-100 w-full max-w-md rounded-lg shadow">
		<ListItem label="Dashboard" href="#dashboard" variant="primary" active={true} bordered={true}>
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
					/>
				</svg>
			{/snippet}
		</ListItem>
		<ListItem label="Analytics" href="#analytics" bordered={true}>
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
			{/snippet}
		</ListItem>
		<ListItem label="Users" href="#users" bordered={true}>
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>
			{/snippet}
		</ListItem>
		<ListItem label="Settings" href="#settings">
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			{/snippet}
		</ListItem>
	</div>
</Story>

<!-- File List Example -->
<Story name="File List Example">
	<div class="bg-base-100 w-full max-w-md rounded-lg shadow">
		<ListItem label="document.pdf" description="2.4 MB • Modified today" bordered={true}>
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="text-error h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
					/>
				</svg>
			{/snippet}
			{#snippet trailing()}
				<button class="btn btn-ghost btn-sm">Download</button>
			{/snippet}
		</ListItem>
		<ListItem label="image.png" description="1.2 MB • Modified yesterday" bordered={true}>
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="text-success h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			{/snippet}
			{#snippet trailing()}
				<button class="btn btn-ghost btn-sm">Download</button>
			{/snippet}
		</ListItem>
		<ListItem label="spreadsheet.xlsx" description="856 KB • Modified last week">
			{#snippet leading()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="text-info h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
			{/snippet}
			{#snippet trailing()}
				<button class="btn btn-ghost btn-sm">Download</button>
			{/snippet}
		</ListItem>
	</div>
</Story>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		label: 'Configurable List Item',
		description: 'Use the controls to customize',
		size: 'md',
		variant: 'neutral',
		hoverable: true,
		bordered: false,
		active: false,
		disabled: false,
		loading: false
	}}
/>
