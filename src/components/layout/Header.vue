<template>
  <header class="header">
    <img alt="MIME logo" class="header-logo" :src="require('@/assets/MIME_logo.png')">
    <img alt="MYMI logo" class="header-logo" :src="require('@/assets/MYMI_logo.png')">
    <img alt="Monash Partners logo" class="header-logo" :src="require('@/assets/monash-partners-logo.jpg')">
  </header>
</template>


<script>
  export default {
    name: "Header"
  }
</script>


<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 10px;
    padding-bottom: 50px;
  }

  .header-logo {
    height: 60px;
  }
</style>
