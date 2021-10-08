<template>
  <div class="key" :class="{'disabled': correction && !enable}" @mousedown="click">
    <p>{{char['letter']}}</p>
  </div>
</template>


<script>
  export default {
    props:[
      "char",
      "word",
      "correction",
    ],
    data () {
      return {
      }
    },
    methods: {
      click() {
        if (this.enable) {
          this.$emit('update:click', this.char['letter']);
          this.$emit('update:error', false);
        }
        else{this.$emit('update:error', true);}
      }
    },
    computed: {
      'enable': function() {
        if (this.word == null) return true;
        return this.word.includes(this.char['letter']);
      }
    }
  }
</script>


<style scoped>

  .disabled{
    background-color: gray !important;
  }

  .key {
    background-color: white;
    border: 1px solid black;
    text-transform: capitalize;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
/*    width: 100px;*/
    height: 100%;
    border-radius: 2px;
    margin: 0px 6px;
    box-shadow: 0 6px 6px -1px rgba(0, 0, 0, 0.2), 0 4px 4px -1px rgba(0, 0, 0, 0.2);
  }

/*
  .key:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
*/

</style>
