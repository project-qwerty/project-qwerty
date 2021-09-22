<template>
  <div id="keyboard">

    <div class="top-area-container">
      <router-link to="/select_words">
        <font-awesome-icon class="top-area-back-button" icon="chevron-left"/>
      </router-link>
      <Progress :total="trials" :current="this.count" />
      <font-awesome-icon v-on:click="rehide" class="top-area-eye" v-bind:class="{ 'hidden': !isHidden }" icon="eye"/>
    </div>

    <div>
      <WordList v-bind:wordlist="wordlist" v-bind:index="index" class="wordlist" v-bind:class="{ 'hidden': isHidden }" />
      <Output :output="output" />
      <Overlay v-if="complete" />
      <Alert v-if="alert" v-on:update:alert_function="alert_function" />
      <div class=keyboard>
        <Keyboard :word="word" v-on:update:keypressed="keypressed" />
      </div>
    </div>

  </div>
</template>


<script>
  import Keyboard from '../components/keyboard/KeyboardComponent';
  import WordList from '../components/WordList';
  import Overlay from '../components/Overlay';
  import Progress from '../components/Progress';
  import InbuiltWordlists from '@/components/InbuiltWordlists.js';
  import Output from '@/components/Output.vue';
  import Alert from '@/components/Alert.vue';

  export default {
    name: 'app',
    components: {
      WordList,
      Keyboard,
      Overlay,
      Progress,
      Output,
      Alert,
    },
    data() {
      return {
        timer: null,
        showModal:true,
        wordlist: [],
        index: 0,
        count: 1,
        complete: false,
        alert: false,
        output: "",
        isHidden: false,
        trials: null,
        click_for_next_word: null,
        repetitions: 1,
        current_count: 1,
        key_pressed: false,
        InbuiltWordlists : InbuiltWordlists,
        errorlessOnOff: true, // Controls whether errorless is on or off
        timerOnOff: false, // Controls whether the timer is on or off (line 168)
        correct_audio : new Audio(require('@/assets/correct.mp3')),
        wrong_audio : new Audio(require('@/assets/wrong.mp3')),
        wrong_2: new Audio(require('@/assets/wrong_2.mp3')),
        wrong_3: new Audio(require('@/assets/wrong_3.mp3')),
          settings: {
              timer : 5
          }
      }
    },
    // Variables to watch
    watch: {
      'index' : function() {
        if (this.count !== parseInt(this.trials)) {
          this.count += 1;
        }
      },
    },

    //Run on loading of page
    created() {
      // Add all the cookies here
      this.repetitions = 1;
      if (this.$cookies.isKey('settings.repetitions')) {
        this.repetitions = this.$cookies.get('settings.repetitions');
      }

      this.current_count = this.repetitions;

      // Word number control
      this.trials = 5;
      if (this.$cookies.isKey('settings.trials')) {
        this.trials = this.$cookies.get('settings.trials');
      }

      // Click to see next word
      this.click_for_next_word = true;
      if (this.$cookies.isKey('settings.click')) {
        this.click_for_next_word = this.$cookies.get('settings.click') == 'ON';
      }

      // Timer Control
      if (this.$cookies.isKey('settings.timer')) {
        this.settings.timer = this.$cookies.get('settings.timer');
        this.timerOnOff = this.settings.timer != 0;
      }

      this.timer = setTimeout(this.hide, this.settings.timer * 1000);

      // Errorless Control
      this.errorlessOnOff = false;
      if (this.$cookies.isKey('settings.errorless')) {
        this.errorless = this.$cookies.get('settings.errorless');
        this.errorlessOnOff = this.errorless == 'ON';
      }

      // Import custom lists
      if (this.$cookies.isKey('select_words.custom_selected')) {
        // Get which lists are selected from cookies
        var customSelected = this.$cookies.get('select_words.custom_selected').split(',');
        customSelected = JSON.parse("[" + customSelected + "]")

        if (!this.$cookies.isKey('custom_word_lists.words')) {
          alert("There is an error with the cookies. Please enable cookies.");
        } else {
          // Get words from cookies
          var customWords = this.$cookies.get('custom_word_lists.words').split('|').slice(0,-1);
          var __cw_list = [];
          for (var i = 0; i < customSelected.length; i++) {
            if (!customSelected[i]) {
              continue;
            }

            var __w_list = customWords[i].split(',');
            __cw_list = __cw_list.concat(__w_list);
          }
          this.wordlist = this.wordlist.concat(__cw_list);
        }
      }

      this.inbuiltCreated(this.InbuiltWordlists);
      window.console.log(this.wordlist)
      this.wordlist = this.shuffleWordlist(this.wordlist);
      window.console.log(this.wordlist)
    },
    computed : {
      'word' : function() {
        if(this.errorlessOnOff) return this.wordlist[this.index][this.output.length];
        return 'abcdefghijklmnopqrstuvwxyz backspace';
      },

    },
    updated: function () {
      window.console.log("UPDATED")
      this.$nextTick(function () {
        window.console.log(this.key_pressed)
        // Code that will run only after the entire view has been re-rendered
        if (!this.key_pressed) {
          return;
        }
        this.key_pressed = false;

        window.console.log(this.output);

        var target_word = this.wordlist[this.index];

        // If they aren't finished yet
        if (this.output.length !== target_word.length) {
          return;
        }

        // If they got the word wrong
        if (this.output !== target_word) {
          this.wrong_2.play();
          return;
        }

        // They got the word correct

        this.correct_audio.play();
        this.isHidden = false;

        if (this.current_count == 1) {
          // move to next word
          this.index += 1;
          this.output = "";
          this.current_count = this.repetitions;
        } else {
          // decrement repetitions
          // note: this branch appears to not get reached;
          //  instead, this decrementing happens in alert_function
          //  gonna leave it alone for now as it should get picked up and fixed
          //  in forthcoming refactors
          this.current_count -= 1;
        }

        clearTimeout(this.timer);
        this.timer = setTimeout(this.hide, this.settings.timer * 1000);

        // If they finished the trials
        if (this.count == this.trials && this.current_count == this.repetitions) {
          this.index = 0;
          this.output = "";
          this.isHidden = true;
          this.complete = true;
        }

        // If they finished the wordlist
        if (this.index == this.wordlist.length) {
          this.index = 0;
        }
      })
    },
    beforeUpdate: function() {
      this.$nextTick(() => {
        // window.console.log("before")
        if (this.key_pressed) {
          var char = this.char;
          // window.console.log("beforetrue")
          window.console.log(char)
        }
      });
    },
    methods: {
      rehide() {
        this.isHidden = false;
        this.timer = setTimeout(this.hide, this.settings.timer * 1000);
      },
      inbuiltCreated(wordlists) {
        // WordList Control
        if (!this.$cookies.isKey('select_words.built_in_selected')) {
          return;
        }

        var selected = this.$cookies.get('select_words.built_in_selected');
        window.console.log(selected)
        var indices = JSON.parse("[" + selected + "]");
        var _cw_list = []; // cumulated word list
        for (var i = 0; i < indices.length; i++) {
          if (!indices[i]) {
            continue;
          }

          var __w_array = wordlists[i][Object.keys(wordlists[i])[0]];
          _cw_list = _cw_list.concat(__w_array);
        }
        this.wordlist = this.wordlist.concat(_cw_list);

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
      alert_function() {
        this.alert = false;
        this.output = "";

        if (this.current_count == 1) {
          this.index += 1;
          this.current_count = this.repetitions;
        } else {
          this.current_count -= 1;
        }

        clearTimeout(this.timer);
        this.timer = setTimeout(this.hide, this.settings.timer * 1000);

        // If they finished the trials
        if (this.count == this.trials && this.current_count == this.repetitions) {
          this.index = 0;
          this.output = "";
          this.isHidden = true;
          this.complete = true;
        }

        // If they finished the wordlist
        if (this.index == this.wordlist.length) {
          this.index = 0;
        }
      },
      keypressed(char) {
        // If button pressed wasn't backspace
        if (char !== "backspace") {
          this.output += char;
        } else {
          // If button pressed was backspace
          this.output = this.output.substring(0, this.output.length - 1);
        }

        // If they got the word correct
        if (this.output === this.wordlist[this.index]) {
          this.correct_audio.play();
          this.isHidden = false;

          if (this.click_for_next_word) {
            // in this case, alert_function will be called when the "Next word" alert button is clicked
            this.alert = true;
          } else {
            // in this case, it's called straight away
            this.alert_function()
          }

          return;
        }

        // If they got the word wrong
        if (this.output.length === this.wordlist[this.index].length) {
          this.wrong_2.play();
          return;
        }
      },
      hide() {
        this.isHidden = this.timerOnOff;
      }
    },
  }
</script>

<style>

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



  body {
    line-height: 1.4;
  }

  .grey-button {
    background-color: grey;
  }

  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }

  .output {
    font-size: 70px;
    text-transform: uppercase;
    text-decoration: underline;
    height: 100px;
    color:rgba(28, 28, 30);
    font-weight:bold;
  }

  .wordlist {
    font-size: 70px;
    text-transform: uppercase;
    text-decoration: none;
    height: 100px;
    color:rgba(72, 72, 74, 0.8);
    font-weight:bold;
  }

  .keyboard {
    bottom: 80px;
  }
</style>
