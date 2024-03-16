<script>
    // Reuse navbar and pagecolor
    import Navbar from '$lib/navbar.svelte';
    import PageColor from '$lib/pagecolor.svelte';
    // Get data from server load
    export let data;
</script>

<PageColor />
<Navbar />
<!-- Centered Items -->
<div class="container">
    <!-- New account button -->
    <a href="/accounts/new">
        <button class="newaccountbutton">
            + Add To-Do List
        </button>
    </a>
    {#if data.accounts && data.accounts.length > 0}
        <div class="accounts">
        {#each data.accounts as account_ (account_.title)}
        <a href={`/list/${account_.username}`}>
            <div class="account">
                <img src="/images/todo-list.png" alt="List Profile" class="listpicture">
                <div class="listinfo">
                    <h3>{account_.title}</h3>
                    <p>Created by: {account_.author}</p>
                </div>
            </div>
        </a>
        {/each}
        </div>
    {/if}
        
</div>

<style>
    /* Holds all of the buttons */ 
    .container {
        /* Center items within grid */
        display: grid;
        place-items: center;
        /* Center the grid itself */
        width: 80%;
        height: 80%;
        margin-top: 7.5%;
        margin-left: 10%;
    }
    /* New account button */
    .newaccountbutton {
        background-color: #2E3440;
        border-style: solid;
        border-width: .3rem;
        border-radius: 4px;
        border-color: #3B4252;
        cursor: pointer;

        height: 6rem;
        width: 24rem;

        font-size: 2rem;
        text-align: center;
        color: #ECEFF4;
    }
    /* Grid that displays account list */
    .accounts {
        margin-top: 3rem;
        margin-bottom: 10rem;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        gap: 1rem;
    }
    /* Style each account component */
    .account {
        background-color: #2E3440;
        border-style: solid;
        border-width: .3rem;
        border-radius: 4px;
        border-color: #3B4252;
        /*cursor:pointer;*/

        height: 8rem;
        width: 36rem;

        font-size: 2rem;
        text-align: center;
        color: #ECEFF4;

        display: grid;
        grid-template-columns: 10rem 26rem;
    }
    /* Picture for each account component */
    .listpicture {
        margin-top: 1rem;
        margin-left: 2rem;
        object-fit: cover;
        justify-self: start;

        height: 6rem;
        width: 6rem;
    }
    /* Data for each account component */
    .listinfo {
        justify-self: end;
        width: 26rem;
        height: 6rem;
        margin-top: 0.8rem;

        text-align: left;
        font-size: 1rem;
    }
    p {
        font-style: italic;
        color: #D8DEE9;
    }
    a {
        color: #FFFFFF;
        text-decoration: none;
    }
</style>

<!-- 
    Grid guide:
    // https://css-tricks.com/snippets/css/complete-guide-grid/
-->