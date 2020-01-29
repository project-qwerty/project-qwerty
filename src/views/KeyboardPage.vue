
<template>
    <div id="keyboard">
      <Header />
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
        errorless: false,
        audio : new Audio(require('@/assets/correct.mp3')),
      }
    },
    computed : {
      'word' : function(){
        if(this.errorless) return this.wordlist[this.index][this.output.length];
        return 'abcdefghijklmnopqrstuvwxyzdelete'
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
          
          this.isHidden = false;
          setTimeout(this.hide, 3000);
          if (this.index == this.wordlist.length) {
            this.index = 0;
            this.output = "YOU WIN!!";
          }
        }
      },
      hide() {
        this.isHidden = true;
      }
    },
    created() {
      setTimeout(this.hide, 5000);
    }
  }
</script>
