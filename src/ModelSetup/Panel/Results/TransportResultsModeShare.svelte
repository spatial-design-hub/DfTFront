<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let chart; // store chart instance
  let canvas;
  let selectedPurpose = "All";

  const rawData = [
    { Mode: "Car", Purpose: "HBW", BaseModeShare: 45, FreePTModeShare: 16 },
    { Mode: "Bus", Purpose: "HBW", BaseModeShare: 21, FreePTModeShare: 39 },
    { Mode: "Rail", Purpose: "HBW", BaseModeShare: 21, FreePTModeShare: 39 },
    { Mode: "Cycle", Purpose: "HBW", BaseModeShare: 12, FreePTModeShare: 5 },
    { Mode: "Walk", Purpose: "HBW", BaseModeShare: 1, FreePTModeShare: 0 },
    { Mode: "Car", Purpose: "HBED", BaseModeShare: 31, FreePTModeShare: 14 },
    { Mode: "Bus", Purpose: "HBED", BaseModeShare: 29, FreePTModeShare: 40 },
    { Mode: "Rail", Purpose: "HBED", BaseModeShare: 29, FreePTModeShare: 40 },
    { Mode: "Cycle", Purpose: "HBED", BaseModeShare: 11, FreePTModeShare: 5 },
    { Mode: "Walk", Purpose: "HBED", BaseModeShare: 1, FreePTModeShare: 0 },
    { Mode: "Car", Purpose: "HBEB", BaseModeShare: 39, FreePTModeShare: 19 },
    { Mode: "Bus", Purpose: "HBEB", BaseModeShare: 24, FreePTModeShare: 37 },
    { Mode: "Rail", Purpose: "HBEB", BaseModeShare: 24, FreePTModeShare: 37 },
    { Mode: "Cycle", Purpose: "HBEB", BaseModeShare: 12, FreePTModeShare: 6 },
    { Mode: "Walk", Purpose: "HBEB", BaseModeShare: 1, FreePTModeShare: 1 },
    { Mode: "Car", Purpose: "HBO", BaseModeShare: 32, FreePTModeShare: 15 },
    { Mode: "Bus", Purpose: "HBO", BaseModeShare: 28, FreePTModeShare: 40 },
    { Mode: "Rail", Purpose: "HBO", BaseModeShare: 28, FreePTModeShare: 40 },
    { Mode: "Cycle", Purpose: "HBO", BaseModeShare: 11, FreePTModeShare: 5 },
    { Mode: "Walk", Purpose: "HBO", BaseModeShare: 1, FreePTModeShare: 0 },
    { Mode: "Car", Purpose: "NHBEB", BaseModeShare: 40, FreePTModeShare: 15 },
    { Mode: "Bus", Purpose: "NHBEB", BaseModeShare: 24, FreePTModeShare: 41 },
    { Mode: "Rail", Purpose: "NHBEB", BaseModeShare: 24, FreePTModeShare: 41 },
    { Mode: "Cycle", Purpose: "NHBEB", BaseModeShare: 10, FreePTModeShare: 4 },
    { Mode: "Walk", Purpose: "NHBEB", BaseModeShare: 1, FreePTModeShare: 0 },
    { Mode: "Car", Purpose: "NHBO", BaseModeShare: 31, FreePTModeShare: 13 },
    { Mode: "Bus", Purpose: "NHBO", BaseModeShare: 29, FreePTModeShare: 41 },
    { Mode: "Rail", Purpose: "NHBO", BaseModeShare: 29, FreePTModeShare: 41 },
    { Mode: "Cycle", Purpose: "NHBO", BaseModeShare: 9, FreePTModeShare: 4 },
    { Mode: "Walk", Purpose: "NHBO", BaseModeShare: 1, FreePTModeShare: 1 },
    { Mode: "Car", Purpose: "All", BaseModeShare: 36, FreePTModeShare: 14 },
    { Mode: "Bus", Purpose: "All", BaseModeShare: 28, FreePTModeShare: 41 },
    { Mode: "Rail", Purpose: "All", BaseModeShare: 29, FreePTModeShare: 43 },
    { Mode: "Cycle", Purpose: "All", BaseModeShare: 11, FreePTModeShare: 5 },
    { Mode: "Walk", Purpose: "All", BaseModeShare: 1, FreePTModeShare: 0 },
  ];

  const purposeLabels = {
    HBW: "Home-based work",
    HBED: "Home-based education",
    HBEB: "Home-based employers' business",
    HBO: "Home-based other",
    NHBEB: "Non-home-based employers' business",
    NHBO: "Non-home-based other",
    All: "All",
  };
  const purposes = Object.keys(purposeLabels);
  // create or update the chart
  function renderChart(purpose) {
    const data = rawData.filter((d) => d.Purpose === purpose);
    const labels = data.map((d) => d.Mode);
    const base = data.map((d) => d.BaseModeShare);
    const free = data.map((d) => d.FreePTModeShare);

    const chartData = {
      labels,
      datasets: [
        {
          label: "Base Mode Share",
          data: base,
          backgroundColor: "#4e79a7",
        },
        {
          label: "Free PT Mode Share",
          data: free,
          backgroundColor: "#f28e2c",
        },
      ],
    };

    const options = {
      responsive: true,
      scales: {
        y: {
          max: 50, // Maximum value on the Y-axis
          ticks: {
            callback: function (value) {
              return value + "%"; // Add percentage sign to each Y-axis label
            },
          },
        },
      },
      plugins: {
        legend: { position: "top" },
        title: {
          display: false,
          text: `Mode Share Comparison – ${purpose}`, // Dynamic title based on selected purpose
        },
      },
    };

    if (chart) {
      chart.data = chartData;
      chart.options = options;
      chart.update();
    } else {
      chart = new Chart(canvas, {
        type: "bar",
        data: chartData,
        options,
      });
    }
  }

  // initial mount
  onMount(() => {
    renderChart(selectedPurpose);
  });

  // reactive update when purpose changes
  $: if (chart && selectedPurpose) {
    renderChart(selectedPurpose);
  }
</script>

<div class="mb-4">
  <label for="purpose" class="block font-semibold mb-1"
    >Select Trip Purpose:</label
  >
  <select id="purpose" bind:value={selectedPurpose} class="p-2 border rounded">
    {#each purposes as p}
      <option value={p}>{purposeLabels[p]}</option>
    {/each}
  </select>
</div>

<canvas bind:this={canvas} width="800" height="400"></canvas>

<style>
  label {
    font-size: 13px;
    font-weight: 700;
  }
  #purpose {
    border-radius: 10px;
  }
</style>
