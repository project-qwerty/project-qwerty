<template>
  <main>

    <header>
      <IconButton
          icon="x"
          @click="clickExit" />

      <ActionButton
          v-if="showShowWordButton"
          class="show-word-button"
          icon="eye"
          text="Show word"
          :major="false"
          @click="clickShowWordButton" />

      <div v-if="showTimer" class="timer-display">
        <FontAwesomeIcon icon="stopwatch" />
        <span>{{ timerDisplay }}</span>
      </div>

      <div class="progress-display">{{ progressDisplay }}</div>
    </header>

    <div class="readout">
      <!-- the target word display -->
      <div
          class="target"
          :class="{ invisible: !showTargetWord }">
        {{ renderedText(targetWord) }}
      </div>

      <div class="input-row">
        <!-- spaceholder to keep the row horizontally symmetrical -->
        <font-awesome-icon class="x-icon invisible" icon="circle-xmark" />

        <!-- the user-typed characters -->
        <div class="input" :class="{ 'error': inputIsWrong }">
          {{ renderedText(input) }}
        </div>

        <!-- x icon that shows when the word is mistyped -->
        <font-awesome-icon class="x-icon" :class="{ 'invisible': !inputIsWrong }" icon="circle-xmark" />
      </div>
    </div>

    <div class="keyboard-wrapper" :class="[keyboardKeyset]">
      <PracticeKeyboard
          :keyset="keyboardKeyset"
          :enabled-keys="enabledKeys"
          :highlighted-keys="highlightedKeys"
          :uppercase="settings.wordDisplayCapitalization === 'UPPERCASE'"
          @keystroke="handleKeystroke($event)" />
    </div>

    <FullscreenModal
        :shown="showNextWordModal"
        width="600px">
      <div class="modal-contents">
        <FontAwesomeIcon
            class="green-check"
            icon="circle-check" />
        <h1>{{ renderedText(targetWord) }}</h1>
        <div class="button-row">
          <ActionButton
              text="Next word"
              @click="clickNextWord" />
          <ActionButton
              :major="false"
              icon="xmark"
              text="Exit"
              @click="clickExit" />
        </div>
      </div>
    </FullscreenModal>

    <FullscreenModal
        :shown="showFinishedModal"
        width="600px">
      <div class="modal-contents">
        <lottie-vue-player
            class="medal-animation"
            :src="JSON.stringify(require('@/assets/lottie/medal.json'))"
            autoplay />
        <h1>Well done</h1>
        <div class="button-row">
          <ActionButton
              icon="check"
              text="Finish"
              @click="clickFinish" />
          <ActionButton
              icon="arrow-rotate-right"
              text="Repeat"
              :major="false"
              @click="clickRepeat" />
        </div>
      </div>
    </FullscreenModal>

    <FullscreenModal
        width="400px"
        height="300px"
        :shown="showNoKeyboardModal">
      <div class="modal-contents">
        <img
            class="no-keyboard-icon"
            :src="require('@/assets/img/icon-nokeyboard.svg')" />
        <p>Use your mouse to select each letter</p>
        <div class="button-row">
          <ActionButton
              text="Ok"
              @click="showNoKeyboardModal = false" />
        </div>
      </div>
    </FullscreenModal>
  </main>
</template>


<script>
  import BuiltInCategories from '@/functions/BuiltInCategories.js';
  import LocalStorage from '@/functions/LocalStorage.js';

  import PracticeKeyboard from '@/components/PracticeKeyboard.vue';
  import IconButton from '@/components/IconButton.vue';
  import FullscreenModal from '@/components/FullscreenModal.vue';
  import ActionButton from '@/components/ActionButton.vue';

  export default {
    components: {
      PracticeKeyboard,
      IconButton,
      FullscreenModal,
      ActionButton,
    },
    data() {
      return {
        settings: {
          wordRepetitions: LocalStorage.getSetting('wordRepetitions'),
          wordDisplayTime: LocalStorage.getSetting('wordDisplayTime'),
          wordsPerSession: LocalStorage.getSetting('wordsPerSession'),
          assistanceLevel: LocalStorage.getSetting('assistanceLevel'),
          wordDisplayCapitalization: LocalStorage.getSetting('wordDisplayCapitalization'),
        },

        sound: {
          /* eslint-disable no-undef */
          correct: new Audio(require('@/assets/audio/correct.mp3')),
          wrong: new Audio(require('@/assets/audio/wrong.mp3')),
          /* eslint-enable no-undef */
        },

        words: null,
        currentWordIndex: 0,
        currentRepetitionIndex: 0,
        input: '',

        mistakeMade: false,

        displaySecondsRemaining: null,
        alreadyCountingDown: false,

        showNoKeyboardModal: false,
      };
    },
    computed: {
      keyboardKeyset() {
        let targetWord = this.targetWord;

        if (!targetWord) {
          // the practice is over but we want the keyboard to remain displayed with the last word's keyset
          targetWord = this.words[this.words.length - 1];
        }

        const wordContainsLetter = /[a-z]/.test(targetWord.toLowerCase());
        const wordContainsDigit = /\d/.test(targetWord);

        if (wordContainsLetter && wordContainsDigit) {
          return 'alphanumeric';
        } else if (wordContainsDigit) {
          return 'numeric';
        } else {
          return 'alpha';
        }
      },
      keyboardKeys() {
        return (
          (this.keyboardKeyset.includes('numeric') ? '1234567890' : '')
          + (this.keyboardKeyset.includes('alpha') ? 'qwertyuiopasdfghjklzxcvbnm ' : '')
        ).split('').concat('backspace');
      },
      inputIsWrong() {
        return this.targetWord !== null
            && this.input.length === this.targetWord.length
            && this.input !== this.targetWord;
      },
      enabledKeys() {
        if (this.inputIsWrong) {
          return ['backspace'];
        }

        const noNextLetter = this.nextLetter === null;
        const noAssistance = this.settings.assistanceLevel === 'NONE';
        const noMistakeYet = this.settings.assistanceLevel === 'MIN' && !this.mistakeMade;

        if (noNextLetter || noAssistance || noMistakeYet) {
          return this.keyboardKeys;
        }

        return [this.nextLetter];
      },
      highlightedKeys() {
        if (this.inputIsWrong) {
          return ['backspace'];
        }
        return [];
      },
      showNextWordModal() {
        return this.input === this.targetWord;
      },
      showFinishedModal() {
        return this.currentWordIndex === this.words.length;
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
        return `${this.displaySecondsRemaining}s`;
      },
      progressDisplay() {
        const wordCount = this.words.length;
        // this prevents the display from showing eg. 6/5 on the finished screen
        const currentWord = Math.min(this.currentWordIndex + 1, wordCount);

        return `${currentWord} / ${wordCount}`;
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
          1000,
        );
      },
    },
    created() {
      // load words
      this.words = [];

      const termType = LocalStorage.getSetting('wordsSentences');
      const builtInSelected = LocalStorage.getSelectedBuiltInCategoryNames(termType);
      const builtInCategories = BuiltInCategories[termType];

      for (const categoryName of builtInSelected) {
        const words = builtInCategories[categoryName].words;
        this.words = this.words.concat(words);
      }

      const customSelected = LocalStorage.getSelectedCustomCategoryNames();

      for (const categoryName of customSelected) {
        const words = LocalStorage.getCustomCategoryUsableWords(categoryName);
        this.words = this.words.concat(words);
      }

      // if there's nothing selected and the user navigates directly to /practice (ergo there are no words to practice),
      // just use all of the built in lists
      if (this.words.length === 0) {
        for (const categoryName in builtInCategories) {
          const words = builtInCategories[categoryName].words;
          this.words = this.words.concat(words);
        }
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
    methods: {
      renderedText(text) {
        if (text === null || text === undefined) {
          return '';
        }

        // make spaces render even when they're at the start or end and make them a bit wider for visual clarity
        text = text.replace(/ /g, '\xa0\u200B\xa0');

        // make the text take up vertical space even when empty
        text = text || '\u200B';

        if (this.settings.wordDisplayCapitalization === 'UPPERCASE') {
          return text.toUpperCase();
        } else {
          return text.toLowerCase();
        }
      },
      handleKeystroke(key) {
        if (!this.enabledKeys.includes(key)) {
          return;
        }

        if (key === 'backspace') {
          // auto-remove spaces with the numeric keyboard
          while (this.keyboardKeyset === 'numeric' && this.input[this.input.length - 1] === ' ') {
            this.input = this.input.slice(0, -1);
          }

          this.input = this.input.slice(0, -1);

          return;
        }

        this.mistakeMade = key !== this.nextLetter;

        if (this.settings.assistanceLevel === 'MIN' && this.mistakeMade) {
          // don't add to input
          return;
        }

        this.input += key;

        // auto-insert spaces with the numeric keyboard
        while (this.keyboardKeyset === 'numeric' && this.nextLetter === ' ') {
          this.input += ' ';
        }
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
      clickExit() {
        this.$router.back();
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
        this.$router.push('/select-categories');
      },
      clickShowWordButton() {
        this.displaySecondsRemaining = this.settings.wordDisplayTime;
      },
      handleKeyDown(event) {
        // this may seem overly complex but it's actually quite necessary
        // e.g. the modal shouldn't trigger on F11 (making the page fullscreen)
        // or Ctrl+T to open a new tab
        const isNumberKey = 47 < event.keyCode && event.keyCode < 58;
        const isLetterKey = 64 < event.keyCode && event.keyCode < 91;
        const isBackspace = event.keyCode === 8;
        const isSpace = event.keyCode === 32;
        const isTypingKey = isNumberKey || isLetterKey || isBackspace || isSpace;

        const isModified = event.altKey || event.ctrlKey || event.metaKey; // we don't check for shift

        if (isTypingKey && !isModified) {
          this.showNoKeyboardModal = true;
        }
      },
    },
  };
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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border-bottom: solid 2px var(--faint-colour);

    padding: 12px 24px;

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

  header .progress-display {
    background-color: var(--faint-colour);

    border-radius: 0.5rem;
    padding: 0.75rem;
  }

  /* readout (word displays) */

  .readout {
    text-align: center;
    font-weight: bold;
  }

  .readout .target {
    color: var(--primary-colour);

    font-size: 36px;

    margin-bottom: 10px;
  }

  /* this contains the user-typed text AND the right x-mark/left invisible x-mark balancer */
  .readout .input-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .readout .input-row .x-icon {
    color: var(--negative-colour);

    font-size: 42px;

    margin-left: 1rem;
    margin-right: 1rem;
  }

  /* this contains the user-typed text */
  .readout .input-row .input {
    font-size: 72px;

    /* add the underline */
    border-bottom: 1px solid var(--faint-colour);

    /* min width makes the underline show even when not much has been typed */
    min-width: 50%;
  }

  .readout .input-row .input.error {
    border-bottom-color: var(--negative-colour);
  }

  /* for when invisible because of the timer */
  .invisible {
    visibility: hidden;
  }

  /* keyboard */

  .keyboard-wrapper {
    --keyboard-padding: 40px;
    padding: var(--keyboard-padding);
    /* prevent iOS gesture bar rendering over keyboard */
    padding-bottom: calc(var(--keyboard-padding) + env(safe-area-inset-bottom));

    background-color: var(--faint-colour);
  }

  .keyboard-wrapper.alpha { height: 280px; }
  .keyboard-wrapper.alphanumeric { height: 352px; }
  .keyboard-wrapper.numeric { height: 352px; }

  /* this selects the keyboard itself */
  .keyboard-wrapper > * {
    max-width: 1020px;

    /* center horizontally */
    margin: 0 auto;
  }

  /* modals */

  .modal-contents {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    text-align: center;
  }

  .modal-contents h1 {
    font-size: 64px;
  }

  .modal-contents p {
    font-weight: bold;
  }

  .modal-contents .no-keyboard-icon {
    width: 96px;
  }

  .green-check {
    font-size: 96px;
    color: var(--positive-colour);

    margin-top: 32px;
  }

  .medal-animation {
    margin-top: 16px;

    height: 150px;
  }

  /* hide the loading spinner because it causes layout flash */
  /deep/ .lf-spinner {
    display: none;
  }

  .button-row {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    gap: var(--thin-gap);
  }

  @media screen and (max-width: 450px) {
    /* this is unfortunately just to get the finished modal buttons repositioning right */
    /* I'm not happy with having another media query at a different size just for this */
    .button-row {
      flex-direction: column;
      align-items: stretch;
    }
  }

  /* mobile */

  @media screen and (max-width: 960px) {
    .keyboard-wrapper {
      --keyboard-padding: var(--thin-gap);
    }

    .keyboard-wrapper.alpha { height: 220px; }
    .keyboard-wrapper.alphanumeric { height: 276px; }
    .keyboard-wrapper.numeric { height: 276px; }
  }

  @media screen and (max-width: 640px) {
    .readout .target {
      font-size: 32px;
    }

    .readout .input-row .x-icon {
      font-size: 32px;

      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }

    .readout .input-row .input {
      font-size: 40px;
    }

    .modal-contents h1 {
      font-size: 40px;
    }

    .medal-animation {
      height: 120px;
    }
  }
</style>
