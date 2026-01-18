<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from '../../core/layout/Container.svelte';
	import Card from '../../core/layout/Card.svelte';
	import Grid from '../../core/layout/Grid.svelte';
	import Separator from '../../core/layout/Separator.svelte';
	import Spacer from '../../core/layout/Spacer.svelte';
	import Heading from '../../core/typography/Heading.svelte';
	import Paragraph from '../../core/typography/Paragraph.svelte';
	import Divider from '../../core/layout/Divider.svelte';

	interface Props {
		/** Main heading of the auth card */
		title?: string;
		/** Subtext under the heading */
		subtitle?: string;
		/** Optional logo image source */
		logoUrl?: string;
		/** Alt text for the logo */
		logoAlt?: string;
		/** Main content of the auth form */
		children?: Snippet;
		/** Optional footer content for links */
		footer?: Snippet;
		/** Show a loading indicator and disable content */
		loading?: boolean;
		/** Show social login section with divider */
		showSocialLogin?: boolean;
		/** Custom social buttons snippet */
		socialButtons?: Snippet;
		/** Divider text for social section */
		socialDividerText?: string;
	}

	const {
		title,
		subtitle,
		logoUrl,
		logoAlt = 'Logo',
		children,
		footer,
		loading = false,
		showSocialLogin = false,
		socialButtons,
		socialDividerText = 'Or continue with'
	}: Props = $props();
</script>

<div
	role="main"
	aria-labelledby={title ? 'auth-title' : undefined}
	class="bg-base-200 flex min-h-screen flex-col justify-center py-12"
>
	<Container maxWidth="md" centered padding="md">
		<!-- Logo -->
		{#if logoUrl}
			<img class="mx-auto h-12 w-auto" src={logoUrl} alt={logoAlt} />
			<Spacer size="lg" />
		{/if}

		<!-- Title -->
		{#if title}
			<div id="auth-title">
				<Heading level="h2" align="center" text={title} />
			</div>
			<Spacer size="xs" />
		{/if}

		<!-- Subtitle -->
		{#if subtitle}
			<Paragraph variant="muted" align="center" text={subtitle} />
			<Spacer size="lg" />
		{/if}

		<!-- Auth Card -->
		<Card shadow {loading}>
			{#snippet children()}
				{#if children}
					{@render children()}
				{/if}

				{#if showSocialLogin && socialButtons}
					<Divider label={socialDividerText} class="my-6" />
					<Grid columns={2} gap="sm">
						{#snippet children()}
							{@render socialButtons()}
						{/snippet}
					</Grid>
				{/if}

				{#if footer}
					<Separator spacing="lg" />
					{@render footer()}
				{/if}
			{/snippet}
		</Card>
	</Container>
</div>
