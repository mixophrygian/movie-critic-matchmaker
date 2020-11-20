<script>
  export let poster
  export let rating
  export let title

  import fresh from "images/fresh-black-bg.png"
  import rotten from "images/rotten-black-bg.png"

  function getImage(rating) {
    if (rating == "fresh") return fresh
    return rotten
  }
</script>

<style>
  .mini-frame {
    width: 72px;
    height: 103px;
    border-radius: 3%;
    margin: 5px;
    background-size: 100%;
    color: #110309;
    background-color: white;
    border: 4px solid white;
    position: relative;
  }

  .mini-card {
    width: 100%;
    height: 100%;
    background-size: 100%;
  }

  img {
    width: 33px;
    height: 33px;
    position: absolute;
    right: -10px;
    bottom: -12px;
  }
</style>

<div class="mini-frame">
  <div style="background-image: url({poster});" class="mini-card">
    <!-- Movie title should never be apparent but we give it some visibility
    in case the movie image doesn't load. -->
  </div>
  <img alt={title} src={getImage(rating)} />
</div>
