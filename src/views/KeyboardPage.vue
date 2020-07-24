<template>
  <div id="keyboard">
<!--    This section runs if the word is not hidden-->
    <div v-if="!isHidden" style="display:flex;position:relative;justify-content:center">
      <router-link style="position:fixed;left:0;top:10;text-decoration:none" to="/select_words">
        <font-awesome-icon style="font-size:40;color:rgba(142, 142, 147);" icon="chevron-left"/>
      </router-link>
      <Progress :total="trials" :current="this.count" />
    </div>
<!--    This section runs if the word is hidden-->
    <div v-if="isHidden" style="display:flex;position:relative;justify-content:space-between">
      <router-link style="text-decoration:none" to="/select_words">
        <font-awesome-icon style="font-size:40;color:rgba(142, 142, 147);" icon="chevron-left"/> 
      </router-link>
      <Progress :total="trials" :current="this.count" />
      <font-awesome-icon v-on:click="rehide" style="font-size:40; color:rgb(48, 209, 88);" icon="eye"/> <!--eye-->
    </div>
    <div>
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
  import Progress from '../components/Progress';
  import InbuiltWordlists from '@/components/InbuiltWordlists.js';

  export default {
    name: 'app',
    components: {
      WordList,
      Keyboard,
      Overlay,
      Progress,
    },
    data() {
      return {
        timer: null,
        showModal:true,
        wordlist: [],
        index: 0,
        count: 1,
        complete: false,
        output: "",
        isHidden: false,
        trials: null,
        InbuiltWordlists : InbuiltWordlists,
        errorlessOnOff: true, // Controls whether errorless is on or off 
        timerOnOff: false, // Controls whether the timer is on or off (line 168)
        correct_audio : new Audio(require('@/assets/correct.mp3')),
        wrong_audio : new Audio(require('@/assets/wrong.mp3')),
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
      //Word number control
      if(this.$cookies.isKey('settings.trials')){
        this.trials = this.$cookies.get('settings.trials');
      } else {
        this.trials = 5;
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
        var customSelected = this.$cookies.get('select_words.custom_selected').split(',');
        customSelected = JSON.parse("[" + customSelected + "]")
        if (this.$cookies.isKey('custom_word_lists.words')) {
          var customWords = this.$cookies.get('custom_word_lists.words').split('|').slice(0,-1);
          var __cw_list = [];
          for(var i = 0; i < customSelected.length; i++){
            if(!customSelected[i]) continue;
            var __w_list = customWords[i].split(',');
            __cw_list = __cw_list.concat(__w_list);
          }
          this.wordlist = this.wordlist.concat(__cw_list)
          
          /*for (var i = 0; i < customSelected.length; i++) {
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
          }*/
        }
      }
      
      this.inbuiltCreated(this.InbuiltWordlists)
      
    },
    computed : {
      'word' : function(){
        if(this.errorlessOnOff) return this.wordlist[this.index][this.output.length];
        return 'abcdefghijklmnopqrstuvwxyz backspace';
      }
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
          var indices = JSON.parse("[" + selected + "]");
          var _cw_list = []; // cumulated word list
          for(var i = 0; i < indices.length; i++){
            if(!indices[i]) continue
            var __w_array = wordlists[i][Object.keys(wordlists[i])[0]]
            _cw_list = _cw_list.concat(__w_array);
          }
          this.wordlist = this.wordlist.concat(_cw_list);
           /* for (var i = 0; i < wordlists.length;i++) {
              if (indices[i]) {
                for (var j = 0; j < Object.values(wordlists[0]).length; j++){
                  for (var k = 0; k < Object.values(wordlists[0])[j].length; k++) {
                    this.wordlist.push(Object.values(wordlists[0])[j][k]);
                  }
                 window .console.log(this.wordlist);
                }
              }
            }*/
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
          this.timer = setTimeout(this.hide, this.settings.timer * 1000);
          
          // If they finished the trials
          if (this.count == this.trials) {
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
