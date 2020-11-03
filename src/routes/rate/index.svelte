<script context="module">
  import {
    allMovies,
    criticObjects,
    completedChoices,
    userChoices,
  } from "../../stores.js"

  export async function preload() {
    const response = await this.fetch("moviesWithPosters.json")
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
  import { onDestroy, onMount } from "svelte"
  import { Carousel } from "../../_helpers/carousel.ts"
  import {
    findCriticsWhoAgree,
    findCriticsWhoDisagree,
  } from "../../_helpers/matchCriticsToUserInput"
  import StartCard from "../../components/StartCard.svelte"

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
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: transparent;
  }

  :global(.card) {
    width: 300px;
    height: 445px;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 1%;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    background-color: white;
    color: black;
    transform: translateX(-50%) translateY(-50%);
  }
</style>

<svelte:head>
  <title>Rate</title>
</svelte:head>

{#if $completedChoices}
  <h1>Results</h1>
  <div>{$userChoices}</div>
{/if}

{#if !$completedChoices}
  <div bind:this={board} id="board">
    <StartCard />
  </div>
{/if}
