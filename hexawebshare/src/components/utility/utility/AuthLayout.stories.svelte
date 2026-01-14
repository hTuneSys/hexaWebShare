<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AuthLayout from './AuthLayout.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';
	import Alert from '../../core/feedback/Alert.svelte';
	import Input from '../../core/forms/Input.svelte';
	import Checkbox from '../../core/forms/Checkbox.svelte';
	import DatePicker from '../../core/forms/DatePicker.svelte';
	import Link from '../../core/typography/Link.svelte';
	import Paragraph from '../../core/typography/Paragraph.svelte';
	import Grid from '../../core/layout/Grid.svelte';

	const { Story } = defineMeta({
		title: 'Utility/Utility/AuthLayout',
		component: AuthLayout,
		tags: ['autodocs'],
		argTypes: {
			title: { control: 'text' },
			subtitle: { control: 'text' },
			logoUrl: { control: 'text' },
			logoAlt: { control: 'text' },
			loading: { control: 'boolean' },
			showSocialLogin: { control: 'boolean' },
			socialDividerText: { control: 'text' },
			size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
			shadow: { control: 'boolean' }
		}
	});
</script>

<!-- ====== SOCIAL BUTTONS SNIPPET ====== -->
{#snippet socialButtonsSnippet()}
	<IconButton variant="ghost" ariaLabel="Sign in with Google">
		<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
			<path
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
				fill="#4285F4"
			/>
			<path
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				fill="#34A853"
			/>
			<path
				d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
				fill="#FBBC05"
			/>
			<path
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
				fill="#EA4335"
			/>
		</svg>
		<span>Google</span>
	</IconButton>
	<IconButton variant="ghost" ariaLabel="Sign in with Apple">
		<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
			<path
				d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
			/>
		</svg>
		<span>Apple</span>
	</IconButton>
{/snippet}

<!-- ====== FORM SNIPPETS ====== -->

{#snippet simpleLoginForm()}
	<form class="space-y-6">
		<Input
			label="Email address"
			type="email"
			name="email"
			required
			placeholder="name@example.com"
		/>
		<Input label="Password" type="password" name="password" required placeholder="••••••••" />
		<Button label="Sign in" block variant="primary" />
	</form>
{/snippet}

{#snippet loginFormWithRemember()}
	<form class="space-y-4">
		<Input
			label="Email address"
			type="email"
			name="email"
			required
			placeholder="name@example.com"
		/>
		<Input label="Password" type="password" name="password" required placeholder="••••••••" />
		<div class="flex items-center justify-between">
			<Checkbox label="Remember me" name="remember" variant="primary" size="sm" />
			<Link href="#" label="Forgot password?" size="sm" variant="primary" />
		</div>
		<Button label="Sign in" block variant="primary" />
	</form>
{/snippet}

{#snippet registerForm()}
	<form class="space-y-4">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<Input label="First name" type="text" name="firstName" required placeholder="John" />
			<Input label="Last name" type="text" name="lastName" required placeholder="Doe" />
		</div>
		<Input
			label="Email address"
			type="email"
			name="email"
			required
			placeholder="name@example.com"
		/>
		<DatePicker label="Date of birth" name="birthDate" required />
		<Input
			label="Password"
			type="password"
			name="password"
			required
			placeholder="••••••••"
			helpText="Must be at least 8 characters"
		/>
		<Input
			label="Confirm password"
			type="password"
			name="confirmPassword"
			required
			placeholder="••••••••"
		/>
		<Checkbox
			label="I agree to the Terms of Service and Privacy Policy"
			name="terms"
			required
			variant="primary"
		/>
		<Button label="Create account" block variant="primary" />
	</form>
{/snippet}

{#snippet socialOnlyForm()}
	<Grid columns={1} gap="sm">
		<IconButton variant="ghost" ariaLabel="Continue with Google">
			<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
				<path
					d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
					fill="#4285F4"
				/>
				<path
					d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
					fill="#34A853"
				/>
				<path
					d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
					fill="#FBBC05"
				/>
				<path
					d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
					fill="#EA4335"
				/>
			</svg>
			<span>Continue with Google</span>
		</IconButton>
		<IconButton variant="ghost" ariaLabel="Continue with Apple">
			<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
				<path
					d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
				/>
			</svg>
			<span>Continue with Apple</span>
		</IconButton>
		<IconButton variant="ghost" ariaLabel="Continue with Microsoft">
			<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
				<path d="M11.4 24H0V12.6h11.4V24z" fill="#00A4EF" />
				<path d="M24 24H12.6V12.6H24V24z" fill="#FFB900" />
				<path d="M11.4 11.4H0V0h11.4v11.4z" fill="#F25022" />
				<path d="M24 11.4H12.6V0H24v11.4z" fill="#7FBA00" />
			</svg>
			<span>Continue with Microsoft</span>
		</IconButton>
	</Grid>
{/snippet}

{#snippet forgotPasswordForm()}
	<form class="space-y-6">
		<Paragraph
			variant="muted"
			size="sm"
			text="Enter your email address and we'll send you a link to reset your password."
		/>
		<Input
			label="Email address"
			type="email"
			name="email"
			required
			placeholder="name@example.com"
		/>
		<Button label="Send reset link" block variant="primary" />
	</form>
{/snippet}

{#snippet twoFactorForm()}
	<form class="space-y-6">
		<Paragraph
			variant="muted"
			size="sm"
			align="center"
			text="Enter the 6-digit code sent to your email or authenticator app."
		/>
		<div class="flex justify-center gap-2">
			<Input type="text" name="code1" maxlength={1} class="w-12 text-center text-xl" />
			<Input type="text" name="code2" maxlength={1} class="w-12 text-center text-xl" />
			<Input type="text" name="code3" maxlength={1} class="w-12 text-center text-xl" />
			<Input type="text" name="code4" maxlength={1} class="w-12 text-center text-xl" />
			<Input type="text" name="code5" maxlength={1} class="w-12 text-center text-xl" />
			<Input type="text" name="code6" maxlength={1} class="w-12 text-center text-xl" />
		</div>
		<Button label="Verify" block variant="primary" />
		<div class="text-center">
			<Link href="#" label="Didn't receive it? Resend code" size="sm" variant="primary" />
		</div>
	</form>
{/snippet}

{#snippet errorAlertForm()}
	<div class="space-y-6">
		<Alert
			variant="error"
			title="Invalid credentials"
			description="Please check your email and password and try again."
			closable
		/>
		{@render simpleLoginForm()}
	</div>
{/snippet}

<!-- ====== FOOTER SNIPPETS ====== -->

{#snippet loginFooter()}
	<div class="flex items-center justify-center gap-4">
		<Link href="#" label="Forgot password?" size="sm" variant="primary" />
		<span class="text-base-content/50">|</span>
		<Link href="#" label="Create account" size="sm" variant="primary" />
	</div>
{/snippet}

{#snippet registerFooter()}
	<div class="flex items-center justify-center gap-1">
		<span class="text-base-content/60 text-sm">Already have an account?</span>
		<Link href="#" label="Sign in" size="sm" variant="primary" />
	</div>
{/snippet}

{#snippet forgotPasswordFooter()}
	<div class="flex items-center justify-center">
		<Link href="#" label="Back to sign in" size="sm" variant="primary" />
	</div>
{/snippet}

<!-- ====== STORIES (10 Total) ====== -->

<!-- 1. Default - Simple Login -->
<Story
	name="Default"
	args={{
		title: 'Sign in to your account',
		subtitle: 'Or start your 14-day free trial',
		children: simpleLoginForm,
		footer: loginFooter
	}}
/>

<!-- 2. Complete Login - With Remember Me & Social -->
<Story
	name="Complete Login"
	args={{
		title: 'Sign in to your account',
		subtitle: 'Welcome back! Please enter your details.',
		children: loginFormWithRemember,
		showSocialLogin: true,
		socialButtons: socialButtonsSnippet,
		footer: loginFooter
	}}
/>

<!-- 3. Complete Register - Full Form & Social -->
<Story
	name="Complete Register"
	args={{
		title: 'Create your account',
		subtitle: 'Start your 14-day free trial. No credit card required.',
		children: registerForm,
		showSocialLogin: true,
		socialButtons: socialButtonsSnippet,
		footer: registerFooter
	}}
/>

<!-- 4. With Logo -->
<Story
	name="With Logo"
	args={{
		logoUrl: '/favicon.svg',
		logoAlt: 'hexaWebShare Logo',
		title: 'Welcome back',
		children: loginFormWithRemember,
		showSocialLogin: true,
		socialButtons: socialButtonsSnippet
	}}
/>

<!-- 5. Social Only - No Form Fields -->
<Story
	name="Social Only"
	args={{
		title: 'Continue with',
		subtitle: 'Choose your preferred sign-in method',
		children: socialOnlyForm,
		footer: loginFooter
	}}
/>

<!-- 6. Forgot Password -->
<Story
	name="Forgot Password"
	args={{
		title: 'Reset your password',
		children: forgotPasswordForm,
		footer: forgotPasswordFooter
	}}
/>

<!-- 7. Two-Factor Auth -->
<Story
	name="Two-Factor Auth"
	args={{
		title: 'Verify your identity',
		children: twoFactorForm,
		size: 'sm'
	}}
/>

<!-- 8. Loading State -->
<Story
	name="Loading State"
	args={{
		title: 'Processing...',
		loading: true,
		children: simpleLoginForm
	}}
/>

<!-- 9. Error State -->
<Story
	name="Error State"
	args={{
		title: 'Sign in to your account',
		children: errorAlertForm,
		footer: loginFooter
	}}
/>

<!-- 10. Playground - Interactive with all props -->
<Story
	name="Playground"
	args={{
		title: 'Interactive Auth Layout',
		subtitle: 'Customize this layout using the controls below',
		logoUrl: '/favicon.svg',
		logoAlt: 'Logo',
		children: loginFormWithRemember,
		showSocialLogin: true,
		socialButtons: socialButtonsSnippet,
		socialDividerText: 'Or continue with',
		footer: loginFooter,
		loading: false,
		size: 'md',
		shadow: true
	}}
/>
