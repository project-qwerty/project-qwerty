<template>
  <div class="overlay" :class="{ hidden: !shown, }">
    <div ref="modal"
        class="modal"
        :style="{
          width: width,
          height: height,
        }">
      <div class="modal-inner">
        <slot></slot>
      </div>
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
        default: '600px',
      },
      height: {
        type: String,
        default: '400px',
      },
    },
    created() {
      // the 'true' param means other click handlers will be processed too
      window.addEventListener('click', this.handleGlobalClick, true);
    },
    beforeDestroy() {
      window.removeEventListener('click', this.handleGlobalClick);
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
    watch: {
      shown: function() {
        // prevent scrolling the underlying page when modal is shown
        document.body.style.overflow = this.shown ? 'hidden' : 'auto';
      },
    },
  }
</script>


<style scoped>
  .overlay {
    /* take up the whole screen */
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    /* centre the modal */
    display: flex;
    justify-content: center;
    align-items: center;

    /* fade out the background */
    background-color: rgb(0, 0, 0, 0.75);
  }

  .modal {
    max-width: 100%;
    max-height: 100%;

    border-radius: 1em;

    /* allow modal contents to scroll */
    overflow: auto;

    background-color: var(--background-colour);
    color: var(--foreground-colour);
  }

  .modal-inner {
    margin: 2em;
  }

  .hidden {
    display: none;
  }

  /* make the h tags a bit smaller in the modal */
  h1 { font-size: 1.5em; }
  h2 { font-size: 1.3em; }
  h3 { font-size: 1em; }
  h4 { font-size: 0.8em; }
  h5 { font-size: 0.7em; }
  h6 { font-size: 0.6em; }

</style>
