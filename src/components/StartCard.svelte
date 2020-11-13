<script>
  import fresh from "images/fresh.png"
  import rotten from "images/rotten.png"
</script>

<style>
  img {
    width: 100%;
    max-width: 50px;
    max-height: 50px;
    margin: 1rem;
  }

  .content {
    height: 100%;
    padding: 2rem;
  }

  .freshOrRottenContainer {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }

  .fresh,
  .rotten {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }

  .skipContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }

  .startCard {
    display: flex;
    flex-direction: column;
    background: #505050;
    color: white;
    text-align: center;
    font-size: 18px;
  }
</style>

<div class="card startCard">
  <div class="content">
    <div class="freshOrRottenContainer">
      <div class="rotten">
        <img alt="rotten" src={rotten} />
        Swipe left for rotten
      </div>
      <div class="fresh">
        <img alt="fresh" src={fresh} />
        Swipe right for fresh
      </div>
    </div>
    <div class="skipContainer">Swipe up to skip</div>
    <div class="beginContainer">Swipe anywhere to begin!</div>
  </div>
</div>
