// SPDX-FileCopyrightText: 2025 hexaTune LLC
// SPDX-License-Identifier: MIT

interface Props {
	/**
	 * Visual type of the spinner animation
	 */
	type?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
	/**
	 * Size of the spinner
	 */
	size?: 'xs' | 'sm' | 'md' | 'lg';
	/**
	 * Color variant of the spinner
	 */
	variant?:
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'neutral'
		| 'info'
		| 'success'
		| 'warning'
		| 'error';
	/**
	 * Accessible label for screen readers
	 */
	ariaLabel?: string;
	/**
	 * Additional CSS classes
	 */
	class?: string;
}
declare const Spinner: import('svelte').Component<Props, {}, ''>;
type Spinner = ReturnType<typeof Spinner>;
export default Spinner;
