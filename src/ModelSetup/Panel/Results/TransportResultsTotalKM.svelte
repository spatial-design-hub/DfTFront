<script>
  import { onMount } from "svelte";
  import { Chart } from "chart.js/auto";

  let chart;

  onMount(() => {
    const ctx = document.getElementById("myChart").getContext("2d");

    const data = [
      {
        FC: 0,
        ID: "Motorway",
        totalKMBase: 5.615859e5,
        totalKMPTFree: 1.994683e5,
      },
      {
        FC: 1,
        ID: "Maj. A Road",
        totalKMBase: 3.226872e6,
        totalKMPTFree: 1.35821e6,
      },
      {
        FC: 2,
        ID: "Min. A Road",
        totalKMBase: 4.915878e6,
        totalKMPTFree: 2.045246e6,
      },
      {
        FC: 3,
        ID: "B Road",
        totalKMBase: 5.00011e6,
        totalKMPTFree: 1.812395e6,
      },
    ];

    const chartData = {
      labels: data.map((row) => `${row.ID}`), // FC as labels
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

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value.toLocaleString(); // Add comma to large numbers
            },
          },
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

<canvas id="myChart" width="400" height="200"></canvas>
