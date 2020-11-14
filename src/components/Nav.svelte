<script>
  import Hamburger from "./Hamburger.svelte"
  import Menu from "./Menu.svelte"
  export let segment
  export let sidebar = false
</script>

<style>
  header {
    font-family: Inter;
    padding: 0 1em;
    background-color: #000;
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<header
  class="flex justify-between bg-gray-200 p-2 items-center text-gray-600 border-b-2">
  <!-- left side -->
  <Menu />
  <a href=".">Movie critic Matchmaker</a>
  <!-- right side -->
  <nav class="flex">
    <Hamburger bind:open={sidebar} />
  </nav>
</header>
