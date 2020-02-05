<template>
  <div>
    <div class="row" :key="index" v-for="(keylist, index) in keys">
      <div v-if="index === 0" style="padding-left:87%"></div>
      <div v-if="index === 1" style="padding-left:2%"></div>
      <div v-if="index === 2" style="padding-left:3%"></div>
      <div v-if="index === 3" style="padding-left:5%"></div>
      <div v-if="index === 4" style="padding-left:20%"></div>
      <div class="key" :key="index1" v-for="(key, index1) in keylist">
          <key-component :word="word" :correction="correction" :char="key" v-on:update:click="click" v-on:update:error="error=$event"/>
      </div>
      <div v-if="index === 0" style="padding-right:2%"></div>
      <div v-if="index === 1" style="padding-right:2%"></div>
      <div v-if="index === 2" style="padding-right:4%"></div>
      <div v-if="index === 3" style="padding-right:10%"></div>
      <div v-if="index === 4" style="padding-right:12%"></div>
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
    justify-content: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
</style>


<script>
  import KeyComponent from '@/components/keyboard/KeyComponent.vue';

  export default{
    name : 'keys',
    data() {
      return {
        error : false,
        keys: [
          [
            {
              letter: 'backspace'
            }
          ],
          [
            {
              letter: 'q'
            },
            {
              letter: 'w'
            },
            {
              letter: 'e'
            },
            {
              letter: 'r'
            },
            {
              letter: 't'
            },
            {
              letter: 'y'
            },
            {
              letter: 'u'
            },
            {
              letter: 'i'
            },
            {
              letter: 'o'
            },
            {
              letter: 'p'
            }
          ],
          [
            {
              letter: 'a'
            },
            {
              letter: 's'
            },
            {
              letter: 'd'
            },
            {
              letter: 'f'
            },
            {
              letter: 'g'
            },
            {
              letter: 'h'
            },
            {
              letter: 'j'
            },
            {
              letter: 'k'
            },
            {
              letter: 'l'
            }
          ],
          [
            {
              letter: 'z'
            },
            {
              letter: 'x'
            },
            {
              letter: 'c'
            },
            {
              letter: 'v'
            },
            {
              letter: 'b'
            },
            {
              letter: 'n'
            },
            {
              letter: 'm'
            }
          ],
          [
            {
              letter: ' '
            }
          ]
        ],
      }
    },
    props : ["word"],
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