<script>
  export let open
</script>

<style>
  aside {
    position: absolute;
    background-color: black;
    /* offscreen by default */
    right: 100%;
    transition: right 0.3s ease-in-out;
    z-index: 19; /*one below the hamburger menu icon*/
    width: 100%;
    height: 100%;
    border-right-width: 2px;
  }

  .open {
    /* slide on screen */
    right: 0;
  }

  nav {
    display: flex;
    flex-direction: column;
    padding: 3rem;
    font-size: 1.25rem;
  }

  a {
    color: inherit;
    text-decoration: inherit;
    margin-bottom: 1rem;
  }
</style>

<aside class:open>
  <nav>
    <a class="block" on:click={() => (open = !open)} href="./">Movie Critic
      Matchmaker</a>
    <a class="block" on:click={() => (open = !open)} href="about">About</a>
  </nav>
</aside>
