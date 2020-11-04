<script>
  import audience from "images/audience.jpg"
  import { goto } from "@sapper/app"

  function rate() {
    goto("/rate")
  }
</script>

<style>
  h1,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    margin-bottom: 0.5em;
  }

  img {
    width: 100%;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  .button {
    background: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 2rem;
    margin-top: 2rem;
    font-size: 18px;
  }

  @media (max-width: 321px) {
    .button {
      margin-top: 1rem;
    }
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    padding: 2rem;
  }
</style>

<svelte:head>
  <title>Movie Critic Matchmaker</title>
</svelte:head>
<div class="container">
  <div class="content">
    <h1>Movie Critic Matchmaker</h1>

    <img alt="Critics who disagree" src={audience} />
    <p>
      Find out which top movie critics you agree with the most...and the least!
      Rate these movies as rotten or fresh to find out.
    </p>

    <button on:click={rate} class="button">Start</button>
  </div>
</div>
