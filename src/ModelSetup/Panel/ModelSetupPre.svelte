<script>
  import { sidePanelSelection } from "../../store";
  import BusSlider from "./BusSlider.svelte";
  import RailSlider from "./RailSlider.svelte";
  import Results from "./Results/Results.svelte";
  let selected = "Bus";
  let progressBar;
  const modes = ["Bus", "Rail", "Car"];
  let runScenario = false;
  let scenarioName = "";
  function handleClick() {
    if (!scenarioName) {
      alert("Enter Scenario Name");
      return;
    }
    progressBar = true;
    setTimeout(() => {
      runScenario = true;
      progressBar = false;
    }, 5000);
  }
</script>

<div class="sidePanel" style="width: {$sidePanelSelection ? '500px' : '0px'};">
  {#if progressBar}
    <h1>Loading</h1>
  {:else if !runScenario}
    <div style="margin:20px">
      <h3>Create a policy scenario for Base Scenario</h3>
      <label for="scenarioName">Name:</label>
      <input
        type="text"
        id="scenarioName"
        name="scenarioName"
        bind:value={scenarioName}
        placeholder="Enter scenario name"
        style="padding: 8px; margin-top: 5px; width: 100%; max-width: 230px;border:solid #201b59 2px"
      />
      <br /><br /> <label>Choose focus of policy:</label>
      <div class="box" style="display: flex;">
        {#each modes as mode}
          <button
            class:selected={selected === mode}
            on:click={() => (selected = mode)}
          >
            {mode}
          </button>
        {/each}
      </div>
      <br />
      <label>Change variables:</label>
      {#if selected == "Bus"}
        <div class="box">
          <label>{selected} wait time factor:</label>
          <BusSlider />
        </div>
        <br />
        <div class="box">
          <label>{selected} bus journey time factor:</label>
          <BusSlider />
        </div>
        <br />

        <div class="box">
          <label>{selected} fare factor:</label>
          <BusSlider />
        </div>
      {:else}
        <div class="box">
          <label>{selected} wait time factor:</label>
          <RailSlider />
        </div>
        <br />
        <div class="box">
          <label>{selected} journey time factor:</label>
          <RailSlider />
        </div>
        <br />

        <div class="box">
          <label>{selected} fare factor:</label>
          <RailSlider />
        </div>
      {/if}
    </div>
    <div
      style="display: flex; justify-content: right; margin: 20px;font-size:14px"
    >
      <button id="run" style="border:solid #201b59 1px" on:click={handleClick}
        >Run Scenario</button
      >
    </div>{:else}
    <div style="margin:20px">
      <Results {scenarioName} />
    </div>
  {/if}
</div>

<style>
  .sidePanel {
    right: 0px;
    height: 100vh;
    color: #201b59;
    width: 0px;
    background-color: #f7f7f7;
    position: absolute;
    z-index: 1000;
    top: 60px;
    transition: width ease 1.5s 2s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6); /* Drop shadow */
  }
  label {
    font-size: 13px;
    font-weight: 700;
  }
  .box {
    width: 95%;

    gap: 20px; /* space between items */
    padding: 5px 10px; /* space on the sides */
    border-radius: 10px;
    background-color: #e2e2e2;
  }
  .box > * {
    flex: 1;
  }
  button {
    border-radius: 10px;
    padding: 10px;
    background-color: white;
    position: relative;
    top: 3px;
  }
  button:hover:not(.selected) {
    background-color: rgba(32, 27, 89, 0.3);
  }
  #run:hover {
    background-color: rgba(27, 89, 30, 0.8);
    color: white;
  }
  .selected {
    background: linear-gradient(
      to right,
      #29245e 0%,
      #029ade 90%,
      #029ade 100%
    );
    color: white;
  }
</style>
