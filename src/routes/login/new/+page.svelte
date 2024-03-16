<script>
    // Declare form variables & their restraints
    let username = '';
    $:username = username.toLowerCase().replace(/\W/g, '').substring(0,60);
    let password = '';
    $:password = password.replace(/\W/g, '').substring(0, 20);
    let title = '';
    $:title = title.substring(0, 60);
    let author = '';
    $:author = author.replace(/\W/g, '').substring(0, 60);
    // Import useful components
    import Navbar from '$lib/navbar.svelte';
    import PageColor from '$lib/pagecolor.svelte';
    // Import sveltes form enhance
    import { enhance } from '$app/forms';
    // Get data from server load
    export let data;
    // Get data from the form
    export let form;
</script>

<PageColor />
<Navbar />
<!-- Center items -->
<div class="container">
    <!-- Title text -->
    <h1 class="title">
        Login
    </h1>
    <!-- Input Form -->
    <form method="POST" action="?/create" class="formitems" use:enhance>
        <label class="formentry">
            <p>Username:</p>
            <input
                name="username"
                autocomplete="off"
                autocapitalize="on"
                bind:value={username}
            />
        </label>
        <label class="formentry">
            <p>Password:</p>
            <input
                name="password"
                autocomplete="off"
                bind:value={password}
            />
        </label>
        <label class="formentry">
            <p>Title:</p>
            <input
                name="title"
                autocomplete="off"
                bind:value={title}
            />
        </label>
        <label class="formentry">
            <p>Author Name:</p>
            <input
                name="author"
                autocomplete="off"
                bind:value={author}
            />
        </label>
        {#if form?.status}
            <p class="formstatus">{form.status}</p>
        {/if}
        <button type="submit" class="submitbutton">Create</button>
    </form>
</div>

<style>
    /* Simple container to center things in the middle of the screen */
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
    /* Title text */
    .title {
        text-align: center;
        font-size: 3rem;
        height: 4.5rem;
        width: 11rem;

        border-bottom: 0.1rem solid rgb(236, 239, 244);
        border-bottom: 0.1rem solid rgba(236, 239, 244, 0.4);
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
    }
    /* Style every form entry into a grid */
    .formitems {
        margin-top: 0rem;
        margin-bottom: 10rem;
        width: 36rem;
        display: grid;
        grid-template-rows: repeat(1, 1fr);
        gap: 0.5rem;
    }
    /* Define how to display a form entry item */
    .formentry {
        height: 3rem;
        width: 100%;

        font-size: 2rem;
        color: #ECEFF4;

        display: grid;
        grid-template-rows: 50% 50%;
    }
    /* Format the text in a form entry */
    .formentry p {
        margin-top: 0.25rem;
        margin-bottom: 0.75rem;
        height: 2rem;
        text-align: right;
        padding-right: 10%;
    }
    /* Format the box in a form entry */
    .formentry input {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        height: 2rem;
        font-size: 1.5rem;
        height: 50%;
    }
    /* Style the submit button */
    .submitbutton {
        background-color: #2E3440;
        border-style: solid;
        border-width: .3rem;
        border-radius: 4px;
        border-color: #3B4252;
        cursor: pointer;

        margin-top: 3rem;
        height: 6rem;
        width: 24rem;

        font-size: 2rem;
        color: #ECEFF4;
        justify-self: center;
    }
    /* Finally, style the error message */
    .formstatus {
        color: red;
        text-align: center;

        margin-top: 2rem;
        margin-bottom: 0rem;
    }
</style>