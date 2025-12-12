import type { Meta, StoryObj } from '@storybook/sveltekit';
import ModalStoryWrapper from './ModalStoryWrapper.svelte';

// Define metadata
const meta = {
	title: 'Core/Overlay Navigation/Modal',
	component: ModalStoryWrapper,
	tags: ['autodocs'],
	argTypes: {
		open: { control: 'boolean' },
		title: { control: 'text' },
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', null]
		},
		// We use string 'null' for select option, but in props it should be handled carefully if passing to component.
		// Actually, DaisyUI logic checks for specific strings.
		closeOnBackdrop: { control: 'boolean' },
		content: { control: 'text' },
		showActions: { control: 'boolean' }
	},
	args: {
		onclose: () => console.log('closed')
	}
} satisfies Meta<ModalStoryWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
	args: {
		open: true,
		title: 'Basic Modal',
		content: 'This is a simple modal using the wrapper.'
	}
};

export const WithActions: Story = {
	args: {
		open: true,
		title: 'Confirmation Modal',
		content:
			'Are you sure you want to delete this item? This action demonstrates the modal-action slot simulation.',
		showActions: true
	}
};

export const LargeSize: Story = {
	args: {
		open: true,
		title: 'Large Modal',
		size: 'lg',
		content: 'This modal uses max-w-lg size class. It is wider than default.'
	}
};
