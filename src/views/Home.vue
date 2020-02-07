<template>
  <div class="home">
    <Header />
    <div style="opacity:0;height:50px"></div>
    <img alt="App logo" style="height:400px" src="../assets/app_logo.png">
    <Start :to="to" />
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
