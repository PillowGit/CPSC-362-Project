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
    /* Holds the logo, title, and button */ 
    .container {
        /* Center items within grid */
        display: grid;
        place-items: center;
        /* Center the grid itself */
        width: 50%;
        height: 80%;
        margin-top: 10%;
        margin-bottom: 10%;
        margin-left: 25%;
        margin-right: 25%;
    }
    .errortext {
        color: red;
        text-align: center;
        padding-top: 10rem;
    }
</style>