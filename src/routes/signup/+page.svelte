<script>
	import { goto } from '$app/navigation';
	import Card from '../../components/Card.svelte';
	import Section from '../../components/Section.svelte';
	import { signupMemberWithEmailPassword } from '../../stores/memberstackStore';

	let fullName = '';
	let email = '';
	let password = '';
	let confirmPassword = '';

	const signup = async () => {
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
		// check if passwords match
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		const customFields = {
			'full-name': fullName
		};
		// const planId = 'pln_free-plan-uz1w0rju'
		// create a new member
		await signupMemberWithEmailPassword(email, password, customFields);

		// clear the form
		fullName = '';
		email = '';
		password = '';
		confirmPassword = '';

		// redirect to the profile page
		goto('/profile');
	};
</script>

<Section>
	<!-- make a card with a signup form in it -->
	<Card>
		<h2>Signup</h2>
		<form on:submit|preventDefault={signup}>
			<div>
				<label for="full-name">Full Name</label>
				<input type="text" name="full-name" id="fullName" bind:value={fullName} />
			</div>
			<div>
				<label for="email">Email</label>
				<input type="email" name="email" id="email" bind:value={email} autocomplete="email" />
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
			<div>
				<button type="submit">Signup</button>
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
