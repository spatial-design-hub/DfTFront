<script>
  import Router from "svelte-spa-router"; // Corrected import
  import Main from "./Main.svelte";
  export let name; // this removes the warning

  const routes = {
    "/": Main,
  };
</script>

<main>
  <Router {routes} />
</main>
