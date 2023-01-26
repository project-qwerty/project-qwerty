<template>
  <div class="keyboard">
      <!-- ontouchstart="" makes the :active class trigger on iOS -->
      <button
          ontouchstart=""
          v-for="key in keys" v-bind:key="key"
          @click="handleKeystroke(key)"
          :class="{ disabled: !enabledKeys.includes(key), }"
          :style="'grid-area: ' + (key === ' ' ? 'space' : key)">

        <font-awesome-icon
            v-if="key === 'backspace'"
            class="backspace-icon"
            icon="delete-left"
            viewBox="0 0 600 500" />
        <!-- the viewBox makes the icon scale with the keyboard size -->
        <!-- the magic numbers control the icon location and are manually tuned in tandem with the element style -->
        <!-- doing the letters in an svg as well enables scaling with the keyboard using the same system -->
        <!-- https://css-tricks.com/fitting-text-to-a-container/#aa-just-use-svg -->
        <svg viewBox="0 0 15 40"
            v-if="key !== 'backspace'">
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">{{ renderedCharacter(key) }}</text>
        </svg>
      </button>
  </div>
</template>


<script>
  const keys = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'backspace',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm',
    ' ',
  ];

  export default {
    props: {
      enabledKeys: {
        type: Array,
        default: keys,
      },
      uppercase: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        keys: keys,
      }
    },
    methods: {
      handleKeystroke(key) {
        this.$emit('keystroke', key);
      },
      renderedCharacter(key) {
        // if it's backspace, it'll have the icon instead of text
        if (key === 'backspace') {
          return '';
        }

        if (this.uppercase) {
          return key.toUpperCase();
        } else {
          return key.toLowerCase();
        }
      },
    },
  }
</script>


<style scoped>
  .keyboard {
    height: 100%;

    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 3fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-areas:
        "q w e r t y u i o p backspace"
        ". a s d f g h j k l ."
        ". . z x c v b n m . ."
        ". . space space space space space space space . .";

    /* this is exactly the right proportions for the keyboard as designed and implemented */
    --relative-width: 1020;
    --relative-height: 280;

    --gap: 1%;

    column-gap: var(--gap);
    /* this makes the row gap relative to the width instead of height, ie equal to the column-gap */
    row-gap: calc(var(--gap) * var(--relative-width) / var(--relative-height));
  }

  .keyboard button {
    border-radius: 0.5em;

    background-color: var(--background-colour);

    /* centre contents */
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
  }

  .keyboard button > svg {
    /* this prevents the letter svgs from expanding the keys */
    position: absolute;

    height: 100%;
  }

  /* visually respond to keypresses */
  .keyboard button:not(.disabled):active {
    filter: brightness(75%);
  }

  /* for when disabled by assistance features */
  .keyboard button.disabled {
    background-color: var(--faint-colour);
  }

  .keyboard button .backspace-icon {
    /* these affect the placement of the backspace icon and are manually tuned */
    height: 60%;
    width: 50%;
  }
</style>
