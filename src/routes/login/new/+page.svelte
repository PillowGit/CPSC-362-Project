
<script>
    // Declare form variables & their restraints
    let username = '';
    $:username = username.toLowerCase().replace(/\W/g, '').substring(0,35);
    let password = '';
    $:password = password.replace(/\W/g, '').substring(0, 30);
    let title = '';
    $:title = title.substring(0, 60);
    let author = '';
    $:author = author.replace(/\W/g, '').substring(0, 60);
    let hidden = true;
    function show() {
        hidden = false;
    }
    function hide() {
        hidden = true;
    }
    // Import useful components
    import Navbar from '$lib/navbar.svelte';
    import PageColor from '$lib/pagecolor.svelte';
    // Import sveltes form enhance
    import { enhance } from '$app/forms';
    // Get data from the form
    export let form;
</script>

<PageColor />
<Navbar />
<!-- Center items -->
<div class="container">
    <!-- Title text -->
    <h1 class="title">
        New Account
    </h1>
    <!-- Input Form -->
    <form method="POST" action="?/create" class="formitems" use:enhance>
        <label class="formentry">
            <p>Username</p>
            <input
                name="username"
                autocomplete="off"
                autocapitalize="on"
                placeholder="Username"
                bind:value={username}
            />
        </label>
        <label class="formentry">
            <p>Password</p>
            {#if hidden}
                <input
                    name="password"
                    autocomplete="off"
                    placeholder="Password"
                    type="password"
                    bind:value={password}
                />
            {:else}
                <input
                    name="password"
                    autocomplete="off"
                    placeholder="Password"
                    type="text"
                    bind:value={password}
                />
            {/if}
        </label>
        <img src = "/images/eye.svg" alt="eye" class="eye" on:mouseover={show} on:mouseleave={hide} />
        {#if form?.errors}
            <p class="formstatus">
                {#each form.errors as error}
                    {error}<br>
                {/each}
            </p>
        {/if}
        <button type="submit" class="submitbutton">Sign up</button>
        <p class="createacc">Already have an account? <a href="/login">Sign in here</a></p>
    </form>
</div>

<style>
    /* Simple container to center things in the middle of the screen */
    .container {
        /* Center items within grid */
        display: grid;
        place-items: center;
        /* Center the grid itself */
        width: 25%;
        width: 32rem;
        height: 80%;
        margin-top: 10%;
        margin-bottom: 10%;
        margin-left: 37.5%;
        margin-right: 37.5%;

        background-color: #3B4252;
        border-radius: 8px;
    }
    /* Title text */
    .title {
        text-align: center;
        font-size: 3rem;
        height: 4.5rem;
        width: 26rem;

        border-bottom: 0.25rem solid rgb(236, 239, 244);
        border-bottom: 0.2rem solid rgba(236, 239, 244, 0.4);
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
    }
    /* Format the redirect text for new accounts */
    .createacc {
        text-align: center;
        font-size: 1.1rem;
        font-style: italic;
        margin-top: 2rem;
        margin-bottom: -1rem;
        color: rgb(236, 239, 244);
        color: rgba(236, 239, 244, 0.8);
    }
    .createacc a {
        color: rgb(167, 169, 173);
        color: rgba(167, 169, 173, 0.8);
    }
    .createacc a:hover {
        color: rgb(236, 239, 244);
        color: rgba(236, 239, 244, 0.8);
    }
    /* Format the eye that allows to see the password */
    .eye {
        -webkit-filter: invert(1);
        filter: invert(1);
        height: 2rem;
        width: 2rem;
        margin-top: -5.1rem;
        justify-self: right;
        transition: 0.1s
    }
    .eye:hover {
        -webkit-filter: invert(0.5);
        filter: invert(0.5);
    }
    /* Style every form entry into a grid */
    .formitems {
        margin-top: 3rem;
        margin-bottom: 4rem;
        margin-left: 12.5%;
        margin-right: 12.5%;
        width: 75%;
        display: grid;
        grid-template-rows: repeat(1, 1fr);
        gap: 1.25rem;

    }
    /* Define how to display a form entry item */
    .formentry {
        height: 6rem;
        width: 100%;

        font-size: 2rem;
        color: #ECEFF4;

        display: grid;
        grid-template-rows: 20% 70%;

    }
    /* Format the text in a form entry */
    .formentry p {
        font-size: 1.25rem;
        margin-top: 0.25rem;
        height: 3rem;
        text-align: left;
    }
    /* Format the box in a form entry */
    .formentry input {
        margin-top: 1rem;
        height: 2rem;
        font-size: 1.5rem;
        height: 50%;
        border-style: none;
        background-color: #3B4252;
        border-bottom: 0.1rem solid rgb(236, 239, 244);
        border-bottom: 0.1rem solid rgba(236, 239, 244, 0.4);
        color: rgb(236, 239, 244);
        color: rgba(236, 239, 244, 0.8);
    }
    /* Style the submit button */
    .submitbutton {
        background-color: #2E3440;
        border-style: solid;
        border-width: .3rem;
        border-radius: 20px;
        border-color: #3B4252;
        cursor: pointer;

        margin-top: 3rem;
        height: 75%;
        width: 75%;

        font-size: 2rem;
        color: #ECEFF4;
        justify-self: center;
        transition: 0.25s;
    }
    .submitbutton:hover {
        background-color: #434C5E;
    }
    /* Finally, style the error message */
    .formstatus {
        color: red;
        text-align: center;
        font-weight: bold;

        margin-top: 0rem;
        margin-bottom: 0rem;
    }
</style>