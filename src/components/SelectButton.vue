<template>
  <div class="btn-container">
    <button v-on:click="toggle=!toggle" :class="{'selected':toggle===true}"></button>
  </div>
</template>


<script>
  export default{
    name: "select-component",
    props: ["index", "preset"],
    data: function(){
      return{
        toggle: false,
      }
    },
    created(){
//      window.console.log(this.preset);
//      if ()
    },
    watch: {
      'toggle' : function(val){
        this.$emit("update:value", {value : val, index : this.index})
      }
    }
  }
</script>


<style scoped>
  .selected{ 
    background-color: rgb(48, 209, 88) !important /*Makes this the*/
  }
  
  .btn-container{
    display: flex;
    align-items: stretch;
  }

  button{
    background-color: #fefefe; 
    color: #212121;
    height: 28px;
    width: 28px;
    padding-top:8px;
    padding-bottom:8px;
    outline: none;
    transition: all 200ms;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
</style>