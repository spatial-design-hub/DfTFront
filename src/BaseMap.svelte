<script>
  import { Map, Popup, ScaleControl } from "mapbox-gl";
  import { onMount } from "svelte";
  import { map } from "../src/store";
  import "mapbox-gl/dist/mapbox-gl.css";
  import NetworkToolLegend from "./ModelSetup/Panel/NetworkToolLegend.svelte";
  import NetworkToolLegendDemandDiff from "./ModelSetup/Panel/NetworkToolLegendDemandDiff.svelte";
  import NetworkToolLegendCo2Diff from "./ModelSetup/Panel/NetworkToolLegendCO2Diff.svelte";

  let mapContainer;
  let lng, lat, zoom;
  // or map1.version if using a custom wrapper

  lng = -2.1363;
  lat = 54;
  zoom = 5.5;
  $: console.log("component included");
  onMount(() => {
    const initialState = { lng: lng, lat: lat, zoom: zoom };

    const map1 = new Map({
      container: mapContainer,
      accessToken: `pk.eyJ1Ijoic3BhdGlhbGRlc2lnbmh1YiIsImEiOiJja216MGF5aDQwOTk1MnRwa3lzZWxzajVzIn0.xNma3vLd6Xad13rSCJXcFw`,
      style: `mapbox://styles/spatialdesignhub/cm9imue4800sk01quemp1h3bw`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
      minZoom: 4,
    });
    $map = map1;
    console.log(map1);
    console.log(map1.version);
  });
</script>

<div class="map" bind:this={mapContainer}></div>
<NetworkToolLegend />
<NetworkToolLegendDemandDiff />
<NetworkToolLegendCo2Diff />

<style>
  .map {
    height: 100vh;
    z-index: 0;
    position: absolute;
    width: 100vw;
  }
</style>
