<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import StatusDot from './StatusDot.svelte';

	const { Story } = defineMeta({
		title: 'Core/Data Display/StatusDot',
		component: StatusDot,
		tags: ['autodocs'],
		argTypes: {
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
				description: 'Color variant of the status dot'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Size of the status dot'
			},
			pulse: {
				control: 'boolean',
				description: 'Enable pulsing animation for active/live status'
			},
			ring: {
				control: 'boolean',
				description: 'Add ring/outline effect around the dot'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the status dot (reduced opacity)'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide dot from screen readers (decorative dots)'
			}
		},
		args: {
			variant: 'neutral',
			size: 'md',
			pulse: false,
			ring: false,
			disabled: false
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ variant: 'neutral', size: 'md' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ variant: 'success', size: 'xs' }} />
<Story name="Small" args={{ variant: 'success', size: 'sm' }} />
<Story name="Medium" args={{ variant: 'success', size: 'md' }} />
<Story name="Large" args={{ variant: 'success', size: 'lg' }} />
<Story name="Extra Large" args={{ variant: 'success', size: 'xl' }} />

<!-- Variant Stories -->
<Story name="Primary" args={{ variant: 'primary', size: 'md' }} />
<Story name="Secondary" args={{ variant: 'secondary', size: 'md' }} />
<Story name="Accent" args={{ variant: 'accent', size: 'md' }} />
<Story name="Neutral" args={{ variant: 'neutral', size: 'md' }} />
<Story name="Info" args={{ variant: 'info', size: 'md' }} />
<Story name="Success" args={{ variant: 'success', size: 'md' }} />
<Story name="Warning" args={{ variant: 'warning', size: 'md' }} />
<Story name="Error" args={{ variant: 'error', size: 'md' }} />

<!-- Animation Stories -->
<Story name="Pulsing" args={{ variant: 'success', size: 'md', pulse: true }} />
<Story name="Pulsing Error" args={{ variant: 'error', size: 'md', pulse: true }} />
<Story name="Pulsing Info" args={{ variant: 'info', size: 'md', pulse: true }} />
<Story name="Pulsing Warning" args={{ variant: 'warning', size: 'lg', pulse: true }} />

<!-- Ring Stories -->
<Story name="With Ring" args={{ variant: 'success', size: 'md', ring: true }} />
<Story name="Ring Primary" args={{ variant: 'primary', size: 'lg', ring: true }} />
<Story name="Ring Error" args={{ variant: 'error', size: 'md', ring: true }} />

<!-- State Stories -->
<Story name="Disabled" args={{ variant: 'success', size: 'md', disabled: true }} />
<Story
	name="Disabled Pulsing"
	args={{ variant: 'error', size: 'md', pulse: true, disabled: true }}
/>

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{ variant: 'success', size: 'md', ariaLabel: 'Status: Online' }}
/>
<Story
	name="Decorative (Aria Hidden)"
	args={{ variant: 'neutral', size: 'md', ariaHidden: true }}
/>

<!-- All Sizes Showcase -->
<Story name="All Sizes">
	<div class="flex flex-wrap items-center gap-4">
		<div class="flex items-center gap-2">
			<StatusDot variant="success" size="xs" ariaLabel="Extra small status" />
			<span class="text-sm">xs</span>
		</div>
		<div class="flex items-center gap-2">
			<StatusDot variant="success" size="sm" ariaLabel="Small status" />
			<span class="text-sm">sm</span>
		</div>
		<div class="flex items-center gap-2">
			<StatusDot variant="success" size="md" ariaLabel="Medium status" />
			<span class="text-sm">md</span>
		</div>
		<div class="flex items-center gap-2">
			<StatusDot variant="success" size="lg" ariaLabel="Large status" />
			<span class="text-sm">lg</span>
		</div>
		<div class="flex items-center gap-2">
			<StatusDot variant="success" size="xl" ariaLabel="Extra large status" />
			<span class="text-sm">xl</span>
		</div>
	</div>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="flex flex-wrap items-center gap-4">
		<div class="flex items-center gap-2">
			<StatusDot variant="primary" ariaLabel="Primary status" />
			<span class="text-sm">primary</span>
		</div>
		<div class="flex items-center gap-2">
			<StatusDot variant="secondary" ariaLabel="Secondary status" />
			<span class="text-sm">secondary</span>
		</div>
		<div class="flex items-center gap-2">
			<StatusDot variant="accent" ariaLabel="Accent status" />
			<span class="text-sm">accent</span>
		</div>
		<div class="flex items-center gap-2">
			<StatusDot variant="neutral" ariaLabel="Neutral status" />
			<span class="text-sm">neutral</span>
		</div>
		<div class="flex items-center gap-2">
			<StatusDot variant="info" ariaLabel="Info status" />
			<span class="text-sm">info</span>
		</div>
		<div class="flex items-center gap-2">
			<StatusDot variant="success" ariaLabel="Success status" />
			<span class="text-sm">success</span>
		</div>
		<div class="flex items-center gap-2">
			<StatusDot variant="warning" ariaLabel="Warning status" />
			<span class="text-sm">warning</span>
		</div>
		<div class="flex items-center gap-2">
			<StatusDot variant="error" ariaLabel="Error status" />
			<span class="text-sm">error</span>
		</div>
	</div>
</Story>

<!-- Pulsing Variants Showcase -->
<Story name="All Pulsing Variants">
	<div class="flex flex-wrap items-center gap-6">
		<StatusDot variant="primary" pulse ariaLabel="Primary pulsing" />
		<StatusDot variant="secondary" pulse ariaLabel="Secondary pulsing" />
		<StatusDot variant="accent" pulse ariaLabel="Accent pulsing" />
		<StatusDot variant="info" pulse ariaLabel="Info pulsing" />
		<StatusDot variant="success" pulse ariaLabel="Success pulsing" />
		<StatusDot variant="warning" pulse ariaLabel="Warning pulsing" />
		<StatusDot variant="error" pulse ariaLabel="Error pulsing" />
	</div>
</Story>

<!-- Ring Variants Showcase -->
<Story name="All Ring Variants">
	<div class="flex flex-wrap items-center gap-6">
		<StatusDot variant="primary" ring ariaLabel="Primary with ring" />
		<StatusDot variant="secondary" ring ariaLabel="Secondary with ring" />
		<StatusDot variant="accent" ring ariaLabel="Accent with ring" />
		<StatusDot variant="info" ring ariaLabel="Info with ring" />
		<StatusDot variant="success" ring ariaLabel="Success with ring" />
		<StatusDot variant="warning" ring ariaLabel="Warning with ring" />
		<StatusDot variant="error" ring ariaLabel="Error with ring" />
	</div>
</Story>

<!-- Real-world Examples: User Status -->
<Story name="User Status Indicators">
	<div class="space-y-4">
		<div class="flex items-center gap-3">
			<StatusDot variant="success" pulse ariaLabel="Online" />
			<span>John Doe - Online</span>
		</div>
		<div class="flex items-center gap-3">
			<StatusDot variant="warning" ariaLabel="Away" />
			<span>Jane Smith - Away</span>
		</div>
		<div class="flex items-center gap-3">
			<StatusDot variant="error" ariaLabel="Do not disturb" />
			<span>Bob Wilson - Do Not Disturb</span>
		</div>
		<div class="flex items-center gap-3">
			<StatusDot variant="neutral" ariaLabel="Offline" />
			<span>Alice Brown - Offline</span>
		</div>
	</div>
</Story>

<!-- Real-world Examples: Server Status -->
<Story name="Server Status Dashboard">
	<div class="space-y-3">
		<div class="border-base-300 flex items-center justify-between rounded-lg border p-3">
			<span class="font-medium">API Server</span>
			<div class="flex items-center gap-2">
				<StatusDot variant="success" pulse ariaLabel="API Server: Running" />
				<span class="text-success text-sm">Running</span>
			</div>
		</div>
		<div class="border-base-300 flex items-center justify-between rounded-lg border p-3">
			<span class="font-medium">Database</span>
			<div class="flex items-center gap-2">
				<StatusDot variant="success" ariaLabel="Database: Connected" />
				<span class="text-success text-sm">Connected</span>
			</div>
		</div>
		<div class="border-base-300 flex items-center justify-between rounded-lg border p-3">
			<span class="font-medium">Cache Server</span>
			<div class="flex items-center gap-2">
				<StatusDot variant="warning" ariaLabel="Cache Server: High latency" />
				<span class="text-warning text-sm">High Latency</span>
			</div>
		</div>
		<div class="border-base-300 flex items-center justify-between rounded-lg border p-3">
			<span class="font-medium">Mail Service</span>
			<div class="flex items-center gap-2">
				<StatusDot variant="error" pulse ariaLabel="Mail Service: Down" />
				<span class="text-error text-sm">Down</span>
			</div>
		</div>
	</div>
</Story>

<!-- Real-world Examples: Form Field Status -->
<Story name="Form Field Validation">
	<div class="w-80 space-y-4">
		<div class="form-control">
			<label class="label">
				<span class="label-text flex items-center gap-2">
					Email
					<StatusDot variant="success" size="xs" ariaLabel="Email: Valid" />
				</span>
			</label>
			<input
				type="email"
				value="user@example.com"
				class="input input-bordered input-success"
				readonly
			/>
		</div>
		<div class="form-control">
			<label class="label">
				<span class="label-text flex items-center gap-2">
					Password
					<StatusDot variant="warning" size="xs" ariaLabel="Password: Weak" />
				</span>
			</label>
			<input type="password" value="weak" class="input input-bordered input-warning" readonly />
		</div>
		<div class="form-control">
			<label class="label">
				<span class="label-text flex items-center gap-2">
					Username
					<StatusDot variant="error" size="xs" ariaLabel="Username: Unavailable" />
				</span>
			</label>
			<input type="text" value="admin" class="input input-bordered input-error" readonly />
		</div>
	</div>
</Story>

<!-- Real-world Examples: Notification Badge -->
<Story name="With Notification Count">
	<div class="flex items-center gap-8">
		<div class="relative">
			<button class="btn btn-circle btn-ghost" aria-label="Notifications">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
					/>
				</svg>
			</button>
			<span class="absolute -top-1 -right-1">
				<StatusDot variant="error" size="sm" pulse ariaLabel="New notifications" />
			</span>
		</div>
		<div class="relative">
			<button class="btn btn-circle btn-ghost" aria-label="Messages">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
					/>
				</svg>
			</button>
			<span class="absolute -top-1 -right-1">
				<StatusDot variant="info" size="sm" ariaLabel="Unread messages" />
			</span>
		</div>
	</div>
</Story>

<!-- Real-world Examples: Avatar Status -->
<Story name="Avatar Status">
	<div class="flex items-center gap-6">
		<div class="relative">
			<div class="avatar placeholder">
				<div class="bg-neutral text-neutral-content w-12 rounded-full">
					<span>JD</span>
				</div>
			</div>
			<span class="absolute right-0 bottom-0">
				<StatusDot variant="success" size="sm" ring pulse ariaLabel="Online" />
			</span>
		</div>
		<div class="relative">
			<div class="avatar placeholder">
				<div class="bg-neutral text-neutral-content w-12 rounded-full">
					<span>AB</span>
				</div>
			</div>
			<span class="absolute right-0 bottom-0">
				<StatusDot variant="warning" size="sm" ring ariaLabel="Away" />
			</span>
		</div>
		<div class="relative">
			<div class="avatar placeholder">
				<div class="bg-neutral text-neutral-content w-12 rounded-full">
					<span>CD</span>
				</div>
			</div>
			<span class="absolute right-0 bottom-0">
				<StatusDot variant="neutral" size="sm" ring ariaLabel="Offline" />
			</span>
		</div>
	</div>
</Story>

<!-- Combined Features -->
<Story
	name="Pulsing with Ring"
	args={{ variant: 'success', size: 'lg', pulse: true, ring: true }}
/>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		variant: 'success',
		size: 'md',
		pulse: false,
		ring: false,
		disabled: false,
		ariaLabel: 'Interactive status dot'
	}}
/>
