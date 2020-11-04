<script>
  import swipeLeft from "images/swipeLeft.svg"
  import swipeRight from "images/swipeRight.svg"
  import swipeUp from "images/swipeUp.svg"
  import fresh from "images/fresh.png"
  import rotten from "images/rotten.png"
  import skip from "images/skip.svg"
</script>

<style>
  img {
    width: 100%;
    max-width: 50px;
  }

  .hands {
    max-width: 50px;
    color: white;
  }

  .up {
    max-width: 60px;
  }

  .skip {
    max-width: 40px;
    margin-bottom: 1rem;
  }

  .freshOrRottenContainer {
    display: flex;
    justify-content: space-around;
  }

  .skipContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .startCard {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: #3a3939;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-size: xx-large;
  }
</style>

<div class="card startCard">
  Swipe to rate
  <div class="freshOrRottenContainer">
    <img alt="rotten" src={rotten} />
    <img alt="swipe left for rotten" class="hands" src={swipeLeft} />
    <img alt="swipe right for fresh" class="hands" src={swipeRight} />
    <img alt="fresh" src={fresh} />
  </div>
  <div class="skipContainer">
    <img alt="skip" class="skip" src={skip} />
    <img alt="swipe up to skip" class="hands up" src={swipeUp} />
  </div>
</div>
