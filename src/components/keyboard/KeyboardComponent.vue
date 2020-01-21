<template>
    <div>
      <div>{{output}}</div>
      <div>
<!--        Use flex to justify each row of the keyboard-->
        <div style="display:flex;flex-wrap:wrap;justify-content:center" :key="index" v-for="(keylist, index) in keys">
          <div :key="index1" v-for="(key, index1) in keylist">
            <key-component  :char="key" v-on:update:click="click" />
          </div>
        </div>
      </div>
    </div>
</template>


<style>
    
</style>


<script>
  import KeyComponent from '@/components/keyboard/KeyComponent.vue';

  export default{
    name : 'keys',
    data() {
      return {
        output: ''
      }
    },
    props : ["keys"],
    methods : {
      click(test) {
        this.output = this.output+test;
      }
    },
    components: {
      'key-component' : KeyComponent,
    },
}
</script>