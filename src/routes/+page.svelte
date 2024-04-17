<script>
    // This is the landing page :)
    // Semi using nord sheet https://www.nordtheme.com/
    import Navbar from '$lib/navbar.svelte';
    import PageColor from '$lib/pagecolor.svelte';
</script>

<PageColor />
<Navbar />
<!-- Centered Items -->
<div class="container">
    <!-- Logo -->
    <img src="images/todo-list.png" alt="Logo" class="logo"/>
    <!-- Title text -->
    <h1 class="title">
        360 Todo
        <br>
    </h1>
    <!-- Login button -->
    <a href="/login">
        <button class="loginbutton">Login</button>
    </a>
</div>

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
    .title {
        text-align: center;
        font-size: 3rem;
    }
    .logo {
        width: 12rem;
        height: 12rem;
        -webkit-filter: invert(1);
        filter: invert(1);
    }
    .loginbutton {
        background-color: #2E3440;
        border-style: solid;
        border-width: .3rem;
        border-radius: 4px;
        border-color: #3B4252;
        cursor:pointer;

        height: 6rem;
        width: 12rem;

        font-size: 2rem;
        text-align: center;
        color: #ECEFF4;
    }
    .loginbutton:hover {
        background-color: #434C5E;
    }
</style>