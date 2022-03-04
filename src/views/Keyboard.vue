<template>
  <main>

    <header>
      <IconButton
          icon="x"
          v-on:click="$router.back()" />

      <div>{{ currentWordIndex + 1 }} / {{ words.length }}</div>
    </header>

    <div class="readout">
      <div class="target">{{ words[currentWordIndex] }}</div>
      <div class="input">{{ renderedInput(input) }}</div>
    </div>

    <div class="keyboard">
      <div class="row row-q">
        <div class="key"
            v-for="letter in letters[0]" v-bind:key="letter"
            v-on:click="handleKeystroke(letter)">
          {{ letter }}
        </div>
        <div class="key backspace"
            v-on:click="handleKeystroke('backspace')">
          <font-awesome-icon
              class="backspace-icon"
              icon="delete-left" />
        </div>
      </div>
      <div class="row row-a">
        <div class="key"
            v-for="letter in letters[1]" v-bind:key="letter"
            v-on:click="handleKeystroke(letter)">
          {{ letter }}
        </div>
      </div>
      <div class="row row-z">
        <div class="key"
            v-for="letter in letters[2]" v-bind:key="letter"
            v-on:click="handleKeystroke(letter)">
          {{ letter }}
        </div>
      </div>
      <div class="row row-space">
        <div class="key space"
            v-on:click="handleKeystroke(' ')"></div>
      </div>
    </div>

    <Modal
        :shown="showNextWordModal"
        width="600px">
      <div class="modal-contents">
        <font-awesome-icon
            class="green-check"
            icon="circle-check" />
        <h1>{{ words[currentWordIndex] }}</h1>
        <ActionButton
            class="next-word-button"
            text="Next word"
            v-on:click="clickNextWord" />
      </div>
    </Modal>

    <Modal
        :shown="showFinishedModal"
        width="600px">
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

  </main>
</template>


<script>
  // import BuiltInWordLists from '@/functions/BuiltInWordLists.js';
  // import LocalStorage from '@/functions/LocalStorage.js';

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

        words: ['beagle', 'two', 'three'],
        currentWordIndex: 0,

        repetitionCount: 1,
        currentRepetitionIndex: 0,

        input: '',
      }
    },
    computed: {
      showNextWordModal() {
        return this.input === this.words[this.currentWordIndex];
      },
      showFinishedModal() {
        return this.currentWordIndex === this.words.length;
      },
    },
    methods: {
      handleKeystroke(key) {
        if (key === 'backspace') {
          this.input = this.input.slice(0, -1);
        } else {
          this.input += key;
        }
      },
      renderedInput(input) {
        return input.replaceAll(' ', '\xa0\xa0');
      },
      clickNextWord() {
        this.input = '';

        this.currentRepetitionIndex += 1;

        if (this.currentRepetitionIndex === this.repetitionCount) {
          this.currentWordIndex += 1;
          this.currentRepetitionIndex = 0;
        }
      },
      clickRepeat() {
        this.currentWordIndex = 0;
        this.currentRepetitionIndex = 0;
      },
      clickFinish() {
        this.$router.push('/');
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

  .readout {
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

  .keyboard .key {
    width: 4em;
    height: 3em;
    border-radius: 0.5em;

    background-color: var(--background-colour);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .keyboard .key.backspace {
    width: 6em;
  }

  .keyboard .key .backspace-icon {
    font-size: 36px;
  }

  .keyboard .key.space {
    width: 31em;
  }

  .modal-contents {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .modal-contents h1 {
    font-size: 64px;
  }

  .green-check {
    font-size: 96px;
    color: var(--positive-colour);

    margin-top: 32px;
  }

  .trophy {
    font-size: 96px;
    color: gold;

    margin-top: 32px;
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
