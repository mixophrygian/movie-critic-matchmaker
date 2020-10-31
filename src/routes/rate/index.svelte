<script>
  import { onMount } from "svelte"
  import { Carousel } from "../../_helpers/carousel.ts"
  let board
  onMount(() => {
    let carousel = new Carousel(board)
  })
</script>

<style>
  #board {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: rgb(245, 247, 250);
  }

  :global(.card) {
    width: 320px;
    height: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 1%;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    background-color: white;
    transform: translateX(-50%) translateY(-50%);
  }
</style>

<svelte:head>
  <title>Rate</title>
</svelte:head>

<h1>Rate home</h1>

<div>A movie will go here</div>
<div bind:this={board} id="board">
  <div class="card" />
</div>
