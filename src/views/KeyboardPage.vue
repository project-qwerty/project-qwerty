
<template>
    <div id="keyboard">
      <Header style="opacity:0"/>
      <WordList v-if="!isHidden" class="wordlist" v-bind:wordlist="wordlist" v-bind:index="index" />
      <div v-else style="color:white;opacity:0" class="wordlist">You can do it!</div>
      <div class="output">{{output}}</div>
      <Keyboard v-bind:keys="keys" :word="word" v-on:update:keypressed="keypressed" />
  </div>
</template>


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


<script>
  import Header from '../components/layout/Header';
  import Keyboard from '../components/keyboard/KeyboardComponent';
  import WordList from '../components/WordList';

  export default {
    name: 'app',
    components: {
      Header,
      WordList,
      Keyboard,
    },
    data() {
      return {
        wordlist: ["hello", "my", "name", "is", "chris"],
        index: 0,
        keys: [
          [
            {
              letter: 'delete'
            }
          ],
          [
            {
              letter: 'q'
            },
            {
              letter: 'w'
            },
            {
              letter: 'e'
            },
            {
              letter: 'r'
            },
            {
              letter: 't'
            },
            {
              letter: 'y'
            },
            {
              letter: 'u'
            },
            {
              letter: 'i'
            },
            {
              letter: 'o'
            },
            {
              letter: 'p'
            }
          ],
          [
            {
              letter: 'a'
            },
            {
              letter: 's'
            },
            {
              letter: 'd'
            },
            {
              letter: 'f'
            },
            {
              letter: 'g'
            },
            {
              letter: 'h'
            },
            {
              letter: 'j'
            },
            {
              letter: 'k'
            },
            {
              letter: 'l'
            }
          ],
          [
            {
              letter: 'z'
            },
            {
              letter: 'x'
            },
            {
              letter: 'c'
            },
            {
              letter: 'v'
            },
            {
              letter: 'b'
            },
            {
              letter: 'n'
            },
            {
              letter: 'm'
            }
          ],
          [
            {
              letter: ' '
            }
          ]
        ],
        output: "",
        isHidden: false,
        errorless: false, // Controls whether errorless is on or off 
        timerOnOff: false, // Controls whether the timer is on or off (line 168)
        audio : new Audio(require('@/assets/correct.mp3')),
          settings: {
              timer : 1
          }
      }
    },
    computed : {
      'word' : function(){
        if(this.errorless) return this.wordlist[this.index][this.output.length];
        return 'abcdefghijklmnopqrstuvwxyzdelete '
      }
    },
    methods: {
      keypressed(char) {
        if (char !== "delete") {
          if (this.errorless) {
            var _word = this.wordlist[this.index];
            if (char === _word[this.output.length]) {
              this.output += char;
            } 
          } else {
            this.output += char;
          }
        } else {
          this.output = this.output.substring(0, this.output.length - 1);
        }
        if (this.output === this.wordlist[this.index]) {
          this.index += 1;
          this.output = "";
          this.audio.play();
          
          // Ths is the timer setting, time is in milliseconds
            // This should be where the if statement checking if the timer is set to zero should be added.
          this.isHidden = false;
          setTimeout(this.hide, this.timer * 1000);
          if (this.index == this.wordlist.length) {
            this.index = 0;
            this.output = "YOU WIN!!";
          }
        }
      },
      hide() {
          
        // If true then time is on, if false the timer off
        if (this.$cookies.get('settings.timer') > 0) {
            this.timerOnOff = true
            
        } else {
            this.timerOnOff = false
        }
          
        this.isHidden = this.timerOnOff;
      }
    },
    created() {
        if(this.$cookies.isKey('settings.timer')){
            this.timer = this.$cookies.get('settings.timer')
        }
        setTimeout(this.hide, this.timer * 1000);
    }
      
  }
</script>
