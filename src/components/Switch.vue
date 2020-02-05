<template>
  <div class="btn-container">
    <button v-for="(option,index) in options" :key="index" v-on:click="select_value=option" :class="{'green-button':select_value===option}">{{option}}</button>
  </div>
</template>


<script>
  export default{
    name: "switch-component",
    props: ["options", "preset"], 
    // the internal state - can be change in this code
    data: function(){
      return{
        select_value: null
      }
    },
    created(){
      this.select_value = this.preset  
    },
    watch: {
      'select_value' : function(val){
        this.$emit("update:value", val)
      }
    }
  }
</script>


<style scoped>
  .green-button{ 
    background-color: rgb(48, 209, 88) !important /*Makes this the*/
  }

  .btn-container{
    display: flex;
    align-items: stretch;
  }

  button{
    background-color: #fefefe; 
    color: #212121;
    font-size: 14px;
    width: 96px;
    padding-top:8px;
    padding-bottom:8px;
    outline: none;
    transition: all 200ms;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
</style>