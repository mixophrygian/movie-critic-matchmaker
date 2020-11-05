<script>
  import trash from "images/trash.png"
  import popcornDrink from "images/popcorn-drink.png"
  export let agreed
  export let disagreed

  const agreedNames = agreed.map((name) => name[0]).join("\n")
  const disagreedNames = disagreed.map((name) => name[0]).join("\n")

  function reload() {
    location.reload()
  }
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

  .nameContainer,
  .disagreedContainer {
    display: flex;
    flex-direction: column;
  }

  button {
    background: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 2rem;
    margin-top: 2rem;
    font-size: 18px;
    align-self: center;
  }

  h2 {
    margin-bottom: 2rem;
    font-weight: bold;
  }

  .name {
    line-height: 1.25;
  }

  .stats {
    font-size: x-small;
    padding-left: 1rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 320px) {
    .leasth2 {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 19px;
    }

    .trash {
      max-width: 90px;
    }

    .popcorn {
      max-width: 100px;
    }
  }
</style>

<div class="container">
  <div class="agreedContainer">
    <h2>Your favorite critics</h2>
    <div class="iconAndText">
      <img class="popcorn" alt="popcorn and drink" src={popcornDrink} />
      <div class="nameContainer">
        {#each agreed as name}
          <div class="name">{name[0]}</div>
          <div class="stats">
            (agreed on
            {name[1].moviesAgreed.length}
            movie{name[1].moviesAgreed.length == 1 ? '' : 's'}:
            {name[1].moviesAgreed.map((movie) => movie.title)})
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="disagreedContainer">
    <h2 class="leasth2">Your least-favorite critics</h2>
    <div class="iconAndText">
      <img class="trash" alt="trash" src={trash} />
      <div class="nameContainer">
        {#each disagreed as name}
          <div class="name">{name[0]}</div>
          <div class="stats">
            (disagreed on
            {name[1].moviesDisagreed.length}
            movie{name[1].moviesDisagreed.length == 1 ? '' : 's'}:
            {name[1].moviesDisagreed.map((movie) => movie.title)})
          </div>
        {/each}
      </div>
    </div>
  </div>
  <button on:click={reload}>again!</button>
</div>
