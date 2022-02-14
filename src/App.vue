<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<style>
  @import './assets/css/global.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
    user-select: none;
    height: 100%;
  }

  html {
    height: 100%;
  }

  body {
    line-height: 1.4;
    height: 100%;
  }

  .start-button {
    color: black;
    background-color: rgb(48, 209, 88);

    text-transform: capitalize;
    text-decoration: none;

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    box-shadow: 0 10px 10px -1px rgba(0, 0, 0, 0.5);

    width: 360px;
    margin: auto;
  }

  .start-text {
    font-size: 40px;
    margin-right: 16px;
  }

  .start-chevron {
    font-size: 25px;
    margin-bottom: 10px;
  }
</style>


<script>

</script>
