<template>
  <div style="width:600px; padding-left:48px;text-align:left">
    <h1 style="font-weight:200">Custom Lists</h1>
    <div>
<!--        Create new list-->
      <p class="heading">
        Make a new list
      </p>
      <div style="display:flex">
        <BFormInput v-model="new_list" placeholder="Enter list title"></BFormInput>
        <button v-on:click="this.newList">Submit</button>
      </div>

<!--        Current lists-->
      <p class="heading">
        Name of Lists
      </p>
      <Multiselect v-model="value" :preselect-first="true" :options="lists" :searchable="false" :show-labels="false" @select="onSelect" />

<!--        Add words to selected list-->
      <p class="heading">
        Add Words to List
        *Please add words all lowercase
      </p>
      <div style="display:flex">
        <BFormInput v-model="new_word" placeholder="Enter a new word"></BFormInput>
        <button v-on:click="this.newWord">Submit</button>
      </div>

<!--        Current list-->
      <p class="heading">
        Current List
      </p>
      <div style="height:300px;overflow-y:scroll">
        <div v-for="(item, index) in items" :key="index">
          <ListItem :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>



<script>
  import { Multiselect } from 'vue-multiselect';
  import ListItem from '@/components/ListItem.vue';
  
  export default {
    name: 'CustomLists',
    components: {
      Multiselect,
      ListItem
    },
    data () {
      return {
        value: null,
        lists: [],
        new_word: "",
        new_list: "",
        current_list: "",
        words: [],
        items: []
      }
    },
    created () {
      if (this.$cookies.isKey('wordlists.lists')) {
        this.lists = this.$cookies.get('wordlists.lists').split(',');
      }
      if (this.$cookies.isKey('wordlists.words')) {
        var words = this.$cookies.get('wordlists.words').split('|').slice(0,-1);
        for (var i = 0; i < words.length; i++){
          if (words[i].includes(',')) {
            this.words.push(words[i].split(','));
          } else {
            this.words.push(words[i]);
          }
        }
      }
    },
    methods: {
      listSelected(list) {
        this.words = JSON.parse('[' + this.$cookies.get(list) + ']');
      },
      onSelect(list) {
        this.current_list = list;
        this.items = this.words[this.lists.indexOf(this.current_list)];
      },
      newList: function () {
        if (!(this.lists.includes(this.new_list))) {
          this.lists.push(this.new_list);
          this.words.push([]);
        }
      },
      newWord: function () {
        var index = this.lists.indexOf(this.current_list);
        if (!(this.words[index].includes(this.new_word)) && this.new_word !== "") {
          this.words[index].push(this.new_word);
        }
      }
    },
    watch: {
      'lists' : function(val){
        this.$cookies.set('wordlists.lists', val);
      },
      'words' : function(val){
//        window.console.log(val);
        var cookie = "";
        for (var i = 0; i < val.length; i++) {
          cookie += val[i];
          cookie += '|'
        }
        this.$cookies.set('wordlists.words', cookie);        
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<!--
<style scoped>
  .heading {
    font-size: 24px;
    color: darkslategray;
  }
</style>-->
