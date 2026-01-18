<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RoleBadge from './RoleBadge.svelte';

	const { Story } = defineMeta({
		title: 'Admin/Permissions/RoleBadge',
		component: RoleBadge,
		tags: ['autodocs'],
		argTypes: {
			role: {
				control: 'text',
				description: 'Role name to display',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'admin' }
				}
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
					'error',
					'ghost'
				],
				description: 'Color variant of the role badge (auto-determined if not provided)',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'auto-determined' }
				}
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the role badge',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'md' }
				}
			},
			outline: {
				control: 'boolean',
				description: 'Outline style badge',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the role badge',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'undefined' }
				}
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide badge from screen readers (decorative badges)',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			}
		},
		args: {
			role: 'admin',
			size: 'md'
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ role: 'admin', size: 'md' }} />

<!-- Auto-Detected Roles Showcase -->
<Story name="Auto-Detected Roles">
	<div class="flex flex-wrap items-center gap-4">
		<RoleBadge role="admin" />
		<RoleBadge role="moderator" />
		<RoleBadge role="manager" />
		<RoleBadge role="editor" />
		<RoleBadge role="user" />
		<RoleBadge role="guest" />
	</div>
</Story>

<!-- Size Variations -->
<Story name="Sizes">
	<div class="flex flex-wrap items-center gap-4">
		<RoleBadge role="admin" size="xs" />
		<RoleBadge role="moderator" size="sm" />
		<RoleBadge role="manager" size="md" />
		<RoleBadge role="editor" size="lg" />
	</div>
</Story>

<!-- Outline Style -->
<Story name="Outline Style" args={{ role: 'admin', size: 'md', outline: true }} />

<!-- Disabled State -->
<Story name="Disabled State" args={{ role: 'admin', size: 'md', disabled: true }} />

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		role: 'admin',
		size: 'md',
		outline: false,
		disabled: false,
		ariaLabel: 'Interactive role badge'
	}}
/>
