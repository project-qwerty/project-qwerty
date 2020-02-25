<template>
  <div class="home">
    <Header />
    <div style="opacity:0;height:50px"></div>
    <img alt="App logo" style="height:320px" src="../assets/app_logo_3.png">
    <p class="paragraph"> This app is for people with aphasia after a stroke </p>
    <Start :to="to" style="float:right; margin:50px"/>
  </div>
</template>


<script>
  import Header from '../components/layout/Header';
  import Start from '../components/StartButton';

  export default {
    name: 'home',
    components: {
      Header,
      Start
    },
    data() {
      return {
        to: "/select_words",
      }
    }
  }
</script>


<style>
  .paragraph {
    float: left;
    margin: 50px;
    font-size: 32px;
    color:rgba(58, 58, 60);
  }
</style>