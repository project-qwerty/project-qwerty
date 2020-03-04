<template>
  <div class="settings">
    <SettingsMenu :options="options"/>
    <div style="display:flex;flex-direction:column">
      <router-view></router-view>
    </div>
  </div>
</template>


<style scoped>
  .settings {
    display: flex;
    height: 100%;
  }
</style>


<script>
  import SettingsMenu from '../components/layout/SettingsMenu';
  
  
  export default {
    name: "Settings",
    components: {
      SettingsMenu,
    },
    data : function(){
      return {
        // Links to each settings page
        'options' : [
          {link : '/settings', name: 'General'},
          {link : '/settings/reports', name: 'Reports'},
          {link : '/settings/custom-lists', name: 'Custom Categories'},
          {link : '/settings/display', name: 'Display'},
        ],
      }
    }
  }
</script>
