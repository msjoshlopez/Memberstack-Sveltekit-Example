<script lang="ts">
import { appData } from '../stores/memberstackStore'
import Section from '../components/Section.svelte'
import Card from '../components/Card.svelte'
</script>

<Section>
    <Card>
        <h1>Welcome to Memberstack with SvelteKit!</h1>
        {#if $appData}
            <p><b>Currently Showing App:</b> <br />{$appData.name}</p>
            <p><b>App Id:</b> <br />{$appData.id}</p>
        {:else}
            <p>App data is not available.</p>
            <p>Please update the <i>/lib/memberstack.js</i> file with your <a href="https://app.memberstack.com/devtools" target="_blank">Memberstack public key</a>.</p>
        {/if}
        <p>Visit the Memberstack <a href="https://docs.memberstack.com/hc/en-us/" target="_blank">Help Center</a> to read more.</p>
    </Card>
</Section>

<style>
    h1 {
        color: #333;
        line-height: 1.2;
        margin-bottom: 2rem;
    }
    p {
        color: #333;
        margin-bottom: 1rem;
    }
</style>