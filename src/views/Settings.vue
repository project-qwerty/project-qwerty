<template>
  <div>
    <NavSidebar />

    <!--The Width of the Timer Slider is set by the width of the div
    min is the minimum value and max the maximum value-->

    <!--Need to use getValue to use the slider as an input-->
    <div class="sidebar-page-content page-wrapper">
      <h1 class="page-title">General Settings</h1>

      <p class="setting-heading slider-heading">
        <img class="setting-heading-icon" src="@/assets/setting-icons/Timer.png">
        Timer
      </p>
      <veeno
        :connect="[true, false]"
        :tooltips="false"
        v-model='value_wordDisplayTime'
        :pipsy="{
          mode: 'steps',
          density: 100,
          format: {
            // 'to' the formatted value. Receives a number.
            to: function(value) {
              if (value === 0) {
                return 'OFF';
              }
              return String(value);
            },
            // 'from' the formatted value.
            // Receives a string, should return a number.
            from: function(value) {
              if (value === 'OFF') {
                return 0;
              }
              return Number(value);
            },
          },
        }"
        :handles="[this.value_wordDisplayTime]"
        :step="5"
        :range="{
          'min': [  0 ],
          'max': [ 30 ],
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
        :pipsy="{
          mode: 'steps',
          density: 10,
        }"
        :handles="[this.value_wordsPerSession]"
        :step="5"
        :range="{
          'min': [  5 ],
          'max': [ 50 ],
        }"
        class="slider"
      >{{display_wordsPerSession}}</veeno>

      <p class="setting-heading">
        <img class="setting-heading-icon" src="@/assets/setting-icons/Errorless.png">
        Assistance level
      </p>
      <p>{{ assistanceLevelDescriptions[assistanceLevel] }}</p>
      <ShowAllSelector :options="[
            { label: 'Max.', val: 'MAX', },
            { label: 'Min.', val: 'MIN', },
            { label: 'None', val: 'NONE', },
          ]"
          :activeValue="assistanceLevel"
          v-on:update="assistanceLevel = $event" />

      <p class="setting-heading">
        <img class="setting-heading-icon" src="@/assets/setting-icons/Click_for_next.png">
        Click for next word
      </p>
      <ShowAllSelector :options="[
            { label: 'On', val: true, },
            { label: 'Off', val: false, },
          ]"
          :activeValue="clickForNextWord"
          v-on:update="clickForNextWord = $event" />

      <p class="setting-heading">
        <img class="setting-heading-icon" src="@/assets/setting-icons/Repetitions.png">
        Repetitions
      </p>
      <ShowAllSelector :options="[
            { label: '1', val: 1, },
            { label: '3', val: 3, },
          ]"
          :activeValue="wordRepetitions"
          v-on:update="wordRepetitions = $event" />

      <p class="setting-heading">
        <img class="setting-heading-icon" src="@/assets/setting-icons/Capitals.png">
        Capitalization
      </p>
      <ShowAllSelector :options="[
            { label: 'UPPERCASE', val: 'UPPERCASE', },
            { label: 'lowercase', val: 'LOWERCASE', },
          ]"
          :activeValue="wordDisplayCapitalization"
          v-on:update="wordDisplayCapitalization = $event" />

    </div>
  </div>
</template>


<script>
  // Importing the slider from a plug in, the slider is called veeno.
  import veeno from 'veeno';
  import 'nouislider/distribute/nouislider.min.css';
  import LocalStorage from '@/components/LocalStorage.js';
  import NavSidebar from '@/components/NavSidebar.vue';
  import ShowAllSelector from '@/components/ShowAllSelector.vue';

  export default {
    data() {
      return {
        clickForNextWord: null,
        assistanceLevel: null,
        wordRepetitions: null,
        wordDisplayCapitalization: null,


        display_wordDisplayTime: null,
        display_wordsPerSession: null,

        value_wordDisplayTime: null,
        // value is intially set to zero, however the value is changed as the slider is moved
        value_wordsPerSession: null,
        // the variables related to buttons
        assistanceLevelDescriptions: {
          'MAX': 'Maximum: The next letter will always be highlighted.',
          'MIN': 'Minimum: The next letter will be highlighted if a mistake is made.',
          'NONE': 'None: Letter highlighting is turned off.',
        },
      }
    },
    // This sets the sliders so that they remember there last location.
    created() {
      this.value_wordDisplayTime = LocalStorage.getSetting('wordDisplayTime');
      this.value_wordsPerSession = LocalStorage.getSetting('wordsPerSession');

      this.assistanceLevel = LocalStorage.getSetting('assistanceLevel');
      this.clickForNextWord = LocalStorage.getSetting('clickForNextWord');
      this.wordRepetitions = LocalStorage.getSetting('wordRepetitions');
      this.wordDisplayCapitalization = LocalStorage.getSetting('wordDisplayCapitalization');
    },
    components: {
      veeno,
      NavSidebar,
      ShowAllSelector,
    },
    // This stores the values into localStorage so that they can be accessed by the keyboard page.
    watch: {
      wordRepetitions: function(val) {
        LocalStorage.setSetting('wordRepetitions', val);
      },
      'value_wordDisplayTime': function(val) {
        if (val === 'OFF') {
          val = 0;
        }

        if (parseInt(val) !== 0) {
          this.display_wordDisplayTime = parseInt(val) + ' seconds';
        } else {
          this.display_wordDisplayTime = 'OFF';
        }

        LocalStorage.setSetting('wordDisplayTime', parseInt(val));
      },
      'value_wordsPerSession': function(val) {
        this.display_wordsPerSession = parseInt(val) + ' words';
        LocalStorage.setSetting('wordsPerSession', parseInt(val));
      },
      assistanceLevel: function(val) {
        LocalStorage.setSetting('assistanceLevel', val);
      },
      clickForNextWord: function(val) {
        LocalStorage.setSetting('clickForNextWord', val);
      },
      'wordDisplayCapitalization': function(val) {
        LocalStorage.setSetting('wordDisplayCapitalization', val);
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
