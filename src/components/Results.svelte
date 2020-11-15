<script>
  import fresh from "images/fresh.png"
  import rotten from "images/rotten.png"
  import { goto } from "@sapper/app"

  export let agreed
  export let disagreed

  const agreedNames = agreed.map((name) => name[0]).join("\n")
  const disagreedNames = disagreed.map((name) => name[0]).join("\n")

  function reload() {
    goto("/instructions")
  }

  let expanded

  function toggleCollapse(e, name) {
    expanded = name
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  img {
    margin-right: 1rem;
    align-self: start;
    max-width: 50px;
  }

  .iconAndText {
    display: flex;
  }

  .nameContainer {
    display: flex;
    flex-direction: column;
  }

  .agreedContainer {
    margin-bottom: 3rem;
  }

  button {
    background: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 2rem;
    font-size: 18px;
    align-self: center;
    margin-top: 2rem;
  }

  h2 {
    margin-bottom: 2rem;
    font-weight: bold;
  }

  .name {
    line-height: 1.25;
    font-size: 1rem;
    padding-bottom: 0.5rem;
  }

  .stats {
    font-size: small;
    padding-left: 1rem;
    margin-bottom: 1rem;
  }

  .underline {
    text-decoration: underline;
  }

  .collapse {
    display: block;
    max-height: 0px;
    overflow: hidden;
    font-size: x-small;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
  }

  .collapse.show {
    max-height: 99em;
    margin-top: 0.5rem;
    transition: max-height 0.5s ease-in-out;
  }

  @media (max-width: 320px) {
    .leasth2 {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .stats {
      padding-left: 0.5rem;
    }

    h2 {
      font-size: 19px;
    }

    .stats {
      font-size: smaller;
    }

    button {
      margin-top: 0;
    }

    .agreedContainer {
      margin-bottom: 0;
    }
  }
</style>

<div class="container">
  <div class="agreedContainer">
    <h2>Your favorite critics</h2>
    <div class="iconAndText">
      <img class="fresh" alt="fresh" src={fresh} />
      <div class="nameContainer">
        {#each agreed as name, index}
          <div
            role="button"
            on:click={(e) => toggleCollapse(e, name[0])}
            class="tapContainer">
            <div class="name">{name[0]}</div>
            <div class="stats">
              <span class="underline">Agreed on
                {name[1].moviesAgreed.length}
                movie{name[1].moviesAgreed.length == 1 ? '' : 's'}
              </span>
              <div class={expanded === name[0] ? 'show collapse' : 'collapse'}>
                {name[1].moviesAgreed.map((movie) => movie.title).join(', ')}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="disagreedContainer">
    <h2 class="leasth2">Your least-favorite critics</h2>
    <div class="iconAndText">
      <img class="rotten" alt="rotten" src={rotten} />
      <div class="nameContainer">
        {#each disagreed as name, index}
          <div
            on:click={(e) => toggleCollapse(e, name[0])}
            role="button"
            lass="tapContainer">
            <div class="name">{name[0]}</div>
            <div class="stats">
              <span class="underline">
                Disagreed on
                {name[1].moviesDisagreed.length}
                movie{name[1].moviesDisagreed.length == 1 ? '' : 's'}
              </span>

              <div class={expanded === name[0] ? 'show collapse' : 'collapse'}>
                {name[1].moviesDisagreed.map((movie) => movie.title).join(', ')}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <button on:click={reload}>again!</button>
</div>
