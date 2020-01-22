<template>
    <div>
      <div class="bg-blue-900 output">{{output}}</div>
      <div>
<!--        Use flex to justify each row of the keyboard-->
        <div style="display:flex;flex-wrap:nowrap;justify-content:space-between;" :key="index" v-for="(keylist, index) in keys">
          <div v-if="index === 0" style="padding-left:2%"></div>
          <div v-if="index === 1" style="padding-left:3%"></div>
          <div v-if="index === 2" style="padding-left:5%"></div>
          <div v-if="index === 3" style="padding-left:20%"></div>
          <div style="padding-top:10px;flex:1;height:100%;" :key="index1" v-for="(key, index1) in keylist">
              <key-component :char="key" v-on:update:click="click" />
          </div>
          <div v-if="index === 0" style="padding-right:2%"></div>
          <div v-if="index === 1" style="padding-right:4%"></div>
          <div v-if="index === 2" style="padding-right:10%"></div>
          <div v-if="index === 3" style="padding-right:12%"></div>
        </div>
      </div>
    </div>
</template>


<style scoped>
  .output {
    font-size: 24px;
    text-transform: uppercase;
    text-decoration: underline;
    height: 100px;
  }
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