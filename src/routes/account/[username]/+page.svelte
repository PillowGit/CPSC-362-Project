<script>
    // Reuse navbar and pagecolor
    import Navbar from '$lib/navbar.svelte';
    import PageColor from '$lib/pagecolor.svelte';
    // Get data from server load
    export let data;
</script>

<PageColor />
<Navbar />