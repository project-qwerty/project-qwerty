<template>
  <div class="settings" style="display:flex;height:100%">
    <SettingsMenu :options="options"/>
    <Timer />
  </div>
</template>


<script>
  import SettingsMenu from '../components/layout/SettingsMenu';
  import Timer from '../components/settings/Timer';
    import SettingsLinks from '@/views/SettingsLinks.js';
  
  export default {
    name: "Settings",
    components: {
      SettingsMenu,
      Timer,
    },
    data : function(){
        return {
            // Needs to be copy and pasted for each of the settings page
            'options' : SettingsLinks,
        }
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
