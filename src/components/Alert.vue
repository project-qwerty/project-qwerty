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
    name : 'overlay-component',
    components : {"popup-btn-component" : Popup},
    methods: {
      click() {
        this.$emit('update:alert_function', false);
      },
    },
  }
</script>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
/*    display: table;*/
    background-color: rgba(0, 0, 0, 0.25);
/*    transition: opacity .3s ease;*/
  }
  
  .popups {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>