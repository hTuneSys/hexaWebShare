<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Form from './Form.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/Form',
		component: Form,
		tags: ['autodocs'],
		argTypes: {
			method: {
				control: { type: 'select' },
				options: ['get', 'post', 'dialog'],
				description: 'HTTP method for form submission'
			},
			action: {
				control: 'text',
				description: 'URL to submit the form to'
			},
			enctype: {
				control: { type: 'select' },
				options: ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'],
				description: 'Form encoding type'
			},
			target: {
				control: { type: 'select' },
				options: ['_self', '_blank', '_parent', '_top'],
				description: 'Target window for form submission'
			},
			name: {
				control: 'text',
				description: 'Form name attribute'
			},
			novalidate: {
				control: 'boolean',
				description: 'Whether to skip form validation'
			},
			autocomplete: {
				control: { type: 'select' },
				options: ['on', 'off'],
				description: 'Autocomplete setting'
			},
			class: {
				control: 'text',
				description: 'Additional CSS classes'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the form'
			}
		},
		args: {
			method: 'post',
			onsubmit: fn(),
			onreset: fn()
		}
	});
</script>

<!-- Default Form -->
<Story name="Default" args={{ method: 'post' }}>
	{#snippet children()}
		<div class="space-y-4">
			<div class="form-control">
				<label class="label" for="email">
					<span class="label-text">Email</span>
				</label>
				<input
					id="email"
					type="email"
					placeholder="email@example.com"
					class="input input-bordered"
				/>
			</div>
			<div class="form-control">
				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					id="password"
					type="password"
					placeholder="Enter password"
					class="input input-bordered"
				/>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</div>
	{/snippet}
</Story>

<!-- GET Method -->
<Story name="GET Method" args={{ method: 'get', action: '/search' }}>
	{#snippet children()}
		<div class="flex gap-2">
			<input type="text" name="q" placeholder="Search..." class="input input-bordered flex-1" />
			<button type="submit" class="btn btn-primary">Search</button>
		</div>
	{/snippet}
</Story>

<!-- Dialog Method -->
<Story name="Dialog Method" args={{ method: 'dialog' }}>
	{#snippet children()}
		<p class="text-base-content/70 mb-4 text-sm">
			Forms with method="dialog" are used inside modal dialogs to close them on submit.
		</p>
		<button type="submit" class="btn btn-primary">Close Dialog</button>
	{/snippet}
</Story>

<!-- With File Upload -->
<Story name="File Upload" args={{ method: 'post', enctype: 'multipart/form-data' }}>
	{#snippet children()}
		<div class="space-y-4">
			<div class="form-control">
				<label class="label" for="file">
					<span class="label-text">Upload File</span>
				</label>
				<input id="file" type="file" class="file-input file-input-bordered w-full" />
			</div>
			<button type="submit" class="btn btn-primary">Upload</button>
		</div>
	{/snippet}
</Story>

<!-- With Validation -->
<Story name="With Validation" args={{ method: 'post', novalidate: false }}>
	{#snippet children()}
		<div class="space-y-4">
			<div class="form-control">
				<label class="label" for="required-email">
					<span class="label-text">Email (required)</span>
				</label>
				<input
					id="required-email"
					type="email"
					placeholder="email@example.com"
					class="input input-bordered"
					required
				/>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</div>
	{/snippet}
</Story>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		method: 'post',
		novalidate: false,
		autocomplete: 'on'
	}}
>
	{#snippet children()}
		<div class="space-y-4">
			<div class="form-control">
				<label class="label" for="playground-name">
					<span class="label-text">Name</span>
				</label>
				<input
					id="playground-name"
					type="text"
					placeholder="Your name"
					class="input input-bordered"
				/>
			</div>
			<div class="form-control">
				<label class="label" for="playground-email">
					<span class="label-text">Email</span>
				</label>
				<input
					id="playground-email"
					type="email"
					placeholder="email@example.com"
					class="input input-bordered"
				/>
			</div>
			<div class="form-control">
				<label class="label" for="playground-message">
					<span class="label-text">Message</span>
				</label>
				<textarea
					id="playground-message"
					class="textarea textarea-bordered"
					placeholder="Your message"
				></textarea>
			</div>
			<div class="flex gap-2">
				<button type="submit" class="btn btn-primary">Submit</button>
				<button type="reset" class="btn btn-ghost">Reset</button>
			</div>
		</div>
	{/snippet}
</Story>
