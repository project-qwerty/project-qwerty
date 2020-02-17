<template>
  <div id="keyboard">
    <div style="display:flex;position:relative;justify-content:center">
      <router-link style="position:fixed;left:0;top:0;text-decoration:none" to="/select_words">
        <font-awesome-icon style="font-size:40;color:rgba(142, 142, 147);" icon="chevron-left"/>
      </router-link >
      <Progress :total="this.wordlist.length" :current="this.index + 1" />
    </div>
    <div>
      <p style="font-size:60px"></p>
      <WordList v-if="!isHidden" class="wordlist" v-bind:wordlist="wordlist" v-bind:index="index" />
      <div v-else style="opacity:0" class="wordlist">You can do it!</div>
      <div class="output">{{output}}</div>
      <Overlay v-if="complete" />
      <InbuiltWordlists v-on:inbuiltCreated="inbuiltCreated" />
      <Keyboard :word="word" v-on:update:keypressed="keypressed" />
    </div>
  </div>
</template>


<script>
  import Keyboard from '../components/keyboard/KeyboardComponent';
  import WordList from '../components/WordList';
  import Overlay from '../components/Overlay';
  import Progress from '../components/Progress';
  import InbuiltWordlists from '../components/InbuiltWordlists';

  export default {
    name: 'app',
    components: {
      WordList,
      Keyboard,
      Overlay,
      Progress,
      InbuiltWordlists
    },
    data() {
      return {
        timer: null,
        showModal:true,
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
      this.timer = setTimeout(this.hide, this.timer * 1000);
      //Errorless Control
      if(this.$cookies.isKey('settings.errorless')){
        this.errorless = this.$cookies.get('settings.errorless');
        if(this.$cookies.get('settings.errorless') == 'ON') {
          this.errorlessOnOff = true;
        } else {
          this.errorlessOnOff = false;
        }
      }
      // Import custom lists
      if (this.$cookies.isKey('wordlists.select')) {
        var customSelected = this.$cookies.get('wordlists.select').split(',');
//        window.console.log(customSelected);
        if (this.$cookies.isKey('wordlists.words')) {
          var customWords = this.$cookies.get('wordlists.words').split('|').slice(0,-1);
          window.console.log(customWords);
          for (var i = 0; i < customSelected.length; i++) {
            if (customSelected[i] == "true") {
              window.console.log("i",customWords[i])
              if (customWords[i].includes(',')) {
                var miniList = customWords[i].split(',');
                for (var j = 0; j < miniList.length; j++) {
                this.wordlist.push(miniList[j]);                  
                }
              } else {
                this.wordlist.push(customWords[i]);
              }
              window.console.log(this.wordlist);
            }
          }
        }
      }
      
      
    },
    computed : {
      'word' : function(){
        if(this.errorlessOnOff) return this.wordlist[this.index][this.output.length];
        return 'abcdefghijklmnopqrstuvwxyz backspace';
      }
    },
    methods: {
      inbuiltCreated(wordlists) {
//        window.console.log("words:",wordlists);
        
        //WordList Control
        if(this.$cookies.isKey('select_list.list')){
          var selected = this.$cookies.get('select_list.list');
//          window.console.log("selected",selected);
          var indices = JSON.parse("[" + selected + "]");
//          window.console.log(indices, wordlists.length);
          for (var i = 0; i < wordlists.length;i++) {
            if (indices[i]) {
              for (var j = 0; j < Object.values(wordlists[0]).length; j++){
                for (var k = 0; k < Object.values(wordlists[0])[j].length; k++) {
                  this.wordlist.push(Object.values(wordlists[0])[j][k]);
                }
//                window.console.log(this.wordlist);
              }
            }
          }
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
          this.index += 1;
          this.output = "";
          this.correct_audio.play();
          this.isHidden = false;
          clearTimeout(this.timer);
          this.timer = setTimeout(this.hide, this.timer * 1000);
//          window.console.log("timer",this.timer);
          
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
//        window.console.log("hide");
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
