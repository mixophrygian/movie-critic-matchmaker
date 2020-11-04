<script>
  import glasses from "images/3DGlasses.png"
</script>

<style>
  img {
    width: 96px;
  }
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    padding: 2rem;
  }
  p {
    margin-bottom: 1.5rem;
  }
</style>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="container">
  <img alt="3D glasses" src={glasses} />
  <div>
    <h2>How does it work?</h2>
    <p>
      We selected 40 polarizing movies made in the last five years. Every visit
      you'll see 20 random movies from this list -- of the movies you rated,
      we'll find the top critics who you agree with the most. We'll also show
      you the critics you disagree with the most.
    </p>

    <h2>Why are the results different each time?</h2>
    <p>
      Each visit you'll see 20 random movies from a list of 40. Not all critics
      have reviewed all movies, so you'll be matched with ones who have.
    </p>

    <h2>Why isn't my favorite movie on this list?</h2>
    <p>
      Maybe it's not polarizing enough, maybe it doesn't have enough official
      reviews by top-critics. Listen, my husband made this list so take it up
      with him.
    </p>
    <h2>Where's the data from?</h2>
    <p>
      Decaying Potatos? Wait that's not it... In any case, data was fetched late
      October 2020.
    </p>
    <h2>Who can I blame for this?</h2>
    <p>
      This is another novelty site by
      <a href="https://twitter.com/EleanorClarinet">Eleanor</a>, but it was
      requested by her husband, so I guess you can blame them both.
    </p>
    <h2>Speak nerdy to me</h2>
    <p>This was built using Sapper and Svelte!</p>
  </div>
</div>
