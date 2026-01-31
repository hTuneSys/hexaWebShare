<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NavBar from './NavBar.svelte';

	const { Story } = defineMeta({
		title: 'Utility/Utility/NavBar',
		tags: ['autodocs'],
		argTypes: {
			position: {
				control: 'select',
				options: ['static', 'sticky', 'fixed']
			},
			shadow: { control: 'boolean' },
			bordered: { control: 'boolean' },
			glass: { control: 'boolean' },
			container: { control: 'boolean' },
			itemVariant: {
				control: 'select',
				options: ['pill', 'underline', 'bordered', 'ghost']
			},
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg']
			},
			itemColor: {
				control: 'select',
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				]
			},
			variant: {
				control: 'select',
				options: [
					'base',
					'neutral',
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error',
					'ghost'
				]
			}
		}
	});
</script>

<script lang="ts">
	import Avatar from '../../core/media/Avatar.svelte';
	import Badge from '../../core/media/Badge.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Icon from '../../core/media/Icon.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';
	import Menu from '../../core/overlay-navigation/Menu.svelte';
	import SearchInput from '../../core/forms/SearchInput.svelte';
	import Container from '../../core/layout/Container.svelte';
	import Row from '../../core/layout/Row.svelte';
	import Col from '../../core/layout/Col.svelte';
	import Dropdown from '../../core/overlay-navigation/Dropdown.svelte';

	const defaultItems = [
		{ label: 'Home', href: '#', active: true },
		{ label: 'Components', href: '#' },
		{ label: 'Resources', href: '#' },
		{ label: 'About', href: '#' }
	];

	const brandConfig = {
		label: 'hexaWebShare',
		href: '#'
	};
</script>

<!-- Default NavBar -->
<Story name="Default">
	<NavBar brand={brandConfig} items={defaultItems} />
</Story>

<!-- With Actions -->
<Story name="With Actions">
	<NavBar brand={brandConfig} items={defaultItems} shadow={true} right={profileActions} />
</Story>

{#snippet profileActions()}
	<Row gap="4" align="center" class="justify-end px-2">
		<Col hideBelow="lg">
			<SearchInput placeholder="Search..." size="sm" class="w-48 lg:w-64" />
		</Col>

		<Dropdown align="end">
			{#snippet trigger()}
				<div class="btn btn-ghost btn-circle avatar h-8 min-h-0 w-8 border-none ring-0">
					<Avatar
						src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
						size="xs"
					/>
				</div>
			{/snippet}
			<Menu
				items={[
					{ id: 1, label: 'Profile', href: '#' },
					{ id: 2, label: 'Settings', href: '#' },
					{ id: 3, label: 'Logout', href: '#' }
				]}
				class="dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-1 w-52 p-2 shadow"
			/>
		</Dropdown>
	</Row>
{/snippet}

<!-- Primary Variant -->
<Story name="Primary Variant">
	<NavBar brand={brandConfig} items={defaultItems} variant="primary" shadow={true} />
</Story>

<!-- Neutral Variant -->
<Story name="Neutral Variant">
	<NavBar brand={brandConfig} items={defaultItems} variant="neutral" />
</Story>

<!-- Bordered Container -->
<Story name="Bordered Container">
	<NavBar brand={brandConfig} items={defaultItems} container={true} bordered={true} shadow={true} />
</Story>

<!-- Ghost/Transparent (Glass effect) -->
<Story name="Glass Effect">
	<div class="rounded-box border-base-300 relative h-64 w-full overflow-hidden border">
		<NavBar brand={brandConfig} items={defaultItems} variant="ghost" glass={true} shadow={true} />
		<div
			class="-mt-16 flex h-full w-full items-center justify-center bg-cover bg-center"
			style="background-image: url('https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp');"
		>
			<Text text="Background content under glass navbar" class="text-lg font-bold text-white" />
		</div>
	</div>
</Story>

<!-- Sticky Position -->
<Story name="Sticky Position">
	<div class="rounded-box border-base-300 relative h-96 overflow-y-auto border">
		<NavBar brand={brandConfig} items={defaultItems} position="sticky" shadow={true} />
		<div class="h-[200%] space-y-4 p-4">
			{#each Array(10) as _}
				<Text
					text="Scroll down to see the sticky behavior. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					display="block"
				/>
			{/each}
		</div>
	</div>
</Story>

<!-- Item Variant: Underline -->
<Story name="Item Variant: Underline">
	<NavBar
		brand={brandConfig}
		items={defaultItems}
		itemVariant="underline"
		shadow={true}
		variant="base"
	/>
</Story>

<!-- Item Variant: Bordered -->
<Story name="Item Variant: Bordered">
	<NavBar brand={brandConfig} items={defaultItems} itemVariant="bordered" shadow={true} />
</Story>

<!-- Item Colors -->
<Story name="Item Colors">
	<NavBar
		brand={brandConfig}
		items={[
			{ label: 'Home', href: '#', active: true, color: 'primary' },
			{ label: 'Components', href: '#', color: 'secondary' },
			{ label: 'Resources', href: '#', color: 'accent' },
			{ label: 'About', href: '#', color: 'info' }
		]}
		itemVariant="underline"
		shadow={true}
	/>
</Story>

<!-- Brand Color -->
<Story name="Brand Color">
	<NavBar brand={{ ...brandConfig, color: 'primary' }} items={defaultItems} shadow={true} />
</Story>

<!-- Item Variant: Ghost -->
<Story name="Item Variant: Ghost">
	<NavBar brand={brandConfig} items={defaultItems} itemVariant="ghost" />
</Story>

<!-- Playground -->
<Story name="Playground">
	<NavBar
		brand={brandConfig}
		items={defaultItems}
		position="static"
		shadow={false}
		bordered={false}
		glass={false}
		container={false}
		size="md"
		itemVariant="pill"
		variant="base"
		itemColor="primary"
	/>
</Story>
