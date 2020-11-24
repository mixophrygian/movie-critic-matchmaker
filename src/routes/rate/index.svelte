<script context="module">
  import {
    allMovies,
    criticObjects,
    completedChoices,
    userChoices,
    userSkipped,
    progressBars,
  } from "../../stores.js"

  import { ONE_MOVIE_PERCENTAGE } from "../../_helpers/utils.ts"
  export async function preload() {
    const response = await this.fetch("mostReviewedMoviesWithPosters.json")
    const movies = await response.json()
    const criticObjects = await this.fetch("consolidatedCriticObjects.json")
    const critics = await criticObjects.json()
    return {
      movies,
      critics,
    }
  }
</script>

<script>
  import { fly, fade } from "svelte/transition"
  import { onDestroy, onMount } from "svelte"
  import { Carousel } from "../../_helpers/carousel.ts"
  import Results from "../../components/Results.svelte"
  import NoMatches from "../../components/NoMatches.svelte"
  import ProgressBar from "../../components/ProgressBar.svelte"
  import {
    // findCriticsWhoAgree,
    // findCriticsWhoDisagree,
    selectTopAndBottomCritics,
  } from "../../_helpers/matchCriticsToUserInput"

  export let completed
  let agreed
  let disagreed
  let both
  export let movies
  export let critics

  $criticObjects = critics
  $allMovies = movies

  $completedChoices = completed

  let board
  let carousel
  onMount(() => {
    carousel = new Carousel(board)
  })

  $: {
    if ($completedChoices) {
      both = selectTopAndBottomCritics($criticObjects)(
        $userChoices,
        $userSkipped
      )
      agreed = both.agreed
      disagreed = both.disagreed
      progressBars.set({ fresh: 0, rotten: 0 })
    }
  }

  function skipCurrentMovie() {
    const board = document.querySelector("#board")
    userSkipped.update((skipped) => [
      ...skipped,
      { title: board.lastChild.firstChild.firstChild.textContent },
    ])
    board.removeChild(board.lastChild)
    progressBars.update((bars) => {
      return {
        fresh: bars.fresh + ONE_MOVIE_PERCENTAGE / 2,
        rotten: bars.rotten + ONE_MOVIE_PERCENTAGE / 2,
      }
    })
    if (!board.firstChild) {
      completedChoices.update(() => true)
    } else {
      carousel.handle()
    }
  }
</script>

<style>
  .container {
    height: 78vh;
  }
  #board {
    width: 100vw;
    height: 74vh;
    position: absolute;
    top: 90px;
    overflow: hidden;
    background-color: transparent;
  }

  :global(.frame) {
    width: 300px;
    height: 430px;
    position: absolute;
    top: 52%;
    left: 50%;
    border-radius: 3%;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    background-size: 100%;
    color: #110309;
    background-color: white;
    border: 12px solid white;
    transform: translateX(-50%) translateY(-50%);
  }

  :global(.card) {
    width: 100%;
    height: 100%;
    background-size: 100%;
  }

  .skip {
    position: absolute;
    left: 40%;
    bottom: 3%;
    color: #c8c8c8;
    background-color: #261a1f;
    border: 3px solid #261a1f;
    font-size: 14px;
    border-radius: 20px;
    padding: 0.3rem 1.45rem;
    font-family: "Inter-SemiBold";
  }

  .skip:active {
    color: #8f8f8f;
  }

  /* in case users want to copy the name of their favorite critic */
  .resultsPage {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 2rem;
    user-select: text;
    -webkit-touch-callout: text;
    -webkit-user-select: text;
  }

  @media only screen and (min-device-width: 320px) and (max-device-height: 568px) {
    #board {
      height: 84vh;
    }
    :global(.frame) {
      width: 200px;
      height: 286px;
      top: 45%;
    }

    :global(body) {
      height: 100vh;
    }

    .skip {
      bottom: 4%;
      left: 37%;
    }
  }

  /* Moto G4 */
  @media (max-width: 360px) {
    .container {
      height: 90vh;
    }
    #board {
      height: 86vh;
    }
    :global(.frame) {
      top: 53%;
    }
    .skip {
      bottom: 0;
    }
  }

  /* janky in-app browsers iphone X */

  @media only screen and (min-width: 375px) and (min-height: 611px) {
    .container {
      height: 82vh;
    }
    .skip {
      bottom: 0%;
    }
    :global(.frame) {
      width: 250px;
      height: 358px;
      top: 47%;
    }
  }

  @media only screen and (min-height: 612px) and (max-height: 660px) {
  }

  /* iphone 6, 7, 8 */
  @media only screen and (min-width: 375px) and (max-height: 667px) and (-webkit-device-pixel-ratio: 2) {
    .container {
      height: 82vh;
    }
    .skip {
      bottom: 5%;
    }
    :global(.frame) {
      width: 250px;
      height: 358px;
      top: 43%;
    }
  }

  /* iphone X and iphone 11 pro */
  @media only screen and (min-width: 375px) and (min-height: 612px) and (max-height: 812px) {
    #board {
      height: 86vh;
    }
    :global(.frame) {
      width: 275px;
      height: 394px;
      top: 38%;
    }
    .skip {
      bottom: 8%;
    }
  }

  /* iphone 8 plus */

  @media only screen and (min-width: 414px) and (max-height: 736px) and (-webkit-device-pixel-ratio: 3) {
    .container {
      height: 82vh;
    }
    :global(.frame) {
      top: 46%;
    }
    #board {
      height: 85vh;
    }
    .skip {
      bottom: 5%;
    }
  }

  /* iphone 11 */
  @media only screen and (min-width: 414px) and (min-height: 896px) {
    :global(.frame) {
      top: 47%;
    }
    .skip {
      bottom: 11%;
    }
  }

  /* iphone 12 max */
  @media (min-width: 428px) {
    :global(.frame) {
      width: 300px;
      height: 430px;
      top: 40%;
    }
    .skip {
      bottom: 16%;
    }
  }
</style>

<svelte:head>
  <title>Rate</title>
</svelte:head>

{#if $completedChoices}
  <!-- TODO: fade in? -->
  <div in:fly={{ y: 10, duration: 500 }} class="resultsPage">
    {#if agreed.length}
      <Results {agreed} {disagreed} />
    {:else}
      <NoMatches />
    {/if}
  </div>
{/if}

{#if !$completedChoices}
  <div class="container">
    <ProgressBar />
    <div in:fade={{ delay: 350, duration: 650 }} bind:this={board} id="board" />
    <button on:click={skipCurrentMovie} class="skip">Skip</button>
  </div>
{/if}
