<template>
  <main>

    <header>
      <IconButton
          icon="x"
          v-on:click="$router.back()" />

      <ActionButton
          class="show-word-button"
          icon="eye"
          text="Show word"
          :major="false"
          v-if="showShowWordButton"
          v-on:click="clickShowWordButton"/>

      <div class="timer-display" v-if="showTimer">
        <font-awesome-icon icon="stopwatch" />
        <span>{{ timerDisplay }}</span>
      </div>

      <div>{{ currentWordIndex + 1 }} / {{ words.length }}</div>
    </header>

    <div class="readout">
      <div class="target"
          :class="{ invisible: !showTargetWord }">{{ renderedText(targetWord) }}</div>
      <div class="input">{{ renderedInput(input) }}</div>
    </div>

    <div class="keyboard">
      <div class="row row-q">
        <!-- ontouchstart="" makes the :active class trigger on iOS -->
        <button
            ontouchstart=""
            v-for="letter in letters[0]" v-bind:key="letter"
            v-on:click="handleKeystroke(letter)"
            :class="{ disabled: !isEnabled(letter) }">
          {{ renderedText(letter) }}
        </button>
        <button class="backspace"
            ontouchstart=""
            v-on:click="handleKeystroke('backspace')"
            :class="{ disabled: !isEnabled('backspace') }">
          <font-awesome-icon
              class="backspace-icon"
              icon="delete-left" />
        </button>
      </div>
      <div class="row row-a">
        <button
            ontouchstart=""
            v-for="letter in letters[1]" v-bind:key="letter"
            v-on:click="handleKeystroke(letter)"
            :class="{ disabled: !isEnabled(letter) }">
          {{ renderedText(letter) }}
        </button>
      </div>
      <div class="row row-z">
        <button
            ontouchstart=""
            v-for="letter in letters[2]" v-bind:key="letter"
            v-on:click="handleKeystroke(letter)"
            :class="{ disabled: !isEnabled(letter) }">
          {{ renderedText(letter) }}
        </button>
      </div>
      <div class="row row-space">
        <button class="space"
            ontouchstart=""
            v-on:click="handleKeystroke(' ')"
            :class="{ disabled: !isEnabled(' ') }">
        </button>
      </div>
    </div>

    <Modal
        :shown="showNextWordModal"
        minWidth="600px"
        minHeight="480px">
      <div class="modal-contents">
        <font-awesome-icon
            class="green-check"
            icon="circle-check" />
        <h1>{{ renderedText(targetWord) }}</h1>
        <ActionButton
            class="next-word-button"
            text="Next word"
            v-on:click="clickNextWord" />
      </div>
    </Modal>

    <Modal
        :shown="showFinishedModal"
        minWidth="600px"
        minHeight="480px">
      <div class="modal-contents">
        <font-awesome-icon
            class="trophy"
            icon="trophy" />
        <h1>You did it!</h1>
        <div class="button-row">
          <ActionButton
              icon="arrow-rotate-right"
              text="Repeat"
              :major="false"
              v-on:click="clickRepeat" />

          <ActionButton
              icon="check"
              text="Finish"
              v-on:click="clickFinish" />
        </div>
      </div>
    </Modal>

    <Modal
        class="survey-modal"
        width="600px"
        height="480px"
        :shown="showSurveyModal">
      <div class="modal-contents">
        <div class="star-row">
          <font-awesome-icon icon="star" />
          <font-awesome-icon icon="star" />
          <font-awesome-icon icon="star" />
          <font-awesome-icon icon="star" />
          <font-awesome-icon icon="star" />
        </div>

        <h1>Help us make Project QWERTY better</h1>

        <div class="button-column">
          <ActionButton
              text="Give feedback"
              v-on:click="clickAcceptSurvey" />

          <ActionButton
              text="No, thanks"
              :major="false"
              v-on:click="clickDeclineSurvey" />
        </div>
      </div>
    </Modal>

    <Modal
        minWidth="400px"
        minHeight="300px"
        :shown="showNoKeyboardModal">
      <div class="modal-contents">
        <img
            class="no-keyboard-icon"
            :src="require('@/assets/img/icon-nokeyboard.svg')" />
        <p>Use your mouse to select each letter</p>
        <div class="button-row">
          <div></div>
          <ActionButton
              text="Ok"
              v-on:click="showNoKeyboardModal = false" />
        </div>
      </div>
    </Modal>

  </main>
</template>


<script>
  import BuiltInCategories from '@/functions/BuiltInCategories.js';
  import LocalStorage from '@/functions/LocalStorage.js';

  import IconButton from '@/components/IconButton.vue';
  import Modal from '@/components/Modal.vue';
  import ActionButton from '@/components/ActionButton.vue';

  export default {
    components: {
      IconButton,
      Modal,
      ActionButton,
    },
    data() {
      return {
        letters: [
          ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
          ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
          ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        ],

        settings: {
          wordRepetitions: LocalStorage.getSetting('wordRepetitions'),
          wordDisplayTime: LocalStorage.getSetting('wordDisplayTime'),
          wordsPerSession: LocalStorage.getSetting('wordsPerSession'),
          assistanceLevel: LocalStorage.getSetting('assistanceLevel'),
          wordDisplayCapitalization: LocalStorage.getSetting('wordDisplayCapitalization'),
        },

        sound: {
          correct: new Audio(require('@/assets/audio/correct.mp3')),
          wrong: new Audio(require('@/assets/audio/wrong.mp3')),
        },

        words: null,
        currentWordIndex: 0,
        currentRepetitionIndex: 0,
        input: '',

        mistakeMade: false,

        displaySecondsRemaining: null,
        alreadyCountingDown: false,

        showNoKeyboardModal: false,
        showSurveyModal: false,
      }
    },
    created() {
      // load words
      this.words = [];

      const builtInSelected = LocalStorage.getSelectedBuiltInCategoryNames();

      for (const categoryName of builtInSelected) {
        const words = BuiltInCategories[categoryName].words;
        this.words = this.words.concat(words);
      }

      const customSelected = LocalStorage.getSelectedCustomCategoryNames();

      for (const categoryName of customSelected) {
        const words = LocalStorage.getCustomCategoryUsableWords(categoryName);
        this.words = this.words.concat(words);
      }

      // normalise words to lowercase (to match the case of this.letters)
      this.words = this.words.map(word => word.toLowerCase());
      // remove any leading or trailing spaces
      this.words = this.words.map(word => word.trim());

      // shuffle words
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      shuffle(this.words);

      // pad words
      while (this.words.length < this.settings.wordsPerSession) {
        let wordsCopy = [...this.words];
        shuffle(wordsCopy);
        this.words = this.words.concat(wordsCopy);
      }

      // truncate words
      this.words = this.words.slice(0, this.settings.wordsPerSession);


      // initialise timer
      this.displaySecondsRemaining = LocalStorage.getSetting('wordDisplayTime');

      // initialise keyboard handler
      window.addEventListener('keydown', this.handleKeyDown);
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.handleKeyDown);
    },
    computed: {
      showNextWordModal() {
        return this.input === this.targetWord;
      },
      showFinishedModal() {
        return !this.showSurveyModal  // don't show both modals at once
            && this.currentWordIndex === this.words.length;
      },
      showShowWordButton() {
        return this.settings.wordDisplayTime > 0 && !this.displaySecondsRemaining > 0;
      },
      showTimer() {
        return this.displaySecondsRemaining > 0;
      },
      showTargetWord() {
        return this.settings.wordDisplayTime === 0 || this.displaySecondsRemaining > 0;
      },
      targetWord() {
        if (this.currentWordIndex === this.words.length) {
          // no more words
          return null;
        }

        return this.words[this.currentWordIndex];
      },
      nextLetter() {
        // no more words, or no more letters in word
        if (this.currentWordIndex === this.words.length
            || this.input.length === this.targetWord.length) {
          return null;
        }

        const nextLetterIndex = this.input.length;
        return this.targetWord[nextLetterIndex];
      },
      timerDisplay() {
        return `${this.displaySecondsRemaining}s`
      },
    },
    watch: {
      input() {
        if (this.targetWord === null) {
          // no more words, don't do anything
          return;
        }

        // don't do anything if they're still going
        if (this.input.length < this.targetWord.length) {
          return;
        }

        // they've finished typing, but got it wrong
        if (this.input !== this.targetWord) {
          this.sound.wrong.play();
          return;
        }

        // they got it right
        this.sound.correct.play();

        // skip the next word modal if they just finished the last word
        let wasLastRepetition = this.currentRepetitionIndex + 1 === this.settings.wordRepetitions;
        let wasLastWord = this.currentWordIndex + 1 === this.words.length;

        if (wasLastRepetition && wasLastWord) {
          this.advanceWord();
        }
      },
      displaySecondsRemaining() {
        // prevent multiple "threads" ticking down concurrently
        if (this.alreadyCountingDown) {
          return;
        }

        // don't tick down below zero
        if (!this.displaySecondsRemaining > 0) {
          return;
        }

        this.alreadyCountingDown = true;
        setTimeout(
          () => {
            this.displaySecondsRemaining -= 1;
            this.alreadyCountingDown = false;
          },
          1000
        );
      },
    },
    methods: {
      renderedText(text) {
        if (text === null || text === undefined) {
          return '';
        }

        if (this.settings.wordDisplayCapitalization === 'UPPERCASE') {
          return text.toUpperCase();
        } else {
          return text.toLowerCase();
        }
      },
      renderedInput(input) {
        return this.renderedText(input).replaceAll(' ', '\xa0\xa0');
      },
      isEnabled(key) {
        const inputIsWrong = this.targetWord !== null
            && this.input.length === this.targetWord.length
            && this.input !== this.targetWord;

        if (inputIsWrong) {
          return key === 'backspace';
        }

        const noNextLetter = this.nextLetter === null;
        const noAssistance = this.settings.assistanceLevel === 'NONE';
        const noMistakeYet = this.settings.assistanceLevel === 'MIN' && !this.mistakeMade;

        if (noNextLetter || noAssistance || noMistakeYet) {
          return true;
        }

        return key === this.nextLetter;
      },
      handleKeystroke(key) {
        if (!this.isEnabled(key)) {
          return;
        }

        if (key === 'backspace') {
          this.input = this.input.slice(0, -1);
          return;
        }

        this.mistakeMade = key !== this.nextLetter;

        if (this.settings.assistanceLevel === 'MIN' && this.mistakeMade) {
          // don't add to input
          return;
        }

        this.input += key;
      },
      advanceWord() {
        this.input = '';

        // advance repetition
        this.currentRepetitionIndex += 1;

        // if repetitions done, advance word
        if (this.currentRepetitionIndex === this.settings.wordRepetitions) {
          this.currentWordIndex += 1;
          this.currentRepetitionIndex = 0;
        }

        // start the timer again, if there's another word
        if (this.targetWord !== null) {
          this.displaySecondsRemaining = this.settings.wordDisplayTime;
        }
      },
      clickNextWord() {
        this.advanceWord();
      },
      clickRepeat() {
        this.currentWordIndex = 0;
        this.currentRepetitionIndex = 0;
        this.displaySecondsRemaining = this.settings.wordDisplayTime;
      },
      clickFinish() {
        const requestHasBeenShown = LocalStorage.getSurveyRequestShown();
        if (!requestHasBeenShown) {
          this.showSurveyModal = true;
          return;
        }

        this.$router.push('/select-categories');
      },
      clickAcceptSurvey() {
        LocalStorage.setSurveyRequestShown(true);

        window.open('https://www.w3schools.com');  // TODO: put the actual survey link here when it's ready
        this.$router.push('/select-categories');
      },
      clickDeclineSurvey() {
        LocalStorage.setSurveyRequestShown(true);

        this.$router.push('/select-categories');
      },
      clickShowWordButton() {
        this.displaySecondsRemaining = this.settings.wordDisplayTime;
      },
      handleKeyDown(event) {
        // this may seem overly complex but it's actually quite necessary
        // e.g. the modal shouldn't trigger on F11 (making the page fullscreen)
        // or Ctrl+T to open a new tab
        const isLetterKey = 64 < event.keyCode && event.keyCode < 91;
        const isBackspace = event.keyCode === 8;
        const isSpace = event.keyCode === 32;
        const isTypingKey = isLetterKey || isBackspace || isSpace;

        const isModified = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

        if (isTypingKey && !isModified) {
          this.showNoKeyboardModal = true;
        }
      },
    },
  }
</script>


<style scoped>
  main {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* header (top bar) */

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: solid 2px var(--faint-colour);

    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 24px;
    padding-right: 24px;

    font-size: 24px;
  }

  header .show-word-button {
    /* any bigger than this and it impacts the header's size */
    font-size: 13px;
  }

  header .timer-display {
    width: 3em;

    display: flex;
    gap: 0.5em;
  }

  /* readout (word displays) */

  .readout {
    text-align: center;
    font-weight: bold;
  }

  .readout > .target {
    color: var(--primary-colour);

    font-size: 48px;

    margin-bottom: 10px;
  }

  .readout > .input {
    font-size: 96px;
  }

  /* make the input div take up the vertical space even when empty */
  .readout > .input:before {
    content: '.';
    visibility: hidden;
  }

  /* add the underline */
  .readout > .input:after {
    content: '';
    display: block;
    margin: 0 auto;
    width: 50%;
    border-bottom: 1px solid var(--faint-colour);
  }

  /* for when invisible because of the timer */
  .invisible {
    visibility: hidden;
  }

  /* keyboard */

  .keyboard {
    padding: 40px;

    background-color: var(--faint-colour);

    font-size: 20px;
  }

  .keyboard > .row {
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin-bottom: 0.5em;
    gap: 0.5em;
  }

  /* these are the styles that give you a natural keyboard */
  /* .keyboard > .row-a {
    padding-right: 8em;
  }

  .keyboard > .row-z {
    padding-right: 13em;
  }

  .keyboard > .row-space {
    padding-right: 13em;
  } */

  .keyboard > .row-a {
    padding-right: 2em;
  }

  .keyboard > .row-z {
    padding-right: 2em;
  }

  .keyboard > .row-space {
    padding-right: 2em;
  }

  .keyboard button {
    /* shape */
    width: 4em;
    height: 3em;
    border-radius: 0.5em;

    background-color: var(--background-colour);

    /* centre contents */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* visually respond to keypresses */
  .keyboard button:not(.disabled):active {
    filter: brightness(75%);
  }

  /* for when disabled by assistance features */
  .keyboard button.disabled {
    background-color: var(--faint-colour);
  }

  /* special keys (space and backspace) */
  .keyboard button.backspace {
    width: 6em;
  }

  .keyboard button .backspace-icon {
    font-size: 36px;
  }

  .keyboard button.space {
    width: 31em;
  }

  /* modals */

  .modal-contents {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    padding-top: 32px;

    box-sizing: border-box;
  }

  .modal-contents h1 {
    font-size: 64px;
    text-align: center;
  }

  .modal-contents p {
    font-weight: bold;
  }

  .modal-contents .no-keyboard-icon {
    width: 96px;
  }

  .survey-modal .modal-contents {
    padding-left: 32px;
    padding-right: 32px;
  }

  .survey-modal .star-row {
    display: flex;
    flex-direction: row;

    color: gold;
    font-size: 42px;
  }

  .survey-modal h1 {
    font-size: 42px;
  }

  .survey-modal .button-column {
    display: flex;
    flex-direction: column;

    align-items: center;
    gap: 10px;
  }

  .green-check {
    font-size: 96px;
    color: var(--positive-colour);
  }

  .trophy {
    font-size: 96px;
    color: gold;
  }

  .next-word-button {
    margin-left: auto;
    margin-right: 0;
  }

  .button-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>
