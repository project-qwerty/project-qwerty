<template>
  <div id="app" onclick="void(0)">
    <router-view></router-view>
  </div>
</template>


<style>
  @import './assets/css/global.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* TODO: delete all these global styles */
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
