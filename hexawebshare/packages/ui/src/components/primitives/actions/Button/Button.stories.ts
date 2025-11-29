// SPDX-FileCopyrightText: 2025 hexaTune LLC
// SPDX-License-Identifier: MIT

import type { Meta, StoryObj } from '@storybook/svelte';
import Button from './Button.svelte';

const meta = {
  title: 'Primitives/Actions/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link']
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'neutral']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' }
  }
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    children: 'Primary Button'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    color: 'primary',
    size: 'md',
    children: 'Outline Button'
  }
};

export const Loading: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    loading: true,
    children: 'Loading...'
  }
};

export const FullWidth: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    fullWidth: true,
    children: 'Full width button'
  }
};

