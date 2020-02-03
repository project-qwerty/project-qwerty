<template>
    <div>
      <div>
        <div class="row" :key="index" v-for="(keylist, index) in keys">
          <div v-if="index === 0" style="padding-left:87%"></div>
          <div v-if="index === 1" style="padding-left:2%"></div>
          <div v-if="index === 2" style="padding-left:3%"></div>
          <div v-if="index === 3" style="padding-left:5%"></div>
          <div v-if="index === 4" style="padding-left:20%"></div>
          <div class="key" :key="index1" v-for="(key, index1) in keylist">
              <key-component :word="word" :correction="correction" :char="key" v-on:update:click="click" v-on:update:error="error = $event"/>
          </div>
          <div v-if="index === 0" style="padding-right:2%"></div>
          <div v-if="index === 1" style="padding-right:2%"></div>
          <div v-if="index === 2" style="padding-right:4%"></div>
          <div v-if="index === 3" style="padding-right:10%"></div>
          <div v-if="index === 4" style="padding-right:12%"></div>
        </div>
      </div>
    </div>
</template>


<style scoped>
  .row {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
  }
  
  .key {
    padding-top: 10px;
    flex: 1;
    height: 100%;
    justify-content: center;
  }
</style>


<script>
  import KeyComponent from '@/components/keyboard/KeyComponent.vue';

  export default{
    name : 'keys',
    data() {
      return {
        error : false,
      }
    },
    props : ["keys", "word"],
    methods : {
      click(val) {
        this.$emit('update:keypressed', val);
      }
    },
    computed:{
      'correction' : function(){
        return this.error
      }
    },
    components: {
      'key-component' : KeyComponent,
    }
}
</script>