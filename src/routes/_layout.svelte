<script>
  import Nav from "../components/Nav.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import UseAPhone from "../components/UseAPhone.svelte";
  import { onMount } from "svelte";
  export let segment;

  let width;
  let open = false;

  onMount(() => {
    //alert(window.innerHeight)
  });
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
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  }
  :global(body) {
    background-color: #110309;
    font-family: Inter, Helvetica, Arial, sans-serif;
    padding: 0;
    touch-action: manipulation;
  }

  :global(.button) {
    background: white;
    color: black;
    border: 3px solid white;
    border-radius: 20px;
    padding: 0.2rem 1rem;
    font-family: "Inter-SemiBold";
    font-size: 14px;
    margin-top: 1.5rem;
  }

  :global(.button:active) {
    background: black;
    color: white;
    border-color: white;
  }

  main {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #110309;
    color: white;
    margin: 0 auto;
    box-sizing: border-box;
    overflow-x: hidden;
  }
</style>

<svelte:window bind:innerWidth={width} />
{#if width > 769}
  <UseAPhone />
{:else}
  <main>
    <Nav {segment} bind:sidebar={open} />
    <Sidebar bind:open />
    <slot />
  </main>
{/if}
