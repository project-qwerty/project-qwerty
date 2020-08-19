<template>
<!--The Width of the Timer Slider is set by the width of the div
min is the minimum value and max the maximum value-->

<!--Need to use getValue to use the slider as an input-->
  <div style="width:600px; padding-left:48px;text-align:left">
    <h1 style="font-weight:bold; color:black; ">General Settings</h1>
    
<!--    <p class="setting-heading" style="color:lightgrey">Please note that only Settings with * are fully functional</p>-->
    
    <p class="setting-heading" style="margin-bottom:35px">
      <img style="height:20px" src="@/assets/setting-icons/Timer.png">
      Timer
    </p>
    <veeno 
      :connect="[true, false]"
      :tooltips="false"
      v-model='value_timer'
      :pipsy = "{ 
      mode: 'steps', // mode is steps
      density: 100 
      }"   
      :handles = "[this.value_timer]" 
      :step = "5"
      :range = "{ 
      'min': [  0 ],
      'max': [ 30 ]
      }"
      style="margin-top:26px; margin-bottom:52px"
    >{{timer_display}}</veeno>
    
    <p class="setting-heading" style="margin-bottom:35px">
      <img style="height:20px" src="@/assets/setting-icons/Words.png">
      Words
    </p>
    <veeno 
      :connect="[true, false]"
      :tooltips="false"
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
      style="margin-top:26px; margin-bottom:52px"
    >{{value_trials}}</veeno>
    
<!--
    <p class="setting-heading">Starter Mode</p>
    <switch-component :preset="preset.value_startermode" :options="['OFF', 'ON']" v-on:update:value="value_startermode=$event"/>
-->

    <p class="setting-heading">
      <img style="height:20px" src="@/assets/setting-icons/Errorless.png">
      Errorless Learning
    </p>
    <switch-component style="margin-bottom:35px" :preset="preset.value_errorless" :options="['OFF', 'ON']" v-on:update:value="value_errorless=$event"/>
    
    <p class="setting-heading">
      <img style="height:20px" src="@/assets/setting-icons/Click_for_next.png">
      Click for next word
    </p>
    <switch-component style="margin-bottom:35px" :preset="preset.value_click" :options="['OFF', 'ON']" v-on:update:value="value_click=$event"/>
    
    <p class="setting-heading">
      <img style="height:20px" src="@/assets/setting-icons/Repetitions.png">
      Repetitions
    </p>
    <switch-component style="margin-bottom:35px" :preset="preset.value_repetitions" :options="['1', '3']" v-on:update:value="value_repetitions=$event"/> 

<!--
    <p class="setting-heading">Keyboard</p>
    <switch-component style="margin-bottom:0" :preset="preset.value_keyboard" :options="['LETTERS ONLY', 'LETTERS & NUMBERS']" v-on:update:value=" value_keyboard=$event"/>
-->
  </div>
</template>


<script>
  // Importing the slider from a plug in, the slider is called veeno.
  import veeno from 'veeno';
  import 'nouislider/distribute/nouislider.min.css';
  import Switch from '@/components/Switch.vue';

  export default {
    data() {
      return {
        timer_display: null,
        value_timer: null,
        // value is intially set to zero, however the value is changed as the slider is moved
        value_trials: null,
        // the variables related to buttons
        value_repetitions: null,
        value_startermode: null,
        value_errorless: null,
        value_keyboard: null,
        value_click: null,
        words_icon: new Image(require('@/assets/setting-icons/Words.png')),
        timer_icon: new Image(require('@/assets/setting-icons/Timer.png')),
        preset : {
          value_repetitions: null,
          value_startermode: null,
          value_errorless: null,
          value_keyboard: null,
          value_click: null,
        }
      }
    },
    // This sets the sliders so that they remember there last location.
    created(){
      window.console.log()
      this.preset.value_repetitions = this.$cookies.isKey('settings.repetitions') ? this.$cookies.get('settings.repetitions') : 1
      this.value_timer = this.$cookies.isKey('settings.timer') ? this.$cookies.get('settings.timer') : 0
      this.value_trials = this.$cookies.isKey('settings.trials') ? this.$cookies.get('settings.trials') : 5
      this.preset.value_startermode = this.$cookies.isKey('settings.startermode') ? this.$cookies.get('settings.startermode') : 'OFF'
      this.preset.value_errorless = this.$cookies.isKey('settings.errorless') ? this.$cookies.get('settings.errorless') : 'OFF'
      this.preset.value_click = this.$cookies.isKey('settings.click') ? this.$cookies.get('settings.click') : 'OFF'
      this.preset.value_keyboard = this.$cookies.isKey('settings.keyboard') ? this.$cookies.get('settings.keyboard') : 'LETTERS ONLY'
    },
    components: {
      'veeno' : veeno,
      'switch-component' : Switch
    },
    // This stores the values into local cookies so that they can be accessed by the keyboard page.
    watch: {
      'value_repetitions' : function(val){
        this.$cookies.set('settings.repetitions', val);
      },
      'value_timer' : function(val){
        if (parseInt(val) !== 0) {
          this.timer_display = parseInt(val);
        } else {
          this.timer_display = "OFF";
        }
        this.$cookies.set('settings.timer', parseInt(val));
      },
      'value_trials' : function(val){
        this.value_trials = parseInt(val);
        this.$cookies.set('settings.trials', parseInt(val));
      },
      'value_errorless' : function(val){
        this.$cookies.set('settings.errorless', val);
      },
      'value_startermode' : function(val){
        this.$cookies.set('settings.startermode', val);
      },
      'value_keyboard' : function(val){
        this.$cookies.set('settings.keyboard', val);
      },
      'value_click' : function(val){
        this.$cookies.set('settings.click', val);
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
    font-size: 30px;
    margin: auto;
    color: black;
  }
</style>
