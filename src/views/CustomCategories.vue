<template>
  <div>
    <NavSidebar />

    <div class="sidebar-page-content">
      <div class="category-list-section"
          :class="{ hidden: selectedCategory !== null }">
        <header>
          <IconHeader
              class="page-title"
              text="My categories"
              icon="pen"
              iconColour="var(--primary-colour)"
              :major="true" />

          <ActionButton
              class="new-category-button"
              icon="plus"
              text="New category"
              v-on:click="showNewCategoryModal = true" />

          <Dropdown
              :options="[
                { label: 'Import category', icon: 'right-to-bracket', action: 'import' },
              ]"
              v-on:click="handleDropdownClick" />
        </header>

        <RowButton class="custom-category faint-border-bottom"
            v-for="(categoryName, index) in getCategories()" v-bind:key="index"
            v-on:click="$router.push('/custom-categories/' + categoryName)"
            :text="categoryName"
            icon="list"
            :iconColour="Colours.stringToColour(categoryName)" />
      </div>

      <Modal
          :shown="showNewCategoryModal"
          v-on:click-out="cleanUpCreateCategory">
        <h1>Add category</h1>
        <input
            class="qwerty-text-input"
            placeholder="New category"
            v-model="inputCategoryName">
        <div class="buttons-row">
          <ActionButton
              text="Cancel"
              :major="false"
              v-on:click="cleanUpCreateCategory" />
          <ActionButton
              text="Create category"
              :enabled="Validation.isValidCategoryName(inputCategoryName)"
              v-on:click="clickCreateCategory" />
        </div>
      </Modal>

      <input ref="file-picker" type="file" multiple @change="handleImportFiles" style="display: none;">
    </div>
  </div>
</template>



<script>
  import LocalStorage from '@/functions/LocalStorage.js'
  import Colours from '@/functions/Colours.js'
  import Validation from '@/functions/Validation.js';

  import NavSidebar from '@/components/NavSidebar.vue';
  import Modal from '@/components/Modal.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import IconHeader from '@/components/IconHeader.vue';
  import RowButton from '@/components/RowButton.vue';
  import Dropdown from '@/components/Dropdown.vue';

  export default {
    components: {
      NavSidebar,
      Modal,
      ActionButton,
      IconHeader,
      RowButton,
      Dropdown,
    },
    data () {
      return {
        selectedCategory: null,

        showNewCategoryModal: false,

        inputCategoryName: '',
      }
    },
    beforeCreate() {
      this.Colours = Colours;
      this.Validation = Validation;
    },
    methods: {
      getCategories() {
        return LocalStorage.getCustomCategoryNames();
      },
      handleDropdownClick(operation) {
        if (operation === 'import') {
          this.clickImportCategory();
        }
      },
      cleanUpCreateCategory() {
        this.showNewCategoryModal = false;
        this.inputCategoryName = '';
      },
      clickCreateCategory() {
        // prevent creating categories with invalid names
        // the action button should be disabled but you never know
        if (!Validation.isValidCategoryName(this.inputCategoryName)) {
          return;
        }

        LocalStorage.createCustomCategory(this.inputCategoryName);

        this.cleanUpCreateCategory();
      },
      getFilePicker() {
        return this.$refs['file-picker'];
      },
      clickImportCategory() {
        this.getFilePicker().click();
      },
      async handleImportFiles(event) {
        for (const file of event.target.files) {
          const contents = await file.text();
          LocalStorage.importCategoryFromJson(contents);
        }

        this.$forceUpdate();
      },
    },
  }
</script>

<style scoped>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .page-title {
    flex-grow: 1;
  }

  .new-category-button {
    margin-right: 16px;
  }

  h1 {
    margin-bottom: 1em;
  }

  .qwerty-text-input {
    width: 100%;

    margin-bottom: 1em;

    font-size: 20px;
  }

  .buttons-row {
    display: flex;
    justify-content: flex-end;

    padding-left: 5em;
    gap: 1em;
  }

  .custom-category {
    position: relative;

    font-size: 24px;

    padding-top: 1em;
    padding-bottom: 1em;
  }

  .hidden {
    display: none;
  }
</style>
