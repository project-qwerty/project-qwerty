<template>
  <div id="keyboard">
    <p style="font-size:60px"></p>
    <WordList v-if="!isHidden" class="wordlist" v-bind:wordlist="wordlist" v-bind:index="index" />
    <div v-else style="opacity:0" class="wordlist">You can do it!</div>
    <div class="output">{{output}}</div>
    <modal :show.sync="showModal">
      <h3 slot="header">custom header</h3>
      <div slot="body">custom body</div>
    </modal>
    <Keyboard :word="word" v-on:update:keypressed="keypressed" />
  </div>
</template>


<script>
  import Keyboard from '../components/keyboard/KeyboardComponent';
  import WordList from '../components/WordList';
  import Modal from 'vue-modal';

  export default {
    name: 'app',
    components: {
      WordList,
      Keyboard,
      Modal
    },
    data() {
      return {
        showModal:false,
        wordlist: ["hello", "this", "is", "a", "test"],
        index: 0,
        output: "",
        isHidden: false,
        errorlessOnOff: true, // Controls whether errorless is on or off 
        timerOnOff: false, // Controls whether the timer is on or off (line 168)
        correct_audio : new Audio(require('@/assets/correct.mp3')),
        wrong_audio : new Audio(require('@/assets/wrong.mp3')),
          settings: {
              timer : 5
          }
      }
    },
    //Run on loading of page
    created() {
      // Add all the cookies here (first two lines are the important ones)
      //Timer Control
      if(this.$cookies.isKey('settings.timer')){
        this.timer = this.$cookies.get('settings.timer');
        if(this.$cookies.get('settings.timer') == 0) {
          this.timerOnOff = false;
        } else {
          this.timerOnOff = true;
        }
      }
      setTimeout(this.hide, this.timer * 1000);
      //Errorless Control
      if(this.$cookies.isKey('settings.errorless')){
        this.errorless = this.$cookies.get('settings.errorless');
        if(this.$cookies.get('settings.errorless') == 'ON') {
          this.errorlessOnOff = true;
        } else {
          this.errorlessOnOff = false;
        }
      }
      //Repetition Control
      //Starter Mode Control
      //Keyboard Control
      //Word Number Control
    },
    computed : {
      'word' : function(){
        if(this.errorlessOnOff) return this.wordlist[this.index][this.output.length];
        return 'abcdefghijklmnopqrstuvwxyz backspace';
      }
    },
    methods: {
      keypressed(char) {
        if (char !== "backspace") {
          if (this.errorlessOnOff) {
            this.output += char;
          } else {
            this.output += char;
          }
        } else {
          this.output = this.output.substring(0, this.output.length - 1);
        }
        if (this.output === this.wordlist[this.index]) {
          this.index += 1;
          this.output = "";
          this.correct_audio.play();
          // Ths is the timer setting, time is in milliseconds
            // This should be where the if statement checking if the timer is set to zero should be added.
          this.isHidden = false;
          setTimeout(this.hide, this.timer * 1000);
          if (this.index == this.wordlist.length) {
            this.index = 0;
            this.output = "";
            this.wordlist = ["You Win!"];
            this.showModal = true;
          }
        } else if (this.output.length === this.wordlist[this.index].length) {
          this.wrong_audio.play();
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
    color: #2c3e50;
    
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
    font-size: 24px;
    text-transform: uppercase;
    text-decoration: underline;
    height: 100px;
  }
  
  .wordlist {
    font-size: 24px;
    text-transform: uppercase;
    text-decoration: underline;
    height: 100px;
  }
</style>
