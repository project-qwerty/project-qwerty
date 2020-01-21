<template>
    <div id="app">
      <Header />
      <Keyboard v-bind:keys="keys" />
  </div>
</template>


<script>
  import Header from './components/layout/Header';
  import Keyboard from './components/keyboard/KeyboardComponent';

  export default {
    name: 'app',
    components: {
      Header,
      Keyboard
    },
    data() {
      return {
        keys: [
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
          }],[
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
          }],[
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
          }],[
          {
            letter: ' '
          }]
        ]
      }
    },
    methods: {
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
</style>
