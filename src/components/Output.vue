<template>
  <div class="output">{{renderedOutput}}</div>
</template>

<script>
  export default {
    props: [
      'output',
    ],
    computed: {
      'renderedOutput': function() {
        // \xa0 is the escape code for &nbsp;
        // there are two of them to make the space characters wider to match the letters better
        return this.output.replaceAll(' ', '\xa0\xa0');
      }
    }
  }
</script>

<style scoped>
  .output {
    font-size: 70px;
    text-transform: uppercase;
    text-decoration: underline;
    height: 100px;
    color: rgba(28, 28, 30);
    font-weight: bold;
  }
</style>
