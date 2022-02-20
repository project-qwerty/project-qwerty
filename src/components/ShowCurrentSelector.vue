<template>
  <div class="container">
    <div class="button-outer"
        v-on:click="minusClicked"
        :class="{ disabled: firstOptionIsSelected }">
      <div class="button-inner">-</div>
    </div>
    <div class="display">{{ selectedOption.label }}</div>
    <div class="button-outer"
        v-on:click="plusClicked"
        :class="{ disabled: lastOptionIsSelected }">
      <div class="button-inner">+</div>
    </div>
  </div>
</template>


<script>
  export default {
    props: [
      'options',  // options must be an array of objects like {label: 'abc', val: 123}
      'initialValue',
    ],
    data() {
      return {
        activeIndex: 0,
      };
    },
    created() {
      const indexOfInitialValue = this.options.findIndex(opt => opt.val === this.initialValue);

      // leave it at the default if the supplied value isn't in the list
      if (indexOfInitialValue === -1) {
        return;
      }

      this.activeIndex = indexOfInitialValue;
    },
    computed: {
      selectedOption() {
        return this.options[this.activeIndex];
      },
      firstOptionIsSelected() {
        return this.activeIndex === 0;
      },
      lastOptionIsSelected() {
        return this.activeIndex === this.options.length - 1;
      },
    },
    methods: {
      minusClicked() {
        if (this.firstOptionIsSelected) {
          return;
        }

        this.activeIndex--;

        this.$emit('update', this.selectedOption.val);
      },
      plusClicked() {
        if (this.lastOptionIsSelected) {
          return;
        }

        this.activeIndex++;

        this.$emit('update', this.selectedOption.val);
      },
    },
  }
</script>


<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .display {
    font-size: 16px;
    font-weight: bold;
    text-align: center;

    padding: 1em;
    border: solid 1px var(--faint-colour);
    border-radius: 0.5em;

    /* make the display take up all available space */
    flex-grow: 1;

    /* space the buttons apart from the display */
    margin-left: 1em;
    margin-right: 1em;
  }

  .button-outer {
    /* shape */
    width: 1em;
    height: 1em;
    padding: 1em;
    border-radius: 50%;

    /* center the text */
    display: flex;
    justify-content: center;
    align-items: center;

    /* enabled colours */
    color: var(--background-colour);
    background-color: var(--primary-colour);
  }

  .button-inner {
    font-size: 32px;
  }

  .disabled {
    background-color: var(--faint-colour);
  }
</style>
