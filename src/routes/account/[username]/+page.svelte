<script>
    // Reuse navbar and pagecolor
    import Navbar from '$lib/navbar.svelte';
    import PageColor from '$lib/pagecolor.svelte';
	import TodoForm from '$lib/todo-form.svelte';
    // Get data from server load
    export let data;


    let isOpen = false;
    let title = '';
	let description = '';

    $: titleCharacterCount = title.length
    $: descCharCount = description.length


    function onclikcnewlist() {

    }
</script>

<PageColor />
<Navbar />
{#if data?.error}
<h1 class="errortext">
    {data.error}
</h1>
{:else}

<div class="main">
<h1 class="welcome-msg">
    Welcome, {data.username}!
</h1>
<div class="lists-display">
<div class="header">
<h1>
    Your To-do Lists:
</h1>
<button class="newlistbutton" on:click={() => isOpen = true}>
    + New List
</button>
</div>
<div class="sep"></div>
<div class="lists-container">
    {#each Object.keys(data.lists) as list_id}
    <div class="list-box">
    <a href={"/list/"+list_id}>
    <div class="list-container">
        <h3>{data.lists[list_id].listname}</h3>
        <p>{data.lists[list_id].description}</p>
    </div>
    </a>
    </div>
    {/each}
</div>
</div>
</div>

<TodoForm bind:isOpen title={title} description={description} />



{/if}

<style>
    /* Used for things like "no access" or "failed to load data" */
    /* .create-list-card {
		z-index: 10;
		position: fixed;
		left: 50%;
		top: 55%;
		transform: translate(-50%, -50%);
		display: grid;
		flex-direction: column;
		width: min(50em, 90vw);
		padding: 2rem;
		background-color: var(--acm-light);
		opacity: 0;
		visibility: visible;
		transition: all 0.125s ease-in;
	} */

    .errortext {
        color: red;
        text-align: center;
        padding-top: 10rem;
    }
    .main {
        min-width: 100%;
        margin-top: 8rem;
        display: flex;
        flex-direction: column;
    }
    .welcome-msg {
        font-size: 4rem;
        text-align: center;
    }
    .lists-display {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .sep {
        background-color: rgb(236, 239, 244);
        background-color: rgba(236, 239, 244, 0.4);
        width: 85%;
        height: 0.15rem;
        margin-top: 0rem;
    }
    .lists-container {
        width: 80%;
        margin-top: 2rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        flex-direction: row;
    }
    .header {
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .header h1 {
        width: 30%;
    }
    .newlistbutton {
        background-color: #2E3440;
        border-style: solid;
        border-width: .3rem;
        border-radius: 4px;
        border-color: #3B4252;
        cursor: pointer;
        width: 12rem;
        height: 75%;
        margin-top: 1rem;
        font-size: 2rem;
        text-align: center;
        color: #ECEFF4;
    }
    .list-box {
        background-color: #3B4252;
        border-radius: 1.5rem;
        width: 26rem;
        min-height: 14rem;
        margin-bottom: 4rem;
        display: flex;
        justify-content: center;
    }
    .list-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .list-container h3 {
        color: #ECEFF4;
        font-size: 2rem;
        text-align: center;
        margin-top: 1.5rem;
        margin-bottom: 0rem;
        margin-left: 1.75rem;
        margin-right: 1.75rem;
    }
    .list-container p {
        color: #D8DEE9;
        font-size: 1.1rem;
        text-align: center;
        margin-top: 1rem;
        margin-bottom: 1.5rem;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
</style>