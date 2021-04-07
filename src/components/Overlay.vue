<template>
  <div class="overlay">
    <div class="popups">
      <popup-btn-component content="Finished" :to="to1" />
      <popup-btn-component content="Choose New Word List" :to="to2" />
      <popup-btn-component content="Repeat Task" :to="to3" />
    </div>
  </div>
</template>

<script>
  import Popup from '../components/PopupButton';

  export default {
    name : 'overlay-component',
    components : {"popup-btn-component" : Popup},
    methods: {
      to1() {
        this.$router.push('/');
        this.$router.go(1);
      },
      to2() {
        this.$router.push('/select_words');
        this.$router.go(1);
      },
      to3() {
        this.$router.go(0);
      },
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
