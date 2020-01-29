<template>
  <div class="settings">
    <SettingsMenu />
    <div style="display:flex;flex-direction:column">
      <Timer />
      <Errorless />
    </div>
  </div>
</template>


<style scoped>
  .settings {
    display: flex;
  }
</style>


<script>
  import SettingsMenu from '../components/layout/SettingsMenu';
  import Timer from '../components/settings/Timer';
  import Errorless from '../components/settings/Errorless';
  
  export default {
    name: "Settings",
    components: {
      SettingsMenu,
      Timer,
      Errorless,
    }
  }
</script>
