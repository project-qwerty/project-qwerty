<template>
  <div class="home">
    <Header />
    <div style="opacity:0;height:20px"></div>
    <img alt="App logo" style="height:260px" src="../assets/projectqwerty1.png">
    <div style="display:flex;justify-content:flex-end">
      <p class="paragraph"> This app is for people with aphasia after a stroke.<br>Find out more
        <router-link :to="settings">here</router-link>.</p>
      <div style="width:360px; margin:auto" class="box">
        <router-link style="display:flex;justify-content:center;align-items:center;text-decoration:none" :to="to" >
          <p style="text-align:center;font-size:40px;margin-right:16px;color:black">START</p>
          <font-awesome-icon style="font-size:100;color:black" icon="chevron-right"/>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
  import Header from '../components/layout/Header';

  export default {
    name: 'home',
    components: {
      Header,
    },
    data() {
      return {
        to: "/select_words",
        settings: "/settings/about",
      }
    }
  }
</script>


<style>
  .paragraph {
    float: left;
    margin: 38px;
    font-size: 20px;
    color:rgba(58, 58, 60);
    text-align: left
  }
  .box {
    background-color: rgb(48, 209, 88);
    border: 1.5px solid rgba(0, 0, 0, 0.5);
    text-transform: capitalize;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-radius: 2px;
    margin: 0px 6px;
    box-shadow: 0 10px 10px -1px rgba(0, 0, 0, 0.5);
  }
</style>