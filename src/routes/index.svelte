<script>
  import successkid from "images/successkid.jpg"
  import { pick20RandomMovies } from "../_helpers/utils.ts"
</script>

<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>Movie Critic Matchmaker</h1>

<figure>
  <img alt="Success Kid" src={successkid} />
  <figcaption>
    Find out which top movie critics you agree with the most...and the least!
  </figcaption>
</figure>

<p><a href="rate">Start</a></p>
<p>{pick20RandomMovies()}</p>
