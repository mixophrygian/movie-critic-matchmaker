<script>
  export let imageName
  export let alt
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()

  function makeAChoice(value) {
    dispatch("choice", {
      value,
    })
  }
</script>

<style>
  img {
    width: 100%;
    max-width: 40px;
    margin: 0 0 1em 0;
  }
</style>

<img
  on:click={makeAChoice(alt)}
  class="buttons"
  {alt}
  role="button"
  src={imageName} />
