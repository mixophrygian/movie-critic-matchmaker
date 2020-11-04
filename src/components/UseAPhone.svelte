<script>
  import trash from "images/trash.png"
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 2rem;
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
  <img src={trash} alt="trash" />
  <p>This site is made for mobile devices in portrait mode! Theeeeenks.</p>
</div>
