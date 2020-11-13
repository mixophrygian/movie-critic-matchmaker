<script>
  function reload() {
    location.reload()
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin-top: 20%;
  }

  .copy {
    font-size: 1.25em;
    text-align: center;
  }

  .button {
    background: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 2rem;
    margin-top: 2rem;
    font-size: 18px;
  }
</style>

<div class="container">
  <h1>Whoops!</h1>
  <div class="copy">
    You skipped every movie. Rate movies to see which critics you match with.
  </div>
  <button on:click={reload} class="button">Try again</button>
</div>
