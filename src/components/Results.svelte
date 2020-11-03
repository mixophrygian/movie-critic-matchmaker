<script>
  import trash from "images/trash.png"
  import popcornDrink from "images/popcorn-drink.png"
  export let agreed
  export let disagreed

  const agreedNames = agreed.map((name) => name[0]).join("\n")
  const disagreedNames = disagreed.map((name) => name[0]).join("\n")
  console.log(agreedNames)
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-around;
  }
  img {
    margin-right: 1rem;
    align-self: start;
  }

  .popcorn {
    max-width: 130px;
  }

  .trash {
    max-width: 110px;
  }

  .iconAndText {
    display: flex;
  }

  .nameContainer {
    display: flex;
  }

  .disagreedContainer {
  }

  h2 {
    margin-bottom: 2rem;
  }
</style>

<div class="container">
  <div class="agreedContainer">
    <h2>Your favorite critics</h2>
    <div class="iconAndText">
      <img class="popcorn" alt="popcorn and drink" src={popcornDrink} />
      <div class="nameContainer">{agreedNames}</div>
    </div>
  </div>
  <div class="disagreedContainer">
    <h2>Your least-favorite critics</h2>
    <div class="iconAndText">
      <img class="trash" alt="trash" src={trash} />
      <div class="nameContainer">{disagreedNames}</div>
    </div>
  </div>
</div>
