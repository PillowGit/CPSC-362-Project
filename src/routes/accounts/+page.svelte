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
    <!-- Grid for list of accounts -->
    <!-- Snippit for showing account list if there's any
    {#if data.accounts && data.accounts.length > 0}
        <p>there's data!</p>
    {/if}
    -->
    <div class="accounts">
        {#each [1,2,3,4,5,6,7,8,9,10] as i}
        <div class="account">
            <img src="/images/todo-list.png" alt="List Display Image" class="listpicture">
            <div class="listinfo">
                <!--
                    Title
                    _blank_
                    Author
                -->
                <h3>This is list #{i}</h3>
                <p>Created by: user{i}</p>
            </div>
        </div>
        {/each}
    </div>
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
        margin-top: 1rem;
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
</style>

<!-- 
    Grid guide:
    // https://css-tricks.com/snippets/css/complete-guide-grid/
-->