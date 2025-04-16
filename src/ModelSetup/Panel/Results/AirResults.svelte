<script>
  import { onMount } from "svelte";
  import { Chart } from "chart.js/auto";
  export let data;
  export let chartId;

  let chart;

  onMount(() => {
    let ctx = document.getElementById(chartId).getContext("2d");

    let chartData = {
      labels: data.map((row) => `${row.FC}`), // FC as labels
      datasets: [
        {
          label: "Base",
          data: data.map((row) => row.totalKMBase),
          backgroundColor: "#4e79a7",
        },
        {
          label: "Free PT",
          data: data.map((row) => row.totalKMPTFree),
          backgroundColor: "#f28e2c",
        },
      ],
    };

    let options = {
      indexAxis: "y", // <-- this makes it horizontal

      responsive: true,
      scales: {
        y: {
          // Controls vertical spacing of bars
          ticks: {
            autoSkip: false,
          },
          // Optional: Adjust space taken up by each bar
          barPercentage: 0.1, // lower = thinner bars
        },
        x: {
          ticks: {
            callback: function (value) {
              if (value < 1000000) {
                return value / 1000 + "K";
              } else {
                return value / 1000000 + "M";
              }
            },
          },
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
          text: "Dual Bar Chart - totalKMBase vs totalKMPTFree",
        },
      },
    };

    // Create the chart
    chart = new Chart(ctx, {
      type: "bar", // Bar chart type
      data: chartData,
      options: options,
    });
  });
</script>

<div style="max-height: 170px; display: flex; justify-content: center;">
  <canvas id={chartId} width="400" height="200"></canvas>
</div>
