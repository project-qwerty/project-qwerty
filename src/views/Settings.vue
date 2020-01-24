<template>
  <div class="settings" style="display:flex;height:100%">
    <SettingsMenu />
    <Timer />
  </div>
</template>


<script>
  import SettingsMenu from '../components/layout/SettingsMenu';
  import Timer from '../components/settings/Timer';
  
  export default {
    name: "Settings",
    components: {
      SettingsMenu,
      Timer,
    }
  }
</script>


<!--
<style scoped>
  .settings {
    display:flex;
    min-height:100px;
  }
</style>-->
