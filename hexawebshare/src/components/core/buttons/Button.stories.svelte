<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';
  import { fn } from 'storybook/test';
  const { Story } = defineMeta({
    title: 'Core/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error', 'ghost', 'link'],
      },
      size: {
        control: { type: 'select' },
        options: ['xs', 'sm', 'md', 'lg'],
      },
      outline: { control: 'boolean' },
      wide: { control: 'boolean' },
      block: { control: 'boolean' },
      glass: { control: 'boolean' },
      disabled: { control: 'boolean' },
      loading: { control: 'boolean' },
    },
    args: {
      onclick: fn(),
    }
  });
</script>
<!-- Variant Stories -->
<Story name="Primary" args={{ variant: 'primary', label: 'Primary Button' }} />
<Story name="Secondary" args={{ variant: 'secondary', label: 'Secondary' }} />
<Story name="Accent" args={{ variant: 'accent', label: 'Accent' }} />
<Story name="Info" args={{ variant: 'info', label: 'Info' }} />
<Story name="Success" args={{ variant: 'success', label: 'Success' }} />
<Story name="Warning" args={{ variant: 'warning', label: 'Warning' }} />
<Story name="Error" args={{ variant: 'error', label: 'Error' }} />
<Story name="Ghost" args={{ variant: 'ghost', label: 'Ghost' }} />
<!-- Size Stories -->
<Story name="Extra Small" args={{ size: 'xs', label: 'XS' }} />
<Story name="Small" args={{ size: 'sm', label: 'Small' }} />
<Story name="Medium" args={{ size: 'md', label: 'Medium' }} />
<Story name="Large" args={{ size: 'lg', label: 'Large' }} />
<!-- Style Variants -->
<Story name="Outline" args={{ variant: 'primary', outline: true, label: 'Outline' }} />
<Story name="Wide" args={{ variant: 'primary', wide: true, label: 'Wide Button' }} />
<Story name="Block" args={{ variant: 'primary', block: true, label: 'Block Button' }} />
<Story name="Glass" args={{ variant: 'primary', glass: true, label: 'Glass Effect' }} />
<Story name="Disabled" args={{ variant: 'primary', disabled: true, label: 'Disabled' }} />
<Story name="Loading" args={{ variant: 'primary', loading: true, label: 'Loading...' }} />
