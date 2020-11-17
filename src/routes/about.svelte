<script>
  import fresh from "images/fresh.png"
</script>

<style>
  img {
    width: 86px;
    margin-bottom: 1rem;
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

  h2 {
    font-family: "Inter-SemiBold";
  }

  @media (max-width: 320px) {
    img {
      width: 70px;
    }
  }
</style>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="container">
  <img alt="fresh tomato" src={fresh} />
  <div>
    <h2>How does it work?</h2>
    <p>
      We selected about a hundred polarizing movies made recently-ish. Every
      visit you'll see fourty random movies from this list -- of the movies you
      rated, we'll find the top critics who you agree with the most. We'll also
      show you the critics you disagree with the most.
    </p>

    <h2>Why are the results different each time?</h2>
    <p>
      Every visit you'll rate a different set of movies. Not all critics have
      reviewed the movies you rate, but you'll be matched with ones who have.
    </p>

    <h2>Why isn't my favorite movie on this list?</h2>
    <p>
      Maybe it's not polarizing enough, maybe it doesn't have enough official
      reviews by top critics. Listen, my husband made this list so take it up
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
      inspired by her cinephile husband, so I guess you can blame them both.
    </p>
    <h2>Speak nerdy to me</h2>
    <p>This site was built using Svelte!</p>
  </div>
</div>
