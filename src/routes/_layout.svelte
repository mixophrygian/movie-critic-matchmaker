<script>
  import Nav from "../components/Nav.svelte"
  export let segment
</script>

<style>
  :global(body) {
    background-color: darkred;
  }
  main {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;
    background-color: darkred;
    color: white;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<main>
  <Nav {segment} />
  <slot />
</main>
