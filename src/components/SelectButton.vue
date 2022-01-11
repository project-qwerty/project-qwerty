<template>
  <button v-on:click="onClick" :class="{'selected': isSelected}">
    <div class="text">{{title}}</div>
    <img class="icon" :src="require('@/assets/category-selection-images/' + image_path)">
  </button>
</template>


<script>
  export default {
    name: 'select-component',
    props: ['title', 'isCustomList', 'isSelected', 'image_path'],
    methods: {
      onClick() {
        this.$emit('update:value', {listName: this.title, isCustomList: this.isCustomList, isSelected: !this.isSelected});
      }
    }
  }
</script>


<style scoped>
  .selected {
    background-color: rgb(48, 209, 88) !important;
  }

  .text {
    font-size: 32px;
    height: 96px;
  }

  .icon {
    height: 120px;
  }

  button {
    background-color: #fefefe;
    color: #212121;
    width: 200px;
    padding: 8px;
    border: 2px solid black;
    transition: all 200ms;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
  }
</style>
