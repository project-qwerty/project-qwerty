<template>
  <div id="keyboard">
    <div style="">
      <p style="font-size:60px"></p>
      <WordList v-if="!isHidden" class="wordlist" v-bind:wordlist="wordlist" v-bind:index="index" />
      <div v-else style="opacity:0" class="wordlist">You can do it!</div>
      <div class="output">{{output}}</div>
      <Overlay v-if="complete" />
      <Keyboard :word="word" v-on:update:keypressed="keypressed" />
    </div>
  </div>
</template>


<script>
  import Keyboard from '../components/keyboard/KeyboardComponent';
  import WordList from '../components/WordList';
  import Overlay from '../components/Overlay';

  export default {
    name: 'app',
    components: {
      WordList,
      Keyboard,
      Overlay
    },
    data() {
      return {
        showModal:true,
        wordDatabase: [
          // the words must be all lowercase - the checking is case sensitive
          ["hello", "to", "dear", "sincerely", "reply", "respond", "action", "immediately", "manager", "team"],
          ["hey", "hi", "thanks", "cheers", "love", "day", "night", "tonight", "today", "tomorrow", "yesterday", "sorry", "ok", "omg", "haha"],
//          ["test"]
        ],
        wordlist: [],
        index: 0,
        complete: false,
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
      //WordList Control
      if(this.$cookies.isKey('select_list.list')){
        var list = this.$cookies.get('select_list.list');
        var indices = JSON.parse("[" + list + "]");
        for (var i = 0; i < this.wordDatabase.length;i++) {
          if (indices[i]) {
            for (var j = 0; j < this.wordDatabase[i].length; j++){
              this.wordlist.push(this.wordDatabase[i][j]);
            }
          }
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
          this.index += 1;
          this.output = "";
          this.correct_audio.play();
          this.isHidden = false;
          setTimeout(this.hide, this.timer * 1000);
          
          // If they finished the wordlist
          if (this.index == this.wordlist.length) {
            this.index = 0;
            this.output = "";
            this.isHidden = true;
            this.complete = true;
          }
          
        // If they got the word wrong
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
</style>
