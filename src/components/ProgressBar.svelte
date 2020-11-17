<script>
  import fresh from "images/fresh.png"
  import rotten from "images/rotten.png"

  import { onMount } from "svelte"
  export let freshPercent
  export let rottenPercent

  function bar() {
    let fresh = document.getElementById("fresh")
    let rotten = document.getElementById("rotten")

    // For 40 movies, one rating adds 2.5%
    return {
      fresh: fresh,
      rotten: rotten,
      setFresh: function (percent) {
        this.fresh.style.width = percent + "%"
      },
      setRotten: function (percent) {
        this.rotten.style.width = percent + "%"
      },
    }
  }

  let progressBar

  onMount(() => {
    progressBar = bar()
    // progressBar.setFresh(30)
    // progressBar.setRotten(30)
  })
</script>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 20px;
    margin: 0 0.75rem;
  }

  .tomato {
    padding-bottom: 0.25rem;
  }
  .progress {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    max-width: 288px; /* OPTIONAL */
    margin: 1rem 0;
    height: 13px;
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 10px;
  }

  .bar {
    box-sizing: border-box;
    position: absolute;
    width: 0;
    transition: width 0.5s;
    height: 11px;
  }

  #fresh {
    background-color: #e84628;
    top: 0;
    right: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  #rotten {
    background-color: #58c463;
    top: 0;
    left: 0;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
</style>

<div class="container">
  <img src={rotten} alt="rotten" />
  <div class="progress">
    <div id="rotten" class="bar" />
    <div id="fresh" class="bar" />
  </div>
  <img class="tomato" src={fresh} alt="fresh" />
</div>
