<template>
  <header class="header">
    <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:30px">
      <img alt="MIME logo" style="height:60px" :src="require('@/assets/MIME_logo.png')">
      <img alt="MYMI logo" style="height:60px" :src="require('@/assets/MYMI_logo.png')">
      <img alt="Monash Partners logo" style="height:60px" :src="require('@/assets/monash-partners-logo.jpg')">
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
    color: #000;
    text-align: center;
    padding: 10px;
  }

  .header a {
    color: #fff;
    padding-right: 5px;
  }
</style>
