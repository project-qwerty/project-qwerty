<template>
  <main>
    <header>
      <IconButton
          icon="x"
          v-on:click="$router.back()" />

      <div>1 / 5</div>
    </header>

    <div class="readout">
      <div class="target">Beagle</div>
      <div class="input">Beagle</div>
    </div>

    <div class="keyboard">
      <div class="row row-q">
        <div class="key"
            v-for="letter in letters[0]" v-bind:key="letter">
          {{ letter }}
        </div>
        <div class="key backspace">
          <font-awesome-icon
              class="backspace-icon"
              icon="delete-left" />
        </div>
      </div>
      <div class="row row-a">
        <div class="key"
            v-for="letter in letters[1]" v-bind:key="letter">
          {{ letter }}
        </div>
      </div>
      <div class="row row-z">
        <div class="key"
            v-for="letter in letters[2]" v-bind:key="letter">
          {{ letter }}
        </div>
      </div>
      <div class="row row-space">
        <div class="key space"></div>
      </div>
    </div>

  </main>
</template>


<script>
  // import BuiltInWordLists from '@/functions/BuiltInWordLists.js';
  // import LocalStorage from '@/functions/LocalStorage.js';

  import IconButton from '@/components/IconButton.vue';

  export default {
    components: {
      IconButton,
    },
    data() {
      return {
        letters: [
          ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
          ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
          ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        ],
      }
    },
    methods: {

    },
  }
</script>


<style scoped>
  main {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: solid 2px var(--faint-colour);

    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 24px;
    padding-right: 24px;

    font-size: 24px;
  }

  .readout {
    font-weight: bold;
  }

  .readout > .target {
    color: var(--primary-colour);

    font-size: 48px;

    margin-bottom: 10px;
  }

  .readout > .input {
    font-size: 96px;
  }

  .readout > .input:after {
    /* add the underline */
    content: '';
    display: block;
    margin: 0 auto;
    width: 50%;
    border-bottom: 1px solid var(--faint-colour);
  }

  .keyboard {
    height: 40%;
    padding-top: 40px;

    background-color: var(--faint-colour);

    font-size: 20px;
  }

  .keyboard > .row {
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin-bottom: 0.5em;
    gap: 0.5em;
  }

  /* these are the styles that give you a natural keyboard */
  /* .keyboard > .row-a {
    padding-right: 8em;
  }

  .keyboard > .row-z {
    padding-right: 13em;
  }

  .keyboard > .row-space {
    padding-right: 13em;
  } */

  .keyboard > .row-q {
    padding-left: 2em;
  }

  .keyboard .key {
    width: 4em;
    height: 3em;
    border-radius: 0.5em;

    background-color: var(--background-colour);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .keyboard .key.backspace {
    width: 6em;
  }

  .keyboard .key .backspace-icon {
    font-size: 36px;
  }

  .keyboard .key.space {
    width: 31em;
  }
</style>
