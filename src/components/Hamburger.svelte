<script>
  export let open = false
</script>

<style>
  button {
    border: none;
    background-color: black;
    color: white;
  }
  svg {
    min-height: 16px;
    transition: transform 0.3s ease-in-out;
  }

  svg line {
    /* `currentColor` means inherit color from the text color */
    stroke: currentColor;
    stroke-width: 2;
    transition: transform 0.3s ease-in-out;
  }

  /* adjust the Z-index, so that the icon is on top of the sidebar */
  button {
    z-index: 20;
  }

  .open svg {
    transform: scale(0.7);
  }

  /* rotate the top line */
  .open #top {
    transform: translate(2px, 0px) rotate(45deg);
  }

  /* hide the middle */
  .open #middle {
    opacity: 0;
  }

  /* rotate the bottom line */
  .open #bottom {
    transform: translate(-10px, 6px) rotate(-45deg);
  }
</style>

<!-- defines a CSS class `.open` when `open == true` -->
<button class:open on:click={() => (open = !open)}>
  <!-- svg with 3 lines -->
  <svg width="20" height="14">
    <line id="top" x1="0" y1="2" x2="20" y2="2" />
    <line id="middle" x1="0" y1="8" x2="20" y2="8" />
    <line id="bottom" x1="0" y1="14" x2="20" y2="14" />
  </svg>
</button>
