<template>
  <div class="keyboard" :class="[ keyset ]">
    <!-- ontouchstart="" makes the :active class trigger on iOS -->
    <button
        v-for="key in keys"
        :key="key"
        ontouchstart=""
        :class="{
          disabled: !enabledKeys.includes(key),
          highlighted: highlightedKeys.includes(key),
          ghost: key === 'backspace' && keyset === 'numeric'
        }"
        :style="'grid-area: _' + (key === ' ' ? 'space' : key)"
        @click="handleKeystroke(key)">

      <FontAwesomeIcon
          v-if="key === 'backspace'"
          class="backspace-icon"
          icon="delete-left"
          viewBox="0 0 600 500" />
      <!-- the viewBox makes the icon scale with the keyboard size -->
      <!-- the magic numbers control the icon location and are manually tuned in tandem with the element style -->
      <!-- doing the letters in an svg as well enables scaling with the keyboard using the same system -->
      <!-- https://css-tricks.com/fitting-text-to-a-container/#aa-just-use-svg -->
      <svg
          v-if="key !== 'backspace'"
          viewBox="0 0 15 40"
          style="fill: currentColor;">
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">{{ renderedCharacter(key) }}</text>
      </svg>
    </button>
  </div>
</template>


<script>
  const alphaKeys = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'backspace',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm',
    ' ',
  ];
  const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const alphaNumericKeys = numberKeys.concat(alphaKeys);
  const numericKeys = numberKeys.concat(['backspace']);

  // this is needed due to an apparent bug with eslint that prevents an anonymous empty array being passed to highlightedKeys.default
  const emptyArray = [];

  export default {
    props: {
      keyset: {
        type: String, // should be 'alpha', 'alphanumeric', or 'numeric'
      },
      enabledKeys: {
        type: Array,
      },
      highlightedKeys: {
        type: Array,
        default: emptyArray,
      },
      uppercase: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      keys() {
        switch (this.keyset) {
          case 'alphanumeric':
            return alphaNumericKeys;
          case 'alpha':
            return alphaKeys;
          case 'numeric':
            return numericKeys;
          default:
            // this shouldn't be possible
            return null;
        }


      },
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
  };
</script>


<style scoped>
  .keyboard {
    height: 100%;

    display: grid;

    --gap: 1%;

    column-gap: var(--gap);
    /* this makes the row gap relative to the width instead of height, ie equal to the column-gap */
    row-gap: calc(var(--gap) * var(--relative-width) / var(--relative-height));
  }

  .keyboard.alpha {
    grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 3fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-areas:
        /* underscores are needed because pure digits can't be grid areas */
        "_q _w _e _r _t _y _u _i _o _p _backspace"
        " . _a _s _d _f _g _h _j _k _l  ."
        " .  . _z _x _c _v _b _n _m  .  ."
        " .  . _space _space _space _space _space _space _space . .";

    /* these relative values provide the aspect ratio of the keyboard */
    --relative-width: 1020;
    --relative-height: 280;
  }

  .keyboard.alphanumeric {
    grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 3fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas:
        "_1 _2 _3 _4 _5 _6 _7 _8 _9 _0  ."
        "_q _w _e _r _t _y _u _i _o _p _backspace"
        " . _a _s _d _f _g _h _j _k _l  ."
        " .  . _z _x _c _v _b _n _m  .  ."
        " .  . _space _space _space _space _space _space _space . .";

    --relative-width: 1020;
    --relative-height: 352;
  }

  .keyboard.numeric {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-areas:
        "_1 _2 _3"
        "_4 _5 _6"
        "_7 _8 _9"
        " . _0 _backspace";

    --relative-width: 365;
    --relative-height: 207;
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

  /* make the backspace on the keypad view not have a key shape */
  .keyboard button.ghost {
    color: var(--foreground-colour);
    background: none;
  }

  /* visually respond to keypresses */
  .keyboard button:not(.disabled):active {
    filter: brightness(75%);
  }

  /* for when disabled by assistance features */
  .keyboard button.disabled {
    background-color: var(--faint-colour);
  }

  /* for when highlighted by assistance features */
  .keyboard button.highlighted {
    color: var(--background-colour);
    background-color: var(--highlight-colour);
  }

  /* there are currently no cases in the app where a key is disabled AND highlighted but you never know */
  .keyboard button.disabled.highlighted {
    filter: brightness(4);
  }

  .keyboard button .backspace-icon {
    /* these affect the placement of the backspace icon and are manually tuned */
    height: 60%;
    width: 50%;
  }
</style>
