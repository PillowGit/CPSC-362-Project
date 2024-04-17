<script>
    import Navbar from '$lib/navbar.svelte';
    import PageColor from '$lib/pagecolor.svelte';

    //export let data;
    let data = {
        listname: "Mark list",
        entries: [
            {
                title: "This is a really really long title that will be much longer than the required titles for testing purposes",
                description: "This is a task inside of a task inside of a task so that this is a description in a task where this is a task in some sample data thats hardcoded for this task in our project project entries hardcode mark mmm mkar hgnhhfnafdsa jakfld fjkasl  asdjfklsdafjdkfal",
                status: "todo",
                date: "2024-04-18",
            },
            {
                title: "Math 350 Homework",
                description: "Work on all of the back end shit :(",
                status: "todo",
                date: "2024-04-20",
            },
            {
                title: "this should be a to do list entry that actually has two lines",
                description: "Work on all of the back end shit :(",
                status: "todo",
                date: "2024-04-16",
            },
            {
                title: "Make a todo-list",
                description: "Work on all of the back end shit :(",
                status: "inprogress",
                date: "2024-04-16",
            },
            {
                title: "Make a todo-list",
                description: "Work on all of the back end shit :(",
                status: "completed",
                date: "2024-04-16",
            },
            {
                title: "Make a todo-list",
                description: "Work on all of the back end shit :(",
                status: "dropped",
                date: "2024-04-16",
            },
        ],
    };
    // Max 260 chars for description
    // Max 

    // Sort data by date
    const datetoint = (date) => { return new Date(date).getTime(); }
    data.entries.sort((a, b) => datetoint(a.date) - datetoint(b.date));

    let todo = [];
    let inprogress = [];
    let completed = [];
    let dropped = [];
    for (let i = 0; i < data.entries.length; i++) {
        switch (data.entries[i].status) {
            case "todo":
                todo.push(data.entries[i]);
                break;
            case "inprogress":
                inprogress.push(data.entries[i]);
                break;
            case "completed":
                completed.push(data.entries[i]);
                break;
            case "dropped":
                dropped.push(data.entries[i]);
                break;
            default:
                break;
        }
    }
    const organized_entries = {"todo":todo, "inprogress":inprogress, "completed":completed, "dropped":dropped};
    const titles = {"todo":"To-Do", "inprogress":"In Progress", "completed":"Completed", "dropped":"Dropped"};
</script>

<PageColor />
<Navbar />

<div class="titlecard">
<div class="newtaskbutton">
    <button>+ New Task</button>
</div>
<div class="title">
    <h1>{data.listname}</h1>
</div>
</div>

<main>
{#each ["todo", "divider", "inprogress", "divider", "completed", "divider", "dropped"] as section}
{#if section == "divider"}
    <div class="section-divider"></div>
{:else}
<div class="task-column">
    <h1>{titles[section]}</h1>
    {#each organized_entries[section] as entry}
    <div class="list-entry">
        <div class="list-entry-title">
            <!-- Title of the task -->
            <h3>{entry.title}</h3>
            <div class="list-entry-title-buttons">
                <!-- Reorder and delete buttons -->
                <img src="/images/reorder.svg" alt="Reorder">
                <img src="/images/trash.svg" alt="Delete">
            </div>
        </div>
        <!-- Description of the task -->
        <div class="list-entry-description">
            <p>{entry.description}</p>
        </div>
        <!-- Due date of the task -->
        <div class="list-entry-date">
            <p>{entry.date}</p>
        </div>
    </div>
    {/each}
</div>
{/if}
{/each}
</main>

<style>
    .titlecard {
        margin-top: 5%;
        height: 7.5rem;
        display: grid;
        grid-template-columns: 20% 60% 20%;
    }
    .newtaskbutton button {
        height: inherit;
        background-color: #2E3440;
        border-style: solid;
        border-width: .3rem;
        border-radius: 4px;
        border-color: #3B4252;
        cursor: pointer;
        width: 12rem;
        height: 75%;
        margin-top: 0.5rem;
        margin-left: 1rem;
        font-size: 2rem;
        text-align: center;
        color: #ECEFF4;
    }
    .title {
        margin-top: -4%;
        font-size: 2.5rem;
        text-align: center;
        height: inherit;
    }
    main {
        border-top: 0.05rem solid #4C566A;
        width: 100%;
        height: 60rem;
        display: grid;
        grid-template-columns: repeat(3, 24.5% 0.5%) 24.5%;
    }
    .section-divider {
        background-color: #4C566A;
        width: 10%;
        height: 100%;
        justify-self: center;
    }
    .task-column {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .list-entry {
        border: #3B4252 0.2rem solid;
        border-radius: 1rem;
        background-color: color-mix(in srgb, #2E3440 50%, #3B4252 50%);
        width: 90%;
        margin-bottom: 2rem;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .list-entry-title {
        width: 90%;
        margin-left: 5%;
        display: flex;
        justify-content: space-between;
    }
    .list-entry-title-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .list-entry-title-buttons img {
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 1rem;
        -webkit-filter: invert(1);
        filter: invert(1);
    }
    .list-entry-description {
        width: 90%;
        margin-left: 5%;
    }
    .list-entry-date {
        width: 90%;
        margin-left: 5%;
        color: color-mix(in srgb, #D8DEE9 50%, transparent);
        font-size: 0.75rem;
    }
</style>