<script>
    // Data Imports
    import Navbar from '$lib/navbar.svelte';
    import PageColor from '$lib/pagecolor.svelte';
    export let form;
    // {#if form?.success} let's us check for a statement `return { success: "data" }`
    export let data;
    if (data.entries === undefined) { data.entries = [] };

    // Organize list data
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
    
    // Necessary info for creating a new task
    let isOpen = false;
    let title = '';
    let description = '';
    $: {
        title = title.slice(0, 100); // 100 chars max for task titles
        description = description.slice(0, 500); // 500 chars max for task descriptions
    }

    // Define function to delete a task
    async function delete_task(section, title) {
        const body = {
            "title": title,
            "section": section,
        }
        const response = await fetch("?/delete", {
            method: 'POST',
            headers: {
                'x-sveltekit-action': 'true',
            },
            body: JSON.stringify(body),
        });
        // Handle action error
        if (response.status === 500) {
            alert("Failed to delete task.");
            return;
        }
        // Remove task from list locally
        organized_entries[section] = organized_entries[section].filter((entry) => entry.title !== title);
    }
</script>

<!-- Default page imports (header, page format, etc) -->
<PageColor />
<Navbar />

<!-- Error handling -->
{#if data?.error}
<h1 class="errortext">{data.error}</h1>

<!-- List Display -->
{:else}
<div class="titlecard">
<div class="newtaskbutton">
    <button on:click={() => isOpen = true}>+ New Task</button>
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
                <img src="/images/reorder.svg" alt="Reorder" class="reorder-button" />
                <img src="/images/trash.svg" alt="Delete" class="trash-button" on:click={async () => await delete_task(section, entry.title)}/>
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

<!-- Modal for creating new task -->
<!-- form vars: "title", "description" -->
<form class="create-list-card" class:active={isOpen} method="POST" action="?/create">
    <h2 class="mg-bottom">Create a New Task</h2>

    <div class="mg-bottom">
        <label for="taskname" >Title ({title.length}/100)</label>
        <input name="taskname" type="text" bind:value={title} placeholder="Title..."/>
    </div>

    <input type="date" class="mg-bottom" name="date"/>

    <label for="listname">Description ({description.length}/500)</label>
    <textarea class="mg-bottom" name="description" bind:value={description} placeholder="Description..." />

    <div class="place-end">
        <button type="submit" class="create">Add Task</button>
    </div>
</form>
<div
    class="full-window-overlay"
    class:active={isOpen}
    on:click={() => isOpen = false}
    on:keydown={() => isOpen = false}
    role="button"
    aria-pressed="false"
    tabindex="0"
/>
{/if}

<style>
    .titlecard {
        margin-top: 5%;
        min-height: 7.5rem;
        display: grid;
        grid-template-columns: 20% 60% 20%;
    }
    .newtaskbutton {
        display: flex;
        justify-content: center;
        align-items: center;
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
        height: 4rem;
        margin-left: 1rem;
        font-size: 2rem;
        text-align: center;
        color: #ECEFF4;
    }
    .title {
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
    .reorder-button {
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 1rem;
        -webkit-filter: invert(1);
        filter: invert(1);
    }
    .reorder-button:hover {
        cursor: pointer;
        -webkit-filter: invert(0.5);
        filter: invert(0.5);
    }
    .trash-button {
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 1rem;
        -webkit-filter: invert(1);
        filter: invert(1);
    }
    .trash-button:hover {
        cursor: pointer;
        -webkit-filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
        filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
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
    .errortext {
        margin-top: 10rem;
        text-align: center;
        color: red;
        font-size: 3rem;
    }
    /* Form Styling */
    .create-list-card {
		z-index: 1002;
		position: fixed;
		left: 50%;
		top: 55%;
		transform: translate(-50%, -50%);
		display: grid;
		flex-direction: column;
		width: min(50em, 90vw);
		padding: 2rem;
		background-color: #3b4252;
        border-radius: 2rem;
        /* border: 2px solid white; */
		opacity: 0;
		visibility: hidden;
		transition: all 0.125s ease-in;
	}

	.create-list-card.active {
		top: 50%;
		opacity: 1;
		visibility: visible;
	}

	.create-list-card .place-end {
		justify-self: end;
	}

	.create-list-card .mg-bottom {
		margin-block-end: 1rem;
	}

	.create-list-card h2 {
		margin-block: 0;
		font-size: 1.75rem;
	}

	.create-list-card textarea {
		height: 10rem;
		resize: none;
	}

	.create-list-card input[type='text'],
    .create-list-card input[type='date'],
	.create-list-card textarea {
		background-color: #2e3440;
		font-size: 1rem;
		padding: 0.5rem 1rem;
		outline: none;
		border: none;
        color: white;
        font-family: inherit;
        border-radius: 0.5rem;
        width: 96%;
	}

	.create-list-card .create {
		outline: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		border-radius: 0.5rem;
		padding: 0.75rem 1.5rem;
		background-color: white;
		color: #3b4252;
        font-weight: medium;
		transition: all 0.2s ease-in;
	}

	.create-list-card .create:hover {
		opacity: 0.7;
	}

    .full-window-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(213, 213, 213, 0.25);
		z-index: 1001;
		transition: 0.25s;
		opacity: 0;
		visibility: hidden;
	}

	.full-window-overlay.active {
		opacity: 1;
		visibility: visible;
	}
</style>