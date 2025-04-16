<script>
  import AirResults from "./AirResults.svelte";
  import TransportResultsModeShare from "./TransportResultsModeShare.svelte";
  import TransportResults from "./TransportResultsModeShare.svelte";
  import TransportResultsTotalKm from "./TransportResultsTotalKM.svelte";
  import { map, min, max, legendName, progDone } from "../../../store";
  let selectedOption = "co2";
  export let scenarioName;

  // Only one selected type at a time
  let selected = "transport";

  $: if ($progDone) {
    if (selected == "transport") {
      $map.setPaintProperty("dft-directed-layer", "line-color", [
        "interpolate",
        ["linear"],
        ["get", "FlowDiff"],
        -6000,
        "darkgreen", // Strongly negative = green
        -2000,
        "green",
        -500,
        "limegreen", // Still negative, lighter green
        0,
        "yellow", // Neutral
        100,
        "orange", // Mild positive
        200,
        "red", // Strong positive = red
      ]);

      document.getElementsByClassName(
        "legendContainerDemand"
      )[0].style.opacity = 0;
      document.getElementsByClassName(
        "legendContainerCO2Diff"
      )[0].style.opacity = 0;
      document.getElementsByClassName(
        "legendContainerDemandDiff"
      )[0].style.opacity = 1;
    }
  }
  $: if ($progDone) {
    if (selected == "air") {
      if (selectedOption == "co2") {
        $map.setPaintProperty("dft-directed-layer", "line-color", [
          "interpolate",
          ["linear"],
          ["get", "CO2Diff"],
          -1703238,
          "darkgreen", // Strongly negative = green
          -342420,
          "green",
          -32263,
          "limegreen", // Still negative, lighter green
          0,
          "yellow", // Neutral
          1000,
          "orange", // Mild positive
          5000,
          "red", // Strong positive = red
        ]);
        document.getElementsByClassName(
          "legendContainerDemand"
        )[0].style.opacity = 0;
        document.getElementsByClassName(
          "legendContainerDemandDiff"
        )[0].style.opacity = 0;
        document.getElementsByClassName(
          "legendContainerCO2Diff"
        )[0].style.opacity = 1;

        $min = "-2M";
        $max = "5K";
        $legendName = "CO2";
      }
      if (selectedOption == "nox") {
        $map.setPaintProperty("dft-directed-layer", "line-color", [
          "interpolate",
          ["linear"],
          ["get", "NOxDiff"],
          -3000,
          "darkgreen", // Strongly negative = green
          -500,
          "green",
          -100,
          "limegreen", // Still negative, lighter green
          0,
          "yellow", // Neutral
          5,
          "orange", // Mild positive
          10,
          "red", // Strong positive = red
        ]);
        document.getElementsByClassName(
          "legendContainerDemand"
        )[0].style.opacity = 0;
        document.getElementsByClassName(
          "legendContainerDemandDiff"
        )[0].style.opacity = 0;
        document.getElementsByClassName(
          "legendContainerCO2Diff"
        )[0].style.opacity = 1;

        $min = "-3K";
        $max = "10";
        $legendName = "NOx";
      }
      if (selectedOption == "pm10") {
        $map.setPaintProperty("dft-directed-layer", "line-color", [
          "interpolate",
          ["linear"],
          ["get", "PM10Diff"],
          -50,
          "darkgreen", // Strongly negative = green
          -10,
          "green",
          -5,
          "limegreen", // Still negative, lighter green
          0,
          "yellow", // Neutral
          0,
          "orange", // Mild positive
          1,
          "red", // Strong positive = red
        ]);
        document.getElementsByClassName(
          "legendContainerDemand"
        )[0].style.opacity = 0;
        document.getElementsByClassName(
          "legendContainerDemandDiff"
        )[0].style.opacity = 0;
        document.getElementsByClassName(
          "legendContainerCO2Diff"
        )[0].style.opacity = 1;

        $min = "-50";
        $max = "1";
        $legendName = "PM10";
      }
    }
  }
  function selectType(type) {
    selected = selected === type ? null : type;
  }
</script>

<h3>Results for {scenarioName}</h3>
<div
  class="buttonImg"
  style="display: flex;bottom:50px;gap:20px;transform: translateY(-20px);"
>
  <div class="image-label">
    <label>Transport</label>
    <img
      id="sidePanelimg"
      on:click={() => selectType("transport")}
      src={selected === "transport"
        ? "static/img/transSelected.svg"
        : "static/img/trans.svg"}
      alt="Transport"
    />
  </div>
  <div class="image-label">
    <label>Air</label>
    <img
      id="sidePanelimg"
      on:click={() => selectType("air")}
      src={selected === "air"
        ? "static/img/airSelected.svg"
        : "static/img/air.svg"}
      alt="Air"
    />
  </div>
  <div class="image-label">
    <label>Noise</label>
    <img
      id="sidePanelimg"
      on:click={() => selectType("noise")}
      src={selected === "noise"
        ? "static/img/noiseSelected.svg"
        : "static/img/noise.svg"}
      alt="Noise"
    />
  </div>
</div>
{#if selected == "transport"}
  <div style="position: relative;top:-50px">
    <h4>Mode Share:</h4>
    <div class="box">
      <TransportResultsModeShare />
    </div>

    <h4>Total Vehicle KM Traveled by Road Class:</h4>
    <div class="box">
      <TransportResultsTotalKm />
    </div>
  </div>
{/if}
{#if selected == "air"}<select
    bind:value={selectedOption}
    style="    position: absolute;
    top: 0px;
    left: -100px;
    top: 10px;
    border-radius: 10px;
    border: 1px solid #201b59;"
  >
    <option value="co2">CO2</option>
    <option value="nox">NOx</option>
    <option value="pm10">PM10</option>
  </select>
  <div style="position: relative;top:-50px">
    <h4>Air Emissions (CO2, NOx, PM10):</h4>

    <div class="box">
      <AirResults
        chartId="chart-co2"
        data={[
          { FC: "CO2", totalKMBase: 2.028822e9, totalKMPTFree: 6.006925e8 },
        ]}
      />
    </div>
    <br />
    <div class="box">
      <AirResults
        chartId="chart-nox"
        data={[
          { FC: "NOx", totalKMBase: 3.474637e6, totalKMPTFree: 1.157386e6 },
        ]}
      />
    </div>
    <br />
    <div class="box">
      <AirResults
        chartId="chart-pm10"
        data={[
          { FC: "PM10", totalKMBase: 4.068871e4, totalKMPTFree: 1.41498e4 },
        ]}
      />
    </div>
  </div>
{/if}

<style>
  #sidePanelimg {
    width: 100px; /* or whatever size you need */
    height: auto;
    left: 5px;
    position: relative;
  }
  .image-label {
    display: flex;
    flex-direction: column;
    align-items: center; /* Optional: center the text under the image */
    text-align: center; /* Optional: centers the text if it's multiline */
  }
  label {
    position: relative;
    top: 10px;
    font-size: 12px;
  }
  .buttonImg > * {
    flex: 1;
  }
  img:hover {
    opacity: 0.5;
  }
  .box {
    width: 95%;

    gap: 20px; /* space between items */
    padding: 5px 10px; /* space on the sides */
    border-radius: 10px;
    background-color: #e2e2e2;
  }
</style>
