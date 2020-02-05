<template>
  <div class="line">
    <router-link style="display:flex;justify-content:left;text-decoration:none" to="/select_words">
      <font-awesome-icon style="font-size:30;color:slategrey" icon="chevron-left"/>
    </router-link>
    <p class="heading">Settings</p>
    <div>
      <router-link 
        v-for="(option, index) in this.options"
        :key="index"
        class="option-link" 
        :to="option.link">{{option.name}}</router-link>
    </div>
  </div>
</template>

<script>
  export default{
    name:"settings-menu",
    props: [
      'options'
    ]
  }
</script>

<style scoped>
  .line {
    padding: 8px;
    padding-right: 24px;
    border-right: 1px solid black;
    height: 900px;
    display: inline-block;
    box-shadow: 2px 0px grey;
  height: 100vh;
  }
  .option-link{
    display: block;
    text-decoration: none;
    color: slategrey;
  }
  
  .heading {
    color: rgb(44, 44, 46);
    font-size: 32px;
    font-weight: bold
  }
</style>