<script>
  import BaseMap from "./BaseMap.svelte";
  import ModelSetup from "./ModelSetup/ModelSetup.svelte";
  import ModelSetupPre from "./ModelSetup/Panel/ModelSetupPre.svelte";
</script>

<div id="topPanel">
  <div
    style="position: absolute;
     left:80px;
      top: 5px;
      transition:left ease .3s"
  >
    <span
      style="    font-weight: 400;
      position: relative;
      text-align: center;
      left: 26px;
      font-size: 1rem;
      letter-spacing: 1px;
      top: 10px;
      color: white;
      text-shadow: rgba(0, 0, 0, 0.2) 2px 2px 5px;"
    >
      DfT - National Transport Analysis Platform</span
    >
  </div>
  <img id="topPanelimg" src="static/img/logo.svg" alt="title" />
  <button>Log out</button>
</div>
<div id="sidePanel">
  <div class="image-stack">
    <ModelSetup />
    <div id="sideP">
      <img id="sidePanelimg" src="static/img/setup.svg" alt="title" />
      <p>Model Setup</p>
    </div>
    <div id="sideP">
      <img id="sidePanelimg" src="static/img/NETWORKEDITOR.svg" alt="title" />
      <p>Network</p>
    </div>
    <div id="sideP">
      <img id="sidePanelimg" src="static/img/Layers.svg" alt="title" />
      <p>Layers</p>
    </div>
    <div id="sideP">
      <img id="sidePanelimg" src="static/img/BaseMaps.svg" alt="title" />
      <p>BaseMaps</p>
    </div>
  </div>
</div>
<ModelSetupPre />
<BaseMap />

<style>
  #topPanel {
    cursor: default;
    z-index: 10000;
    position: absolute;
    height: 60px;
    left: 0px;
    top: 0px;
    width: 100vw;
    background: linear-gradient(
      to bottom,
      #029ade 0%,

      #29245e 100%
    );
    color: white;
    display: flex;
    justify-content: center; /* Centers horizontally */
    align-items: center; /* Centers vertically */
  }
  #topPanelimg {
    width: 100px;
    position: absolute;
  }
  button {
    z-index: 10000000000;
    position: absolute;
    right: 10px;
    padding: 3px 5px;
    font-size: 12px;
    font-weight: 600;
    color: black;
    background-color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      transform 0.1sease-in-out;
  }
  button:hover {
    background-color: #56b1e9;
  }
  #sidePanel {
    cursor: default;
    left: 0px;
    overflow: hidden;
    z-index: 1000;
    top: 50px;
    position: absolute;
    height: calc(100vh);
    padding: 5px;
    background: linear-gradient(
      to bottom,
      #29245e 0%,
      #029ade 90%,
      #029ade 100%
    );
    overflow-y: auto;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .image-stack {
    display: flex;
    top: 70px;

    gap: 10px; /* creates equal spacing between the images */
    width: 100%;
    position: relative;
    font-size: 12px;
    flex-direction: column;
    justify-content: space-between; /* or space-evenly */
    align-items: center; /* optional, centers horizontally */
  }
  #sidePanelimg {
    width: 100px;
    height: auto;
    left: 20px;
    position: relative;
  }
  #sideP {
    height: 120px;
    width: 110%;
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
</style>
