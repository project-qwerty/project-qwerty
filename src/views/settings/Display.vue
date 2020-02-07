<template>
  <div style="width:600px; padding:48px;text-align:left">
    <h1 style="font-weight:200">Display Settings</h1>
      
    <p class="setting-heading">Keyboard Keys</p>
    <switch-component :preset="preset.value_keys" :options="['Regular', 'Bold']" v-on:update:value="value_keys=$event"/> 
          
    <p class="setting-heading">Font</p>
    <switch-component :preset="preset.value_font" :options="['Sentence Case', 'ALL CAPS']" v-on:update:value="value_font=$event"/>
  </div>
</template>


<script>
  import Switch from '@/components/Switch.vue';

  export default {
    data() {
      return {
        value_keys: null,
        value_font: null,
        preset : {
        value_keys: null,
        value_font: null,
        }
      }
    },
    // This sets the sliders so that they remember there last location.
    created(){
      this.preset.value_keys = this.$cookies.isKey('settings.keys') ? this.$cookies.get('settings.keys') : 'Regular'
      this.preset.value_font = this.$cookies.isKey('settings.font') ? this.$cookies.get('settings.font') : 'Sentence Case'
    },
    components: {
      'switch-component' : Switch
    },
    // This stores the values into local cookies so that they can be accessed by the keyboard page.
    watch: {
      'value_keys' : function(val){
        this.$cookies.set('settings.keys', val);
      },
      'value_font' : function(val){
        this.$cookies.set('settings.font', val);
      },
    },
  }
</script>


<style scoped>
  .settings {
    display:flex;
    min-height:100px;
  }
    
  .setting-heading{
  }
</style>
