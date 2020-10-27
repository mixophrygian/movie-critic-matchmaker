<script>
  import Nav from "../components/Nav.svelte"

  let xDown
  let yDown

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX
    yDown = evt.touches[0].clientY
  }

  function inRatingSection() {
    return window.location.pathname.substr(0, 5) === "/rate"
  }

  function handleTouchMove(evt) {
    console.log(inRatingSection())
    if (!inRatingSection()) return
    if (!xDown || !yDown) {
      return
    }

    var xUp = evt.changedTouches[0].clientX
    var yUp = evt.changedTouches[0].clientY

    var xDiff = xDown - xUp
    var yDiff = yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        console.log("left swipe")
        window.location.href = "./rate/what-is-sapper"
      } else {
        console.log("right swipe")
        window.history.back()
        /* right swipe */
      }
    } else {
      if (yDiff > 0) {
        console.log("up swipe")
        /* up swipe */
      } else {
        console.log("down swipe")
        /* down swipe */
      }
    }
    /* reset values */
    xDown = null
    yDown = null
  }
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    border: 1px solid red;
    height: 100vh;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<!-- <Nav {segment}/> -->

<main on:touchstart={handleTouchStart} on:touchend={handleTouchMove}>
  <slot />
</main>
