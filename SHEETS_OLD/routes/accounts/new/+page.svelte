<script>
    // Reusable components
    import Navbar from '$lib/navbar.svelte';
    import PageColor from '$lib/pagecolor.svelte';
    // Sveltekit imports
    import { enhance } from '$app/forms';
    // Variables to be filled out in the form
    let username = '';
    $:username = username.toLowerCase().replace(/\W/g, '').substring(0,60);
    let password = '';
    $:password = password.replace(/\W/g, '').substring(0, 20);
    let title = '';
    $:title = title.substring(0, 60);
    let author = '';
    $:author = author.replace(/\W/g, '').substring(0, 60);
    // Form data response
    export let form;
</script>

<PageColor />
<Navbar />
<!-- Centered Items -->
<div class="container">
    <!-- New Account Title Card -->
    <h1 class="title">
        Create New To-Do List
    </h1>
    <!-- Form -->
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
    /* Holds the title card and grid for form components */
    .container {
        display: grid;
        place-items: center;
        width: 50%;
        height: 80%;
        margin-top: 10%;
        margin-left: 25%;
    }
    /* Format the title of the page */
    .title {
        text-align: center;
        font-size: 4rem;
        font-style: italic;
        margin-bottom: 2rem;
    }
    /* Define the grid that will hold every form component */
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
        grid-template-columns: 50% 50%;
    }
    .formentry p {
        margin-top: 0.25rem;
        margin-bottom: 0.75rem;
        height: 2rem;
        text-align: right;
        padding-right: 10%;
    }
    .formentry input {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        height: 2rem;
        font-size: 1.5rem;
        height: 50%;
    }
    /* Define how the submission button looks */
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
    /* How to format form errors */
    .formstatus {
        color: red;
        text-align: center;

        margin-top: 2rem;
        margin-bottom: 0rem;
    }
</style>