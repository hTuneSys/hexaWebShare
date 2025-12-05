// SPDX-FileCopyrightText: 2025 hexaTune LLC
// SPDX-License-Identifier: MIT

interface Props {
	/**
	 * Notification message content
	 */
	message: string;
	/**
	 * Optional notification title
	 */
	title?: string;
	/**
	 * Visual variant of the notification
	 */
	variant?: 'info' | 'success' | 'warning' | 'error';
	/**
	 * Size of the notification
	 */
	size?: 'sm' | 'md' | 'lg';
	/**
	 * Whether the notification can be dismissed
	 */
	dismissible?: boolean;
	/**
	 * Callback function when notification is closed
	 */
	onclose?: () => void;
	/**
	 * Custom icon slot
	 */
	icon?: import('svelte').Snippet;
}
declare const Notification: import('svelte').Component<Props, {}, ''>;
type Notification = ReturnType<typeof Notification>;
export default Notification;
