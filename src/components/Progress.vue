<!--This is the progress bar at the top of the screen-->
<template>
  <div class="progress">
    {{current}}/{{total}}
  </div>
</template>


<script>
  export default {
    props : ["current", "total"]
  }
</script>


<style scoped>
  .progress {
    color: grey;
    font-weight: bold;
    font-size: 25px;
    border: 5px grey;
    border-style: solid;
    padding-top: 5px;
    padding-right: 50px;
    padding-bottom: 5px;
    padding-left: 50px;
  }
</style>
