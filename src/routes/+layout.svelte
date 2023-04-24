<script>
	import { onMount } from 'svelte';
    import { getCurrentApp, getCurrentMember, addAuthListener } from '../stores/memberstackStore'
	import Navbar from '../components/Navbar.svelte';

    // This layout is used for all pages and that is why we are 
    // adding the Memberstack app and member data to the store
	onMount(async () => {
        await getCurrentApp()
        await getCurrentMember()
        await addAuthListener()
	});    
</script>

<!-- Router Slot -->
<Navbar />
<slot />