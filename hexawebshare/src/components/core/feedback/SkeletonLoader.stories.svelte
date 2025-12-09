<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkeletonLoader from './SkeletonLoader.svelte';

	const { Story } = defineMeta({
		title: 'Core/Feedback/SkeletonLoader',
		component: SkeletonLoader,
		tags: ['autodocs'],
		argTypes: {
			shape: {
				control: { type: 'select' },
				options: ['rect', 'text', 'pill', 'circle'],
				description: 'Visual shape of the skeleton element'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Height scale for the skeleton'
			},
			width: {
				control: { type: 'select' },
				options: ['short', 'medium', 'long', 'full'],
				description: 'Width preset for rectangular or text skeletons'
			},
			variant: {
				control: { type: 'select' },
				options: [
					'base',
					'neutral',
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color theme of the skeleton'
			},
			lines: {
				control: { type: 'number', min: 1, max: 10 },
				description: 'Number of stacked lines (for text shape)'
			},
			gap: {
				control: { type: 'select' },
				options: ['none', 'sm', 'md'],
				description: 'Vertical spacing between stacked lines'
			},
			animated: {
				control: { type: 'boolean' },
				description: 'Enable shimmer animation'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for assistive technologies'
			}
		},
		args: {
			shape: 'rect',
			size: 'md',
			width: 'medium',
			variant: 'base',
			lines: 1,
			gap: 'sm',
			animated: true,
			ariaLabel: 'Loading content'
		}
	});
</script>

<Story name="Default" />

<Story name="Text Lines" args={{ shape: 'text', lines: 3, width: 'long', gap: 'md' }} />

<Story name="Circle" args={{ shape: 'circle', size: 'lg', variant: 'primary' }} />

<Story name="Pill" args={{ shape: 'pill', size: 'sm', width: 'long', variant: 'accent' }} />

<Story name="Full Width" args={{ shape: 'rect', width: 'full', size: 'lg', variant: 'neutral' }} />

<Story
	name="No Animation"
	args={{ animated: false, shape: 'rect', width: 'long', variant: 'info' }}
/>

<Story name="Variant Showcase">
	<div class="flex flex-col gap-4">
		<SkeletonLoader variant="primary" width="long" />
		<SkeletonLoader variant="secondary" width="long" />
		<SkeletonLoader variant="success" width="long" />
		<SkeletonLoader variant="warning" width="long" />
		<SkeletonLoader variant="error" width="long" />
	</div>
</Story>

<Story name="Card Placeholder">
	<div class="flex flex-col gap-3 rounded-xl border border-base-200 p-4">
		<div class="flex items-center gap-3">
			<SkeletonLoader shape="circle" size="sm" variant="neutral" />
			<div class="flex-1">
				<SkeletonLoader shape="text" lines={2} width="long" gap="sm" />
			</div>
		</div>
		<SkeletonLoader shape="rect" width="full" size="lg" />
		<SkeletonLoader shape="text" lines={3} width="long" gap="sm" />
	</div>
</Story>
