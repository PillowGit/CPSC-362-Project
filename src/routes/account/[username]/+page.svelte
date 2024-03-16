<script>
    // Reuse navbar and pagecolor
    import Navbar from '$lib/navbar.svelte';
    import PageColor from '$lib/pagecolor.svelte';
    // Get data from server load
    export let data;
</script>

<PageColor />
<Navbar />
{#if data?.error}
<h1 class="errortext">
    {data.error}
</h1>
{:else}
<h1 class="errortext">
    Authorized :)
</h1>
{/if}

<style>
    .errortext {
        color: red;
        text-align: center;
        padding-top: 10rem;
    }
</style>