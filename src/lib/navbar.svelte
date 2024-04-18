<script>
    import { redirect } from '@sveltejs/kit';
    async function logoutaction() {
        await fetch("/logout", {method: "POST", headers: {'x-sveltekit-action': 'true'}, body: "{}"});
        window.location.href = "/login"; 
    }
    async function accountaction() {
        const resp = await fetch("/account", {method: "POST", headers: {'x-sveltekit-action': 'true'}, body: "{}"});
        const destination = (await resp.json()).data.slice(2, -2);
        if (destination === "err") {
            alert("There was an error with your login");
        } else {
            window.location.href = destination;
        }
    }
    const navleft = [
        {
            name: "Home",
            href: "/",
            src: "/images/home.svg",
            alt: "Home Button",
        }, 
        {
            name: "Account",
            href: "/account",
            src: "/images/account.svg",
            alt: "Account Button",
            routine: accountaction,
        },
    ];
    const navright = [
        {
            name: "logout",
            href: "/logout",
            src: "/images/logout.svg",
            alt: "Logout Button",
            routine: logoutaction,
        },
        {
            name: "code",
            href: "https://github.com/PillowGit/CPSC-362-Project",
            src: "/images/code.svg",
            alt: "Source Code",
        },
    ];
</script>

<header class="container">
    <div></div>
    <div></div>
    <div class="leftdisplay">
        {#each navleft.entries() as [index, item]}
            {#if item.routine !== undefined}
            <img src={item.src} alt={item.alt} class="item" on:click={item.routine}/>
            {:else}
            <a href={item.href}>
            <img src={item.src} alt={item.alt} class="item"/>
            </a>
            {/if}
            {#if index < navleft.length - 1}
                <div class="divider"></div>
            {/if}
        {/each}
    </div>
    <div class="rightdisplay">
        {#each navright.entries() as [index, item]}
            {#if item.routine !== undefined}
            <img src={item.src} alt={item.alt} class="item" on:click={item.routine}/>
            {:else}
            <a href={item.href}>
            <img src={item.src} alt={item.alt} class="item"/>
            </a>
            {/if}
            {#if index < navright.length - 1}
                <div class="divider"></div>
            {/if}
        {/each}
    </div>
</header>


<style>
    /* Navbar Holder */
    .container {
        /* Styling  */
        border-bottom: 0.25rem solid rgb(236, 239, 244);
        border-bottom: 0.15rem solid rgba(236, 239, 244, 0.4);
        /* Priority */
        z-index: 1000;
        background-color: #2E3440;
        /* Sizing */
        height: 4.5rem;
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        /* Position */
        position: fixed;
        top: -.5rem;
        left: 0;
        right: 0;
        /* Position containers */
        display: grid;
        grid-template-rows: 1rem 3rem;
        grid-template-columns: 50% 50%;
    }
    /* Left Side display */
    .leftdisplay {
        /* Position items */
        margin-left: 0.5rem;
        display: grid;
        grid-template-rows: 3rem;
        justify-content: start;
        grid-template-columns: repeat(2, 3rem 1.5rem);
    }
    /* Right Side display */
    .rightdisplay {
        /* Position items */
        margin-right: 0.5rem;
        display: grid;
        grid-template-rows: 3rem;
        justify-content: end;
        grid-template-columns: repeat(1, 3rem 1.5rem) 3rem;
    }
    /* The silly little images */
    .item {
        height: 3rem;
        width: 3rem;
        -webkit-filter: invert(1);
        filter: invert(1);
        margin-left: 0;
        margin-right: 0;
    }
    .item:hover {
        -webkit-filter: invert(0.75);
        filter: invert(0.75);
        cursor: pointer;
    }
    /* The silly little dividers */
    .divider {
        margin-left: 0.675rem;
        margin-right: 0.675rem;
        margin-top: 0.25rem;
        height: 2.5rem;
        width: 0.15rem;
        background-color: rgb(236, 239, 244);
        background-color: rgba(236, 239, 244, 0.4);
    }
</style>