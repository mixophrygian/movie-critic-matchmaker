<script>
  import Hamburger from "./Hamburger.svelte"
  export let segment
  export let sidebar = false
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Inter;
    padding: 0 1em;
    background-color: #000;
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  nav {
    display: flex;
  }
</style>

<header>
  <a href=".">Movie critic Matchmaker</a>
  <nav>
    <Hamburger bind:open={sidebar} />
  </nav>
</header>
