<template>
  <div class="key" @click="click">
    {{char['letter']}}
  </div>
</template>


<script>
  export default {
    props:[
      'char'
    ],
    data () {
      return {
        test:"h"
      }
    },
//    props: ,
    
    methods: {
      click() {
        this.$emit('update:click', this.char['letter']);
      }
    }
  }
</script>


<style scoped>
  .key {
    border: 1px solid black;
    width: 80px;
    height: 80px;
    font-size: 50px;
    text-transform: capitalize;
/*    padding: 10px;*/
    box-sizing: border-box;
  }
  
</style>