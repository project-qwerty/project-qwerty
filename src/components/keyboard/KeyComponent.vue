<template>
  <div class="key" :class="{'disabled': !enable}" @mousedown="click">
    <font-awesome-icon v-if="char == 'backspace'" class="backspace-icon" icon="delete-left" />
    <p>{{char}}</p>
  </div>
</template>


<script>
  export default {
    props: [
      'char',
      'enabledCharacters',
    ],
    methods: {
      click() {
        if (this.enable) {
          this.$emit('update:click', this.char);
        }
      }
    },
    computed: {
      'enable': function() {
        if (this.enabledCharacters == null) {
          return true;
        }
        return this.enabledCharacters.includes(this.char);
      }
    }
  }
</script>


<style scoped>
  .disabled {
    background-color: gray !important;
  }

  .key {
    background-color: white;
    border: 1px solid black;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    height: 100%;
    border-radius: 2px;
    margin: 0px 6px;
    box-shadow: 0 6px 6px -1px rgba(0, 0, 0, 0.2), 0 4px 4px -1px rgba(0, 0, 0, 0.2);
  }

  .backspace-icon {
    font-size: 50px;
    margin-right: 15px;
  }
</style>
