<template>
  <NavPage>
    <IconHeader :major="true" text="Settings" icon="gear" icon-colour="var(--primary-colour)" />

    <IconHeader text="Trials" icon="list" />
    <div class="control-row faint-border-bottom">
      <p>How many <strong>words and sentences</strong> would you like to practice?</p>

      <div class="control">
        <ShowCurrentSelector
            :options="[
              { label:  '5 words', val:  5, },
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
            :initial-value="wordsPerSession"
            @update="wordsPerSession = $event" />
      </div>
    </div>

    <IconHeader text="Timer" icon="stopwatch" />
    <div class="control-row faint-border-bottom">
      <p>For how many <strong>seconds</strong> would you like each word or sentence to be shown?</p>

      <div class="control">
        <ShowCurrentSelector
            :options="[
              { label: 'Always shown', val:  0, },
              { label:    '5 seconds', val:  5, },
              { label:   '10 seconds', val: 10, },
              { label:   '15 seconds', val: 15, },
              { label:   '20 seconds', val: 20, },
              { label:   '25 seconds', val: 25, },
              { label:   '30 seconds', val: 30, },
            ]"
            :initial-value="wordDisplayTime"
            @update="wordDisplayTime = $event" />
      </div>
    </div>

    <IconHeader text="Assistance level" icon="check" />
    <div class="control-row faint-border-bottom">
      <div>
        <p>How much <strong>help</strong> would you like?</p>
        <p>{{ assistanceLevelDescriptions[assistanceLevel] }}</p>
      </div>

      <div class="control">
        <ShowAllSelector
            :options="[
              { label: 'Max.', val: 'MAX', },
              { label: 'Min.', val: 'MIN', },
              { label: 'None', val: 'NONE', },
            ]"
            :active-value="assistanceLevel"
            @update="assistanceLevel = $event" />
      </div>
    </div>

    <IconHeader text="Words or sentences" icon="comments" />
    <div class="control-row faint-border-bottom">
      <div>
        <p>Would you like to practise <strong>words</strong>, <strong>sentences</strong>, or a <strong>mix of both</strong>?</p>

        <p>This selection applies to the <strong>default categories only</strong>. Custom categories will include <strong>all of their words and sentences</strong> regardless of this setting.</p>
      </div>

      <div class="control">
        <ShowAllSelector
            :options="[
              { label: 'Words', val: 'WORDS', },
              { label: 'Sentences', val: 'SENTENCES', },
              { label: 'Words and sentences', val: 'BOTH', },
            ]"
            :active-value="wordsSentences"
            @update="wordsSentences = $event" />
      </div>
    </div>

    <IconHeader text="Repetitions" icon="repeat" />
    <div class="control-row faint-border-bottom">
      <p><strong>How many times</strong> would you like to practice each word or sentence?</p>

      <div class="control">
        <ShowAllSelector
            :options="[
              { label: '1', val: 1, },
              { label: '3', val: 3, },
            ]"
            :active-value="wordRepetitions"
            @update="wordRepetitions = $event" />
      </div>
    </div>

    <IconHeader text="Capitalization" icon="font" />
    <div class="control-row faint-border-bottom">
      <p>How would you like the words and keyboard to appear?</p>

      <div class="control">
        <ShowAllSelector
            :options="[
              { label: 'UPPERCASE', val: 'UPPERCASE', },
              { label: 'lowercase', val: 'LOWERCASE', },
            ]"
            :active-value="wordDisplayCapitalization"
            @update="wordDisplayCapitalization = $event" />
      </div>
    </div>
  </NavPage>
</template>


<script>
  import LocalStorage from '@/functions/LocalStorage.js';

  import NavPage from '@/components/NavPage.vue';
  import ShowAllSelector from '@/components/ShowAllSelector.vue';
  import IconHeader from '@/components/IconHeader.vue';
  import ShowCurrentSelector from '@/components/ShowCurrentSelector.vue';

  export default {
    components: {
      NavPage,
      ShowAllSelector,
      IconHeader,
      ShowCurrentSelector,
    },
    data() {
      return {
        wordDisplayTime: null,
        wordsPerSession: null,
        assistanceLevel: null,
        wordRepetitions: null,
        wordDisplayCapitalization: null,
        wordsSentences: null,

        assistanceLevelDescriptions: {
          'MAX': 'Maximum: The next letter will always be highlighted.',
          'MIN': 'Minimum: The next letter will be highlighted if you make a mistake.',
          'NONE': 'None: Letter highlighting is turned off.',
        },
      };
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
      wordsSentences: function(val) {
        LocalStorage.setSetting('wordsSentences', val);
      },
    },
    created() {
      this.wordDisplayTime = LocalStorage.getSetting('wordDisplayTime');
      this.wordsPerSession = LocalStorage.getSetting('wordsPerSession');
      this.assistanceLevel = LocalStorage.getSetting('assistanceLevel');
      this.wordRepetitions = LocalStorage.getSetting('wordRepetitions');
      this.wordDisplayCapitalization = LocalStorage.getSetting('wordDisplayCapitalization');
      this.wordsSentences = LocalStorage.getSetting('wordsSentences');
    },
  };
</script>


<style scoped>
  .control-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding-bottom: 24px;
  }

  .control-row .control {
    flex-shrink: 0;
    align-self: flex-end;

    width: 350px;
    padding-left: 20px;
  }

  @media screen and (max-width: 640px) {
    .control-row {
      flex-direction: column;
    }

    .control-row .control {
      width: 100%;
    }
  }
</style>
