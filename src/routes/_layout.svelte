<script>
  import Nav from "../components/Nav.svelte"
  import Sidebar from "../components/Sidebar.svelte"
  import UseAPhone from "../components/UseAPhone.svelte"
  export let segment

  let width
  let open = false
</script>

<style>
  @font-face {
    font-family: "Inter";
    src: url("/Inter-Regular.woff2") format("woff2"),
      url("/Inter-Regular.woff") format("woff");
  }

  @font-face {
    font-family: "Inter-SemiBold";
    src: url("/Inter-SemiBold.woff2") format("woff2"),
      url("/Inter-SemiBold.woff") format("woff");
  }
  :global(h1) {
    font-family: Inter-SemiBold;
  }

  :global(#sapper) {
    height: 100%;
  }
  :global(body) {
    background-color: #000;
    height: 100vh;
    font-family: Inter, Helvetica, Arial, sans-serif;
    padding: 0;
  }
  main {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #000;
    color: white;
    margin: 0 auto;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
  }
</style>

<svelte:window bind:innerWidth={width} />
{#if width > 415}
  <UseAPhone />
{:else}
  <main>
    <Nav {segment} bind:sidebar={open} />
    <Sidebar bind:open />
    <slot />
  </main>
{/if}
