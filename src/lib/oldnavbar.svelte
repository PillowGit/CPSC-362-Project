<script>
    const navleft = [
        {
            name: "Home",
            href: "/",
            src: "/images/home.svg",
            alt: "Home Button",
        }, 
    ];
    const navright = [
        {
            name: "logout",
            href: "/logout",
            src: "/images/logout.svg",
            alt: "Logout Button",
        },
        {
            name: "code",
            href: "https://github.com/PillowGit/CPSC-362-Project",
            src: "/images/code.svg",
            alt: "Source Code",
        },
    ];
</script>

<header>
    <!-- Home Button -->
    <a href="/">
    <img src="/images/home.svg" alt="Home Button" class="homebutton"/>
    <!-- Code Repo button -->
    <a href="https://github.com/PillowGit/CPSC-362-Project" target="_blank">
    <img src="/images/code.svg" alt="Source Code" class="codebutton"/>
    <!-- Logout button -->
    <a href="/logout">
    <img src="/images/logout.svg" alt="Logout Button" class="logoutbutton"/>
</header>

<style>
    img {
        height: 3rem;
        width: 3rem;
        -webkit-filter: invert(1);
        filter: invert(1);
    }
    .homebutton {
        position: absolute;
        left: 0;
        margin-left: 0.6rem;
    }
    .codebutton {
        position: absolute;
        right: 0;
        margin-right: 0.6rem;
    }
    .logoutbutton {
        position: absolute;
        right: 0;
        margin-right: 5rem;
    }
    /* Define how the header works */
    header {
        /* Keep fixed on top */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
        /* Give it a border so it is visible */
        border-style: solid;
        border-width: 2px;
        border-color: #4C566A;
        border-radius: 2px;
        background-color: #3B4252;
        height: 3rem;
        /* Make it display items */
        display: inline-flex;
    }
</style>