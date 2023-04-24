<script>
    import { onMount } from 'svelte';
    import { memberData } from '../../stores/memberstackStore';
    import { goto } from '$app/navigation';

    // using a this to protect the route. Didnt use hook because memberstack is front end only
    // If you have a better solution please add a pull request for it!
    onMount(() => {
        if (!$memberData) {
            goto('/login');
        }
    });
</script>

{#if $memberData}
    <slot />
{/if}