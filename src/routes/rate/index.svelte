<script context="module">
  import {
    allMovies,
    criticObjects,
    completedChoices,
    userChoices,
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
    findCriticsWhoAgree,
    findCriticsWhoDisagree,
  } from "../../_helpers/matchCriticsToUserInput"

  export let completed
  let agreed
  let disagreed
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
      agreed = findCriticsWhoAgree($criticObjects)($userChoices)
      disagreed = findCriticsWhoDisagree($criticObjects)($userChoices)
      userChoices.set([])
      progressBars.set({ fresh: 0, rotten: 0 })
    }
  }

  function skipCurrentMovie() {
    const board = document.querySelector("#board")
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
  #board {
    width: 100vw;
    height: 74vh;
    position: absolute;
    top: 50px;
    overflow: hidden;
    background-color: transparent;
  }

  :global(.frame) {
    width: 300px;
    height: 430px;
    position: absolute;
    top: 43%;
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

  @media (max-width: 321px) {
    :global(.frame) {
      width: 250px;
      height: 369px;
    }

    .skip {
      bottom: 7%;
      left: 37%;
    }
  }

  /* iphone 6, 7, 8 */
  @media (min-height: 666px) {
    .skip {
      bottom: 7%;
    }
  }

  /* iphone 8 plus */
  @media (min-height: 735px) {
    #board {
      height: 85vh;
    }
    .skip {
      bottom: 12%;
    }
  }

  /* iphone X */
  @media (min-height: 812px) {
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
  <ProgressBar />
  <div in:fade={{ delay: 350, duration: 650 }} bind:this={board} id="board" />
  <button on:click={skipCurrentMovie} class="skip">Skip</button>
{/if}
