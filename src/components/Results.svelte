<script>
  import fresh from "images/fresh.png"
  import rotten from "images/rotten.png"
  import twitter from "images/twitter.svg"
  import arrow from "images/arrow.svg"
  import { goto } from "@sapper/app"
  import { randomMovies } from "../stores.js"
  import MiniMovieCard from "../components/MiniMovieCard.svelte"

  export let agreed
  export let disagreed

  const agreedNames = agreed.map((name) => name[0]).join("\n")
  const disagreedNames = disagreed.map((name) => name[0]).join("\n")
  console.log(agreed[0])

  function reload() {
    goto("/instructions")
  }

  let expanded = false

  function toggleCollapse(name, category) {
    if (expanded === `${name}${category}`) {
      expanded = false
    } else {
      expanded = `${name}${category}`
    }
  }
  function getPoster(title) {
    const found = $randomMovies.find((movie) => movie.title === title)
    return found.poster
  }
  let favorite = agreed[0][0]
  let dynamicText = `Turns out my favorite top movie critic is ${favorite}. %0a%0aWho's yours?%0a%0a`
  let dynamicHref = `https://twitter.com/share?url=moviecriticmatchmaker.com&text=${dynamicText}`
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  img {
    margin-right: 1rem;
    align-self: start;
    max-width: 50px;
  }

  .hide {
    width: 0;
  }

  .arrowContainer {
    display: flex;
    justify-content: flex-end;
    align-self: start;
    transition: all 0.25s ease;
  }

  .arrowContainer.rotated {
    transform-origin: center;
    transform: rotate(180deg);
  }

  .arrow {
    margin-right: 0;
    width: 40px;
  }

  .resultsContainer {
    display: flex;
    flex-direction: column;
  }

  .line {
    margin: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }

  .singleResultContainer {
    display: flex;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }

  .tapContainer {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
  .agreedContainer {
    margin-bottom: 3rem;
  }

  .button {
    align-self: center;
  }

  h2 {
    font-family: "Inter-SemiBold";
    font-weight: bold;
  }

  .name {
    line-height: 1.25;
    font-size: 1rem;
    font-family: "Inter-Semibold";
  }

  .stats {
    color: gray;
    margin-bottom: 0.25rem;
  }

  .agreedOn,
  .disagreedOn {
    margin-bottom: 0.5rem;
  }

  .collapse {
    display: block;
    max-height: 0px;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
  }

  .collapse.show {
    max-height: 99em;
    transition: max-height 0.5s ease-in-out;
  }

  .miniMovieList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .buttonContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .twitterLogo {
    margin-right: 0;
    max-width: 25px;
  }

  @media (min-width: 320px) and (max-width: 374px) {
    .leasth2 {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .stats {
      padding-left: 0.5rem;
    }

    h2 {
      font-size: 19px;
    }

    .expanded.container,
    .expanded.stats,
    .expanded.name {
      margin-left: -1.5rem;
      margin-right: -1.75rem;
      padding-left: 0.25rem;
    }

    .stats {
      font-size: smaller;
    }

    button {
      margin-top: 0;
    }

    .agreedContainer {
      margin-bottom: 0;
    }
  }

  @media only screen and (min-width: 375px) {
    .expanded {
      margin-left: 0;
      margin-right: -1rem;
    }
  }
</style>

<div class="container">
  <div class="agreedContainer">
    <h2>Your favorite critics</h2>
    <div class="resultsContainer">
      {#each agreed as name, index}
        <div class="singleResultContainer">
          <img
            class={expanded == `${name[0]}agreed` ? 'hide' : 'fresh'}
            alt="fresh"
            src={fresh} />
          <div
            role="button"
            on:click={(e) => toggleCollapse(name[0], 'agreed')}
            class="tapContainer">
            <div
              class={expanded == `${name[0]}agreed` ? 'expanded container' : ''}>
              <div
                class={expanded == `${name[0]}agreed` ? 'expanded name' : 'name'}>
                {name[0]}
              </div>
              <div
                class={expanded == `${name[0]}agreed` ? 'expanded stats' : 'stats'}>
                <div class="agreedOn">
                  Agreed on
                  {name[1].moviesAgreed.length}
                  movie{name[1].moviesAgreed.length == 1 ? '' : 's'}
                </div>
                <div
                  class={expanded == `${name[0]}agreed` ? 'show collapse' : 'collapse'}>
                  {name[1].moviesAgreed.map((movie) => movie.title).join(', ')}
                  <div class="line" />
                  {name[2].skippedReccomendations.length > 0 ? `Of the movies you skipped, here's their ranking:` : ''}
                  <div class="miniMovieList">
                    {#each name[2].skippedReccomendations as movie}
                      <MiniMovieCard
                        title={movie.title}
                        rating={movie.broadRating}
                        poster={getPoster(movie.title)} />
                    {/each}
                  </div>
                </div>
              </div>
            </div>
            <div
              class={expanded == `${name[0]}agreed` ? 'arrowContainer rotated' : 'arrowContainer'}>
              <img class="arrow" alt="arrow" src={arrow} />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="disagreedContainer">
    <h2 class="leasth2">Your least-favorite critics</h2>
    <div class="resultsContainer">
      {#each disagreed as name, index}
        <div class="singleResultContainer">
          <img
            alt="rotten"
            src={rotten}
            class={expanded == `${name[0]}disagreed` ? 'hide' : 'rotten'} />
          <div
            on:click={(e) => toggleCollapse(name[0], 'disagreed')}
            role="button"
            class="tapContainer">
            <div>
              <div class="name">{name[0]}</div>
              <div
                class={expanded == `${name[0]}disagreed` ? 'expanded stats' : 'stats'}>
                <div class="disagreedOn">
                  Disagreed on
                  {name[1].moviesDisagreed.length}
                  movie{name[1].moviesDisagreed.length == 1 ? '' : 's'}
                </div>

                <div
                  class={expanded == `${name[0]}disagreed` ? 'show collapse' : 'collapse'}>
                  {name[1].moviesDisagreed
                    .map((movie) => movie.title)
                    .join(', ')}
                  <div class="line" />
                  {name[2].skippedReccomendations.length > 0 ? `Of the movies you skipped, here's their ranking:` : ''}
                  <div class="miniMovieList">
                    {#each name[2].skippedReccomendations as movie}
                      <MiniMovieCard
                        title={movie.title}
                        rating={movie.broadRating}
                        poster={getPoster(movie.title)} />
                    {/each}
                  </div>
                </div>
              </div>
            </div>
            <div
              class={expanded == `${name[0]}disagreed` ? 'arrowContainer rotated' : 'arrowContainer'}>
              <img class="arrow" alt="arrow" src={arrow} />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div class="buttonContainer">
    <button class="button" on:click={reload}>Again</button>
    <button class="button"><a target="_blank" href={dynamicHref}><img
          alt="share on twitter"
          class="twitterLogo"
          src={twitter} /></a></button>
  </div>
</div>
