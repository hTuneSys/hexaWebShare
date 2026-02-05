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
	import { siGoogle, siApple } from 'simple-icons';

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
		<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" role="img">
			<path d={siGoogle.path} />
		</svg>
		<span>Google</span>
	</IconButton>
	<IconButton variant="ghost" ariaLabel="Sign in with Apple">
		<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" role="img">
			<path d={siApple.path} />
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
			<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" role="img">
				<path d={siGoogle.path} />
			</svg>
			<span>Continue with Google</span>
		</IconButton>
		<IconButton variant="ghost" ariaLabel="Continue with Apple">
			<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" role="img">
				<path d={siApple.path} />
			</svg>
			<span>Continue with Apple</span>
		</IconButton>
		<IconButton variant="ghost" ariaLabel="Continue with Microsoft">
			<!-- 
				NOTE: Raw HTML SVG path is intentional here.
				TECHNICAL REASON: Microsoft brand logo is not available in simple-icons library v16.7.0
				ATTEMPTED SOLUTIONS:
				1. Checked for siMicrosoft, siWindows, si365 - none exist in package
				2. Microsoft Office/Azure icons are separate and don't match the standard Microsoft logo
				CONSEQUENCE: Using simple-icons would require different brand icon or custom component
				VALIDATION: Verified with `Object.keys(require('simple-icons'))` - no matching export
				TODO: Consider creating custom BrandIcon component or update when simple-icons adds Microsoft logo
			-->
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
