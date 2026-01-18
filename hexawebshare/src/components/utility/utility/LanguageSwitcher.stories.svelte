<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import LanguageSwitcher, { type Language } from './LanguageSwitcher.svelte';

	// Sample languages for stories
	const commonLanguages: Language[] = [
		{ code: 'en', label: 'English', flag: '🇺🇸' },
		{ code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
		{ code: 'es', label: 'Español', flag: '🇪🇸' },
		{ code: 'fr', label: 'Français', flag: '🇫🇷' },
		{ code: 'de', label: 'Deutsch', flag: '🇩🇪' }
	];

	const languagesWithCode: Language[] = [
		{ code: 'en', label: 'English', flag: '🇺🇸' },
		{ code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
		{ code: 'es', label: 'Español', flag: '🇪🇸' },
		{ code: 'fr', label: 'Français', flag: '🇫🇷' },
		{ code: 'de', label: 'Deutsch', flag: '🇩🇪' },
		{ code: 'it', label: 'Italiano', flag: '🇮🇹' },
		{ code: 'pt', label: 'Português', flag: '🇵🇹' }
	];

	const languagesWithoutFlags: Language[] = [
		{ code: 'en', label: 'English' },
		{ code: 'tr', label: 'Türkçe' },
		{ code: 'es', label: 'Español' },
		{ code: 'fr', label: 'Français' },
		{ code: 'de', label: 'Deutsch' }
	];

	const languagesWithDisabled: Language[] = [
		{ code: 'en', label: 'English', flag: '🇺🇸' },
		{ code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
		{ code: 'es', label: 'Español', flag: '🇪🇸', disabled: true },
		{ code: 'fr', label: 'Français', flag: '🇫🇷' },
		{ code: 'de', label: 'Deutsch', flag: '🇩🇪', disabled: true }
	];

	const { Story } = defineMeta({
		component: LanguageSwitcher,
		title: 'Utility/Utility/LanguageSwitcher',
		tags: ['autodocs'],
		argTypes: {
			languages: {
				control: 'object',
				description: 'Array of available languages'
			},
			value: {
				control: 'text',
				description: 'Currently selected language code (controlled)'
			},
			defaultValue: {
				control: 'text',
				description: 'Default selected language code (uncontrolled)'
			},
			position: {
				control: { type: 'select' },
				options: ['bottom', 'top', 'left', 'right'],
				description: 'Position of dropdown content relative to trigger'
			},
			align: {
				control: { type: 'select' },
				options: ['start', 'end'],
				description: 'Alignment of dropdown content'
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'ghost'],
				description: 'Visual variant of the dropdown trigger'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size preset for dropdown'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the language switcher'
			},
			loading: {
				control: 'boolean',
				description: 'Show loading state'
			},
			showCode: {
				control: 'boolean',
				description: 'Show language code alongside label'
			},
			showFlag: {
				control: 'boolean',
				description: 'Show flag icons'
			},
			customLabel: {
				control: 'text',
				description: 'Custom label for the trigger button'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the language switcher'
			},
			onChange: { action: 'onChange' }
		},
		args: {
			languages: commonLanguages,
			position: 'bottom',
			align: 'end',
			variant: 'ghost',
			size: 'md',
			disabled: false,
			loading: false,
			showCode: false,
			showFlag: true,
			onChange: fn()
		}
	});
</script>

<!-- Default -->
<Story name="Default" />

<!-- With Code -->
<Story name="With Code" args={{ languages: languagesWithCode, showCode: true, showFlag: true }} />

<!-- Without Flags -->
<Story name="Without Flags" args={{ languages: languagesWithoutFlags, showFlag: false }} />

<!-- Size Variants -->
<Story name="Small Size" args={{ size: 'sm' }} />
<Story name="Large Size" args={{ size: 'lg' }} />

<!-- Variant Styles -->
<Story name="Bordered Variant" args={{ variant: 'bordered' }} />

<!-- State Variants -->
<Story name="Disabled State" args={{ disabled: true }} />
<Story name="Loading State" args={{ loading: true }} />
<Story name="With Disabled Languages" args={{ languages: languagesWithDisabled }} />

<!-- Playground -->
<Story
	name="Playground"
	args={{
		languages: languagesWithCode,
		value: 'en',
		position: 'bottom',
		align: 'end',
		variant: 'ghost',
		size: 'md',
		disabled: false,
		loading: false,
		showCode: false,
		showFlag: true,
		onChange: fn()
	}}
/>
