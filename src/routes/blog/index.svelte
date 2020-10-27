<script context="module">
  export function preload() {
    return this.fetch(`blog.json`)
      .then((r) => r.json())
      .then((posts) => {
        return { posts }
      })
  }

  let xDown
  let yDown

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX
    yDown = evt.touches[0].clientY
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return
    }

    console.log(evt.touches[0])
    var xUp = evt.changedTouches[0].clientX
    var yUp = evt.changedTouches[0].clientY
    console.log("xUp", xUp, "yUp", yUp)

    var xDiff = xDown - xUp
    var yDiff = yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        console.log("left swipe")
      } else {
        console.log("right swipe")
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

  function click(e) {
    console.log("clicked", e.touches)
  }
</script>

<script>
  export let posts
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }

  .box {
    width: 200px;
    height: 200px;
    background-color: red;
  }
</style>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<div
  class="box"
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchMove} />
<ul>
  {#each posts as post}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <li><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></li>
  {/each}
</ul>
