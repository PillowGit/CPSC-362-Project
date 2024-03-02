<script>
    export let data;
</script>

    <div>
        <h1>User Data:</h1>
        <p>Name: {data.name}</p>
        <p>username: {data.password}</p>
        <p>spreadsheet: {data.sheetId}</p>
        <p>cookie: {data.cookie}</p>
    </div>

<a href="/">
    <button class="back-button">
      Back
    </button>
</a>

<style>
    .back-button {
        height: 90px;
        width: 180px;
        font-size: 2rem;
    }
</style>