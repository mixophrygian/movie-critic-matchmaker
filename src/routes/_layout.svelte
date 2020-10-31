<script>
  import Nav from "../components/Nav.svelte"
  import { handleTouchStart, handleTouchMove } from "../_helpers/utils.ts"
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

<main>
  <slot />
</main>
