<script>
  export let title
</script>

<style>
  .movieTitle {
    color: rgba(0, 0, 0, 0.15);
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>

<div class="card">
  <!-- Movie title should never be apparent but we give it some visibility
  in case the movie image doesn't load. -->
  <div alt={title} class="movieTitle">{title}</div>
</div>
