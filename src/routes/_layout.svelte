<script>
  import Nav from "../components/Nav.svelte"
</script>

<style>
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
  <slot />
</main>
