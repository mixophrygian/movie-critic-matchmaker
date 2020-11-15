<script>
  import instructions from "images/instructions.png"
  import { fade } from "svelte/transition"
  import { goto } from "@sapper/app"
  function rate() {
    goto("/rate")
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    font-size: 2em;
    margin: 1rem 0;
    text-align: center;
  }

  img {
    width: 85%;
    min-height: 281px;
  }
</style>

<div class="container">
  <h1>Get ready to <br />rate 40 movies</h1>
  <div class="container" in:fade={{ delay: 150, duration: 550 }}>
    <img
      src={instructions}
      alt="swipe left for rotten, swipe right for fresh" />
    <button on:click={rate} class="button">Start</button>
  </div>
</div>
