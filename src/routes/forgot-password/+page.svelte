<script>
	import { goto } from '$app/navigation';
	import Card from '../../components/Card.svelte';
	import Section from '../../components/Section.svelte';
	import { sendMemberResetPasswordEmail, resetMemberPassword } from '../../stores/memberstackStore';

	let email = '';
	let password = '';
	let confirmPassword = '';
	let token = '';
	let showTokenForm = false;

	const sendForgotPasswordEmail = async () => {
		// check if email is valid
		if (!email) {
			alert('Please enter an email');
			return;
		} else if (!email.includes('@')) {
			alert('Please enter a valid email');
			return;
		}

		// send forgot password email
		await sendMemberResetPasswordEmail(email);

		// clear the form
		email = '';

		// show the token form
		showTokenForm = true;
	};

	const updatePasswordWithToken = async () => {
		// check if token is valid
		if (!token) {
			alert('Please enter a token');
			return;
		}
		// check if password is valid
		if (!password) {
			alert('Please enter a password');
			return;
		} else if (password.length < 8) {
			alert('Password must be at least 8 characters');
			return;
		}
		// check if confirm password is valid
		if (!confirmPassword) {
			alert('Please enter a confirm password');
			return;
		} else if (confirmPassword.length < 8) {
			alert('Confirm Password must be at least 8 characters');
			return;
		}
		// check if passwords match
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		// update password with token
		await resetMemberPassword(token, password);

		// clear the form
		token = '';
		password = '';
		confirmPassword = '';

		// redirect to the login page
		goto('/login');
	};
</script>

<Section>
	<Card>
		<div class="reset-form">
			{#if showTokenForm}
				<button on:click={() => (showTokenForm = false)}>Reset Form</button>
			{/if}
		</div>
		{#if !showTokenForm}
			<div>
				<h2>Forgot Password</h2>
                <p>Enter your email to receive a password reset email.</p>
				<form on:submit|preventDefault={sendForgotPasswordEmail}>
					<div>
						<label for="email">Email</label>
						<input type="email" name="email" id="email" bind:value={email} autocomplete="email" />
					</div>
					<div class="action-buttons">
						<button class="primary-button" type="submit">Send Forgot Password Email</button>
                        <button class="secondary-button" type="button" on:click={() => (showTokenForm = true)}>Already Have A Token</button>
					</div>
				</form>
			</div>
		{:else}
			<div>
				<h2>Reset Password</h2>
				<p>Enter the token from your email and a new password.</p>
				<form on:submit|preventDefault={updatePasswordWithToken}>
					<div>
						<label for="token">Token</label>
						<input type="text" name="token" id="token" bind:value={token} />
					</div>
					<div>
						<label for="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							bind:value={password}
							autocomplete="new-password"
						/>
					</div>
					<div>
						<label for="confirm-password">Confirm Password</label>
						<input
							type="password"
							name="confirm-password"
							id="confirm-password"
							bind:value={confirmPassword}
							autocomplete="new-password"
						/>
					</div>
					<div class="action-buttons">
						<button class="primary-button" type="submit">Reset Password</button>
					</div>
				</form>
			</div>
		{/if}
	</Card>
</Section>

<style>
	.reset-form {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		margin: 2rem;
	}
	.reset-form button {
		padding: 0.5rem;
		border-radius: 5px;
		background-color: #ccc;
		border: 1px solid #ccc;
		font-size: 1rem;
		cursor: pointer;
	}
	h2 {
		margin-bottom: 1rem;
		margin-top: 0;
	}
    p {
        margin-bottom: 2rem;
    }
	form {
		display: flex;
		flex-direction: column;
	}
	form div {
		margin-bottom: 1rem;
	}
	form div:last-child {
		margin-bottom: 0;
	}
	form div .flex-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0;
	}
	form div label {
		display: block;
		margin-bottom: 0.2rem;
		font-weight: bold;
		line-height: 1;
	}
	form div input {
		padding: 0.5rem;
		border-radius: 5px;
		border: 1px solid #ccc;
		font-size: 1rem;
		width: 100%;
	}
	form div button.primary-button {
		padding: 0.5rem;
		border-radius: 5px;
		border: 1px solid #ccc;
		font-size: 1rem;
		width: 100%;
		background: #2ecc71;
		color: #fff;
		cursor: pointer;
		margin-bottom: 0;
	}
    form div button.secondary-button {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 1rem;
        width: 100%;
        background: #ccc;
        color: #000;
        cursor: pointer;
        margin-bottom: 0;
    }
    form div.action-buttons {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        flex-direction: column;
        align-items: center;
    }
</style>
