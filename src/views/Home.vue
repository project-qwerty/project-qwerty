<template>
  <div class="home">
    <a href="https://www.google.com/">
         <img alt="Vue logo" src="../assets/logo.png">
    </a>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>


<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
