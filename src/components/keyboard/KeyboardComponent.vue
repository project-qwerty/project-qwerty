<template>
  <div>
    <div class="row" :key="index" v-for="(keyRow, index) in keys">
      <div v-if="index === 0" style="padding-left:78%"></div>
      <div v-if="index === 1" style="padding-left:2%"></div>
      <div v-if="index === 2" style="padding-left:5%"></div>
      <div v-if="index === 3" style="padding-left:14%"></div>
      <div v-if="index === 4" style="padding-left:20%"></div>
      <div class="key" :key="char" v-for="char in keyRow">
          <key-component :enabledCharacters="enabledCharacters" :char="char" v-on:update:click="click" />
      </div>
      <div v-if="index === 0" style="padding-right:2%"></div>
      <div v-if="index === 1" style="padding-right:2%"></div>
      <div v-if="index === 2" style="padding-right:5%"></div>
      <div v-if="index === 3" style="padding-right:14%"></div>
      <div v-if="index === 4" style="padding-right:20%"></div>
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
    margin-top: 10px;
    height: 80px;
    flex: 1;
    justify-content: center;
  }
</style>


<script>
  import KeyComponent from '@/components/keyboard/KeyComponent.vue';

  export default {
    name: 'keys',
    data() {
      return {
        keys: [
                                      [ 'backspace' ],
          [ 'q','w','e','r','t','y','u','i','o','p' ],
           [ 'a','s','d','f','g','h','j','k','l' ],
            [ 'z','x','c','v','b','n','m' ],
                         [ ' ' ],
        ],
      }
    },
    props: ['enabledCharacters'],
    methods: {
      click(val) {
        this.$emit('update:keypressed', val);
      }
    },
    components: {
      'key-component': KeyComponent,
    },
}
</script>
