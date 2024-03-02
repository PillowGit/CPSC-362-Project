<script>
  export let data;
</script>

<h1>
  Home/Landing page
</h1>

<a href="login/">
  <button>
    Login
  </button>
</a>
<p></p>

{#if (data.isAuthed)}
  <a href="home/">
    <button class="reuse-login">
      Sign into previous session
    </button>
  </a>
{/if}

<style>
  button {
    height: 90px;
    width: 180px;
    font-size: 2rem;
  }
  .reuse-login {
    height: 120px;
    width: 180px;
    font-size: 1.75rem;
  }
</style>