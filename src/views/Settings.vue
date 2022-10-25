<template>
  <div class="page-layout">
    <Nav />

    <div class="page-content">
      <IconHeader :major="true" text="Settings" icon="gear" iconColour="var(--primary-colour)" />

      <!-- Words-->
      <div class="setting-wrapper faint-border-bottom">
        <div class="setting">
          <div class="setting-name">
            <IconHeader text="Words" icon="list" />
          </div>
          <div class="setting-description-and-controls">
            <div>
              <p>How many <strong>words</strong> would you like to practice?</p>
            </div>
            <div class="setting-control">
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
        </div>
      </div>

      <!-- Timer-->
      <div class="setting-wrapper faint-border-bottom">
        <div class="setting">
          <div class="setting-name">
            <IconHeader text="Timer" icon="stopwatch" />
          </div>
          <div class="setting-description-and-controls">
            <div>
              <p>For how many <strong>seconds</strong> would you like the word to be shown?</p>
            </div>
            <div class="setting-control">
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
        </div>
      </div>

      <!-- Assistance level-->
      <div class="setting-wrapper faint-border-bottom">
        <div class="setting">
          <div class="setting-name">
            <IconHeader text="Assistance level" icon="check" />
          </div>
          <div class="setting-description-and-controls">
            <div>
              <p>How much <strong>help</strong> would you like?</p>
              <p>{{ assistanceLevelDescriptions[assistanceLevel] }}</p>
            </div>
            <div class="setting-control">
              <ShowAllSelector :options="[
                    { label: 'Max.', val: 'MAX', },
                    { label: 'Min.', val: 'MIN', },
                    { label: 'None', val: 'NONE', },
                  ]"
                  :activeValue="assistanceLevel"
                  v-on:update="assistanceLevel = $event" />
            </div>
          </div>
        </div>
      </div>

      <!-- Repetitions-->
      <div class="setting-wrapper faint-border-bottom">
        <div class="setting">
          <div class="setting-name">
            <IconHeader text="Repetitions" icon="repeat" />
          </div>
          <div class="setting-description-and-controls">
            <div>
              <p><strong>How many times</strong> would you like to practice each word?</p>
            </div>
            <div class="setting-control">
              <ShowAllSelector :options="[
                    { label: '1', val: 1, },
                    { label: '3', val: 3, },
                  ]"
                  :activeValue="wordRepetitions"
                  v-on:update="wordRepetitions = $event" />
            </div>
          </div>
        </div>
      </div>

      <!-- Capitalisation-->
      <div class="setting-wrapper">
        <div class="setting">
          <div class="setting-name">
            <IconHeader text="Capitalisation" icon="font" />
          </div>
          <div class="setting-description-and-controls">
            <div>
              <p>How would you like the words and keyboard to appear?</p>
            </div>
            <div class="setting-control">
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
    </div>
  </div>
</template>


<script>
  import LocalStorage from '@/functions/LocalStorage.js';

  import Nav from '@/components/Nav.vue';
  import ShowAllSelector from '@/components/ShowAllSelector.vue';
  import IconHeader from '@/components/IconHeader.vue';
  import ShowCurrentSelector from '@/components/ShowCurrentSelector.vue';

  export default {
    data() {
      return {
        wordDisplayTime: null,
        wordsPerSession: null,
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
    created() {
      this.wordDisplayTime = LocalStorage.getSetting('wordDisplayTime');
      this.wordsPerSession = LocalStorage.getSetting('wordsPerSession');
      this.assistanceLevel = LocalStorage.getSetting('assistanceLevel');
      this.wordRepetitions = LocalStorage.getSetting('wordRepetitions');
      this.wordDisplayCapitalization = LocalStorage.getSetting('wordDisplayCapitalization');
    },
    components: {
      Nav,
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
      wordDisplayCapitalization: function(val) {
        LocalStorage.setSetting('wordDisplayCapitalization', val);
      },
    },
  }
</script>


<style scoped>
  .setting {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0px;
    width: calc(100% - 2rem);
  }

  .setting-description-and-controls {
    display: flex;
    flex-direction: column;
  }

  .setting-control {
    padding-bottom: 0.5rem;
  }

  .setting-name {
    display: flex;
  }

  .setting-wrapper {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 1260px) {
    .setting-wrapper {
      justify-content: flex-start;
    }
  }
</style>
