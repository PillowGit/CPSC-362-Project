<script>
  // This is the landing page :)
  // Semi using nord sheet https://www.nordtheme.com/
  import Navbar from '$lib/navbar.svelte';
  import PageColor from '$lib/pagecolor.svelte';
	import Page from '../+page.svelte';
  // Get data
  export let data;
</script>

<Navbar />
<PageColor />
<p>{data.redirect}</p>

<style>
  p {
    color: var(--text);
    padding-top: 4rem;
  }
</style>