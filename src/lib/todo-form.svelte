<script>
    export let isOpen = false;
    export let title = '';
		export let description = '';
    $: {
        title = title.slice(0,60);
        description = description.slice(0,500);
    }
</script>

<form class="create-list-card" class:active={isOpen} method="POST" action="?/create">
	<h2 class="mg-bottom">Create a New List</h2>

	<div class="mg-bottom">
		<label for="listname" >Title ({title.length}/60)</label>
		<input name="listname" type="text" bind:value={title} placeholder="Title..."/>
	</div>

    <!-- <input type="date" class="mg-bottom" /> -->

    <label for="listname">Description ({description.length}/500)</label>
	<textarea class="mg-bottom" name="description" bind:value={description} placeholder="Description..." />

    <div class="place-end">
        <button class="create" type="submit">Create</button>
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

<style>
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