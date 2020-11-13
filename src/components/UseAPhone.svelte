<script>
  import rotten from "images/rotten.png"
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    height: 80vh;
  }

  .contents {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    color: white;
    font-size: large;
  }

  img {
    max-width: 20vw;
  }
</style>

<div class="container">
  <div class="contents">
    <img src={rotten} alt="rotten" />
    <p>This site is made for mobile devices in portrait mode! Theeeeenks.</p>
  </div>
</div>
