<template>
  <div class="list-item">
    {{item}}
    <button v-on:click="click">x</button>
  </div>
</template>


<script>
  export default {
    name: "ListItem",
    props: ["item"],
    methods: {
      click() {
        this.$emit('click', this.item);
      }
    }
  }
</script>

<style scoped>
  .list-item {
    display: flex;
    justify-content: space-between;
  }
</style>
