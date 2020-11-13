<script>
  import Nav from "../components/Nav.svelte"
  import UseAPhone from "../components/UseAPhone.svelte"
  export let segment

  let width
</script>

<style>
  :global(body) {
    background-color: #333;
    height: 100vh;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }
  main {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #333;
    color: white;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<svelte:window bind:innerWidth={width} />
{#if width > 415}
  <UseAPhone />
{:else}
  <main>
    <Nav {segment} />
    <slot />
  </main>
{/if}
