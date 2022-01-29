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
    >{{display_wordDisplayTime}}</veeno>

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
    >{{display_wordsPerSession}}</veeno>

    <p class="setting-heading">
      <img class="setting-heading-icon" src="@/assets/setting-icons/Errorless.png">
      Assistance
    </p>
    <switch-component class="switch" :preset="preset.value_assistanceLevel" :options="['NONE', 'MIN', 'MAX']" v-on:update:value="value_assistanceLevel=$event"/>

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

    <p class="setting-heading">
      <img class="setting-heading-icon" src="@/assets/setting-icons/Capitals.png">
      Capitalization
    </p>
    <switch-component class="switch" :preset="preset.value_wordDisplayCapitalization" :options="['UPPERCASE', 'lowercase']" v-on:update:value="value_wordDisplayCapitalization=$event"/>

  </div>
</template>


<script>
  // Importing the slider from a plug in, the slider is called veeno.
  import veeno from 'veeno';
  import 'nouislider/distribute/nouislider.min.css';
  import Switch from '@/components/Switch.vue';
  import LocalStorage from '@/components/LocalStorage.js';

  export default {
    data() {
      return {
        display_wordDisplayTime: null,
        display_wordsPerSession: null,

        value_wordDisplayTime: null,
        // value is intially set to zero, however the value is changed as the slider is moved
        value_wordsPerSession: null,
        // the variables related to buttons
        value_wordRepetitions: null,
        value_assistanceLevel: null,
        value_clickForNextWord: null,
        value_wordDisplayCapitalization: null,
        preset: {
          value_wordRepetitions: null,
          value_assistanceLevel: null,
          value_clickForNextWord: null,
        }
      }
    },
    // This sets the sliders so that they remember there last location.
    created() {
      this.preset.value_wordRepetitions = LocalStorage.getSetting('wordRepetitions').toString();
      this.value_wordDisplayTime = LocalStorage.getSetting('wordDisplayTime');
      this.value_wordsPerSession = LocalStorage.getSetting('wordsPerSession');
      this.preset.value_assistanceLevel = LocalStorage.getSetting('assistanceLevel');

      var clickForNextWordSetting = LocalStorage.getSetting('clickForNextWord');
      this.preset.value_clickForNextWord = clickForNextWordSetting ? 'ON' : 'OFF';

      this.preset.value_wordDisplayCapitalization = LocalStorage.getSetting('wordDisplayCapitalization');
      if (this.preset.value_wordDisplayCapitalization === 'LOWERCASE') {
        this.preset.value_wordDisplayCapitalization = 'lowercase';
      }
    },
    components: {
      'veeno': veeno,
      'switch-component': Switch
    },
    // This stores the values into localStorage so that they can be accessed by the keyboard page.
    watch: {
      'value_wordRepetitions': function(val) {
        LocalStorage.setSetting('wordRepetitions', val);
      },
      'value_wordDisplayTime': function(val) {
        if (parseInt(val) !== 0) {
          this.display_wordDisplayTime = parseInt(val) + ' seconds';
        } else {
          this.display_wordDisplayTime = "OFF";
        }
        LocalStorage.setSetting('wordDisplayTime', parseInt(val));
      },
      'value_wordsPerSession': function(val) {
        this.display_wordsPerSession = parseInt(val) + ' words';
        LocalStorage.setSetting('wordsPerSession', parseInt(val));
      },
      'value_assistanceLevel': function(val) {
        LocalStorage.setSetting('assistanceLevel', val);
      },
      'value_clickForNextWord': function(val) {
        LocalStorage.setSetting('clickForNextWord', val === 'ON');
      },
      'value_wordDisplayCapitalization': function(val) {
        LocalStorage.setSetting('wordDisplayCapitalization', val.toUpperCase());
      },
    },
  }
</script>


<style scoped>
  .settings {
    display: flex;
    min-height: 100px;
  }

  .setting-heading {
    font-size: 30px;
    margin: auto;
    color: black;
  }

  .page-wrapper {
    width: 600px;
    padding-left: 48px;
    text-align: left;
  }

  .page-title {
    font-weight: bold;
    color: black;
  }

  .slider-heading {
    margin-bottom: 35px;
  }

  .setting-heading-icon {
    height: 20px;
  }

  .slider {
    margin-top: 26px;
    margin-bottom: 52px;
  }

  .switch {
    margin-bottom: 35px;
  }
</style>
