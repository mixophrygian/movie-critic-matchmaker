<script>
  import fresh from "images/fresh.png"
  import rotten from "images/rotten.png"
  import arrow from "images/arrow.svg"
  import { goto } from "@sapper/app"

  export let agreed
  export let disagreed

  const agreedNames = agreed.map((name) => name[0]).join("\n")
  const disagreedNames = disagreed.map((name) => name[0]).join("\n")

  function reload() {
    goto("/instructions")
  }

  let expanded = false

  function toggleCollapse(name, category) {
    console.log("expanded", expanded)
    if (expanded === `${name}${category}`) {
      expanded = false
    } else {
      expanded = `${name}${category}`
    }
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

  .arrowContainer {
    display: flex;
    justify-content: flex-end;
    align-self: start;
    flex: 1;
    transition: all 0.25s ease;
  }

  .arrowContainer.rotated {
    transform: rotateZ(180deg);
  }

  .arrow {
    margin-right: 0;
    width: 40px;
  }

  .resultsContainer {
    display: flex;
    flex-direction: column;
  }

  .singleResultContainer {
    display: flex;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }

  .tapContainer {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
  .agreedContainer {
    margin-bottom: 3rem;
  }

  .button {
    align-self: center;
  }

  h2 {
    font-family: "Inter-SemiBold";
    font-weight: bold;
  }

  .name {
    line-height: 1.25;
    font-size: 1rem;
    font-family: "Inter-Semibold";
  }

  .stats {
    color: gray;
    margin-bottom: 0.5rem;
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
    <div class="resultsContainer">
      {#each agreed as name, index}
        <div class="singleResultContainer">
          <img class="fresh" alt="fresh" src={fresh} />
          <div
            role="button"
            on:click={(e) => toggleCollapse(name[0], 'agreed')}
            class="tapContainer">
            <div>
              <div class="name">{name[0]}</div>
              <div class="stats">
                <span class="agreedOn">Agreed on
                  {name[1].moviesAgreed.length}
                  movie{name[1].moviesAgreed.length == 1 ? '' : 's'}
                </span>
                <div
                  class={expanded == `${name[0]}agreed` ? 'show collapse' : 'collapse'}>
                  {name[1].moviesAgreed.map((movie) => movie.title).join(', ')}
                </div>
              </div>
            </div>
            <div
              class={expanded == `${name[0]}agreed` ? 'arrowContainer rotated' : 'arrowContainer'}>
              <img class="arrow" alt="arrow" src={arrow} />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="disagreedContainer">
    <h2 class="leasth2">Your least-favorite critics</h2>
    <div class="resultsContainer">
      {#each disagreed as name, index}
        <div class="singleResultContainer">
          <img class="rotten" alt="rotten" src={rotten} />
          <div
            on:click={(e) => toggleCollapse(name[0], 'disagreed')}
            role="button"
            class="tapContainer">
            <div>
              <div class="name">{name[0]}</div>
              <div class="stats">
                <span class="disagreedOn">
                  Disagreed on
                  {name[1].moviesDisagreed.length}
                  movie{name[1].moviesDisagreed.length == 1 ? '' : 's'}
                </span>

                <div
                  class={expanded == `${name[0]}disagreed` ? 'show collapse' : 'collapse'}>
                  {name[1].moviesDisagreed
                    .map((movie) => movie.title)
                    .join(', ')}
                </div>
              </div>
            </div>
            <div
              class={expanded == `${name[0]}disagreed` ? 'arrowContainer rotated' : 'arrowContainer'}>
              <img class="arrow" alt="arrow" src={arrow} />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <button class="button" on:click={reload}>again!</button>
</div>
