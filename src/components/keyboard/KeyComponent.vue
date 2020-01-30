<template>
  <div class="key" @click="click">
    <p>{{char['letter']}}</p>
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
    text-transform: capitalize;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
/*    width: 100px;*/
    height: 100%;
  }
  
/*
  .key:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
*/
  
</style>