<script>
  import ratedMovies from "images/rated-movies.png"
  import social from "images/social.png"
  import { goto } from "@sapper/app"
  import { fade } from "svelte/transition"

  function rate() {
    goto("/instructions")
  }
</script>

<style>
  h1,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
  }

  img {
    width: 90%;
    min-height: 257px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 0 auto;
    font-size: 1.5rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .description {
    font-size: 14px;
  }

  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 2rem;
  }

  @media (max-width: 321px) {
    .button {
      margin-top: 1rem;
    }

    .container {
      padding: 1rem;
    }

    img {
      min-width: 425px;
    }
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  /* iphone 6, 7, 8 */
  @media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) {
    .container {
      padding: 1.25rem;
    }
    h1 {
      margin-bottom: 0;
    }
    p {
      margin: 0;
    }
  }
</style>

<svelte:head>
  <title>Movie Critic Matchmaker</title>
</svelte:head>
<div in:fade={{ delay: 50, duration: 450 }} class="container">
  <div class="content">
    <h1>Who's your movie critic match?</h1>

    <img alt="Critics who disagree" src={ratedMovies} />
    <p class="description">
      Find out which top movie critics you agree with the most...and the least!
      Rate these movies as rotten or fresh to find out.
    </p>

    <button on:click={rate} class="button">Find my match</button>
  </div>
</div>
