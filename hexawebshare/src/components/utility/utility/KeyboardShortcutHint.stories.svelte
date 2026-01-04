<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import KeyboardShortcutHint from './KeyboardShortcutHint.svelte';

	const { Story } = defineMeta({
		title: 'Utility/Utility/KeyboardShortcutHint',
		component: KeyboardShortcutHint,
		tags: ['autodocs'],
		argTypes: {
			keys: {
				control: 'text',
				description: 'Keyboard shortcut keys (string, array, or array of arrays)'
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
				description: 'Color variant of the hint'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the hint'
			},
			outline: {
				control: 'boolean',
				description: 'Outline style hint'
			},
			soft: {
				control: 'boolean',
				description: 'Soft/muted background style'
			},
			separator: {
				control: 'text',
				description: 'Separator between keys'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the hint'
			}
		},
		args: {
			keys: ['Ctrl', 'K'],
			variant: 'neutral',
			size: 'md',
			outline: false,
			soft: false,
			separator: '+',
			disabled: false
		}
	});
</script>

<!-- Default Variant Story -->
<Story name="Default" args={{ keys: ['Ctrl', 'K'], variant: 'neutral' }} />

<!-- Single Key String Story -->
<Story name="Single Key String" args={{ keys: 'Ctrl+K', variant: 'primary' }} />

<!-- Multiple Keys Story -->
<Story name="Multiple Keys" args={{ keys: ['Ctrl', 'Shift', 'P'], variant: 'accent' }} />

<!-- Small Size Story -->
<Story name="Small Size" args={{ keys: ['Cmd', 'K'], size: 'sm', variant: 'primary' }} />

<!-- Large Size Story -->
<Story name="Large Size" args={{ keys: ['Alt', 'F4'], size: 'lg', variant: 'success' }} />

<!-- Outline Style Story -->
<Story name="Outline Style" args={{ keys: ['Ctrl', 'S'], variant: 'primary', outline: true }} />

<!-- Soft Style Story -->
<Story name="Soft Style" args={{ keys: ['Esc'], variant: 'info', soft: true }} />

<!-- Multiple Shortcuts Story -->
<Story
	name="Multiple Shortcuts"
	args={{
		keys: [
			['Ctrl', 'K'],
			['Cmd', 'K']
		],
		variant: 'warning'
	}}
/>

<!-- Custom Separator Story -->
<Story
	name="Custom Separator"
	args={{ keys: ['Ctrl', 'Shift', 'N'], separator: '/', variant: 'secondary' }}
/>

<!-- Disabled State Story -->
<Story name="Disabled State" args={{ keys: ['Ctrl', 'Z'], variant: 'neutral', disabled: true }} />

<!-- Playground -->
<Story
	name="Playground"
	args={{
		keys: ['Ctrl', 'K'],
		variant: 'neutral',
		size: 'md',
		outline: false,
		soft: false,
		separator: '+',
		disabled: false
	}}
/>
