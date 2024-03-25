<template>
  <!-- unfortunately these can't be <button>s because they contain divs -->
  <div
      class="tile-outer"
      :style="componentStyle()"
      @click="onClick">
    <div class="tile-middle">
      <div class="tile-inner">
        <div
            v-if="enabled"
            class="selected-check">
          <FontAwesomeIcon icon="check" />
        </div>
        <div class="icon">
          <FontAwesomeIcon :icon="icon" />
        </div>
        <div class="text">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      icon: {
        type: String,
        default: 'list',
      },
      text: {
        type: String,
        default: '',
      },
      colour: {
        type: String,
        default: 'var(--foreground-colour)',
      },
      enabled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      componentStyle() {
        return {
          '--tile-colour': this.colour,
          '--outer-colour': this.enabled ? 'var(--primary-colour)' : 'var(--tile-colour)',
          '--middle-colour': this.enabled ? 'var(--background-colour)' : 'var(--tile-colour)',
        }
      },
      onClick() {
        this.$emit('update', {
          text: this.text,
          enabled: !this.enabled,
        });
      },
    },
  }
</script>


<style scoped>
  .tile-outer {
    cursor: pointer;

    /* constant */
    --ring-diameter: 5px;

    /* styling for the whole component */
    color: var(--background-colour);
    text-align: center;
    text-shadow: 0px 0px 3px black;

    /* --outer-colour is a dynamic variable */
    background-color: var(--outer-colour);

    padding: var(--ring-diameter);
    border-radius: calc(var(--ring-diameter) * 6);
  }

  .tile-middle {
    /* fill parent */
    height: calc(100% - var(--ring-diameter) * 2);

    padding: var(--ring-diameter);
    /* --middle-colour is a dynamic variable */
    background-color: var(--middle-colour);

    border-radius: calc(var(--ring-diameter) * 5);
  }

  .tile-inner {
    /* fill parent */
    height: calc(100% - var(--ring-diameter) * 2);

    /* this doesn't need to be --ring-diameter but whatevs */
    padding: var(--ring-diameter);
    /* the inner tile's colour never changes */
    background-color: var(--tile-colour);

    border-radius: calc(var(--ring-diameter) * 4);

    /* this allows absolute positioning of .selected-check */
    position: relative;
  }

  .selected-check {
    /* position */
    position: absolute;
    top: 10px;
    left: 10px;

    /* shape */
    width: 2rem;
    height: 2rem;
    border-radius: 50%;

    background-color: var(--primary-colour);

    /* center the check within */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    margin: 0.5em;

    font-size: 1.5em
  }

  .text {
    font-weight: bold;
  }
</style>
