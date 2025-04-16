<script>
  import { layouts } from "chart.js";
  import { sidePanelSelection, map } from "../../src/store";
  import ModelSetupPre from "./Panel/ModelSetupPre.svelte";
  let bgColor = "";
  import * as ss from "simple-statistics";

  // Function to toggle the background color.
  function changeBg() {
    bgColor = bgColor === "" ? "rgba(154, 200, 215, 0.4)" : "";
    if (bgColor == "rgba(154, 200, 215, 0.4)") {
      $sidePanelSelection = null;
    }
  }

  function updateLoadButtonColor() {
    const select = document.getElementById("modelSelect");
    const loadBtn = document.getElementById("loadBtn");

    if (select.value === "base") {
      loadBtn.style.background =
        "linear-gradient( to right,#29245e 0%,#029ade 90%,#029ade 100%)";
      loadBtn.style.color = "white";
    } else {
      loadBtn.style.background = "";
      loadBtn.style.color = "black";
    }
  }

  function sideBar() {
    const select = document.getElementById("modelSelect");
    if (select.value === "base") {
      console.log("hi");
      $sidePanelSelection = "modelSetup";
      bgColor = "";
      $map.flyTo({
        center: [0.718, 51.247],
        zoom: 8, // adjust zoom as needed
        duration: 1000, // optional: fly speed
        curve: 1.42, // optional: curvature of the fly path
      });
      setTimeout(() => {
        fetch("static/data/network_v2.geojson")
          .then((response) => response.json())
          .then((data) => {
            // Check if the source already exists (optional cleanup)
            if ($map.getSource("dft-directed")) {
              $map.removeLayer("dft-directed-layer");
              $map.removeSource("dft-directed");
            }

            // Add the GeoJSON source
            $map.addSource("dft-directed", {
              type: "geojson",
              data: data,
            });
            console.log(data.features);
            const sortedValues = data.features
              .map((d) => d.properties["BaseFlow"])
              .sort((a, b) => a - b);

            // Get min and max
            const min = sortedValues[0];
            const max = sortedValues[sortedValues.length - 1];

            let median;
            const middle = Math.floor(sortedValues.length / 2);

            if (sortedValues.length % 2 === 0) {
              // If even, average the two middle numbers
              median = (sortedValues[middle - 1] + sortedValues[middle]) / 2;
            } else {
              // If odd, take the middle number
              median = sortedValues[middle];
            }
            console.log(min, median, max);
            console.log("Min:", min);
            console.log("Median:", median);
            console.log("Max:", max);
            $map.addLayer({
              id: "dft-directed-layer",
              type: "line",
              source: "dft-directed",
              paint: {
                "line-width": 4,
                "line-color": [
                  "interpolate",
                  ["linear"],
                  ["get", "BaseFlow"],
                  min,
                  "#ffff00", // yellow at 0
                  median,
                  "#ffa500", // orange at mid-range
                  max,
                  "#ff0000", // red at high values
                ],
              },
            });
          })
          .catch((error) => console.error("Error loading GeoJSON:", error));

        document.getElementsByClassName(
          "legendContainerDemand"
        )[0].style.opacity = 1;
      }, 1000);
    }
  }
</script>

<div id="sideP" on:click={changeBg} style="background-color: {bgColor}">
  <img id="sidePanelimg" src="static/img/scenario.svg" alt="title" />
  <p>Scenario Builder</p>
</div>

<div id="modelSelector" style="width: {bgColor == '' ? '0px' : '300px'};">
  <div
    style="opacity: {bgColor == '' ? '0' : '1'};transition:opacity ease .5s .2s;
      visibility: {bgColor == '' ? 'hidden' : 'visible'}"
  >
    <h2 style="color:black;left:15px;position:relative;font-weight:500">
      Load model:
    </h2>
    <select
      id="modelSelect"
      style="margin: 2px;
    text-align: center;left:25px;
    position: relative;width:250px;height:30px;border-radius:5px
    "
      on:change={updateLoadButtonColor}
    >
      <option selected disabled>Select saved model run</option>

      <option value="base">Base Model - Kent</option>
    </select>
    <div
      style="position: absolute;
    top: 100px;
    right: 25px"
    >
      <button
        style=" background: linear-gradient(
      to right,
      #29245e 0%,
      #029ade 90%,
      #029ade 100%
    );color:white">Create New Model</button
      >
      <button on:click={sideBar} id="loadBtn">Load</button>
    </div>
  </div>
</div>

<style>
  #sidePanelimg {
    width: 100px; /* or whatever size you need */
    height: auto;
    left: 5px;
    position: relative;
  }
  #sideP {
    height: 120px;
  }
  #sideP:hover {
    background-color: rgba(154, 200, 215, 0.4);
  }
  p {
    font-size: 14px;
    top: -30px;
    justify-self: anchor-center;

    align-items: center;
    position: relative;
    z-index: 10000;
  }
  #modelSelector {
    width: 0px;
    position: fixed;

    left: 124px;
    height: 150px;
    border: 1px solid #ccc; /* light grey border */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* subtle shadow */
    transition: width 0.5s ease;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #e2e2e2;
  }
  button {
    border-radius: 10px;
    padding: 10px;
  }
</style>
