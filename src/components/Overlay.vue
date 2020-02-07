<template>
  <div class="overlay">
    <div class="popups">
      <popup-btn-component content="Finished" :to="to[0]" />
      <popup-btn-component content="Choose New Word List" :to="to[1]" />
      <popup-btn-component content="Repeat Task" :to="to[2]" />
    </div>
  </div>
</template>

<script>
  import Popup from '../components/PopupButton';
  
  export default {
    name : 'overlay-component',
    components : {"popup-btn-component" : Popup},
    data () {
      return {
        to: [
          "/",
          "/select_words",
          "/keyboard"
        ]
      }
    }
  }
</script>

<style>
  .overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  
  .popups {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>