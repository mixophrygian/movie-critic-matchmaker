<script context="module">
  import {
    allMovies,
    criticObjects,
    completedChoices,
    userChoices,
  } from "../../stores.js"

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
  import {
    findCriticsWhoAgree,
    findCriticsWhoDisagree,
  } from "../../_helpers/matchCriticsToUserInput"
  import Results from "../../components/Results.svelte"
  import NoMatches from "../../components/NoMatches.svelte"

  export let movies
  export let critics
  export let completed
  let user_choices
  let agreed
  let disagreed

  $criticObjects = critics
  $allMovies = movies
  $completedChoices = completed

  const unsubscribe = userChoices.subscribe((value) => {
    user_choices = value
  })
  onDestroy(unsubscribe)

  let board
  onMount(() => {
    let carousel = new Carousel(board)
  })

  $: {
    if ($completedChoices) {
      agreed = findCriticsWhoAgree($criticObjects)($userChoices)
      disagreed = findCriticsWhoDisagree($criticObjects)($userChoices)
      console.log(agreed, disagreed)
    }
  }
</script>

<style>
  #board {
    width: 100vw;
    height: 94vh;
    position: absolute;
    top: 50px;
    overflow: hidden;
    background-color: transparent;
  }

  :global(.frame) {
    width: 300px;
    height: 444px;
    position: absolute;
    top: 43%;
    left: 50%;
    border-radius: 3%;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    background-color: transparent;
    color: black;
    border: 12px solid white;
    transform: translateX(-50%) translateY(-50%);
  }

  :global(.card) {
    width: 100%;
    height: 100%;
  }

  .resultsPage {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 2rem;
  }

  @media (max-width: 321px) {
    :global(.card) {
      width: 250px;
      height: 369px;
      background-size: 100%;
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
  <div in:fade={{ delay: 150, duration: 550 }} bind:this={board} id="board" />
{/if}
