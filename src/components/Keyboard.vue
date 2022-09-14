<template>
  <div class="keyboard">
    <div class="row row-q">
      <!-- ontouchstart="" makes the :active class trigger on iOS -->
      <button
          ontouchstart=""
          v-for="letter in letters[0]" v-bind:key="letter"
          v-on:click="handleKeystroke(letter)"
          :class="{ disabled: !enabledKeys.includes(letter) }">
        {{ renderedLetter(letter) }}
      </button>
      <button class="backspace"
          ontouchstart=""
          v-on:click="handleKeystroke('backspace')"
          :class="{ disabled: !enabledKeys.includes('backspace') }">
        <font-awesome-icon
            class="backspace-icon"
            icon="delete-left" />
      </button>
    </div>
    <div class="row row-a">
      <button
          ontouchstart=""
          v-for="letter in letters[1]" v-bind:key="letter"
          v-on:click="handleKeystroke(letter)"
          :class="{ disabled: !enabledKeys.includes(letter) }">
        {{ renderedLetter(letter) }}
      </button>
    </div>
    <div class="row row-z">
      <button
          ontouchstart=""
          v-for="letter in letters[2]" v-bind:key="letter"
          v-on:click="handleKeystroke(letter)"
          :class="{ disabled: !enabledKeys.includes(letter) }">
        {{ renderedLetter(letter) }}
      </button>
    </div>
    <div class="row row-space">
      <button class="space"
          ontouchstart=""
          v-on:click="handleKeystroke(' ')"
          :class="{ disabled: !enabledKeys.includes(' ') }">
      </button>
    </div>
  </div>
</template>


<script>
  const letters = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  export default {
    props: {
      enabledKeys: {
        type: Array,
        default: letters.flat().concat(['backspace']),
      },
      uppercase: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        letters: letters,
      }
    },
    methods: {
      handleKeystroke(key) {
        this.$emit('keystroke', key);
      },
      renderedLetter(letter) {
        if (this.uppercase) {
          return letter.toUpperCase();
        } else {
          return letter.toLowerCase();
        }
      },
    },
  }
</script>


<style scoped>
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

  .keyboard > .row-a {
    padding-right: 2em;
  }

  .keyboard > .row-z {
    padding-right: 2em;
  }

  .keyboard > .row-space {
    padding-right: 2em;
  }

  .keyboard button {
    /* shape */
    width: 4em;
    height: 3em;
    border-radius: 0.5em;

    background-color: var(--background-colour);

    /* centre contents */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* visually respond to keypresses */
  .keyboard button:not(.disabled):active {
    filter: brightness(75%);
  }

  /* for when disabled by assistance features */
  .keyboard button.disabled {
    background-color: var(--faint-colour);
  }

  /* special keys (space and backspace) */
  .keyboard button.backspace {
    width: 6em;
  }

  .keyboard button .backspace-icon {
    font-size: 36px;
  }

  .keyboard button.space {
    width: 31em;
  }
</style>
