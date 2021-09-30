<template>
<!--The Width of the Timer Slider is set by the width of the div
min is the minimum value and max the maximum value-->

<!--Need to use getValue to use the slider as an input-->
  <div class="page-wrapper">
    <h1 class="page-title">General Settings</h1>

    <p class="setting-heading slider-heading">
      <img class="setting-heading-icon" src="@/assets/setting-icons/Timer.png">
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
      class="slider"
    >{{timer_display}}</veeno>

    <p class="setting-heading slider-heading">
      <img class="setting-heading-icon" src="@/assets/setting-icons/Words.png">
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
      class="slider"
    >{{value_trials}}</veeno>

    <p class="setting-heading">
      <img class="setting-heading-icon" src="@/assets/setting-icons/Errorless.png">
      Errorless Learning
    </p>
    <switch-component class="switch" :preset="preset.value_errorless" :options="['OFF', 'ON']" v-on:update:value="value_errorless=$event"/>

    <p class="setting-heading">
      <img class="setting-heading-icon" src="@/assets/setting-icons/Click_for_next.png">
      Click for next word
    </p>
    <switch-component class="switch" :preset="preset.value_click" :options="['OFF', 'ON']" v-on:update:value="value_click=$event"/>

    <p class="setting-heading">
      <img class="setting-heading-icon" src="@/assets/setting-icons/Repetitions.png">
      Repetitions
    </p>
    <switch-component class="switch" :preset="preset.value_repetitions" :options="['1', '3']" v-on:update:value="value_repetitions=$event"/>

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
        value_errorless: null,
        value_click: null,
        words_icon: new Image(require('@/assets/setting-icons/Words.png')),
        timer_icon: new Image(require('@/assets/setting-icons/Timer.png')),
        preset : {
          value_repetitions: null,
          value_errorless: null,
          value_click: null,
        }
      }
    },
    // This sets the sliders so that they remember there last location.
    created(){
      this.preset.value_repetitions = this.$cookies.isKey('settings.repetitions') ? this.$cookies.get('settings.repetitions') : 1
      this.value_timer = this.$cookies.isKey('settings.timer') ? this.$cookies.get('settings.timer') : 0
      this.value_trials = this.$cookies.isKey('settings.trials') ? this.$cookies.get('settings.trials') : 5
      this.preset.value_errorless = this.$cookies.isKey('settings.errorless') ? this.$cookies.get('settings.errorless') : 'OFF'
      this.preset.value_click = this.$cookies.isKey('settings.click') ? this.$cookies.get('settings.click') : 'OFF'
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

  .setting-heading {
    font-size: 30px;
    margin: auto;
    color: black;
  }

  .page-wrapper {
    width:600px; padding-left:48px;text-align:left
  }

  .page-title {
    font-weight:bold; color:black;
  }

  .slider-heading {
    margin-bottom:35px
  }

  .setting-heading-icon {
    height:20px
  }

  .slider {
    margin-top:26px; margin-bottom:52px
  }

  .switch {
    margin-bottom:35px
  }
</style>
