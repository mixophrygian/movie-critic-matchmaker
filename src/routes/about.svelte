<script>
  import fresh from "images/fresh.png"
</script>

<style>
  img {
    width: 70px;
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
      width: 50px;
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
    <h2>How do you find which critics I agree with the most?</h2>
    <p>
      We count all of the movies you rated that the critic also rated and
      calculate the percentage of movies you both agree on from that total. Some
      critics are more prolific than others -- while one critic may have agreed
      with you on 10 movies, they may also have disagreed with you on 10 other
      movies. (In this case you would have a 50% match) We factor both sets of
      ratings in when finding your match -- ultimately a critic who agrees with
      you the most often will be shown as your highest match. Because it's not a
      perfect science, your second-highest match will be the critic with the
      greatest number of rankings that agreed with yours, regardless of the
      number of movies you disagreed on.
    </p>
    <h2>I haven't seen most of these movies...</h2>
    <p>
      If you tap "Rate different movies" on the results screen, we'll show you
      40 more movies and combine your ratings from both rounds to find your
      critic matches.
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
    <p>This site was built using Svelte and Sapper.</p>
  </div>
</div>
