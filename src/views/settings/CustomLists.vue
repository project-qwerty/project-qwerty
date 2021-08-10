<template>
  <div class="page-wrapper">
    <h1 class="page-header">Custom Categories</h1>
    <div>
<!--        Create new list-->
      <p class="heading">
        <img class="icon" src="@/assets/setting-icons/New_Category.png">
        Make a new Category
      </p>
      <div class="input-wrapper">
        <BFormInput v-model="new_list" placeholder="Enter list title" class="boxes"></BFormInput>
        <button v-on:click="this.newList" class="boxes">Submit</button>
      </div>

<!--        Current lists-->
      <p class="heading">
        <img class="icon" src="@/assets/setting-icons/Select_Category.png">
        Select Category
      </p>
      <Multiselect v-model="value" :preselect-first="true" :options="lists" :searchable="false" :show-labels="false" @select="onSelect" class="boxes"/>

<!--        Add words to selected list-->
      <p class="heading">
        <img class="icon" src="@/assets/setting-icons/New_Word.png">
        Add Words to Category
      </p>
      <div class="input-wrapper">
        <BFormInput v-model="new_word" placeholder="Enter a new word" class="boxes"></BFormInput>
        <button v-on:click="this.newWord" class="boxes">Submit</button>
      </div>

<!--        Current list-->
      <p class="heading">
        <img class="icon" src="@/assets/setting-icons/Current_Category.png">
        Current Category
      </p>
      <div class="current-list-display">
        <div v-for="(item, index) in items" :key="index">
          <ListItem v-on:click="click" :item="item" class="boxes"/>
        </div>
      </div>

<!--        Delete list-->
      <p class="heading">
        <img class="icon" src="@/assets/setting-icons/Delete_Category.png">
        Delete a Category
      </p>
      <div class="input-wrapper">
        <BFormInput v-model="list_to_delete" placeholder="Enter list title" class="boxes"></BFormInput>
        <button v-on:click="this.deleteList" class="boxes">Submit</button>
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
        list_to_delete: "",
        current_list: "",
        words: [],
        items: []
      }
    },
    created () {
      if (this.$cookies.isKey('custom_word_lists.lists')) {
        this.lists = this.$cookies.get('custom_word_lists.lists').split(',');
      }
      if (this.$cookies.isKey('custom_word_lists.words')) {
        var words = this.$cookies.get('custom_word_lists.words').split('|').slice(0,-1);
        for (var i = 0; i < words.length; i++){
          if (words[i].includes(',')) {
            this.words.push(words[i].split(','));
          } else {
            this.words.push([words[i]]);
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
          alert("Category added: " + this.new_list);
          this.new_list = "";
        }
      },
      deleteList: function () {
        var index = this.lists.indexOf(this.list_to_delete);
        if (index !== -1) {
          this.lists.splice(index, 1);
          this.words.splice(index, 1);
          alert("Category deleted: " + this.list_to_delete);
          this.list_to_delete = "";
        }
      },
      newWord: function () {
        var index = this.lists.indexOf(this.current_list);
        if (!(this.words[index].includes(this.new_word)) && this.new_word !== "") {
          this.words[index].push(this.new_word.toLowerCase());
          this.new_word = "";
        }
      },
      click(val) {
        var index = this.lists.indexOf(this.current_list);
        this.words[index].splice(this.words[index].indexOf(val),1);
      }
    },
    watch: {
      'lists' : function(val){
        this.$cookies.set('custom_word_lists.lists', val);
      },
      'words' : function(val){
        var cookie = "";
        for (var i = 0; i < val.length; i++) {
          cookie += val[i];
          cookie += '|'
        }
        this.$cookies.set('custom_word_lists.words', cookie);
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
  .heading {
    font-size: 24px;
    margin-bottom: 5px;
    margin-top: 30px;
    color: black;
  }

  .boxes {
    font-size: 16px;
    color:rgba(58, 58, 60);
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .icon {
    height: 20px;
  }

  .page-wrapper {
    width: 600px;
    padding-left: 48px;
    text-align: left;
  }

  .page-header {
    font-weight: bold;
    color: black;
  }

  .input-wrapper {
    display: flex;
  }

  .current-list-display {
    height: 200px;
    overflow-y: scroll;
  }
</style>
