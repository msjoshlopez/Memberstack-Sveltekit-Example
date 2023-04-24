<script>
	import Section from '../../components/Section.svelte';
	import Card from '../../components/Card.svelte';
	import { memberData, appData, updateMemberCustomFields } from '../../stores/memberstackStore';

	// filter out the hidden fields and map the key and label to the object
	// @ts-ignore
	let customFields = $appData.customFields
		// @ts-ignore
		.filter((field) => !field.hidden)
		// @ts-ignore
		.map((field) => {
			return {
				key: field.key,
				label: field.label,
				value: $memberData.customFields[field.key] || ''
			};
		});

	const updateCustomField = async () => {
		// convert the array of objects into an object
		// @ts-ignore
		let updatedCustomFields = customFields.reduce((obj, field) => {
			obj[field.key] = field.value;
			return obj;
		}, {});

		await updateMemberCustomFields(updatedCustomFields);
	};
</script>

<Section>
	<div>
		{#if $memberData && $memberData.customFields['full-name']}
			<h1>Welcome {$memberData.customFields['full-name']}!</h1>
		{:else}
			<h1>Welcome friend!</h1>
		{/if}

		{#if customFields}
			<Card>
				<h2>Edit Custom Fields</h2>
				<form on:submit|preventDefault={updateCustomField}>
					{#each customFields as field, index}
						<div>
							<label for={field.key}>{field.label}</label>
							<input type="text" name={field.key} id={'field-' + index} bind:value={field.value} />
						</div>
					{/each}
					<div>
						<button type="submit">Update Custom Fields</button>
					</div>
				</form>
            </Card>
		{/if}
	</div>
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
