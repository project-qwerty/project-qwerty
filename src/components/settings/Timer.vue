<template>
<!--The Width of the Timer Slider is set by the width of the div
min is the minimum value and max the maximum value-->

<!--Need to use getValue to use the slider as an input-->
  <div style="width:600px; padding:48px;text-align:left">
      
      <h1 style="font-weight:200">General Settings</h1>
      
    <p class="setting-heading">Repetitions</p>
      <switch-component :options="['1', '3']" v-on:update:value=" repetitions=$event"/> 
      
      <p class="setting-heading">Timer</p>
        <veeno 
           v-model='value_timer'
                :pipsy = "{ 
                mode: 'steps', // mode is steps
                density: 10 
                }"   
               :handles = "[this.value_timer]" 
               :step = "5"
                :range = "{ 
                'min': [  0 ],
                'max': [ 30 ]
                }"
               style="margin-bottom:52px"
        />
      
      
      <p class="setting-heading">Words</p>
        <veeno 
           v-model='value_trials'
                :pipsy = "{ 
                mode: 'steps', // mode is steps
                density: 10 
                }"   
               :handles = "[this.value_trials]" 
               :step = "5"
                :range = "{ 
                'min': [  5 ],
                'max': [ 50 ]
                }"
               style="margin-bottom:52px"
        />
      
      <p class="setting-heading">Starter Mode</p>
      <switch-component :preset="preset.value_startermode" :options="['ON', 'OFF']" v-on:update:value="value_startermode=$event"/> 
      
      <p class="setting-heading">Errorless Learning</p>
      <switch-component :preset="preset.value_errorless" :options="['ON', 'OFF']" v-on:update:value="value_errorless=$event"/> 
      
      <p class="setting-heading">Keyboard</p>
      <switch-component :options="['LETTER ONLY', 'LETTER & NUMBER']" v-on:update:value=" keyboard=$event"/> 
      
      
  </div>
</template>


<script>
    // Importing the slider from a plug in, the slider is called veeno.
    import veeno from 'veeno' 
    import 'nouislider/distribute/nouislider.min.css'; 
    import Switch from '@/components/settings/Switch.vue';
    
    export default {
        data() {
            return {
                // this is a key value pair
                value_timer: null,
                // value is intially set to zero, however the value is changed as the slider is moved 
                value_trials: null,
                
                // the variables related to buttons
                repetitions: null,
                value_startermode: null,
                value_errorless: null,
                keyboard: null,
                preset : {
                    repetitions: null,
                    value_startermode: null,
                    value_errorless: null,
                    keyboard: null,
                }
            }
        },
        components: {
            'veeno' : veeno,
            'switch-component' : Switch
        },
        // This stores the values for timer and trials into local cookies so that they can be accessed by the keyboard page.
        watch: {
            'value_timer' : function(val){
                this.$cookies.set('settings.timer', val)
            
            },
            
            'value_trials' : function(val){
                this.$cookies.set('settings.trials', val)
            },
            
            'value_errorless' : function(val){
                this.$cookies.set('settings.errorless', val)
                window.console.log('errorless saved')
            },
            
            'value_startermode' : function(val){
                this.$cookies.set('settings.startermode', val)
                window.console.log('startermode saved')
            },
        
        },
        // This sets the sliders so that they remember there last location.
        created(){
            this.value_timer = this.$cookies.isKey('settings.timer') ? this.$cookies.get('settings.timer') : 5
            
            this.value_trials = this.$cookies.isKey('settings.trials') ? this.$cookies.get('settings.trials') : 5
            
            this.preset.value_startermode = this.$cookies.isKey('settings.startermode') ? this.$cookies.get('settings.startermode') : 'OFF'

            this.preset.value_errorless = this.$cookies.isKey('settings.errorless') ? this.$cookies.get('settings.errorless') : 'OFF'
            
        }
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
