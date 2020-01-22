<template>
    <div id="app">
      <Header />
      <WordList class="wordlist" v-bind:wordlist="wordlist" v-bind:index="index" />
      <div class="output">{{output}}</div>
      <Keyboard v-bind:keys="keys" v-on:update:keypressed="keypressed" />
      <UploadFile />
  </div>
</template>


<script>
  import Header from './components/layout/Header';
  import Keyboard from './components/keyboard/KeyboardComponent';
  import WordList from './components/WordList';
  import UploadFile from './components/UploadFile';

  export default {
    name: 'app',
    components: {
      Header,
      WordList,
      Keyboard,
      UploadFile,
    },
    data() {
      return {
        wordlist: ["hello", "my", "name", "is", "tim"],
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
      }
    },
    methods: {
      keypressed(char) {
        if (char !== "delete") {
          this.output += char;
        } else {
          this.output = this.output.substring(0, this.output.length - 1);
        }
        if (this.output === this.wordlist[this.index]) {
          this.index += 1;
          this.output = "";
          if (this.index == this.wordlist.length) {
            this.index = 0;
            this.output = "YOU WIN!!";
          }
        }
      }
    },
    created() {
    }
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
