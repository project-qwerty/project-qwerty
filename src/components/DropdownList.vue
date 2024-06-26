<template>
  <div class="wrapper">
    <div
        class="mobile-only dropdown up faint-border"
        :class="{ hidden: !open }">
      <RowButton
          v-for="option in options"
          :key="option.action"
          class="dropdown-item"
          :text="option.label"
          :icon="option.icon"
          @click="$emit('click', option.action)" />
    </div>
    <button
        ref="ellipsis"
        :class="{ active: open }">
      <FontAwesomeIcon icon="ellipsis-vertical" />
    </button>
    <div
        class="desktop-only dropdown down faint-border"
        :class="{ hidden: !open }">
      <RowButton
          v-for="option in options"
          :key="option.action"
          class="dropdown-item"
          :text="option.label"
          :icon="option.icon"
          @click="$emit('click', option.action)" />
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
      };
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
  };
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
    border-radius: 50%;
  }

  .active {
    background-color: var(--faint-colour);
  }

  .dropdown {
    position: absolute;

    /* make it right-aligned */
    right: 0;

    background-color: var(--background-colour);
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;

    white-space: nowrap;

    /* the dropdown was rendering beneath the category row buttons on the custom-categories page; this was the quick fix */
    z-index: 40;
  }

  .down {
    margin-top: 8px;
  }

  .up {
    transform:
      translateY(-100%) /* render above the button */
      translateY(-8px); /* equivalent to the down dropdown's 8px margin */
  }

  .hidden {
    display: none;
  }
</style>
