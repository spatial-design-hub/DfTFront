<script>
  import { onMount } from "svelte";
  import RangeSlider from "svelte-range-slider-pips";

  let value = [0];

  const min = -100;
  const max = 100;
  const step = 5;

  onMount(() => {
    Array.from(document.getElementsByClassName("rangeSlider")).forEach((d) => {
      d.style.backgroundColor = "white";
    });
    Array.from(document.getElementsByClassName("rangeNub")).forEach((d) => {
      d.style.backgroundColor = "#201b59";
      d.style.border = "solid 1px white";
    });

    Array.from(document.getElementsByClassName("pipVal")).forEach((d) => {
      d.style.fontSize = "12px";
    });
  });
</script>

<div class="slider-wrapper">
  <div class="value-display">
    {value[0] > 0 ? "+" : ""}
    {value[0]}%
  </div>
  <RangeSlider
    {min}
    {max}
    {step}
    values={value}
    on:change={(e) => (value = e.detail.values)}
    pips
    all="label"
    pipstep={5}
    tooltips
  />
</div>

<style>
  .slider-wrapper {
    margin: 20px;
    position: relative;
    font-family: "Poppins", sans-serif;
  }

  .value-display {
    margin-top: 10px;
    top: -45px;
    right: 5px;
    position: absolute;
    font-weight: 600;
  }
  .range-slider-wrapper {
    background-color: white; /* Set background to white */
    padding: 10px;
    border-radius: 8px;
  }

  /* Ensure the slider itself has the correct background color */
  .svelte-range-slider-pips {
    background-color: white; /* Set background of the slider to white */
  }

  /* Style the pips (labels) */
  .svelte-range-slider-pips .pips {
    color: #333; /* Color for the labels */
  }
</style>
