<template>
  <div class="output">{{output}}</div>
</template>

<script>
  export default {
    props:[
      "output",
    ],
  }
</script>

<style>
  .output {
    font-size: 70px;
    text-transform: uppercase;
    text-decoration: underline;
    height: 100px;
    color:rgba(28, 28, 30);
    font-weight:bold;
  }
</style>
