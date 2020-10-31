<script>
  import { onMount } from "svelte"
  import { Carousel } from "../../_helpers/carousel.ts"
  import StartCard from "../../components/StartCard.svelte"
  import { stores } from "@sapper/app"
  let apiKey = ""
  const { session } = stores()
  session.subscribe((value) => {
    apiKey = value.OMDB_API
  })

  let board
  onMount(() => {
    let carousel = new Carousel(board, apiKey)
  })
</script>

<style>
  #board {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
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

<h1>Rate home</h1>

<div>A movie will go here</div>
<div bind:this={board} id="board">
  <StartCard />
</div>
