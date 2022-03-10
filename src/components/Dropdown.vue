<template>
  <div class="wrapper">
    <button ref="ellipsis"
        :class="{ active: open }">
      <font-awesome-icon icon="ellipsis-vertical" />
    </button>
    <div class="dropdown"
        :class="{ hidden: !open }">
      <RowButton
          class="dropdown-item"
          v-for="option in options" v-bind:key="option.action"
          v-on:click="$emit('click', option.action)"
          :text="option.label"
          :icon="option.icon"/>
    </div>
  </div>
</template>


<script>
  import RowButton from '@/components/RowButton.vue';

  export default {
    components: {
      RowButton,
    },
    props: {
      options: {
        // options must be an array of objects like {label: 'abc', icon: 'plus', action: 'thing'}
        type: Array,
      },
    },
    data() {
      return {
        open: false,
      }
    },
    created() {
      window.addEventListener('click', this.handleGlobalClick, { passive: true, capture: true });
    },
    beforeDestroy() {
      window.removeEventListener('click', this.handleGlobalClick);
    },
    methods: {
      handleGlobalClick(event) {
        const ellipsis = this.$refs['ellipsis'];

        // this prevents an error which kinda crashes the page
        // haven't figured out how to fix the error yet
        if (!ellipsis) {
          return;
        }

        let clickIsInsideEllipsis = ellipsis.contains(event.target);
        let currentlyClosed = !this.open;

        this.open = currentlyClosed && clickIsInsideEllipsis;
      },
    },
  }
</script>


<style scoped>
  .wrapper {
    position: relative;
    display: inline-block;
  }

  .wrapper > button {
    font-size: 28px;

    /* center the ellipsis icon */
    display: flex;
    justify-content: center;
    align-items: center;

    /* make it a circle */
    width: 2em;
    height: 2em;
    border-radius: 1em;
  }

  .active {
    background-color: var(--faint-colour);
  }

  .dropdown {
    display: block;
    position: absolute;

    /* make it right-aligned */
    right: 0;

    background-color: var(--background-colour);
    border: solid 1px var(--faint-colour);
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;

    white-space: nowrap;

    /* the dropdown was rendering under the list buttons on the custom-lists page; this was the quick fix */
    z-index: 1;
  }

  .hidden {
    display: none;
  }
</style>
