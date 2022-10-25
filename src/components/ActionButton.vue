<template>
  <div class="button-wrapper">
    <button
        :style="colourStyle()"
        v-on:click="onClick">
      <font-awesome-icon class="icon" v-if="icon" :icon="icon" />
      <span class="text">{{ text }}</span>
    </button>
  </div>
</template>


<script>
  export default {
    props: {
      icon: {
        type: String,
      },
      text: {
        type: String,
      },
      colour: {
        type: String,
        default: 'var(--primary-colour)',
      },
      enabled: {
        type: Boolean,
        default: true,
      },
      major: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      onClick() {
        if (this.enabled) {
          this.$emit('click');
        }
      },
      colourStyle() {
        let foreground = 'var(--background-colour)';
        let background = this.colour;
        let border = 'transparent';

        if (!this.enabled) {
          background = 'var(--faint-colour)';
        }

        if (!this.major) {
          foreground = background;
          background = 'transparent';
          border = 'var(--faint-colour)';
        }

        return {
          '--this-foreground-colour': foreground,
          '--this-background-colour': background,
          '--this-border-colour': border,
        }
      },
    },
  }
</script>


<style scoped>
  .button-wrapper {

  }

  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0.5rem;

    border-radius: 2em;

    padding: 1em 2em;

    min-width: 3em;

    color: var(--this-foreground-colour);
    background-color: var(--this-background-colour);
    border: solid 1px var(--this-border-colour);
  }

  .text {
    font-weight: bold;
  }

  .major {
    color: var(--background-colour);
    background-color: var(--primary-colour);
  }

  .minor {
    color: var(--primary-colour);
    background-color: transparent;
  }

  .disabled.major {
    color: var(--background-colour);
    background-color: var(--faint-colour);
  }

  .disabled.minor {
    color: var(--faint-colour);
    background-color: transparent;
  }
</style>
