<script>
    // Define username and password values for the input form
    let username = '';
    let password = '';
    // Format them upon changes
    $:username = username.toLowerCase().replace(/\W/g, '');
    $:password = password.replace(/\W/g, '');
</script>

<form method="POST" action="?/login">
    <h1>Log-in/Create Account:</h1>
    <label>
        username<p></p>
        <input
            name="username"
            autocomplete="off"
            autocapitalize="on"
            bind:value={username}
        />
    </label>
    <label>
        <p></p>password<p></p>
        <input
            name="password"
            autocomplete="off"
            bind:value={password}
        />
    </label>
    <p></p>
    <button type="submit" class="submit-button">log in</button>
</form>

<br><br><br>
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
    .submit-button {
        height: 35px;
        width: 80px;
        font-size: 1rem;
    }
</style>