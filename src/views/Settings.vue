<template>
  <div class="settings">
    <SettingsMenu :options="options" :name="name" />
    <div class="settings-page-content">
      <router-view></router-view>
    </div>
  </div>
</template>


<style scoped>
  .settings {
    display: flex;
    height: 100%;
  }

  .settings-page-content {
    display: flex;
    flex-direction: column;
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
          {link : '/settings/custom-lists', name: 'Custom Categories'},
          {link : '/settings/about', name: 'About'},
        ],
      }
    }
  }
</script>
