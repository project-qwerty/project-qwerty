<template>
  <div
      v-if="shown"
      class="overlay">
    <div
        ref="modal"
        class="modal"
        :style="{
          '--width': width,
          '--height': height,
        }">
      <slot />
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      shown: {
        type: Boolean,
        default: false,
      },
      width: {
        type: String,
        default: 'initial',
      },
      height: {
        type: String,
        default: 'initial',
      },
    },
    watch: {
      shown: function() {
        // prevent scrolling the underlying page when modal is shown
        document.body.style.overflow = this.shown ? 'hidden' : 'auto';
      },
    },
    created() {
      // the 'true' param means other click handlers will be processed too
      window.addEventListener('click', this.handleGlobalClick, { passive: true, capture: true });
    },
    beforeDestroy() {
      window.removeEventListener('click', this.handleGlobalClick);

      // re-activate scrolling if it was disabled
      document.body.style.overflow = 'auto';
    },
    methods: {
      handleGlobalClick(event) {
        const modal = this.$refs['modal'];

        // this prevents an error which kinda crashes the page
        // haven't figured out how to fix the error yet
        if (!modal) {
          return;
        }

        let clickIsInsideModal = modal.contains(event.target);

        if (this.shown && !clickIsInsideModal) {
          this.$emit('click-out');
        }
      },
    },
  };
</script>


<style scoped>
  .overlay {
    /* take up the whole screen */
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    z-index: 100;

    /* centre the modal */
    display: flex;
    justify-content: center;
    align-items: center;

    /* fade out the background */
    background-color: rgb(0, 0, 0, 0.75);
  }

  .modal {
    width: var(--width);
    height: var(--height);
    margin: var(--thin-gap);

    box-sizing: border-box;
    padding: 2em;

    border-radius: 1em;

    background-color: var(--background-colour);
    color: var(--foreground-colour);
  }
</style>
