<template>
  <div id="keyboard">
<!--    This section runs if the word is not hidden-->
    <div v-if="!isHidden" style="display:flex;position:relative;justify-content:center">
      <router-link style="position:fixed;left:0;top:10;text-decoration:none" to="/select_words">
        <font-awesome-icon style="font-size:50px;color:rgba(142, 142, 147);" icon="chevron-left"/>
      </router-link>
      <Progress :total="trials" :current="this.count" />
    </div>
<!--    This section runs if the word is hidden-->
    <div v-if="isHidden" style="display:flex;position:relative;justify-content:space-between">
      <router-link style="text-decoration:none" to="/select_words">
        <font-awesome-icon style="font-size:50px;color:rgba(142, 142, 147);" icon="chevron-left"/>
      </router-link>
      <Progress :total="trials" :current="this.count" />
      <font-awesome-icon v-on:click="rehide" style="font-size:40px; color:rgb(48, 209, 88);" icon="eye"/> <!--eye-->
    </div>
    <div>
<!--      <p style="font-size:60px"></p>-->
      <WordList v-if="!isHidden" class="wordlist" v-bind:wordlist="wordlist" v-bind:index="index" />
      <div v-else style="opacity:0" class="wordlist">You can do it!</div>
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
        click: null,
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
      'index' : function(){
        if (this.count !== parseInt(this.trials)) {
          this.count += 1;
        }
      },
    },

    //Run on loading of page
    created() {
      // Add all the cookies here (first two lines are the important ones)
      if(this.$cookies.isKey('settings.repetitions')){
        this.repetitions = this.$cookies.get('settings.repetitions');
      } else {
        this.repetitions = 1;
      }
      this.current_count = this.repetitions;
      //Word number control
      if(this.$cookies.isKey('settings.trials')){
        this.trials = this.$cookies.get('settings.trials');
      } else {
        this.trials = 5;
      }
      //Click to see next word
      if(this.$cookies.isKey('settings.click')){
        if(this.$cookies.get('settings.click') == 'ON') {
          this.click = true;
        } else {
          this.click = false;
        }
      } else {
          this.click = true;
      }
      //Timer Control
      if(this.$cookies.isKey('settings.timer')){
        this.settings.timer = this.$cookies.get('settings.timer');
        if(this.$cookies.get('settings.timer') == 0) {
          this.timerOnOff = false;
        } else {
          this.timerOnOff = true;
        }
      }
      this.timer = setTimeout(this.hide, this.settings.timer * 1000);
      //Errorless Control
      if(this.$cookies.isKey('settings.errorless')){
        this.errorless = this.$cookies.get('settings.errorless');
        if(this.$cookies.get('settings.errorless') == 'ON') {
          this.errorlessOnOff = true;
        } else {
          this.errorlessOnOff = false;
        }
      } else {
        this.errorlessOnOff = false;
      }

      // Import custom lists
      if (this.$cookies.isKey('select_words.custom_selected')) {
        // Get which lists are selected from cookies
        var customSelected = this.$cookies.get('select_words.custom_selected').split(',');
        customSelected = JSON.parse("[" + customSelected + "]")
        if (this.$cookies.isKey('custom_word_lists.words')) {
          // Get words from cookies
          var customWords = this.$cookies.get('custom_word_lists.words').split('|').slice(0,-1);
          var __cw_list = [];
          for(var i = 0; i < customSelected.length; i++){
            if(!customSelected[i]) continue;
            var __w_list = customWords[i].split(',');
            __cw_list = __cw_list.concat(__w_list);
          }
          this.wordlist = this.wordlist.concat(__cw_list);
        } else {
          alert("There is an error with the cookies. Please enable cookies.");
        }
      }

      this.inbuiltCreated(this.InbuiltWordlists);
      window.console.log(this.wordlist)
      this.wordlist = this.shuffleWordlist(this.wordlist);
      window.console.log(this.wordlist)
    },
    computed : {
      'word' : function(){
        if(this.errorlessOnOff) return this.wordlist[this.index][this.output.length];
        return 'abcdefghijklmnopqrstuvwxyz backspace';
      },

    },
    updated: function () {
      window.console.log("UPDATED")
      this.$nextTick(function () {
        window.console.log(this.key_pressed)
        // Code that will run only after the
        // entire view has been re-rendered
        if (this.key_pressed) {
          window.console.log(this.output)
          // If they got the word correct
          if (this.output === this.wordlist[this.index]) {
            this.correct_audio.play();
            this.isHidden = false;
            if (this.click) {
              this.click_show = true;
            }
//            }
            if (this.current_count == 1) {
              this.index += 1;
              this.output = "";
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

          // If they got the word wrong
          } else if (this.output.length === this.wordlist[this.index].length) {
            this.wrong_2.play();
          }
          this.key_pressed = false;
        }
      })
    },
    beforeUpdate: function() {
      this.$nextTick(() => {
        window.console.log("before")
        if (this.key_pressed) {
          var char = this.char;
          window.console.log("beforetrue")
          window.console.log(char)
        }
      });
    },
    methods: {
      rehide(){
        this.isHidden = false;
        this.timer = setTimeout(this.hide, this.settings.timer * 1000);
      },
      inbuiltCreated(wordlists) {
        //WordList Control
        if(this.$cookies.isKey('select_words.built_in_selected')){
          var selected = this.$cookies.get('select_words.built_in_selected');
          window.console.log(selected)
          var indices = JSON.parse("[" + selected + "]");
          var _cw_list = []; // cumulated word list
          for(var i = 0; i < indices.length; i++){
            if(!indices[i]) continue
            var __w_array = wordlists[i][Object.keys(wordlists[i])[0]]
            _cw_list = _cw_list.concat(__w_array);
          }
          this.wordlist = this.wordlist.concat(_cw_list);
        }
      },
      shuffleWordlist(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      },
      alert_function() {
        this.alert = false;
        if (this.current_count == 1) {
            this.index += 1;
            this.output = "";
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
          if (this.errorlessOnOff) {
            this.output += char;
          } else {
            this.output += char;
          }

          // If button pressed was backspace
        } else {
          this.output = this.output.substring(0, this.output.length - 1);
        }

        // If they got the word correct
        if (this.output === this.wordlist[this.index]) {
          this.correct_audio.play();
          this.isHidden = false;
          this.alert = true;

        // If they got the word wrong
        } else if (this.output.length === this.wordlist[this.index].length) {
          this.wrong_2.play();
        }
      },
      hide() {
        this.isHidden = this.timerOnOff;
      }
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
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
/*    position: fixed;*/
    bottom: 80px;
  }
</style>
