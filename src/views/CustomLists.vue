<template>
  <div>
    <NavSidebar />

    <div class="sidebar-page-content page-wrapper">
      <h1 class="page-header">Custom Categories</h1>
      <div>
        <!-- Create new list -->
        <p class="heading">
          <img class="icon" src="@/assets/setting-icons/New_Category.png">
          Make a new Category
        </p>
        <div class="input-wrapper">
          <BFormInput v-model="new_list" placeholder="Enter list title" class="boxes"></BFormInput>
          <button v-on:click="this.newList" class="boxes">Submit</button>
        </div>

        <!-- Import list -->
        <p class="heading">
          <font-awesome-icon class="" icon="cloud-upload-alt" />
          Import Category from JSON
        </p>
        <div class="input-wrapper">
          <BFormInput v-model="import_data" placeholder="Paste JSON here" class="boxes"></BFormInput>
          <button v-on:click="this.importList" class="boxes">Import</button>
        </div>

        <!-- Current lists -->
        <p class="heading">
          <img class="icon" src="@/assets/setting-icons/Select_Category.png">
          Select Category
        </p>
        <Multiselect v-model="value" :preselect-first="true" :options="lists" :searchable="false" :show-labels="false" @select="onSelect" class="boxes"/>

        <!-- Export list -->
        <p class="heading">
          <font-awesome-icon class="" icon="cloud-download-alt" />
          Export Category to JSON
        </p>
        <div class="input-wrapper">
          <button v-on:click="this.exportList" class="boxes">{{ exportButtonText }}</button>
        </div>

        <!-- Add words to selected list -->
        <p class="heading">
          <img class="icon" src="@/assets/setting-icons/New_Word.png">
          Add Words to Category
        </p>
        <p>Only letters and spaces are allowed in custom words.</p>
        <div class="input-wrapper">
          <BFormInput v-model="new_word" placeholder="Enter a new word" class="boxes"></BFormInput>
          <button v-on:click="this.newWord" class="boxes">Submit</button>
        </div>

        <!-- Current list -->
        <p class="heading">
          <img class="icon" src="@/assets/setting-icons/Current_Category.png">
          Current Category
        </p>
        <div class="current-list-display">
          <div v-for="(item, index) in items" :key="index">
            <ListItem v-on:click="deleteWord" :item="item" class="boxes"/>
          </div>
        </div>

        <!-- Delete list -->
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
  </div>
</template>



<script>
  import { Multiselect } from 'vue-multiselect';
  import ListItem from '@/components/ListItem.vue';
  import NavSidebar from '@/components/NavSidebar.vue';
  import LocalStorage from '@/components/LocalStorage.js';

  export default {
    name: 'CustomLists',
    components: {
      Multiselect,
      ListItem,
      NavSidebar,
    },
    data () {
      return {
        value: null,
        lists: [],
        new_word: '',
        new_list: '',
        list_to_delete: '',
        current_list: '',
        import_data: '',
        words: [],
        items: [],
        exportButtonText: 'Copy to clipboard',
      }
    },
    created () {
      this.loadFromStorage();
    },
    methods: {
      loadFromStorage: function() {
        this.lists = LocalStorage.getCustomListNames();

        this.words = {};
        for (let listName of this.lists) {
          this.words[listName] = LocalStorage.getCustomList(listName);
        }
      },
      onSelect(list) {
        this.current_list = list;
        this.items = this.words[this.current_list];
        this.exportButtonText = 'Copy to clipboard';
      },
      newList: function() {
        if (!this.lists.includes(this.new_list)) {
          LocalStorage.createCustomList(this.new_list);
          alert('Category added: ' + this.new_list);
          this.new_list = '';
        }

        this.loadFromStorage();
      },
      deleteList: function() {
        if (this.lists.includes(this.list_to_delete)) {
          LocalStorage.deleteCustomList(this.list_to_delete);
          alert('Category deleted: ' + this.list_to_delete);
          this.list_to_delete = '';
        }

        this.loadFromStorage();
      },
      newWord: function() {
        if (this.current_list === null || this.current_list === '') {
          // in this case there are no custom categories, and to prevent errors we terminate here
          return;
        }
        var alreadyExists = this.words[this.current_list].includes(this.new_word);
        var isEmpty = this.new_word === '';
        var isValidChars = /^[a-zA-Z ]+$/.test(this.new_word);

        if (!alreadyExists && !isEmpty && isValidChars) {
          LocalStorage.addCustomWord(this.current_list, this.new_word);
          this.new_word = '';
        }

        this.loadFromStorage();
        this.items = this.words[this.current_list];
      },
      deleteWord(val) {
        window.console.log(val);
        LocalStorage.deleteCustomWord(this.current_list, val);

        this.loadFromStorage();
        this.items = this.words[this.current_list];
      },
      importList() {
        try {
          LocalStorage.importListFromJson(this.import_data);
          this.import_data = '';
        } catch (e) {
          this.import_data = e.message;
        }
      },
      exportList() {
        const data = LocalStorage.exportListToJson(this.current_list);

        window.navigator.clipboard.writeText(data)
          .then(
            // success
            () => this.exportButtonText = 'Copied!',
            // failure
            () => this.exportButtonText = 'Copy failed!'
          );
      },
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
