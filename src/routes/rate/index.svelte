<script context="module">
  import { allMovies, completedChoices, userChoices } from "../../stores.js"

  export async function preload() {
    const response = await this.fetch("moviesWithPosters.json")
    const movies = await response.json()
    return {
      movies,
    }
  }
</script>

<script>
  export let movies
  export let completed

  $allMovies = movies
  $completedChoices = completed

  import { onMount } from "svelte"
  import { Carousel } from "../../_helpers/carousel.ts"
  import StartCard from "../../components/StartCard.svelte"

  let board
  onMount(() => {
    let carousel = new Carousel(board)
  })
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
