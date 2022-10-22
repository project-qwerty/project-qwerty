<template>
  <div class="overlay"
      :class="{ hidden: !shown, }">
    <div ref="modal"
        class="modal">
      <div class="modal-inner"
          :style="{
            '--min-width': minWidth,
            '--min-height': minHeight,
          }">
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
      minWidth: {
        type: String,
        default: 'initial',
      },
      minHeight: {
        type: String,
        default: 'initial',
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
    top: 0px;
    right: 0;
    bottom: 0;

    /* centre the modal */
    display: flex;
    justify-content: center;
    align-items: center;

    /* fade out the background */
    background-color: rgb(0, 0, 0, 0.75);

    /* place above the fixed hamburger menu area at top of page */
    z-index: 3;
  }

  .modal {
    max-width: 100%;
    /* expand on mobile */
    min-width: 90%;
    max-height: 100%;

    border-radius: 1em;
    margin: 1rem;

    /* allow modal contents to scroll */
    overflow: auto;

    background-color: var(--background-colour);
    color: var(--foreground-colour);
  }

  .modal-inner {
    border: 4px solid green;
    --padding: 2em;

    padding: var(--padding);

    max-width: 500px;
    min-width: calc(var(--min-width) - var(--padding) * 2);
    min-height: calc(var(--min-height) - var(--padding) * 2);

    display: flex;
    flex-direction: column;
  }

  .modal-inner > * {
    /* this is needed because of this issue: */
    /* https://stackoverflow.com/questions/8468066/child-inside-parent-with-min-height-100-not-inheriting-height */
    min-height: inherit;
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
