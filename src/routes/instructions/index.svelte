<script>
  import { goto } from "@sapper/app"
  function rate() {
    goto("/rate")
  }
</script>

<style>
  .button {
    background: white;
    color: black;
    border: none;
    border-radius: 20px;
    padding: 0.3rem 1.45rem;
    font-family: "Inter-SemiBold";
    font-size: 14px;
    margin-top: 1.5rem;
  }
</style>

<div>I am the instructions page!</div>
<button on:click={rate} class="button">Find my match</button>
