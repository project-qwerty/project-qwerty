<template>
  <header class="header">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <img alt="MIME logo" style="height:100px" :src="require('@/assets/MIME_logo.png')">
      <img alt="MYMI logo" style="height:100px" :src="require('@/assets/MYMI_logo.png')">
      <router-link style="display:flex;justify-content:center;align-items:center;text-decoration:none" to="/settings">
        <font-awesome-icon style="font-size:100;color:#444444" icon="cog"/>
      </router-link>
    </div>
  </header>
</template>


<script>
  export default {
    name: "Header"
  }
</script>


<style scoped>
  .header {
    background: #fff;
    color: #444;
    text-align: center;
    padding: 10px;
  }
  
  .header a {
    color: #fff;
    padding-right: 5px;
  }
</style>