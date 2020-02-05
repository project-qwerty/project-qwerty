<template>
  <header class="header">
    <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:30px">
      <img alt="MIME logo" style="height:80px" :src="require('@/assets/MIME_logo.png')">
      <img alt="MYMI logo" style="height:80px" :src="require('@/assets/MYMI_logo.png')">
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