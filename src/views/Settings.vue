<template>
  <div class="settings">
    <SettingsMenu :options="options"/>
    <div style="display:flex;flex-direction:column">
      <Timer />
      <Errorless />
      <UploadFile style="padding:100" />
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
  import Timer from '../components/settings/Timer';
  import Errorless from '../components/settings/Errorless';
  import UploadFile from '../components/UploadFile';
  
  export default {
    name: "Settings",
    components: {
      SettingsMenu,
      Timer,
      Errorless,
      UploadFile
    },
    data : function(){
      return {
        // Links to each settings page
        'options' : [
          {link : '/setting/general', name: 'General', from: '/settings/General'},
          {link : '/setting/reports', name: 'Reports', from: '/settings/Reports'},
          {link : '/setting/custom-lists', name: 'Custom Lists', from: '/settings/CustomLists'},
          {link : '/setting/display', name: 'Display', from: '/settings/Display'},
        ],
      }
    }
  }
</script>
