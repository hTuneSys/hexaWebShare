<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Dropdown, { type DropdownItem } from '../../core/overlay-navigation/Dropdown.svelte';

	/**
	 * Language interface for language options
	 */
	export interface Language {
		/**
		 * Language code (e.g., 'en', 'tr', 'es')
		 */
		code: string;
		/**
		 * Display label for the language
		 */
		label: string;
		/**
		 * Optional flag emoji or icon identifier
		 */
		flag?: string;
		/**
		 * Whether this language is disabled
		 * @default false
		 */
		disabled?: boolean;
	}

	/**
	 * Props interface for the LanguageSwitcher component
	 */
	interface Props {
		/**
		 * Array of available languages
		 */
		languages: Language[];
		/**
		 * Currently selected language code (controlled)
		 */
		value?: string;
		/**
		 * Default selected language code (uncontrolled)
		 */
		defaultValue?: string;
		/**
		 * Position of dropdown content relative to trigger
		 * @default 'bottom'
		 */
		position?: 'bottom' | 'top' | 'left' | 'right';
		/**
		 * Alignment of dropdown content
		 * @default 'end'
		 */
		align?: 'start' | 'end';
		/**
		 * Visual variant of the dropdown trigger
		 * @default 'ghost'
		 */
		variant?: 'default' | 'bordered' | 'ghost';
		/**
		 * Size preset for the dropdown
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Whether the language switcher is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the language switcher is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether to show language code alongside label
		 * @default false
		 */
		showCode?: boolean;
		/**
		 * Whether to show flag icons
		 * @default true
		 */
		showFlag?: boolean;
		/**
		 * Custom label for the trigger button (overrides selected language display)
		 */
		customLabel?: string;
		/**
		 * Accessible label for the language switcher
		 */
		ariaLabel?: string;
		/**
		 * Callback when selected language changes
		 */
		onChange?: (languageCode: string, language: Language) => void;
		/**
		 * Additional CSS classes for the container
		 */
		class?: string;
	}

	const {
		languages,
		value,
		defaultValue,
		position = 'bottom',
		align = 'end',
		variant = 'ghost',
		size = 'md',
		disabled = false,
		loading = false,
		showCode = false,
		showFlag = true,
		customLabel,
		ariaLabel,
		onChange,
		class: className = '',
		...props
	}: Props = $props();

	// Controlled vs uncontrolled mode
	const isControlled = value !== undefined;
	let internalValue = $state(defaultValue || languages[0]?.code || '');

	// Update internalValue when defaultValue changes (for Storybook controls)
	$effect(() => {
		if (!isControlled && defaultValue !== undefined) {
			const languageExists = languages.find((lang) => lang.code === defaultValue);
			if (languageExists && !languageExists.disabled) {
				internalValue = defaultValue;
			}
		}
	});

	// Compute actual selected value
	let selectedValue = $derived(isControlled ? value || languages[0]?.code || '' : internalValue);

	// Find selected language object
	let selectedLanguage = $derived(
		languages.find((lang) => lang.code === selectedValue) || languages[0]
	);

	// Convert languages to dropdown items
	let dropdownItems = $derived(
		languages.map((lang) => {
			const item: DropdownItem = {
				id: lang.code,
				label: lang.label,
				icon: showFlag && lang.flag ? lang.flag : undefined,
				disabled: lang.disabled || false
			};

			if (showCode) {
				item.description = lang.code.toUpperCase();
			}

			return item;
		})
	);

	// Generate trigger label
	let triggerLabel = $derived.by(() => {
		if (customLabel) return customLabel;
		if (!selectedLanguage) return 'Select Language';

		let label = '';
		if (showFlag && selectedLanguage.flag) {
			label = `${selectedLanguage.flag} `;
		}
		label += selectedLanguage.label;
		if (showCode) {
			label += ` (${selectedLanguage.code.toUpperCase()})`;
		}
		return label;
	});

	// Handle language change
	function handleItemClick(item: DropdownItem, index: number) {
		const languageCode = item.id.toString();
		const language = languages.find((lang) => lang.code === languageCode);
		if (!language || language.disabled || disabled) return;

		if (!isControlled) {
			internalValue = languageCode;
		}
		onChange?.(languageCode, language);
	}

	// Handle open change (for accessibility)
	function handleOpenChange(open: boolean) {
		// Can be extended for analytics or other purposes
	}
</script>

<Dropdown
	items={dropdownItems}
	label={triggerLabel}
	{position}
	{align}
	{variant}
	{size}
	{disabled}
	{loading}
	ariaLabel={ariaLabel || 'Language switcher'}
	closeOnSelect={true}
	onItemClick={handleItemClick}
	onOpenChange={handleOpenChange}
	class={className}
	{...props}
/>
