<template>
  <div style="display:flex;justify-content:space-between">
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
