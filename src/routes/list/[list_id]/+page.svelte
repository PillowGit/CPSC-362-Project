<script>
    // This is the page where the actual to-do list is displayed
    // We have /list/[username] so that if someone did ourwebsite/list/pillow
    // we can check if they have the auth for pillow in their cookie list
    // and display the to-do list if they do, or ask them to login if they don't

    // Whether or not they have access to this page will be stored in data.authorized
    export let data;

    // A template for how this can be implemented in svelte is below:
    // Please implement html for both authed and not authed
    import Navbar from '$lib/navbar.svelte';
    import PageColor from '$lib/pagecolor.svelte';
</script>

<PageColor />
<Navbar />

{#if data.authorized}
    <h1>Here's your to-do list:</h1>
    <p>Here's where we'll display the to-do list</p>
{:else}
    <h1>Log in to access this page</h1>
    <p>Here's where we'll display the login form</p>
{/if}

<style>
</style>