<template>
  <div>
    <NavSidebar />

    <div class="sidebar-page-content">
      <IconHeader :major="true" text="Settings" icon="gear" iconColour="var(--primary-colour)" />

      <IconHeader text="Words" icon="list" />
      <div class="control-row">
        <p>How many <strong>words</strong> would you like to practice?</p>

        <div class="control">
          <ShowCurrentSelector :options="[
                { label: '5 words',  val: 5, },
                { label: '10 words', val: 10, },
                { label: '15 words', val: 15, },
                { label: '20 words', val: 20, },
                { label: '25 words', val: 25, },
                { label: '30 words', val: 30, },
                { label: '35 words', val: 35, },
                { label: '40 words', val: 40, },
                { label: '45 words', val: 45, },
                { label: '50 words', val: 50, },
              ]"
              :initialValue="wordsPerSession"
              v-on:update="wordsPerSession = $event" />
        </div>
      </div>

      <IconHeader text="Timer" icon="stopwatch" />
      <div class="control-row">
        <p>For how many <strong>seconds</strong> would you like the word to be shown?</p>

        <div class="control">
          <ShowCurrentSelector :options="[
                { label: 'Always shown', val: 0, },
                { label: '5 seconds',    val: 5, },
                { label: '10 seconds',   val: 10, },
                { label: '15 seconds',   val: 15, },
                { label: '20 seconds',   val: 20, },
                { label: '25 seconds',   val: 25, },
                { label: '30 seconds',   val: 30, },
              ]"
              :initialValue="wordDisplayTime"
              v-on:update="wordDisplayTime = $event" />
          </div>
        </div>

      <IconHeader text="Assistance level" icon="check" />
      <div class="control-row">
        <div>
          <p>How much <strong>help</strong> would you like?</p>
          <p>{{ assistanceLevelDescriptions[assistanceLevel] }}</p>
        </div>

        <div class="control">
          <ShowAllSelector :options="[
                { label: 'Max.', val: 'MAX', },
                { label: 'Min.', val: 'MIN', },
                { label: 'None', val: 'NONE', },
              ]"
              :activeValue="assistanceLevel"
              v-on:update="assistanceLevel = $event" />
        </div>
      </div>

      <IconHeader text="Click for next word" icon="hand-pointer" />
      <div class="control-row">
        <p><strong>Click</strong> or <strong>tap</strong> for the next word</p>

        <div class="control">
          <ShowAllSelector :options="[
                { label: 'On',  val: true, },
                { label: 'Off', val: false, },
              ]"
              :activeValue="clickForNextWord"
              v-on:update="clickForNextWord = $event" />
        </div>
      </div>

      <IconHeader text="Repetitions" icon="repeat" />
      <div class="control-row">
        <p><strong>How many times</strong> would you like to practice each word?</p>

        <div class="control">
          <ShowAllSelector :options="[
                { label: '1', val: 1, },
                { label: '3', val: 3, },
              ]"
              :activeValue="wordRepetitions"
              v-on:update="wordRepetitions = $event" />
        </div>
      </div>

      <IconHeader text="Capitalization" icon="font" />
      <div class="control-row">
        <p>How would you like the words and keyboard to appear?</p>

        <div class="control">
          <ShowAllSelector :options="[
                { label: 'UPPERCASE', val: 'UPPERCASE', },
                { label: 'lowercase', val: 'LOWERCASE', },
              ]"
              :activeValue="wordDisplayCapitalization"
              v-on:update="wordDisplayCapitalization = $event" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  // Importing the slider from a plug in, the slider is called veeno.
  import LocalStorage from '@/components/LocalStorage.js';
  import NavSidebar from '@/components/NavSidebar.vue';
  import ShowAllSelector from '@/components/ShowAllSelector.vue';
  import IconHeader from '@/components/IconHeader.vue';
  import ShowCurrentSelector from '@/components/ShowCurrentSelector.vue';

  export default {
    data() {
      return {
        wordDisplayTime: null,
        wordsPerSession: null,
        clickForNextWord: null,
        assistanceLevel: null,
        wordRepetitions: null,
        wordDisplayCapitalization: null,

        assistanceLevelDescriptions: {
          'MAX': 'Maximum: The next letter will always be highlighted.',
          'MIN': 'Minimum: The next letter will be highlighted if you make a mistake.',
          'NONE': 'None: Letter highlighting is turned off.',
        },
      }
    },
    // This sets the sliders so that they remember there last location.
    created() {
      this.wordDisplayTime = LocalStorage.getSetting('wordDisplayTime');
      this.wordsPerSession = LocalStorage.getSetting('wordsPerSession');
      this.assistanceLevel = LocalStorage.getSetting('assistanceLevel');
      this.clickForNextWord = LocalStorage.getSetting('clickForNextWord');
      this.wordRepetitions = LocalStorage.getSetting('wordRepetitions');
      this.wordDisplayCapitalization = LocalStorage.getSetting('wordDisplayCapitalization');
    },
    components: {
      NavSidebar,
      ShowAllSelector,
      IconHeader,
      ShowCurrentSelector,
    },
    // This stores the values into localStorage so that they can be accessed by the keyboard page.
    watch: {
      wordRepetitions: function(val) {
        LocalStorage.setSetting('wordRepetitions', val);
      },
      wordDisplayTime: function(val) {
        LocalStorage.setSetting('wordDisplayTime', val);
      },
      wordsPerSession: function(val) {
        LocalStorage.setSetting('wordsPerSession', val);
      },
      assistanceLevel: function(val) {
        LocalStorage.setSetting('assistanceLevel', val);
      },
      clickForNextWord: function(val) {
        LocalStorage.setSetting('clickForNextWord', val);
      },
      wordDisplayCapitalization: function(val) {
        LocalStorage.setSetting('wordDisplayCapitalization', val);
      },
    },
  }
</script>


<style scoped>
  .control-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    padding-bottom: 24px;
    border-bottom: solid 1px var(--faint-colour);
  }

  .control-row .control {
    flex-shrink: 0;
    width: 300px;
  }
</style>
