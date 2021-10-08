<template>
  <div class="overlay">
    <div class="popups">
      <popup-btn-component content="Next word" :to="click" />
    </div>
  </div>
</template>

<script>
  import Popup from '../components/PopupButton';

  export default {
    components: {"popup-btn-component": Popup},
    methods: {
      click() {
        this.$emit('update:buttonClicked', false);
      },
    },
  }
</script>

<style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.25);
  }

  .popups {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
