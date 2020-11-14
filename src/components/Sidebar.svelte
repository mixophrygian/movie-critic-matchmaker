<script>
  export let open
</script>

<style>
  aside {
    /* offscreen by default */
    right: 100%;
    transition: right 0.3s ease-in-out;
  }

  .open {
    /* slide on screen */
    right: 0;
  }
</style>

<aside
  class="absolute w-full h-full bg-black border-r-2 shadow-lg sm:hidden"
  class:open>
  <nav class="p-12 text-xl">
    <a class="block" on:click={() => (open = !open)} href="about">About</a>
  </nav>
</aside>
