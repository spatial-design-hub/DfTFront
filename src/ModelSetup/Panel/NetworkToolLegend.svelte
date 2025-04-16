<script>
  export let width = "300px";
  export let height = "20px";

  function changeNum(num) {
    if (num <= 1000) {
      return String(Math.round(num / 10) * 10);
    }
    if (num <= 1000000) {
      return String(Math.round((num / 1000) * 10) / 10) + "K";
    } else {
      return String(Math.round((num / 1000000) * 10) / 10) + "M";
    }
  }
</script>

<div class="legendContainerDemand">
  <div class="legend-title">Demand</div>
  <div class="legend">
    <div class="legend-bar"></div>

    <div class="legend-labels">
      <div class="legend-label">{0}</div>
      <div class="legend-label">1000</div>
      <div class="legend-label">12k</div>
    </div>
  </div>
</div>

<style>
  .med {
    position: relative;
    top: -20px;
    text-align: center;
    color: black;
  }
  .min {
    position: relative;
    top: 0px;
    color: black;
  }
  .max {
    position: relative;
    top: -40px;
    text-align: right;
    color: black;
  }
  .title {
    color: black;
    top: 15px;
    font-weight: 400;
    font-size: 12px;
    position: relative;
  }

  .legendContainerDemand {
    transition: opacity ease 1s;
    opacity: 0;
    z-index: 1000000;
    bottom: 30px;
    width: 300px;
    left: 140px;
    position: fixed;
  }

  .legend-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
    text-align: left;
  }
  .legend {
    background: rgba(236, 236, 236, 0.95);
    padding: 10px;
    font-size: 12px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  .legend-bar {
    width: 100%;
    height: 20px;
    background: linear-gradient(to right, #ffd000, #f70326);
    border-radius: 5px;
  }

  .legend-labels {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-top: 5px;
  }

  .legend-label {
    text-align: center;
  }
</style>
