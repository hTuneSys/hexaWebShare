<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Drawer from './Drawer.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Drawer',
		component: Drawer,
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: 'boolean',
				description: 'Whether the drawer is open',
				type: { name: 'boolean' }
			},
			side: {
				control: { type: 'select' },
				options: ['left', 'right', 'top', 'bottom'],
				description: 'Position of the drawer'
			},
			title: {
				control: 'text',
				description: 'Title of the drawer'
			},
			overlay: {
				control: 'boolean',
				description: 'Whether to show overlay backdrop'
			},
			closeOnBackdrop: {
				control: 'boolean',
				description: 'Whether clicking the backdrop closes the drawer'
			},
			showCloseButton: {
				control: 'boolean',
				description: 'Whether to show close button'
			},
			closeOnEscape: {
				control: 'boolean',
				description: 'Whether to allow closing with Escape key'
			},
			ariaLabel: {
				control: 'text',
				description: 'ARIA label for accessibility'
			}
		},
		args: {
			onclose: fn(),
			onopen: fn(),
			open: false,
			side: 'left',
			overlay: true,
			closeOnBackdrop: true,
			showCloseButton: true,
			closeOnEscape: true
		},
		parameters: {
			docs: {
				description: {
					component:
						'A flexible and accessible drawer component that slides in from any side. Supports overlay backdrop, keyboard navigation, and multiple positioning options. Built with DaisyUI and Svelte 5.'
				}
			}
		}
	});
</script>

<script>
	let drawerOpen = $state(false);
	let leftDrawerOpen = $state(false);
	let rightDrawerOpen = $state(false);
	let topDrawerOpen = $state(false);
	let bottomDrawerOpen = $state(false);
	let noOverlayDrawerOpen = $state(false);
	let navDrawerOpen = $state(false);
	let settingsDrawerOpen = $state(false);
	let cartDrawerOpen = $state(false);
	let filterDrawerOpen = $state(false);
	let notificationDrawerOpen = $state(false);
</script>

<!-- Default Drawer -->
<Story name="Default">
	{#snippet children()}
		<Drawer bind:open={drawerOpen} title="Default Drawer">
			{#snippet children()}
				<div class="space-y-4">
					<p>This is a default drawer with standard settings.</p>
					<p>Click the close button, backdrop, or press Escape to close.</p>
					<div class="divider"></div>
					<ul class="space-y-2">
						<li><a href="/menu-1" class="link">Menu Item 1</a></li>
						<li><a href="/menu-2" class="link">Menu Item 2</a></li>
						<li><a href="/menu-3" class="link">Menu Item 3</a></li>
					</ul>
				</div>
			{/snippet}
			{#snippet content()}
				<div class="flex min-h-screen flex-col items-center justify-center bg-base-100 p-8">
					<p class="mb-4 text-lg">Main content area</p>
					<button class="btn btn-primary" onclick={() => (drawerOpen = true)}> Open Drawer </button>
				</div>
			{/snippet}
		</Drawer>
	{/snippet}
</Story>

<!-- Side Positions -->
<Story name="Side Positions">
	{#snippet children()}
		<div class="relative h-screen">
			<!-- Left Drawer -->
			<Drawer bind:open={leftDrawerOpen} side="left" title="Left Drawer">
				{#snippet children()}
					<div class="space-y-4">
						<p>Drawer slides in from the left side.</p>
						<div class="alert alert-info">
							<span>💡 Default position</span>
						</div>
					</div>
				{/snippet}
				{#snippet content()}
					<div class="flex min-h-screen flex-col items-center justify-center bg-base-100 p-8">
						<p class="mb-6 text-lg">Choose a drawer position:</p>
						<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
							<button class="btn btn-primary" onclick={() => (leftDrawerOpen = true)}>
								Left Drawer
							</button>
							<button class="btn btn-secondary" onclick={() => (rightDrawerOpen = true)}>
								Right Drawer
							</button>
							<button class="btn btn-accent" onclick={() => (topDrawerOpen = true)}>
								Top Drawer
							</button>
							<button class="btn btn-info" onclick={() => (bottomDrawerOpen = true)}>
								Bottom Drawer
							</button>
						</div>
					</div>
				{/snippet}
			</Drawer>

			<!-- Right Drawer -->
			<Drawer bind:open={rightDrawerOpen} side="right" title="Right Drawer">
				{#snippet children()}
					<div class="space-y-4">
						<p>Drawer slides in from the right side.</p>
						<div class="alert alert-success">
							<span>✅ Great for settings panels</span>
						</div>
					</div>
				{/snippet}
				{#snippet content()}
					<div></div>
				{/snippet}
			</Drawer>

			<!-- Top Drawer -->
			<Drawer bind:open={topDrawerOpen} side="top" title="Top Drawer">
				{#snippet children()}
					<div class="space-y-4">
						<p>Drawer slides in from the top.</p>
						<div class="alert alert-warning">
							<span>⚠️ Use sparingly for notifications</span>
						</div>
					</div>
				{/snippet}
				{#snippet content()}
					<div></div>
				{/snippet}
			</Drawer>

			<!-- Bottom Drawer -->
			<Drawer bind:open={bottomDrawerOpen} side="bottom" title="Bottom Drawer">
				{#snippet children()}
					<div class="space-y-4">
						<p>Drawer slides in from the bottom.</p>
						<div class="alert alert-error">
							<span>🔴 Mobile-friendly option</span>
						</div>
					</div>
				{/snippet}
				{#snippet content()}
					<div></div>
				{/snippet}
			</Drawer>
		</div>
	{/snippet}
</Story>

<!-- Without Overlay -->
<Story name="Without Overlay">
	{#snippet children()}
		<Drawer bind:open={noOverlayDrawerOpen} title="No Overlay" overlay={false}>
			{#snippet children()}
				<div class="space-y-4">
					<p>This drawer has no overlay backdrop.</p>
					<p>You can still interact with the main content.</p>
					<div class="alert alert-info">
						<span>💡 Useful for non-modal sidebars</span>
					</div>
				</div>
			{/snippet}
			{#snippet content()}
				<div class="flex min-h-screen flex-col items-center justify-center bg-base-100 p-8">
					<div class="max-w-md space-y-4 text-center">
						<p class="text-lg font-bold">Main content is still interactive</p>
						<button class="btn btn-primary" onclick={() => (noOverlayDrawerOpen = true)}>
							Open Drawer (No Overlay)
						</button>
						<button class="btn btn-secondary">Click Me</button>
						<p>Try clicking around while the drawer is open!</p>
					</div>
				</div>
			{/snippet}
		</Drawer>
	{/snippet}
</Story>

<!-- Navigation Drawer -->
<Story name="Navigation Menu">
	{#snippet children()}
		<div class="bg-base-100">
			<Drawer bind:open={navDrawerOpen} title="Navigation" side="left">
				{#snippet children()}
					<ul class="menu space-y-2">
						<li>
							<a href="/home" class="flex items-center gap-3">
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
								<span>Home</span>
							</a>
						</li>
						<li>
							<a href="/products" class="flex items-center gap-3">
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
										d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
									/>
								</svg>
								<span>Products</span>
							</a>
						</li>
						<li>
							<a href="/about" class="flex items-center gap-3">
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
								<span>About</span>
							</a>
						</li>
						<li>
							<a href="/contact" class="flex items-center gap-3">
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
								<span>Contact</span>
							</a>
						</li>
						<div class="divider"></div>
						<li>
							<a href="/settings" class="flex items-center gap-3">
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
								<span>Settings</span>
							</a>
						</li>
					</ul>
				{/snippet}
				{#snippet content()}
					<div class="bg-base-100">
						<div class="navbar bg-base-200">
							<button
								class="btn btn-square btn-ghost"
								onclick={() => (navDrawerOpen = true)}
								aria-label="Open navigation menu"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									class="inline-block h-5 w-5 stroke-current"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6h16M4 12h16M4 18h16"
									></path>
								</svg>
							</button>
							<div class="flex-1">
								<span class="text-xl font-bold">My App</span>
							</div>
						</div>
						<div class="p-8">
							<h1 class="mb-4 text-3xl font-bold">Welcome</h1>
							<p>Click the menu icon to open the navigation drawer.</p>
						</div>
					</div>
				{/snippet}
			</Drawer>
		</div>
	{/snippet}
</Story>

<!-- Settings Drawer -->
<Story name="Settings Panel">
	{#snippet children()}
		<Drawer bind:open={settingsDrawerOpen} side="right" title="Settings">
			{#snippet children()}
				<div class="space-y-6">
					<!-- Theme Settings -->
					<div>
						<h3 class="mb-3 font-semibold">Theme</h3>
						<select class="select select-bordered w-full">
							<option>Light</option>
							<option>Dark</option>
							<option>Auto</option>
						</select>
					</div>

					<!-- Notification Settings -->
					<div>
						<h3 class="mb-3 font-semibold">Notifications</h3>
						<div class="form-control">
							<label class="label cursor-pointer">
								<span class="label-text">Email notifications</span>
								<input type="checkbox" class="toggle toggle-primary" checked />
							</label>
						</div>
						<div class="form-control">
							<label class="label cursor-pointer">
								<span class="label-text">Push notifications</span>
								<input type="checkbox" class="toggle toggle-primary" />
							</label>
						</div>
					</div>

					<!-- Language Settings -->
					<div>
						<h3 class="mb-3 font-semibold">Language</h3>
						<select class="select select-bordered w-full">
							<option>English</option>
							<option>Spanish</option>
							<option>French</option>
							<option>German</option>
						</select>
					</div>

					<!-- Action Buttons -->
					<div class="space-y-2">
						<button class="btn btn-primary w-full">Save Settings</button>
						<button class="btn btn-ghost w-full" onclick={() => (settingsDrawerOpen = false)}>
							Cancel
						</button>
					</div>
				</div>
			{/snippet}
			{#snippet content()}
				<div class="flex min-h-screen flex-col items-center justify-center bg-base-100 p-8">
					<p class="mb-4 text-lg">Main application content</p>
					<button class="btn btn-primary" onclick={() => (settingsDrawerOpen = true)}>
						Open Settings
					</button>
				</div>
			{/snippet}
		</Drawer>
	{/snippet}
</Story>

<!-- Shopping Cart Drawer -->
<Story name="Shopping Cart">
	{#snippet children()}
		<Drawer bind:open={cartDrawerOpen} side="right" title="Shopping Cart">
			{#snippet children()}
				<div class="space-y-4">
					<!-- Cart Items -->
					<div class="space-y-4">
						<!-- Item 1 -->
						<div class="card bg-base-100 shadow-sm">
							<div class="card-body p-4">
								<div class="flex gap-4">
									<div class="avatar">
										<div class="w-16 rounded">
											<div class="flex h-16 items-center justify-center bg-base-300">📦</div>
										</div>
									</div>
									<div class="flex-1">
										<h4 class="font-semibold">Product Name</h4>
										<p class="text-sm text-base-content/60">$29.99</p>
										<div class="mt-2 flex items-center gap-2">
											<button class="btn btn-circle btn-xs">-</button>
											<span>1</span>
											<button class="btn btn-circle btn-xs">+</button>
										</div>
									</div>
									<button class="btn btn-circle btn-ghost btn-sm">✕</button>
								</div>
							</div>
						</div>

						<!-- Item 2 -->
						<div class="card bg-base-100 shadow-sm">
							<div class="card-body p-4">
								<div class="flex gap-4">
									<div class="avatar">
										<div class="w-16 rounded">
											<div class="flex h-16 items-center justify-center bg-base-300">🎁</div>
										</div>
									</div>
									<div class="flex-1">
										<h4 class="font-semibold">Another Product</h4>
										<p class="text-sm text-base-content/60">$49.99</p>
										<div class="mt-2 flex items-center gap-2">
											<button class="btn btn-circle btn-xs">-</button>
											<span>2</span>
											<button class="btn btn-circle btn-xs">+</button>
										</div>
									</div>
									<button class="btn btn-circle btn-ghost btn-sm">✕</button>
								</div>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<!-- Cart Summary -->
					<div class="space-y-2">
						<div class="flex justify-between">
							<span>Subtotal</span>
							<span>$129.97</span>
						</div>
						<div class="flex justify-between">
							<span>Shipping</span>
							<span>$5.00</span>
						</div>
						<div class="flex justify-between font-bold">
							<span>Total</span>
							<span>$134.97</span>
						</div>
					</div>

					<!-- Action Buttons -->
					<div class="space-y-2">
						<button class="btn btn-primary w-full">Checkout</button>
						<button class="btn btn-ghost w-full" onclick={() => (cartDrawerOpen = false)}>
							Continue Shopping
						</button>
					</div>
				</div>
			{/snippet}
			{#snippet content()}
				<div class="flex min-h-screen flex-col items-center justify-center bg-base-100 p-8">
					<p class="mb-4 text-lg">Product catalog</p>
					<button class="btn btn-primary" onclick={() => (cartDrawerOpen = true)}>
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
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
						Cart (3)
					</button>
				</div>
			{/snippet}
		</Drawer>
	{/snippet}
</Story>

<!-- Filter Drawer -->
<Story name="Filter Panel">
	{#snippet children()}
		<Drawer bind:open={filterDrawerOpen} side="left" title="Filter Results">
			{#snippet children()}
				<div class="space-y-6">
					<!-- Category Filter -->
					<div>
						<h3 class="mb-3 font-semibold">Category</h3>
						<div class="form-control">
							<label class="label cursor-pointer justify-start gap-2">
								<input type="checkbox" class="checkbox-primary checkbox" checked />
								<span class="label-text">Electronics</span>
							</label>
						</div>
						<div class="form-control">
							<label class="label cursor-pointer justify-start gap-2">
								<input type="checkbox" class="checkbox-primary checkbox" />
								<span class="label-text">Clothing</span>
							</label>
						</div>
						<div class="form-control">
							<label class="label cursor-pointer justify-start gap-2">
								<input type="checkbox" class="checkbox-primary checkbox" />
								<span class="label-text">Books</span>
							</label>
						</div>
					</div>

					<!-- Price Range -->
					<div>
						<h3 class="mb-3 font-semibold">Price Range</h3>
						<input type="range" min="0" max="1000" class="range range-primary" />
						<div class="flex w-full justify-between px-2 text-xs">
							<span>$0</span>
							<span>$500</span>
							<span>$1000</span>
						</div>
					</div>

					<!-- Rating Filter -->
					<div>
						<h3 class="mb-3 font-semibold">Rating</h3>
						<div class="form-control">
							<label class="label cursor-pointer justify-start gap-2">
								<input type="radio" name="rating" class="radio-primary radio" checked />
								<span class="label-text">⭐⭐⭐⭐⭐ 5 Stars</span>
							</label>
						</div>
						<div class="form-control">
							<label class="label cursor-pointer justify-start gap-2">
								<input type="radio" name="rating" class="radio-primary radio" />
								<span class="label-text">⭐⭐⭐⭐ 4+ Stars</span>
							</label>
						</div>
						<div class="form-control">
							<label class="label cursor-pointer justify-start gap-2">
								<input type="radio" name="rating" class="radio-primary radio" />
								<span class="label-text">⭐⭐⭐ 3+ Stars</span>
							</label>
						</div>
					</div>

					<!-- Action Buttons -->
					<div class="space-y-2">
						<button class="btn btn-primary w-full">Apply Filters</button>
						<button class="btn btn-ghost w-full">Clear All</button>
					</div>
				</div>
			{/snippet}
			{#snippet content()}
				<div class="flex min-h-screen flex-col items-center justify-center bg-base-100 p-8">
					<p class="mb-4 text-lg">Product results</p>
					<button class="btn btn-primary" onclick={() => (filterDrawerOpen = true)}>
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
								d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
							/>
						</svg>
						Filters
					</button>
				</div>
			{/snippet}
		</Drawer>
	{/snippet}
</Story>

<!-- Notification Drawer -->
<Story name="Notifications">
	{#snippet children()}
		<Drawer bind:open={notificationDrawerOpen} side="right" title="Notifications">
			{#snippet children()}
				<div class="space-y-3">
					<!-- Notification 1 -->
					<div class="alert alert-info">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="h-6 w-6 shrink-0 stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<div class="flex-1">
							<div class="font-bold">New message</div>
							<div class="text-xs">You have a new message from John</div>
						</div>
					</div>

					<!-- Notification 2 -->
					<div class="alert alert-success">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 shrink-0 stroke-current"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<div class="flex-1">
							<div class="font-bold">Order shipped</div>
							<div class="text-xs">Your order #12345 has been shipped</div>
						</div>
					</div>

					<!-- Notification 3 -->
					<div class="alert alert-warning">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 shrink-0 stroke-current"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<div class="flex-1">
							<div class="font-bold">Payment due soon</div>
							<div class="text-xs">Your subscription renews in 3 days</div>
						</div>
					</div>

					<!-- Notification 4 -->
					<div class="alert">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="h-6 w-6 shrink-0 stroke-info"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<div class="flex-1">
							<div class="font-bold">Update available</div>
							<div class="text-xs">Version 2.0 is now available</div>
						</div>
					</div>

					<!-- Notification 5 -->
					<div class="alert alert-error">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 shrink-0 stroke-current"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<div class="flex-1">
							<div class="font-bold">Action required</div>
							<div class="text-xs">Please verify your email address</div>
						</div>
					</div>
				</div>

				<div class="divider"></div>

				<button class="btn btn-ghost btn-block">Mark all as read</button>
			{/snippet}
			{#snippet content()}
				<div class="flex min-h-screen flex-col items-center justify-center bg-base-100 p-8">
					<p class="mb-4 text-lg">Main content</p>
					<button class="btn btn-primary" onclick={() => (notificationDrawerOpen = true)}>
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
						Notifications (5)
					</button>
				</div>
			{/snippet}
		</Drawer>
	{/snippet}
</Story>

<!-- Custom Styling -->
<Story name="Custom Styling">
	{#snippet children()}
		<Drawer
			open={true}
			title="Custom Styled Drawer"
			sideClass="bg-gradient-to-b from-primary to-secondary"
			contentClass="bg-primary/10 text-primary-content"
		>
			{#snippet children()}
				<div class="space-y-4 text-white">
					<p>This drawer uses custom styling with gradients and colors.</p>
					<ul class="space-y-2">
						<li><a href="/custom-1" class="link-hover link">Custom Item 1</a></li>
						<li><a href="/custom-2" class="link-hover link">Custom Item 2</a></li>
						<li><a href="/custom-3" class="link-hover link">Custom Item 3</a></li>
					</ul>
				</div>
			{/snippet}
			{#snippet content()}
				<div class="flex min-h-screen items-center justify-center bg-base-100 p-8">
					<p class="text-lg">Custom styled drawer example (always open)</p>
				</div>
			{/snippet}
		</Drawer>
	{/snippet}
</Story>

<!-- Accessibility Features -->
<Story name="Accessibility">
	{#snippet children()}
		<div class="min-h-screen space-y-6 bg-base-100 p-8">
			<div class="alert alert-success">
				<span>✅ All drawers include proper accessibility features</span>
			</div>

			<div class="space-y-4">
				<div class="card bg-base-200 p-4">
					<h4 class="mb-2 font-semibold">Keyboard Navigation</h4>
					<p class="mb-4 text-sm text-base-content/60">
						Press Escape to close the drawer (when closeOnEscape is enabled)
					</p>
				</div>

				<div class="card bg-base-200 p-4">
					<h4 class="mb-2 font-semibold">ARIA Labels</h4>
					<p class="mb-4 text-sm text-base-content/60">
						All interactive elements have proper ARIA labels for screen readers
					</p>
				</div>

				<div class="card bg-base-200 p-4">
					<h4 class="mb-2 font-semibold">Focus Management</h4>
					<p class="mb-4 text-sm text-base-content/60">
						Focus is properly managed when drawer opens and closes
					</p>
				</div>

				<div class="card bg-base-200 p-4">
					<h4 class="mb-2 font-semibold">Modal Behavior</h4>
					<p class="mb-4 text-sm text-base-content/60">
						Drawer acts as a modal with role="dialog" and aria-modal="true"
					</p>
				</div>
			</div>
		</div>
	{/snippet}
</Story>
