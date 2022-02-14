<template>
  <div id="keyboard" v-bind:style="{ 'text-transform': wordDisplayCapitalization }">

    <div class="top-area-container">
      <router-link to="/select-lists">
        <font-awesome-icon class="top-area-back-button" icon="chevron-left"/>
      </router-link>
      <Progress :total="wordsPerSession" :current="this.count" />
      <font-awesome-icon v-on:click="rehide" class="top-area-eye" v-bind:class="{ 'hidden': !isHidden }" icon="eye"/>
    </div>

    <div>
      <WordList v-bind:wordlist="wordlist" v-bind:index="currentWordIndex" class="wordlist" v-bind:class="{ 'hidden': isHidden }" />
      <Output :output="output" />
      <FinishedSessionOverlay v-if="showFinishedSessionOverlay" />
      <NextWordOverlay v-if="showNextWordOverlay" v-on:update:buttonClicked="goToNextWord" />
      <div class=keyboard>
        <Keyboard :enabledCharacters="enabledCharacters" v-on:update:keypressed="keypressed" />
      </div>
    </div>

  </div>
</template>


<script>
  import Keyboard from '../components/keyboard/KeyboardComponent';
  import WordList from '../components/WordList';
  import FinishedSessionOverlay from '../components/FinishedSessionOverlay';
  import NextWordOverlay from '@/components/NextWordOverlay.vue';
  import Progress from '../components/Progress';
  import InbuiltWordlists from '@/components/InbuiltWordlists.js';
  import Output from '@/components/Output.vue';
  import LocalStorage from '@/components/LocalStorage.js';

  export default {
    name: 'app',
    components: {
      WordList,
      Keyboard,
      FinishedSessionOverlay,
      NextWordOverlay,
      Progress,
      Output,
    },
    data() {
      return {
        timer: null,
        wordlist: [],
        currentWordIndex: 0,
        count: 1,  // this is basically just currentWordIndex + 1 at all times and probably should be refactored out
        showFinishedSessionOverlay: false,
        showNextWordOverlay: false,
        output: '',
        isHidden: false,
        wordsPerSession: null,
        clickForNextWord: null,
        wordRepetitions: 1,
        repetitionsRemaining: 1,
        key_pressed: false,
        InbuiltWordlists: InbuiltWordlists,
        assistanceLevel: null,
        mistakeMade: false,
        timerOnOff: false,  // Controls whether the timer is on or off
        correct_audio: new Audio(require('@/assets/correct.mp3')),
        wrong_audio: new Audio(require('@/assets/wrong_2.mp3')),
        settings: {
            timer: 5
        },
        wordDisplayCapitalization: null,
      }
    },
    // Variables to watch
    watch: {
      'currentWordIndex': function() {
        if (this.count !== parseInt(this.wordsPerSession)) {
          this.count += 1;
        }
      },
    },

    // Run on loading of page
    created() {
      this.wordRepetitions = LocalStorage.getSetting('wordRepetitions');

      this.repetitionsRemaining = this.wordRepetitions;

      // Word number control
      this.wordsPerSession = LocalStorage.getSetting('wordsPerSession');

      // Click to see next word
      this.clickForNextWord = LocalStorage.getSetting('clickForNextWord');

      // Timer Control
      this.settings.timer = LocalStorage.getSetting('wordDisplayTime');
      this.timerOnOff = this.settings.timer != 0;

      this.timer = setTimeout(this.hide, this.settings.timer * 1000);

      // Assistance Control
      this.assistanceLevel = LocalStorage.getSetting('assistanceLevel');

      // Text display capitalization case
      this.wordDisplayCapitalization = LocalStorage.getSetting('wordDisplayCapitalization');

      // Import custom lists
      const selectedCustomLists = LocalStorage.getSelectedCustomListNames()
          .map(listName => LocalStorage.getCustomList(listName));
      const customWords = selectedCustomLists.flat();
      this.wordlist = this.wordlist.concat(customWords);

      this.inbuiltCreated(this.InbuiltWordlists);
      this.wordlist = this.shuffleWordlist(this.wordlist);
    },
    computed: {
      'assistanceOn': function() {
        if (this.assistanceLevel === 'NONE') {
          return false;
        }

        if (this.assistanceLevel === 'MAX') {
          return true;
        }

        return this.mistakeMade;
      },
      'enabledCharacters': function() {
        if (this.assistanceOn) {
          return this.wordlist[this.currentWordIndex][this.output.length];
        }
        return 'abcdefghijklmnopqrstuvwxyz backspace';
      },
    },
    updated: function () {
      this.$nextTick(function () {
        // Code that will run only after the entire view has been re-rendered
        if (!this.key_pressed) {
          return;
        }
        this.key_pressed = false;

        var target_word = this.wordlist[this.currentWordIndex];

        // If they aren't finished yet
        if (this.output.length !== target_word.length) {
          return;
        }

        // If they got the word wrong
        if (this.output !== target_word) {
          this.wrong_audio.play();
          return;
        }

        // They got the word correct

        this.correct_audio.play();
        this.isHidden = false;

        if (this.repetitionsRemaining == 1) {
          // move to next word
          this.currentWordIndex += 1;
          this.output = '';
          this.repetitionsRemaining = this.wordRepetitions;
        } else {
          // decrement repetitions
          // note: this branch appears to not get reached;
          //  instead, this decrementing happens in goToNextWord
          //  gonna leave it alone for now as it should get picked up and fixed
          //  in forthcoming refactors
          this.repetitionsRemaining -= 1;
        }

        clearTimeout(this.timer);
        this.timer = setTimeout(this.hide, this.settings.timer * 1000);

        // If they finished the trials
        if (this.count == this.wordsPerSession && this.repetitionsRemaining == this.wordRepetitions) {
          this.currentWordIndex = 0;
          this.output = '';
          this.isHidden = true;
          this.showFinishedSessionOverlay = true;
        }

        // If they finished the wordlist
        if (this.currentWordIndex == this.wordlist.length) {
          this.currentWordIndex = 0;
        }
      })
    },
    methods: {
      rehide() {
        this.isHidden = false;
        this.timer = setTimeout(this.hide, this.settings.timer * 1000);
      },
      inbuiltCreated(wordlists) {
        const selectedBuiltInLists = LocalStorage.getSelectedBuiltInListNames();
        for (let listName of selectedBuiltInLists) {
          this.wordlist = this.wordlist.concat(wordlists[listName]);
        }
      },
      shuffleWordlist(array) {
        var currentIndex, temp, randomIndex;
        currentIndex = array.length;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temp = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temp;
        }
        return array;
      },
      goToNextWord() {
        this.showNextWordOverlay = false;
        this.output = '';

        if (this.repetitionsRemaining == 1) {
          this.currentWordIndex += 1;
          this.repetitionsRemaining = this.wordRepetitions;
        } else {
          this.repetitionsRemaining -= 1;
        }

        clearTimeout(this.timer);
        this.timer = setTimeout(this.hide, this.settings.timer * 1000);

        // If they finished the trials
        if (this.count == this.wordsPerSession && this.repetitionsRemaining == this.wordRepetitions) {
          this.currentWordIndex = 0;
          this.output = '';
          this.isHidden = true;
          this.showFinishedSessionOverlay = true;
        }

        // If they finished the wordlist
        if (this.currentWordIndex == this.wordlist.length) {
          this.currentWordIndex = 0;
        }
      },
      keypressed(char) {
        let targetChar = this.wordlist[this.currentWordIndex][this.output.length];
        this.mistakeMade = char !== targetChar;

        // on MIN assistance, if a wrong letter is typed, we shouldn't process the keystroke, other than to set mistakeMade
        if (this.assistanceLevel === 'MIN' && this.mistakeMade) {
          return;
        }

        // If button pressed wasn't backspace
        if (char !== 'backspace') {
          this.output += char;
        } else {
          // If button pressed was backspace
          this.output = this.output.substring(0, this.output.length - 1);
        }

        // If they got the word correct
        if (this.output === this.wordlist[this.currentWordIndex]) {
          this.correct_audio.play();
          this.isHidden = false;

          // show NextWordOverlay, unless clickForNextWord is off, or there isn't a next word
          let noMoreWordsLeft = this.currentWordIndex + 1 === this.wordsPerSession;
          if (this.clickForNextWord && !noMoreWordsLeft) {
            // in this case, goToNextWord will be called when the "Next word" alert button is clicked
            this.showNextWordOverlay = true;
          } else {
            // in this case, it's called straight away
            this.goToNextWord()
          }

          return;
        }

        // If they got the word wrong
        if (this.output.length === this.wordlist[this.currentWordIndex].length) {
          this.wrong_audio.play();
          return;
        }
      },
      hide() {
        this.isHidden = this.timerOnOff;
      }
    },
  }
</script>

<style scoped>

  .top-area-container {
    position: relative;

    display: flex;
    justify-content: space-between;
  }

  .top-area-back-button {
    text-decoration: none;

    font-size: 50px;
    color: rgba(142, 142, 147);
  }

  .top-area-eye {
    font-size: 40px;
    color: rgb(48, 209, 88);
  }

  .hidden {
    visibility: hidden;
  }

  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }

  .wordlist {
    font-size: 70px;
    text-decoration: none;
    height: 100px;
    color:rgba(72, 72, 74, 0.8);
    font-weight: bold;
  }

  .keyboard {
    bottom: 80px;
  }
</style>
