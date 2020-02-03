<template>
  <div class="home">
    <Header />
    <div style="opacity:0;height:50px"></div>
    <img alt="App logo" style="height:400px" src="../assets/app_logo.png">
    <router-link style="display:flex;justify-content:center;align-items:center;text-decoration:none" to="/select_words">
      <p style="text-align:center;font-size:36px;margin-right:16px;color:#414141">Start</p>
      <font-awesome-icon style="font-size:100;color:#414141" icon="chevron-right"/>
    </router-link>
  </div>
</template>


<script>
  import Header from '../components/layout/Header';

export default {
  name: 'home',
  components: {
    Header
  }
}
</script>
