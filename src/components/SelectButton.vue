<template>
  <button v-on:click="toggle=!toggle" :class="{'selected':toggle===true}">{{title}}
  <img alt="image" class="icon" :src="require('@/assets/category-selection-images/'+image_path)"></button>
</template>


<script>
  export default{
    name: "select-component",
    props: ["index", "preset", "title", "image_path"],
    data: function(){
      return{
        toggle: false,
        image: null,
      }
    },
    created(){
      this.toggle = this.preset
    },
    watch: {
      'toggle' : function(val){
        this.$emit("update:value", {value : val, index : this.index});
      }
    }
  }
</script>


<style scoped>
  .selected{
    background-color: rgb(48, 209, 88) !important
  }

  .icon{
    height: 120px;
  }

  button{
    background-color: #fefefe;
    color: #212121;
    height: 200px;
    width: 200px;
    padding-top:8px;
    padding-bottom:8px;
    outline: 2px black;
    border: 2.5px solid black;
    transition: all 200ms;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    font-size: 32px;
  }
</style>
