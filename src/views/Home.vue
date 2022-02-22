<template>
  <div class="home">
    <Header />
    <img alt="App logo" class="app-logo" src="../assets/projectqwerty1.png">
    <div class="container">
      <p class="paragraph">This app is for people with aphasia after a stroke.<br>Find out more <router-link :to="about">here</router-link>.</p>
      <router-link class="start-button" :to="selectWords" >
        <p class="start-text">START</p>
        <font-awesome-icon class="start-chevron" icon="chevron-right"/>
      </router-link>
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
        selectWords: "/select-lists",
        about: "/about",
      }
    }
  }
</script>


<style scoped>
  .paragraph {
    margin: 38px;
    font-size: 20px;
    text-align: left;
  }

  .app-logo {
    height: 260px;
  }

  .container {
    display: flex;
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
</style>
