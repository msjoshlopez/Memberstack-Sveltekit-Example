<script>
    import { goto } from '$app/navigation';
	import Card from '../../components/Card.svelte';
	import Section from '../../components/Section.svelte';
    import { loginMemberWithEmailPassword } from '../../stores/memberstackStore';

	let email = '';
	let password = '';

	const login = async () => {
		// check if email is valid
		if (!email) {
			alert('Please enter an email');
			return;
		} else if (!email.includes('@')) {
			alert('Please enter a valid email');
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

		// login member
        await loginMemberWithEmailPassword(email, password)

        // clear the form
        email = '';
        password = '';

        // redirect to the profile page
        goto('/profile');

	};
</script>

<Section>
	<Card>
		<h2>Login</h2>
		<form on:submit|preventDefault={login}>
			<div>
				<label for="email">Email</label>
				<input type="email" name="email" id="email" bind:value={email} autocomplete="email" />
			</div>
			<div>
				<div class="flex-row">
					<label for="password">Password</label> <a href="/forgot-password" tabindex="-1">Forgot Password?</a>
				</div>
				<input type="password" name="password" id="password" bind:value={password} autocomplete="current-password" />
			</div>
			<div>
				<button type="submit">Login</button>
			</div>
		</form>
	</Card>
</Section>

<style>
	h2 {
		margin-bottom: 1rem;
		margin-top: 0;
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
	form div button {
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
</style>
