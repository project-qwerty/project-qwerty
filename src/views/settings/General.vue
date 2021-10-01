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
      v-model='value_wordDisplayTime'
      :pipsy = "{
      mode: 'steps', // mode is steps
      density: 100
      }"
      :handles = "[this.value_wordDisplayTime]"
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
      v-model='value_wordsPerSession'
      :pipsy = "{
      mode: 'steps', // mode is steps
      density: 10
      }"
      :handles = "[this.value_wordsPerSession]"
      :step = "5"
      :range = "{
      'min': [  5 ],
      'max': [ 50 ]
      }"
      class="slider"
    >{{value_wordsPerSession}}</veeno>

    <p class="setting-heading">
      <img class="setting-heading-icon" src="@/assets/setting-icons/Errorless.png">
      Errorless Learning
    </p>
    <switch-component class="switch" :preset="preset.value_errorlessLearning" :options="['OFF', 'ON']" v-on:update:value="value_errorlessLearning=$event"/>

    <p class="setting-heading">
      <img class="setting-heading-icon" src="@/assets/setting-icons/Click_for_next.png">
      Click for next word
    </p>
    <switch-component class="switch" :preset="preset.value_clickForNextWord" :options="['OFF', 'ON']" v-on:update:value="value_clickForNextWord=$event"/>

    <p class="setting-heading">
      <img class="setting-heading-icon" src="@/assets/setting-icons/Repetitions.png">
      Repetitions
    </p>
    <switch-component class="switch" :preset="preset.value_wordRepetitions" :options="['1', '3']" v-on:update:value="value_wordRepetitions=$event"/>

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
        value_wordDisplayTime: null,
        // value is intially set to zero, however the value is changed as the slider is moved
        value_wordsPerSession: null,
        // the variables related to buttons
        value_wordRepetitions: null,
        value_errorlessLearning: null,
        value_clickForNextWord: null,
        words_icon: new Image(require('@/assets/setting-icons/Words.png')),
        timer_icon: new Image(require('@/assets/setting-icons/Timer.png')),
        preset : {
          value_wordRepetitions: null,
          value_errorlessLearning: null,
          value_clickForNextWord: null,
        }
      }
    },
    // This sets the sliders so that they remember there last location.
    created(){
      this.preset.value_wordRepetitions = this.$cookies.isKey('settings.wordRepetitions') ? this.$cookies.get('settings.wordRepetitions') : 1
      this.value_wordDisplayTime = this.$cookies.isKey('settings.wordDisplayTime') ? this.$cookies.get('settings.wordDisplayTime') : 0
      this.value_wordsPerSession = this.$cookies.isKey('settings.wordsPerSession') ? this.$cookies.get('settings.wordsPerSession') : 5

      // TODO: find a better solution to storing booleans in cookies
      // currently it's a mess of true vs false vs 'true' vs 'false' vs 'ON' vs 'OFF'
      var errorlessLearningCookie = this.$cookies.isKey('settings.errorlessLearning') ? this.$cookies.get('settings.errorlessLearning') : 'false'
      this.preset.value_errorlessLearning = errorlessLearningCookie === 'true' ? 'ON' : 'OFF'

      var clickForNextWordCookie = this.$cookies.isKey('settings.clickForNextWord') ? this.$cookies.get('settings.clickForNextWord') : 'false'
      this.preset.value_clickForNextWord = clickForNextWordCookie === 'true' ? 'ON' : 'OFF'
    },
    components: {
      'veeno' : veeno,
      'switch-component' : Switch
    },
    // This stores the values into local cookies so that they can be accessed by the keyboard page.
    watch: {
      'value_wordRepetitions' : function(val){
        this.$cookies.set('settings.wordRepetitions', val);
      },
      'value_wordDisplayTime' : function(val){
        if (parseInt(val) !== 0) {
          this.timer_display = parseInt(val);
        } else {
          this.timer_display = "OFF";
        }
        this.$cookies.set('settings.wordDisplayTime', parseInt(val));
      },
      'value_wordsPerSession' : function(val){
        this.value_wordsPerSession = parseInt(val);
        this.$cookies.set('settings.wordsPerSession', parseInt(val));
      },
      'value_errorlessLearning' : function(val){
        this.$cookies.set('settings.errorlessLearning', val === 'ON');
      },
      'value_clickForNextWord' : function(val){
        this.$cookies.set('settings.clickForNextWord', val === 'ON');
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
