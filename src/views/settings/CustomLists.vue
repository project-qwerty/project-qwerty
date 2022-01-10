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
      <p>Only letters and spaces are allowed in custom words.</p>
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
          <ListItem v-on:click="deleteWord" :item="item" class="boxes"/>
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
  import Cookies from '@/components/Cookies.js';

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
      this.loadFromCookies();
    },
    methods: {
      loadFromCookies: function() {
        this.lists = Cookies.getCustomListNames();

        this.words = {};
        for (let listName of this.lists) {
          this.words[listName] = Cookies.getCustomList(listName);
        }
      },
      onSelect(list) {
        this.current_list = list;
        this.items = this.words[this.current_list];
      },
      newList: function() {
        if (!this.lists.includes(this.new_list)) {
          Cookies.createCustomList(this.new_list);
          alert('Category added: ' + this.new_list);
          this.new_list = '';
        }

        this.loadFromCookies();
      },
      deleteList: function() {
        if (this.lists.includes(this.list_to_delete)) {
          Cookies.deleteCustomList(this.list_to_delete);
          alert('Category deleted: ' + this.list_to_delete);
          this.list_to_delete = '';
        }

        this.loadFromCookies();
      },
      newWord: function() {
        var alreadyExists = this.words[this.current_list].includes(this.new_word);
        var isEmpty = this.new_word === "";
        var isValidChars = /^[a-zA-Z ]+$/.test(this.new_word);

        if (!alreadyExists && !isEmpty && isValidChars) {
          Cookies.addCustomWord(this.current_list, this.new_word);
          this.new_word = "";
        }

        this.loadFromCookies();
        this.items = this.words[this.current_list];
      },
      deleteWord(val) {
        window.console.log(val);
        Cookies.deleteCustomWord(this.current_list, val);

        this.loadFromCookies();
        this.items = this.words[this.current_list];
      }
    },
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
